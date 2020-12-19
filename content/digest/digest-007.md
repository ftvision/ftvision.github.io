---
title: "Digest 007"
date: 2020-11-06T09:46:06-05:00
draft: true
---

## 文章

{{< digest-item "title"="How Facebook is bringing QUIC to billions" "source"="https://engineering.fb.com/2020/10/21/networking-traffic/how-facebook-is-bringing-quic-to-billions/" "description"="技术报道" >}}

Facebook


{{< digest-item "title"="AI pioneer Geoff Hinton: “Deep learning is going to be able to do everything”" "source"="https://www.technologyreview.com/2020/11/03/1011616/ai-godfather-geoffrey-hinton-deep-learning-will-do-everything/amp/" "description"="个人采访" >}}

这篇最近对于Geoff Hinton的采访回顾了一下Hinton复兴这次神经网络的旅程，聊了一下他走上这条路的历史，以及他对于联接主义的信念。

{{< digest-item "title"="I Hate Coordinate Systems!" "source"="https://ihatecoordinatesystems.com/" "description"="知识网页" >}}
//TODO

{{< digest-item "title"="Edsger Dijkstra: The Man Who Carried Computer Science on His Shoulders" "source"="https://inference-review.com/article/the-man-who-carried-computer-science-on-his-shoulders" "description"="知识网页" >}}
//TODO

{{< digest-item "title"="Text layout is a loose hierarchy of segmentation" "source"="https://raphlinus.github.io/text/2020/10/26/text-layout.html" "description"="文本排版" >}}

这篇文章讲了一下计算机的文字排版问题。文字排版是计算机视觉界面中最重要的一部分，这个问题真的是非常复杂。从段落分析，到段落中的文字呈现方向，到字符确认，到字体渲染，到最后呈现，每一步都可能出错，每一步都需要适应不同国家不同文化的排版需求。 文字段落的方向确认本身就是一个很有趣的问题，[W3C有一篇比较好的讲解文章](https://www.w3.org/International/articles/inline-bidi-markup/uba-basics)。另外，[这篇关于Linux文字渲染的短文](https://mrandri19.github.io/2019/07/24/modern-text-rendering-linux-overview.html)把整个渲染的步骤比较简介明了地展现了出来，对文章的阅读也很有帮助。

另外，这篇[Text Rendering Hates You](https://gankra.github.io/blah/text-hates-you/)也是一篇蛮有意思的小文章的。

## 网络学习

{{< digest-item "title"="Git from the Bottom Up" "source"="https://jwiegley.github.io/git-from-the-bottom-up/" "description"="网络教材" >}}

这是一本关于Git的短小的教程，主要就是三个大的章节，整个阅读下来可能就是2个小时左右。

{{< digest-item "title"="Visualizing Git Concepts with D3" "source"="https://onlywei.github.io/explain-git-with-d3/" "description"="知识可视化" >}}
这是另外一个学习Git的小工具，利用了一些可视化/可探索化的方式来呈现了Git的各种命令背后发生的事情。我觉得这里最值得学习的应该是作者如何用D3来实现了整个教程。很棒的Explorable Explanation的例子。

{{< digest-item "title"="Foundations of Software Engineering" "source"="https://cmu-313.github.io/" "description"="网络课程" >}}

这是一个软件工程的课程，而不是具体的某种技术、某种程序语言、或者某种研究领域的课程。里面讨论的内容有一些跟技术有关，有一些是一些软件工程项目开发实践上的问题，我觉得可以结合Google的软件工程那本书一起来看。

## 多媒体

{{< digest-item "title"="Juice it or lose it" "source"="https://www.youtube.com/watch?v=Fy0aCDmgnxg" "description"="经验分享" >}}

[另一个源](https://www.gdcvault.com/play/1016487/Juice-It-or-Lose)

{{< digest-item "title"="The Unreasonable Effectiveness of Multiple Dispatch" "source"="https://www.youtube.com/watch?v=kc9HwsxE1OY" "description"="软件设计" >}}
// TODO

## 工具、技术、展示

{{< digest-item "title"="Raspberry Pi 400: the $70 desktop PC" "source"="https://www.raspberrypi.org/blog/raspberry-pi-400-the-70-desktop-pc/" "description"="硬件展示" >}}

树莓派400已经可以支撑起整个“台式机”形态了！主要的计算单元被放在了键盘背后，然后可以驱动鼠标键盘，还可以接外接显示器，看起来非常不错！

{{< digest-item "title"="Screen space refraction through depth peeling in threejs" "source"="https://github.com/Domenicobrz/SS-refraction-through-depth-peeling-in-threejs" "description"="技术展示" >}}

这是一个用[Three.js](https://threejs.org/)直接写的一个3D渲染效果，真的非常好看！在[live demo](https://domenicobrz.github.io/webgl/projects/SSRefractionDepthPeeling/)上你还可以自己手动调试各种参数来实时观察不同参数如何影响渲染的效果。其实程序也不是很长。
