---
title: "Digest 006"
date: 2020-10-30T18:57:35-04:00
---

## 文章

{{< digest-item "title"="Type in the exact number of machines to proceed" "source"="https://rachelbythebay.com/w/2020/10/26/num/" "description"="经验分享" >}}

这篇文章让我很有启发。这篇文章说到的问题是Linux系统有很多命令行的交互界面。很多时候，命令行界面要求你确认信息的时候，可能只是要你输入一个”Y/N“，或者是按任意键继续。作者从自己多年的经验出发，指出输入简单的“Y/N”进行确认有时候是非常危险的事情，因为用户的粗心没看清楚信息就确认了。作者建议，在要求用户确认信息的时候，应该要求用户完整地输入信息本身的内容。比如

```bash
$ Blah blah blah 123,456 machines will be affected.  Proceed?
$ Enter number of machines to confirm:
```

只有当用户输入准确的数字的时候，程序才会确认并且继续：

```bash
$ Blah blah blah 123,456 machines will be affected.  Proceed?
$ Enter number of machines to confirm: 123456
$ OK!  Continuing.
```

{{< digest-item "title"="How to waste your career, one comfortable year at a time" "source"="https://apoorvagovind.substack.com/p/how-to-waste-your-career-one-comfortable" "description"="经验分享" >}}

这篇文章的标题非常震撼，有给我当头一棒的感觉。具体内容其实主要是关于“什么情况下应该改变，不要再安于现状”的思考。

作者先是说不要被自我满足和所谓对公司的忠诚而耽误了自己，并且用了两个很好的子标题：**自我满足是癌症**和**错放的忠诚**。关于自我满足，作者说安逸的生活会给人一种自我满足的错觉：喜欢现在朝九晚五的生活和工作环境，但这样可能就慢慢沉沦了。关于忠诚，作者说对自己忠诚才是忠诚，公司不过是考虑他们的业务。这两点对建立一个新的思维模型还是有作用的。

接下来作者就说应该考虑自己的成长而不是近期赚多少钱，然后要如何自我评估，考虑自己是不是应该寻找一些改变了。作者建议每个季度用以下几个指标反思自己的工作：
* 成就：我过去三个月有没有做成什么事情？
* 影响：我的工作对我的公司和我自己的简历有什么影响？
* 成长：我是否学到了新的重要的技能，这些技能跟我将来的目标是否相符合？
* 挑战：我是否在洗澡的时候都在想着某个问题，导致我甚至忘了涂肥皂（这个操作性定义也是挺有意思的）？
* 社群：我跟我的团队一起开心吗？我是否对我的团队和公司有信念？

那么，今天你考虑跳槽吗？

{{< digest-item "title"="I was wrong. CRDTs are the future" "source"="https://josephg.com/blog/crdts-are-the-future/" "description"="经验分享" >}}

这篇文章主要讨论的是实时协作(Realtime Collaboration)背后的技术问题。实时协作有很多例子，比如Google Docs这种多人在线共同写文章的应用。在疫情的影响下，多人在线的应用会有越来越大的市场，腾讯文档、石墨文档等等都在做类似的应用软件，做一这篇讨论还是挺有意思的。

文章主要是比较两种算法：
1. Operational Transform (OT)，这是现在最常用的算法，来源于这篇[1995年的文献](https://www.google.com/url?sa=t&rct=j&q=&esrc=s&source=web&cd=&ved=2ahUKEwi3mr6CivnrAhXEfd4KHcAyBe4QFjAAegQIBBAB&url=http%3A%2F%2Flively-kernel.org%2Frepository%2Fwebwerkstatt%2Fprojects%2FCollaboration%2Fpaper%2FJupiter.pdf&usg=AOvVaw0HmIhcn7_VKk2h1bEeAOJS)。Google Docs之类的都基本上用的这套算法。现在的实现有很多种，比如[ShareJs](https://github.com/josephg/sharejs)就是一个Javascript的实现。另外，[这篇文章](https://ckeditor.com/blog/Lessons-learned-from-creating-a-rich-text-editor-with-real-time-collaboration/)提到了富文本情景下对OT的改进，看起来需要新创不少操作。
2. Conflict-free replicated data type （CRDT），这是作者认为将来比较有前途的算法。他认为[Martin Kleppman这个视频的讲解](https://www.youtube.com/watch?v=x7drE24geUw)完全说服了他将来是CRDT的。这个实现也有很多种，比如[Yjs](https://github.com/yjs/yjs)就是一个Javascript的实现。

这两个算法的选择之间主要是功能、性能、和实现难度之间的比较。OT相对比较容易实现，而且额外负担比较少，也比较容易解决协作出现的冲突。CRDT一直就不是很容易实现，就算实现了性能也不是特别好。但是作者听了Martin的讲座以后自己用Rust写了一个，发现好像CRDT可以有比较高效的实现方法，所以他还是蛮看好CRDT的前景的。而且OT最终是需要一个中央服务器来控制算法的，而CRDT并不需要一个中央机构来管理。


{{< digest-item "title"="The SaaS Website Content You Need to Close Sales [Data]" "source"="https://www.mikesonders.com/saas-website-content/" "description"="数据分析" >}}

这篇文章有点意思。主要的方法就是分享Google搜索关键字然后来“猜测”用户在寻找Saas产品的时候最关注哪些问题。感觉他好像是根据自己的经验事先确定的关键字，然后把关键字分为“售前关注信息”和“售后关注信息”，然后统计“品牌+关键字”在Google搜索得到的结果。这个研究方法还是写得很清晰的。

根据作者的分析，一个好的SaaS网站应该有如下的内容：

**售前信息**：
* 定价：清晰的定价是客户**最关心的问题**。
* 对手产品：你的产品是将取代哪种产品。个人觉得这个思路有点奇怪，但是有可能这也是提供一个清晰的产品定位吧。
* 产品演示：好的演示能帮助客户决定要不要用你的产品。
* 客户评价：五星好评肯定是最有说服力的。
* 报告系统：你的服务能不能自己提供服务报告和数据图标。
* 产品整合：你的服务能不能简单地与其他重要的服务整合。
* 产品对比：这个跟第二个有点像，但是第二个侧重用他人来介绍你的产品定位，这个侧重直接对比你的服务比其他服务的优势在哪。
* 剩下的还有比如：售后服务、安全、SSO、免费试用、SLA等等。

如果你对你的产品网站完全没有想法，倒是可以看看这个文章来获得一些建站的思路。不过老实说，整个文章分析读下来，我觉得现在互联网卖床的网站（比如Casper，Tufts & Needle）倒是非常符合他的数据分析。所以看来这不仅仅是SaaS服务建站思路。

## 网络学习

{{< digest-item "title"="Fast load times" "source"="https://web.dev/fast/" "description"="网站性能课程" >}}

这个系列讲的是如何提高网站的性能，包括如何测量和理解网站的性能，以及各种提高性能的技术。

关于用户时间上的体验，可以结合这两篇文章：
* [Response Times: The 3 Important Limits](https://www.nngroup.com/articles/response-times-3-important-limits/)
* [Powers of 10: Time Scales in User Experience](https://www.nngroup.com/articles/powers-of-10-time-scales-in-ux/)

## 多媒体

{{< digest-item "title"="Cloud Spanner 101: Google's mission-critical relational database (Google Cloud Next '17)" "source"="https://www.youtube.com/watch?v=IfsTINNCooY" "description"="技术讲座" >}}

Google Spanner数据库的技术讲座。这个讲座讲得挺好的，从背景问题到解决方案，每一个过度都讲得挺不错的。有时间的时候还是要继续看几遍。

{{< digest-item "title"="The Chubby lock service for loosely-coupled distributed systems" "source"="https://www.youtube.com/watch?v=PqItueBaiRg" "description"="技术讲座" >}}

一个关于Google Chubby服务的技术讲座。有时间的时候还是要继续认真再看几遍。

## 工具、技术、展示

{{< digest-item "title"="Microsoft TileCode" "source"="https://microsoft.github.io/tilecode/doc/manual" "description"="游戏设计" >}}

微软设计了一个手掌机游戏制作器。大家可以用这个小软件来制作一些规则简单的小游戏，然后在一些小的手掌机上玩。我发现这个仓库提到的手掌机真的是各种各样，还挺神奇的。他们还就这个主题写了篇[论文](https://www.microsoft.com/en-us/research/uploads/prod/2020/08/paperFinal.pdf)，有时间可以读一读。
