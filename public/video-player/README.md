
## VIDEO PLAYER

A standalone html component build from the static pages. It uses [https://www.theoplayer.com/](https://www.theoplayer.com/)

The react app renders this component using iframe to load a video using event Id.

### How to use

Video player expects 2 parameters, **eventId** **liveStreamEventId** **isLive**.

**EventId** is the unique identity of a stream. 
**liveStreamEventId** is the unique identity of the VOD 
while the **IsLive** is a flag to determine if event is live.

you can call the component using /video-player/index.html?eventId=123?isLive=false
