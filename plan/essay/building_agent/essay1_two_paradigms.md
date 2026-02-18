# Essay 1: Two Paradigms of Agent Building

## Status
Brainstorming

## Target
~2000 words (8-10 min read)

## Audience
Agent developers, or people planning to develop AI agents

---

## Brainstorming

### The Two Paradigms

**Paradigm 1: The Cognition-Less Robot (RL Tradition)**

The agent is a system that must learn or be programmed to behave intelligently. Intelligence is something you BUILD INTO the agent.

Historical lineage:
- Classic RL: Markov Decision Process, agent-environment loop
  - State → Agent → Action → Environment → Reward → State...
  - Agent's job: learn a policy π(s) → a that maximizes reward
- Deep RL: Neural networks as function approximators (DQN, A3C, PPO)
  - The "brain" is a trained neural network
  - Still: intelligence must be trained into the agent
- OpenAI Gym (2016): Standardized interface for agent-environment interaction
  - `env.reset()`, `env.step(action)`, `observation, reward, done, info`
  - The agent is a black box that receives observations and outputs actions
- Self-driving cars: Perception → Planning → Control pipeline
  - Multiple modules: object detection, path planning, motion control
  - The "intelligence" is distributed across engineered subsystems

**Key characteristic:** The agent's internal architecture determines its capabilities. If you want smarter behavior, you must build better internals (better perception, better planning, better policy).

**Direction:** Outward — the agent acts ON the environment

---

**Paradigm 2: The Cognition-Equipped Collaborator (LLM-Native)**

The agent already has intelligence (the LLM). The engineering challenge is getting the right information INTO the model's context.

Key developments:
- LLMs as general-purpose reasoners (GPT-3, GPT-4, Claude)
  - The model already "knows how to think"
  - No training required for new tasks—just prompting
- Tool use / function calling
  - The model decides when to use tools
  - Tools bring external information INTO context
- ReAct (2022): Interleaved reasoning and acting
  - Reasoning traces + actions in the same context
  - The "intelligence" is in how context is populated
- Context engineering (2024-2025)
  - The 4 patterns: Write, Select, Compress, Isolate
  - "Most agent failures are context failures, not model failures"

**Key characteristic:** The agent's internal architecture can be simple. Capabilities depend on what's in the context window, not what's in the agent's code.

**Direction:** Inward — bring the environment INTO the agent's context

---

### The Shift in Mental Model

| Aspect | RL Tradition | LLM-Native |
|--------|--------------|------------|
| Where intelligence lives | In agent architecture (trained/engineered) | In the LLM (pre-trained) |
| Primary engineering challenge | Build better internals | Curate better context |
| Agent complexity | High (multiple components) | Can be low (thin wrapper) |
| Adaptability | Requires retraining/redesign | Just change the prompt/context |
| Direction of effort | Agent → Environment (outward) | Environment → Context (inward) |

---

### Why This Matters

1. **Architecture choices follow mental models**
   - If you think "agent needs intelligence," you build complex internals
   - If you think "LLM has intelligence," you focus on context engineering

2. **Over-engineering trap**
   - Early LLM agents (AutoGPT, BabyAGI) imported RL mental models
   - Added memory systems, planning modules, task queues
   - Much of this complexity was unnecessary—or got obsoleted by better models
   - Example: AutoGPT removed vector DB memory by late 2023

3. **The convergence**
   - Even RL-influenced approaches now emphasize context
   - Anthropic's guidance: "Find the simplest solution possible"
   - The LLM IS the planning system—you don't need to build one around it

4. **Implications for practitioners**
   - Don't fight the model's intelligence
   - Invest in context engineering over architecture engineering
   - Expect complexity in agent internals to get obsoleted by model improvements

---

### Core Claims (Candidate Theses)

**A. Descriptive:** "The dominant mental model for agents has shifted from 'build intelligent internals' to 'engineer rich context.'"

**B. Prescriptive (bold):** "Keep agent internals simple; complexity should live in context, not architecture."

**C. Historical:** "The LLM gives agents cognition for free—this changes everything about how we should build them."

---

### Open Questions

1. What is the right definition of "agent" to open with?
2. How much RL history is needed? (Enough to understand the paradigm, not a survey)
3. Should we name specific systems (AutoGPT, BabyAGI) as cautionary tales, or keep abstract?
4. How to handle the nuance that some complexity IS needed? (Not "never add complexity" but "add only when demonstrably needed")

---

## Essay Structure Outline

### Option A: Historical Narrative

1. **Open with definition:** What is an agent? (the action-selection loop)
2. **The old paradigm:** Where agents came from (RL, Gym, self-driving)
   - Key insight: intelligence must be built into the agent
3. **The LLM changes everything:** Cognition comes pre-installed
   - The shift in engineering challenge
4. **The new paradigm:** Context engineering
   - ReAct, tool use, the 4 patterns
5. **The convergence:** Why over-engineered agents got obsoleted
   - AutoGPT example (optional: in details section?)
6. **Implications for practitioners:** What this means for how you build

---

### Option B: Problem-Solution

1. **Open with a problem:** Why do some agents feel over-engineered?
2. **Diagnosis:** They're using the wrong mental model
3. **The two paradigms:** Cognition-less vs cognition-equipped
4. **The right model for LLM agents:** Context engineering
5. **Evidence:** What works vs what got obsoleted
6. **Prescription:** Keep internals simple, invest in context

---

### Option C: Thesis-First

1. **Open with thesis:** The mental model for agents has shifted. Here's why it matters.
2. **The old paradigm:** RL tradition, build intelligent internals
3. **The new paradigm:** LLM-native, engineer rich context
4. **Why the shift happened:** LLMs provide cognition
5. **What this means for you:** Practical implications

---

## Lede Candidates

### Lede A: Definition + Shift
> What is an agent? At its core, an agent is a system that observes its environment, decides what to do, and acts. This loop—observe, decide, act—has been the foundation of agent research for decades, from classic reinforcement learning to self-driving cars.
>
> But the arrival of large language models has changed something fundamental about this loop. The "decide" part—the intelligence—used to be the hard problem. Now it comes pre-installed.

### Lede B: Two Questions
> When building an AI agent, there are two very different questions you might ask:
>
> 1. How do I make this agent smarter?
> 2. How do I give this agent the right information?
>
> The first question comes from the reinforcement learning tradition. The second comes from the LLM era. Which question you ask shapes everything about how you build.

### Lede C: The Over-Engineering Trap
> In 2023, a wave of ambitious agent projects—AutoGPT, BabyAGI, and their many descendants—promised autonomous AI that could plan, remember, and execute complex tasks. Many of these projects added sophisticated memory systems, planning modules, and task queues. Most of this complexity turned out to be unnecessary.
>
> What went wrong? These projects were built on a mental model from the pre-LLM era—one where agent intelligence had to be engineered from scratch. But LLMs change the equation.

### Lede D: Cognition-Less to Cognition-Equipped
> For decades, building an agent meant building a brain. In reinforcement learning, you trained neural networks to make decisions. In robotics, you engineered perception and planning pipelines. The agent was a cognition-less system, and your job was to give it cognition.
>
> LLMs invert this. The cognition is already there. Your job is no longer to build a brain—it's to give the brain the right information.

---

## Extra Details (Expandable Content)

These sections could be collapsed/expandable in the UI, or linked as "deep dives":

### Detail 1: RL History Primer
- Markov Decision Processes
- The agent-environment interface (state, action, reward)
- Deep RL milestones (DQN, AlphaGo, etc.)
- Why this created the "build intelligent internals" mental model

### Detail 2: The AutoGPT Story
- What it promised (autonomous goal completion)
- The architecture (memory, planning, execution loops)
- What happened (vector DB removed, complexity didn't help)
- Lessons learned

### Detail 3: Context Engineering Deep Dive
- The 4 patterns in detail (Write, Select, Compress, Isolate)
- Concrete examples of each
- (Note: This might be Essay 2 territory—link forward?)

### Detail 4: Self-Driving as Case Study
- Perception → Planning → Control pipeline
- Why this architecture made sense for vision + control
- Why it's the wrong model for LLM agents
- (The modular "brain" vs the integrated LLM)

---

## References to Incorporate

### RL Tradition
- [x] Sutton & Barto: "Reinforcement Learning: An Introduction" — defines agent as "interactive, goal-seeking... can sense aspects of their environments, and can choose actions to influence their environments"
- [x] OpenAI Gym (2016): arxiv:1606.01540 — standardized agent-environment interface: `reset()`, `step(action)` → `(observation, reward, done, info)`
- [x] MDP framework: Agent-environment loop at discrete time steps, agent observes state, produces action, gets reward, transitions
- [ ] Deep RL milestones (DQN paper, AlphaGo, etc.)
- [ ] Self-driving architecture papers (perception → planning → control)

### LLM-Native Paradigm
- [x] ReAct paper (arxiv:2210.03629)
- [x] Anthropic: Building Effective Agents
- [x] Lilian Weng: LLM Powered Autonomous Agents
- [x] Context engineering articles (Anthropic, LangChain, Lance Martin)

### Cautionary Tales
- [x] AutoGPT/BabyAGI retrospectives
- [ ] Specific examples of removed complexity

---

## Next Steps

1. [ ] Choose essay structure (A, B, or C)
2. [ ] Choose or refine lede
3. [ ] Decide which "extra details" to include vs. link forward
4. [ ] Research more concrete RL tradition examples
5. [ ] Draft opening section
