---
title: As a game engine developer
subtitle: 
layout: single
permalink: /game_development
modified: 2017-03-26
---

{% include toc %}

# Measurement

First important problem is how to measure the game in order to set the camera: in event or in time?

- 1st Blood
- Combat
- Farming
- Collaboration
- Scoring
- Team chase is also a part that is hard to define.

It's all about measurement, metrics, and quantifying things.

## Engineering part

Something cannot be done theoretically or mathematically. It can only get data from the empirical test and hand tune the parameters -- we need to go back to game and measure the units/time/events in the game. 

Sometimes, constants or numbers may be *magical number*. It may not make any sense to others who didn't know the background, but it would work, given the specific context setting. This "dirty" part cannot be elegantly avoid. DEAL with it.

# Cache and structure of the data

If data structure is random or too bad, it may lead to lots of useless cache.

Sometimes we need to reorder the variables/memories within a structure.

# Endianness (Byte Order)

- Little Endian (PC,XBOX)

```
[128][010][100][000]
#1st address: lowest (smallest byte)
#gradually increase
so the number is [100] - [010] - [128] 
```

- Big Endian (PS3): the reverse order

# Camera Setting and Speed Tweening

the two-circle model of the camera -- very helpful

# Javascript

USE JSLint

*javascript the good part*