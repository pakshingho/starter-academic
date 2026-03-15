---
title: 4. Feature Engineering and Representation
linktitle: 4. Features
toc: false
type: docs
date: 2026-03-14
lastmod: 2026-03-14
draft: false
math: true
menu:
  tabular-machine-learning:
    identifier: chapter-features
    weight: 6
weight: 6
---

Feature engineering is often where the biggest gains in tabular ML come from. Better features can make simple models much stronger and make complex models easier to train well.

### Learning goals

- distinguish feature selection, construction, and extraction
- represent categorical and text data in model-friendly ways
- think about features as a modeling language rather than just raw columns

### Three useful categories

Feature engineering usually falls into three broad buckets:

- feature selection: keep the most useful signals and remove distracting ones
- feature construction: build new variables from existing ones
- feature extraction: transform raw data into a more model-friendly representation

Examples:

- interaction terms between price and discount
- ratios such as revenue per active user
- grouped age bands or tenure buckets
- one-hot encoded category indicators

| Column pattern | Useful transformation | Why it helps | Main caution |
| --- | --- | --- | --- |
| nominal category | one-hot or grouped encoding | avoids fake numeric order | can explode dimensionality |
| ordered category | ordinal encoding | preserves meaningful order | only valid when order is real |
| sparse text field | counts or TF-IDF | turns words into structured signals | easy to leak labels through vocabulary choices |
| skewed numeric variable | log, bucket, or winsorized transform | stabilizes scale and outliers | can make interpretation less direct |

### Categorical variables

Many tabular datasets contain categories with no natural numeric meaning. A model still needs them represented numerically.

Useful options include:

- ordinal encoding when categories have a meaningful order
- one-hot encoding when categories are nominal and order should not be implied
- grouped or hierarchical encoding when categories are too numerous or too sparse
- target-based encodings when used carefully and with leakage awareness

The main caution is simple: numeric codes can accidentally imply rank or distance where none exists.

For a nominal category $c$ with $K$ possible values, one-hot encoding creates a vector $e(c) \in \{0,1\}^K$ where

$$
e_k(c) = \mathbf{1}\{c = k\}
$$

### High-cardinality features

Some categorical variables, such as zip codes, product IDs, or job titles, can explode the feature space if encoded naively.

In those cases, common strategies include:

- grouping rare categories
- mapping to a hierarchy
- replacing values with a signal that reflects the target or behavior pattern

There is no universal rule. The right approach depends on whether the category is mostly identity, geography, behavior, or something else.

### Text as a tabular feature

Text fields often appear inside otherwise tabular datasets: product titles, support messages, free-form descriptions, comments, notes.

A practical preprocessing path is:

1. clean obvious formatting issues
2. tokenize text into units
3. remove or keep stop words based on the task
4. optionally stem or normalize
5. vectorize with counts or TF-IDF

This turns free-form text into structured numeric features that can join the rest of the table.

A common TF-IDF scoring pattern is:

$$
\mathrm{tfidf}(t, d) = \mathrm{tf}(t, d) \cdot \log\left(\frac{N}{\mathrm{df}(t)}\right)
$$

![A pipeline from raw columns through transformations to a model matrix](/media/handbooks/tabular/feature-pipeline.svg)

### Representation choices affect models

Feature engineering is not model-agnostic.

- linear models benefit from thoughtful transformations and explicit interactions
- distance-based models are sensitive to scale and sparsity
- tree-based models often tolerate raw nonlinear relationships better

This is why feature engineering and model choice should be treated as a coupled design decision.

### Practical heuristic

Before inventing many new features, ask:

- What would a skilled human use to make this prediction?
- What information is visible at prediction time?
- What transformation would make the relevant pattern easier for the model to detect?

Those questions often lead to better features than blindly generating large numbers of them.

### Chapter takeaway

Raw data is rarely the best language for a model. Feature engineering translates the problem into a form the model can actually use.

### Practice

Take one dataset and list:

- two raw columns you would keep as-is
- two columns you would transform
- one new feature you would construct from domain intuition

Then move to [Tree-Based Models and Tuning](../tree-based-models-and-tuning/).
