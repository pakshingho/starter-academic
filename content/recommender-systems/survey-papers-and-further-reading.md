---
title: 11. Survey Papers and Further Reading
linktitle: 11. Survey Papers
toc: false
type: docs
date: 2026-03-11
lastmod: 2026-03-11
draft: false
math: true
menu:
  recommender-systems:
    identifier: chapter-survey
    weight: 12
weight: 12
---

When you want to go beyond a chapter-level handbook, survey papers are the fastest way to widen your map of the field. They help you see which methods are mature, which subproblems have become their own research area, and where evaluation practice is still moving.

<div id="model-family-surveys"></div>

### 11.1 Model-family surveys

- [Deep Learning based Recommender System: A Survey and New Perspectives](https://arxiv.org/abs/1707.07435)
  Read this when you want a broad map of how deep models entered recommender systems and how the literature is usually taxonomized.
- [A Comprehensive Survey of Recommender Systems Based on Deep Learning](https://doi.org/10.3390/app132011378)
  Read this when you want a more recent pass over deep recommender architectures, datasets, and open problems.

These papers are useful after the `Deep Models` chapter because they show how two-tower, sequence, interaction-heavy, and feature-rich models fit into a larger research taxonomy.

<div id="session-and-sequential-surveys"></div>

### 11.2 Session and sequential recommendation surveys

- [A Survey on Session-based Recommender Systems](http://hdl.handle.net/10453/168894)
  Read this when you want a dedicated map of short-horizon, intent-drift, and session-only recommendation problems.

This is the right follow-on if your product has weak long-term user histories, strong within-session intent shifts, or feed/search journeys where recency matters more than stable preference.

<div id="long-horizon-and-responsible-recommendation"></div>

### 11.3 Long-horizon and responsible recommendation

- [Reinforcement Learning based Recommender Systems: A Survey](https://arxiv.org/abs/2101.06286)
  Read this when you want to understand recommendation as sequential decision-making instead of one-step ranking.
- [Fairness and Diversity in Recommender Systems: A Survey](https://doi.org/10.1145/3664928)
  Read this when utility-only optimization is no longer enough and you need to reason about exposure, supplier effects, or system-level harms.

These surveys are especially relevant after the `Production Concerns` chapter, because they push beyond offline ranking quality toward long-term value, exploration, fairness, and platform objectives.

<div id="how-to-read-survey-papers"></div>

### 11.4 How to read survey papers efficiently

For practitioners, the best way to use a survey paper is usually not to read every cited method in order.

1. Read the taxonomy first and decide which branch actually matches your product surface.
2. Focus on the evaluation section to see which metrics and data assumptions are standard in that subfield.
3. Pull out the open-problems section to understand what still breaks in real systems.
4. Use the references to identify a small number of landmark papers rather than trying to read the full citation graph.

If you are building production systems rather than writing a paper, the main value of surveys is not completeness. It is faster problem framing and better judgment about which methods are mature enough to operationalize.
