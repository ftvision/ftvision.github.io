---
title: "Digest 017"
date: 2021-01-15
categories: 
- 阅读笔记
tags:
- 技术新闻
---

## 文章

{{< digest-item "source"="https://2020.stateofjs.com/en-US/" "description"="行业研究" >}}
### EState Of Javascript 2020
{{< /digest-item >}}

这是一个关于2020年Javascript行业内的问卷调查，询问和总结了开发者的开发经验，喜爱的开发环境和工具，以及对于行业发展的开发。整个调查结果是以互动的方式展现出来的，我也学到了不是新东西。前端开发真的是越来越复杂了。

{{< digest-item "source"="https://marksaroufim.substack.com/p/machine-learning-the-great-stagnation" "description"="行业看法" >}}
### Machine Learning: The Great Stagnation
{{< /digest-item >}}

作者在这篇文章里面说了自己对机器学习这个行业近年发展的看法。文章前面一半有一点悲观的色彩，戳破了很多业界浮躁的泡沫，但是后一半还是总结了一些最近的发展。但是整体看来，这是一篇相当不错的对于行业历史和现状的一些总结。我也在里面学到了不少新的知识。这篇文章可以当作是一篇还不错的对于行业的overview。

{{< digest-item "source"="https://opensource.apple.com/source/clang/clang-23/clang/tools/clang/www/comparison.html" "description"="技术文档" >}}
### Clang vs Other Open Source Compilers
{{< /digest-item >}}

这个文档记录了苹果为什么当年选择在Clang上投入大量的人力物力，而不是选择使用其他的编译器。虽然Clang越来越大，也越来越慢，但是有一些功能确实比GCC好不少，比如他的extensibility，包括衍生出来的一系列clang-tidy工具。当年Google也是因为Clang的很多优势选择了Clang，放弃了GCC（我记得有些优势包括：编译出的程序更小，编译更快，调试信息更友好等）。Chandler等好几个人也是因为这个巨大的迁移以下成为了公司核心语言组的重要领导。我还挺好奇这样的迁移需要多大的成本的。我知道肯定不容易。

{{< digest-item "source"="https://candost.blog/how-to-stop-endless-discussions/" "description"="企业文化" >}}

### How to Stop Endless Discussions
{{< /digest-item >}}

这一篇是在讲技术文化中如何找到一种方式获得技术反馈，但是又不纠缠于无止境的技术反馈。这里提到的方法就是建立Request For Comments (RFC)机制，这个机制有三个重要的特性：
1. 一个RFC过程是某人针对某个主题写一个文档而开始的。所有的讨论都是给予这个提案文档的。
2. 每一个RFC过程有一个特定的时间窗；在时间窗范围内，所有人都可以对提案发表看法，或者提出建议。
3. 每个RFC的提案和所有的反馈都是公开的。

作者认为这个过程很有帮助，一方面是让提案的人通过书写的方式把自己的思维有条理地表达出来，另一方面是促使和鼓励别人给文档提供反馈，并通过这种方式展开讨论。这样，对问题解决方案的讨论就会变得可以控制。由于有时间窗的要求，这样的讨论也会有一定的时间效力。RFC这个方式在Python委员会、互联网委员会等地方都在实行，感觉是个比较正式的创作和审阅Design Doc的方式。

## 网络学习

{{< digest-item "source"="https://viewsourcecode.org/snaptoken/kilo/" "description"="网络教程" >}}
### Build Your Own Text Editor
{{< /digest-item >}}

这是一个相当详细的教程，教你怎么写一个简单的文本编辑器。虽然这个文本编辑器不是Graphic UI，但是功能还是可以的。这个项目，我觉得，是非常值得过一遍，来了解一些文本编辑器的基本组成部分的。

{{< digest-item "source"="http://book.realworldhaskell.org/" "description"="语言书籍" >}}
### Real World Haskell
{{< /digest-item >}}

Haskell的一本教材，在网上已经完全开源了。我记得我还买过一本1000+页的Haskell教材，但是也一直没怎么看过。有点伤感。

{{< digest-item "source"="https://f-of-e.org/" "description"="网络课程" >}}
### Foundations of Embedded Systems
{{< /digest-item >}}

这是一个嵌入式系统的课程。有很多资料是作为视频放在了网上，但是也有很多资料是当时的直播，所以现在看不到了。

{{< digest-item "source"="https://github.com/ashishpatel26/500-AI-Machine-learning-Deep-learning-Computer-vision-NLP-Projects-with-code" "description"="代码集合" >}}
### 500 + Artificial Intelligence Project List with Code
{{< /digest-item >}}

这是一个有点神奇的关于AI/机器学习的集子。这个集子的每个子项目都是一个集子，所以内容很多。比较好的一点是每一个集子本身都有代码，可以用来学习。当然，拿到这个集子本身没有什么用，最重要的还是从这个集子中的内容真正学到Coding。

## 多媒体

{{< digest-item "source"="https://www.youtube.com/watch?t=3366&v=6avJHaC3C2U&feature=youtu.be" "description"="技术演讲" >}}
### The Art of Code - Dylan Beattie
{{< /digest-item >}}

这是一个非常有意思，又很鼓舞人心的演讲。整个演讲没有讨论太多的技术细节，但是分享了很多演示和例子。演讲的主题既包括了“编程的艺术”，也包括了“编程何以可能”这样的问题，以及“编程的边界在哪里”这样的探索。莎士比亚程序语言和摇滚明星程序语言都是非常好的例子。而那个神奇的蛋糕语言，也是很有意思的双关：一个蛋糕的菜谱，既是可以使用的菜谱，也可以被编译成Hello World。这背后所涉及的创造力，以及创造的原则，都非常有意思。看完这个视频的人，一定会觉得编程是一件很有意思的事情吧。

## 工具、技术、展示

{{< digest-item "title"="Game of 2020" "source"="https://2020game.io/" "description"="小游戏" >}}
### Game of 2020
{{< /digest-item >}}

这个小游戏把2020年一年发生的大事件总结长了一个平面横版小游戏。还挺有意思的。玩完之后，确实让人感叹不容易。这个游戏的设计我觉得挺巧妙的。

{{< digest-item "source"="https://www.ioccc.org/2020/carlini/index.html" "description"="代码展示" >}}
### Best of show - abuse of libc
{{< /digest-item >}}

这是27届“国际C程序迷惑大赏”（The International Obfuscated C Code Contest）的获奖作品，展示了`printf`是怎么变成图灵完备的，然后整个code展示了如何用一条`printf`的语句做出来一整个tic-tac-toe的游戏。老实说，这个建构过程挺难的，尤其是解释中提到从直接建构`OR`和`NOT`两个逻辑操作开始，我觉得这个复杂性就难以捉摸了。

{{< digest-item "source"="https://github.com/norvig/pytudes/blob/master/ipynb/Advent-2020.ipynb" "description"="代码展示" >}}
### Advent of Code 2020
{{< /digest-item >}}

Peter Norvig给出的[Advent of Code 2020](https://adventofcode.com/2020)的解。要不是被引导到了这个Notebook，我都不知道有[Advent of Code 2020](https://adventofcode.com/2020)这么个游戏。Peter Norvig的代码确实是非常值得学习的。他有很多Python的用法都让我觉得眼前一亮。我顺着这个Notebook看了一下他其他的Notebook，感觉他所有的code都值得研究学习一遍。

{{< digest-item "source"="https://pile.eleuther.ai/" "description"="数据集" >}}
### The Pile
{{< /digest-item >}}

这是Eleuther.ai提供的一个800G的文本数据集，可以用来做NLP方面的机器学习工作。
