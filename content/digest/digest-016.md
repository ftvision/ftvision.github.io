---
title: "Digest 016"
date: 2021-01-09T23:54:11-05:00
categories: 
- 阅读笔记
tags:
- 技术新闻
---

## 文章

{{< digest-item "source"="https://openai.com/blog/dall-e/" "description"="机器学习" >}}
### DALL·E: Creating Images from Text
{{< /digest-item >}}

OpenAI介绍了最近在语言转图像的工作。效果看起来是挺不错的，因为通过语言产生的图片看起来已经比较合理了。挺有意思的一个工作。另外，Open AI写得互动文章解释真的是做的很不错。

{{< digest-item "source"="https://blog.pragmaticengineer.com/distributed-architecture-concepts-i-have-learned-while-building-payments-systems/" "description"="分布式系统学习分享" >}}
### Distributed architecture concepts I learned while building a large payments system
{{< /digest-item >}}

这是一篇内容翔实的分布式系统设计思路的high-level view的文章。文章里面介绍了分布式系统设计需要考虑的几个重要概念：
* 分布式系统一些重要的属性和要求：
  * SLA
  * Horizontal vs Vertical Scaling
  * Consistency
  * Data Durability
  * Message Persistence and Durability
  * Idempotency
  * Sharding and Quorum
* 分布式系统一些重要的设计思路
  * The Actor Model
  * Reactive Architecture

这篇文章可以当作是一个不错的系统设计的参考文献。文章中还提到了一些作者觉得写得不错的文章，以下是几篇我读完之后觉得确实还可以的。
* [Eventual vs Strong Consistency in Distributed Databases](https://hackernoon.com/eventual-vs-strong-consistency-in-distributed-databases-282fdad37cf7)
* [The actor model in 10 minutes](https://www.brianstorti.com/the-actor-model/)
  * 这篇文章比较抽象，感觉看完了以后了解了一些基本设定和原则，但是具体的Actor in Action还是不太懂。文章中提到的视频[Hewitt, Meijer and Szyperski: The Actor Model (everything you wanted to know...)](https://www.youtube.com/watch?v=7erJ1DV_Tlo)讲了更多的细节，但是还是比较抽象的层面。有可能是我的经验还不够。
* [The Amazon Builders' Library](https://aws.amazon.com/builders-library/?cards-body.sort-by=item.additionalFields.customSort&cards-body.sort-order=asc)


{{< digest-item "source"="https://medium.com/pinterest-engineering/demystifying-seo-with-experiments-a183b325cf4c" "description"="分布式系统学习分享" >}}
### Demystifying SEO with experiments
{{< /digest-item >}}

Pinterest在2015年的时候写得一篇关于他们怎么优化Google的SEO的技术博客，这里主要是介绍他们怎么设计他们的实验框架的。这里的实验框架是用来帮助开发者和设计者更好地了解他们的更新到底是如何影响流量的。与一般根据用户流量进行A/B的方法不同，Pinterest的实验框架是把Pinterest自己的页面进行了A/B测试。他们不使用用户流量来做A/B测试的原因似乎是因为他们对流量数据没有掌控，也没办法知道搜索引擎的数据（比如哪些页面被放到了前面，哪些页面被放到了后面）。虽然我觉得现在有可能可以用Puppet等无头浏览器来试图试图解决这个问题，但是他们的方法似乎更符合他们的框架：因为Pinterest有极多的Pin Board，他们可以改变一部分的Pin Board的设计，然后保留剩下的Pin Board的设计，来对比不同设计获得的流量。这样子，实验数据就完全在他们的掌控范围之内了。

在实验框架之外，文章还讲了测量实验结果的指标（比如，用Expt - Base的diff，而不是直接用Expt页面的净增长），一度让我觉得有点像当年分析脑电波信号——事件之前现对齐，然后对实验条件与控制条件之间做差。还有一些具体的案例，可以稍微看一下，挺有意思的。感觉这些实验，本质上就还是实验心理学+统计那一套。

## 网络学习

{{< digest-item "source"="https://geektutu.com/post/high-performance-go.html" "description"="学习总结" >}}
### Go 语言高性能编程
{{< /digest-item >}}


极客兔兔整理的一系列Go语言Performance Programming相关的内容。各种语言下的Performance Programming都是我应该好好学习的，因为这些内容和我的日常工作相关。公司也有一些相关的材料，但是因为我一直没有实际操作过，所以学到的知识都有一些隔靴搔痒的感觉。另外，我想着要学Go语言很久了，但是一直也没有正式开动。极客兔兔也有一个[Go语言入门的教程](https://geektutu.com/post/quick-golang.html)，有时间可以参考一下。

{{< digest-item "source"="https://fasterthanli.me/articles/a-half-hour-to-learn-rust" "description"="学习总结" >}}
### A half-hour to learn Rust
{{< /digest-item >}}

这是一个Rust的教程，有一点像[Learn X in Y minutes](https://learnxinyminutes.com/)那个系列。我唯一想说的是，这个绝对不止半个小时。有一些语法结构还挺不好懂的。

说到Rust，这个星期的另外一个学习内容是[Rust Design Patterns](https://rust-unofficial.github.io/patterns/intro.html)。Rust的东西真的还是挺多的，尤其是这些内容基本上都是社群自己创造的。我也是挺佩服的这个充满激情的社群的。

## 多媒体

{{< digest-item "source"="https://www.youtube.com/watch?v=ChQpD2gsC20" "description"="树莓派小项目" >}}
### Raspberry Pi Weather Station
{{< /digest-item >}}

这个视频讲解了如何用Raspberry Pi来做一个小的家用气象站，实时记录温度，气压，和湿度。我觉得这个东西对我可能蛮有帮助的，因为家里不同的房间里面的温度经常不一样，而且晚上有时候温度也比我的温度表设定的温度要低。现在如果晚上特别冷的话，我可能会咳嗽或者有可能会感觉气短（似乎是与过敏性哮喘有关），所以如果能够有一个更加准确的温度、湿度、气压的度数的话，更容易帮我了解我的健康状况与周围环境之间的关系。

我在家里有一个Raspberry Pi 3，但是我不确定这个机器有WI-FI。如果没有WI-FI的话，我就不能随意拿着Raspberry PI在不同的房间走动了。我看整个项目其实很容易，主要是需要买相关的元件就好了。有时间真的应该做一做这种事情。

## 工具、技术、展示

{{< digest-item "source"="https://jamstack.org/" "description"="开发趋势" >}}
### JAM技术栈
{{< /digest-item >}}

随着各种网络服务和技术的发展，现在的网络应用开发已经有了很多新的趋势，比如Microservice, Serverless等等。JAM是Netfliy所推广的一种开发趋势，整个技术栈使用Javascript + API + Markup语言就搞定。基本思路是用静态站点生成器（Static Site Generator，比如Hugo，Next.js, Jekyll）生成主要的网页内容，并部署在CDN上，服务器端相关的功能就直接通过Javascript对接各种API服务，比如Stripe这种支付服务。现在SaaS产业的兴起以及API经济的兴起已经为这种开发趋势提供了很好的基础设施，接下来就是看人们能够通过这套东西来做什么了。这种思路，将来开发基本上就是前端开发了。剩下的后端开发，都交给了大公司。我觉得对于中小型的公司和个人来说，这个趋势还挺好的。

JAMStack这个网站就是用来分享这方面的资源和知识，并且建立一个开发社群。确实跟Netfliy自身的业务也是息息相关。

与此同时，如果你仍然对后端开发感兴趣，[Micro](https://m3o.com/)提供了一个不错的，简单的框架。整个框架用的是gRPC的那一套，看起来还挺简单，挺直观的。
