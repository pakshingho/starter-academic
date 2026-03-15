---
title: 6. Mini-Project
linktitle: 6. Mini-Project
toc: false
type: docs
date: 2026-03-14
lastmod: 2026-03-14
draft: false
menu:
  tree-based-machine-learning:
    identifier: chapter-project
    weight: 8
weight: 8
---

The best way to internalize the course is to run one small end-to-end project where tree-based models are the main focus rather than just one option among many.

### Project idea: Predict pet adoption time

One natural project for this course is to predict how quickly a pet will be adopted based on structured profile information.

Potential inputs could include:

- age
- breed or mix
- health and vaccination status
- shelter metadata
- fee information
- short text fields or descriptions

This project works well because it can be framed as either:

- a regression problem
- an ordinal or multiclass prediction problem
- a ranking problem if the goal is prioritization

### Minimum deliverables

Your project should include:

1. a clear task definition
2. a dataset description and feature inventory
3. one single-tree baseline
4. one forest-style ensemble
5. one boosting model
6. a short analysis of feature importance and model behavior

### Recommended workflow

#### Step 1: Frame the task

- What exact outcome are you predicting?
- What information is available at prediction time?
- Is the target better treated as numeric, ordinal, or categorical?

#### Step 2: Build a simple tree

Start with a regularized decision tree and use it to learn:

- what the first few important splits look like
- how depth changes fit
- whether the tree already exposes meaningful structure

#### Step 3: Add an ensemble

Train a random forest or ExtraTrees model and compare:

- validation performance
- stability
- feature-importance behavior

#### Step 4: Add a boosting model

Train one of:

- XGBoost
- LightGBM
- CatBoost

Then compare it against the forest rather than assuming it should automatically win.

#### Step 5: Reflect

Write a short decision memo:

- Which model would you ship first?
- Which model is easiest to explain?
- Which feature signals feel trustworthy, and which need more scrutiny?

### Stretch goals

- compare impurity importance versus permutation importance
- inspect whether correlated variables change the interpretation
- add a text-derived feature block
- compare OOB error to cross-validation

### Final checkpoint

If you can explain why your final choice is better than a single tree, you have learned the most important lesson of the course.
