# Building AI Agents: Essay Series Plan

A series of essays reflecting on LLM-based agent development, from conceptual foundations to human implications.

## Series Thesis

The shift from traditional RL-style agents to LLM-based agents represents not just a technical change, but a fundamental reorientation: from engineering intelligent internal systems that act outward, to engineering contexts that bring the external world inward. This reorientation has profound implications for how agents work, how we build them, and how humans collaborate with them.

---

## Essay Structure

### Foundation Layer

#### Essay 1: Two Paradigms of Agent Building
**Status:** To brainstorm
**Core thesis:** There are two mental models for building agents—the RL tradition (outward: planning systems that act on environments) and the LLM-era approach (inward: context engineering that brings environments into the model). These were competing; now converging. The empirical evidence suggests: keep agent internals simple, let the LLM handle complexity.

**Opens with:** What is an agent? (Establish working definition before diving into paradigms)

**Key tensions to explore:**
- Outward direction: equip agent "brain" with planning components (like autonomous vehicles)
- Inward direction: build tools/retrieval to populate context (context engineering)
- Why overcomplicating agent internals gets obsoleted by next LLM release
- The convergence: even RL-influenced approaches now emphasize context

**References to incorporate:**
- Anthropic's guidance on avoiding "overly brittle hardcoded logic"
- The "Goldilocks zone" principle
- Historical examples of over-engineered agent architectures

---

### Mechanics Layer

#### Essay 2: Context Engineering—The New Core Skill
**Status:** To brainstorm
**Core thesis:** Context engineering is the practice of curating and maintaining the optimal set of tokens during LLM inference. It is now the primary engineering challenge for agent builders. "Most agent failures are context failures, not model failures."

**Key concepts to cover:**
- The 4 patterns: Write, Select, Compress, Isolate
- Context as finite resource with diminishing returns
- Karpathy's analogy: LLM = CPU, context window = RAM
- Just-in-time retrieval vs. upfront loading
- Sub-agent architectures for context isolation

**References:**
- Anthropic: "Effective Context Engineering for AI Agents"
- LangChain: "Context Engineering for Agents" (Lance Martin)
- The ACE framework (arxiv:2510.04618)

---

#### Essay 3: Context as Program
**Status:** To brainstorm
**Core thesis:** The LLM context window is not just data—it is a program being executed. We are "context programming," not just context engineering. This frame reveals what tooling we lack.

**Key ideas:**
- REPL analogy: each turn is Read-Eval-Print
- The context IS the program (tokens = instructions + data)
- What programming tools we take for granted but lack for context:
  - Version control (track context evolution)
  - Debuggers (inspect why model behaved a certain way)
  - Refactoring tools (restructure context systematically)
  - Composable abstractions (reusable context patterns)
  - Type systems (schemas for context structure)
- Google ADK insight: "Context is a compiled view over a richer stateful system"

**Questions to explore:**
- What would a "context IDE" look like?
- How do we version and diff contexts?
- What are the "functions" and "variables" of context programming?

---

#### Essay 4: The Language Layer—Hypothesis-Driven Problem Solving
**Status:** To brainstorm
**Core thesis:** A new model of problem-solving with software systems. Intelligence no longer resides in code (durable, rigid artifacts); it resides in language (fluid, regenerable intent). Natural language becomes the layer where humans express hypotheses, and code becomes ephemeral verification—generated, tested, discarded, regenerated.

**The paradigm shift:**
```
Traditional:  Human → writes code → code executes → result
              (solution lives in CODE)

New:          Human → expresses idea in language → agent generates code →
              code tests hypothesis → result informs next hypothesis
              (solution lives in LANGUAGE)
```

**Key insight:** This is not just "flexibility"—it's a fundamental change in where intelligence resides:
- Old: Intelligence crystallized in code (durable, rigid)
- New: Intelligence expressed in language (fluid, regenerable)

**The spectrum (practical view):**
```
Most Rigid                                          Most Flexible
    |                                                      |
    v                                                      v
Stored procedures → Retrieval of code → Language → Language +
(execute fixed)     (retrieve & adapt)   (generate)   dynamic tool use
```

**Key analogies from CS:**
- Early vs. late binding in OOP
- Compile-time vs. runtime resolution
- JIT compilation: compile at execution time based on context
- Stored procedures vs. dynamic SQL

**ARC2 observations (to describe abstractly):**
- Natural language as hypothesis space
- Code as verification/execution layer
- Storing ideas (flexible) vs. storing code (rigid)
- Why language-level retrieval beats code-level retrieval for adaptability

**Trade-offs:**
- Late binding: flexible but requires generation, potential variability
- Early binding: rigid but predictable, cacheable
- When to choose which point on the spectrum

**Questions to explore:**
- What does "code as ephemeral verification" mean for software engineering?
- How does this change what we store, version, and maintain?
- What are the implications for knowledge management in organizations?

---

### Implications Layer

#### Essay 5: The Decision Game
**Status:** To brainstorm
**Core thesis:** (Prescriptive) As agents handle execution, human work shifts to decision-making: what should the agent do? Has it done well? Is the quality sufficient? App developers should design systems that empower users to play this game well.

**Key observations:**
- Daily work becomes: design decisions, quality assessment, technology choices
- Parallel to DeepMind's "The Thinking Game" (developing AI) → "The Decision Game" (using AI)
- Not writing code line-by-line, but steering, judging, selecting

**Implications for individuals:**
- What skills to cultivate (judgment, evaluation, domain expertise)
- What becomes less valuable (rote execution)
- The new leverage: good decisions compound through agent execution

**Implications for app developers:**
- Design for decision-making, not just task execution
- Surface the right information for human judgment
- Make agent reasoning inspectable
- Allow appropriate human intervention points

**Questions to explore:**
- What does "good decision-making" look like in human-agent collaboration?
- How do we develop decision-making skills?
- What interfaces support the decision game?

---

#### Essay 6: Future of Human-Agent Interaction (HCI Brainstorm)
**Status:** To brainstorm — pick one or combine several topics
**Core thesis:** TBD — select from candidates below

**Candidate Topics:**

**A. The Collaboration Spectrum**
- From "tool" (human drives) to "collaborator" (turn-taking) to "delegate" (agent drives)
- When to use which mode? How to switch fluidly?
- Interface patterns for each mode
- The grammar of human-agent turn-taking

**B. Trust Calibration**
- How do users develop appropriate trust (not over-trust, not under-trust)?
- What makes agent behavior predictable/trustable?
- Transparency vs. cognitive load trade-off
- The danger of anthropomorphization
- Designing for calibrated trust

**C. The Autonomy Dial**
- Fully manual ↔ fully autonomous: where to set it?
- Context-dependent autonomy (high-stakes vs. routine)
- User control over the autonomy level
- Dynamic autonomy: systems that adjust based on confidence

**D. Skill Transformation**
- What human skills become more valuable? (judgment, domain expertise, evaluation)
- What becomes less valuable? (rote execution, syntax knowledge)
- How do we educate for this shift?
- The new shape of expertise

**E. Error Recovery Patterns**
- How users detect agent mistakes
- How to design for graceful correction
- The "undo" problem in agentic systems
- Verification without re-doing the work

**F. Mental Model Design**
- Users need accurate mental models of agent capabilities
- How to communicate what agents can/cannot do
- Progressive disclosure of agent reasoning
- The explanation problem: when does explanation help vs. overwhelm?

**Open question:** Which of these becomes Essay 6? Or should multiple become Essays 6, 7, 8...?

---

## Potential Additional Essays

### Essay 2.5: Trust and Verification
**Status:** Consider adding
**Purpose:** Bridge between mechanics (how agents work) and implications (human role). How do we know the agent did a good job? Connects to the decision game but may deserve standalone treatment. (Note: overlaps with HCI candidate B above)

---

## Ordering Rationale

The series builds **bottom-up**:

1. **Two Paradigms** — Opens with "what is an agent?" then establishes the conceptual landscape. Reader understands the historical context and why we think about agents the way we do now.

2. **Context Engineering** — Dives into the "inward direction" paradigm. Reader understands the practical challenges and solutions.

3. **Context as Program** — Deepens the conceptual model. Reader sees context not as static data but as dynamic program, revealing what tooling we lack.

4. **The Language Layer** — Proposes a new model of problem-solving: intelligence resides in language, code is ephemeral verification. Reader understands a paradigm shift in how humans and software systems collaborate.

5. **Decision Game** — Zooms out to human implications. Reader understands what this means for their work and skills. (Prescriptive: this is where we should go.)

6. **Future HCI** — Explores broader implications for human-agent interaction. (Topic TBD from candidates.)

Each essay builds on the previous:
- Essay 2 requires understanding from Essay 1 (why context engineering is the focus)
- Essay 3 requires Essay 2 (deepens the context concept)
- Essay 4 requires Essay 2-3 (builds on context to propose new problem-solving model)
- Essay 5 requires Essay 4 (why decisions matter when language drives execution)
- Essay 6 requires Essay 5 (broader HCI implications beyond the decision game)

---

## Cross-References

| Essay | Builds On | Sets Up |
|-------|-----------|---------|
| 1. Two Paradigms | — | All subsequent essays |
| 2. Context Engineering | 1 (why inward) | 3, 4 (context details) |
| 3. Context as Program | 2 (what context is) | 4 (programming metaphor) |
| 4. The Language Layer | 2, 3 (context + program) | 5 (why decisions matter) |
| 5. Decision Game | 4 (language-driven execution) | 6 (broader HCI) |
| 6. Future HCI | 5 (decision-making role) | — |

---

## Open Questions for the Series

1. **ARC2 handling:** How abstractly to describe? What details can be shared?

2. **Trust/Verification essay:** Should this be standalone (Essay 2.5) or folded into Decision Game or Essay 6?

3. **Practical examples:** What concrete agent systems to reference throughout?

4. **Essay 6 topic:** Which HCI candidate(s) to develop? Or expand into multiple essays?

5. **Target length:** ~2000 words per essay (8-10 min read) — expand only if topic demands

---

## Key Sources

### Context Engineering
- [Anthropic: Effective Context Engineering for AI Agents](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents)
- [Lance Martin: Context Engineering for Agents](https://rlancemartin.github.io/2025/06/23/context_engineering/)
- [LangChain: The Rise of Context Engineering](https://blog.langchain.com/the-rise-of-context-engineering/)
- [LangChain: Context Engineering for Agents](https://blog.langchain.com/context-engineering-for-agents/)
- [ACE Framework (arxiv:2510.04618)](https://arxiv.org/abs/2510.04618)

### Late Binding / Software Design
- [Wikipedia: Late Binding](https://en.wikipedia.org/wiki/Late_binding)
- [ResearchGate: Describing Binding Time in Software Design Patterns](https://www.researchgate.net/publication/313738165_Describing_binding_time_in_software_design_patterns)

### To Research
- DeepMind "The Thinking Game" documentary
- Historical RL-based agent architectures (for contrast)
- Specific over-engineered agent systems that were obsoleted

---

## Next Steps

1. [x] Fold "What is an agent?" into Essay 1 (done)
2. [x] Rename Essay 4 to "The Language Layer" with new framing (done)
3. [x] Add Essay 6 HCI candidates for brainstorming (done)
4. [ ] Brainstorm Essay 1: Two Paradigms — gather concrete examples of RL-style vs LLM-era agents
5. [ ] Outline the ARC2 observations for Essay 4 (abstract form)
6. [ ] Decide on Essay 6 topic from candidates
7. [ ] Decide on Trust/Verification as standalone or integrated
