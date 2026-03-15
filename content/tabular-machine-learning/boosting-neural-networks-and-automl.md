---
title: 7. Boosting, Neural Networks, and AutoML
linktitle: 7. Advanced Models
toc: false
type: docs
date: 2026-03-14
lastmod: 2026-03-14
draft: false
math: true
menu:
  tabular-machine-learning:
    identifier: chapter-advanced
    weight: 9
weight: 9
---

Once the workflow is sound, it becomes reasonable to compare stronger model families. The key is to treat them as tools with trade-offs, not as automatic upgrades.

### Learning goals

- understand what boosting adds beyond bagging
- build intuition for neural networks on tabular problems
- use AutoML without outsourcing judgment

### Boosting

Boosting builds models sequentially. Each new learner focuses more attention on errors made by earlier learners.

That differs from bagging:

- bagging reduces variance through averaging
- boosting reduces error through staged correction

This often makes boosting very strong on structured datasets, especially when feature quality is already decent.

In practice, gradient boosting libraries are among the most reliable high-performance choices for tabular data.

### Neural networks

Neural networks stack layers of weighted transformations and nonlinear activations. They can represent more flexible functional forms than linear models and can capture rich interactions among features.

Still, tabular data is a domain where neural networks are not always the default winner. They can be effective, but they often demand more care in:

- optimization
- regularization
- architecture choice
- data volume

That is why many applied tabular workflows compare trees and neural models rather than assuming one dominates.

### Training ideas worth knowing

Even at a conceptual level, it helps to know these ideas:

- forward pass: compute predictions from inputs
- loss function: measure error
- backpropagation: distribute learning signal backward through the network
- dropout and regularization: reduce overfitting
- activation functions: introduce nonlinearity

The goal here is fluency, not memorizing every equation.

### AutoML

AutoML systems can automate pieces of:

- preprocessing
- model selection
- hyperparameter tuning
- evaluation bookkeeping

That can speed up iteration dramatically, especially for benchmarking or for teams with limited ML bandwidth.

But AutoML still depends on human decisions about:

- target definition
- leakage control
- split strategy
- metric choice
- deployment constraints

AutoML is most useful when you already know what a valid workflow looks like.

### Practical model-comparison mindset

For a serious tabular project, a healthy comparison set might include:

- a simple linear or logistic baseline
- a tree ensemble baseline
- a boosting model
- optionally a neural network or AutoML run

The winning choice should reflect more than score alone. Also consider robustness, latency, interpretability, maintenance burden, and how likely the result is to survive contact with real data drift.

### Chapter takeaway

Advanced models are worth using when they solve a real problem better, not when they merely sound more modern.

### Practice

For one prediction problem, rank these in the order you would try them:

- linear or logistic regression
- random forest
- gradient boosting
- neural network
- AutoML

Explain the order in one paragraph.
