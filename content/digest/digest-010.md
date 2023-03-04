---
title: "Digest 010"
date: 2020-11-27T09:46:06-05:00
categories: 
- 阅读笔记
tags:
- 技术新闻
---

## 文章

{{< digest-item "source"="https://zeux.io/2020/08/02/eight-years-at-roblox/" "description"="经验分享" >}}
### Eight years at Roblox
{{< /digest-item >}}

作者介绍了他在Roblox工作八年的经历和大大小小的各种项目。从作者的项目可以看出一部分Roblox系统的演化的过程，以及Roblox一直遇到的挑战，比如外挂、性能要求、和底层引擎的改变。 HackerNews关于这篇文章的讨论也挺有意思的，其中好几个家长提到自己2-4岁的小孩都在玩Roblox，还有几个人说10岁以下的小孩几乎都知道Roblox。这个信息跟之前关于Roblox上市的讨论中提到的信息是很相似的。看起来Roblox还是蛮有前途的。

{{< digest-item "source"="https://refactoringui.com/previews/building-your-color-palette/" "description"="博客文章" >}}
### Building Your Color Palette
{{< /digest-item >}}

[Refactoring UI](https://refactoringui.com/)有一些列关于UI设计的好文章，文章讲整个配色系统分为几个部分：
1. 中性/灰色系列 （Neutral / Grey color）：文字，背景等的用色，需要8-10个灰阶
2. 主色系（primary color）：整个站点的主要色调，需要5-10个灰阶
3. 强调色系（Accent color）：强调、警告等的用色，需要5-10个灰阶

现在各种CSS的框架都会有自己的基本配色系列，这些配色系列也都是基本根据上面的分类来设计的，所以这个设计方案可以当作是一个比较好的起步。当然，最终的设计还是需要根据自己的审美来调整。


{{< digest-item "source"="https://blog.owulveryck.info/2020/11/13/ontology-graphs-and-turtles-part-i.html" "description"="博客文章" >}}
### Ontology, graphs and turtles - Part I
{{< /digest-item >}}


这个文章系列有三部曲，可以看作是知识图谱的一个入门文章。文章还以Wikipedia为例子说明了知识图谱是如何使用和工作的。
1. [Ontology, graphs and turtles - Part I](https://blog.owulveryck.info/2020/11/13/ontology-graphs-and-turtles-part-i.html)
2. [Ontology, graphs and turtles - Part II](https://blog.owulveryck.info/2020/11/17/ontology-graphs-and-turtles-part-ii.html)
3. [Ontology, graphs and turtles - Part III](https://blog.owulveryck.info/2020/11/20/ontology-graphs-and-turtles-part-iii.html)

{{< digest-item "source"="https://blog.peterzhu.ca/ruby-range-bsearch/" "description"="博客文章" >}}

### 1.5 is the midpoint between 0 and infinity in Ruby
{{< /digest-item >}}

这篇文章挺有意思的：如果你在Ruby里面把两个端点设为0和浮点数无穷大(`Float::INFINITY`)，那么你做二分查找的第一步，会找到`1.5`这个数作为二分的中点。这背后涉及到问题是计算机的浮点数的表征方式，HackerNews的讨论建议一下两篇文章必读
* [What Every Computer Scientist Should Know About Floating-Point Arithmetic](https://docs.oracle.com/cd/E19957-01/806-3568/ncg_goldberg.html)
* [Python: Floating Point Arithmetic: Issues and Limitations](https://docs.python.org/3/tutorial/floatingpoint.html#tut-fp-issues)

另外这篇[Stern-Brocot Tree](https://www.cut-the-knot.org/blue/Stern.shtml)也跟这里提到的问题相关。


{{< digest-item "source"="https://www.wealthsimple.com/en-us/magazine/cobol-controls-your-money" "description"="博客文章" >}}
### The Code That Controls Your Money
{{< /digest-item >}}

COBOL是一门已经超过50岁的程序语言。它在信息时代的初期非常流行，也成为了美国金融体系中最重要的组成成分之一——几乎现在每一笔金融交易都涉及到一些COBOL程序段。然而，现在懂得COBOL这门程序语言的人也已经60多岁了，年轻的程序员几乎没有学过COBOL的，更别提对COBOL的代码库比较熟悉的。所以现在大量的COBOL代码库没有人维护。虽然已有的COBOL代码非常稳定，也非常快速（毕竟是经过了几十年的优化），但同时也没有人敢轻易修改这些代码，因为一修改可能就会出错，而且还不知道错在哪里，更别提往代码库里面添加新的功能。

这篇文章详细地描述了北美COBOL代码库目前的困境，比如人才的流失、代码迁移和更新的障碍等等。如果现在学COBOL，可能会是一件能够获得铁饭碗的活，但是这个铁饭碗也可能没有任何创新，只是“无聊地”维护已经有的代码。比如文中一位程序员写了30年COBEOL，85%的工作都是在维护已有的代码。文中另外一个有趣的例子是说程序员为了修补千年虫的BUG，提前两年半开始更新代码库。最后，也还是没有真正“修复”千年虫的问题，而是设置了一个期限：如果表示年分的两位数小于45，那就认为是21世纪（比如`44`表示2044年），如果大于45，那就是20世纪（比如`85`表示1985年）。那等到2045年，看我们需要多少人来再修复这个bug吧。

COBOL，跟英制单位（英寸、英尺）和陈旧的基础设施一样，都是美国这个历史最悠久的现代国家的的印记。祖传代码库的维护和更新，也一直是软件工程里面一个重要的问题。今天的C++/Java代码库，也可能成为明天的COBOL。

{{< digest-item "source"="https://limitlesscuriosity.com/the-purpose-of-writing/" "description"="博客文章" >}}
### The Purpose Of Writing
{{< /digest-item >}}

这篇文章主要的观点是：写文章是为了让自己的思维更清晰，也是为了让别人能够给你的想法提意见，从而让你的思维更完整。之前看过一个视频，说写文章是为了让读者获得更有价值的知识。不同的写作目的，写出来的文章会是很不一样的。

## 网络学习

{{< digest-item "source"="https://github.com/google/lisp-koans" "description"="编程语言入门" >}}
### lisp公案
{{< /digest-item >}}


设计某个程序语言的“公案（koans）”，并用这个“公案”来帮助程序语言的学习，这个想法是从Ruby Koans开始的，来源是禅宗用一段公案（一段言行或者一个小故事）来帮助参禅者开悟。我在我看到的各种语言的实现方面似乎是通过一系列短小的、精心设计好的单元测试来帮助语言学习者了解各种语言属性。这个想法和方式都还挺有趣的，而且我从自己的经历也体会到从单元测试来学习语言属性或者工具库是一个非常不错的方法。

类似的“公案”有：
* [python koans](https://github.com/gregmalcolm/python_koans)
* [ruby koans](http://rubykoans.com/)
* [java koans](https://github.com/matyb/java-koans)
* [go koans](https://github.com/cdarwin/go-koans)

## 多媒体

{{< digest-item "source"="https://www.youtube.com/watch?v=LaHcOs7mhfU" "description"="人物采访" >}}

### David Bowie predicted in 1999 the impact of the Internet in BBC interview
{{< /digest-item >}}

看David Bowie预测因特网对媒体、对娱乐、对艺术创作的影响。现在回过头来看，David Bowie确实很有远见，而主持人只是在一个劲的说：“但因特网只是个工具啊，你觉得会带来翻天覆地的变化？”

## 工具、技术、展示

{{< digest-item "source"="https://float.exposed/" "description"="浮点表征详解" >}}
### 浮点数一览无余
{{< /digest-item >}}
这个网站是直接解析浮点数的二进制表征，然后告诉你，根据不同的浮点数表征标准，你储存的浮点数的真实大小。这个小工具可以当作浮点数标准学习的最佳辅助工具了。

比如你可以试一试，如果你输入1.4，按下回车，网站会告诉你，实际上能够被表达的数字是1.39999多一点。

![浮点数表征](/images/floating_number.png)

{{< digest-item "source"="https://github.com/jhuangtw/xg2xg" "description"="同义词表格" >}}
### xg2xg仓库
{{< /digest-item >}}
这个xg2xg(ex-googler to ex-googler)的仓库整理了所有Google内部工具所对应的外部版本和外部工具。这个对于想要知道Google island外面的世界现在长什么样子的人来说还是挺有帮助的。另外，这个仓库也整理了很多有用的文章。
