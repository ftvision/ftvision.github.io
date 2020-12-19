---
title: "Digest 008"
date: 2020-11-13T09:46:06-05:00
---

## 文章

{{< digest-item "title"="I sold Baremetrics" "source"="https://baremetrics.com/blog/i-sold-baremetrics" "description"="经验分享" >}}

Josh Pigford分享了他决定卖掉Baremetrics这个公司的决定。虽然我第一次知道这个公司，但是整个文章把这个决定的过程说得很清楚，很透明。作为局外人，我还是很感谢有人把这个写出来的。整个公司10个人，1000多个用户，售价4百万美元，创始人可以拿走370万美元，剩下30万分给了9个员工，而早期投资了80万的投资人决定一分钱都不要。这个结果我感觉还是有点惊讶的。一方面是投资人竟然连本都不要了，另一方面是员工竟然拿了不到一个零头。当然，因为整个公司经营到七年都只有10个人，有可能整个业务开始的很多年都是Josh Pigford一个人在运营。

为啥要卖掉这个公司呢？因为Josh觉得自己的工作太多的是管理，而不是创造；但是他希望花时间来创造新的事物，而不是去管理。所以，他就直接卖掉这个公司，让别人去经营管理了。我觉得，如果只是想赚点小钱，想创造一点东西，并且换时间精力尽量做好，世界上还是有挺多机会的。

{{< digest-item "title"="Readme Driven Development" "source"="https://tom.preston-werner.com/2010/08/23/readme-driven-development.html" "description"="博客文章" >}}

这篇文章很有意思，提出的观点是：开发软件之前，先写你的README文件。注意，这里不是写一大摞的设计文档，而是只写一个README文件。这是在“完全没有技术文档”和“太多技术文档”之间找个折中点。这个README文件对你要解决的问题和你的解决方案有简洁扼要的总结，然后你可以继续去做Test-Driven Development或者其他Agile Development。在你写程序的时候，README文件可以用来指导你开发的方向和划清你开发的界限。

> A perfect implementation of the wrong specification is worthless. By the same principle a beautifully crafted library with no documentation is also damn near worthless.

{{< digest-item "title"="The Log: What every software engineer should know about real-time data's unifying abstraction" "source"="https://engineering.linkedin.com/distributed-systems/log-what-every-software-engineer-should-know-about-real-time-datas-unifying" "description"="技术博客" >}}

这是一篇2013年的技术文章，讲述了分布式系统的各个组成成分中的Log怎么处理。文章实在是太长了，没有看完，之后再找时间继续读吧。

{{< digest-item "title"="Why Life Can’t Be Simpler" "source"="https://fs.blog/2020/10/why-life-cant-be-simpler" "description"="博客文章" >}}

这篇文章分析了一下生活中各种设计的复杂性的来源。有两个概念非常有意思：

1. 我们需要更好的**概念模型（conceptual model）**才能简化事物。
  > 概念模型是人认为事物如何工作的思考方式。这些概念模型是理解和整理复杂事物的重要思维工具。By Dan Norman, [*Living with Complexity*](https://www.amazon.com/gp/product/0262528940)
2. 系统的复杂度是守恒的
  > 一个系统的复杂度是个常数。如果你让用户交互变得简单，那藏在幕后的复杂度就会增加。 By Lawrence Tesler

要注意的是，减少用户界面的功能并不见得会把事物变得简单，因为这使得用户失去了操控系统的能力。有时候可能让交互界面稍微复杂一点，反而会降低整个系统的复杂度。

最后文章总结了四个经验：
1. 根据Tesler的复杂度守恒定律，事物看起来简单并不意味着事物用起来简单。
2. 不必把事情都让用户看起来特别简单，原因参照1
3. 产品和服务的好坏取决于出现问题时候的体验，而不是运行正常是的体验。
4. 设计者要想清楚可以给用户对事物在哪个层面上的操控力，以及用户如何影响事物本身。

{{< digest-item "title"="Orange You Accessible? A Mini Case Study on Color Ratio" "source"="https://www.bounteous.com/insights/2019/03/22/orange-you-accessible-mini-case-study-color-ratio" "description"="可用性设计" >}}

这篇文章讲了一下互联网无障碍设计（accessibility design）的一些问题。作者从一对例子出发，讨论到底什么对比度更容易看到：在橙色背景上的黑色字体，还是在橙色背景上的白色字体。

现在有的Web Content Accessibility Guidelines (WCAG)指南推荐了一些标准，比如AA标准规定字体和背景的对比度（contrast ratio）要在3到4.5之间，而AAA标准规定字体和背景的对比度要在4.5到7之间。如果直接根据物理计算的话，橙色背景上的黑色字体的对比度更高，所以根据标准来说更值得推荐。但是作者根据自己的体验和找来的一些被试的反馈来看，大多数都觉得橙色背景上白色更清晰可见。所以，这篇文章的问题就是到底应该以什么标准来设计？现有的规定和对比度计算方式是否合适？

## 网络学习

{{< digest-item "title"="awk: `BEGIN { ...`" "source"="https://jemma.dev/blog/awk-part-1" "description"="语言教程" >}}

这是一个关于Awk语言的简单教程，其实氛围[awk: `BEGIN { ...`](https://jemma.dev/blog/awk-part-1)和[awk: `END { ...`](https://jemma.dev/blog/awk-part-2)两个部分。这个简单的教程是受到他人的激励说人们可以花两个小时就读完[awk语言手册](https://www.gnu.org/software/gawk/manual/gawk.html)，然后就完全知道awk这个小语言怎么用了。然后作者就试着花时间去学了Awk这门小语言，虽然用的时间超过了2个小时，但是确实学会了不少。通过这两篇博客的介绍，感觉awk这个小语言结构确实挺简单的，因为它是一个用来进行文本加工和数据提取的DSL(Domain-Specific Language)。虽然我看了以后还是觉得我可能会更偏向用Python写个小程序，而不是用一两行的Awk来解决。

我一直没有能够很好地掌握用Awk，Sed，甚至是Shell Script这样的小语言。一个原因是我总觉得他们的语法表达不太好理解，不太直观。但是可能熟练掌握了这些语言且经常使用的人会觉得这些小的工具其实蛮好理解的，而且非常方便吧。

最后，文中介绍了一个很有意思的数据网站https://data.un.org/。这个网站倒是值得探索一下，也可以用来学习Awk的使用。

另外，这篇[Awk in 20 Minutes](https://ferd.ca/awk-in-20-minutes.html)也是一篇很不错的关于Awk的入门讲解文章，可以结合一起来看。

{{< digest-item "title"="Let’s build a video card!" "source"="https://eater.net/vga" "description"="技术教程" >}}

Ben Eater的显卡教程系列，一共三个视频，每个在30分钟左右。你可以选择从他那里买组合套件，也可以自己去找相关的组合套件。Ben Eater录了好几个非常精良的项目，都非常值得看（虽然我还没有看完）。

## 多媒体

{{< digest-item "title"="Joe Armstrong & Alan Kay - Joe Armstrong interviews Alan Kay" "source"="https://yahnd.com/theater/r/youtube/fhOHn9TClXY/" "description"="对话访谈" >}}

这是个还不错的对话，尤其是前面30分钟Alan Kay在诉说计算的历史的时候，有很多很好的材料，推荐了很多好的论文和书籍。后面的对话就……听听就好。

Alan Kay说到过一句话，跟我几年前的体验很相似：

> In a "real" computer science the best languages of an era should serve as the "assembly code" for the next generation of expression!


## 工具、技术、展示

{{< digest-item "title"="Software Library: MS-DOS Games" "source"="https://archive.org/details/softwarelibrary_msdos_games" "description"="游戏列表" >}}

这个网页收录了7000多个MS-DOS时代的游戏，都可以玩！真是充满了童年的回忆！

