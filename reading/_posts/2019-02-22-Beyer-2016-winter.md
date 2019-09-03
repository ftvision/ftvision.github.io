---
layout: paper-reading
date: 2019-02-22
title:  Interrupt Reduction Projects
authors: [Beyer, Tobin, Fong-Jones]
year: 2016
tags: [CompSci, SYSADMIN, SRE]
publication: ";login:"
citation: <a href="https://www.usenix.org/system/files/login/articles/login_winter16_11_beyer.pdf"> Interrupt Reduction Projects </a> in <em>;login:(41:4)</em> at USENIX.
outline: Interrupt Reduction ...
---

Teams that write and maintain software much decide how to allocate people's time between:
- On-call/pager response: Immediate response to outages
    - critical to the immediate health of the service, and requires a response with an urgency of minutes.
    - time-sensitive mitigation with in-depth investigation
    - changes to prevent recurrence
- Tickets and interrupts: Medium-urgency production issues and customer issues
    - have an urgency of days to weeks and usually take between minutes and hours to resolve
    - use BUG or ticket-tracking tools
- Project work: Proactive development and systems/network engineering work
    - have an urgency ranging from weeks to the long backlog of wishlist ideas every
team maintains
    - This type of work requires multiple days of sustained concentration in order
to facilitate cognitive flow state

*toil*: pager response & tickets/interrupts

*context: google's SRE team setup*

We assign a primary and secondary on-call in each site, with each site handling 12 hours per day. The primary on-call typically handles most pages

## initial approach

**naive approach**
Originally, many teams at Google approached tickets by assigning a primary on-call to handle pager duty, while round-robin
assigning tickets across the team. This setup frequently led to
undesirable outcomes, as engineers couldn’t successfully undertake project work and ticket duty simultaneousl

Some teams moved in the direction of centralization by assigning tickets to the expert with specialized knowledge or recent
experience with a given component. However, this strategy
resulted in uneven load and still disrupted people’s attention,

**centralizing tickets**

Once we articulated the need to preserve cognitive flow state [3],
a better strategy became clear: we needed to staff a dedicated
ticket rotation

Most SRE teams naïvely implemented this strategy by tasking
the secondary on-caller at each site with a somewhat vague and
meandering directive:

◆ Work on tickets until the queue is empty, filing bugs for small
improvements as you see ways to improve how specific tickets
are handled, or to eliminate them entirely.
◆ See if you can find commonalities in the tickets you just solved,
and do some proactive project-like work to prevent future
tickets

## A better Alternatives

We realized that while we initially focused on centralization and
fairness/symmetry as a goal, we instead should have focused
on maximizing cognitive flow state as a goal in and of itself.  We still tasked team members with identifying and solving commonalities in reactive/
interrupt-driven work. However, we now explicitly allocated this
job, which we’ll refer to as “interrupt reduction project on duty,”
as a separate role from ticket work

Furthermore, assigning one dedicated person to ticket duty at a
time ensures accountability for tickets

In this new model, we rotate the ticket duty and interrupt
reduction project roles between sites once per quarter. In order
to ensure fairness, we rotate people into the ticketeer or interrupt reduction rotation according to on-call rotations (e.g., on a
weekly basis).

## implementation: interrupt reduction projects

Project Ideas
Project ideas for the interrupt reduction project on duty come
from two main sources:
◆ Current/past ticket handlers who file annoyances into a bug
hotlist as they resolve tickets
◆ Technical Leads (TLs) who have a high-level view of the service

Project Assignment and Handoff

= TL or someone with an overall
view of the service should sort the project list by impact. In the
interest of preserving autonomy among team members, we don’t
suggest assigning projects
= let people choose from top 10 projects

Handling Excess Ticket Load

If your team has more tickets than one person can handle, you
have two options for dealing with the excess load:
◆ Task the interrupt reduction project on duty with tickets for
one day per week.
◆ Decide to relax ticket response expectations for a period of
time, until the work pays of

## Case Study: Ticket Funnel

The number of tickets opened per week
had increased by roughly 50% over the previous year, from 20+
to 30+

Building a simple ticket funnel system
to guide customers to appropriate automation or documentation
was a natural choice for our first interrupt reduction project

, customers now work through
a simple Web interface where they traverse a decision tree. Nonleaf nodes in the tree are represented as a list of questions linking
to child nodes, and leaf nodes do one of the following:


◆ Link to the relevant self-service automation or documentation.
◆ Provide a form that generates a customer ticket.
- keep updating decision tree

Although we’d been talking about undertaking this project for
two years, it ended up only taking about two weeks of work

Once our solution was in place, it took a bit of time to reeducate
customers, who fully embraced the ticket funnel once they discovered its utility
*result:*

◆ Figure 4 shows that the ticket creation rate dropped by roughly
half after we implemented the ticket funnel, from 30+ to 15+
per week. While we’ll never completely eliminate tickets, the
overall trend has most definitely reversed.
◆ Quarterly customer satisfaction surveys reveal an overall happier customer base.
◆ Anecdotally, we see far fewer tickets that can be resolved by
pointing customers at automation or documentation.


## Applying this strategy in your organization

Figure out a strategy

- How much time does your team have to work on interrupt
reduction projects?
    ◆ How much time do you allocate to tickets each week? e.g.,
1 person? 4 people?
◆ How much time do you actually spend working on tickets each
week? e.g., 1 person? 2.5 people?

-- Spend less time on large projects.
-- Spend less time on tickets.

 so make sure to clearly communicate the motivations
for your actions, expected disruptions, timeline, and expected
benefits

- Who will work on the interrupt reduction projects?
Make interrupt reduction projects part of the normal ticket duty
rotation, which we assume is fairly scheduled and distributed.

 It’s important that the work be seen as valuable
by the team. Choose people who are enthusiastic or particularly
productive in order to create a good initial impression.

- How will you convince your team to adopt this approach?

◆ Each team member will spend 50% less time on tickets.
◆ Completing a small interrupt reduction project quickly and
seeing immediate impact creates a good deal of satisfaction.
◆ Interrupt reduction projects will improve the systems your
team uses on a daily basis.
◆ Eventually, your ticket load will decrease. The remaining
tickets will be issues that actually merit investigation, and
improvements to tooling will make some tickets easier to deal
with than they were previously

- How will you safeguard the time allocated for interrupt
reduction projects?

Therefore, creating
accountability around interrupt reduction projects is important.
You might accomplish this by publishing objectives around
these projects, reporting on them regularly, tracking them,
or announcing interrupt reduction project velocity in regular
reports.

## Suggested Interrupt Reduction Project

- Identify the Sources of Your Toil: use metadata (cause, impact, time to fix, etc) to tickets to help determine recurring issues and your biggests time sinks
- Improve Your Documentation0s: It’s much easier to handle a ticket if the process is documented, and documentation is a good first step towards automating a process: if customers can find and use good documentations, they won't need to open a ticket (provide a template (customer facing, internal procedures, etc) to make getting started easier)
- Pick the 10 Most Annoying Small Bugs and Fix Them: creating lists of bugs for the rough edges, shortcomings, and difficulties encountered in the course of everyday work—otherwise those problems will never be fixed.  Consider choosing bugs related to one or two systems,  rather than scattered small improvements, and common to customers, so that progress is significant and noticeable.

## Take away

implement some type of stratagy to proactively reduce tickets --> to control to number of tickets.
ensure that handling tickets doesn't constantly disrupt the cognitive flow state of your engineers.

recommended components:
- Centralize your ticket load, either onto engineers who are
already expecting interruptions (e.g., primary or secondary oncall) or to a dedicated ticket duty rotation.
◆ Track ideas for small interrupt reduction projects that will
reduce toil.
◆ Put a framework in place that reserves time for small (20–30
hours) proactive projects.
◆ Treat tickets and small proactive interrupt reduction projects
as separate rotations, distributed among team members and
sites on a regular basis.
