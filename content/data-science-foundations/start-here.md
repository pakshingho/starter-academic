---
title: Start Here
linktitle: 0. Start Here
toc: false
type: docs
date: 2026-03-15
lastmod: 2026-03-15
draft: false
menu:
  data-science-foundations:
    identifier: chapter-start-here
    weight: 2
weight: 2
---

This handbook is for the first stage of becoming useful on a data science team.

The goal is not to memorize every method. The goal is to become the kind of teammate who can frame a problem clearly, work with real data carefully, and communicate a recommendation that people can act on.

### What data scientists actually do

Titles vary from company to company, but most data science work falls into a few recurring loops:

- define the decision or question
- retrieve and validate the relevant data
- analyze patterns or build a model
- recommend an action and measure what happens next

![A practical loop for day-to-day data science work](/media/handbooks/data-science/decision-loop.svg)

### What good early-career judgment looks like

At this stage, strong judgment usually looks like:

- asking what the unit of analysis is before writing the query
- checking whether a reported lift is statistically and practically meaningful
- building a strong baseline before reaching for a more complex model
- noticing leakage, missingness, duplication, or metric-definition problems early
- explaining trade-offs instead of pretending there is a perfect answer

### What this handbook leaves out on purpose

To keep the material focused, this handbook does not try to cover:

- measure-theoretic probability
- advanced deep learning architectures
- causal inference in depth
- distributed systems internals
- the full landscape of modern ML research papers

Those topics matter, but they are not the minimum bar for getting started well.

### The four habits to build first

1. Be precise about definitions.
2. Prefer trustworthy baselines over flashy complexity.
3. Treat uncertainty as part of the answer, not an inconvenience.
4. Tie every analysis back to a real decision.

### A simple self-check

Before moving on, make sure you can answer these questions:

- Can I explain what a row in a dataset represents?
- Do I know the difference between correlation, prediction, and decision-making?
- Am I comfortable saying "I need to check the assumptions behind that number"?

If yes, continue to [Probability and Uncertainty](../probability-and-uncertainty/).
