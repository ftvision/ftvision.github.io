---
title: Stripe技术博客
date: 2020-12-15
---
Recently, I've discovered Stripe's [Tech Blogs](https://stripe.com/blog/engineering). Arriving at one of their blog on [API versioning](https://stripe.com/blog/api-versioning), I have discovered that their engineering blogs are generally good reads, so I decide take a dive on the entire blogs.

{{< digest-item "title"="Stripe’s payments APIs: the first ten years" "source"="https://stripe.com/blog/payment-api-design" "description"="技术博客" >}}

这篇Stripe的技术博客总结了Stripe的API在过去十年的变化，以及背后的原因。一开始Stripe只支持信用卡，所以在API的设计上是围绕着信用卡的使用场景来简化的（只使用了一对概念：`token`和`charges`）。后来，银行业务和比特币的业务加了进来，因为这两项业务有新的结算方式，所以API变得更加复杂。再后来（2015-2017），电子支付方式如雨后春笋，Stripe为了支持更多的支付方式，开始进一步往之前的API里面加入参数，直到最后发现最开始的API设计变得过于复杂。于是，2018年的时候，Stripe重新审视已有的各种支付方式，然后设计了全新的API（回到一对概念：`PaymentIntent`和`PaymentMethod`），将支付方式进行了新的抽象。这个新的抽象将整个API的工作流程简化了不少。但是，新的API有很大的改变，所以花了2年的时间才逐渐把新的API推广到全球的用户。

- [To design and develop an interactive globe](https://stripe.com/blog/globe)
- [Similarity clustering to catch fraud rings](https://stripe.com/blog/similarity-clustering)
- [Designing accessible color systems](https://stripe.com/blog/accessible-color-systems)
- [Fast and flexible observability with canonical log lines](https://stripe.com/blog/canonical-log-lines)
- [The secret life of DNS packets: investigating complex networks](https://stripe.com/blog/secret-life-of-dns)
- [Railyard: how we rapidly train machine learning models with Kubernetes](https://stripe.com/blog/railyard-training-models)
- [Effectively using AWS Reserved Instances](https://stripe.com/blog/aws-reserved-instances)
- [A primer on machine learning for fraud detection](https://stripe.com/radar/guide)
- [Learning to operate Kubernetes reliably](https://stripe.com/blog/operating-kubernetes)
- [APIs as infrastructure: future-proofing Stripe with versioning](https://stripe.com/blog/api-versioning)
- [A guide to payment methods](https://stripe.com/payments/payment-methods-guide)
- [Connect: behind the front-end experience](https://stripe.com/blog/connect-front-end-experience)
- [Scaling your API with rate limiters](https://stripe.com/blog/rate-limiters)
- [Designing robust and predictable APIs with idempotency](https://stripe.com/blog/idempotency)
- [Online migrations at scale](https://stripe.com/blog/online-migrations)
- [Reproducible research: Stripe’s approach to data science](https://stripe.com/blog/reproducible-research)
- [Introducing Veneur: high performance and global aggregation for Datadog](https://stripe.com/blog/introducing-veneur-high-performance-and-global-aggregation-for-datadog)
- [Running three hours of Ruby tests in under three minutes](https://stripe.com/blog/distributed-ruby-testing)
- [Game Day Exercises at Stripe: Learning from `kill -9`](https://stripe.com/blog/game-day-exercises-at-stripe)
