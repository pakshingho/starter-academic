---
title: 7. Production Concerns
linktitle: 7. Production Concerns
toc: true
type: docs
date: 2026-03-07
lastmod: 2026-03-10
draft: false
math: true
menu:
  recommender-systems:
    weight: 8
weight: 8
---

The model taxonomy is excellent, but real systems also require these decisions.

<div id="retrieval-ranking-architecture"></div>

### 7.1 Retrieval + ranking architecture

Most large systems are two-stage:

1. Candidate generation (fast, high recall)
2. Ranking (slower, richer features/objective)

Without this separation, serving cost or latency becomes prohibitive.

Google's course extends this into a practical three-stage view:

1. Candidate generation
2. Scoring or ranking
3. Re-ranking

The extra re-ranking stage matters because the best ranked list for raw engagement is often not the best final surface once you account for freshness, diversity, fairness, or business constraints.

![Recommendation process architecture](/media/recommender/google/google-process.svg)

*Image credit: [Google for Developers Recommendation Systems course](https://developers.google.com/machine-learning/recommendation/overview/introduction), CC BY 4.0.*

In production, candidate generation is usually itself a mixture of sources:

- Embedding nearest neighbors from a two-tower or matrix-factorization model
- Co-visitation or graph-based retrieval
- Popularity or trending backfills
- Rule-based inventory or policy constraints

One key Google point is that scores from different candidate generators are usually not comparable. That is why a separate scorer or ranker is often necessary after retrieval.

For neural retrieval, Google also stresses approximate nearest-neighbor search rather than exact brute-force scoring over the full catalog. Libraries such as [ScaNN](https://github.com/google-research/google-research/tree/master/scann) are used to make this practical at large scale.

![Approximate nearest-neighbor retrieval in embedding space](/media/recommender/google/google-2d-retrieval.svg)

*Image credit: [Google for Developers Recommendation Systems course](https://developers.google.com/machine-learning/recommendation/dnn/retrieval), CC BY 4.0.*

<div id="label-design-and-negatives"></div>

### 7.2 Label design and negatives

For implicit data, non-click is not always negative. You need:

- Exposure-aware negatives
- Position-bias-aware training
- Time-windowed labels matching product goals

Google's scoring module makes a related point: you need to be explicit about what you are optimizing. A model trained for click probability can converge to clickbait. A model trained for watch time may overserve long items. A model trained for immediate conversion can hurt long-term trust or retention.

In other words, score definition is part of the product design, not just a modeling choice.

For feed-style or slate recommendation, Google also recommends distinguishing between:

- Position-dependent models, which estimate utility at a fixed slot
- Position-independent models, which try to estimate intrinsic relevance before layout effects

That distinction matters because position bias can make top slots look artificially better even when the item itself is not more relevant.

<div id="evaluating-recommender-and-ranking-systems"></div>

### 7.3 Evaluating recommender and ranking systems

[D2L's NeuMF evaluator](https://d2l.ai/chapter_recommender-systems/neumf.html) is a good starting point for implicit-feedback ranking evaluation. The protocol uses a chronological split, holds out a future ground-truth item $g_u$ for each user $u$, and ranks that item against items the user has not interacted with.

Two core metrics in that setup are:

$$
\mathrm{Hit@}K = \frac{1}{|\mathcal{U}|} \sum_{u \in \mathcal{U}} \mathbf{1}\left(\mathrm{rank}_{u,g_u} \le K\right)
$$

and

$$
\mathrm{AUC} = \frac{1}{|\mathcal{U}|} \sum_{u \in \mathcal{U}}
\frac{1}{|\mathcal{I} \setminus S_u|}
\sum_{j \in \mathcal{I} \setminus S_u}
\mathbf{1}\left(\mathrm{rank}_{u,g_u} < \mathrm{rank}_{u,j}\right)
$$

where $\mathcal{U}$ is the user set, $\mathcal{I}$ is the item set, and $S_u$ is the set of items already associated with user $u$.

This evaluator is useful because it respects time order and measures whether the held-out future item is surfaced near the top. But for production recommendation systems, you usually need a wider evaluation stack than $Hit@K$ and AUC alone.

#### Stage-specific offline metrics

- Retrieval: use $Recall@M$ or candidate hit rate to verify that the candidate generator is not dropping relevant items before the ranker sees them.
- Ranking: use $NDCG@K$, $Recall@K$, and $MRR$ for top-of-list quality. If you have multiple relevant held-out items per user, $MAP$ is also useful.
- Rating prediction: use $RMSE$ or $MAE$ only when explicit rating prediction is the real product task. These metrics are much less informative for feed ranking or item recommendation.

Let $G_u$ denote the relevant items for user $u$, let $C_u(M)$ be the top-$M$ retrieval candidate set, and let $L_u(K)$ be the top-$K$ ranked list.

For retrieval, a standard candidate-stage metric is:

$$
\mathrm{Recall@}M = \frac{1}{|\mathcal{U}|} \sum_{u \in \mathcal{U}} \frac{|G_u \cap C_u(M)|}{|G_u|}
$$

For the final ranked list, the analogous metric is:

$$
\mathrm{Recall@}K = \frac{1}{|\mathcal{U}|} \sum_{u \in \mathcal{U}} \frac{|G_u \cap L_u(K)|}{|G_u|}
$$

To reward correct ordering near the top, define

$$
\mathrm{DCG@}K(u) = \sum_{j=1}^{K} \frac{2^{\mathrm{rel}_{u,j}} - 1}{\log_2(j+1)}
$$

and then normalize by the ideal ordering:

$$
\mathrm{NDCG@}K = \frac{1}{|\mathcal{U}|} \sum_{u \in \mathcal{U}} \frac{\mathrm{DCG@}K(u)}{\mathrm{IDCG@}K(u)}
$$

where $\mathrm{rel}_{u,j}$ is the relevance label of the item at position $j$ for user $u$.

If you care about the position of the first relevant result, use mean reciprocal rank:

$$
\mathrm{MRR} = \frac{1}{|\mathcal{U}|} \sum_{u \in \mathcal{U}} \frac{1}{r_u}
$$

where $r_u$ is the rank position of the first relevant item for user $u$, with reciprocal rank taken as $0$ if no relevant item appears.

If multiple relevant items can appear in the list, average precision is also useful:

$$
\mathrm{AP@}K(u) = \frac{1}{\min(|G_u|, K)} \sum_{j=1}^{K} \mathrm{Precision@}j(u)\,\mathbf{1}\left(i_{u,j} \in G_u\right)
$$

$$
\mathrm{MAP@}K = \frac{1}{|\mathcal{U}|} \sum_{u \in \mathcal{U}} \mathrm{AP@}K(u)
$$

where $i_{u,j}$ is the item shown at rank $j$ to user $u$.

Among these, $NDCG@K$ is often the strongest single ranking metric because it rewards putting the most relevant items near the top rather than merely somewhere in the top $K$.

#### Protocol choices matter as much as the metric

- Use chronological splits for implicit and sequence-aware tasks. Random splits can leak future information.
- State clearly whether evaluation is full-catalog, sampled-negative, or candidate-set based. Numbers are not comparable across these protocols.
- Evaluate on exposed or eligible items when possible. Treating every unclicked item in the full catalog as a negative can distort results.
- Report by segment: new users, power users, new items, head items, and long-tail items often behave very differently.
- When the system has multiple stages, evaluate each stage separately and end-to-end.

#### Beyond ranking accuracy

Accuracy metrics alone can produce a recommender that is brittle or bad for the product.

- Coverage: how much of the catalog is ever recommended
- Diversity: how different the recommended items are from one another
- Novelty and serendipity: whether the system only repeats obvious items
- Calibration: whether recommendations match the user's current intent, not just their historical average
- Fairness and marketplace health: whether some suppliers, creators, or item groups are systematically suppressed

These matter because a system with slightly lower $NDCG@K$ can still be better for long-term engagement if it improves diversity, catalog health, or repeat-user satisfaction.

#### Online evaluation

Offline metrics are necessary but insufficient. You still need A/B tests with:

- Primary metrics: CTR, conversion, watch time, retention, revenue, or long-term value depending on the product
- Guardrails: latency, page-load impact, complaint rate, hide/block rate, unsafe-content rate
- Diagnostic cuts: new vs returning users, cold-start items, geography, device, heavy-user cohorts

For ranking changes, it is also useful to monitor the full funnel:

- Candidate recall
- Ranker win rate on exposed impressions
- Final-surface engagement
- Downstream business outcomes

![Offline-to-online recommender evaluation flow](/media/recommender/rs-offline-online-eval.svg)

<div id="reranking-freshness-diversity-and-exploration"></div>

### 7.4 Re-ranking, freshness, diversity, and exploration

Pure exploitation can collapse catalog diversity. You need controlled exploration:

- Epsilon-greedy or Thompson-style policies
- Re-ranking for diversity/novelty
- Periodic calibration checks

Google's reranking material is especially useful here. In practice, re-ranking is where you inject constraints that the base ranker usually misses:

- Freshness so the feed does not go stale
- Diversity so near-duplicate items do not dominate
- Fairness or marketplace balance so one creator, seller, or provider is not systematically overexposed
- Local policy constraints such as demotions, blocks, maturity filters, or legal limits

This stage is often simpler than the main ranker, but it has outsized product impact because it controls the final list actually seen by the user.

<div id="reliability-and-monitoring"></div>

### 7.5 Reliability and monitoring

Data scientists should treat recommenders as continuously monitored systems:

- Feature drift and embedding drift
- Candidate recall degradation
- Online metric drift and alerting
- Safe fallback policies
