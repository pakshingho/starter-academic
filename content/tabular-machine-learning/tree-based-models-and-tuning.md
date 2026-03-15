---
title: 5. Tree-Based Models and Tuning
linktitle: 5. Trees and Tuning
toc: false
type: docs
date: 2026-03-14
lastmod: 2026-03-14
draft: false
math: true
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

For class probabilities $p_1, \dots, p_K$, two common impurity measures are:

$$
\mathrm{Gini}(p) = 1 - \sum_{k=1}^{K} p_k^2,
\qquad
H(p) = -\sum_{k=1}^{K} p_k \log p_k
$$

If a split produces child nodes $c \in \mathcal{C}$, the reduction in impurity is often written as:

$$
\mathrm{Gain} = I(\text{parent}) - \sum_{c \in \mathcal{C}} \frac{n_c}{n} I(c)
$$

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

In regression form, a forest prediction can be viewed as an average over trees:

$$
\hat f_{\mathrm{RF}}(x) = \frac{1}{T}\sum_{t=1}^{T} h_t(x)
$$

### Hyperparameter tuning

Useful tuning parameters often include:

- maximum tree depth
- minimum samples per split or leaf
- number of trees
- number of features considered per split

The practical goal is not to maximize leaderboard score at all costs. The goal is to find a model that improves validation performance without becoming fragile, slow, or hard to explain.

| Hyperparameter | Main effect | Usual bias/variance direction | Practical note |
| --- | --- | --- | --- |
| `max_depth` | limits how many sequential splits are allowed | shallower trees raise bias and reduce variance | one of the fastest ways to calm overfitting |
| `min_samples_leaf` | prevents tiny terminal regions | larger leaves raise bias and reduce variance | especially useful for noisy tabular data |
| `n_estimators` | increases ensemble size | usually lowers variance until returns flatten | primarily a compute-versus-stability trade-off |
| `max_features` | randomizes feature access per split | lower values often reduce correlation and variance | crucial for forest behavior |

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
