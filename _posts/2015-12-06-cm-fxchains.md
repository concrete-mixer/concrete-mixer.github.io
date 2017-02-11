---
title: About Concrète Mixer's effects chains
layout: post
category: Concrète Mixer
---

This post discusses Concrete Mixer's effects chains system, which is governed by the playFx entity within CM.

# Why effects?

Before we really get in to the discussion, it's probably worth asking the fundamental question: why we need effects chains? For me there are two fundamental reasons:

* to blend disparate sound sources
* to dub it up a bit.

## Blending files

One or more raw recordings can be sound a bit sparse in the audio field, especially if they're mono. An effects chain helps to add depth to the stereo field.

In case you have recordings that are so bursting with incident they need no artificial enhancement, you can turn off the effects chain by specifying `fx_chain_enabled=0` in `conf/concrete.conf`).

## Dubbing it up

The main reason to alter a sound is to make it more interesting and/or appropriate for its intended use. My personal interest in this regard is similar to the approach taken in dub reggae, where vocal tracks are stripped back from the original multitrack and a variety of effects are applied to what's left, in a manner convivial to herbal intoxication.

There is of course an art to dub, and expecting a series of random effects choices to enhance a recording perfectly is to ask quite a bit. The secret is to have the effects change reasonably often (around a minute is good), so that if one combination comes up that ia suboptimal, there's a good chance the next set will be more appropriate.

# How the effects chains work

playFx defines 25 effects combinations. These chains are groupings of the effects libraries found in lib/Fx, like so:

{% highlight chuck linenos %}
if ( choice == 1 ) {
    [
        new FxFilter,
        new FxDelay
    ] @=> fxChain;
}

if ( choice == 2 ) {
    [
        new FxDelayVariable,
        new FxDelay
    ] @=> fxChain;
}

if ( choice == 3 ) {
    [
        new FxDelay,
        new FxHarmonicDelay
    ] @=> fxChain;
}

// continued to choice 25
{% endhighlight %}

(In case you're wondering, no, ChucK _doesn't_ support `case` statements.)

The chains can be of arbitrary length, but the most you really want is four. This is partly because the cumulative result of too many effects is a mushy sound, but mostly because a Raspberry Pi has only limited CPU capacity and signal processing is expensive.

You'll note that each chain has a delay element. I think all the chains have some delay component, even if it's reverb. It's possible to have effects like flanging or frequency filters which track with the source sound in real time, but delay lines make the effects easier to discern, and also don't muddy the sound of the original too much. If echoes killed your brother and you'd rather not hear them, you can always rewrite the chains by editing 'lib/Modes/Concrete/playFxChain.ck`.

Some Fx* classes (FxDelay and FxFilter being good examples) are wrappers for standard ChucK UGens. Others are custom (discussed below). ChucK users may be surprised that these effects have not been written as Chubgraphs (a convention for aggregating multiple Ugens together); this is for the simple reason that I hadn't heard of them at the time I implemented Fx*. However, if I had my time over I definitely would, and it's on the list for future refactoring.

# Custom Fx libs

The most interesting aspect of organising the effects chain for Concrete Mixer was to experiment with several ideas around Fx design. Most of these ideas have involved tinkering with existing ChucK UGens, but in mildly less conventional ways.

## FxDelayVariable

This effect randomly alters the delay amount, for the duration of the delay amount, meaning each echo is of different length to the last. This results in a skidding, skittering sound.

{% highlight chuck linenos %}
fun void activity() {
    while ( active ) {
        // set duration for delay
        chooser.getDur( 0.05, 0.50 ) => dur duration;

        duration => delay.delay;
        duration - 400::samp => dur mainDuration;

        // In the grand scheme of things we only need
        // duration => now, but randomly changing delay
        // times means there are discontinuities in the signal.
        // To paper over these cracks (and pops) we fade the signal
        // around the discontinuities

        // fade in
        fader.fadeIn( 200::samp, 1.0, output );
        200::samp => now;

        // work through mainDuration
        mainDuration => now;

        // fade out
        fader.fadeOut( 200::samp, output );
        200::samp => now;
    }
}
{% endhighlight %}

## FxFlanger

Flangers are a reasonably straightforward effect to produce. Flangers normally use a sine wave LFO to vary the delay value on the signal. With my implementation I've set an LFO on the feedback amount as well - I'm pretty sure I've never worked with a flanger that does this, though I guess it might be common. Certainly easy to do.

{% highlight chuck linenos %}
fun void activity() {
    while ( active ) {
        lfo.osc( oscFreq, oscAmount, oscType ) => float freqDelta;
        baseDelay::ms + freqDelta::ms => flanger.delay;
        lfo.osc( volFreq, volAmount, volType ) => feedback.gain;
        10::ms => now;
    }
}
{% endhighlight %}

Notes:

* flanger is a DelayA UGen.
* This code is reasonably abstracted; the important part being the two lfo.osc lines. One oscillates the flanger object delay time, while the other oscillates the feedback.
* The effect is recalculated every 10 milliseconds, which allows for LFO frequency resolution up to 50Hz.
* When initialised, the randomised parameters for the flanger are calculated in two groups:
    * Slow mode - slow LFO frequency (less than 1Hz) and large feedback parameter
    * Fast mode - faster LFO frequency with a smaller feedback amount, producing more of a tremolo effect.

The result of all this is that by assigning different LFO rates to the flange delay time and to the flange feedback time, you end up with a more chaotic, varying sound.

### Sample Hold Flanging

A further twist on the classic flanger is that every so often, rather than apply the flange effect with a sine wave LFO, the LFO type is set to sample hold. This gives us a flanger version of FxDelayVariable.

{% highlight chuck linenos %}
fun string getOscType() {
    chooser.getInt( 1, 4 ) => int choice;

    if ( choice == 1 ) {
        return "sampleHold";
    }
    else {
        // we would go with sine 75% of the time
        return "sine";
    }
}
{% endhighlight %}

## FxHarmonicDelay

This effect is halfway between a flanger and variable delay. Here the delay's amount switches between notes in a harmonic series (the root notes being randomly assigned from a pool of midi frequencies). The harmonic pitches are defined from the delay amount, meaning that very short delay amounts must be used. To get the harmonic effect a large amount of feedback must be used, which can lead to a somewhat volatile result. Half the time an LFO is placed on the feedback amount, which makes the effect a bit more bearable.

The harmonic 'notes' played are assigned randomly, so again the result is sample hold effect. Another interesting twist would be to assign a sequence of pitches that are continually repeated or gradually modulated.

## FxGate

Your father's tremolo effect involves applying an LFO to a gain so that the volume of the signal rapidly drops out and returns. In Concrete Mixer this effect has been made a bit more interesting because the LFO frequency itself is modulated with an LFO. Similar to FxVariableDelay, this creates a bit of variable mayhem.

{% highlight chuck linenos %}
    fun void activity() {
        while ( true ) {
            lfo.osc( lfoOscFreq, lfoOscAmount, "sine" ) => float freqDelta;
            lfoBaseFreq + freqDelta => float lfoFreqFinal;
            lfo.osc( lfoFreqFinal, amount, "sine" ) => float gainDelta;
            0.5 + gainDelta => g.gain;
            1::ms => now;
        }
    }
{% endhighlight %}

## FxReverseDelay

This class relies on a custom Chugen called ReverseDelay. ReverseDelay is small enough to include here in full.

{% highlight chuck linenos %}
public class ReverseDelay extends Chugen {
    float readArray[0];
    float writeArray[0];
    int readCount;
    int writeCount;
    float sample;

    fun void delay( int size ) {
        readArray.size( size );
        writeArray.size( size );
        size - 1 => readCount;
    }

    fun float tick( float in ) {
        // if readArray.size(), delay() has not been called
        // do nothing
        if ( ! readArray.cap() ) {
            return in;
        }

        in => writeArray[ writeCount ];
        readArray[ readCount ] => sample;
        writeCount++;
        readCount--;

        if ( writeCount == writeArray.cap() ) {
            switchArrays();
        }

        return sample;
    }

    fun void switchArrays() {
        float tempArray[];

        // switch arrays
        readArray @=> tempArray;
        writeArray @=> readArray;
        tempArray @=> writeArray;

        // reset counts
        0 => writeCount;
        readArray.cap() - 1 => readCount;
    }
}
{% endhighlight %}

The gist is that the current signal gets written to an array. Once the current array is full, it gets swapped with a second array. From then on values are read in reverse from the first array, providing the backwards delay signal, while current values get written to the second delay. This cycle repeats, and hey presto, reverse delay.

The effect is very simple and it's a surprise it (or perhaps a more acoustically sophisticated version) hasn't been implemented natively in ChucK.

Note: Chugens use a lot of system resources and this effect is not enabled by default for the Raspberry Pi.

## Chugins

ChucK comes with a small number of effects components built in, but the language also supports Chugins, which are compiled signal processing modules which can be used like Ugens. Two are used in Concrete Mixer: Gverb and Bitcrusher. Gverb provides better quality reverb than ChucK's native (and rather woeful) reverb Ugens. BitCrusher lowers bitrate and samplerate on a signal, turning it into metallic noise. These Chugins are incorporated into several CM effects chains.

# Concludings

That's an overview of Concrete Mixers effects system. There are other ideas I'd like to implement but at the moment there's enough variety to be getting on with.
