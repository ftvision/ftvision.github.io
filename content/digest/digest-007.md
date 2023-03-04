---
title: "Digest 007"
date: 2020-11-06T09:46:06-05:00
categories: 
- 阅读笔记
tags:
- 技术新闻
---

## 文章

{{< digest-item "source"="https://engineering.fb.com/2020/10/21/networking-traffic/how-facebook-is-bringing-quic-to-billions/" "description"="技术报道" >}}
### How Facebook is bringing QUIC to billions
{{< /digest-item >}}


Facebook撰文介绍他们在全面推广使用[QUIC](https://quicwg.org/)作为网络连接方式，用来取代TCP为基础的连接方式，从HTTP2迈向HTTP3。他们花了大篇幅介绍这个迁移项目的影响。我连TCP/IP都还没有完全搞明白，现在看来又要学新的东西了。

另外，Facebook也写了一个自己的QUIC实现：[mvfst](https://github.com/facebookincubator/mvfst)。

{{< digest-item "title"="AI pioneer Geoff Hinton: “Deep learning is going to be able to do everything”" "source"="https://www.technologyreview.com/2020/11/03/1011616/ai-godfather-geoffrey-hinton-deep-learning-will-do-everything/amp/" "description"="个人采访" >}}

这篇最近对于Geoff Hinton的采访回顾了一下Hinton复兴这次神经网络的旅程，聊了一下他走上这条路的历史，以及他对于联接主义的信念。采访中问到了几个问题，Geoff Hinton的回答挺值得思考的。

1. 深度网络能实现人类智能吗？
   * Geoff Hinton依然坚信深度学习能做任何事情，但是同时承认还需要很多概念和理论的突破。他提到了Transformers就是很不错的例子。
   * Geoff Hinton接下来提到了GPT-3最近的突破，及其利弊。
2. 深度网络是要更深还是更广？
   * 都要。人脑也有极大数量的参数。
3. 深度网络需要常识吗？
   * Geoff Hinton认为深度网络中嵌入常识确实很重要。

另外一个很有意思的回答是Geoff Hinton提到Stephen Kosslyn和Jerry Fodor/Zenon Pylyshyn之间关于visual image的辩论：

* Kosslyn: when you manipulate visual images in your mind, what you have is an array of pixels and you’re moving them around.
* Fodor/Pylyshyn: visual image is hierarchical, structural descriptions. You have a symbolic structure in your mind, and that’s what you’re manipulating.

然后Geoff Hinton认为这两派都是错的：
* Kosslyn: thought we manipulated pixels because external images are made of pixels, and that’s a representation we understand.
* Fodor/Pylyshyn: thought we manipulated symbols because we also represent things in symbols, and that’s a representation we understand.
* Hinton认为：I think that’s equally wrong. What’s inside the brain is these big vectors of neural activity.

这个观点真的非常有意思。

{{< digest-item "source"="https://ihatecoordinatesystems.com/" "description"="知识网页" >}}

### I Hate Coordinate Systems!
{{< /digest-item >}}


这个网页很有意思，讲得是地理空间研究中的坐标系统有多么复杂。整个页面是以不同的问题来组织信息的，问题从浅入深，层层递进，以问答的方式介绍了地理空间系统的一些计算和矫正数据的方法。

{{< digest-item "source"="https://raphlinus.github.io/text/2020/10/26/text-layout.html" "description"="文本排版" >}}
### Text layout is a loose hierarchy of segmentation
{{< /digest-item >}}

这篇文章讲了一下计算机的文字排版问题。文字排版是计算机视觉界面中最重要的一部分，这个问题真的是非常复杂。从段落分析，到段落中的文字呈现方向，到字符确认，到字体渲染，到最后呈现，每一步都可能出错，每一步都需要适应不同国家不同文化的排版需求。 文字段落的方向确认本身就是一个很有趣的问题，[W3C有一篇比较好的讲解文章](https://www.w3.org/International/articles/inline-bidi-markup/uba-basics)。另外，[这篇关于Linux文字渲染的短文](https://mrandri19.github.io/2019/07/24/modern-text-rendering-linux-overview.html)把整个渲染的步骤比较简介明了地展现了出来，对文章的阅读也很有帮助。

另外，这篇[Text Rendering Hates You](https://gankra.github.io/blah/text-hates-you/)也是一篇蛮有意思的小文章的。

## 网络学习

{{< digest-item "source"="https://jwiegley.github.io/git-from-the-bottom-up/" "description"="网络教材" >}}
### Git from the Bottom Up
{{< /digest-item >}}

这是一本关于Git的短小的教程，主要就是三个大的章节，整个阅读下来可能就是2个小时左右。

{{< digest-item "source"="https://onlywei.github.io/explain-git-with-d3/" "description"="知识可视化" >}}
### Visualizing Git Concepts with D3
{{< /digest-item >}}
这是另外一个学习Git的小工具，利用了一些可视化/可探索化的方式来呈现了Git的各种命令背后发生的事情。我觉得这里最值得学习的应该是作者如何用D3来实现了整个教程。很棒的Explorable Explanation的例子。

{{< digest-item "source"="https://cmu-313.github.io/" "description"="网络课程" >}}
### Foundations of Software Engineering
{{< /digest-item >}}
这是一个软件工程的课程，而不是具体的某种技术、某种程序语言、或者某种研究领域的课程。里面讨论的内容有一些跟技术有关，有一些是一些软件工程项目开发实践上的问题，我觉得可以结合Google的软件工程那本书一起来看。

## 多媒体

{{< digest-item "source"="https://www.youtube.com/watch?v=Fy0aCDmgnxg" "description"="经验分享" >}}
### Juice it or lose it
{{< /digest-item >}}
这是一个2012年的视频，两个主讲通过一个简单的弹球游戏，展示了如何用一些简单的效果，使得整个游戏生动起来，更加“juicy”。这是一个非常好玩的视频，花20分钟看完这个视频非常值得。每一个功能都挺简单的，但是放到一起就非常炫酷了。[另一个源](https://www.gdcvault.com/play/1016487/Juice-It-or-Lose)

{{< digest-item "source"="https://www.youtube.com/watch?v=kc9HwsxE1OY" "description"="软件设计" >}}
### The Unreasonable Effectiveness of Multiple Dispatch
{{< /digest-item >}}
[Multi-dispatch](https://en.wikipedia.org/wiki/Multiple_dispatch)会根据运行时的实参类型来选择对应的函数。这个视频讲了一下Multiple Dispatch是怎么使得下面两件事情变得容易的：
1. Define **new type** for **existing operations**.
2. Define **new operation** for **existing types**.

Multiple Dispatch这个概念还挺陌生的，而且好像C++确实没有办法很好地实现这个功能。[Simplify C++写过一篇文章](https://arne-mertz.de/2019/10/multiple-dispatch-over-covariant-functions/)试图用covariant函数来
实现Multiple Dispatch，但是我看完之后感觉离这个演讲中提到的Multiple Dispatch还有很大的差距，尤其是Julia语言的不同用户可以直接用Multiple Dispatch来扩展已有的库的功能。

Eli Bendersky的博客上有关于不同语言的Multiple Dispatch的一系列文章([1](https://eli.thegreenplace.net/2016/a-polyglots-guide-to-multiple-dispatch/), [2](https://eli.thegreenplace.net/2016/a-polyglots-guide-to-multiple-dispatch-part-2/), [3](https://eli.thegreenplace.net/2016/a-polyglots-guide-to-multiple-dispatch-part-3/), [4](https://eli.thegreenplace.net/2016/a-polyglots-guide-to-multiple-dispatch-part-4/))

## 工具、技术、展示

{{< digest-item "source"="https://www.raspberrypi.org/blog/raspberry-pi-400-the-70-desktop-pc/" "description"="硬件展示" >}}
### Raspberry Pi 400: the $70 desktop PC
{{< /digest-item >}}
树莓派400已经可以支撑起整个“台式机”形态了！主要的计算单元被放在了键盘背后，然后可以驱动鼠标键盘，还可以接外接显示器，看起来非常不错！

{{< digest-item "source"="https://github.com/Domenicobrz/SS-refraction-through-depth-peeling-in-threejs" "description"="技术展示" >}}
### Screen space refraction through depth peeling in threejs
{{< /digest-item >}}
这是一个用[Three.js](https://threejs.org/)直接写的一个3D渲染效果，真的非常好看！在[live demo](https://domenicobrz.github.io/webgl/projects/SSRefractionDepthPeeling/)上你还可以自己手动调试各种参数来实时观察不同参数如何影响渲染的效果。其实程序也不是很长。
