---
title: 1. Decision Trees, CART, and Split Criteria
linktitle: 1. Trees and CART
toc: false
type: docs
date: 2026-03-14
lastmod: 2026-03-14
draft: false
math: true
menu:
  tree-based-machine-learning:
    identifier: chapter-trees
    weight: 3
weight: 3
---

Decision trees are often introduced as simple flowcharts, but that simplicity hides an important idea: a tree is a greedy procedure for partitioning feature space into regions that are as prediction-friendly as possible.

### Learning goals

- understand how a decision tree makes predictions
- connect impurity to split quality
- see how CART-style training works in practice

### A decision tree as a sequence of questions

A tree predicts by asking a sequence of feature-based questions:

- is income above a threshold?
- is tenure below a threshold?
- is category equal to a value?

Each question splits the data into smaller groups. The hope is that each child group is easier to predict than the parent group.

### Why impurity matters

The key question at each node is not just whether we can split, but whether the split improves the predictive structure of the data.

For classification, the usual notion is impurity:

- high impurity means classes are mixed together
- low impurity means classes are more homogeneous

Common measures include:

- Gini impurity
- entropy

In practice, both tend to behave similarly, and Gini is often preferred because it is computationally simpler.

For class probabilities $p_1, \dots, p_K$, the two most common criteria are:

$$
\mathrm{Gini}(p) = 1 - \sum_{k=1}^{K} p_k^2,
\qquad
H(p) = -\sum_{k=1}^{K} p_k \log p_k
$$

### Regression trees

For regression, the same idea appears through variance reduction or mean-squared-error-style criteria.

The tree tries to create child regions where the target is more stable and easier to summarize with a local prediction.

One common regression-node criterion is:

$$
\mathrm{MSE\ at\ node} = \frac{1}{n}\sum_{i=1}^{n}(y_i - \bar y)^2
$$

### Information gain

One of the cleanest ways to think about tree learning is:

- start with impurity in the parent node
- compute the weighted impurity of the child nodes
- prefer the split that reduces impurity the most

That reduction is often described as information gain.

$$
\mathrm{Gain} = I(\text{parent}) - \sum_{c \in \mathcal{C}} \frac{n_c}{n} I(c)
$$

| Criterion | Typical use | What it prefers | Practical note |
| --- | --- | --- | --- |
| Gini impurity | classification | purer class distributions | often the default in CART implementations |
| Entropy | classification | larger information reduction | slightly heavier computationally, often similar in practice |
| MSE / variance reduction | regression | tighter numeric outcomes inside each child | naturally aligns with regression trees |

### The CART training loop

The CART family of algorithms gives a practical recipe:

1. consider candidate splits at the current node
2. score them with the chosen impurity or loss criterion
3. pick the best available split
4. recurse on the resulting child nodes
5. stop when a complexity rule or lack-of-improvement rule says to stop

The word greedy matters here. Trees optimize one node at a time, not the full global structure jointly.

![Recursive splits in feature space and their equivalent tree view](/media/handbooks/tree/cart-partition.svg)

### Variable types and invariances

Trees are appealing partly because they handle feature types in a forgiving way.

- numeric features can be split by thresholds
- categorical features can be encoded or handled by library-specific category logic
- monotone rescalings often do not matter the same way they do for distance-based models

This is one reason trees usually demand less feature scaling than methods like KNN or linear models with strong regularization sensitivity.

### A note on computational complexity

Trees feel simple conceptually, but training still depends on:

- how many candidate splits must be checked
- how many features are available
- how deep the tree is allowed to grow

That is why naive tree growth can become computationally expensive and statistically dangerous at the same time.

### sklearn starting point

For practice, the most direct implementations are:

- `sklearn.tree.DecisionTreeClassifier`
- `sklearn.tree.DecisionTreeRegressor`

These are excellent tools for learning because they expose the main regularization knobs clearly.

### Chapter takeaway

Decision trees are best understood as greedy partitioning algorithms that trade simplicity of structure for flexibility of decision boundaries.

### Practice

For a dataset you know, answer:

- What feature would you expect a tree to split on first?
- Would that first split be driven by class separation or reduction in numeric variance?
- What feature type would make splitting awkward?

Next: [Complexity Control, Bias-Variance, and ExtraTrees](../complexity-control-bias-variance-and-extratrees/).
