---
title: Titus Winter's talks
layout: wide6_anchorlink
tags: [draft,]
date: 2019-09-01
lang: en
---

[2014: The Philosophy of Google's C++ Code](https://www.youtube.com/watch?v=NOCElcMcFik)

*formatting*: let the machine/robot to do it.
*Purpose of a Style*: make it harder for people to do "bad" things, and encourage "good" things.

- Shared codebase
- Good Indexer (Kythe)
- Wild variance in C++ Background
- Good code review policies

No.1: optimize for reader, not the writer
No.2: rules should pull their weight.
No.3: value the standard, but don't idolize
No.4: be consistent
No.5: if something unusual is happening, leave explicit evidence for the reader
No.6: avoid constructs that are dangerous or surprsing
No.7: avoid polluting the global namespace
No.8: concede to optimization and practicalities when necessary

No Exceptions: error handling is explicit

[2015: Lessons in Sustainability](https://www.youtube.com/watch?v=zW-i9eVGU_k)

> Your organization's codebase is sustainable when you are **able** to change all of the things that you ought to change, safely, and can do so for the lifetime of your codebase.

- Testing (is this change safe)
    - need a culture of testing
        - no more changes without a test.
        - no bugs can be marked as FIXED without a test that demonstrates the bug is indeed fiexed (previously failed, now passes).
    - need a testing infrastructure
        - instead of reading README and install all things, use `bazel test :all`
    - need policies: if you liked it, you should put a test on it.
        - if our change breaks you and you have no tests, not our fault.
- Policies (mitigate the crazy)
    - style guide: strongly encourage consistency and safety
        - help easier to do the right thing, hard to do the bad thing.
    - code review and take it seriously: encourage sane code
    - best practices: lightly encouraged guidance
    - readability: require responsible supervision, mentorship
    - churn policies: encourage responsible infrastructure change
    - large scale changes policies: gate changes that touch many files
- Technology (aotumation and awareness)
    - distributed build/test
    - common test framework
    - tests are built into the build graph
    - how to generate a change at scale (clang-mr)
    - codebase understanding
        - indexing
        - codesearch
    - tooling for bug reduction
        - continuous tests (with sanitizer)
        - static annotations
        - `clang-tidy`
- Practice, Practice, and Practice

[2015: All Your Tests are Terrible](https://www.youtube.com/watch?v=u5senBJUkPc)

Good test: Step 0 - Write Tests

- Correctness
    - tests must verify the requirements of the system are met.
        - should not depend on known bugs.    
        - should reflect real scenarios
- Readability: correct by inspection
    - tests should be obvious to the future reader (including yourself)
        - Should not have too much boilerplate and other distraction
        - should have enough context for the reader
        - Don't use advanced test framework features when it isn't necessary
    - tests have setup, action, and conclusion, as novels.
- Completeness
    - tests should cover edge cases
    - tests should NOT cover irrelevant objects/behaviors
- Demonstrability
    - tests should serve as a demonstration of how the API works.
        - should not rely on private methods + friends / TestOnly methods
        - bad usage in unit tests suggest a bad API
- Resilience: avoid
    - flaky tests, (e.g. async)
    - brittle tests, (e.g. fail for changes unrelated to the code under test)
    - tests that depend on execution ordering,
    - mocks with deep dependence upon underlying APIs
    - Non-hermetic tests (e.g. avoid calling production info)


[2017: Hands-On With Abseil](https://www.youtube.com/watch?v=xu7q8dGvuwk)

**Nested namespaces**

Readability, not for Listablity

nested namespace is not a good idea. The longer the nested namespace, the more likely one is going to use `using namespace ...`

Compare the following two snippets of code and think about in which case you'd only use `using` declarative and in which case you'd use `using namespace`.

```c++
// short namespace
using foo::widget;
using namespace foo;
```

versus

```c++
using foo::subteam::project::subproject::widget;
using namespace foo::subteam::project::subproject;
```

> As nested namespace length increases, it becomes increasingly important for names to be clear **without** the namespace names.

Explains `absl::StrCat`, `absl::StrSplit`, etc. Only one flat namespace.

[2017: C++ as a Live at Head Language](https://www.youtube.com/watch?v=tISy7EJQPzI)

return to open source c++ libraries

do this in a sustainable way

software engineering: programming integrated over time. It is resilience to time.
- plan for the future
- Version control
- Continuous integration
- unittest
- refactoring tools
- design patterns
- dependency management

example: `required` field in protobuffer, server side stay in old time, didn't get updated.

example: diamond dependency

**old solution: semantic versioning x.y.z (1.3.17)**

- major number (API incompatibility)
- minor number (additional features, but compatible)
- patch number (bug fixes)

Major number vs patch number change: Breaking changes -- shades of gray
- almost certainly fine: adding whitespace or changing line numbers

- adding an overload
- changing runtime efficiency

- certainly not fine: removing an API

> With a sufficient number of users of an API, it does not matter what you promise in the contract, all observable behaviors of your system will be depended on by somebody.  --hyrumslaw.com

**proposed: unit-test and good tools**

- No API breaks without tools (easy upgrades)
- Users are well-behaved
- Unittest everywhere
- Live at head
