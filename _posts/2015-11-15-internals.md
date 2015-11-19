---
title: Gastroscopy of Concrète Mixer
layout: post
category: Concrète Mixer
precis: A look into the guts of the app<br>![Concrete Mixer flow diagram simplified](/img/cm-schematic-sensible.svg)
---

This post describes what Concrète Mixer is doing when it does its thing.

# Complicated diagram

The following is a schematic I put together describing all the componentry in Concrete Mixer:

![Concrete Mixer flow diagram](/img/cm-schematic.svg)

I started writing out what all this was doing and realised that in all honesty no one cares.

# Simple diagram

When you get down to it, what's actually important is the pipeline for what the listener gets to hear. With this in mind, here's a stripped down version of the diagram:

![Concrete Mixer flow diagram simplified](/img/cm-schematic-sensible.svg)

Key:

* The pink line denotes the app being initiated
* Purples lines denote flow of file names
* Brown lines: OSC messages and play* entity (re)invocation
* Blue lines: flow of audio signal from the play* entities to the sound card,

# What's going on - in brief

* The audio processing is written in [ChucK](http://chuck.cs.princeton.edu/).
* The ChucK libraries are enveloped by a sticky layer of [Perl](https://www.perl.org) which is there to do the things ChucK can't do.
* The Perl layer identifies the audio files to play (from directories the user has specified in `conf/concrete.conf`)
* There are two distinct sound entities in play:
    * playSound (of which there can be multiple concurrent instances)
    * playFxChain (of which there can be only one at a time)

* The app takes at least one but possibly two directories of WAV files as the sound source
* The app will stop playback once it has run out of wave files to play, or, because ChucK leaks memory, when the app has used more than half the system RAM. Alternatively, if the user configures `endless_play=1` in `conf/concrete.conf`, the app will restart rather than end, and will thus play perpetually.
* The app operates an OSC server in Perl space which receives signals from playSound and playFxChain that they have completed their tasks, and will generate new instances of both, until there are no more files left to play.

# What's going on - less briefly

## playSound

The playSound entity is there to play wave files. The entity gets passed a filename by the OSC server, and then loads the file for playback. The playback period is divided into random lengths of time (dertived from the `bpm` value specified in `conf/global.conf`) in which the sound can be altered in some way. For any given period, there is a 1/8 chance that playback will be altered. When the decision to alter playback is made, a further random choice is taken as to what should be done. Possibilities include:

* reversing playback
* changing the recording's pan position (if the sound is mono)
* adding an effect to the sound (eg echo, reverb)
* chopping up the playback in weird ways.

In all there are 13 possible operations that can be performed. The 1/8 ratio of for doing something different is a value derived through experiment and in accordance with my taste. To my ears, it seems appropriate to keep the wave files performing normal playback most of the time, with occasional forays into non-standard transmission to make things interesting.

## playFxChain

The playFxChain entity sets up an effects chain into which playSounds are fed. There are 25 different effects chains available. These chains contain different combinations of effects defined in lib/Fx, which has 14 different effects libraries available. Most of these effects are built in to ChucK but there are a few I've cobbled together. I might discuss these in a later post.

playFxChains are instantiated for random periods of time, separate to playSounds. This means that a playFxChain instance may fade out during playback of one or more playSounds, only for a different chain to fade in moments later. The intended effect is an ever changing sound, with playSounds and playFxChains criss-crossing each other. Even when all sound happens to fade out at the same time, the result can still be interesting.

## The OSC server

In Perl space the app operates an OSC server. OSC stands for [Open Sound Control](https://en.wikipedia.org/wiki/Open_Sound_Control), a simplish protocol that is intended to be a sort of [MIDI](https://en.wikipedia.org/wiki/MIDI) internet protocol. ChucK has OSC support, so it seemed the natural way for the ChucK to communicate with the Perl layer. So when each playSound and playFxChain instance have completed their task, they signal the OSC server, which will kick off another instance of the entity.


So that, in a nutshell, is how Concrete Mixer works.
