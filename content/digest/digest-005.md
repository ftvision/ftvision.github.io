---
title: "Digest 005"
date: 2020-10-23T18:57:35-04:00
categories: 
- 阅读笔记
tags:
- 技术新闻
---

## 文章

{{< digest-item "title"="Up and Down the Ladder of Abstraction" "source"="http://worrydream.com/LadderOfAbstraction/" "description"="可视化解释" >}}
这个网页是上一期提到的Bret Victor的一个展示。这个网页通过具体的例子，展现了如何讲一个问题（利用算法控制汽车在路上自动驾驶）讲得透透彻彻。

每一个小节，都是将问题中的某一个变量可视化、可探索化，让试图解决问题的人（或者学习者）能够对问题中的这个变量有清晰直观的认识。我们可以通过摆弄展示的动画，调节展示的不同工具，来看到不同的参数是如何影响最后的问题的解的。

这里也不必在细说了，直接去网站学习和感受吧。

{{< digest-item "title"="This page is a truly naked, brutalist html quine." "source"="https://secretgeek.github.io/html_wysiwyg/html.html" "description"="技术讲解" >}}

这个网页挺有意思的，通过特殊的CSS技术，这个网页使得网页本身的所有标签都现实出来，不仅如此，网页的内容就是网页的代码，网页的代码就是网页的内容。这个东西在编程领域叫[Quine (computing)](https://en.wikipedia.org/wiki/Quine_(computing))，说的是一段程序，运行以后，输出的是这段程序本身。怎么理解呢？如果你写一个Hello World的程序，比如

```python
def HelloWorld():
  print('Hello World!')
```
这个程序运行以后，输出的是"Hello World！"，而这个程序本身是上面的整个文本。但是如果你的运行下面这段[Python程序](https://towardsdatascience.com/how-to-write-your-first-quine-program-947f2b7e4a6f)

```python
variable = 'print("variable = " + repr(variable) + "\\neval(variable)")'
eval(variable)
```

运行输出的结果会跟上面的代码一模一样。[这个网站](https://cs.lmu.edu/~ray/notes/quineprograms/)列举了不同语言的Quine小程序，有兴趣的可以去了解以下。


{{< digest-item "title"="Hands-Free Coding" "source"="https://joshwcomeau.com/accessibility/hands-free-coding/" "description"="技术分享" >}}

作者写了一个系统可以通过眼动和语音来编辑文本甚至是写代码。这个项目的大致思路是通过摄像头监控眼动，然后用语音识别系统将语音转换为文字，然后通过建立一套模式规则来将语言转换为程序命令。这个工作量还是挺大的，里面用的技术也很多，有一些是模式匹配，而有一些又是自然语言。仔细听了一下规则模式，感觉有点像Vim的按键操作语音化。现在工具包越来越多，语音识别的服务也越来越成熟，构建这样的应用也相对更加容易了。非常感谢作者制作了这样一个展示。将来这种语音界面会不会成为编程界面，这个很难说。但是语音界面确实给更多的人提供了与机器交互的更多可能性。

{{< digest-item "title"="Slow Software" "source"="https://www.inkandswitch.com/slow-software.html" "description"="人机交互研究" >}}

这是一篇很不错的从用户体验的角度分析什么样的软件是“慢软件”。这也可以算是一个人类时间感知与计算机软件工程之间的交叉研究项目。一方面，这个研究是测量用户可以察觉到的延迟长度，比如100ms以上的延迟用户就很容易感受到，而10ms以下的延迟用户就可能感受不到，从而认为软件是“立即响应”的。

文章的第一部分分析的是各种场景下，对用户而言，什么叫做“慢”。文章分析了触屏、键盘输入、鼠标点击、应用软件加载和运行等方面，不同延迟给用户的感受。基本上的结果是70ms左右的延迟，用户就会明显感觉机器有迟钝的感觉。这个70ms跟Google研究发现的100ms的阈值是比较接近的。

文章的第二部分分析的是延时到底来自哪里，然后讨论了底层硬件计算、输入输出端口的信号扫描频率、软件程序的机制和软件设计等方面是如何产生延迟的。这个讨论提供了一个挺全面的全栈(Full Stack)延时分析，值得学习。

最后，简而言之，100ms以上的延时就已经让用户觉得软件有点慢，反应迟钝。越长的延迟给用户带来越差的体验。

{{< digest-item "title"="APIs as infrastructure: future-proofing Stripe with versioning" "source"="https://stripe.com/blog/api-versioning" "description"="技术博客" >}}

Stripe的这个技术文章很有意思，讲的是作为基础设施服务的提供者面临的一个重要问题：API的版本更新和老版本兼容的问题。API更新的一个简单办法就是提供新的API，然后维护老的API，并逐渐想办法淘汰老的API。但是总会有一些用户没有办法改他们的代码来更新API，而维护老API的成本会越来越高，所以需要找个方法来提供API的兼容性。Stripe这里用了类似OT的解决方法，将API不同版本之间的改变定义为一系列的操作改变（比如`id`的类型从`string`变成了`hash`），然后用特定的语言（DSL）来编码每一项改变（比如`Change::AccountTypes`）。这样，当一个用户使用老的API与系统交互的时候，系统可以先解析老的API版本号，然后实施一系列的操作改变，将老API的数据转换为当前最新的API的数据格式，然后交给服务器处理。处理完以后，又可以进行一系列的操作，把新API的格式转换为老API的格式，让用户可以使用数据。

这个设计API和更新API版本的思路真的挺有意思的。这篇文章激发了我对Stripe这个公司的兴趣。

## 网络学习

{{< digest-item "title"="An Introduction to Kolmogorov Complexity and Its Applications" "source"="https://homepages.cwi.nl/~paulv/kolmogorov.html" "description"="教材主页" >}}

据说这本书是关于Kolmogorov Complexity最全面的一本教材了。另外，[A Philosophical Treatise of Universal Induction](https://www.mdpi.com/1099-4300/13/6/1076)可以作为辅助读物。

## 多媒体

{{< digest-item "title"="LEADERSHIP LAB: The Craft of Writing Effectively" "source"="https://www.youtube.com/watch?v=vtIzMaLkCaM" "description"="科学写作" >}}

这个视频五星推荐🌟🌟🌟🌟🌟

这个1小时关于写作的讲座真的是让我茅塞顿开。这里面说了一个关于写作很重要的问题，有很多写作，不是为了作者自己理顺思路而写作的，而是为了给读者提供价值而写作的。只有当文章提供给了读者价值的时候，读者才会有意愿继续阅读。很多时候，作者自以为的价值，对读者根本没有意义。而且，这样一个命题同时说明了对不同的读者，是需要用不同的方式，进行不同的写作的。所以，写作的第一步是了解你的目标读者是谁。讲座讲的是研究期刊投稿和基金申请的方面，不同的基金、不同的期刊，是有不同的读者群的，如果不能让读者觉得这篇文章有意义，那么这个群体自然会拒绝你的写作——拒绝你的文章或者拒绝你的基金申请。

俄亥俄州立大学把这个讲座的[PDF](https://cpb-us-w2.wpmucdn.com/u.osu.edu/dist/5/7046/files/2014/10/UnivChic_WritingProg-1grt232.pdf)材料放到了网上，大家可以下载学习一下。我非常推荐大家阅读这份资料和学习这个视频。同时，这个讲座还有一个类似的后续讲座（[LEADERSHIP LAB: Writing Beyond the Academy 1.23.15](https://www.youtube.com/watch?v=aFwVf5a3pZM)），内容稍有重叠，但是也有不一样的地方，值得同时享用。


{{< digest-item "title"="Leslie Lamport: Thinking Above the Code" "source"="https://www.youtube.com/watch?v=-4Yp3j_jk8Q" "description"="学术讲座" >}}

这个Talk的主题实际上是如何使用Leslie发明的TLA+语言来确定所需要实现的程序的规格说明(Specification)。

学习TLA+可以从[这个网站开始](https://learntla.com/)，另外[TLA+](https://lamport.azurewebsites.net/tla/tla.html)网站上有更多关于TLA+的资料。另外[TLA+的四部曲](https://pron.github.io/tlaplus)也是很不错的教材。[这个页面](https://github.com/tlaplus)有Github上相关的仓库。[这个实现](https://github.com/tlaplus/tlaplus)好像是比较受欢迎的一个实现。另外还有人整理了一系列[TLA+的使用案例](https://github.com/tlaplus/Examples)。

讲座的细节就不谈了，这里说一下我觉得对我很有启发的几个点：

**如何对程序进行建模**

有很多人把程序看作是一个函数，作为一个从输入到输出的映射。但是Leslie指出这个模型有很多问题。
1. “函数”这个模型只能说明程序做什么，不能说明程序如何做。比如冒泡排序和快速排序可以看作是同样的函数，因为他们的输入输出是相同的，但是他们实际上在算法层面有很大的差别。这个差别就是“函数”这个模型无法表达的。
2. 有很多程序并不存在输入和输出的映射
3. 有好多程序会永远运行下去。

Leslie认为应该把程序看作一个“行为”的集合，而每一个行为是一系列的状态的转移。这个模型就能表达“函数”模型不能表达的那些语义。如何形式化地表达和定义这些行为呢？Leslie就因此创造了TLA+这个语言用来提供程序的规格。

**Think above the code**

写代码之前要先思考，思考要超越具体的代码实现，要从一个更高的角度来看待将要实现的程序。**而所有的思考都要写下来，没有写下来的思考不算思考，只是自欺欺人罢了。**这句话还是很振聋发聩的。

最后，Leslie在讲座中提到了用TLA+表述了快速排序的算法之后，可以很自然而然地找到非递归的实现方式。有机会应该试着实现以下。

## 工具、技术、展示

{{< digest-item "title"="World" "source"="https://aem1k.com/world/" "description"="技术展示" >}}

上面文章里面说了HTML quine的展示，这里的World是Javascript的展示，代码本身就是代码所展示的内容，一个ASCII码的地球仪在转动。ame1k的[主页](https://aem1k.com)上有好几个非常有意思的Javascript代码，都值得去观赏一下。一方面这些代码算是奇技淫巧，另一方面也确实说明了作者的创造力。ame1k这哥们还做了一个[tixy.land](https://tixy.land/)，仅用四个变量和各种代数运算，你可以看到各种各样的代数关系的可视化效果。最后你还可以自己尝试一下，写一些新的小函数，很有意思。

{{< digest-item "title"="STRML.net的自我介绍" "source"="https://www.strml.net/" "description"="技术展示" >}}

这个页面之所以推荐是因为这是另一个quine，整个首页从加载一个动态页面开始，这个页面显示的代码正好就是这个页面所显示的内容。一边看着代码加载，一边看着页面变化，一边看着作者的信息慢慢地展现出来，感觉很生动，就像一步一步慢慢深入了解作者一样。当然，为一个问题就是要等完整个网页需要花一点时间。
