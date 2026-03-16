---
title: 5. Coding Habits for Data Work
linktitle: 5. Coding
toc: false
type: docs
date: 2026-03-15
lastmod: 2026-03-15
draft: false
menu:
  data-science-foundations:
    identifier: chapter-coding
    weight: 7
weight: 7
---

Coding in data science is not only about algorithms. It is about making analysis reproducible, making transformations inspectable, and making handoffs easier for teammates.

### The minimum coding bar

You should be comfortable doing all of the following:

- writing small functions with clear inputs and outputs
- using lists, dictionaries, sets, and data frames appropriately
- reading stack traces and debugging step by step
- testing edge cases instead of trusting happy-path output
- reasoning roughly about runtime and memory usage

### The data structures that matter most

| Structure | Why it matters in practice |
| --- | --- |
| list or array | ordered data, iteration, vectorized workflows |
| dictionary or hash map | fast lookups, counting, indexing by key |
| set | membership checks and deduplication |
| queue or stack | traversal logic, parsing, stateful workflows |
| tree or graph | hierarchies, networks, recommendation and routing problems |

You do not need to become a competitive programming specialist. You do need enough fluency to choose the right structure when performance or clarity depends on it.

### Complexity still matters

Big-O notation is a coarse tool, but it is useful. It helps you notice when a solution scales badly:

- `O(1)`: constant-time lookup
- `O(n)`: one pass over the data
- `O(n log n)`: sorting and similar divide-and-conquer patterns
- `O(n^2)`: pairwise comparisons that can become expensive quickly

In data work, memory also matters. A transformation that silently copies a large table can be just as painful as a slow loop.

### A useful correction to oversimplified thinking

Real machine learning runtime is often more complicated than a one-line textbook formula. Training cost usually depends on:

- number of rows
- number of features
- number of passes or iterations
- sparsity
- implementation details

That is why rough complexity intuition is valuable, but false precision is not.

### Write code for the next reader

That next reader may be:

- your future self next week
- a teammate reviewing the analysis
- an engineer productionizing the logic

Good habits:

- name variables after meaning, not convenience
- keep notebook cells small and restartable
- move repeated logic into functions
- separate data extraction, transformation, modeling, and reporting
- add a quick assertion when a data assumption is important

### Notebooks are fine, but they are not enough

Notebooks are excellent for exploration. They become risky when they turn into the only record of a production or recurring workflow.

As work matures:

- parameterize the logic
- put shared code into modules
- use version control
- add lightweight tests for important assumptions

### Chapter takeaway

Coding skill in data science is about trustworthiness as much as raw problem-solving speed.

Next: [Product Thinking and Metrics](../product-thinking-and-metrics/).
