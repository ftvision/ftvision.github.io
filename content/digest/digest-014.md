---
title: "Digest 014"
date: 2020-12-25
categories: 
- 阅读笔记
tags:
- 技术新闻
---

## 文章
{{< digest-item "source"="http://nautil.us/issue/94/evolving/reading-that-strange-and-uniquely-human-thing" "description"="科普报道" >}}
### Reading, That Strange and Uniquely Human Thing
{{< /digest-item >}}


这是一篇关于人类阅读和文字发展历史的文章。非常典型的美国式科普叙事结构——针对一个特定的人来叙述一件特定事，然后从这个个案展开来讲整个文章要探讨的问题，最后又回到这个特定的人/事上作为结尾。

整个文章还是有点意思的。我觉得的确是能学到一些关于阅读和文字发展的历史。我觉得这样的科普形式还是可以接受的，所以我也可以学着这种方式写文章吧。

{{< digest-item "source"="https://commoncog.com/blog/cash-flow-games/" "description"="经验分享" >}}
### The Games People Play With Cash Flow
{{< /digest-item >}}

这篇文章是关于“现金流”的一篇蛮有深度的文章。有两句话我觉得能总结全文的主旨

> 对商业一知半解的人认为商业只是为了赚钱。而真正经商的人才知道经商最重要的是掌控现金流。(People with limited understanding of business think that business is all about making profits. But those who actually run businesses know that running a business is all about managing cash flows.)
>
> 现金流是个事实，而利润只是个人看法。(Cash flow is a fact; profit is an opinion.)

这个文章很长，里面又说到（1）初期成本高，但是后续收入稳定的业务；（2）预付费用能降低成本的业务，比如餐饮业，还有很多其他的案例。有时间可能要再重新读一遍。确实是一篇很不错的文章。

{{< digest-item "source"="https://blog.alexmaccaw.com/an-engineers-guide-to-stock-options#" "description"="博客文章" >}}
### An Engineer’s guide to Stock Options
{{< /digest-item >}}

这篇文章是一篇讲解创业公司股票期权的文章，分享了在创业公司工作时，获得股票期权之后，你将面临的不同情景。所讨论的问题包括：合适行权，入职和离开公司所需要的注意的问题，行权时的税务考虑等。如果你有去创业公司的想法，读一读这篇文章了解一下相关的知识会挺有好处的。

{{< digest-item "source"="https://medium.com/@mijordan3/artificial-intelligence-the-revolution-hasnt-happened-yet-5e1d5812e1e7" "description"="学术思想" >}}
### Artificial Intelligence — The Revolution Hasn’t Happened Yet
{{< /digest-item >}}

Jordan在这篇文章里面讲了他对现在AI研究和AI行业的看法。他觉得，目前所谓的人工智能的发展是有局限性的，还是要发展智能增强（Intelligence Augmentation，IA)和智能基建（Intelligent Infrastructure，II)。在这种倡议下，我觉得智能本身就是一个物种中立的概念了，而且智能科学的发展需要更多工程上的发展才行。


{{< digest-item "source"="https://www.oreilly.com/content/generic-mitigations/" "description"="SRE经验" >}}
### Generic mitigations
{{< /digest-item >}}


这个文章介绍了一些在运营出现问题的时候可以使用的比较“通用”的缓解方案（mitigation plan）。这里提到的方法包括：
* Rollback (回滚代码)：直接把运行的代码回滚到之前的好的状态。但是rollback safety是一个很大的问题，因为其他的配置文件如果不对的话，代码回滚本身也会成为新的问题。
* Data rollback （回滚数据）：只有在线数据回滚。这种情况主要是数据质量和数据导致问题的时候比较有用。
* Degrade（降级服务）：如果服务负载太大，可以考虑服务降级，比如考虑直接放弃low-priority的流量。
* Upsize（服务扩张）：你也可以考虑暂时借调资源，然后扩张服务所能使用的资源。
* Block list（屏蔽列表）：如果可以知道Query of Death之类的问题Query，可以考虑直接建立屏蔽列表，然后不执行这些有问题的Query。
* Drain（排放）：直接把某个问题区域服务的流量挪到别的健康的区域。这个只适用于multi-home的服务，因为这样的服务有这些冗余可以使用。
* Quarantine（隔离）：隔离有问题的实例，让其他实例来提供服务。这个感觉跟Drain有一点相似，但是Drain一般是在区域（region/cell）层面上执行的——隔离整个区域内的所有服务。

用户能见到的问题是最大的问题。一个“几乎能工作”的解决方法，如果能够让用户觉察不到问题，已经是一个不错的暂时的缓解措施。在此之外，最重要的还是提前准备：

1. 提前考虑你的服务需要什么样的紧急应对策略。可以考虑使用[production readiness review](https://sre.google/sre-book/evolving-sre-engagement-model/)来思考和定义你的服务所需要的最常见的应对措施。标准化应对措施会让整个紧急事件的处理有很大的帮助。
2. 训练你的oncaller，让oncaller熟悉他们可以使用的工具，包括自动测试、文档、检查清单、playbook等。
3. 经常练习你指定的紧急措施，然后检查这些紧急措施是否合理有效。比如Google有Dirt，Amazon有Play Day这种。

这一切的主旨是在问题出现的时候，任何一个oncaller都能简单、安全、有信心、无阻力地缓解燃眉之急。另外，这里说到，问题出现的第一时间不是要完全理解到底问题的根源在哪里，而是应该第一时间缓解问题，比如将代码回滚回上一次正确的操作。文章配图确实是一图顶千言：

![mitigation](/images/mitigation.png)

{{< digest-item "source"="http://blog.ezyang.com/2012/11/extremist-programming/" "description"="SRE经验" >}}
### Extremist Programming（极限编程）
{{< /digest-item >}}

这篇文章很有意思，主要想法是如果你有一个程序设计的理念，如果把这个理念极限地推广到程序设计的所有方面会变成什么样。比如，函数很棒，如果一个程序语言所有成员都是函数会怎么样？又比如，对象（object）很棒，如果一个程序语言所有成员都是对象会怎么样？

在程序设计上，不选择多种方法的折衷，而是选择这种极端的做法，虽然在日常生活中并不实用，但是或许能够在程序设计理论上找到一些很新的东西——因为这种极端的做法能探索到一个想法真正的边界。

其实，我觉得在学术上也是这样的。有时候将一个想法/假设无限地推广出去，虽然不一定符合科学的真理，但是确实可以检验这个假设真正的解释力边界在哪。在工程上，有时候一个简单的想法，可能可以走很远。


## 网络学习

{{< digest-item "source"="https://www.newline.co/fullstack-d3" "description"="D3教学" >}}
### FullStack D3 and Data Visualization
{{< /digest-item >}}

这是一个将D3的教程，挺贵的，原价500刀，但是内容还挺多的。我觉得可以先看一下试看视频吧。我一直很犹豫到底要不要花钱来学D3，因为我也没找到网上的好的材料。

{{< digest-item "source"="https://www.youtube.com/watch?v=tX4H_ctggYo" "description"="数学教程" >}}
### Siggraph2019 Geometric Algebra
{{< /digest-item >}}

这个课程是Siggraph2019的一个讲几何代数的视频。时间比较长，将近两个小时，但是还是值得一学的。

## 多媒体

{{< digest-item "source"="https://www.youtube.com/watch?v=001SxQCEuv8&feature=emb_title" "description"="经验讲座" >}}
### Dylan Beattie — The cost of code
{{< /digest-item >}}

Dylan在这个讲座里面回顾了一些有意思的程序历史，提到每一款程序本身自身是会带来成本的。随着现在技术对生活的影响越来越大，程序对生活的影响也越来越大，而程序中的小问题也会变成越来越高额的社会成本——整个社会所需要付出的成本。这些成本不仅仅只是需要付给开发者的工资，不仅仅是政府和公司要付出的金钱，还有使用者时间、隐私、甚至是生命（比如波音飞机的代码问题导致的事故）。另外，当一个技术团队使用了第三方的代码（比如Open Source的代码），那么那些第三方代码中的问题也直接成为了每一个使用该代码的团队的问题，从而成为了更多用户和开发团队的成本。

这个讲座还是挺值得好好看一遍的。

我觉得，每一个程序员应该尽量减少自己产生的代码给社会和他人带来的成本。

{{< digest-item "source"="https://www.youtube.com/watch?v=w1_zmx-wU0U" "description"="游戏设计" >}}
### Puzzle Solving... or Problem Solving? | How to Design Puzzles
{{< /digest-item >}}

这个视频讨论了各种解谜游戏（Puzzle Game）的设计，提到了几个解谜游戏是没有标准解法的，完全是开放性的问题。这样的游戏比有特定解法的游戏更能激发玩家的创造力，而且有时候能够解决一些现实中真正的问题，比如作者提到了Fold It的那个蛋白质折叠的游戏。确实，游戏的设计是一门艺术。新冠疫情蔓延开的时候，很多人在讨论[瘟疫公司](https://zh.wikipedia.org/wiki/%E7%98%9F%E7%96%AB%E5%85%AC%E5%8F%B8)这个游戏，可见好的游戏不但能够给玩家带来快乐，也能帮助玩家学到很多知识。


## 工具、技术、展示

{{< digest-item "source"="http://deadlockempire.github.io/" "description"="技术游戏" >}}
### The Deadlock Empire
{{< /digest-item >}}

这个网页挺有意思的，是一个Learning by doing的一个网站，也可以当作是一个学习concurrency的技术展示吧。 在这个游戏中，你的任务就是把自己当作Scheduler，而你需要做的就是switch context，然后尽量让两个thread互相之间锁死（deadlock）。这个可以好好学习一下。

{{< digest-item "source"="http://features.jsomers.net/how-i-reverse-engineered-google-docs/" "description"="技术展示" >}}
### How I REVERSE ENGINEERED GOOGLE DOCS
{{< /digest-item >}}

这个技术展示很有意思。作者发现Google Doc的所有修改记录都保存下来了，而且是精确到秒级别的。于是，我们就可以写一个程序来replay整个文档的写作过程。这个某种程度其实也可以学习别人如何修改文档的过程。这么一想，这个说不定可以作为教学工具。不过话说回来，有多少人需要精确到秒级别的修改回放呢？


