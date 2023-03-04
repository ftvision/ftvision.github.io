---
title: "Digest 002"
date: 2020-10-02T17:10:38-04:00
categories: 
- 阅读笔记
tags:
- 技术新闻
---

## 文章

{{< digest-item "source"="https://www.nytimes.com/2020/09/29/climate/nuclear-fusion-reactor.html" "description"="科学报道" >}}
### Compact Nuclear Fusion Reactor Is ‘Very Likely to Work,’ Studies Suggest
{{< /digest-item >}}


MIT的[Sparc](https://www.psfc.mit.edu/sparc)项目信心满满地认为他们能控制核聚变，并使用核聚变，像太阳一样，制造出更多的能量。这一想法要是实现了，我们将迈向一个崭新的能源时代；同时，我们也可以更好地缓解全球气候变暖的问题。

这篇纽约时报的文章其实没有涉及到太深的技术问题，但是这篇科学报道的写作方法确实有不少值得学习的地方。至于具体的关于MIT这一系列核聚变的研究的科学讲座，还是看下面列出来的视频吧。

{{< digest-item "source"="https://martin.kleppmann.com/2020/09/29/is-book-writing-worth-it.html" "description"="分享经验" >}}
### Writing a book: is it worth it?
{{< /digest-item >}}

花时间写一部书到底值不值？Martin Kleppmann，《设计数据密集型应用》的作者，分享了他写这本书的收获，然后反思了他觉得写一本书到底值不值。简单的说，他觉得还是值的：这本书的出版不但给作者带来了经济上的收入，也给作者带来了很多演讲和交流的机会。而且这本书帮助到了很多人，影响很大。于人于己，都是有好处的。但是写书的过程很伤，所以他一段时间之内可能也不会再写另一本书了。

《设计数据密集型应用》真本书确实写得很好。里面的内容全面又精要，是一本不错的分布式系统的入门书籍。很多人都在推荐这本书，很多读者都给了很高的评价。所以，作者的经验分享要把这个书的成功考虑进去。毕竟，也有很多人写了书，结果没卖出去几本，花了心思和时间，结果没有什么收获。

{{< digest-item "source"="https://www.figma.com/blog/when-fonts-fall" "description"="博客文章" >}}
### When fonts fall
{{< /digest-item >}}

这篇文章深入浅出地讲解了渲染字体的复杂性。每一个字体库都只涵盖了整个电脑可编码字符的一个子集，当一个字符在字体库里面不存在的时候，软件怎么渲染这个字符呢？有的时候你看到的是一堆框框“”, 这个是字体库的`.notdef`对应的字形(Glyph)。但是，更多的时候，软件设计或者网页设计，会提供备用(Fallback)字体。软件发现在当前字体库找不到字形的字符之后，会试图在下一个备用字体库里面找有没有可用的字形，直到最后怎么都找不到，就会看到前面所说的框框。

有趣的也是麻烦的地方在于字体渲染是逐字进行的，所以你会发现整个页面里面有些字长得跟其他的字不一样，读的时候会蹦出来。这些长得不一样的字符很有可能是从备用字体库选择的字形，然后因为备用字体库和优先选择的字体库在设计风格上有很大的不同，所以这几个特别的字符就显得有点不合群。据说现在Unicode一共收了约140,000个字符，没有任何字体库是覆盖了整个字符集的，像Arial这样的著名字体库也就包括了不到40,000字符。

最后文章降到了表情文字Emoji的渲染。有一些Emoji自己是特定的字符，而另一些Emoji是多个字符的组合，这就非常有意思了。所以在有些操作系统或者软件下你看到的是单个的Emoji，但是再另外一些系统下，因为兼容性的问题，你可能看到的是多个Emoji，甚至可能是一些Emoji和一些框框。

计算机如何呈现不同字符、字形、字体这个问题确实是个非常复杂的问题。

{{< digest-item "source"="https://barehands.substack.com/p/how-to-take-meeting-notes" "description"="工作方式" >}}
### How to take meeting notes
{{< /digest-item >}}

这个文章虽然说的是如何做会议笔记，但是他的笔记都是会议之后做的，所以我觉得应该叫做如何事后整理会议笔记。不过最开始，他说道整理会议笔记有一些好处，比如能够记录下讨论细节，可以分享给参会人，可以作为备忘，甚至可以作为其他写作的素材。作者在HackerNews的讨论里面澄清，这里所谓的Meeting不是公司会议，而是跟自己认识的人的私人会面(personal meeting)和讨论的记录。

回到笔记，真篇文章的做法可以总结为：参加会议的时候全神贯注，结束会议以后尽力回忆所有以细节。从他的建议可以考到很多帮助提取记忆的方法。
1. 首先用Draft或者一张白纸来简要描述会议情景。作者也说了这个和笔记内容无关，但是可以帮助回忆。在我看来，这里是构建一个情景线索，然后帮主提取与情景线索相关的内容，然后开始下一个步骤。
2. 然后回忆和重构会议内容。从任何一个点出发，在整张白纸上进行自由联想，然后把相关的内容放在类似的空间；通过这种方法来写下所有能够回忆出来的会议内容。
3. 接着有意识地通过画人、画地点和画时间线，来提取更多的情景线索，从而补充与人、地点和时间相关的内容。作者自己也说，每次他画地点的时候，他就会想起很多和地点相关的主题。这个是记忆的一个很正常的现象。

整个事件大概需要30分钟到2个小时。如果一个会议的会议整理就需要2个小时的话，你不太可能对每一个会议都这样的会议笔记整理。我其实还是挺好奇为什么不在会议的过程中直接速记，不过记录会议笔记确实容易从会议讨论中分心出来，所以我们经常是开会的时候先确定会议的记录者，然后再开始讨论。而会议记录者主要的任务就是记录会议讨论，在会议之后发送给大家。

我觉得会议笔记确实是很重要。尤其是在每一次会议后约定好不同的人要做的事情，并且跟踪这些要做的事情是不是及时做完了，这才能保证会议没白花时间。不然的话，很多时候，会开完了，然后大家都忘了说过什么，也忘了不同的人要做什么，结果浪费了时间，也没有什么进步。我在博士期间就经常遇到这样的问题，非常麻烦。现在想起来，过去很多时间浪费了，是因为没有很好的开会习惯，既没有及时做好会议笔记，也没有很好地设定不同人开会完以后要做什么。

HackerNews关于这篇文章有很不错的[讨论](https://news.ycombinator.com/item?id=24547098&utm_term=comment)，很多讨论都是分享如何减少浪费时间在会前、会中和会后。会议笔记和会议议程(Agenda)是两个非常有用的工具。

> A long time ago, my boss at the time taught me a valuable lesson: every meeting needs an official record(/log/minutes/whatever) documenting all noteworthy **decisions (D), tasks (T, with deadline and responsible person), and information communicated (I)**, with that record being sent to all participants by **end-of-day**.

{{< digest-item "source"="https://www.python.org/dev/peps/pep-3333/" "description"="技术文档" >}}
### PEP 3333 -- Python Web Server Gateway Interface v1.0.1
{{< /digest-item >}}

Python的网络服务器网关接口(Web Server Gateway Interface, WSGI)标准，从PEP333演化而来，定义了Python与语言下所有网络服务器框架的基础。我之前写过的Flask，底层就需要实现一个WSGI。但是这个文档我没有完全看完，而且看着不是特别了解。估计需要结合一下Flask的实现来理解一下。另外，廖雪峰写了一个[简短的介绍](https://www.liaoxuefeng.com/wiki/1016959663602400/1017805733037760)，还挺好懂的。[Codepoint也写了一个相关的小教程](http://wsgi.tutorial.codepoint.net/intro#)。 网络编程还是有太多东西不熟悉了。

{{< digest-item "source"="https://cjting.me/2020/07/01/douyu-crawler-and-font-anti-crawling/" "description"="案例分析" >}}
### 斗鱼关注人数爬取 ── 字体反爬的攻与防
{{< /digest-item >}}

这篇文章五星推荐🌟🌟🌟🌟🌟

这个案例分析真的很有趣。因为我之前没有计算机安全方面的背景知识，这是我第一次看到用字体反爬的这个方法，感觉十分有创造力。整个文章结构非常清晰，最开始通过人的手工探索对问题进行了初步分析和定义，然后从攻防两个角度来讨论了这个问题。攻击方面，从寻找数据源，到分析数据协议，然后反向工程获得数据和伪字体，最后用OCR来把伪字体的数字对应关系解出来，从而把数据解密，步步为营，娓娓道来。防守方面，提到了自动产生字体，构架伪字体的映射关系。整个过程中提到了很多工具，非常值得学习。

{{< digest-item "title"="A Short Story for Engineers" "source"="https://userweb.cs.txstate.edu/~br02/cs1428/ShortStoryForEngineers.htm" "description"="寓言故事" >}}
### A Short Story for Engineers
{{< /digest-item >}}

HackerNews上很多人认为这个小故事是个都市传说，我觉得这个故事更像个寓言。这个寓言想告诉大家有很多工程上的问题，在找到了问题要害的时候，往往可以有非常简单的解决办法。但是，人们有时候喜欢over-engineer整个问题，把问题搞的很复杂， 然后花费大价钱来制造一个解决方案。

工程能力并不一定表现在提供一个复杂的解决方案，而是用简单的方法来解决复杂的问题。软件工程同样如此。

## 网络学习

{{< digest-item "source"="https://learnxinyminutes.com/docs/c++/" "description"="网络教程" >}}
### Learn X in Y minutes: X = C++
{{< /digest-item >}}


这个系列的网络教程很有意思，基本上所有的科目（X）都是一页教程。虽然整个教程只有一页，但是教程涵盖的内容很丰富。比如这个C++教程，就提到了*与C语言的比较*， *面向对象的编程*，*C++模板*，和数个C++的语言特色。这个肯定不是面向初学者的教程，更像是一个快速总结的备忘录（Cheatsheet）

## 多媒体

{{< digest-item "source"="https://www.youtube.com/watch?v=L0KuAx1COEk" "description"="科学讲座" >}}
### MIT's Pathway to Fusion Energy (IAP 2017) - Zach Hartwig
{{< /digest-item >}}

这个是前面提到的MIT核聚变研究的科学讲座。HackerNews的[讨论](https://yahnd.com/theater/r/youtube/L0KuAx1COEk/)里面还有更多的资料。

{{< digest-item "source"="https://www.infoq.com/presentations/c-plus-plus-pros/" "description"="技术讲座" >}}
### C++: The Good Parts
{{< /digest-item >}}

这个主要就是讲的`include<algorithm>`和`lambda`表达式的强大。其中顺便还提到了`concept`的定义和泛型程序设计。深入了解一下`include<algorithm>`和`lambda`还是蛮有必要的。

{{< digest-item "source"="https://www.youtube.com/watch?v=tWvaSkgVPpA" "description"="技术讲座" >}}
### Just-in-Time Compilation - JF Bastien - CppCon 2020
{{< /digest-item >}}


这个Talk就是大概梳理了一下Just-in-Time Compilaton在过去60年的发展。其中列举和摘录了大概20篇文献，但是如果没有自己去读这些文献，光听他说，我感觉不太能学到什么东西。好在他把文献放在了[这个仓库里](https://github.com/jfbastien/jit-talk)，有时间可以去读。这个Talk涉及到编译原理的知识，可能需要先去打点基础再回来看。

## 工具、技术、展示

{{< digest-item "source"="https://docs.appseed.us/tutorials/flask-understand-flask-code-simple-app/" "description"="网站模板" >}}
### Flask - Code a simple web app
{{< /digest-item >}}

AppSeed提供了一系列使用Flask建站的模板项目，从最简单的只有一个页面的模板，到复杂的有UI设计、带数据库的模板都有。我觉得这个可以用来当做实例学习Flask整个框架和Flask的应用。不过可能直接学Flask更快一点。整体来说，Flask确实比Django要轻巧很多，一开始的设置也简单很多。但是比较大型的网站似乎还是喜欢用Django？想起来之前有一个业余项目使用Django，结果我一直没有配置成功。
