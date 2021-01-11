---
title: "Digest 015"
date: 2021-01-01
---

## 文章

这一周主要是看了一些DevOps和SRE的文章和视频。有一些是从[SRE Weekly](https://sreweekly.com/)那里看到的。平时在工作的过程中学到了很多SRE相关的知识，本来以为蛮平常的，但是后来才发现这些概念在公司以外的地方还没有扩展开来。通过公司外的人来写SRE/DevOps相关的内容可以学习其他人和公司是怎么看待和实践相关的知识的。

{{< digest-item "title"="How to sell SLOs to Engineering Directors" "source"="https://medium.com/brexeng/how-to-sell-slos-to-engineering-directors-9c6379c3f246" "description"="经验分享" >}}

这篇文章讲的是如何向公司上层介绍并引进SLO的概念和指标。如果你的公司还没有使用SLO，但是你发现SLO可能会很有好处，那么这篇文章可以提供一个案例来教你策略性地说服公司上层选择使用SLO。

**商业影响**:
* 在各个重要的用户活动(Crtical User Journeys)上记录SLO能够把稳定性（Reliablity）和可用性（Availability）直接与商业价值挂钩（dollar business value），比如99%的稳定性需要付X的价钱，99.9%的稳定性需要Y的价钱。
* 当业务在发展的时候，如果能够保证稳定性和可用性不变，那么实际上就同时产生了更大的商业价值。这种时候，技术对商业价值的影响就可以被更好地理解和量化。

**技术影响**：
* 设定SLO是为了帮助工程师做更好的决策，决定在什么方面需要投入更多的人力和物力，要如何投入更多的资源，要解决什么重要的问题。
* 把SLO跟商业价值绑定，也能帮助产品经理和工程师找到可以沟通的共同语言。而这个共同语言又能帮助经理和员工来计划接下来的工作重点在哪里，比如要花多少精力在减少技术债(Tech Debt)，多少精力在提高稳定性(Reliability)，多少精力来开发新的功能(New Feature Development)

**运营影响**:
* 好的SLO能够帮助开发者更有信心地开发新的功能，并且了解新的开发对于已有系统的性能、功能、稳定性、质量、甚至是客户端业务的影响。
* 设定内部和外部SLOs（或者区分内部SLO和客户的SLA），能够在用户发现问题之前找到系统存在的可能问题，并且及时修复，从而减少对用户的影响和对业务的影响。
* 利用SLO来设定预警系统，可以让监控系统自动化，并且有可以被衡量的指标。

整体来说，我们通过SLO，把技术开发的价值与和公司商业价值的保持一致，让整个公司业务更加稳定，风险更加可控，迭代速度更加快，但又不影响客户的使用体验。但是在向领导层兜售这个概念的时候，需要考虑很多方面的影响，包括战略上的，技术上的，运营上的，等等。同时，使用SLO是一个Culture Shift，是一个对公司文化有改变的事情，所以可能需要逐步推广。但是，SLO确实有很多好处，值得考虑。

{{< digest-item "title"="SLO Adoption at Twitter" "source"="https://www.blameless.com/blog/slo-adoption-twitter" "description"="案例分享" >}}

这篇文章讲的是Twitter内部逐渐采用SLO的过程。这篇文章提到了向stakeholder介绍和使用SLO的过程中常见的一些挑战：
1. 不知道需要测量什么指标，或者如何测量这些指标(Not knowing what (and how) to measure)。
2. 不知道SLO能够带来什么具体的行动(confusion over how to make SLOs actionable)。
3. 工具和自动化程度不高，导致没有开发团队缺乏兴趣(Service owners could configure SLOs, but due to a lack of tooling and benefits automatically associated with turning SLOs on, there was little incentive to do so in context of other priorities.)。

而Twitter推广SLO的重大转机在于：**把SLO跟错误预算绑定（tying SLOs to error budgets）**。所谓错误预算，是**一段时间之内**，在特定的SLO指标下，可以允许的出错时间长度。比如如果Availability SLO是99%，那么每30天可以允许7小时11分59秒的Downtime，如果Availability SLO是99.9%，那么每30天可以允许21分54秒的Downtime。如果在30天的时间里面，服务的Availability Error在预算规定的范围内，那么可以着重开发新的功能；但是如果Availability问题超过了预算，那么开发团队就需要花时间来提高服务的Availability。因此，SLO和错误预算就可以转化为用来指导工作的指标，成为Actionable Item。

那么使用SLO的好处有哪些呢？Twitter觉得有这么一些好处：
* 不同的服务之间建立起了一个共同的语言（From a ‘distributed service zoo’ to a shared language）
* 明确的指标给开发团队提供了恰当的背景（The right amount of context）
* 服务之间可以提供动态的负载均衡（Dynamic load balancing and load shedding）（也就是说服务直接的Load Balancing可以通过检测其他服务的SLO来决定如何引导流量）
* 容错（Graceful degradation）

{{< digest-item "title"="Netflix's Context, Not Control: How Does it Work?" "source"="https://www.linkedin.com/pulse/netflixs-context-control-how-does-work-steve-urban/" "description"="公司文化" >}}

这篇文章分享了Netflix的管理哲学，集中讨论了[Netflix的管理文化](https://jobs.netflix.com/culture)（也可以对比参见[这个Slide Deck](https://www.slideshare.net/reed2001/culture-1798664)）中提到的：**管理者应该给员工提供工作合适的情景而不是控制员工应该做什么**。我觉得有几个知识点是值得学习的。

1. 面对相信工程师，可以提出自己的看法，询问工程师是否考虑了其他选项，思考设计和提案是否存在风险。虽然经理有时候需要出面解决一些难题，但是不要给工程师做每一个细小的决定，不要控制他们该干什么不该干什么，应该相信他们会作出好的决定。
2. 如果你的团队能够了解他们的工作如何与公司当前的商业挂钩，团队自己就能做出很多很好的决策。所以，在这个问题上，Netflix的高管会在每个季度都给各个阶层的员工分享公司的商业战略，沟通商业决策，并且逐步将工作背景(context)解释给各层员工。这种透明度能帮员工知道自己要怎么调整自己的工作，从而对应到公司的商业方向上。
3. 员工和管理层的信任是双向的：管理层相信员工能作出正确的技术决策，而员工相信管理层能够提供正确的信息和需求。当两者之间都能做好各自的工作的时候，各自就都能集中精力在自己应该做好的事情上，并且提高整个团队的效率。
4. 很重要的一点就是在招纳员工的时候，一定要选择正确的员工。文化上要合适，技术上要优秀。恰当的团队，正确的信息，是帮助团队高产的重要因素。

我觉得国内科技公司听起来在文化上就缺乏这些点。一方面管理层不见得相信员工能作出正确的技术决策，另一方面员工也不一定能从管理层得到恰当的背景和信息。另外，当所有人都比较年轻的时候，设计出来的结果不一定好，会进一步导致管理层对员工的能力不信任。这样是非常糟糕的环境和非常糟糕的文化。

{{< digest-item "title"="Why I've Been Merging Microservices Back Into The Monolith At InVision" "source"="https://www.bennadel.com/blog/3944-why-ive-been-merging-microservices-back-into-the-monolith-at-invision.htm" "description"="技术实践" >}}

这篇文章分享了为什么作者所在的团队把单一服务拆成多个Microservice，然后又为什么把多个Microservice整合回单一的服务。背后主要的原因还是Conway's Law所描述的系统设计与组织架构之间的关系：

> Any organization that designs a system (defined broadly) will produce a design whose structure is a copy of the organization's communication structure
>
> 设计系统的架构受制于产生这些设计的组织的沟通结构。

作者所在的团队一开始只有3个人，所以服务是一个单一服务。后来团队增长，有了很多开发者，这个时候把单一服务拆成多个Microservice能够让不同的子团队来负责不同的微服务，从而增加整个大团队的开发速度。后来，随着业务的发展和改变，作者所在的团队又变成了一个只有几个人的小团队。这个时候，作者发现这个小团队需要维护多个独立的微服务，变得非常麻烦，于是又决定把微服务整合起来成为一个单一的服务。

我觉得这个案例还是很有启发性的。公司业务到底是要用单一的服务还是要拆成各种微服务，这个是取决于公司本身的组织架构的。大公司和小公司，大部门和小部门，在设计上的决策都应该是不同的。好的架构应该是符合自己团队特点，能够被自己团队最好地控制的架构。

{{< digest-item "title"="Knightmare: A DevOps Cautionary Tale" "source"="https://dougseven.com/2014/04/17/knightmare-a-devops-cautionary-tale/" "description"="案例分析" >}}

2012年8月1日，骑士资本因为错误的软件部署，在45分钟内损失了4亿美元，而且导致了交易市场的闪崩。这个事件直接导致骑士资本破产，也给金融界的机器交易实践者上了重要一课。这个案例值得好好学习。这篇文章梳理了一下骑士资本出问题背后的事件和过程。另外[Nanex Research的这篇文章](http://www.nanex.net/aqck2/3522.html)也分析骑士资本这次闪崩造成的各种影响。机器交易这方面的风向还挺大的。

{{< digest-item "title"="SLO — From Nothing to… Production" "source"="https://geototti21.medium.com/slo-from-nothing-to-production-91b8d4270bd5" "description"="学习经验" >}}

在这篇文章中，作者分享了他如何学习SLO以及SRE相关的概念，然后在自己的工作中从0开始部署整个SLO的设定、测量和监控的。如果是到一个没有使用SLO相关概念的工作场合，需要通过自己的工作来给提倡SLO等概念，这篇文章可以说提供了很好的教程。文章里面不但分享了作者读过的书，还分享了作者在部署过程中所使用的软件和常见的工作流程。文章提到了[The Art of SLOs](https://docs.google.com/presentation/d/1qcQ6alG_qUg3qWf733ZsDnTggwzqe4PZICrFXZ1zQZs/edit#slide=id.g75945b48fe_0_0)这个Slide Deck。这个Slide Deck更加深入地讲解了什么事SLI，SLO，SLA，并且做了一些个案分析。这个Slide Deck挺值得学习。

## 网络学习

{{< digest-item "title"="基本操作" "source"="https://jibencaozuo.com/" "description"="可视化学习" >}}

回形针团队做的一个可视化、互动式学习的项目。这个项目可以被看作是一个有趣的尝试，也确实花了不少功夫来制作神经网络相关的交互动画。尤其是整个内容都是在视频里面进行的，让我觉得这是一个很有趣的技术挑战。

但是就内容而言，我觉得这样的方式其实学不到真正的内容，最多只是一些直观上的感受。有很多知识都还是需要扎扎实实地动手计算才行的。

如果你问我49块钱值不值，我觉得还是值的。我相信回形针这一波应该还是能赚不少钱的。

{{< digest-item "title"="School of SRE" "source"="https://linkedin.github.io/school-of-sre/" "description"="网络课程" >}}

LinkedIn出品的SRE相关的教程。可以简单了解一下。但是我觉得可能可以优先了解一下Google的SRE的两本书。

## 多媒体

{{< digest-item "title"="DevOps Vs. SRE: Competing Standards or Friends?" "source"="https://www.youtube.com/watch?v=0UyrVqBoCAU" "description"="SRE知识分享" >}}

这个视频讲了SRE和DevOps之间的关系。`Class SRE implements DevOps`这个说法还挺有趣的。DevOps更多定义的是做事的哲学和看法，而SRE定义了更多具体的指标和可执行的步骤。

{{< digest-item "title"="class SRE implements DevOps" "source"="https://www.youtube.com/playlist?list=PLIivdWyY5sqJrKl7D2u-gmis8h9K66qoj" "description"="SRE简短课程" >}}

这个系列一共是10个视频，讲解了SRE相关的10个重要的概念。每个视频也就5分钟左右，很快就可以看完。

## 工具、技术、展示

{{< digest-item "title"="horrifying-pdf-experiments" "source"="https://github.com/osnr/horrifying-pdf-experiments?utm_source=hackernewsletter&utm_medium=email&utm_term=fav" "description"="技术展示" >}}

这个Repo讨论了PDF支持的各种媒体，然后谈到PDF其实是支持Javascript，但是绝大部分的PDF reader都没有去实现这个API。Adobe设计的[PDF规格](https://www.adobe.com/content/dam/Adobe/en/devnet/acrobat/pdfs/pdf_reference_1-7.pdf)有1300页，似乎现在绝大部分的PDF reader都只实现了其中很少的一部分。有意思的是，[Chrome](https://pdfium.googlesource.com/pdfium/+/chromium/2557/fpdfsdk/src/javascript/Document.cpp#258)实现了这个规格中[关于Javascript的一部分API](https://www.adobe.com/content/dam/acom/en/devnet/acrobat/pdfs/pdf_reference_1-7.pdf#page=709)，所以我们在Chrome里面读PDF的时候，可以读到PDF里面的Javascript程序。作者提供了一个展示：[breakout PDF](https://cdn.jsdelivr.net/gh/osnr/horrifying-pdf-experiments@master/breakout.pdf)。这个PDF只有在Chrome下面看才能看到文件中的游戏，下载下来，或者用Safari都看不到文件中的游戏。这个演示挺有意思的。
