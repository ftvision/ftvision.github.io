---
title: System Design Interview
date: 2017-11-04
tags:
- System Design
- Interview
draft: true
---

# System Design

> In other words, the systems design interview is all about communication.

- [x] http://www.1point3acres.com/bbs/thread-210147-1-1.html
- [x] http://www.1point3acres.com/bbs/thread-208829-1-1.html
- [x] http://www.mitbbs.com/article_t/JobHunting/32777529.html
- [x] [Scalability for dummies](http://www.lecloud.net/tagged/scalability)
- [Github](https://github.com/checkcheckzz/system-design-interview/blob/master/README.md)
- [x] [HiredInTech](https://www.hiredintech.com/classrooms/system-design/lesson/52)
- [InterviewBit](https://www.interviewbit.com/courses/system-design/) 【需要读案例】
- [案例研究](http://highscalability.com/all-time-favorites/)
- [Facebook技术笔记](https://www.facebook.com/Engineering/notes)
- [x] [Palantir](http://www.palantir.com/2011/10/how-to-rock-a-systems-design-interview/)
- [The CAP FAQ](https://github.com/henryr/cap-faq)
- [CAP Theorem](http://ksat.me/a-plain-english-introduction-to-cap-theorem/)
- [Lethain's Introduction to Architecting Systems for Scale](https://lethain.com/introduction-to-architecting-systems-for-scale/)
> Once you understand the problem, try to come up with a solution—any solution whatever. As long as it’s valid, it doesn’t matter if your solution is trivial or ugly or extremely inefficient. What matters is that you’ve made progress. This does two things: (1) it forces you to engage with the structure of the problem, priming your brain for improvements you can make later, and (2) it gives you something in the bank, which will in turn give you confidence. If you can achieve a brute force solution to a problem, you’ve cleared a major hurdle to solving it in a more efficient way.


## Major Reference

- [Multiple Case Studies at Gainlo](http://blog.gainlo.co/)
- [High Scalability](http://highscalability.com/)


## TOPICS
Systems are complex, and when you’re designing a system you’re grappling with its full complexity. Given this, there are many topics you should be familiar with, such as:

- Concurrency. Do you understand threads, deadlock, and starvation? Do you know how to parallelize algorithms? Do you understand consistency and coherence?
- Networking. Do you roughly understand IPC and TCP/IP? Do you know the difference between throughput and latency, and when each is the relevant factor?
- Abstraction. You should understand the systems you’re building upon. Do you know roughly how an OS, file system, and database work? Do you know about the various levels of caching in a modern OS?
- Real-World Performance. You should be familiar with the speed of everything your computer can do, including the relative performance of RAM, disk, SSD and your network.
- Estimation. Estimation, especially in the form of a back-of-the-envelope calculation, is important because it helps you narrow down the list of possible solutions to only the ones that are feasible. Then you have only a few prototypes or micro-benchmarks to write.
- Availability and Reliability. Are you thinking about how things can fail, especially in a distributed environment? Do know how to design a system to cope with network failures? Do you understand durability?

## Basics

- [Video](https://www.youtube.com/watch?v=-W9F__D3oY4) 多看几遍
- [How we scale dropbox](https://www.youtube.com/watch?v=PE4gwstWhmc)
- Crack the interview

## Five Step

Step1: 先問所有requirement, spec 這個系統需要提供什麼功能
Step2: Constrains: 問他我們需要處理多少traffic, 多少data, latency重不重要 A和C選哪個  [A和C](http://ksat.me/a-plain-english-introduction-to-cap-theorem/) Consistent and Available

Step3: 計算需要多少機器 要用什麼storage
Step4: Abstract design: 先畫出大架構！ 每個會出現的component都要畫出來 再看面試官希望你深入講哪個component
Step5: Scale: 讓你的system有fault tolerance, scale成大公司的系統架構

**CAP theorem**: Its states that, when you are designing a distributed system you can get cannot achieve all three of Consistency, Availability and Partition tolerance. You can pick only two of:

- Consistency: You customers, once they have updated information with you, will always get the most updated information when they call subsequently. No matter how quickly they call back
- Availability: Remembrance Inc will always be available for calls until any one of you(you or your wife) report to work.
- Partition Tolerance: Remembrance Inc will work even if there is a communication loss between you and your wife!

有空的話Write through, write around, write back都要知道什麼意思 利弊)

這時候小system畫完了 如果要scale的話需要什麼東西 不外乎就是load balancer啦 DB就是可能要master-slave或是multi-master 這種東西

# Database

- https://lagunita.stanford.edu/courses/DB/2014/SelfPaced/about

# Crack the Interview


# 面经

- [面经1](https://www.jiuzhang.com/qa/766/)

## List of Important concepts

- General
   - [Scalability](https://www.wikiwand.com/en/Scalability)
   - [Amdahl's Law](https://www.wikiwand.com/en/Amdahl%27s_law)
- Database
   - [Sharding](https://www.wikiwand.com/en/Shard_(database_architecture)): rows are held separately.
     - sharding refers to splitting the very large database into smaller, faster and more manageable parts called data shards.
   - [Retional Database](https://www.wikiwand.com/en/Relational_database): relationship, and each row is identified by a unique key.
   - [Distributed Data Store](https://www.wikiwand.com/en/Distributed_data_store)
   - [Database Index](https://www.wikiwand.com/en/Database_index)
- Network
   - [Load Balancing](https://www.wikiwand.com/en/Load_balancing_(computing))
   - [Optimistic concurrency control](https://www.wikiwand.com/en/Optimistic_concurrency_control)
   - [Robot exclusion standard](https://www.wikiwand.com/en/Robots_exclusion_standard) 【需要阅读】
   - [HTTP persistent connection](https://www.wikiwand.com/en/HTTP_persistent_connection)【需要阅读】
   - [BOSH](https://www.wikiwand.com/en/BOSH_(protocol))【需要阅读】
- System
   - [Concurrency Control](https://www.wikiwand.com/en/Concurrency_control#/Concurrency_control_mechanisms)【需要阅读】
   - [Tracing Garbege Collection](https://www.wikiwand.com/en/Tracing_garbage_collection)【需要阅读】
   - [Garbage Collection](https://www.wikiwand.com/en/Garbage_collection_(computer_science))【需要阅读】
- Products
   - [Edge Rank @ Facebook](https://www.wikiwand.com/en/EdgeRank): stopped at 2011
   - [collaborative filtering](https://www.wikiwand.com/en/Collaborative_filtering)【需要阅读】

- Horizontal v.s. Vertical Scaling
   - Vertical: increasing the resources of a specific node.
   - Horizontal: increasing the number of nodes
- Load Balancer
   - Some prontend parts of a scalable website will be thrown behind a load balancer. This allows a system to distribute the load evenly so that one server doesn't crash and take down the whole system. (clone server)
- Database Denormalization & NoSQL
   - To prevent expense JOINs
   - Denormalization: adding redundant information into a database to speed up reads. (directly store additional / redudant information in database)
   - A NoSQL database does not support joins and might structure data in a different way
- Database Partitioning (Sharding)
   - Splitting the data across multiple machines while ensuring you have a way of figuring out which data is on which machine.
   - Vertical Partitioning: partitioning by feature (columns)
   - Key-Based (Hash-based) Partitioning: uses some part of the data (e.g. ID) to partition it.
   - Directory-Based Partitioning: maintain a lookup table for where the data can be found. (the lookup table itself can be a problem)
- Caching
   - In memory cache: key-value pairing, between application layer and data store
   - cache query-result pair, or specific object
- Asynchronous Processing & Queues
   - slow operations go asynchronously
   - pre-processing some data (render a page before request
- Network Metrics
   - Bandwidth: (bit/second): maximum amount of data that can be transfeered in a unit of time.
   - Throughput: the actual amount of data that is transferred.
   - Latency: how long it takes data to go from one end to the other. Delta-time between sender and receiver.
- MapReduce
   - A MapReduce program requires you to write a Map step and a Reduce step
   - **Map**: takes in some data and emits a `<key, value>` pair
   - **Reduce**: takes a key and a set of associated values and "reduces" them in some way, emitting a new key and value
   - Good for parallel.
- Replication: frequently copying the data across multiple machines.
   - Post replication, multiple copies of the data exists across machines.
   - Help to handle failure
- Consistency: consistency implies that the data is same across the cluster, so you can read or write to/from any node and get the same data.
   - Eventual consistency:  an eventual consistent model implies that all machines will have the same data eventually. Its possible that at a given instance, those machines have different versions of the same data ( temporarily inconsistent ) but they will eventually reach a state where they have the same data.
- Availability: the ability to always respond to queries ( read or write ) irrespective of nodes going down.
- Partition Tolerance:  
   - In the context of a database cluster, cluster continues to function even if there is a “partition” (communications break) between two nodes (both nodes are up, but can’t communicate).

Database replication
Database partitioning
RESTful API

### System Design 概念
Distributed Hash Table
Eventual Consistency vs Strong Consistency
Read Heavy vs Write Heavy
Consistent Hashing
Sticky Sessions
Structured Data(uses DynamoDB) vs Unstructured Data(uses S3)http://smartdatacollective.com/michelenemschoff/206391/quick-guide-structured-and-unstructured-data http://stackoverflow.com/questions/18678315/amazon-s3-or-dynamodb


### Scalability

Web hosts:

sftp: secure -- data encrypted, user & password encrypted

VPSes(your own copy) -- shared webhost (AWS)

#### Vertical Scaling: More resources (real world constrains)

- CPU (multiple CPUs | scheduling, multiple threads)
- DISK (SATA drive, SAS drive, SSD)
- RAM
- More resources

#### Horizontal Scaling
- Data Center
- Use multiple servers
- Load Balancing (traffic distributed to backend servers)
    - Return IPs of load balancer -- let the load balancer figure out
    - public / private IP addresses
    - Load balancer decide where to send based on (1) load (2) performance
    - redundancy and distribute different resources among the datacenter
    - Round (BIND): cycular the IP addresses:
        - some server may meet some power users than other servers (循环的话，某个很挤的server会更挤)
        - Caching responses -- also result in disproportional crowding effect
- RAID (Redundant Asscess Independent Disk): reduce the downtime
    - RAID 0 (two identical hard drives: performance)
    - RAID 1 (two identical hard drives: write twice, identical hard drive)
    - RAID 5 (five drives, only 1 is used for redundancy)
    - RAID 6 (any two drive can die but still recoverable)
    - RAID 10 (RAID 0 and RAID 1)
- Sticky Sessions: shared storage / cookies
    - fire channel, mySQL
    - sync storage session
    - cookies: multiple visit in the same session object -- cookie saves session information
- Load Balances:
    - Software: ELB, HAProxy
    - Hardware: Barracuda, Cisco (Expensive)
#### PhP
- Code optimiaztion
- Php accelerators
#### Caching
- .html (file-based caching: craiglist generate html, and do not need to re-generate it -- space problem, more disk spaces | cannot update assets)
- mySQL Query Cache
- memcached: memory cache, stores whatever you want in RAM (store key-value pair in cache)
- could be bad if the page has been updated
#### Replication:
- Master-Slave Database structure (Topology)
    - master copy to slaves (multiple slaves)
    - distribute queries to different slaves -- good for read-heavy
    - but have a single-point of writing
- Master-Master structure
    - multiple masters
- Load balancer + Replication
    - Multi-tier structure
    - active-active mode / active-passive: heart-beat communication


## System Design Course from Hiredintech

- [Hired in Tech](https://www.hiredintech.com/courses/system-design)

### Common problems

Candidates either:

1. Approach questions in a chaotic way and get ratholed, or
2. Lack solid understanding of how to properly design architectures that scale.

### Some quantity

- Tweet per day: 500 Million
- Tweet per month: ~15 Billion
- Facebook user: ~1.3 Billion


### Processes

- Scope the problem: Don't make assumptions; Ask questions; Understand the constraints and use cases.
- Sketch up an abstract design that illustrates the basic components of the system and the relationships between them.
- Think about the bottlenecks these components face when the system scales.
- Address these bottlenecks by using the fundamentals principles of scalable system design.

#### Step 1: Constraints and use cases

> Define the time and space scope

   1. User Number
   2. Server load
   3. Use Cases **functionality**: 1) Shortening; 2) Redirection; 3) Custom url; 4) Analytics; 5) Automatic link expiration; 6) Manual link removal; 7) UI v.s. API; 8) Availability; 9) Consistency
   4. Do the math and quantify some metrics (time, space)
      - Data per second, hour, day, month
      - Data storage
      - Write per second
      - Read per second
   5. Understand the weight of each components
- Spend a few minutes questioning your interviewer and agreeing on the scope of the system.
- Never assume things that were not explicitly stated.

#### Step 2: Abstract Design

> outlining a high-level abstract design

1. You can tell the interviewer that you would like to do that and draw a simple diagram of your ideas.
   - Sketch components
   - Draw connections
   - Use well-known techniques
2. Layers
   - Application service layer (serves the requests)
      - Shortening service
      - Redirection service
   - Data Storage layer (keeps track of the hash ==> url mapping)
      - Database (big hash table)
   - Hashing algorithm: `hashed_url = converted_to_base62(md5(original_url+random_salt))[:6]`

#### Step 3: Understanding Bottlenecks

> Make the system scalable

1. **Traffic**: Perhaps your system needs a load balancer and many machines behind it to handle the user requests.
2. **Data**: maybe the data is so huge that you need to distribute your database on multiple machines.

#### Step 4: Scaling your abstract design

### Scalability

- [Harvard Course](https://youtu.be/-W9F__D3oY4) **SEE ABOVE**
- Scalability for Dummies:
  - [Part 1](http://www.lecloud.net/post/7295452622/scalability-for-dummies-part-1-clones):
  - [Part 2](http://www.lecloud.net/post/7994751381/scalability-for-dummies-part-2-database)
  - [Part 3](http://www.lecloud.net/post/9246290032/scalability-for-dummies-part-3-cache)
  - [Part 4](http://www.lecloud.net/post/9699762917/scalability-for-dummies-part-4-asynchronism)
- [database design: sharding](http://highscalability.com/blog/2009/8/6/an-unorthodox-approach-to-database-design-the-coming-of-the.html)
  - [Pros and Cons for sharding](http://www.25hoursaday.com/weblog/2009/01/16/BuildingScalableDatabasesProsAndConsOfVariousDatabaseShardingSchemes.aspx)
- [High Scalability Blog](http://highscalability.com/)【需要阅读】

### Stay up to date

Scalable design

1. Application Service layer
  - Start with one machine, measure how far it takes us (load tests)
  - Add a load balancer + a cluser of machines over time: to deal with spike-y traffice, to increase availability
2. Data Storage layer
  - NoSQL storage
  - Relational database (Data Schema)
    - MySQL: widely used, matured, master/slave replication, sharding; used by Facebook, Twitter, Google. Index lookups are very fast
    - mappings
    - Create a unique index on the hash (36G) + hold in memory (speed up lookups)
    - 1) Vertical scaling of the MySQL machine
    - 2) Partition the data: 5 partitions, 600GB data, 8GB of indexes (first characters mod #partitions)
    - Master/Slave: read from slaves, writes to the master
3. Asynchronous Processing:
  - [Part 1](http://blog.codepath.com/2012/11/15/asynchronous-processing-in-web-applications-part-1-a-database-is-not-a-queue/)
  - [Part 2](http://blog.codepath.com/2013/01/06/asynchronous-processing-in-web-applications-part-2-developers-need-to-understand-message-queues/)
4. Message queueing [Info](https://www.cloudamqp.com/blog/2014-12-03-what-is-message-queuing.html)【需要阅读】
  - RabbitMQ: [Tutorial](https://www.rabbitmq.com/getstarted.html)
### Examples

- [Twitter](https://www.hiredintech.com/classrooms/system-design/lesson/67)
- [Summary](https://www.hiredintech.com/classrooms/system-design/lesson/101)


### Scalability for dummy

**Part 1**: [Single out application]

1. Public servers of a scalable web service are hidden behind a load balancer.  This load balancer evenly distributes load (requests from your users) onto your group/cluster of  application servers.
2. every server contains exactly the same codebase and does not store any user-related data, like sessions or profile pictures, on local disc or memory.
3. Session: database/caching (redis): Sessions need to be stored in a centralized data store which is accessible to all your application servers. It can be an external database or an external persistent cache, like Redis.
4. Code: Synchronizing code with Capistrano
5. image files of server - CLONE: AMI(amazon machine image)

**Part 2**: [Database]

1. MySQL:
  - master(write)-slave(read) replication; master + RAM, RAM, RAM; Sharding
2. denormalize from the beginning, exclude JOIN. maybe NoSQL
  - Join done in application code

**Part 3**: [Caching]

1. With “cache” I always mean **in-memory caches** like Memcached or Redis. Please never do file-based caching, it makes cloning and auto-scaling of your servers just a pain.
2. A cache is a simple *key-value store* and it should reside as a **buffering layer** between your application and your data storage.
3. Cache Database Queries: Query-Result pair
  - Expiration issue: hard to delete a cached result when cache a complex query
  - data changes, requires to delete cache
4. Cache Objects: Let your class assemble a dataset from your database and then store the complete instance of the class or the assembed dataset in the cache.
5. What to cache:
  - User sessions (never database)
  - fully rendered blog articles
  - activity streams
  - user-friend relationship

**Part 4**: [Acynchronism]

1. Method 1: do time-consuming work in advance and serving the finished work with a low request time.
  - turn dynamic content into static content
2. Method 2: handle tasks asynchronously
  - A user comes to your website and starts a very computing intensive task which would take several minutes to finish.
  - Frontend sends a job onto a job queue and immediately signals back to the user: your job is in work, please continue to the browse the page.
  - The job queue is constantly checked by a bunch of workers for new jobs.
  - If there is a new job then the worker does the job and after some minutes sends a signal that the job was done.
  - The frontend, which constantly checks for new “job is done” - signals, sees that the job was done and informs the user about it.
  - Message Queue: **RabbitMQ**

### Asynchronizing
  - [Part 1](http://blog.codepath.com/2012/11/15/asynchronous-processing-in-web-applications-part-1-a-database-is-not-a-queue/)
  - [Part 2](http://blog.codepath.com/2013/01/06/asynchronous-processing-in-web-applications-part-2-developers-need-to-understand-message-queues/)【需要再度】

In these cases when we have a task that needs to execute but that is not a candidate for synchronous processing, the best course of action is to move the execution outside the request/response cycle. Specifically, we can have the synchronous web app simply notify another separate program that certain processing needs to be done at a later time.

1. Client -> Application: request and response
2. Application -> instruction and asynchronous processors


In order to achieve asynchronous processing, we need a way to allow multiple separate processes to pass information to one another. One naive approach might be to persist these notifications into a traditional database and then retrieve them for processing using another service.


**DON'T Use Database**
There are two aspects to any asynchronous processing:
1. the service(s) that **creates** processing tasks and
2. the service(s) that **consume** and process these tasks accordingly.

Polling the database for processing has several downsides. You might have a short interval for polling and be hammering your database with constant queries. Alternatively, you could perhaps set a long interval in which case there will be many unnecessary processing delays.

Polling requires very fast and frequent queries to the table to be most effective, which adds a significant load to the database even at a medium volume.

**DO Use Message Queue**

With a message queue, we can efficiently support a significantly higher volume of concurrent messages, messages are pushed in real-time instead of periodically polled, messages are automatically cleaned up after being received and we don’t need to worry about any pesky deadlocks or race conditions

> At the simplest level, a message queue is a way for applications and discrete components to send messages between one another in order to reliably communicate.

Message queues are typically (but not always) ‘brokers’ that facilitate message passing by providing a protocol or interface which other services can access. This interface connects **producers**(client application, e.g. Rails) which create messages and the consumers(deamon processes, e.g. rake task) which then process them.


### Processes (From CCI)

1. Scope the problem: you want to understand what exactly you need to implement (features)
  - discuss and list all features
2. Make Reasonable Assumptions
  - Talk to your interviewer about these sorts of assumptions
3. Draw the Major Components
  - Draw a diagram (frontend server(s), backend data store, other independent servers or process analytics)
4. Identify the key Issues
  - Find the bottleneck
5. ReDesign for the key-issue
  - Update your diagram as your design changes
  - Be open about any limitations in your design

If only need to talk about scalability

1. Ask questions - to understand the problem
2. Make Believe - pretend that the data can all fit on one machine, what would be the solution
3. Get Real - how to logically divide the data up, how one machine would identify where to look up different data
4. Solve the problem

### Considerations

1. Failure: Any part can fail: Plan for many of all of these failures
2. Availability & Reliability:
  - Availability: a function of the percentage of time the system is operational
  - Reliability: a function of the probability that the system is operational for a certain unit of time.
3. Read-heavy v.s. Write-heavy:
  - write-heavy: queuing up the writes (possible failure)
  - read-heavy: caching
4. Security: what may be the security problems.

### Palentir 【需要查找

- Concurrency. Do you understand threads, deadlock, and starvation? Do you know how to parallelize algorithms? Do you understand consistency and coherence?
- Networking. Do you roughly understand IPC and TCP/IP? Do you know the difference between throughput and latency, and when each is the relevant factor?
- Abstraction. You should understand the systems you’re building upon. Do you know roughly how an OS, file system, and database work? Do you know about the various levels of caching in a modern OS?
- Real-World Performance. You should be familiar with the speed of everything your computer can do, including the relative performance of RAM, disk, SSD and your network.
- Estimation. Estimation, especially in the form of a back-of-the-envelope calculation, is important because it helps you narrow down the list of possible solutions to only the ones that are feasible. Then you have only a few prototypes or micro-benchmarks to write.
- Availability and Reliability. Are you thinking about how things can fail, especially in a distributed environment? Do know how to design a system to cope with network failures? Do you understand durability?

### Processes from InterviewBit

1. Feature expectations ( First 2 mins ) : 思考和寻找哪些是需要的feature
  - As said earlier, there is no wrong design. There are just good and bad designs and the same solution can be a good design for one use case and a bad design for the other. It is extremely important hence to get a very clear understanding of whats the requirement for the question.
2. Estimations ( 2-5 mins )
  - Next step is usually to estimate the scale required for the system. The goal of this step is to understand the level of sharding required ( if any ) and to zero down on the design goals for the system.
  - For example, if the total data required for the system fits on a single machine, we might not need to go into sharding and the complications that go with a distributed system design.
  - OR if the most frequently used data fits on a single machine, in which case caching could be done on a single machine.
3. Design Goals ( 1 mins )
  - Latency, Consistency, Availability
  - Figure out what are the most important goals for the system. It is possible that there are systems which are latency systems in which case a solution that does not account for it, might lead to bad design.
4. Skeleton of the design ( 4 - 5 mins )
  - 30-40 mins is not enough time to discuss every single component in detail. As such, a good strategy is to discuss a very high level with the interviewer and go into a deep dive of components as enquired by the interviewer.
5. Deep dive ( 20-30 mins )
  - This is an extension of the previous section.
