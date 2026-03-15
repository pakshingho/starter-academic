---
title: 8. Mini-Project
linktitle: 8. Mini-Project
toc: false
type: docs
date: 2026-03-14
lastmod: 2026-03-14
draft: false
menu:
  tabular-machine-learning:
    identifier: chapter-mini-project
    weight: 10
weight: 10
---

The best way to internalize the course is to run one compact end-to-end project. Keep it small enough to finish, but complete enough to practice the full workflow.

### Project goal

Choose a tabular dataset and solve one clearly scoped prediction task.

Good examples:

- house-price prediction
- loan default classification
- delivery-time regression
- customer churn classification
- marketing response prediction

### Minimum deliverables

Your project should include:

1. a short problem statement
2. a description of the target and candidate features
3. an evaluation plan with metric justification
4. one simple baseline
5. one stronger comparison model
6. a short reflection on feature choices, errors, and trade-offs

### Recommended workflow

#### Step 1: Frame the task

- what decision will this prediction support?
- what data is available at prediction time?
- what would a reasonable naive baseline do?

#### Step 2: Inspect the data

- summary statistics
- missingness profile
- class balance or target distribution
- obvious outliers or suspicious values

#### Step 3: Build a baseline

Start simple.

- logistic or linear regression
- a shallow tree
- a majority-class or mean predictor when appropriate

The point is to learn the baseline difficulty before you earn the right to use a more flexible model.

#### Step 4: Add one stronger model

Pick one:

- random forest
- gradient boosting
- a carefully structured pipeline with engineered features

#### Step 5: Reflect

Write a short decision memo:

- Which model would you actually ship first?
- What is the main source of uncertainty?
- What additional data or labeling would help most?

### Optional stretch goals

- compare precision-recall trade-offs under multiple thresholds
- add a text feature or grouped categorical feature
- use cross-validation instead of one split
- package the workflow in a reproducible sklearn pipeline

### Final checkpoint

If you can clearly explain why your final model is preferable to your baseline, this course has done its job.
