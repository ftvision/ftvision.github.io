---
title: "分布式系统的学习"
date: 2020-10-04T18:12:30-04:00
---

{{< box-highlight type="success">}}

这个集子主要收集分布式系统相关的学习资料。这些资料既包括理论学习方面的内容，也包括工作实践方面的内容，还包括面试准备方面的内容。

{{< /box-highlight >}}

### 课程

- [Programming Models for Distributed Computing](https://heather.miller.am/teaching/cs7680)
- [Introduction to Kubernetes](https://www.edx.org/course/introduction-to-kubernetes)
- [Introduction to Serverless on Kubernetes](https://www.edx.org/course/introduction-to-serverless-on-kubernetes)

### 书籍
- [Distributed systems for fun and profit](http://book.mixu.net/distsys/index.html)
- [Programming Models for Distributed Computing](http://dist-prog-book.com/chapter)

### 没有整理完的资料

I am a bit late to the party, but as it happens some top universities have made some of their systems programming courses publicly available, and if you want to get into systems programming, these free options are much deeper, comprehensive, and come with extensive coding assignments that include tests and have been crafted by talented TAs over many years, to help keep you on the straight and narrow:
[1] Operating Systems Engineering: MIT 6.828 (in C and a bit of x86 assembly, 2011 has videos for all lectures, bad image but outstanding content)

[2] Distributed Systems Engineering: MIT 6.824 (2020, in golang)

[3, 4, 5] Database Engineering: MIT 6.830 from OCW (2010, Java), complement with Pavlo's youtube videos and Stonebraker TA notes.

[6] Security Engineering: MIT 6.858 (2020, web, python, C, assembly, etc)

[7, 8] Computer Networks: Stanford cs144, get videos from youtube, assignments from their website (in C/ C++)

[9] Compilers: Stanford, the website has all videos and assignments (in Java or C++, RISC target)

[10] Software Performance Engineering: MIT 6.172 (2018 in OCW, in C/C++ and a bit of x86 assembly)

[1] https://pdos.csail.mit.edu/6.828/2011/schedule.html

[2] https://pdos.csail.mit.edu/6.824/schedule.html

[3] https://ocw.mit.edu/courses/electrical-engineering-and-compu...

[4] http://marcua.net/notes/6.830/

[5] https://m.youtube.com/playlist?list=PLSE8ODhjZXja3hgmuwhf89q...

[6] https://css.csail.mit.edu/6.858/2020/

[7] https://cs144.github.io/

[8] https://m.youtube.com/playlist?list=PLvFG2xYBrYAQCyz4Wx3NPoY...

[9] http://openclassroom.stanford.edu/MainFolder/CoursePage.php?...

[10] https://ocw.mit.edu/courses/electrical-engineering-and-compu...

No hip new languages or platforms, but if you are new to this I think it's better to focus first on battle tested concepts and approaches, from a curriculum that was fine tuned by top universities and professors (many of which made significant contributions to the field) over the years, then the bleeding edge stuff will be a walk in the park, because you will have learned what the tradeoffs are and where innovations are coming from.

As for prereqs, if you are a confident programmer, you can dive right in (6.004 is good but not essential, 6.033 is a bit of a slog on your own with all that paper reading and that brick of a book, and no programming, it is good but I found it just too hard to stay interested, skipped that part, but the videos in youtube are an excellent intro to systems design and concepts, I recommend you watch them first). But better if you know your algorithms first (do the excellent MIT 6.006), specially for 6.172 (the mantra here is to get your algos right before attempting any other kind of optimization), and maybe the database (hashes, trees and dynamic programming come in handy) and compiler courses (graph coloring for register allocation, for instance).

But, whatever you do, start with 6.828 operating systems, this is considered the MIT intro course to systems programming, and they explicitly avoid all but the most basic algorithms, in order not to distract from the core system concepts. More sophisticated approaches are introduced in the second half, once you've got the basics under your belt.
