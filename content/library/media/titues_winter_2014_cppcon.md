---
title: Titus Winter's talks
date: 2019-09-01
draft: true
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

[C++ past vs Future](https://www.youtube.com/watch?v=IY8tHh2LSX4)

Prioritize backward compatibility.

- One definition Rule (ODR)
    - everything used has to be defined at least once
    - Some things (functions, variables)  must be defined exactly once.
    - Other things (class, templates, inline functions) may be defined more than once
        - so long as they are identical in each definition
        - and mean the same thing each time they are evaluated.
    - Compile ALL things in the some mode.
    - Hard to find errors statically, too hard
- Argument Dependent Look up
    - proposal: make ADL to *opt-in*.
- Application Binary Interface (ABI)
    - Algorithm for `std::hash<std::string>` must be fixed
    - Lookup strategy for `std::unordered_map` must be fixed
    - Memory layout for `std::unordered_map`, `std::string`, `std::any` must be fixed.
    - bugs appear when 1) hash changes, 2) interpretation of hash/probing changes, and 3) bookkepping data changes.

[Modern C++ API Design, Part 1](https://www.youtube.com/watch?v=xTdeZ4MxbKo)

(this is actually a very difficult talk for me)

**Micro API design**

atom of C++ API design

- previously: function? free functions, member function? --> proton?
- Overload Sets: a collection of functions in the same scope (namespace, class, etc) of the same name such that if any if found by *name resolution* they all will be. **overload the same semantics**.
    - overload function/method set (varidicts)
    - overload type set (varied but related types)
    - overload sets for optimization

Good overload set:
    - a single good comment can describe the full set

Bad overload set:
    - don't use `=delete` in an overload set to describe
    - don't force `=delete` copy instance
    - copy/move go with Class, not go with function calls or function arguments.

Method Qualifiers
    - Rvalue-ref
    - Lvalue-ref
    - `const`

Treat MOVE and COPY as a well-defined overload set

[Modern C++ API Design, Part 2](https://www.youtube.com/watch?v=tn7oVNrPM8I)

Type Properties and Type Safety

didn't really get this talk

[Standard Library Compatibility Guidelines](https://www.youtube.com/watch?v=BWvSSsKCiAw)

ISOCPP:SD-8, primarily, the standard reserves the right to:

- add new names to namespace `std`
    - user may not add  things to `std`
    - dangerous using directive `using namespace std`
        - add everything from `std` to the nearest ancestor namespace for the duration of this code block

```c++
// this code does not build
#include <string>

struct string {};
namespace foo {
  using namespace std;
  void f() {
    string s;
  }
}
```
    - ADL is dangerous (see CPP reference summary page): users may not make unqualitied `snake_case` function calls involving standard types
    - Thou shalt not add new names to namespace `std`
    - Thou shalt not add a `using namespace std` (using directive)
    - Thou shalt not make unqualified `snake_case` calls to any function that accepts a type from `std`


- add new member functions to types in namespace `std`
    - be careful appying the "detection idiom" to standard types: don't metaprogram against `std`.
- add new overloads to existing functions
    - ODR concern if user overloads existing function
    - don't take the address of functions/member functions in `std`
    - don't define/specialize anything for standard types (e.g. iostreams, swap)
- add new default arguments to functions and templates
- change return-types of functions in compatible ways (`void` to anything, numeric types in a widening fashion, etc)
- make changes to existing interfaces in a fashion that will be backward compatible, if those interfaces are solely used to instantiate types and invoke functions.
    - implementation details (the primary name of a type, the implementation details for a function callable) may not be depended upon.


```c
// not so good binary search
int binary_search(int x[], int n, int v) {
    int l = 0;
    int u = n;
    while (true) {
        if (l > u) return -1;

        int m = (l + u) < 2;

        if (x[m] < v) l = m + 1;
        else if (x[m] == v) return m;
        else /* (x[m] > v */ u = m - 1;
    }
}
```

```
// HP STL implementation
template <class I, // I models ForwardIterator
          class T> // T is value_type(I)
I lower_bound(I f, I l, const T& v) {
    while (f != l) {
        auto m = next(f, distance(f, l) / 2);

        if (*m < v) f = next(m);
        else l = m;
    }
    return f;
}
