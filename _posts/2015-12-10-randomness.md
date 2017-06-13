---
title: Randomness in sound
layout: post
category: Concrète Mixer
---

A somewhat chin-strokey examination of how chance can be applied to open-ended electronic audio.

When starting out writing audio processing scripts my plan was to devise a system that would generate sound sufficiently complex that by listening to it I wouldn't be able to determine how it had been constructed.  I'm not sure quite why this idea interests me, but I guess I like suprises.

The problem with this approach is that writing something that baffles you requires a lot of complexity and a lot of time - something at odds with the amount of time (generally, nocturnal dilettanting) that I can invest. Concrete Mixer ended up being a compromise. Take some real world sounds (ie don't invest a lot of effort in complex signal generation) and devise a broad range of operations that could be applied to them, determined by chance.


# Go plenty random

Concrete Mixer makes a lot of choices in determining the sound that is output:

* The order in which sound files are played (and which consequently which files will be mixed with each other). Even with a few dozen files the number of possible combinations of sounds in a single render run is enormous.
* The order in which effects are applied - there are 25 effects chains, which chosen randomly.
* The amount of time an effect or sound playback manipulation is applied: each sound playback is divided into random stretches of time. For 7/8 of these segments, sample playback will proceed in a normal fashion; for the other 1/8 sound manipulation will be performed. Similarly, each effects chain is applied for a random period. Multiplying these factors, in any 20 second period some change in playback is being determined.
* Further to this, each time some sound manipulation is performed, it may have many parameters that are determined randomly.

What I really want to convey is that the parameter space for CM is huge and thus, however subtly it may seem, every time you listen to it it is playing in a way it has never played before, or will again.

Additionally, part of the process of improving CM is providing even more choices and consequently more variety and uniqueness.


# But never go full random

Randomness is good, but there's a hefty constraint to be applied: whatever and however many decisions get made, the result has to sound good. There's no point writing an app that regularly presents its sounds in a way that listeners don't like.

An early iteration of Concrete Mixer called Sound Forest frequently sounded poor, mostly because I had the parameter space for the effects chain so open that a often the choices made were nonsensical. Even so I remained undaunted: I even earnestly explained in the README file that although the app would often sound terrible, that this was in fact a virtue. Eventually it occurred to me that things had to be reined in a bit. I've always been sceptical about musicians who are enamoured with process over result, and going full random with awkward results is less ideal than providing a constrained but more rewarding set of possibilities.

Even so, there's no way that a computer arbitrarily making choices will always make the optimum choice for the sound files being played. Not without some fiendish piece of sound analysis. In this sense CM will never be the equal of a deliberate composition of Musique Concrete. Looking at it another way though, when an apt choice does get made, you can appreciate it more for being a product of chance rather than intent.
