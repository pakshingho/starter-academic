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

This chapter is not meant to be exhaustive. The goal is to help you widen your map of the field without losing the thread of the handbook.

<div id="start-here"></div>

### 11.1 Start here

If you only want a small reading set after finishing this handbook, start with these:

1. [A Survey on Accuracy-oriented Neural Recommendation: From Collaborative Filtering to Information-rich Recommendation](https://arxiv.org/abs/2104.13030) (2021)
2. [A Survey on Session-based Recommender Systems](http://hdl.handle.net/10453/168894) (2022)
3. [Bias and Debias in Recommender System: A Survey and Future Directions](https://arxiv.org/abs/2010.03240) (2020)
4. [Multimodal Recommender Systems: A Survey](https://arxiv.org/abs/2302.03883) (2023; updated 2024)
5. [How Can Recommender Systems Benefit from Large Language Models: A Survey](https://dl.acm.org/doi/10.1145/3678004) (2025)
6. [A Survey of Real-World Recommender Systems: Challenges, Constraints, and Industrial Perspectives](https://arxiv.org/abs/2509.06002) (2025)

This subset gives you coverage of classical-to-neural evolution, sequence recommendation, bias, multimodality, LLM-era recommender work, and industrial deployment constraints.

<div id="general-and-industry-surveys"></div>

### 11.2 General and industry-facing surveys

**[A Survey of Real-World Recommender Systems: Challenges, Constraints, and Industrial Perspectives](https://arxiv.org/abs/2509.06002) (2025).** This survey is unusually valuable for practitioners because it centers deployment constraints rather than only benchmark performance. It discusses industrial tradeoffs around latency, retraining cadence, marketplace constraints, product surfaces, organizational limitations, and the gap between offline metrics and business outcomes. It is relevant to this handbook because it is the closest survey match to the practical orientation of `Production Concerns` and `Build Sequence`.

- **[Contemporary Recommendation Systems on Big Data and Their Applications: A Survey](https://arxiv.org/abs/2206.02631) (first posted 2022; updated 2024).** Broad and application-heavy survey that is more useful for field scanning than for deep method selection.
- **[A Comprehensive Review of Recommender Systems: Transitioning from Theory to Practice](https://arxiv.org/abs/2407.13699) (2024).** Useful when you want a paper explicitly framed around the gap between elegant methods and deployable systems.
- **[Recent Developments in Recommender Systems: A Survey](https://arxiv.org/abs/2306.12680) (2023).** Broad recent-literature snapshot that is useful when you want a compact update on post-classic recommender directions.

<div id="neural-and-deep-learning-surveys"></div>

### 11.3 Neural and deep-learning recommender surveys

**[A Survey on Accuracy-oriented Neural Recommendation: From Collaborative Filtering to Information-rich Recommendation](https://arxiv.org/abs/2104.13030) (2021).** This survey is one of the most useful bridges between classic collaborative filtering and the modern neural recommendation literature. It does not just list architectures; it organizes the field by how recommendation moves from pure user-item interaction modeling toward richer inputs such as context, content, knowledge, and multi-behavior signals. It is relevant to this handbook because it helps place the `Model Families`, `Feature-Rich Recommendation`, and `Deep Models` chapters into one coherent research map instead of treating them as separate toolkits.

- **[A Comprehensive Survey of Recommender Systems Based on Deep Learning](https://doi.org/10.3390/app132011378) (2023).** Good catalog of deep-learning recommendation settings, especially if you want a wider taxonomy after reading the core deep chapters.
- **[Graph Learning based Recommender Systems: A Review](https://arxiv.org/abs/2105.06339) (2021).** Useful when graph-based message passing, neighborhood propagation, and graph-enhanced collaborative filtering are central to your method selection.

<div id="sequential-session-and-decision-surveys"></div>

### 11.4 Sequential, session-based, and decision-oriented surveys

**[A Survey on Session-based Recommender Systems](http://hdl.handle.net/10453/168894) (2022).** This survey focuses on settings where long-run user histories are weak, absent, or less useful than short-horizon intent. It lays out the data structure, problem formulation, and method families for session-based recommendation, including the shift from simple Markov-style methods to GRU-, attention-, and transformer-based models. It is relevant to this handbook because the `Explicit vs. Implicit Feedback`, `Model Families`, and `Deep Models` chapters only introduce sequence-aware recommendation at a high level; this paper is the right follow-on when your product is driven by recency, intent shifts, and within-session behavior.

- **[Reinforcement Learning based Recommender Systems: A Survey](https://arxiv.org/abs/2101.06286) (2021).** Best for long-horizon optimization, exploration, delayed rewards, and policy-learning formulations of recommendation.

<div id="responsible-and-robust-recommendation"></div>

### 11.5 Responsible and robust recommendation

**[Bias and Debias in Recommender System: A Survey and Future Directions](https://arxiv.org/abs/2010.03240) (2020).** This survey is useful because it reframes recommendation quality as partly a data-generation problem rather than only a model-design problem. It catalogs major bias sources such as exposure bias, selection bias, position bias, and popularity bias, then reviews algorithmic and evaluation-side responses. It is relevant to this handbook because many of the production issues discussed in `Production Concerns` and the evaluation caveats in the ranking chapters become much easier to reason about once you view recommendation pipelines through a bias-and-debias lens.

- **[Fairness and Diversity in Recommender Systems: A Survey](https://doi.org/10.1145/3664928) (published online in 2024; ACM TIST issue in 2025).** Strong choice if your concern is multi-objective ranking quality rather than only relevance or engagement lift.

<div id="emerging-directions"></div>

### 11.6 Emerging directions

**[Multimodal Recommender Systems: A Survey](https://arxiv.org/abs/2302.03883) (2023; updated 2024).** This survey covers recommendation systems that use more than IDs and tabular metadata, such as text, images, audio, and video. It is especially useful for understanding how representation learning changes when item understanding itself becomes a multimodal problem instead of a pure interaction problem. It is relevant to this handbook because it extends the `Feature-Rich Recommendation` and `Deep Models` chapters into the part of the field where content understanding and recommendation become tightly coupled.

**[How Can Recommender Systems Benefit from Large Language Models: A Survey](https://dl.acm.org/doi/10.1145/3678004) (2025).** This survey is a strong next read if you want to understand where LLMs fit into recommendation without collapsing everything into hype. It organizes the space around representation, reasoning, generation, user understanding, and agentic or interactive recommendation settings, while also discussing limits such as latency, hallucination, and evaluation mismatch. It is relevant to this handbook because it helps extend the `Deep Models` and `Production Concerns` chapters into the current wave of LLM-assisted retrieval, ranking, explanation, and recommendation workflows.

<div id="foundational-pre-2020-surveys"></div>

### 11.7 Foundational pre-2020 surveys worth keeping

These are older than the 2020+ focus of this chapter, but they are still worth keeping because they remain useful orientation documents.

- **[Deep Learning based Recommender System: A Survey and New Perspectives](https://arxiv.org/abs/1707.07435) (2017; later journal publication in 2019).** Still one of the clearest early maps of neural recommender systems.
- **[Deep Learning Based Recommender System: A Survey and New Perspectives](https://dl.acm.org/doi/10.1145/3285029) (2019).** The ACM Computing Surveys publication version of the same work, useful if you prefer the journal reference.
- **[Recommender system application developments: a survey](https://doi.org/10.1016/j.dss.2015.03.008) (2015).** Older and broader than the rest, but still useful if you want historical perspective on application areas and early design patterns.

<div id="how-to-read-survey-papers"></div>

### 11.8 How to read survey papers efficiently

For practitioners, the best way to use a survey paper is usually not to read every cited method in order.

1. Read the taxonomy first and decide which branch actually matches your product surface.
2. Focus on the evaluation section to see which metrics and data assumptions are standard in that subfield.
3. Pull out the open-problems section to understand what still breaks in real systems.
4. Use the references to identify a small number of landmark papers rather than trying to read the full citation graph.

If you are building production systems rather than writing a paper, the main value of surveys is not completeness. It is faster problem framing and better judgment about which methods are mature enough to operationalize.
