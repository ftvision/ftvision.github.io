---
title: "Digest 020"
date: 2021-02-13T23:03:54-05:00
draft: true
---

## 文章
{{< digest-item "title"="A visual guide to SSH tunnels" "source"="https://robotmoon.com/ssh-tunnels" "description"="知识讲解" >}}

这个所谓的Visual Guide，我看了一遍感觉还是没有完全看懂。感觉我也没有完全把指令，行为，视觉这三者之间联系起来。可能还是因为我SSH相关的知识不太了解吧。

{{< digest-item "title"="ARCHITECTURE.md" "source"="https://matklad.github.io//2021/02/06/ARCHITECTURE.md.html" "description"="经验分享" >}}
这篇文章是推荐在一个REPO里面（比如一些大的开源项目的REPO里面）写一个Architecture的文档，提纲挈领地描述一下整个项目的架构，给一个“一万米高空”的鸟瞰图，清晰地划分不同结构之间的边界与关系，方便其他开发者快速有效地理解项目的框架。另外，在这个Architecture文档里面，也可以写一下重要的目录结构、模块、类型、设计中的假设和不变量（invariants）。

{{< digest-item "title"="What is Complexity Science?" "source"="https://complexityexplained.github.io/" "description"="知识讲解" >}}

这是一个讲解“Complexity Science”的一个页面，这个页面主要是提到了Complexity Science这个研究领域的一些特点，一些例子和相关的重要概念，可以当作是一个非常粗浅的概述。内容的话，其实看[这个PDF](https://complexityexplained.github.io/ComplexityExplained.pdf)要快很多。

这个页面配合了不少可探索的解释（Explorable Explanation），但是整体读起来信噪比比较低，而且那些可探索的解释也没有很好地区分重要的内容和细节。我翻看了一下代码，好像主体都还是用D3写的，再一次说明学习D3的重要性。更多相关的可探索解释可以在[Complexity Explorables](http://www.complexity-explorables.org/)上看到。

## 网络学习

{{< digest-item "title"="The Missing Semester of Your CS Education" "source"="https://missing.csail.mit.edu/" "description"="技术课程" >}}

这个课程，和它的老版本（[Hacker Tools](https://hacker-tools.github.io/lectures/))是MIT开的一个讲计算机基本工具使用的短课程，内容很实用，值得刷一遍。

{{< digest-item "title"="Great Practical Ideas in CS" "source"="https://www.cs.cmu.edu/~07131/f20/" "description"="技术课程" >}}

这个课程可以看作是上面👆课程的CMU版本。内容有重叠的部分，也有不同的部分，也可以刷一遍。

## 多媒体

{{< digest-item "title"="Illuminating hyperbolic geometry" "source"="https://www.youtube.com/watch?v=eGEQ_UuQtYs" "description"="知识讲解" >}}

这个视频讲解了如何将球面信息投射到2D平面。比如在制作地图的时候，我们就需要把地球表面的信息投射到2D平面。现在很多地图的制作都会扭曲各个部分的实际大小（[The True Size](https://thetruesize.com/)这个网站能够清晰地让你看到一个地区的面积大小在地图的不同位置会被扭曲成多大）。这个视频讨论了各种投射的方式——对应的是各种双曲线坐标系转换的方式，以及如何在现实生活中利用3D物体和光来呈现和解释这些不同的坐标转换/投射的方式。

{{< digest-item "title"="The PEP 8 Song" "source"="https://www.youtube.com/watch?v=hgI0p1zf31k&feature=emb_title" "description"="娱乐分享" >}}

这是一首唱出PEP 8主旨的歌，非常好听，内容也非常接地气，听完以后我觉得我可以写更好的Python了！

## 工具、技术、展示

{{< digest-item "title"="Open Street Map" "source"="https://www.openstreetmap.org/" "description"="网络数据库" >}}

这个是现在一个重要的开源地图项目，很多公司，比如Facebook，Lyft等等，都会使用这个开源的地图。原因之一应该是不用给Google或者Apple巨额的费用吧。作为开发者，其实可以考虑用这样的地图试一试。这个地图的质量也不见得比Google或者Apple的地图质量差。
