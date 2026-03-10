---
title: 2. Explicit vs. Implicit Feedback
linktitle: 2. Explicit vs. Implicit
toc: false
type: docs
date: 2026-03-07
lastmod: 2026-03-10
draft: false
math: true
menu:
  recommender-systems:
    identifier: chapter-explicit-implicit
    weight: 3
weight: 3
---

As in the reference article, the first key split is the type of supervision.

<div id="explicit-feedback"></div>

### 2.1 Explicit feedback

Examples:

- Star ratings
- Like/dislike labels
- Written reviews with sentiment scores

Pros:

- Direct preference signal
- Easier to define regression-style losses

Cons:

- Sparse in most real products
- Selection bias (only some users rate)

<div id="implicit-feedback"></div>

### 2.2 Implicit feedback

Examples:

- Clicks
- Watch time
- Purchases
- Add-to-cart, save, dwell

Pros:

- High volume
- Better behavioral coverage

Cons:

- Noisy preference proxy
- Requires careful [negative sampling](https://developers.google.com/machine-learning/recommendation/dnn/training#negative_sampling) and weighting

In both cases, interactions define a sparse user-item matrix with entries over user-item pairs $(u, i)$.

![Explicit versus implicit feedback comparison](/media/recommender/rs-explicit-vs-implicit.svg)

![User-item matrix examples for explicit and implicit data](/media/recommender/rs-user-item-matrix.svg)

<div id="recommendation-tasks"></div>

### 2.3 Recommendation tasks

Following [D2L Chapter 21](https://d2l.ai/chapter_recommender-systems/index.html), it helps to separate recommendation work by task:

- Rating prediction: estimate a user's explicit rating for an item
- Top-$n$ recommendation: rank candidate items and return a personalized list
- Sequence-aware recommendation: use ordered behavior and timestamps
- Click-through rate prediction: predict whether a shown item or ad will be clicked
- Cold-start recommendation: serve new users or new items when history is limited

These tasks overlap, but they drive different labels, evaluation protocols, and model choices.

<div id="benchmark-datasets-and-split-strategy"></div>

### 2.4 Benchmark datasets and split strategy

The [MovieLens 100K dataset](https://d2l.ai/chapter_recommender-systems/movielens.html) remains the standard conceptual benchmark for explicit-feedback recommendation.

- 100,000 ratings
- 943 users
- 1,682 movies
- Ratings from 1 to 5
- Approximate matrix sparsity of 93.7%

Two split strategies from D2L are especially useful in practice:

1. Random split for rating prediction and general offline evaluation
2. Sequence-aware split, where the most recent interaction is held out per user

This distinction matters because sequence-aware recommendation should be evaluated with a chronological split, not a random one.
