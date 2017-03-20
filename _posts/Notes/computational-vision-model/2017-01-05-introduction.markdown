---
layout: single
title: General Introduction
permalink: /CVmodel/introduction/
prev: /CVmodel/
late: /CVmodel/retina/
topic: Computational Models for Vision
topiclink: /CVmodel/
---

## Vision is difficult.

>Vision: to know what is where by looking

Vision is a hard problem:

- Solve the vision problem in a summer
	- In 1966, there was a [summer research project](https://dspace.mit.edu/handle/1721.1/6125) at MIT that tries to solve the vision problem in a summer. Fifty-years later, we are still working on it.
- Vision information and tasks are *ambiguous*: complexity of images, ambiguity of images, complexity of visual tasks. In results, the computational could be non-trivial, such as accidental alignment and conincidences, and computations could result in illusions. When there is much information, we cannot recover the true physical world.
	- The raw input is a set of numbers, but the image patterns are very complex.The patterns are very different even for similar objects (same bike and tree – changed viewpoint).
	- The set of all images is practically infinite.
		1. Only a tiny fraction of all possible images have been seen by humans.
		2. The number of visual scenes is also enormous. There are 30,000 different types of objects. They can be arranged into 1,000 scene categories. This can be done in an exponential number of ways.
- Vision is so efforless for human, even when there is little information, we can recognize objects and stimuli very well, such as biological motion. Humans appear to understand images effortlessly. But this is only because of the enormous amount of our brains that we devote to visual tasks. It is estimated that *40-50% of neurons in the cortex* are involved in doing vision.
- **Vision is a full AI problem**
	- Understanding of objects, scenes, and events.
	- Reasoning about functions and roles of objects, goals and intentions of agents, predicting the outcomes of events.
	- Visual Turing Tests: can computers answer all questions that a human can about images (or do it better)? (D. Geman and S. Geman).

<hr>

## Taxonomy

### Low-level Vision

**Scope:** local image operations which have limited knowledge of the world.

Examples:

- Image processing.
- Filtering, denoising,
- enhancement.
- Edge detection.
- Image segmentation.

### Middle-level Vision

**Scope:** semi-local operations which know about surfaces and geometry.

Examples:

- Estimation of 3D surfaces: E.g., binocular stereo,
- structure from motion,
- Figure: Images, Depth,
- Segmentation: interacting with the low-level vision
- Surface perception

### High-level Vision

**Scope:** non-local operations knowing about objects and scene structures.

Examples:

- Object Detection
- Scene Understanding, such as the gist of a scene.
- Visual Attention
- Interpret images, reason about them, predict the future, estimate danger.￼￼

 
### Information flow: How do these levels interact?

1. Feedforward – from low-, to mid-, to high.
2. Feedback – high to low -- analysis by synthesis.
3. Low-level vision makes proposals which are validated by high-level vision.
	- High-level can dominate low-level:
		1. [Tanz Illusion](https://www.youtube.com/watch?v=44mw37d8LQw)
		2. [Inverted Face Mask](http://www.michaelbach.de/ot/fcs_hollow-face/index.html):We see it as a real face, but it isn’t.

<hr>

## Research Strategy

>Divide and Conquer: divide vision up into many subtasks that can be studied separately.

### Vision as Inverse Inference

- Helmholtz. 1821-1894.
- More recently: inverse computer graphics: Vision must invert the forward process (CG) to discover the causal factors that have generated the images. But only for the tasks that we care about – attention, change blindness.
- Humans have internal representations – we see images when we dream, we can imagine what animals and people will do, we can hallucinate.

#### Bayesian Decision Theory

- Inverse Problems are hard. They require priors. Priors are often helpful, but sometimes can give rise to mistakes.

#### Compositional Models 

- Compositional models represent objects and scenes in terms of compositions of elementary shared parts: this offers a possible solution to the complexity problem of vision.

#### Pattern Recognition

- It is all about Patterns. Fundamentally vision is all about patterns and Mathematical/Computational tools for modelling them. Useful models range from linear filtering to graphical models to deep networks.