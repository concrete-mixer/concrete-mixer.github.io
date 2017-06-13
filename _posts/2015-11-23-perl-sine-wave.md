---
title: Perl sine wave demo
layout: post
category: Audio coding
precis: Audio processing basics in Perl... just because.
---

There is no good reason to write audio code in Perl, but on the other hand, no reason not to, so here we go.

# Piping hot sound

Someone may have written an audio library for Perl which interfaces with Alsa in a 'proper' way, but there's a grubbier and consequently more appropriate way of doing it: through the shell.

`$ perl script.pl | aplay -f cd`

This command pipes the output of a perl script to Alsa's aplay utility, which can take a data stream as input. The `-f cd` means fire the stream to the soundcard at a sample rate of 44Khz, which is the samplerate a CD uses.

With this in play, you need to write a script that will generate an audio-appropriate stream of data. The simplest sound you can generate is white noise, because you just generate a set of random values within a 16 bit range of amplitudes. We're a bit more sophisticated, than that, however, so we're going to start by generating a sine wave:

{% highlight perl linenos %}
#!/usr/bin/perl
use strict;
use warnings;

my $PI = 3.1415926;

# Amplitude for signal, roughly 50% of max (32768) or -6db
my $amplitude = 16384;
my $freq = 440; # Frequency in Hertz ('A4' note)
my $sample_rate = 44100;

# define time increment for calculating the wave
my $increment = 1 / $sample_rate;
my $t = 0;

while (1) { # do this perpetually
    $t += $increment; # Time in seconds

    my $signal = $amplitude * sin($freq * 2 * $PI * $t);
    print pack("v", $signal);
}
{% endhighlight %}

The guts of this script is `my $signal = $amplitude * sin($freq * 2 * $PI * $t);`. This is high school maths/physics (I'm told, it's all so long ago now I can't actually remember :/). Essentially you generate a sine wave by rotating through a circle (2*pi radians) and plotting the sine of the angle of rotation (0 - 360, or phase) as an amplitude through time. (The preceding gibberish is my understanding, if you want a proper description please [consult wikipiedia](https://en.wikipedia.org/wiki/Sine_wave).

Once you've got the $signal value you need to format it as a little-endian integeger:

`print pack("v", $signal);`

So you print to stdout and the shell does its piping and aplay does the rest.

# Making the signal more interesting

A sine wave is nice but you can do more interesting things than that. The first thing to do is modulate the pitch. The easiest way to do this is randomly module the pitch every so often:

{% highlight perl linenos %}
my $base_freq = 1760Hz; # maximum frequency

while ( 1 ) {
    my $n = 0;

    while ( $n < 22050 ) { # half a second @ 44100 samplerate
        $t += $increment; # Increment $t

        my $signal = sin( $freq * 2 * $pi * $t ) * $amplitude;

        print pack("v", $signal);

        $n++;
    }

    $freq = rand( 1 ) * $base_freq;
}
{% endhighlight %}

We've added an additional while loop to iterate through a fixed number of samples before we randomly change the frequency. (`$freq = rand( 1 ) * $base_freq` implies a range down to 0Hz, so be careful running this through speakers. [Watch your bass bins, I'm telling ya](https://www.youtube.com/watch?v=gIzSZH6oqeM).

Incidentally, if you're familiar with synthesizers, the above is equivalent to pitch-modulating sample hold.

# Adding echoes

For me the gold standard of any signal modulation is adding echoes. I grant you this will seem childish to proper DSP ninjas who like constructing fourth order [Chebyshev filters](https://en.wikipedia.org/wiki/Chebyshev_filter), but for me the space that echoes provide really is the place.

An echo means holding playing a signal for a period of time. Arrays are perfect for this: bung your stream's sample in memory and retrieve them for playback later.

{% highlight perl linenos %}
# initialise array of zeroed integers for delay line
my @delay = (0) x 22050; # == half a second of signal delay

while ( 1 ) {
    my $n = 0;

    while ( $n < 22050 ) { # half a second @ 44100 samplerate
        $t += $increment; # Increment $t

        my $signal = sin( $freq * 2 * $pi * $t ) * $amplitude;
        my $signal_delayed = ( shift @delay );

        # make delayed_signal 6dB quieter than main signal
        $signal_delayed *= 0.5;

        # mix the two signals together
        $signal += $signal_delayed;

        # increment @delay with signal plus previously delayed signal
        push @delay, $signal;
        print pack("v", $signal);
        $n++;
    }

    $freq = rand( 1 ) * $base_freq;
}
{% endhighlight %}

So we're sitll sample-holding the pitch of the sine wave as before, but we're now setting and retrieving values from an array, and mixing it with at a quieter bolume (-6dB) with the current signal. It still seems miraculous to me that simple addition (at the per sample level) can impose a new sound on top of the old, but it does.

# Where does this take us?

Mid last year I went some way towards building my own drum machine/note sequencer system in Perl, using MooseX. I had track sequences written in JSON structures, some effects like flanging, ring modulation, and even reverse echoes (hint: use two arrays, swap them as required, and read the one you're not writing to backwards). So it was all going swimmingly until I checked the CPU usage on my laptop: 100% playing a mono drum machine sequence and monophonic note sequence. Such a simple rig in a commercial audio software package would be expected to use 1-2% CPU.

I suspect the reason for this problem is that interpreted languages like Perl are just too inefficient to be calculating large numbers of samples in real time. I attempted to make things more efficient by batch rendering content rather than running through the entire stack to calculate each sample. This didn't seem to make any improvement.

What I took away is that compiled languages like C and C++ are more appropriate for this sort of application, and I promptly ceased my activities. Even so, if you have simple ideas you want to try out, and/or vast system resources, Perl can do it.
