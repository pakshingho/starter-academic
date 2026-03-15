---
title: 2. Complexity Control, Bias-Variance, and ExtraTrees
linktitle: 2. Complexity and ExtraTrees
toc: false
type: docs
date: 2026-03-14
lastmod: 2026-03-14
draft: false
math: true
menu:
  tree-based-machine-learning:
    identifier: chapter-complexity
    weight: 4
weight: 4
---

The single biggest weakness of a decision tree is also one of its strengths: it can keep splitting until it explains the training data extremely well. Without control, that flexibility quickly turns into overfitting.

### Learning goals

- regularize trees through direct complexity control
- connect tree behavior to bias and variance
- understand why ExtraTrees adds more randomness

### Complexity control in trees

Tree regularization is unusually concrete. Rather than indirectly penalizing weights, we can often directly limit model complexity through structure.

Common controls include:

- `max_depth`
- `max_leaf_nodes`
- `min_samples_split`
- `min_samples_leaf`
- `min_impurity_decrease`

These parameters bound how finely the tree is allowed to partition the data.

### Pre-pruning and post-pruning

Two broad strategies are:

- pre-pruning: stop growth early when complexity or improvement rules are violated
- post-pruning: grow a larger tree first and then trim it back

In modern practice, pre-pruning is often the more visible default because ensembles reduce the need to obsess over a perfectly pruned single tree. But post-pruning still matters when a single compact tree is the final deployed model.

### Bias and variance

Trees are a natural way to build intuition for bias and variance.

- shallow trees tend to have higher bias and lower variance
- deep trees tend to have lower bias and higher variance

This makes trees a very good teaching example for the bias-variance trade-off: the structure of the model itself is easy to see, and the overfitting behavior can be dramatic.

For squared-error regression, the familiar decomposition is:

$$
\mathbb{E}\left[(y - \hat f(x))^2\right]
=
\mathrm{Bias}\left[\hat f(x)\right]^2
+
\mathrm{Var}\left[\hat f(x)\right]
+
\sigma^2
$$

### Classification versus regression intuition

The cleanest bias-variance decomposition is usually taught for squared-error regression, but the same practical lesson still carries over:

- too little flexibility underfits
- too much flexibility becomes unstable across training samples

That instability is exactly what later ensemble methods try to exploit and average away.

| Control | If increased | Usual effect | Why it matters |
| --- | --- | --- | --- |
| `max_depth` | tree gets shallower | more bias, less variance | coarse but very effective regularization |
| `min_samples_leaf` | leaves get larger | more bias, less variance | prevents tiny overfit regions |
| `max_leaf_nodes` | number of terminal regions shrinks | more bias, less variance | useful when interpretability matters |
| `min_impurity_decrease` | weak splits are blocked | more bias, less variance | discourages chasing tiny local improvements |

### Randomization as a tool

Once we accept that deep trees are unstable, an important idea emerges:

- instability is not only a bug
- instability can become useful if we can average across many unstable learners

That is the conceptual bridge from single trees to ensembles.

### ExtraTrees

Extremely Randomized Trees push this logic further by injecting more randomness into split choice.

Instead of exhaustively optimizing each node over all candidate cut points, ExtraTrees consider randomly generated splits and choose among those.

Why do this?

- it reduces the tendency to overfit each node too precisely
- it makes individual trees more random and less correlated
- it can improve ensemble behavior when many such trees are averaged

This is a good example of a broader ML lesson: a weaker individual learner can still be part of a stronger ensemble if the ensemble is designed well.

### sklearn starting point

The common sklearn entry points are:

- `ExtraTreesClassifier`
- `ExtraTreesRegressor`

These make ExtraTrees easy to compare directly against ordinary trees and random forests.

### Chapter takeaway

Regularization in trees is structural, visible, and intuitive. ExtraTrees shows how randomness can become a deliberate design choice rather than just noise.

### Practice

Imagine a tree that is overfitting badly. Which intervention would you try first, and why:

- shallower depth
- larger minimum leaf size
- fewer leaves
- replacing the single tree with an ensemble

Then continue to [Bootstrapping, Bagging, and Random Forests](../bootstrapping-bagging-and-random-forests/).
