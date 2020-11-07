---
title: "Turing Complete"
date: 2020-10-04T18:12:30-04:00
draft: true
---

> In computability theory, a system of data-manipulation rules (e.g. a programming language) is said to be **Turing complete** or *computationally universal* if it can be used to simulate any Turing machine. It's interesting that

This [Wikipedia](https://www.wikiwand.com/en/Turing_completeness) entry explains the general idea of **Turning Complete**. Now, the definition goes back to the definition of a (universal) Turing machine, and talks about computability. [Computerphile[video]](https://www.youtube.com/watch?v=RPQD7-AOjMI) and [Ben Eater[video]](https://www.youtube.com/watch?v=AqNDk_UJW4k) have two gread video explanations about what a Turing machine looks like and what are key components for a Turing complete language. For example, [Computerphile[video]](https://www.youtube.com/watch?v=RPQD7-AOjMI) mentioned a Turing complete language must have:
1. conditional branching (which implies "go to" mechanism)
2. arbitrary amount of memory (which is impossible in any real-world computer; then he talked about **Chomsky Hierarchy[??]**)

Nowadays, (almost) all general purpose programming languages are Turing complete. So, what languages are not Turing complete? [Stackexchange](https://softwareengineering.stackexchange.com/questions/202488/are-there-mainstream-general-purpose-non-turing-complete-languages-available-tod) and [Reddits](https://www.reddit.com/r/ProgrammingLanguages/comments/7092uf/nonturingcomplete_languages/) have two interesting discussions on this topic. The examples, which are always domain specific, includes
- data languages (HTML, JSON, etc)
- Regular expressions
- SQL (has a debate on this language)
