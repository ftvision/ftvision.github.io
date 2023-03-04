---
date: 2019-02-21
title:  Invent More, Toil Less
year: 2016
tags: [CompSci, SYSADMIN, SRE]
categories:
- White Paper
---
> Beyer, Gleason, O'Connor, Rau (2016), [Invent More, Toil Less](https://www.usenix.org/system/files/login/articles/login_fall16_08_beyer.pdf) in *;login:(41:3)* at USENIX.

{{< box-highlight type="info">}}
the Google SRE team identifies **toils** in running production services and talks about their experiences in how to reduce these toils. A case example the from BigTable SRE team illustrated an incremental process that involved both management and tech teams to reduce toils effectively. 
{{< /box-highlight>}}

### Key Concept: **toil**

*Toil* is the kind of work tied to running a production service that tends to be: **Manual, Repetitive, Automatable and not requiring human judgment, Interrupt-driven and reactive, and Of no enduring value**.

As reported by SREs at Google, our top three sources of toil (in descending order) are:
- Interrupts (non-urgent service-related messages and emails)
- On-call (urgent) responses
- Releases and pushes

### Roles

*Software engineering*
: Involves writing or modifying code, in addition to any associated design and documentation work. Examples include writing automation scripts, creating tools or frameworks, adding service features for scalability and reliability, or modifying infrastructure code to make it more robust

*Systems engineering*
: Involves configuring production systems, modifying configurations, or documenting systems in a way that produces lasting improvements from a one-time effort.

### Case Study: BigTable SRE

#### Problem

Increasing paging load on the SRE team and lots of BigTable and Colossus requests:

1. Increases and decreases in quota
2. Turnups and turndowns of Bigtable footprints
3. Turnups and turndowns of datacenters

#### Solution

**pre-work**

1. *managerial support*: The team, supported by management, decided that it was important (and ultimately better for Bigtable users) to respect their colleagues and themselves by pushing back on complex customer requests, performance investigations for customers who were within Bigtable’s promised SLO, and other routine work that yielded nominal value.
2. *organizational adjustment:* they decided to split the team into two shards: one focused on Bigtable, and one focused on Colossus. This split had two advantages: it allowed engineers to specialize technically on a single product, and it allowed the leads of each shard to focus on improving the operational state of a single service.

**Incremental Progress**

1. Bigtable SRE first focused on fully automating the various footprint- and quota-related requests
2. Next, the team focused on wrapping automation into self-service tools.

**Makes progress easily visible**: increasing buy-in from external stakeholders and leadership.

#### Result

by 2014, the team was in a much improved place operationally—they reduced user requests from a peak of more than 2200 requests per quarter in early 2013 to fewer than 400 requests per quarter.
