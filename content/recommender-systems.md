---
title: Recommender Systems
date: 2026-03-07
type: page
math: true
---

This page is a practical and math-grounded guide to recommender systems for readers with undergraduate-level linear algebra, probability, and optimization.

Reference article that inspired this write-up (content here is fully rewritten and expanded):  
<https://towardsdatascience.com/recommender-systems-a-complete-guide-to-machine-learning-models-96d3f94ea748/>

## 1. Problem Setup

At a high level, recommendation is a ranking problem:

- You have users `u` and items `i` (movies, products, videos, jobs, etc.).
- You observe interactions `r_ui` (rating, click, watch time, purchase, skip).
- For each user, you want to rank candidate items by predicted utility.

Typical objective:

- Predict `\hat{r}_{ui}` or a ranking score `s(u, i)`.
- Return top-`K` items that maximize user value and business value.

## 2. Data You Usually Have

Most production systems combine:

- `User features`: age band, geography, device, intent signals.
- `Item features`: category, text, metadata, embeddings.
- `Context features`: time, weekday, session state, placement.
- `Interaction logs`: impressions, clicks, ratings, conversions.

Two common feedback types:

- `Explicit feedback`: stars/ratings (dense signal, usually sparse data).
- `Implicit feedback`: clicks/views/purchases (abundant but noisy).

## 3. Baselines Before ML

Always start with simple baselines:

1. Most popular items (global or by segment).
2. Recently trending items.
3. Rule-based recommendations (category affinity, co-viewed).

Why this matters:

- Baselines are easy to deploy.
- They reveal data issues quickly.
- Strong baselines prevent over-engineering.

## 4. Content-Based Filtering

Idea: recommend items similar to what a user liked before.

Pipeline:

1. Build an item vector `x_i` from metadata/text/image.
2. Build a user profile vector `p_u` (average of liked-item vectors).
3. Score by similarity, commonly cosine:

`\[
\text{cosine}(p_u, x_i) = \frac{p_u^\top x_i}{\|p_u\| \|x_i\|}
\]`

Strengths:

- Works for new items (solves item cold start better).
- Explainable via item features.

Weaknesses:

- Limited discovery; may over-specialize.
- Depends heavily on feature quality.

## 5. Collaborative Filtering

Idea: use patterns in user-item interactions directly.

### 5.1 Memory-Based (Neighborhood)

- `User-user`: users with similar histories recommend to each other.
- `Item-item`: items consumed together recommend each other.

Similarity options:

- Cosine similarity
- Pearson correlation
- Jaccard similarity (binary interactions)

Good for interpretability; can be expensive at very large scale.

### 5.2 Model-Based (Matrix Factorization)

Represent interaction matrix `R` as:

`\[
R \approx P Q^\top
\]`

where:

- `P_u` is a latent vector for user `u`.
- `Q_i` is a latent vector for item `i`.
- Predicted score: `\hat{r}_{ui} = P_u^\top Q_i`.

Common loss (explicit ratings):

`\[
\min_{P,Q} \sum_{(u,i)\in\Omega} (r_{ui} - P_u^\top Q_i)^2 + \lambda(\|P_u\|^2 + \|Q_i\|^2)
\]`

For implicit feedback, weighted losses or pairwise ranking losses are often better.

Strengths:

- Captures hidden preference structure.
- Strong performance on sparse interaction data.

Weaknesses:

- Cold-start for new users/items without features.
- Latent factors are less interpretable.

## 6. Hybrid Recommenders

Most modern systems are hybrid:

- Collaborative signals + content features + context features.
- Candidate generation model + ranking model.

A practical architecture:

1. Candidate generation (fast, broad recall).
2. Scoring/ranking (slower, richer model).
3. Post-processing (diversity, freshness, policy constraints).

## 7. Evaluation: Offline and Online

Offline ranking metrics:

- `Precision@K`, `Recall@K`
- `MAP`, `NDCG`
- `AUC` for pairwise ranking tasks

But offline gains may not translate directly online.

Online metrics (A/B test):

- CTR, save rate, conversion rate
- Session depth, dwell time, retention
- Guardrails: latency, complaints, bounce rate

## 8. Key Production Challenges

1. `Cold start`: new users and new items.
2. `Feedback loops`: showing popular items makes them more popular.
3. `Bias and fairness`: exposure imbalance across creators/items.
4. `Exploration vs exploitation`: balancing known winners with discovery.
5. `Scale`: large candidate spaces need retrieval + approximate nearest neighbor methods.

## 9. Practical Build Order

If building from scratch:

1. Define objective and success metrics.
2. Launch popularity baseline.
3. Add item-item collaborative model.
4. Add content features for cold-start robustness.
5. Move to hybrid retrieval + ranking.
6. Add experimentation and monitoring.

## 10. What to Study Next

- Matrix factorization and implicit recommendation losses.
- Learning-to-rank methods.
- Sequential recommendation models.
- Causal recommendation and counterfactual evaluation.

If you can derive cosine similarity, solve regularized least squares, and interpret ranking metrics, you already have the math foundation needed to build strong recommender systems.

