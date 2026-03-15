---
title: 3. KNN, Scaling, and Pipelines
linktitle: 3. KNN and Pipelines
toc: false
type: docs
date: 2026-03-14
lastmod: 2026-03-14
draft: false
math: true
menu:
  tabular-machine-learning:
    identifier: chapter-knn
    weight: 5
weight: 5
---

K-nearest neighbors is one of the best ways to build intuition for tabular ML because it makes the role of distance, representation, and preprocessing painfully clear.

### Learning goals

- understand how KNN makes predictions
- see why feature scaling matters
- treat preprocessing and modeling as one reproducible workflow

### KNN intuition

KNN predicts by looking at nearby observations in feature space.

- for classification, it uses neighboring class labels
- for regression, it uses neighboring target values

The method is conceptually simple, but that simplicity exposes a deeper truth: the model is only as sensible as the feature space you hand it.

### Choosing `k`

Small `k` values tend to be more flexible and more sensitive to noise.
Large `k` values tend to be smoother and more stable, but they can wash out local structure.

That trade-off is why `k` is a tuning parameter rather than a fixed rule.

### Distance metrics

KNN depends on a distance definition. Euclidean distance is common, but not always best.

For two feature vectors $x$ and $x'$, two common choices are:

$$
d_2(x, x') = \sqrt{\sum_{j=1}^{p} (x_j - x'_j)^2},
\qquad
d_1(x, x') = \sum_{j=1}^{p} |x_j - x'_j|
$$

The right metric depends on the data:

- Euclidean distance often works well for continuous standardized features
- Manhattan distance can be more robust in some settings
- domain-specific similarity can matter more than either if the problem is specialized

### Why scaling matters

If one feature is measured on a much larger numeric scale than another, it can dominate the distance calculation even when it should not.

That means a distance-based method can become mostly a measurement-unit detector instead of a pattern detector.

Standardization and min-max scaling are therefore not cosmetic cleanup. They directly change what the model considers close.

Two common feature-level transforms are:

$$
z_j = \frac{x_j - \mu_j}{\sigma_j},
\qquad
x'_j = \frac{x_j - \min(x_j)}{\max(x_j) - \min(x_j)}
$$

![Why scaling changes nearest-neighbor structure](/media/handbooks/tabular/knn-neighborhoods.svg)

| Choice | What it changes | When it is useful | Main caution |
| --- | --- | --- | --- |
| Euclidean distance | emphasizes larger coordinate gaps | standardized continuous features | highly scale-sensitive |
| Manhattan distance | adds absolute coordinate differences | noisier or axis-aligned problems | still sensitive to irrelevant features |
| Standardization | centers and rescales each feature | mixed-unit numeric inputs | sensitive to extreme outliers |
| Min-max scaling | maps each feature into a fixed range | bounded features or distance methods in demos | unstable when future values exceed the old range |

### The curse of dimensionality

As the number of features grows, the notion of proximity gets weaker. Distances become less informative, neighborhoods become sparse, and local comparisons become noisier.

This is one reason why distance-based models can struggle on wide feature sets without careful selection or transformation.

### Pipelines

One of the most important habits in applied ML is to put preprocessing and modeling in the same pipeline.

That gives you:

- consistent transformations across training and validation
- lower risk of leakage
- cleaner experimentation
- a workflow that is easier to deploy and revisit later

Even when KNN is not your final model, it teaches the discipline of keeping scaling, imputation, and model fitting tied together.

### Chapter takeaway

KNN is less about memorizing one algorithm and more about learning the consequences of representation.

### Practice

Take a small dataset and ask:

- Which features would distort distance if left unscaled?
- Which features probably should not be in the neighborhood calculation at all?
- Would a tree-based model avoid some of these issues?

Next: [Feature Engineering and Representation](../feature-engineering-and-representation/).
