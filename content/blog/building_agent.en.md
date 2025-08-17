---
title: Building LLM Agent (1)
date: 2025-08-03
categories:
  - AI
tags:
  - Agent
  - Product
---

In the past 18 months, I have worked on building various kinds of "LLM Agents", ranging from complicated internal structures that mimics research from cognitive psychology and neurosciences, to simpler ones.

There are two angles to think about the LLM Agent:

- One is to start with the Agent, then bring the LLM into it,
- Another is to start with the LLM, then bring the agent into it.

**Agent, empowered by LLM**

The concept of `agent` has a long existed before the LLM came to being. Most famously, the reinforcement learning has a thinking framework about what is an agent and how agents interact with the environment, like the figure below

{{< mermaid >}}
graph LR
A[Agent] -->|Action| E[Environment]
E -->|Observation + Reward| A
{{< /mermaid >}}

Simply put, there is a agent-environment loop, where agent would exert action to affect the environment, and the environment, after affected by the agent, would produce a set of observations and rewards, feeding back to the agent. The agent then would take the new observations and reward to decide or to learn future actions towards the environment.

In the LLM era, a natural way that people thinks about it is to make the agent more "intelligent" by equiping the agent with LLM. Some natural starting points include

- use LLM to select the action among action space, so that it can be the best to affect the environment
- use LLM to process the observation so that the agent can "understand" the environment better
- use LLM to do the planning to bridge the gap between understanding the environment and selecting the right action to affect the environment.

This is largely how we were thinking about building the agent when we work on our [Minecraft co-player]() and the [Project Sid](). Of course, there are more, such as how to include the personality to make each agent behave differently, how to add memory system so that each agent would be able to remember the past experiences, and so on and so forth.

**LLM, empowered by becoming an agent**

Starting late 2024 and early 2025, more and more people are building LLM agent starting from idea of making LLM more powerful, actionable.

## Context Engineering

## Building the Environment for LLM

## Human, Agent, Computer interfaces.
