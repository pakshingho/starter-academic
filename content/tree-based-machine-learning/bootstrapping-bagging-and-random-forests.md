---
title: 3. Bootstrapping, Bagging, and Random Forests
linktitle: 3. Bagging and Forests
toc: false
type: docs
date: 2026-03-14
lastmod: 2026-03-14
draft: false
math: true
menu:
  tree-based-machine-learning:
    identifier: chapter-forests
    weight: 5
weight: 5
---

The move from a single decision tree to a random forest is one of the clearest success stories in machine learning. The idea is elegant: unstable trees become much stronger when we average over many of them under the right kind of randomness.

### Learning goals

- understand the role of bootstrap sampling
- see how bagging reduces variance
- understand why random forests outperform plain bagged trees

### Bootstrapping

Bootstrapping creates resampled datasets by sampling with replacement from the original dataset.

Why is this useful in machine learning?

- it simulates dataset fluctuation
- it creates multiple slightly different training sets
- it lets unstable learners vary across samples

That variation is exactly what bagging later aggregates.

In a size-$n$ bootstrap sample, the expected fraction of unique observations is:

$$
1 - \left(1 - \frac{1}{n}\right)^n \approx 1 - e^{-1} \approx 0.632
$$

### Bagging

Bagging, or bootstrap aggregating, trains multiple models on bootstrap samples and combines their predictions.

- for regression: average the predictions
- for classification: vote across the predictions

Bagging is especially effective when the base learner is unstable. Deep decision trees are a classic example.

For regression, the ensemble prediction is often written as:

$$
\hat f_{\mathrm{bag}}(x) = \frac{1}{T}\sum_{t=1}^{T} h_t(x)
$$

### Out-of-bag error

Bootstrap samples leave some observations out of each training draw. Those held-out points create a natural evaluation signal.

Out-of-bag error works by:

- predicting each observation using only models that did not train on it
- aggregating those predictions
- measuring error on that aggregated prediction

This gives bagged tree models a built-in approximate generalization check without requiring a separate validation split every time.

The approximate chance that an observation is left out of one bootstrap sample is:

$$
\left(1 - \frac{1}{n}\right)^n \approx e^{-1} \approx 0.368
$$

### Why plain bagging is not enough

If all trees see nearly the same strong features, they can still become too correlated. Averaging correlated models helps less than averaging more independent ones.

That motivates the next step: randomize features as well as data.

### Random forests

Random forests add feature randomness on top of bootstrap randomness.

The core idea is:

- each tree gets different data
- each tree or node sees only a subset of candidate features
- the resulting trees become less correlated
- averaging then becomes more powerful

This is why random forests usually outperform plain bagged trees.

| Method | Source of randomness | Main benefit | Main trade-off |
| --- | --- | --- | --- |
| Bagging | bootstrap samples | variance reduction from averaging | trees can still stay highly correlated |
| Random forest | bootstrap samples plus feature subsampling | lower correlation and stronger ensemble averaging | more hyperparameters to reason about |
| ExtraTrees | feature randomness plus random split thresholds | very decorrelated trees and fast split search | individual trees are weaker and less interpretable |

### Variants and implementation choices

There is more than one way to define a forest.

Common variants differ in:

- whether feature subsets are chosen per tree or per node
- whether the split itself is optimized fully or partly randomized
- whether ExtraTrees-style randomization is combined with forest logic

This matters because "random forest" in practice is really a family of related design choices rather than one rigid algorithm.

### Practical tuning knobs

Important controls usually include:

- `n_estimators`
- `max_features`
- tree depth and leaf constraints
- bootstrap versus non-bootstrap sampling
- whether out-of-bag scoring is enabled

The main tuning question is not only "what gets the best score?" but also "what level of randomness gives a stable and efficient ensemble?"

### Why forests became such strong defaults

Random forests are popular because they often combine:

- strong predictive performance
- modest preprocessing requirements
- resilience to noisy features
- usable feature-importance tools
- relatively sane default behavior

That makes them one of the most dependable serious baselines in applied tabular ML.

### Chapter takeaway

Random forests win not because each tree is perfect, but because the ensemble is designed to make tree instability useful rather than harmful.

### Practice

For a dataset you know, ask:

- What makes a single tree unstable here?
- Would OOB error be a useful validation shortcut?
- Which features might cause trees to correlate too strongly?

Next: [Proximities and Feature Importance](../proximities-and-feature-importance/).
