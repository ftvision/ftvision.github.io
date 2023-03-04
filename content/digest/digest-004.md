---
title: "Digest 004"
date: 2020-10-16T11:17:28-04:00
categories: 
- 阅读笔记
tags:
- 技术新闻
---

## 文章

{{< digest-item "source"="https://www.failory.com/cemetery" "description"="创业经验" >}}
### Startup Cemetery
{{< /digest-item >}}
这个集合很有意思，整理了一系列初创公司的业务、募资额度和倒闭的原因。点开不同的创业公司会读到不同的总结，这个还蛮适合休闲的时候了解一下创业失败背后的故事的。

{{< digest-item "source"="https://www.failory.com/blog/startup-failure-rate" "description"="创业经验" >}}
### Startup Failure Rate: Ultimate Report + Infographic [2020]
{{< /digest-item >}}
这篇文章来自同一个网站，可以算是2020的创业公司失败鉴赏报告。有一些数据还挺有意思的：

* 失败率概要：
  * 10个创业公司中有9个失败。（2019年的报告的数据是12个公司有11个报告，死亡率还下降了）
  * 10个有风投支持的公司中有7.5个失败。
  * 10个公司有2个会死在第一年。

* 失败率时间线：
  * 20%的公司死在第1年结束。
  * 30%的公司死在第2年结束。
  * 50%的公司死在第5年结束。
  * 70%的公司死在第10年结束。

* 失败的原因：
  * 56%是市场相关的原因：缺乏产品市场契合度（product-market fit）和市场营销（marketing）的失败是两个重要的问题。
  * 18%是团队原因：没有专业知识、没有市场经验、没有技术知识、没有商业知识是主要的问题。
  * 16%是资本原因：50%被采访的创业者没有预算，70%是自己出资，但是只有16%的创业失败是由于资本原因，所以资本的问题并不是那么严重的问题。
  * 剩下10%是各种各样其他的原因。

{{< digest-item "source"="https://samcurry.net/hacking-apple/" "description"="博客文章" >}}
### We Hacked Apple for 3 Months: Here’s What We Found
{{< /digest-item >}}
Sam Curry介绍了他跟同事找到55个Apple漏洞的过程，其中详细地讲了12个漏洞的机制。[HackerNews的讨论](https://news.ycombinator.com/item?id=24718078&utm_term=comment)挺激烈的，但是有好多内容我都不太能看懂。但是作为一个有趣的计算机安全的个案研究，这个博客文章值得分享。

{{< digest-item "source"="http://worrydream.com/#!/LearnableProgramming" "description"="计算机安全" >}}
### LEARNABLE PROGRAMMING
{{< /digest-item >}}
Bret Victor很早的一篇关于可探索的编程的研究。跟着文章的不同演示走就能知道他想说什么，比如“光描述是不够的，要能够展示数据”。随着他的文章的推进，可以看到他设想的编程环境是如何将程序和直观体验通过不同的方法联系起来。这样的编程环境可以是非常厉害的教学工具，也可以是非常重要的codless开发环境的补充。但是要实现这个功能，背后的开发难度看起来也挺高的。Bret Victor其他的文章展示了他的各种“魔法”，可能这个开发难度对他来说就还好吧。

不管怎么说，Bret Victor的文章都很推荐！

{{< digest-item "source"="https://simonwillison.net/2020/Oct/9/git-scraping/" "description"="经验分享" >}}
### Git scraping: track changes over time by scraping to a Git repository
{{< /digest-item >}}
这是一个很有意思的文章，作者介绍如何用Github Action来自动爬网上的数据，更新自己仓库的信息。比如作者最近的例子就是用Github Action来自动更新加州山火的进展。懒惰是每一个懒惰的程序员追求自动化最大的动力。


## 网络学习

{{< digest-item "source"="https://lowlvl.org/" "description"="学习网站" >}}
### Low Level Academy
{{< /digest-item >}}
一系列基于Rust的网络底层编程教学。这个网站很有意思，每一个课程都只讲一个知识点，有代码部分，也有可视化的解释，讲得挺好懂的。不过课程出得比较慢。

这个课程的背后是用Rust+WebAssembly写的，也算是将来的趋势之一了。值得学习。

{{< digest-item "source"="https://github.com/danluu/post-mortems" "description"="学习仓库" >}}
### A List of Post-mortems!
{{< /digest-item >}}
来自各个公司的一系列验尸报告（Post-morterm）。验尸报告是在公司出现事故之后的总结报告，一般包括事故的时间线，事故的原因，事故的经验教训等。好的事故报告能够让读报告的人学到很多知识，也会帮助后来人避免曾经的错误。我很推荐大家没事的时候去读一读各种事故报告。

除了这个列表，还有好几个其他的列表也能找到过往的事故报告，比如[SRE Weekly](https://sreweekly.com/)每一期最后也有过去这一周的事故报告。

{{< digest-item "source"="http://docs.quantifiedcode.com/python-anti-patterns/index.html" "description"="经验总结" >}}
### The Little Book of Python Anti-Patterns
{{< /digest-item >}}

这本网络书总结了Python代码六个方面的反面教材（反面模式，Anti-Pattern），这六个方面是
* 正确性：反面教材会导致代码错误。
* 可维护性：反面教材会导致代码难以维护。
* 可读性：反面教材会导致代码难以阅读。
* 性能：反面教材会导致代码性能低下。
* 安全：反面教材会导致安全漏洞。
* 代码迁移：一些软件框架迁移的建议。

但是这里面有一些建议是Python2的，不再适用与Python3了。虽说如此，里面的条目还是值得根据Python3再了解和学习一下的。

## 工具、技术、展示

{{< digest-item "source"="https://vimeo.com/36579366" "description"="经验总结" >}}
### Bret Victor - Inventing on Principle
{{< /digest-item >}}


这个talk的前半段就像看一个魔法师在你面前展示他的魔法。不是魔术，而是魔法。后半段就像布道一样，分享他的人生哲学，和他尊敬的人的人生哲学，还比较inspiring。

整个Talk的主旨在于：

> Createor needs an immediate connection with what they create. Creators need to be able to see what they are doing.
>
> 创作者需要跟他们创作的成果之间有直接、即时的联系。

Bret认为写代码不仅仅只是写代码，写代码应该是一个创作的过程。但是在“写代码”这样一个创作的过程中，有一个非常大的问题，就是写的代码与代码运行的结果之间存在巨大的隔阂。程序员写完代码以后，需要经过编译或者解释才能看到程序的结果。如果想要调试程序，还需要各种复杂的步骤。他觉得这是不可接受的，而且会极大地影响创作者的创作过程。

于是，他就写了一些软件来展示，如果打破这个隔阂，如果程序员能够在写代码的同时看到自己代码的运行结果，会有什么好处。他分享了一个绘画的javascript软件，一个制作动画的iOS软件，和其他几个互动软件。他的这些展示可以在他的主页上找到。虽然每一个展示都是一个proof of concept，但是看到这些展示的是以后，我确实会觉得：如果我们有一些通用的工具也具有这些功能那该多好。

非常推荐大家去他的[网站](http://worrydream.com/)去学习和尝试他制作的一些demo。

{{< digest-item "source"="https://www.youtube.com/watch?v=KRE9S7B-DV8" "description"="互联网历史故事" >}}
### History of the Web
{{< /digest-item >}}


Speaker讲了一下互联网发展的过程和浏览器之战的历史，提到了微软的IE是如何逐渐拿下90%以上的浏览器市场份额，又是如何最后走向衰落的。Speaker提到一个很有意思的点：微软忙于操作系统的安全问题，忽视了浏览器平台的发展。后来对于浏览器的开发又只是把浏览器当作一个软件，提升了软件的体验，但是依然忽略了浏览器作为一个平台给广大的用户带来的改变。后来出现的移动平台也对整个网络平台的提出了新的要求。最后Speaker回到了谷歌的价值观来讨论Chrome的发展，还挺有意思的。

{{< digest-item "source"="https://www.youtube.com/watch?v=Kk2MH9O4pXY" "description"="经验总结" >}}
### Let’s BUILD a COMPUTER in CONWAY's GAME of LIFE
{{< /digest-item >}}
教你怎么用Conway的生命游戏来制作最基本的逻辑元件，然后用这些逻辑元件构造一个虚拟计算机，然后用这个计算机实现一个Conway的生命游戏。这个跟上一期用Factorio构建一个Ray Casting的软件一样，都是不断递归的过程。看这个让我想起了Ricky and Morty某一集。

## 工具技术

{{< digest-item "source"="https://developers.google.com/web/tools/puppeteer" "description"="工具" >}}
### Puppeteer
{{< /digest-item >}}

浏览器自动化工具。我看到很多人用无头浏览器都会提到这个，但是还没有完全理解这个怎么用。[这里有个简单的介绍](https://www.jianshu.com/p/085e3de8596c)可以了解一下。

{{< digest-item "source"="https://github.com/features/actions" "description"="自动化工具" >}}
### Github Action
{{< /digest-item >}}

这个是前面提到的Git Scraping中所使用的工具。目前Github提供了很多可以使用的Action，其他开发者也制作了很多Action放到市场上分享。至于Git Scraping，可以通过[git-scraping](https://github.com/topics/git-scraping)找到不少git scraping的案例。
