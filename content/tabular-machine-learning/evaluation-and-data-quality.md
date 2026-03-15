---
title: 2. Evaluation and Data Quality
linktitle: 2. Evaluation
toc: false
type: docs
date: 2026-03-14
lastmod: 2026-03-14
draft: false
math: true
menu:
  tabular-machine-learning:
    identifier: chapter-evaluation
    weight: 4
weight: 4
---

Evaluation is where many tabular ML projects quietly go wrong. A model can look strong on paper and still be misleading if the split strategy, metric, or data-quality assumptions are poor.

### Learning goals

- choose metrics that match the task
- use train, validation, and test data correctly
- recognize overfitting, leakage, imbalance, and missing-data issues

### Match the metric to the task

For regression, common choices include:

- mean absolute error when average miss size is easy to interpret
- mean squared error when larger mistakes should be penalized more strongly
- root mean squared error when you want the metric back on the original unit scale

For classification, common choices include:

- accuracy when classes are balanced and mistakes have similar cost
- precision when false positives are expensive
- recall when false negatives are expensive
- F1 when precision and recall both matter and you want a single summary

The main discipline is not to choose a metric because it is familiar. Choose it because it reflects the downstream cost of being wrong.

A few core formulas are worth recognizing:

$$
\mathrm{MAE} = \frac{1}{n}\sum_{i=1}^{n} |y_i - \hat y_i|,
\qquad
\mathrm{RMSE} = \sqrt{\frac{1}{n}\sum_{i=1}^{n} (y_i - \hat y_i)^2}
$$

$$
\mathrm{Precision} = \frac{TP}{TP + FP},
\qquad
\mathrm{Recall} = \frac{TP}{TP + FN},
\qquad
F_1 = \frac{2 \cdot \mathrm{Precision} \cdot \mathrm{Recall}}{\mathrm{Precision} + \mathrm{Recall}}
$$

| Metric | Best fit | Main caution |
| --- | --- | --- |
| Accuracy | balanced classification with similar error costs | can look good on imbalanced tasks for the wrong reasons |
| Precision | costly false positives | may hide missed positives |
| Recall | costly false negatives | may encourage too many alerts |
| F1 | need one summary for precision and recall | hides the threshold trade-off and business context |
| MAE | easy-to-interpret average miss size | treats all errors linearly |
| RMSE | larger misses should hurt more | can be dominated by a few large outliers |

### Train, validation, and test

A useful mental model is:

- training set: fit the model
- validation set: compare modeling choices
- test set: estimate final generalization quality only after the workflow is fixed

If the same data keeps influencing every modeling decision, the test set stops behaving like truly unseen data.

Cross-validation is especially useful when data is limited or when model performance is sensitive to the specific split.

![Roles of train, validation, and test data in one workflow](/media/handbooks/tabular/train-validation-test.svg)

### Underfitting and overfitting

Underfitting means the model is too simple or poorly specified to capture meaningful structure.

Overfitting means the model has adapted too much to quirks of the training data and no longer generalizes well.

Common warning signs of overfitting:

- training performance far better than validation performance
- unstable results across folds or random seeds
- large gains after increasingly specific feature tweaks but weak out-of-sample improvement

### Exploratory data analysis

Before training, inspect the data directly.

Useful first passes include:

- descriptive statistics
- feature distributions
- scatterplots for important numeric relationships
- correlation matrices
- target balance checks

EDA is not a separate academic ritual. It is how you discover scale differences, outliers, impossible values, and target imbalance before those issues become modeling mistakes.

### Missing data

Missingness is rarely just a technical nuisance. Sometimes the fact that a value is missing is itself informative.

A practical workflow is:

- quantify how much data is missing and where
- decide whether to drop, impute, or explicitly encode missingness
- keep the choice consistent inside the model pipeline

Simple methods such as mean, median, or most-frequent imputation are often strong enough to start with. What matters most is whether the method is applied correctly and reproducibly.

### Imbalanced data

If one class is rare, accuracy can become actively misleading. A model that predicts the majority class almost all the time may still look numerically strong while being operationally useless.

In those settings:

- track precision and recall
- inspect confusion matrices
- compare against naive baselines
- think carefully about threshold choice

### Chapter takeaway

Reliable evaluation is not a reporting step. It is part of model design.

### Practice

Take a real or hypothetical classification problem and answer:

- Which mistake is worse: a false positive or a false negative?
- Which metric should matter most?
- What would a bad split strategy accidentally leak?

Then continue to [KNN, Scaling, and Pipelines](../knn-scaling-and-pipelines/).
