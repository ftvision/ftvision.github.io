---
layout: single
title: Programming Paradigm and Optimization
permalink: /programming_paradigm/
topic: Programming Introduction
modified: 2017-03-24
---

{% include toc %}

## Programming Paradigms

A programming paradigm is an approach to programming a computer based on a mathematical theory or a coherent set of principles. Each paradigm supports a set of concepts that makes it the best for a certain kind of problem. 
{: .notice--info}

You won't be able to learn all the programming languages in the wrold, but you can learn the shared philosophy and concepts for many programming languages. By learning programming paradigm, we learn the essence of those shared parts, and extrapolate our knowledge when detailed implementation of one language is encountered. 

| Content | Notes |
|:-------:|:-----:|
| Overview | [Notes](/programming_paradigm/programming_paradigm_overview) |
| Important Concepts| [Notes](/programming_paradigm/programming_paradigm_concepts)|

### References

- [Programming Paradigms for Dummies](https://www.info.ucl.ac.be/~pvr/VanRoyChapter.pdf) <span class="btn btn--success">Checked</span>
- [Ray Toal's Explanation](http://cs.lmu.edu/~ray/notes/paradigms/) <span class="btn btn--success">Checked</span>
- [Six programming paradigms that will change how you think about coding by Yevgeniy Brikman](http://www.ybrikman.com/writing/2014/04/09/six-programming-paradigms-that-will/) <span class="btn btn--success">Checked</span>
- [Kurt Nørmark's Overview of programming paradigms](http://people.cs.aau.dk/~normark/prog3-03/html/notes/theme-index.html) <span class="btn btn--success">Checked</span>

### Courses

- [Stanford CS107 Programming Paradigms](https://see.stanford.edu/Course/CS107/198) or [Here](http://videolectures.net/stanfordcs107s08_programming_paradigms/)
- [Paradigms of Computer Programming - Fundamentals](https://courses.edx.org/courses/course-v1:LouvainX+Louv1.1x+3T2016/info)
- [Paradigms of Computer Programming - Abstraction and Concurrency](https://courses.edx.org/courses/course-v1:LouvainX+Louv1.2x+3T2016/info)

## Programming Optimization

In computer science, program optimization or software optimization is the process of modifying a software system to make some aspect of it work more efficiently or use fewer resources. In general, a computer program may be optimized so that it executes more rapidly, or is capable of operating with less memory storage or other resources, or draw less power.
{: .notice--info}

### Data-oriented design


> Programming, by definition, is about transforming data: It’s the act of creating a sequence of machine instructions describing how to process the input data and create some specific output data. -- Noel Llopis

> Designing the code around the data, not the other way around -- Linus Torvalds, [source](https://lwn.net/Articles/193245/)

I came to know the *data-oriented design* or *data-oriented programming* when I was an intern programmer at a game studio, [the Sparkypants studio](https://www.sparkypants.com/). One key aspect of data-oriented design is to deal with random memory access patterns and constant cache misses, so that optimized code can run faster. 


Data-oriented design shifts the perspective of programming from objects to the data itself: The type of the data, how it is laid out in memory, and how it will be read and processed in the game.

In general, the ideal data is in a format that we can use with the least amount of effort. To achieve this, we actually aim to deal with large groups of objects at the same time: we break down each objects into different components, and group components of the same type together in memory, regardless of what object they came from. In this way, we end up with large blocks of homogeneous data. With small functions, we can process these homogeneous data very effieciently, because we may have fewer cache misses and maximize cache usage. 

Such an organization of data and an emphasis on data-oriented design can lead to a flat hierarchy of program dependencies, making it easy and clear to constructre different modularities. To Test code, it is simple and straightforward: create some input data, call the transform function, and check that the output data is what we expect. 

According to Noel, the data-oriented design has several advantages:

1. Easy to Parallelization
2. Cache-friendly memory access
3. Good for modularity design
4. Easy for testing

But it is not widely accepted in practice. [Mike Acton's Talk](https://www.youtube.com/watch?v=rX0ItVEVjHc) has a very good example when someone stands up in the Q&A session. This idea of data-oriented design is different from what most programmers are used, and it can take lots of energy to interface with existing code. 

To practice such an optimization idea, Noel suggsted:

1. Identify a problem
1. Identify the data inputs required by the system, and what kind of data it needs to generate. 
1. Take a step further and classify the input data based on how it is used. Is it read-only, read-write, or write-only? 
1. Decide where to store and when to process data depending on how data is used.
1. Think very carefully how the data is used during the transformation process from input to output.

#### Reference

[Noel's Remark](http://gamesfromwithin.com/data-oriented-design) <span class="btn btn--success">Checked</span> and [What is Data-Oriented Game Engine Design](https://gamedevelopment.tutsplus.com/articles/what-is-data-oriented-game-engine-design--cms-21052) <span class="btn btn--success">Checked</span> are very good places to start. [Mike Acton's Talk](https://www.youtube.com/watch?v=rX0ItVEVjHc) <span class="btn btn--success">Checked</span> at Cpp Conference 2014 is an excellent one. All these materials are worth reading and listening again and again.

Scott Meyers's talk on [CPU Caches and Why You care](https://vimeo.com/97337258) concerns the fundamental motivations of data-oriented design. It is worth watching even if you don't care about the idea of data-oriented design.

This [A curated list of DoD](https://github.com/taylor001/data-oriented-design) is very useful. There is also a [Data Oriented Design Ebook](http://www.dataorienteddesign.com/dodmain/), although I didn't actually read it. 




