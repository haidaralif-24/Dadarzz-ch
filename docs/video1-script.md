# Video 1: Hardware, Software & AI (snappy explainer, about 60 seconds)

One idea: **AI is software, software runs on hardware, so they are layers of one system.**
This video is the proof, because it uses all three.

Voice: personal. The narrator speaks as "I" (a learning journey), plain words, about 8 words on screen at a time.
The earlier 7-minute draft is kept in `docs/video1-script-long.md`.

## Working title

**Hardware, Software & AI: One System (in 60 seconds)**

## Script (about 100 spoken words)

### Scene 1: Hook (0:00 to 0:05)

> This video is hardware, software, and AI. All at once.

[Three icons pop in on the three words, slide into one glowing row, "All at once."]

### Scene 2: The three (0:05 to 0:17)

> Hardware: the stuff you can touch.
> Software: the instructions it follows.
> AI: software that learns from data.

[Three columns, one icon and one line each, appearing on each beat.]

### Scene 3: How they connect (0:17 to 0:37)

> AI is software.
> Software runs on hardware.
> Since AI is also software, it runs on hardware.
> Put them together, shape them with your own knowledge to fit what you need. That's engineering.

[Venn diagram builds, one statement at a time beside it. Center lights up: "Engineering".
On screen, the last line is shortened: "Put them together. Shape them to fit your needs. That's engineering."]

### Scene 4: The proof (0:37 to 0:50)

> And you're looking at the proof. The animations are code. AI helped write that code. And it's playing on your device.

[Device, then stack: software, AI, hardware. All three lit.]

### Scene 5: Outro (0:50 to 1:00)

> That's why I like them. I love building things with all three.
> [Dadarzz Engineering appears]
> Follow my learning journey. Hit Subscribe.

[On screen: "I love building with all three." then the name, then the button "Follow my journey: Subscribe". TODO: optional next-video teaser.]

**Honesty note:** the proof scene says AI helped write the animation code. Before recording, list exactly what AI did (animations, script help, voice, etc.) and say only that.

## Build notes

- 1920x1080, 30 fps, 1,800 frames. Scene lengths live in `src/videos/video1/timing.ts`.
- Entrances stay short (about 12 frames or less). One idea on screen at a time.
- Captions are deferred until the voiceover is recorded (they need real timing).
- Retime every beat to the voiceover once it exists.
