---
title: 4. Matrix Factorization
linktitle: 4. Matrix Factorization
toc: true
type: docs
date: 2026-03-07
lastmod: 2026-03-10
draft: false
math: true
menu:
  recommender-systems:
    weight: 5
weight: 5
---

The reference article emphasizes matrix factorization variants. This remains foundational for data scientists.

<div id="pmf-latent-factors"></div>

### 4.1 [PMF](https://papers.nips.cc/paper_files/paper/2007/hash/d7322ed717dedf1eb4e6e52a37ea7bcd-Abstract.html) / latent factors (explicit feedback)

Model:

$$
\hat r_{ui} = p_u^\top q_i
$$

where user and item embeddings $p_u, q_i \in \mathbb{R}^f$.

Regularized loss over observed pairs $\Omega$:

$$
\begin{aligned}
\min_{P,Q}\ &\sum_{(u,i)\in\Omega} \left(r_{ui} - p_u^\top q_i\right)^2 \\
&+ \lambda\left(\lVert p_u\rVert_2^2 + \lVert q_i\rVert_2^2\right)
\end{aligned}
$$

Optimization:

- SGD (simple, flexible)
- ALS (efficient for large sparse systems)
- Practical implementations are available in the [Surprise library](https://surpriselib.com/) and its [documentation](https://surpriselib.com/#documentation)

With ALS, you alternate between solving for user factors while holding item factors fixed and solving for item factors while holding user factors fixed. That makes large sparse factorization problems easier to optimize in practice.

![Illustration of matrix factorization model](https://d2l.ai/_images/rec-mf.svg)

*Image credit: [Dive into Deep Learning](https://d2l.ai/chapter_recommender-systems/mf.html), CC BY-SA 4.0.*

![Alternating least squares optimization cycle](/media/recommender/rs-als-cycle.svg)

<div id="svd-style-bias-terms"></div>

### 4.2 [SVD](https://doi.org/10.1109/MC.2009.263)-style bias terms

A common extension adds global/user/item bias terms:

$$
\hat r_{ui} = \mu + b_u + b_i + p_u^\top q_i
$$

Biases capture broad effects (strict users, broadly popular items) and usually improve quality.

<div id="implicit-feedback-factorization"></div>

### 4.3 [Implicit-feedback factorization](https://doi.org/10.1109/ICDM.2008.22)

Following the article's logic, implicit events are treated as preference plus confidence.

One common setup:

- Preference: $p_{ui} \in \{0,1\}$ from interaction presence
- Confidence: $c_{ui} = 1 + \alpha \cdot t_{ui}$, where $t_{ui}$ is interaction strength

Objective:

$$
\begin{aligned}
\min_{X,Y}\ &\sum_{u,i} c_{ui}\left(p_{ui} - x_u^\top y_i\right)^2 \\
&+ \lambda\left(\lVert x_u\rVert_2^2 + \lVert y_i\rVert_2^2\right)
\end{aligned}
$$

This is the core weighted-implicit matrix factorization approach used in large-scale recommenders.

The Google course adds an important weighted-matrix-factorization view that is especially useful in industrial retrieval systems. Let $A$ be the feedback matrix and let $\mathrm{obs}$ denote observed interactions. A common weighted objective is:

$$
\begin{aligned}
\min_{U,V}\ &\sum_{(u,i)\in \mathrm{obs}} \left(A_{ui} - \langle U_u, V_i \rangle\right)^2 \\
&+ w_0 \sum_{(u,i)\notin \mathrm{obs}} \langle U_u, V_i \rangle^2
\end{aligned}
$$

Here $w_0$ controls how strongly the model treats unobserved pairs as weak negatives. In practice, this matters a lot: too little weight on unobserved pairs can make the embedding space collapse, while too much weight can wash out true positives. Google also notes that frequent users or popular items can dominate the objective, so observed pairs are often reweighted by user or item frequency.

<div id="evaluation-for-rating-prediction"></div>

### 4.4 Evaluation for rating prediction

For explicit-feedback recommendation, [D2L's matrix factorization section](https://d2l.ai/chapter_recommender-systems/mf.html) uses RMSE as the primary evaluation measure:

$$
\mathrm{RMSE} = \sqrt{\frac{1}{|\mathcal{T}|}\sum_{(u,i)\in\mathcal{T}} \left(r_{ui} - \hat{r}_{ui}\right)^2}
$$

where $\mathcal{T}$ is the evaluation set of observed user-item pairs.

RMSE is appropriate for rating prediction, but it is not sufficient for top-$n$ recommendation because it does not evaluate rank order.

<div id="autorec"></div>

### 4.5 [AutoRec](https://d2l.ai/chapter_recommender-systems/autorec.html) for nonlinear rating prediction

AutoRec extends collaborative filtering with an autoencoder-style reconstruction objective.

- Input is a partially observed user vector or item vector from the rating matrix
- The network reconstructs missing entries through a hidden representation
- Only observed ratings should contribute to the training loss

For item-based AutoRec, D2L writes the input as the $i$th column $R_{\ast i}$ of the rating matrix and reconstructs it with a nonlinear network:

$$
h(R_{\ast i}) = f\left(W\, g\left(V R_{\ast i} + \mu\right) + b\right)
$$

The learning objective minimizes reconstruction error over observed entries only:

$$
\begin{aligned}
\min_{W,V,\mu,b}\ &\sum_{i=1}^{M}\left\lVert R_{\ast i} - h(R_{\ast i}) \right\rVert_{\mathcal{O}}^2 \\
&+ \lambda\left(\lVert W\rVert_F^2 + \lVert V\rVert_F^2\right)
\end{aligned}
$$

Conceptually, AutoRec matters because it is one of the earliest examples in D2L of moving from linear collaborative filtering to nonlinear neural reconstruction for rating prediction.

<div id="personalized-ranking-objectives"></div>

### 4.6 [Personalized ranking objectives](https://d2l.ai/chapter_recommender-systems/ranking.html)

D2L makes an important distinction between rating prediction objectives and ranking objectives.

- Pointwise objectives model one user-item interaction at a time
- Pairwise objectives model relative preference between a positive and a negative item
- Listwise objectives optimize properties of an entire ranked list

| Objective family | Training signal | Pros | Cons | Typical use |
| --- | --- | --- | --- | --- |
| Pointwise | One labeled user-item example at a time | Simple to implement, works with standard regression or classification losses, easy to calibrate as a score or probability | Does not optimize ordering directly, sensitive to label noise and exposure bias, can overfocus on absolute score accuracy | CTR prediction, rating prediction, coarse ranking baselines |
| Pairwise | Positive item compared against a sampled negative item | Better aligned with top-$n$ ranking, efficient for implicit feedback, usually easier to train than full listwise methods | Quality depends heavily on [negative sampling](https://developers.google.com/machine-learning/recommendation/dnn/training#negative_sampling), does not model full-list effects, can miss business constraints beyond pair comparisons | Candidate generation, implicit-feedback retrieval, pre-ranking |
| Listwise | Entire ranked list or slate | Best conceptual match to ranking metrics such as NDCG, can optimize position effects and whole-list quality | More complex objectives, heavier computation, harder data construction and serving alignment | Final-stage ranking, search ranking, slate optimization |

For top-$n$ recommendation from implicit feedback, pairwise objectives are often a better match to the task.

The two core D2L losses are:

1. Bayesian Personalized Ranking (BPR), which encourages the positive item to score above a sampled negative item:

$$
\sum_{(u,i,j)\in D} \ln \sigma\left(\hat{y}_{ui} - \hat{y}_{uj}\right) - \lambda_{\Theta}\lVert \Theta \rVert^2
$$

2. Hinge ranking loss, which pushes the positive item away from the negative item by a margin $m$:

$$
\sum_{(u,i,j)\in D} \max\left(m - \hat{y}_{ui} + \hat{y}_{uj}, 0\right)
$$

These are central for implicit-feedback recommendation because they optimize relative ordering rather than absolute score accuracy.

<div id="svdplusplus-intuition"></div>

### 4.7 [SVD++](https://doi.org/10.1145/1401890.1401944) intuition

SVD++ augments user representation with signals from interacted items, helping when explicit feedback is sparse but interaction history exists.
