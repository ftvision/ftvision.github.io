---
layout: single
title: Programming Paradigm Concepts
permalink: /programming_paradigm/programming_paradigm_concepts
modified: 2017-03-24
---



## Record

A record is a data structure: a group of references to data items with indexed access to each item. A symbolic programming language is able to calculate with records: create new records, decompose them, and examine them. Many important data structures such as arrays, lists, strings, trees, and hash tables can be derived from records. When combined with closures, records can be used for component-based programming.

## Lexically scoped closure

From an implementation viewpoint, a closure combines a procedure with its external references (the references it uses at its definition). From
the programmer’s viewpoint, a closure is a “packet of work”: a program can transform any instructions into a closure at one point in the program, pass it to another point, and decide to execute it at that point. The result of its execution is the same as if the instructions were executed at the point the closure was created.

##  Independence (concurrency)

When two parts do not interact at all, we say they are **concurrent**.(When the order of execution of two parts is given, we say they are sequential.) Concurrent parts can be extended to have some well-defined interaction, which is called communication.

There are three levels of concurrency:

- **Distributed system**: a set of computers connected through a network. A concurrent activity is called a computer. This is the basic structure of the Internet.
- **Operating system**: the software that manages a computer. A concurrent activity is called a *process*. **Processes have independent memories**. The operating system handles the task of mapping the process execution and memory to the computer. For example, each running application typically executes in one process.
- **Activities inside one process**. A concurrent activity is called a *thread*. **Threads execute independently but share the same memory space**. For example, the different windows in a Web browser typically execute in separate threads.

### Threads and Processes

The fundamental difference between processes and threads is how resource allocation is done. 

Process-level concurrency is sometimes called *competitive concurrency*: each process tries to acquire all the system’s resources for itself. The operating system’s chief role is to arbitrate the resource requests done by all the processes and to allocate resources in a fair way. 

Thread-level concurrency is sometimes called *cooperative concurrency*: threads in a process share resources and collaborate to achieve the result of the process. Threads run in the same application and so are guided by the same program.

There are two popular paradigms for concurrency. 

- The first is **shared-state concurrency**: threads access shared data items using special control structures called monitors to manage concurrent access. Another way to do shared-state concurrency is by means of transactions: threads atomically update shared data items. This approach is used by databases and by software transactional memory
- The second paradigm is **message-passing concurrency**: concurrent agents each running in a single thread that send each other messages

Since all threads run in the same address space, they all have access to the same data and variables. If two threads simultaneously attempt to update a global counter variable, it is possible for their operations to interleave in such way that the global state is not correctly modified. Although such a case may only arise only one time out of thousands, a concurrent program needs to coordinate the activities of multiple threads using something more reliable that just depending on the fact that such interference is rare. 


### Concurrency and Parallelism

Concurrency should not be confused with parallelism. Concurrency is a language
concept and parallelism is a hardware concept. This talk *[Concurrency Is Not Parallelism](https://vimeo.com/49718712)* covers good materials on this topic.


## named state

one property of a paradigm is how strongly it supports state. State is the ability to remember information, or more precisely, to store a sequence of values in time. In other words, **state introduces an abstract notion of time in programs**. Its expressive power is strongly influenced by the paradigm that contains it.

In functional programs, there is no notion of time. Functions are mathematical functions: when called with the same arguments, they always give the same results. Functions do not change. In the real world, things are different. There are few real-world entities that have the timeless behavior of functions. Organisms grow and learn. When the same stimulus is given to an organism at different times, the reaction will usually be different. 

How can we model this inside a program? We need to model an entity with a unique identity (its name) whose behavior changes during the execution of the program. To do this, we add an abstract notion of time to the program. This abstract time is simply a sequence of values in time that has a single name. We call this sequence a *named state*.

If F does not have named state then it cannot change its behavior. In particular, it cannot keep a counter of how many times it is called. The only solution in a program without named state is to change F’s interface (its arguments).

**The main advantage of named state is that the program becomes modular.**


## Objects and abstract data type

There are four main ways to organize data abstractions, organized along two axes. 
1. (State) Does the abstraction use named state or not. 
2. (Bundling) Does the abstraction fuse data and operations into a single entity (this is called an object or a procedural data abstraction (PDA)), or does the abstraction keep them separate (this is called an abstract data type (ADT)). 

### Polymorphism and the responsability principle

For programming the idea of polymorphism is similar: if a program works with one
data abstraction as argument, it can work with another, if the other has the same interface

###  Inheritance and Composition

It can be a good idea to define abstractions to emphasize their common relationship and without repeating the code they share. Repeated code is a source of errors: if one copy is fixed, all copies have to be fixed. It is all too easy to forget some copies or to fix them in the wrong way.

Inheritance can be a useful tool, but it should be used with care. The possibility of extending a definition B with inheritance can be seen as another interface to B. This interface needs to be maintained throughout the lifetime of B. This is an extra source of bugs. It is recommended to use inheritance as little as possible. When defining a class, we recommend to define it as nonextensible if at all possible.

Instead of inheritance, we recommend to use **composition** instead. Composition is a natural technique: it means simply that an attribute of an object refers to another object. The objects are composed together.

