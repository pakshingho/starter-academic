---
title: 4. Proximities and Feature Importance
linktitle: 4. Proximities and Importance
toc: false
type: docs
date: 2026-03-14
lastmod: 2026-03-14
draft: false
math: true
menu:
  tree-based-machine-learning:
    identifier: chapter-interpretation
    weight: 6
weight: 6
---

Random forests are usually taught as prediction machines, but they are also useful as nonlinear representations of data. That broader view makes proximities and feature-importance methods much easier to understand.

### Learning goals

- understand forest proximities as a similarity signal
- use tree-based feature importance more critically
- distinguish impurity importance from permutation importance

### Forests as feature transformers

A random forest can be viewed as mapping each input example into a set of leaf positions across many trees.

That perspective matters because examples that land together repeatedly in leaves have a meaningful learned similarity, even if that similarity was hard to express in the original feature space.

### Proximities

Forest proximities are built from the idea of co-occurrence:

- if two points often fall into the same leaves across the forest, they are treated as similar
- if they rarely do, they are treated as dissimilar

This makes proximities useful for:

- visualization
- clustering intuition
- dimensionality reduction pipelines
- generating nonlinear features for downstream models

This is one of the more underrated reasons random forests are interesting beyond pure prediction accuracy.

One simple proximity definition is:

$$
\mathrm{prox}(i, j) = \frac{1}{T}\sum_{t=1}^{T} \mathbf{1}\{\ell_t(x_i) = \ell_t(x_j)\}
$$

where $\ell_t(x)$ is the terminal leaf reached by point $x$ in tree $t$.

### Why proximities can help

The forest is effectively learning a task-aware representation of the data.

That means the induced similarity can reflect label-relevant structure better than plain Euclidean distance in the original feature space.

In practice, this can make methods such as MDS, PCA on transformed representations, or downstream clustering reveal patterns that were harder to see before.

### Feature importance in a single tree

Trees have a major interpretability advantage: split structure makes it possible to attribute part of the prediction logic to particular variables.

A common approach is impurity-based importance:

- sum how much each feature reduces impurity when used in splits
- aggregate those reductions through the tree or forest

This is simple and useful, especially for exploratory analysis.

In shorthand, an impurity-based feature score can be written as:

$$
I_j = \sum_{t \in \text{splits on } j} \frac{n_t}{n}\Delta I_t
$$

### Why feature importance can mislead

Impurity-based importance is not automatically trustworthy.

Common issues include:

- instability from one tree to another
- bias toward variables that offer many split opportunities
- distortion when predictors are correlated

Forests help stabilize the picture, but they do not remove every interpretability problem.

### Permutation importance

Permutation importance takes a different approach:

1. measure model performance on validation or out-of-bag data
2. shuffle one feature
3. measure how much performance drops

If shuffling a feature hurts performance substantially, the model depended heavily on it.

A compact definition is:

$$
\mathrm{PI}_j = \mathrm{Score}(D) - \mathrm{Score}(\pi_j(D))
$$

where $\pi_j(D)$ is the evaluation data after feature $j$ has been permuted.

This is attractive because it is:

- model-agnostic
- tied directly to predictive performance
- often easier to interpret than impurity sums

The trade-off is speed: permutation importance can be expensive, especially for large ensembles.

![A forest can emit learned similarities and importance summaries](/media/handbooks/tree/forest-signals.svg)

| Signal | Strength | Main failure mode | Best use |
| --- | --- | --- | --- |
| Impurity importance | fast and built into tree training | favors features with many split opportunities | exploratory ranking |
| Permutation importance | tied to predictive degradation | can blur under correlated predictors | validation-time interpretation |
| Proximity matrix | reveals learned similarity structure | less direct to explain to nontechnical audiences | visualization, clustering, downstream features |

### Practical interpretability rule

Treat feature importance as evidence, not verdict.

A good workflow is to compare:

- impurity importance
- permutation importance
- domain knowledge
- simple ablations or alternative model checks

When these disagree sharply, that disagreement is informative.

### Chapter takeaway

Forests can be used to learn useful similarities and importance signals, but those signals still need careful interpretation.

### Practice

For a feature-rich dataset, ask:

- Which variable would rank highly by impurity importance just because it offers many possible splits?
- Which variable would you trust more if only permutation importance elevated it?
- Where might proximities reveal structure that raw feature space hides?

Next: [Boosting and Modern Tree Libraries](../boosting-and-modern-tree-libraries/).
