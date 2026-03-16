---
title: 3. Machine Learning Essentials
linktitle: 3. Machine Learning
toc: false
type: docs
date: 2026-03-15
lastmod: 2026-03-15
draft: false
math: true
menu:
  data-science-foundations:
    identifier: chapter-ml
    weight: 5
weight: 5
---

Machine learning is one tool inside data science, not the whole job. The minimum useful skill is not knowing every model family. It is knowing how to frame a prediction problem, build a strong baseline, evaluate honestly, and recognize when a model is not trustworthy.

### Start with the problem type

The first split is usually:

- regression: predict a continuous value
- classification: predict a category or probability
- ranking: order items by relevance or value

Before picking a model, make sure the target is defined clearly and available at prediction time.

### The minimum viable modeling workflow

1. define the target, decision, and metric
2. choose a split strategy that matches reality
3. build a simple baseline
4. compare stronger models only after the baseline is solid
5. inspect errors, calibration, and leakage risks
6. monitor after deployment because data changes over time

The baseline matters more than many new practitioners expect. A well-defined baseline exposes whether additional complexity is actually earning its keep.

### General objective: fit the data without memorizing noise

A broad way to write many supervised learning problems is:

$$
\min_{\theta}
\frac{1}{n}\sum_{i=1}^{n}\ell\left(y_i, f_{\theta}(x_i)\right)
+
\lambda \Omega(\theta)
$$

The first term rewards fit to the training data. The second term regularizes complexity.

That trade-off is the center of practical ML.

### Bias, variance, and overfitting

- high bias: model is too rigid and misses important structure
- high variance: model is too sensitive to quirks of the training sample
- overfitting: training performance looks strong but generalization degrades

This is why you should not judge a model only by how well it fits the training set.

### Model families worth knowing first

| Model family | Why it matters | Main caution |
| --- | --- | --- |
| linear and logistic regression | fast, interpretable, strong baseline | misses nonlinear structure unless features help |
| decision trees and tree ensembles | strong default for many tabular problems | can overfit or hide leakage behind high accuracy |
| nearest neighbors | builds intuition for similarity-based prediction | sensitive to scaling and irrelevant features |
| clustering and PCA | useful for structure discovery and compression | easy to over-interpret unsupervised outputs |

For many structured-data tasks, tree ensembles and regularized linear models are better defaults than deep learning.

### Evaluation is part of modeling

Pick metrics that match the decision:

- MAE or RMSE for regression
- log loss, precision, recall, ROC-AUC, or PR-AUC for classification depending on cost structure
- ranking metrics for ordering problems

Also choose the right split:

- random split for stable iid-style data
- time-based split for forecasting or delayed outcomes
- group-aware split when related entities would otherwise leak across folds

### Cross-validation and tuning

Cross-validation helps estimate how sensitive performance is to the exact split. Hyperparameter tuning helps search model settings. Neither rescues a badly framed problem.

Treat both as support tools, not substitutes for problem understanding.

### Interpretability, calibration, and error analysis

A model that predicts probabilities should also be calibrated well enough that predicted probabilities mean what they appear to mean.

Error analysis should ask:

- which segments perform poorly
- whether the target or features are stale
- whether the model is exploiting leakage or proxies
- whether class imbalance is distorting the headline metric

### What to remove from your mental checklist

You do not need to memorize every derivation, every kernel trick, or every neural architecture to be effective early on.

You do need to know how to answer these questions:

- What is the baseline?
- What would leakage look like here?
- How could this fail after deployment?
- Is a simpler model already good enough?

### Chapter takeaway

Good machine learning practice is usually conservative before it is clever.

Next: [SQL and Data Modeling](../sql-and-data-modeling/).
