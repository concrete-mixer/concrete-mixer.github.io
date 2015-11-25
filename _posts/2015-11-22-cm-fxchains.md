---
title: About Concrète Mixer's effects chains
layout: post
category: Concrète Mixer
---

This post discusses Concrete Mixer's effects chains system, which is governed by the playFx entity within CM.

# Why effects?

Before we really get in to the discussion, it's probably worth asking why we need effects chains. For me there are two fundamental reasons:

* to blend disparate sound sources
* to dub it up a bit.

## Blending files

One or more raw recordings can be sound a bit sparse in the audio field, especially if they're mono. An effects chain helps to add depth to the stereo field.

In case you have recordings that are so bursting with incident they need no artificial enhancement, you can turn off the effects chain by specifying `fx_chain_enabled=0` in `conf/concrete.conf`).

## Dubbing it up

The main reason to alter a sound is to make it more interesting and/or appropriate for its intended use. My personal interest in this regard is similar to the approach taken in dub reggae, where vocal tracks are stripped back from the original multitrack and a variety of effects are applied to what's left in a manner convivial to herbal intoxication.

There is of course an art to dub, and expecting a series of random effects choices to enhance a recording perfectly is to ask quite a bit. The secret is to have the effects change reasonably often (around a minute is good), so that if one combination comes up that doesn't work, there's a good chance the next will be more appropriate.

# How the effects chains work

playFx defines 25 effects chains. The chains are groupings of the effects libraries found in lib/Fx, like so:

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

(It's probably worth nothing that ChucK doesn't support case statements, or else you'd be thinking the implementation is idiotic.)

The chains can be of arbitrary length, but the most you really want is four. This is partly because the cumulative result of too many effects is a mushy sound, but mostly because a Raspberry Pi has only limited CPU capacity and signal processing is expensive.

You'll note that each chain has a delay element. I think all the chains have some delay component, even if it's reverb. It's possible to have effects like flanging or filters which track with the source sound closely, but delay lines make the effects easier to discern, and also don't muddy the sound of the original too much. If echoes killed your brother and you'd rather not hear them, you can always rewrite the chains by editing 'lib/Modes/Concrete/playFxChain.ck`.

Some Fx* classes, FxDelay and FxFilter being good example, are wrappers for standard ChucK UGens. Others are custom (discussed below). ChucK users may be surprised that these effects have not been written as Chubgraphs (a convention for aggregating multiple Ugens together); this is for the simple reason that I haven't heard of them at the time. However, if I had my time over I definitely would.

MARK!

# Custom Fx libs

Organising the Fx* libraries meant I could experiment with several ideas around Fx design. Most of these ideas have involved tinkering with existing ChucK UGens, but in reasonably novel ways.

## FxDelayVariable

This effect randomly alters the delay amount, creating a skidding, skittering sound.

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
        // To paper over these cracks we fade the signal around
        // the discontinuities

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

Flangers are a reasonably straightforward effect to produce. With my implementation I've set an LFO on the feedback amount. I'm pretty sure I've never worked with a flanger that does this, though I guess it might be common. Certainly easy to do.

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

### Sample Hold Flanging

A further twist on the classic flanger is that every so often, rather than apply the flange effect with a sine wave LFO, the LFO type is set to sample hold. This gives us a flanger version of FxDelayVariable.

{% highlight chuck linenos %}
fun string getOscType() {
    chooser.getInt( 1, 4 ) => int choice;

    if ( choice == 1 ) {
        return "sampleHold";
    }
    else {
        return "sine";
    }
}
{% endhighlight %}

## FxHarmonicDelay

This effect is halfway between a flanger and variable delay. Here the delay's amount switches between notes in a harmonic series (the root notes being randomly assigned from a pool). The harmonic pitches are defined from the delay amount, meaning that very short delay amounts must be used. To get the harmonic effect a large amount of feedback must be used, which can lead to a somewhat volatile result. Half the time an oscillator is placed on the feedback amount, which makes the effect a bit more bearable.

The harmonic 'notes' played are assigned randomly, so again the result is sample hold effect. What might be more interesting is to assign a sequence of pitches that are continually repeated or gradually modulated.

## FxGate

This is your average tremolo effect where an LFO is applied to a Gain so that the volume of the signal rapidly drops out and then fades back in. This effect has been made a bit more interesting because the LFO frequency itself is modulated with an LFO. This is very effective for adding space to a sound, along with a bit of variable mayhem.

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

The gist is that the effect makes use of the same size. Values get written to one array, while the other is read from back to front. When the reader reaches the end (or beginning) of the array, it is swapped with the previous array, so that a continuous stream of samples is being reversed.

The effect is very simple and it's a surprise it (or perhaps a more acoustically sophisticated version) hasn't been implemented natively in ChucK.

Chugens suck a lot of system resources and s
