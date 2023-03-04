---
title: "Digest 003"
date: 2020-10-09T12:19:05-04:00
categories: 
- 阅读笔记
tags:
- 技术新闻
---

## 文章

{{< digest-item "source"="https://canny.io/blog/how-we-built-a-1m-arr-saas-startup/" "description"="创业分享" >}}
### How we built a $1m ARR SaaS startup
{{< /digest-item >}}

Canny的创始人Sarah分享了他们达到一百万美元年度经常性收入（annual recurring revenue）这个指标。ARR似乎是评价订阅业务（包括SaaS）的关键指标[^1]，将定期订阅的合同经常性收入部分规范化为一年期的价值。整个团队在达到目标时一共七个人，都是远程工作。公司从零开始到达这个目标用了3年时间，而且都是用的自己的资金。Sarah将整个过程分成几个阶段，每个阶段都分享了需要解决的问题和学到的东西。而且他们一直在写博客，把他们的创业经历记录下来并分享给其他人。

这个小公司的业务就是建立了一个集中用户反馈的模块。其他的开发者可以使用这个模块来帮助整理他们的产品所遇到的用户需求，并且对需求进行归类和排序。感觉这是一个非常有意思的Niche，解决了一个小问题，但是这个问题又确实是很多开发者会面对的。然后对这个小服务进行一定的收费。感觉在互联网发展的今天，其实机会还是蛮多的，只要把问题提出的好，然后提供一个不错的解决方法。

{{< digest-item "source"="https://docs.python.org/release/3.9.0/whatsnew/3.9.html/" "description"="语言更新" >}}
### Python 3.9 What's New
{{< /digest-item >}}

Python 3.9的更新目录。东西还挺多的！这是我第一次认真看某个语言的版本更新目录，暂时还没有时间仔细研究每个细节。新的`zoneinfo`和`graphlib.TopologicalSorter`类看起来挺有意思的。不过内容这么多，线性地跟着版本更新目录来了解可能有点难。可能还是的根据专题来了解。

{{< digest-item "source"="https://hutusi.com/articles/the-greatest-git-commit#fn:3" "description"="博客文章" >}}
### 改变世界的一次代码提交
{{< /digest-item >}}

这篇文章介绍类一下Linus的第一个Git的Commit，然后分析了一下Git在设计上的一些思路。作为源码分析理解的文章还是不错的。

{{< digest-item "source"="https://www.kalzumeus.com/2012/01/23/salary-negotiation/" "description"="博客文章" >}}
### Salary Negotiation: Make More Money, Be More Valued
{{< /digest-item >}}

这是一篇关于工资谈判的文章。文章的主旨就是让应聘者在工资谈判上大胆一点。

首先，文章指出应聘者经常有错误的想法，以为自己在工资上多要6000块钱，就是给公司多增加了6000块钱的负担。大可不必。文中指出，在加州，公司养一个工程师，一个月可能要花20,000刀，其中包括各种福利、食物、硬件器材等等。所以，你每个月多要500刀，其实对于公司来说只是增加了2.5%的成本而已。就算你一年多要60,000刀，一个月多要5000刀，每个月可能也就给公司增加25%的成本。公司是不会吝惜几个百分点的成本来失去一个好的员工的。

**你的谈判什么时候开始呢？**

你的谈判砝码早在你申请工作以前就开始了。以下一些情况能帮你在谈判桌上更有力：
1. 你在业界树立起自己的名声，成为一个众所周知的可以落地有影响的成果、显著提高收益或者降低成本的出色员工。
2. 有一个在招人的经理找到你，并且有一个空出来的职位他们很想要招你。
3. 非正式地交流发现新的机会对于你和雇主来说是一个双赢的机会。
4. 让他们先说明互利的机会长什么样。
5. 给雇主提出建议，并且清晰地说明你有这个能力帮他们改进，增加收益或者降低成本。
6. 分享你的简历给招人的经理。

**你要在什么时候提出具体的工资谈判呢？**

在面试什么都结束以后，有人可以有权威地说基本上确定要你的时候，才是提出工资谈判的具体时刻。这个时候你可以提出，“你很欣然接受这个工作，如果……”，然后提出一个互相可以接受的工资水平。也就是说，你只有在处于一个“Yes-If”的处境的时候才开始谈判。不要再一个“No-but”的时候谈判。比如，公司如果说不太想要你，你想提出说：“但是我可以少要一点薪水”。这种情况是**要不得的**。

{{< box-highlight type="success" >}}
注意，工资谈判从来不会让一个有价值的工作offer变得更差。
{{< /box-highlight >}}

文中里面讨论了很多种谈判的情景，基本上就是**不要自己先给数字**。然后分享了在不同的情境下如何把话头扔回HR。

**关于公司要了解什么？**

* 公司看重什么，推崇什么？(What do they value?)
* 公司看重谁，或者看重哪些职位、头衔、群体？ (Who do they value within the company?  (Roles?  Titles?  Groups?))
* 在公司里比较成功的职业道路看起来什么样子？(What does the career path look like for successful people within the company?)
* 公司对你关心的工具和做事风格有多慷慨？(Roughly speaking, how generous are they with regard to axes that you care about?)
* 公司有没有别的薪资酬劳相关的杠杆和途径？(Do they have any compensation levers which are anomalously easy to operate?  For example, if you asked around, you might hear a few people say that a particular firm pushes back modestly on out-of-band increases in salary but they’ll give in-the-money option grants like candy.)
* 还有很多比较“虚”的内容，比如公司文化怎么样。All the fuzzy stuff: what’s the corporate culture like?

**不要只顾着工资**

除了工资之外，整个薪资结构还有很多其他的组成成分，比如股票，比如期权，比如福利等。这些都可以作为谈判的一部分。

{{< digest-item "source"="http://media.pragprog.com/articles/mar_02_archeology.pdf" "description"="会议文章" >}}
### Software Archaeology
{{< /digest-item >}}


很多人都在讲怎么“写”代码，但是很少人讨论怎么“读”代码。实际上，工程师可能只花20%的时间写代码， 但是需要花80%的时间读代码。这篇文章讲了讲如何开始读代码。结合文章做的[Podcast](http://www.se-radio.net/2009/11/episode-148-software-archaeology-with-dave-thomas/)一起学习，效果更好。

读代码
  * recreational code reading，读代码以娱乐。artist and writers read other's work. Software engineers should do that as well.
  * Found good code to read.
  * 有目的地读代码

**读代码的几个步骤**：
1. 获取正确的代码（正确的版本），
2. 获取所有的代码（包括所依赖的库），
3. 使用version control系统，
4. 成功地编译代码，并且能把代码跑起来，
5. 确定阅读代码的目的，用工具定位目的(`grep`或者`awk`)，
6. 缩小字体，快速了解整个代码库的结构，
7. Instrumentation, tracing, and visualization一些代码片段，比如分析类之间的关系，函数之间的关系等等，
8. Documentation是最没有帮助的——总是过时，Comment经常是没有用的，
   * 这里提一句：代码的注释应该解释“为什么”，让代码自己去解释“怎么做”。不要用注释重复代码。
9.  单元测试非常有帮助，
10. 你需要学command line interface，比如`grep`、`awk`、`|`的程序和操作符。

## 网络学习

{{< digest-item "source"="https://gitexercises.fracz.com/" "description"="Git学习" >}}
### Learn & practice Git
{{< /digest-item >}}

又是另一个Git教程。这年头Git教程真的是很多，但是各有各的特点，所以也挺不错的。这个教程用的是互动的方法，直接使用`git`来完成一系列的任务。我想起当年又一个用[游戏来教你Vim](https://vim-adventures.com/)的教程。大家都是在画各种心思来教大家怎么使用GIT这个工具。好的教程总是不嫌多的！

{{< digest-item "source"="https://www.notion.so/Startup-Hiring-101-A-Founder-s-Guide-946dad6dd9fd433abdd12338a83e931f/" "description"="创业分享" >}}
### Startup Hiring 101: A Founder's Guide
{{< /digest-item >}}

这是Gem的创始人写的一些列关于初创公司如何找人的文章。算是创业经验分享吧。如果对于创业期间招人应该如何进行完全没有头绪的话，可以快速扫一遍这一系列文章。但是这种文章最多也就是仅供参考了。

## 多媒体

{{< digest-item "source"="https://www.youtube.com/watch?v=28UzqVz1r24/" "description"="游戏视频" >}}
### Raycasting engine in Factorio 1.0 (unmodded) - Facto-RayO v2.0
{{< /digest-item >}}

这是一个用Factorio这个游戏直接实现了一个raycasting的功能。用游戏编写另一个游戏，编写另一个游戏，无限循环。只要有基本的元素、足够的耐心和巨大的规模，终究可以用任何信息载体实现另一个信息载体。

{{< digest-item "source"="https://www.youtube.com/watch?v=oytL881p-nQ" "description"="软件设计" >}}
### Simple Made Easy 2012 - Rich Hickey
{{< /digest-item >}}

> Simplicity is prerequisite for reliability.
> -- Edsgar Dijkstra

这个Talk听完以后没有特别多的想法，主旨就是要把整个工具和工程设计得简单（simple），不要搞得特别复杂（complex），但是这个过程并不简单（easy）。我最大的收获可能是Speaker对于Simple vs Easy之间的区分吧。很多内容都是比较抽象的思想讨论。可能是我的软件工程背景还不够，所以有些对比没有非常直观的体会。

## 工具、技术、展示

{{< digest-item "source"="https://ipdata.co/" "description"="数据服务" >}}
### ipdata
{{< /digest-item >}}

IP data是一个提供IP数据的服务商，可以通过IP地址得到相关的地理位置信息，比如经纬度、国家省份等。

{{< digest-item "source"="https://calibre-ebook.com/" "description"="开源软件" >}}
### Calibre
{{< /digest-item >}}

kitty终端的作者所写的另一个非常受欢迎的电子书管理软件。虽然用户界面比较粗糙，但是功能强大，而且广受好评。最近作者发布了[Calibra 5.0](https://calibre-ebook.com/new-in/fourteen)。


[^1]: 关于计算ARR：因为ARR是按年算的，所以如果客户只是按月付10块，没有包年合约，那么这个用户贡献的ARR是0。如果用户包年，然后每个月付10块，那么用户的ARR是120块。
