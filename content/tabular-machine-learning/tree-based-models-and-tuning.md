---
title: 5. Tree-Based Models and Tuning
linktitle: 5. Trees and Tuning
toc: false
type: docs
date: 2026-03-14
lastmod: 2026-03-14
draft: false
menu:
  tabular-machine-learning:
    identifier: chapter-trees
    weight: 7
weight: 7
---

Tree-based models are often the first serious workhorse models for tabular data because they capture nonlinear structure well and usually need less manual scaling and transformation than distance-based or linear methods.

### Learning goals

- understand the intuition behind decision trees
- see how random forests improve stability
- tune models without turning tuning into a fishing expedition

### Decision trees

A decision tree repeatedly splits the data using feature rules such as:

- income greater than a threshold
- account age less than a threshold
- region equals a category

This creates a flowchart-like model that is easy to interpret locally. Each split tries to make the resulting groups more internally consistent with respect to the target.

### Impurity and information gain

Tree learning depends on deciding which split is best at a given step.

Common ideas include:

- entropy
- Gini impurity
- information gain

You do not need to memorize every formula to use trees well. What matters conceptually is that a strong split creates child groups that are more predictable than the parent group.

### Strengths and weaknesses of a single tree

Strengths:

- interpretable structure
- handles mixed feature types reasonably well
- captures nonlinear interactions

Weaknesses:

- can overfit easily
- can be unstable under small data changes
- often performs worse than ensembles built from many trees

### Bagging and random forests

Random forests reduce instability by averaging across many trees trained on resampled data and randomized feature subsets.

This usually improves:

- generalization
- robustness to noise
- predictive quality with limited manual tuning

That is why random forests are such a common baseline for tabular work.

### Hyperparameter tuning

Useful tuning parameters often include:

- maximum tree depth
- minimum samples per split or leaf
- number of trees
- number of features considered per split

The practical goal is not to maximize leaderboard score at all costs. The goal is to find a model that improves validation performance without becoming fragile, slow, or hard to explain.

### Search strategies

In applied work, three common search styles are:

- grid search for small, explicit search spaces
- randomized search for broader and more efficient exploration
- Bayesian or adaptive methods when search cost is high and the space is large

The right method depends on the budget and the complexity of the model class.

### Chapter takeaway

Tree ensembles are powerful because they combine flexible modeling with comparatively forgiving preprocessing requirements.

### Practice

For a dataset you know, ask:

- Would a tree capture threshold effects that a linear model would miss?
- Which features probably drive the first few splits?
- What would count as enough tuning before stopping?

Next: [Optimization and Linear Models](../optimization-and-linear-models/).
