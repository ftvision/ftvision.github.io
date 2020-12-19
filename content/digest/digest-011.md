---
title: "Digest 011"
date: 2020-12-05T12:16:30-05:00
---

## 文章
{{< digest-item "title"="This is Real. That's Not." "source"="https://streetlifesolutions.blogspot.com/2020/12/this-is-real-thats-not.html" "description"="不同人生" >}}

作者写了自己从一个上层家庭出身变成一个无家可归的流浪者的过程中所体验到的世间百态。作者说自己以前以为这个世界人们都互相友爱，为人善良。结果沦为流浪者之后才发现这个世界充满了恶意，尤其是别人对于自己认为”卑贱“的人的恶意。作者经历过的最糟糕的欺辱是来自看起来受过高等教育或者家庭出身好的几个人的。这篇文章想告诉那些生活在“温室里”的人们：“你们现在认为理所当然的一切，都不是理所当然的。你们以后好的教育、好的家庭就能获得富足的生活；但是我想告诉你们，好的教育，好的家庭，也可能沦为无家可归的流浪者。”这篇文章写得挺好的，值得细细品味。

{{< digest-item "title"="Peer rejection in science" "source"="https://nintil.com/discoveries-ignored" "description"="科学历史" >}}

文章讲了科学过程中33个在提出时反复拒绝，但最后证明有重大价值的科学发现和科学研究。这篇文章很长，但是每个例子可以分开来看。每个例子都提供了信息来源和事件概述。确实，在科学研究路上前行的同僚们都可以读一读这个帖子，了解一下在科学的前路是如何道阻且长。

{{< digest-item "title"="Why scientists are turning to Rust" "source"="https://www.nature.com/articles/d41586-020-03382-2" "description"="学界观察" >}}

连Nature都报道Rust了，你今天还没有学Rust吗？

Rust的优点就是安全、高性能、能兼容甚至替代C/C++；而缺点就是比较难学，因为有很多语言内的概念是很新颖的，比较难理解。

{{< digest-item "title"="Math keeps changing" "source"="https://macwright.com/2020/02/14/math-keeps-changing.html" "description"="知识分享" >}}

这篇跟上一期的《1.5 is the midpoint between 0 and infinity in Ruby》相关，说到底还是计算机的浮点表征的问题。但是这一篇有意思的地方是讲到了不同版本的Javascript/NodeJS会在浮点表征和浮点运算的结果会不一样。这也就是说，如果你写的Javascript代码涉及到高精度浮点数的计算的话，那么版本的更新可能会产生很隐秘的bug。

文中讨论了很多关于数学在计算机中实现的问题，其中有一句话说得非常好：

> So math is implemented as algorithms, and there are multiple common algorithms – and variations of those algorithms – used in practice.
>
> 数学是通过算法来实现的，而实践中存在多个常用的算法，以及这些算法的各种变体。

这篇文章提到了高精度数的差异会在从底层硬件到上层软件之间的任意阶段。文章主要说了三个不同的阶段：
1. 出现在CPU的实现阶段：不同的CPU在浮点数计算上会有不同。这个基本上对于软件开发者而言，只能知晓，无法改变。
2. 出现在程序语言的编译/解释阶段：不同的编译器和解释器可能会有不同的浮点计算实现的方式。很多程序语言的语言规则里面是没有直接说明数学运算应该如何实现的，所以实现方法就完全由编译器和解释器的提供者决定。
3. 出现在软件的实现阶段：不同的软件设计会使用不同的数学工具包或者工具库，而这些工具库可能会用不同的算法来实现数学计算。

{{< digest-item "title"="Writing usable code" "source"="https://www.algolia.com/blog/writing-usable-code/" "description"="软工心得" >}}

这篇将代码可用性的博客文章写的浅显易懂。他们的配图画的也非常好懂，对我很有启发。这是一篇值得学习的博客文章。[Algolia的技术博客](https://www.algolia.com/blog/?filter=engineering)有挺多优秀的技术文章的。这又是另一个通过博客让我认识并且心生喜欢的公司。

## 网络学习

{{< digest-item "title"="S.O.L.I.D: The First 5 Principles of Object Oriented Design" "source"="https://www.digitalocean.com/community/conceptual_articles/s-o-l-i-d-the-first-five-principles-of-object-oriented-design" "description"="软工知识" >}}

这帖子是Digital Ocean写的SOLID原则的介绍。
* S - Single-responsiblity principle
  * 一个类只要做一件事情，不要做两件事情。
  * 如果一个`AreaCalculator`类既计算面积，又负责以特定的格式输出结果，那就是在做两件事。这种情况下，应该一个`AreaCalculator`类只计算面积，另一个`Reporter`类决定输出的格式。
* O - Open-closed principle
  * 对象和客体可扩展(open for extension)，但不可被修改(closed for modification)。
  * 一个类在需要处理新的客体的时候，这个类内部应该不需要做更多的修改，而是能够通过自然的扩展来接受新的客体。文中提到`AreaCalculator`一开始可以处理`Square`和`Circle`的面积。如果这两个形状的面积计算是在`AreaCalculator`内部实现的话，那么遇到一个新的`Triangle`形状的时候，`AreaCalculator`的内部就需要改变，这样就不是一个很好的设计。如果`AreaCalculator`内部只是call属于不同形状自己的`area()`函数的话，那么任何一个新的形状可以负责实现自己的`area()`函数，而`AreaCalculator`就不需要根据各种新的情况来修改自己的内部逻辑了。
* L - Liskov substitution principle
  * 子类/派生类(subclass/derived class)应该可以被基类(base class)替代。
  * 我的理解是，在相同的接口处，子类和基类应该提供同样的输入输出接口。不能基类`foo()`返回一个数组，而子类`foo()`返回一个浮点数。
* I - Interface segregation principle
  * 不应该强制某个类的用户实现或者依赖一个他们不需要的接口。
  * 比如如果一个`ShapeInterface`要求同时实现`area()`和`volumn()`两个函数，这就不太合理。因为一个2D形状是不需要计算体积的，所以使用不应该勉强`ShapeInterface`的用户实现`volumn()`这个接口。这种情况，应该把`area()`和`volumn()`分离成两个不同的接口`ShapeInterface`和`SolidShapeInterface`，然后客户可以选择多重继承来选择性地实现不同的接口。
* D - Dependency Inversion Principle
  *   应该依赖抽象接口，而非依赖具体实现。
  *   比如一个依赖数据库的`PasswordReminder`类，这个类的形式参数(parameter)应该依赖一个`DBConnectionInterface`抽象接口，而不是直接依赖一个具体的`MySQLConnection`具体类。这里`MySQLConnection`这个具体类可以实现`DBConnectionInterface`的所有接口，并作为传入`PasswordReminder`的实参(argument)。

## 多媒体

{{< digest-item "title"="Prisoners In Finland Live In Open Prisons Where They Learn Tech Skills" "source"="https://yahnd.com/theater/r/youtube/l554kV12Wuo/" "description"="不同人生" >}}

这个视频非常有意思，介绍了芬兰的人性化监狱。视频有两条线，一条是以“点”切入，介绍一个杀人犯在监狱中的生活，锻炼和学习。这个犯人介绍说自己在学习人工智能和创业(entrepreneurship)，然后介绍了一下监狱里面提供的生活环境和教育、就业的机会。另一条从“面”上描述，介绍芬兰过去几十年在监狱制度方面的发展和改变。新修的监狱都更加人性化、更加科技化，帮助犯人在监狱内也能跟上社会的科技发展，而老的监狱逐渐被淘汰，或成为博物馆。整个视频就是这两条线缠绕在一起推进故事的叙述。

但是这种监狱制度可能并不能在其他地方推广。片中提到，美国关在监狱里面的罪犯人数是芬兰国家总人数的一半，所以就不要指望美国能实现这样的人性化的监狱了。

有很多问题，在不同的规模下，能够使用的解决方法是完全不一样的。科学工程如此，人文社科也是如此。

{{< digest-item "title"="AlphaFold: The making of a scientific breakthrough" "source"="https://yahnd.com/theater/r/youtube/gg7WjuFs8F4/" "description"="科技新闻" >}}

这一周的大新闻之一当然就是DeepMind号称解决了困扰结构生物学50年的问题，然后“解决了”蛋白质结构的问题。人工智能是不是*解决了*这个计算问题，当然是值得怀疑的。但是有两点是肯定的：
1. DeepMind确实实现了突破。
2. DeepMind真的是优秀的PR工具。

{{< digest-item "title"="Painting a Selfie Girl, with Maths" "source"="https://yahnd.com/theater/r/youtube/8--5LwHRhjk/" "description"="技术分享" >}}

这个视频分享了如何用一系列的数学运算来绘制一个“在自拍的姑娘”。作者一边介绍每一步所使用的数学公式，一边展现应用某个数学公式所绘制的画面。视频从一开始的一个球到最后的一个姑娘在雪地里照自拍的整个画面，让我觉得真是一步一步见证魔法的力量。

代码和成品可以在[ShaderToy](https://www.shadertoy.com/view/WsSBzh)上看到。视频背后的数学是signed distance function(SDF)，[ShaderToy](https://www.shadertoy.com/)上还有很多有意思的例子，比如[这个错觉](https://www.shadertoy.com/view/tdyfRR)。作者的[网站](https://iquilezles.org/index.html)上有更多教程和展示！


{{< digest-item "title"="The Fast Fourier Transform (FFT): Most Ingenious Algorithm Ever?" "source"="https://yahnd.com/theater/r/youtube/h7apO7q16V0/" "description"="知识讲解" >}}

从多项式乘法的角度来讲解快速傅里叶变换（FFT）的算法。我觉得这是我第一次学懂了这个O(nlogn)的多项式乘法的算法。真的非常感谢这个视频的制作者！

看完了这个视频以后，我又去找了这个制作者其他的视频。他在Youtube上有个账号，叫[Reducible](https://www.youtube.com/channel/UCK8XIGR5kRidIw2fWqwyHRA)，上面发了一些关于计算机算法和数据结构的讲解视频。这一类视频风格非常类似[3Blue1Brown](https://www.youtube.com/channel/UCYO_jab_esuFRV4b17AJtAw)讲解数学的视频风格，从动画制作和可视化的呈现，到叙述方式，都跟3B1B有类似之处。3B1B也在Twitter上推荐了他制作的这个FFT的视频。


## 工具、技术、展示

{{< digest-item "title"="Flappy bird in 205 bytes" "source"="https://gist.github.com/gullyn/95b2ab9e465317f1d4e4607cf6e94205" "description"="代码片段" >}}

这是一个非常有意思的Gist：如何用最少的字符来实现Flappy Bird这个游戏。从一开始HTML的版本， 到接下来的Dataurl的版本，到最后的SVG版本，大家通过每次抠掉几个字符的方式，把一开始300+字符的实现，降到了一个195字符的实现。其中还有一个帖子帮着讲解了最精简的实现。

{{< digest-item "title"="Quick Python" "source"="https://timothycrosley.github.io/quickpython/" "description"="怀旧编辑器" >}}

一个Quick Basic/Turbo Pascal界面的Python IDE，一秒钟回到我的中学时期，当年竞赛的记忆涌上心头。[Github仓库在此](https://github.com/timothycrosley/quickpython/)，有机会可以读一读Code实现。
