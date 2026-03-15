---
title: 1. Workflow and Problem Framing
linktitle: 1. Workflow
toc: false
type: docs
date: 2026-03-14
lastmod: 2026-03-14
draft: false
math: true
menu:
  tabular-machine-learning:
    identifier: chapter-workflow
    weight: 3
weight: 3
---

Strong tabular ML projects usually fail or succeed before the model is even trained. The main early job is to frame the task correctly and understand what kind of learning problem you actually have.

### Learning goals

- distinguish common ML task types
- connect a business question to the right prediction target
- understand the basic machine learning lifecycle

### Common task types

For tabular data, a practical first taxonomy is:

- classification: predict a category such as fraud or not fraud
- regression: predict a numeric outcome such as price, demand, or duration
- ranking: order candidates by likely relevance or utility
- recommendation: suggest items likely to matter to a user or context
- clustering: group similar observations without labeled outcomes
- anomaly detection: surface unusual patterns or rare events

The important point is that similar datasets can support very different tasks. A customer table might power churn classification, revenue regression, segment discovery, or next-best-action ranking depending on the objective.

| Task type | Typical output | Example decision | Example metric |
| --- | --- | --- | --- |
| Classification | class label or probability | approve, reject, flag, or route | accuracy, precision, recall, F1, AUC |
| Regression | numeric value | price, demand, time, or risk estimate | MAE, RMSE |
| Ranking | ordered list | which candidate should be shown first | NDCG, MAP, recall@k |
| Clustering | group assignment | how to segment or explore behavior | silhouette score, downstream usefulness |
| Anomaly detection | rarity score or alert | what to escalate for review | precision at top alerts, recall on known events |

### Supervised and unsupervised learning

Supervised learning means you have an outcome label and want to learn a mapping from features to that label.

Unsupervised learning means you do not have a target label and instead want to discover structure in the data itself.

This distinction matters because it changes:

- how the dataset is prepared
- what success looks like
- what kind of evaluation is possible

A compact supervised-learning view is:

$$
\hat y = f(x), \qquad
f^* = \arg\min_f \mathbb{E}[\ell(y, f(x))]
$$

The modeling question is not only what class of function $f$ to use, but what loss $\ell$ corresponds to the decision you actually care about.

### A practical workflow

Most tabular ML work can be organized into a repeatable lifecycle:

1. define the prediction task and the decision it supports
2. identify features, labels, and data availability constraints
3. create training, validation, and test strategy
4. establish simple baselines
5. iterate on preprocessing, features, and models
6. compare results with the metric that actually matters
7. package the workflow so it can be reproduced and monitored

This lifecycle is simple on purpose. It helps prevent the common failure mode of jumping from raw data straight to model training.

![A practical tabular ML workflow from framing through monitoring](/media/handbooks/tabular/workflow-lifecycle.svg)

### Problem framing questions to ask early

Use these questions before building anything:

- What exactly is the target?
- At prediction time, what information is actually available?
- Is the target stable, delayed, noisy, or partially observed?
- Are we predicting once, repeatedly, or in real time?
- What baseline would be surprisingly hard to beat?

These questions often reveal leakage, unrealistic assumptions, or a mismatch between the modeling target and the real-world decision.

### Applied example mindset

Suppose we are working on food delivery timing. That single domain could become:

- regression if the goal is estimated delivery time
- classification if the goal is whether an order will be late
- ranking if the goal is which courier to assign first

Same domain, different objective, different setup.

### Chapter takeaway

Model choice is not the first decision. Problem framing is.

A well-framed simple model usually beats a poorly framed advanced one.

### Practice

Pick one dataset you know well and write down:

- one classification task
- one regression task
- one unsupervised task

If you can do that clearly, you are ready for [Evaluation and Data Quality](../evaluation-and-data-quality/).
