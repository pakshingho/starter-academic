---
title: 5. Feature-Rich Recommendation
linktitle: 5. Feature-Rich Recommendation
toc: false
type: docs
date: 2026-03-07
lastmod: 2026-03-10
draft: false
math: true
menu:
  recommender-systems:
    identifier: chapter-feature-rich
    weight: 6
weight: 6
---

As [D2L section 21.8](https://d2l.ai/chapter_recommender-systems/ctr.html) emphasizes, interaction data is often sparse and noisy. In many production settings, recommendation is better framed as impression-level prediction with rich side features.

<div id="feature-rich-recommendation-and-ctr"></div>

### 5.1 Feature-rich recommendation and CTR

Feature-rich recommendation is common in ads, feeds, and product surfaces.

- Labels are often binary, such as click vs no click
- Inputs include many categorical fields rather than only user and item IDs
- The D2L advertising example uses 34 fields, with the first column as the click label and the remaining columns as categorical features

This setting is different from classic matrix factorization because the goal is often click-through rate prediction over impression-level examples rather than rating reconstruction.

CTR is defined as:

$$
\mathrm{CTR} = \frac{\mathrm{clicks}}{\mathrm{impressions}} \times 100\%
$$

<div id="factorization-machines"></div>

### 5.2 [Factorization machines](https://d2l.ai/chapter_recommender-systems/fm.html)

Factorization machines are one of the most important bridges between collaborative filtering and feature-rich prediction.

For a feature vector $x \in \mathbb{R}^{d}$, the two-way FM model is:

$$
\hat{y}(x) = w_0 + \sum_{i=1}^{d} w_i x_i + \sum_{i=1}^{d}\sum_{j=i+1}^{d} \langle v_i, v_j \rangle x_i x_j
$$

Interpretation:

- The first two terms are linear
- The last term models pairwise feature interactions
- If one feature encodes user identity and another encodes item identity, the interaction term reduces to a collaborative-filtering-style embedding interaction

D2L also highlights the computational trick that reduces FM interaction cost from $\mathcal{O}(kd^2)$ to $\mathcal{O}(kd)$, which is why FM remains practical on high-dimensional sparse data.

<div id="deepfm"></div>

### 5.3 [DeepFM](https://d2l.ai/chapter_recommender-systems/deepfm.html)

DeepFM extends FM by combining low-order feature interactions from FM with high-order nonlinear interactions from a deep network.

- The FM branch captures low-order interactions
- The deep branch uses shared embeddings and an MLP to learn higher-order interactions
- Both outputs are combined into a final prediction

D2L presents the DeepFM prediction as:

$$
\hat{y} = \sigma\left(\hat{y}^{(FM)} + \hat{y}^{(DNN)}\right)
$$

DeepFM is especially useful when simple pairwise interactions are not expressive enough, but you still want the inductive bias of factorization-based feature interaction.

![DeepFM architecture](https://d2l.ai/_images/rec-deepfm.svg)

*Image credit: [Dive into Deep Learning](https://d2l.ai/chapter_recommender-systems/deepfm.html), CC BY-SA 4.0.*

<div id="hybrid-factorization-with-features"></div>

### 5.4 Hybrid factorization with features ([LightFM](https://arxiv.org/abs/1507.08439)-style)

- User embedding = sum of user-feature embeddings
- Item embedding = sum of item-feature embeddings
- Score uses dot product (+ optional biases)

Why data scientists use this:

- Stronger cold-start behavior
- Smooth path between collaborative and content-based modeling
- Practical when metadata quality is reasonable

The Google course makes the same idea concrete from a matrix-factorization angle: you can augment the original interaction matrix with user-feature and item-feature blocks, then factorize the augmented matrix so that side features learn embeddings alongside users and items. Conceptually, this is one of the cleanest bridges between classic WALS-style recommender systems and modern hybrid feature-based models.
