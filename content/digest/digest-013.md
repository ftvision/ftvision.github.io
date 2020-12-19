---
title: "Digest 013"
date: 2020-12-13T23:15:42-05:00
---

## 文章

{{< digest-item "title"="编写一个最小的 64 位 Hello World" "source"="https://cjting.me/2020/12/10/tiny-x64-helloworld/" "description"="博客文章" >}}

这是CJTing的一篇新文章，从最简单的C语言Hello World程序出发，逐层剖析，解释了这个最简单的程序从编译到运行各个阶段的底层知识。
* 什么是可执行文件，可执行文件在Linux下是什么格式。
* Linux内核是如何运行一个可执行文件的。
* 如何将Hello World程序抽丝剥茧，做成一个只有170字节，在Linux下可以运行的程序。（这一步涉及到把C语言的每个部分都还原为汇编语言，并且了解其中对应关系）

跟之前的文章一样，这篇文章内容详细，解读深入浅出，是非常不错的技术类博客文章。

{{< digest-item "title"="100+ Lessons Learned for Project Managers" "source"="https://llis.nasa.gov/lesson/1956" "description"="经验分享" >}}

这篇文章是NASA的前副主任(Associate Director)Jerry Madden总结了122条项目经理的经验总结。里面**工程设计**、**统筹决策报告**、**管理项目人员**、**应对上级领导**、**客户关系**和**承包商关系**六个大类。这122条经验可以当作是格言短文吧，时不时拿出来看看也挺好的。这里还有一份[PDF版本](https://www.nasa.gov/pdf/293253main_62682main_jerry_madden_forum7.pdf)

这里摘抄几条我初看一遍很喜欢的：

> 别怕失败，否则你不会成功，但是一定要练习你从失败中恢复的能力，而这个技能包括知道找谁帮忙。(第五条）
> 保持数据简洁明了，不辱任何人的智力。（第八条）
> 犯错没关系，但是不能失败。失败是无法恢复的错误；所以，对风险高的物件和计划，要尝试制定应变计划和备选项。（第十条）
> 交流并不廉价。了解人员和技术问题的最好办法是找到正确的人交流。缺乏恰当的交流是致命的。（第二十二条）
> 不要找借口，要提出可行的应对计划。（第二十七条）
> 要注意工作狂。如果他们在错误的方向上努力，他们可以在短时间内制造大量的麻烦。工作狂很容易过劳，导致工作倦怠，而其中一部分原因是他们自己制造的。所以要切记让这种人有充分的休息时间，给他们的工作量也不要超过正常工作量的1.25到1.5倍。（第五十条）
> 如果你有问题需要更多的人来解决，要像厨子加盐一样的方法招人：一次只加一点盐。（第五十四条）
> 项目需要一个团队的努力才能成功。记住很多团队有一个教练而不是老板，但是教练仍然需要叫人参加比赛。（第七十三条）

{{< digest-item "title"="OpenAI LP" "source"="https://openai.com/blog/openai-lp/" "description"="公司公告" >}}

OpenAI宣布成立有限公司OpenAI LP，由OpenAI Nonprofit的董事会管理。这个有限公司想设计一个回报上限(Capped Value Return)，号称在投资人注资的时候就商定一个将来的回报限额，如果将来OpenAI LP赚钱了，在限额内的部分会反馈给投资者，但是在限额以外的所有盈利都收归OpenAI Nonprofit所有，用来进一步开发通用人工智能的技术。

这个决策还挺有意思的。我们可以先看看同行的情况，Deepmind在2018年就将近[亏损了6个亿](https://www.forbes.com/sites/samshead/2019/08/07/deepmind-losses-soared-to-570-million-in-2018/?sh=3894156b3504)，然后2020年有得到Google的帮助，直接把用来探索AI技术的[15个亿的贷款给一笔勾销](https://www.bloomberg.com/news/articles/2020-12-17/deepmind-says-2019-revenue-jumped-158-on-ai-research-work)了。OpenAI虽然一开始一直想做非盈利机构，但是发现技术突破需要的费用实在是太高了，但是同时他们也发现了一些可以用来盈利的技术，所以看来是放弃了一开始天真的想法，还是决定做一个有限公司来解决技术背后的经济需求。这个“带有回报上线”的有限责任公司到底会变得怎么样，我们可以拭目以待。


{{< digest-item "title"="I regret quitting astrophysics" "source"="http://www.marcelhaas.com/index.php/2020/12/16/i-regret-quitting-astrophysics/" "description"="经验分享" >}}

作者2013年离开学术界，离开了天文学的研究，成为了一名数据科学家。7年之后，当他回过头来看，他觉得挺后悔的。基本上后悔的点在于：
1. 工作缺乏动力
2. 想念学术研究的魅力
3. 想念学术机构的讨论环境
4. 工作缺乏激情和自豪感

我感觉这几点可能确实是因为在新的工作中没有找到激情和有趣的地方。当然，工业界的工作确实是比较琐碎和平凡。我是2018年离开学术界的，不知道我7年以后会不会后悔离开学术界。

{{< digest-item "title"="The CPUs of Spacecraft Computers in Space" "source"="http://www.cpushack.com/space-craft-cpu.html" "description"="历史回顾" >}}

这个页面整理了截止到2012年，美国不同型号的太空飞行器所使用的CPU的型号。由于太空飞行器所处的环境极其恶劣，比如温度变化非常大，受到的辐射非常强等，太空飞行器一般都不用最新的CPU，而是使用经过长时间测试的CPU。这个页面罗列了CPU的信号和选择、设计CPU的时候的考虑。我觉得这个页面很有意思的原因是，如果我们想象将来的太空扩张，我们会发现实际上飞在天上的各种飞行器是来自“过去的文明”，而反倒是地球表面的社会处在一个“将来的文明”中。

{{< digest-item "title"="Stripe’s payments APIs: the first ten years" "source"="https://stripe.com/blog/payment-api-design" "description"="技术博客" >}}

这篇Stripe的技术博客总结了Stripe的API在过去十年的变化，以及背后的原因。一开始Stripe只支持信用卡，所以在API的设计上是围绕着信用卡的使用场景来简化的（只使用了一对概念：`token`和`charges`）。后来，银行业务和比特币的业务加了进来，因为这两项业务有新的结算方式，所以API变得更加复杂。再后来（2015-2017），电子支付方式如雨后春笋，Stripe为了支持更多的支付方式，开始进一步往之前的API里面加入参数，直到最后发现最开始的API设计变得过于复杂。于是，2018年的时候，Stripe重新审视已有的各种支付方式，然后设计了全新的API（回到一对概念：`PaymentIntent`和`PaymentMethod`），将支付方式进行了新的抽象。这个新的抽象将整个API的工作流程简化了不少。但是，新的API有很大的改变，所以花了2年的时间才逐渐把新的API推广到全球的用户。

Stripe的技术博客一如既往的写得好啊。读他们的技术博客和API文档，确实感觉是一家让人喜欢的公司。Hackernews上也是好评如潮。

{{< digest-item "title"="Equity guide for employees at fast-growing companies" "source"="https://withcompound.com/r/equity-guide-to-fast-growing-companies" "description"="知识分享" >}}

这篇文章讲的是在创业公司工作，员工面临的股权行权的问题。不同的决策会有不同的收益，也有不同的税收要求。

老实说，这篇文章没有太看懂。但是如果将来想去创业公司的话，股权方面的一些问题还是要了解一下，因为这个东西对个人财政状况影响还挺大的。


## 网络学习

{{< digest-item "title"="现代 C++ 教程: 高速上手 C++ 11/14/17/20" "source"="https://changkun.de/modern-cpp/" "description"="C++书籍" >}}

这是一本中文写作的现代C++教程，重在介绍C++11以来的变化和改进。其中提到了[What Every Programmer Should Know About Memory](https://people.freebsd.org/~lstewart/articles/cpumemory.pdf)这篇文章，也同样值得花时间好好学习。

{{< digest-item "title"="hacking C++" "source"="https://hackingcpp.com/index.html" "description"="C++教学网站" >}}

这个网站展示和讲述C++的方法很有新意：作者制作了很多Cheatsheet和图标来展示概念，非常清晰易懂，可以作为学习C++的很好地补充材料。

{{< digest-item "title"="2020年TLA+会议" "source"="http://conf.tlapl.us/2020/" "description"="TLA+会议" >}}

之前第五期记录了Leslie Lamport关于TLA+的介绍，今天发现他们还有会议了。这个会议算是一个比较好的学习工业界如何在工作场景中实践TLA+的教程了。不过报告的内容还挺复杂的。TLA+这个东西，感觉有时间确实是可以了解一下，看起来还挺好玩的。

## 多媒体

{{< digest-item "title"="The UNIX Time-Sharing System" "source"="https://chsasank.github.io/classic_papers/unix-time-sharing-system.html#" "description"="系统设计" >}}

这是UNIX设计的原始论文，文章写得很清晰，但是比较长。找时间再仔细读一下。

另外，AT&T的这个纪录片档案《[The UNIX Operating System](https://www.youtube.com/watch?v=tc4ROCJYbm0&t=797s)》是一个很不错的关于Unix的介绍。这个视频也讲解了当时Unix设计上的创新，比如`|`操作符，比如重新导向输入输出的操作(`>`和`<`)，以及这篇文章着重讨论的Unix的文件系统。

{{< digest-item "title"="Hacker interview-Gummo" "source"="https://yahnd.com/theater/r/youtube/g6igTJXcqvo/" "description"="人物采访" >}}

这个是Gummo的个人采访。Gummo分享了他整个人的发展过程，从早起的不幸家庭，到后来学会计算机并且逐步成为计算机黑客，到后来挖了8000多个比特币、进入网络安全行业，再到最后的人生感悟。整个过程就是听他娓娓道来自己的经历，听他诉说自己的挫折，谈自己的成长。

我觉得最后有一点挺可爱的，就是Gummo一只手指一直涂的是粉红色的指甲油。因为当年一个小姑娘问他为什么不当好人，而要当坏坏的黑客。他有了家庭和孩子之后，又被这个小姑娘感化，于是决定用自己所学的知识来保护更多人，然后涂上这个粉红色指甲油，作为一种宣言，也是一种对自己的提示。真是力量越大，责任越大。

{{< digest-item "title"="Let’s go whaling: Tricks for monetising mobile game players with free-to-play" "source"="https://yahnd.com/theater/r/youtube/xNjI03CGkb4/" "description"="技术分享" >}}

这个视频真的值得看一看，讲的是怎么设计游戏里面的费用，让玩家愿意去大把氪金。讲得还挺有道理的，基本上就是把心理学上研究过的各种行为现象往“赚钱”的目标上优化。这里面包括扭蛋和赌博背后的行为机制，斯金纳的操作性条件反射，卡尼曼的非理性消费者行为，延迟满足与立即满足，服从与从众等等。虽然听演讲着讲起来都挺有道理的，但是我并不希望这些人性被利用，所以听完之后觉得人们好可悲。

另外，这个演讲提到了一些我不知道的思维模型。

首先，演讲者提到玩家可以分为四类：
* Achiever（努力家）：喜欢在游戏中达成很多成就，由此产生成就感。
  * 对这样的玩家，可以在**游戏的便利**上提供氪金的选择，让玩家通过氪金更加方便地达到成就，满足成就感。
* Socializer（交际花）：喜欢在游戏中社交，由此产生成就感。
  * 对这样的玩家，可以在**游戏的定制**上提供氪金的选择，让玩家通过氪金成为社交圈中最靓的仔，满足成就感。
* Killer（杀人犯）：喜欢在游戏中竞技，由此产生成就感。
  * 对这样的玩家，可以在**游戏的竞争力**上提供氪金的选择，让玩家通过氪金成为“最强”的玩家，满足成就感。
  * 但是这里有个问题，在竞争力上提供氪金的选择，很有可能使游戏失去平衡性，导致氪金的玩家就明显的强，这让不氪金的玩家会失去兴趣。
* Explorer（探险者）：喜欢探索游戏中的各种可能性，由此产生成就感。
  * 对这样的玩家，可以在**游戏的内容**上提供氪金的选择，让玩家通过氪金解锁更多的游戏内容，满足成就感。

其次，在设计氪金的手段上，可以使用（钩子）Hook，（习惯）Habit，（爱好）Hobby模式：
* 钩子：一些廉价的方式让玩家从0开始氪金。这些选择一般费用都很低，慢慢给玩家建立一种“这个游戏花点钱没有关系”的心里感受，由此吊玩家上钩。
* 习惯：一些常见的氪金方式，大量的玩家可能会偶尔氪金一下，然后立马感受氪金带来的爽快。通过设置这样的习惯性氪金的选择，让玩家稳定地在游戏上氪金。
* 爱好：面对一些爱上了氪金的感觉的玩家，要提供没有上限的氪金选择。这一部分选择要给玩家提供无限氪金的可能性，不要让玩家发现氪着氪着就没有什么进展了。

## 工具、技术、展示

{{< digest-item "title"="Tiny Projects" "source"="https://tinyprojects.dev/" "description"="小项目展示" >}}

作者的目标是制作一些需要1-2周就能完成的小项目，到目前为止一共有6个小项目，其中一个小项目还[卖了5300刀](https://tinyprojects.dev/posts/selling_a_tiny_project)。在完成每个项目以后，作者都写了一个项目总结，把自己制作这个项目的整个过程记录了下来。读者也可以把这些总结看作是教程来学习怎么制作一些小的项目。读完这些项目，感觉学到了挺多东西的。

总结一下作者六个项目所使用的一些工具和技术吧，期待作者将来的更新。

1. 域名（domain）
   * 基本上都是用的Google Domain，选的`.com`结尾的一级域名，价格基本上都是10英镑左右（美元12刀）。
   * 很有意思的是，作者基本上每个项目刚开始就毫不犹豫地买了域名，而且每个域名的名字都还挺有意思的。
2. 托管（Hosting）
   * 目测清一色用的Google Firebase，不要钱，支持静态网页托管。
   * 后端功能基本上都是用的Firebase的serverless功能（比如Firebase的实时数据库）以及一些Saas的API服务（见下）。
   * 因为作者的主旨是做“小项目”，所以基本上不需要很复杂的托管服务。
3. 技术（Tech stack）
   * 最基本的HTML，CSS和Javascript。
   * 后期因为建站复杂了一些，用了Angular + NodeJs用来搭建整个网站。
   * 后端和服务基本上都是使用API。
   * 游戏那个项目用了Unity。
   * EarlyName那个项目用了Puppeteer，利用无头浏览器来自动检测网站属性。
   * ProductHunt的宣传视频是怎么做的，这个作者没有具体分享。
4. API服务（API Service）
   * 支付业务：[Stripe](http://stripe.com/)
   * 邮件业务：之前用的Gmail+[Nodemailer](https://nodemailer.com/about/)，后来改用[SendGrid](https://sendgrid.com/)
5. 宣传（Advertiseing）
   * 产品主要使用[ProductHunt](https://www.producthunt.com/)宣传和曝光。
   * 帖子通过[HackerNews](https://news.ycombinator.com/)宣传和曝光。
   * 用过Facebook Ads，但是效果不太好。
6. 时间
   * 基本上每个项目是40到80小时的工作量，但是基本上都是在两到三周做出来的。
