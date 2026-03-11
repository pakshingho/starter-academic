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

**[Deep Learning based Recommender System: A Survey and New Perspectives](https://arxiv.org/abs/1707.07435) (2017; later accepted by ACM Computing Surveys).** This survey is one of the clearest early maps of deep-learning recommender systems. It organizes the literature into model families, summarizes how neural architectures were being used across recommendation problems, and identifies broader research trends rather than treating each new model as a disconnected invention. It is especially relevant to this handbook because it gives historical structure to the `Deep Models` chapter and helps explain how modern retrieval, interaction, and representation-learning approaches grew out of earlier neural recommender work.

**[A Comprehensive Survey of Recommender Systems Based on Deep Learning](https://doi.org/10.3390/app132011378) (2023).** This review takes a more recent and more application-oriented pass over deep-learning recommenders by grouping the field into content-based, sequence, cross-domain, and social recommendation settings. It is useful not just because it catalogs architectures, but because it also frames open challenges such as interpretability, multimodality, privacy, and fairness. For this handbook, the paper is relevant because it extends the taxonomy beyond the core deep models covered here and helps readers see which recommendation problems become distinct subfields once systems move beyond classic user-item ranking.

These papers are useful after the `Deep Models` chapter because they show how two-tower, sequence, interaction-heavy, and feature-rich models fit into a larger research taxonomy.

<div id="session-and-sequential-surveys"></div>

### 11.2 Session and sequential recommendation surveys

**[A Survey on Session-based Recommender Systems](http://hdl.handle.net/10453/168894) (2022).** This survey focuses on recommendation settings where long-run user history is weak, unavailable, or less useful than short-horizon intent. It lays out the entities, behaviors, data characteristics, and modeling challenges of session-based recommendation, then develops a taxonomy for the methods used in that setting. It is relevant to this handbook because the `Explicit vs. Implicit Feedback`, `Model Families`, and `Deep Models` chapters touch sequence-aware recommendation only as one branch of the field; this paper is the right next step when session dynamics, recency, and evolving within-session context are central to the product problem.

This is the right follow-on if your product has weak long-term user histories, strong within-session intent shifts, or feed/search journeys where recency matters more than stable preference.

<div id="long-horizon-and-responsible-recommendation"></div>

### 11.3 Long-horizon and responsible recommendation

**[Reinforcement Learning based Recommender Systems: A Survey](https://arxiv.org/abs/2101.06286) (2021).** This paper reframes recommendation as a sequential decision problem rather than a one-step scoring problem. It surveys both RL- and DRL-based recommenders, then organizes the space around state representation, reward design, policy optimization, and environment modeling. It is relevant to this handbook because the `Production Concerns` chapter already pushes beyond offline ranking quality toward long-term outcomes; this survey is the natural next read when you want to reason about exploration, delayed rewards, and policy learning instead of only immediate CTR or relevance.

**[Fairness and Diversity in Recommender Systems: A Survey](https://doi.org/10.1145/3664928) (published online in 2024; ACM TIST issue in 2025).** This survey argues that recommender systems cannot be judged only by utility metrics and develops a joint view of fairness and diversity rather than treating them as unrelated objectives. It covers measurements, debiasing methods, re-ranking approaches, and the link between user-level and item-level concerns. It is relevant to this handbook because the `Production Concerns` chapter already introduces freshness, diversity, fairness, and business constraints; this survey provides the broader literature map you need once recommendation quality is no longer defined only by engagement lift.

These surveys are especially relevant after the `Production Concerns` chapter, because they push beyond offline ranking quality toward long-term value, exploration, fairness, and platform objectives.

<div id="how-to-read-survey-papers"></div>

### 11.4 How to read survey papers efficiently

For practitioners, the best way to use a survey paper is usually not to read every cited method in order.

1. Read the taxonomy first and decide which branch actually matches your product surface.
2. Focus on the evaluation section to see which metrics and data assumptions are standard in that subfield.
3. Pull out the open-problems section to understand what still breaks in real systems.
4. Use the references to identify a small number of landmark papers rather than trying to read the full citation graph.

If you are building production systems rather than writing a paper, the main value of surveys is not completeness. It is faster problem framing and better judgment about which methods are mature enough to operationalize.
