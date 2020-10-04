---
title: "My First Post"
date: 2020-10-04T00:33:54-04:00
draft: true
---


> **About This Issue**
>
> This is the first issue of my weekly coding digest. I intend to use this format to summarize my weekly learning, reading, thinking, and practicing about codings. I am trying to make it as a weekly routine.
>
> This week covers one general concept(**Turing Complete**), and tutorials & talks on **C++**.

<hr />
# Language Features

### <span style="color:red">Turing Complete</span>

> In computability theory, a system of data-manipulation rules (e.g. a programming language) is said to be **Turing complete** or *computationally universal* if it can be used to simulate any Turing machine. It's interesting that

This [Wikipedia](https://www.wikiwand.com/en/Turing_completeness) entry explains the general idea of **Turning Complete**. Now, the definition goes back to the definition of a (universal) Turing machine, and talks about computability. [Computerphile[video]](https://www.youtube.com/watch?v=RPQD7-AOjMI) and [Ben Eater[video]](https://www.youtube.com/watch?v=AqNDk_UJW4k) have two gread video explanations about what a Turing machine looks like and what are key components for a Turing complete language. For example, [Computerphile[video]](https://www.youtube.com/watch?v=RPQD7-AOjMI) mentioned a Turing complete language must have:
1. conditional branching (which implies "go to" mechanism)
2. arbitrary amount of memory (which is impossible in any real-world computer; then he talked about **Chomsky Hierarchy[??]**)

Nowadays, (almost) all general purpose programming languages are Turing complete. So, what languages are not Turing complete? [Stackexchange](https://softwareengineering.stackexchange.com/questions/202488/are-there-mainstream-general-purpose-non-turing-complete-languages-available-tod) and [Reddits](https://www.reddit.com/r/ProgrammingLanguages/comments/7092uf/nonturingcomplete_languages/) have two interesting discussions on this topic. The examples, which are always domain specific, includes
- data languages (HTML, JSON, etc)
- Regular expressions
- SQL (has a debate on this language)

<hr />

# Tutorials

### <small>C++ </small> | [Learn X in Y minutes: X = C++](https://learnxinyminutes.com/docs/c++/)

A nice short summary of basics from C++ languages. It covers _comparisons to C_, _object-oriented programming_, _templates_, and several C++ language features. It is always nice to read a short summary and get a feeling about what the language looks like.

<hr />

# Videos

### <small>C++</small> | [What – if anything – have we learned from C++?](https://channel9.msdn.com/Events/Lang-NEXT/Lang-NEXT-2014/Keynote)
![bs_2014](/images/bs_2014.png){: .imgright width="200px"}

Bjarne Stroustrup talked about his thoughts and ideas of designing the C++ language -- what C++ is and what C++ is not. At least in his mind, C++ should be:
> C++ is ageneral-purpose programming language with a bias towards systems programming that
> - is a better C
> - supports data abstraction
> - supports object-oriented programming
> - supports generic programming
Bjarne talked about several language myths in C++, argued against several of them and pointed out why those myths were wrong.

<hr />

# Break The Code

![Sims_2018](/images/Sims_2018.png){: .imgright width="300px"}
This week's code breaking focuses on understanding the codes that accompany the paper [Efficient coding explains the universal law of generalization in human perception](http://science.sciencemag.org/content/360/6389/652), and the original code is hosted [here at Open Science Framework](https://osf.io/x5ckn/).

My analysis and Python-transformation are [here at Github]()
