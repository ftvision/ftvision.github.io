---
title: Multithreading in C++
date: 2020-12-24
---

## 笔记
ß
> Multithreading in C++ consists of *threads*, *synchronization primitives* for shared data, *thread-local data*, and *tasks*.

### Memory Model

This contract is between the programmer and the system. The system consists of the compiler that generates machine code and the processor that executes the machine code, and it includes the different caches that store the state of the program. The result is - in the good case - a well-defined executable that is fully optimized for the hardware platform. To be precise, there is not only a single contract, but a fine-grained set of contracts; i.e. the weaker the rules are that the programmer has to follow, the more potential there is for the system to generate a highly optimized executable.

There is a rule of thumb: the stronger the contract, the fewer liberties for the system to generate an optimized executable.

#### First Level
Before C++11, there was only one contract. The C++ language specification did not include multithreading or atomics. The system only knew about one control flow and, therefore, there were only restricted opportunities to optimize the executable. The key point of the system was to guarantee–for the programmer–that the observed behavior of the program corresponded to the sequence of the instructions in the source code. Of course, this means that there was no memory model. Instead, there was the concept of a sequence point. Sequence points are points in the program, at which the effects of all instructions preceding it must be observable. The start or the end of the execution of a function are sequence points. When you invoke a function with two arguments, the C++ standard makes no guarantee about which arguments will be evaluated first, so the behavior is unspecified. The reason is straightforward: the comma operator is not a sequence point and this will not change in C++.


Second Level #
With C++11 everything has changed. C++11 is the first standard aware of multiple threads. The C++ memory model that was heavily inspired by the Java memory model is the reason for the well-defined behavior of threads. However, the C++ memory model goes - as always - a few steps further. The programmer has to obey a few rules in dealing with shared variables to get a well-defined program. The program is undefined if there exists at least one data race. As I already mentioned, you have to be aware of data races if your threads share mutable data. Tasks are a lot easier to use than threads or condition variables.


Third Level #
With atomics, we enter the domain of the experts. This will become more evident, the more we weaken the C++ memory model. We often talk about lock-free programming when we use atomics. I spoke in this subsection about the weak and strong rules; indeed, the sequential consistency is called the strong memory model, and the relaxed semantic is called the weak memory model.
