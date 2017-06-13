---
title: Real time track data added to home page
layout: post
category: Concrète Mixer radio
---

You should notice that there's a "Now playing" section in the "hero image" on the home page which lists tracks currently playing in the Concrète Mixer audio stream. I've achieved this by:

- Adding extra [OSC](http://opensoundcontrol.org) request calls to `playSound.ck` within Concrète Mixer, which broadcast the file name being played
- Adding a [nodejs](https://nodejs.org) server which:
    - Listens for OSC notifications from `playSound.ck`, converting the file name into three parts:
        1. Sound contributor
        2. Description of sound
        3. Soundcloud track ID (if available)
    - Broadcasts the data to connected browsers via websockets (or other appropriate technology via [sock.js](https://github.com/sockjs))
- Added [nginx](https://www.nginx.com) to proxy both the node server and the mp3 stream to downstream consumers
- Adding javascript (humble [jQuery](https://jquery.com/)) to the homepage which updates the text under the player when a new track is played.

So far the Pi hasn't taken on any extra load from these services (the bulk of the CPU usage lies - understandably - with chuck and darkice). Admittedly the Pi's not serving many simultaneous connections. Still, what an awesome little machine, eh?

There's more work that could be done: as the metadata is currently bundled into the filename it's tempting to set up a database to keep track of the data at the node end, and simplify the file names to simple ids. The db would be built in sqlite or maybe one of those fancy nosql dbs I've hearing about. So many possibilities...
