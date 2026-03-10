---
title: Recommender Systems
date: 2026-03-07
type: page
math: true
---

A data-science-first guide to recommender systems with practical modeling, evaluation, and production considerations.

## 1. Why Recommender Systems Matter

Recommender systems help users navigate very large item catalogs (videos, products, courses, jobs, music) by ranking items likely to be relevant to each user. See the background overview in [Wikipedia: Recommender system](https://en.wikipedia.org/wiki/Recommender_system).

For data scientists, this is usually not a pure prediction task. It is a ranking and decision problem with constraints:

- Relevance and personalization
- Diversity and novelty
- Latency and serving cost
- Business goals (retention, conversion, long-term value)

![Two-stage recommender architecture](/media/recommender/rs-two-stage-pipeline.svg)

### Common applications

- E-commerce and retail: cross-sell, upsell, "complete the look", and basket expansion
- Media and entertainment: personalized ranking of video, music, articles, and ads
- Banking and financial services: product recommendations, offers, and next-best action

### Business value

- Helps users discover items they would not have found through search alone
- Increases engagement, session depth, and content consumption
- Improves conversion, basket size, and retention when recommendations are well-targeted

## 2. Explicit vs. Implicit Feedback

As in the reference article, the first key split is the type of supervision.

### Explicit feedback

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

### Implicit feedback

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
- Requires careful negative sampling and weighting

In both cases, interactions define a sparse user-item matrix with entries over user-item pairs $(u, i)$.

![Explicit versus implicit feedback comparison](/media/recommender/rs-explicit-vs-implicit.svg)

![User-item matrix examples for explicit and implicit data](/media/recommender/rs-user-item-matrix.svg)

### Recommendation tasks

Following [D2L Chapter 21](https://d2l.ai/chapter_recommender-systems/index.html), it helps to separate recommendation work by task:

- Rating prediction: estimate a user's explicit rating for an item
- Top-$n$ recommendation: rank candidate items and return a personalized list
- Sequence-aware recommendation: use ordered behavior and timestamps
- Click-through rate prediction: predict whether a shown item or ad will be clicked
- Cold-start recommendation: serve new users or new items when history is limited

These tasks overlap, but they drive different labels, evaluation protocols, and model choices.

### Benchmark datasets and split strategy

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

## 3. Content-Based vs. Collaborative vs. Contextual vs. Hybrid

Model choice depends heavily on what data you have. If you only observe interactions, collaborative filtering is usually the first serious approach. If you also have user and item attributes, content-based or hybrid models become more useful. If the current situation matters, such as device, country, time, or within-session behavior, then contextual models become important.

### Content-based filtering

Use user/item attributes and metadata.

- Item vectors from text/category/tags/embeddings
- User representation from demographics and/or consumed item profiles
- Similarity models (cosine, k-NN) or supervised models over features

Strength:

- Better cold-start for new items (and sometimes new users)

Limitation:

- Limited collaborative signal; can over-specialize

### Collaborative filtering

Use interaction patterns across all users/items.

- Neighborhood methods (user-user, item-item)
- Latent-factor methods (matrix factorization)

Strength:

- Often strong personalization with enough interaction history

Limitation:

- Cold-start if no history exists

### Contextual filtering

Contextual filtering incorporates information about the current situation into the recommendation process.

- Examples of context: device, country, date, time, session state, or recent action sequence
- Useful when the same user may want different items under different circumstances
- Often framed as next-action or next-item prediction rather than only long-run preference estimation

![Contextual recommendation diagram](/media/recommender/rs-contextual-filtering.svg)

### Hybrid models

Combine metadata with interaction learning.

- Best default choice in many production systems
- Handles cold-start better than pure collaborative filtering
- Usually outperforms pure content-based methods once enough interactions accumulate

![Content-based, collaborative filtering, and hybrid model comparison](/media/recommender/rs-content-vs-cf.svg)

## 4. Collaborative Filtering with Matrix Factorization

The reference article emphasizes matrix factorization variants. This remains foundational for data scientists.

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

![Matrix factorization decomposition](/media/recommender/rs-matrix-factorization.svg)

![Alternating least squares optimization cycle](/media/recommender/rs-als-cycle.svg)

### 4.2 [SVD](https://doi.org/10.1109/MC.2009.263)-style bias terms

A common extension adds global/user/item bias terms:

$$
\hat r_{ui} = \mu + b_u + b_i + p_u^\top q_i
$$

Biases capture broad effects (strict users, broadly popular items) and usually improve quality.

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

### 4.4 Evaluation for rating prediction

For explicit-feedback recommendation, [D2L's matrix factorization section](https://d2l.ai/chapter_recommender-systems/mf.html) uses RMSE as the primary evaluation measure:

$$
\mathrm{RMSE} = \sqrt{\frac{1}{|\mathcal{T}|}\sum_{(u,i)\in\mathcal{T}} \left(r_{ui} - \hat{r}_{ui}\right)^2}
$$

where $\mathcal{T}$ is the evaluation set of observed user-item pairs.

RMSE is appropriate for rating prediction, but it is not sufficient for top-$n$ recommendation because it does not evaluate rank order.

### 4.5 [AutoRec](https://d2l.ai/chapter_recommender-systems/autorec.html) for nonlinear rating prediction

AutoRec extends collaborative filtering with an autoencoder-style reconstruction objective.

- Input is a partially observed user vector or item vector from the rating matrix
- The network reconstructs missing entries through a hidden representation
- Only observed ratings should contribute to the training loss

For item-based AutoRec, D2L writes the input as the $i$th column $\mathbf{R}_{*i}$ of the rating matrix and reconstructs it with a nonlinear network:

$$
h(\mathbf{R}_{*i}) = f\!\left(\mathbf{W}\, g\!\left(\mathbf{V}\mathbf{R}_{*i} + \mu\right) + b\right)
$$

The learning objective minimizes reconstruction error over observed entries only:

$$
\arg\min_{\mathbf{W},\mathbf{V},\mu,b}
\sum_{i=1}^{M}\left\lVert \mathbf{R}_{*i} - h(\mathbf{R}_{*i}) \right\rVert_{\mathcal{O}}^2
+ \lambda\left(\lVert \mathbf{W}\rVert_F^2 + \lVert \mathbf{V}\rVert_F^2\right)
$$

Conceptually, AutoRec matters because it is one of the earliest examples in D2L of moving from linear collaborative filtering to nonlinear neural reconstruction for rating prediction.

### 4.6 [Personalized ranking objectives](https://d2l.ai/chapter_recommender-systems/ranking.html)

D2L makes an important distinction between rating prediction objectives and ranking objectives.

- Pointwise objectives model one user-item interaction at a time
- Pairwise objectives model relative preference between a positive and a negative item
- Listwise objectives optimize properties of an entire ranked list

For top-$n$ recommendation from implicit feedback, pairwise objectives are often a better match to the task.

The two core D2L losses are:

1. Bayesian Personalized Ranking (BPR), which encourages the positive item to score above a sampled negative item:

$$
\sum_{(u,i,j)\in D} \ln \sigma\!\left(\hat{y}_{ui} - \hat{y}_{uj}\right) - \lambda_{\Theta}\lVert \Theta \rVert^2
$$

2. Hinge ranking loss, which pushes the positive item away from the negative item by a margin $m$:

$$
\sum_{(u,i,j)\in D} \max\!\left(m - \hat{y}_{ui} + \hat{y}_{uj}, 0\right)
$$

These are central for implicit-feedback recommendation because they optimize relative ordering rather than absolute score accuracy.

### 4.7 [SVD++](https://doi.org/10.1145/1401890.1401944) intuition

SVD++ augments user representation with signals from interacted items, helping when explicit feedback is sparse but interaction history exists.

## 5. Feature-Rich and Hybrid Recommendation

As [D2L section 21.8](https://d2l.ai/chapter_recommender-systems/ctr.html) emphasizes, interaction data is often sparse and noisy. In many production settings, recommendation is better framed as impression-level prediction with rich side features.

### 5.1 Feature-rich recommendation and CTR

Feature-rich recommendation is common in ads, feeds, and product surfaces.

- Labels are often binary, such as click vs no click
- Inputs include many categorical fields rather than only user and item IDs
- The D2L advertising example uses 34 fields, with the first column as the click label and the remaining columns as categorical features

This setting is different from classic matrix factorization because the goal is often click-through rate prediction over impression-level examples rather than rating reconstruction.

CTR is defined as:

$$
\mathrm{CTR} = \frac{\#\mathrm{Clicks}}{\#\mathrm{Impressions}} \times 100\%
$$

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

### 5.3 [DeepFM](https://d2l.ai/chapter_recommender-systems/deepfm.html)

DeepFM extends FM by combining low-order feature interactions from FM with high-order nonlinear interactions from a deep network.

- The FM branch captures low-order interactions
- The deep branch uses shared embeddings and an MLP to learn higher-order interactions
- Both outputs are combined into a final prediction

D2L presents the DeepFM prediction as:

$$
\hat{y} = \sigma\!\left(\hat{y}^{(FM)} + \hat{y}^{(DNN)}\right)
$$

DeepFM is especially useful when simple pairwise interactions are not expressive enough, but you still want the inductive bias of factorization-based feature interaction.

### 5.4 Hybrid factorization with features ([LightFM](https://arxiv.org/abs/1507.08439)-style)

- User embedding = sum of user-feature embeddings
- Item embedding = sum of item-feature embeddings
- Score uses dot product (+ optional biases)

Why data scientists use this:

- Stronger cold-start behavior
- Smooth path between collaborative and content-based modeling
- Practical when metadata quality is reasonable

## 6. Deep Neural Recommendation Models

The NVIDIA glossary adds an important extension: deep learning recommenders build on embeddings and factorization ideas, but replace simple linear interactions with more expressive neural architectures.

Useful model families include:

- Feedforward networks and multilayer perceptrons for flexible nonlinear scoring
- Convolutional models when image content matters
- Recurrent networks and transformers for sequential, session-based behavior

### 6.1 Neural collaborative filtering

Neural collaborative filtering keeps the collaborative setup of user-item interactions, but learns the interaction function with a neural network instead of relying only on a dot product.

- In [NeuMF from D2L](https://d2l.ai/chapter_recommender-systems/neumf.html), a generalized matrix factorization (GMF) path is combined with an MLP path
- This can capture more complex nonlinear relationships than matrix factorization alone
- It is most useful when interaction volume is high enough to support a richer model

NeuMF also fits naturally with pairwise ranking and negative sampling, rather than only explicit rating prediction.

![Neural collaborative filtering architecture](/media/recommender/rs-neural-cf.svg)

### 6.2 Variational autoencoders for collaborative filtering

Variational autoencoder approaches learn a compressed latent representation of a user's interaction history and then reconstruct likely missing interactions.

- Useful for implicit-feedback recommendation
- Helps capture nonlinear structure in sparse user-item behavior
- Often treated as a reconstruction problem over interaction vectors

![VAE-style collaborative filtering architecture](/media/recommender/rs-vae-cf.svg)

### 6.3 Contextual sequence learning

Session-based recommenders often care less about static preference and more about what the user is likely to do next.

- In [D2L's sequence-aware recommendation section](https://d2l.ai/chapter_recommender-systems/seqrec.html), the featured model is Caser, which uses horizontal and vertical convolutions over the recent interaction matrix
- Horizontal filters capture union-level patterns across multiple recent actions
- Vertical filters capture point-level effects of individual recent actions
- RNN, LSTM, GRU, and transformer models are also widely used for this setting
- Inputs can include both ordered actions and contextual features such as time, device, or location
- This is especially relevant in streaming, shopping, and short-session products

![Contextual sequence learning architecture](/media/recommender/rs-contextual-sequence.svg)

### 6.4 Wide-and-deep style models

Wide-and-deep architectures combine memorization and generalization.

- The wide component captures simpler feature interactions that may occur rarely
- The deep component learns richer nonlinear structure through embeddings and dense layers
- This pattern is effective when recommendation quality depends on both handcrafted cross-features and learned representations

![Wide-and-deep recommendation architecture](/media/recommender/rs-wide-deep.svg)

### 6.5 DLRM-style models

DLRM-style models are designed for recommendation data with many categorical features and some numerical features.

- Embeddings handle sparse categorical inputs
- MLP layers process dense features
- Explicit pairwise feature interactions are then modeled before final prediction

![DLRM-style recommendation architecture](/media/recommender/rs-dlrm.svg)

These models are widely used in large-scale ranking and click-through prediction systems.

## 7. What the Article Misses for Production DS Work

The model taxonomy is excellent, but real systems also require these decisions.

### 7.1 Retrieval + ranking architecture

Most large systems are two-stage:

1. Candidate generation (fast, high recall)
2. Ranking (slower, richer features/objective)

Without this separation, serving cost or latency becomes prohibitive.

### 7.2 Label design and negatives

For implicit data, non-click is not always negative. You need:

- Exposure-aware negatives
- Position-bias-aware training
- Time-windowed labels matching product goals

### 7.3 Offline vs online evaluation

Offline metrics like $Recall@K$, $NDCG@K$, and $MAP$ are necessary but insufficient.

You still need A/B tests with:

- Primary metrics (CTR, conversion, retention)
- Guardrails (latency, bad-content rate, complaint rate)
- Segment-level analysis (new users, heavy users, long-tail items)

For implicit ranking, [D2L's NeuMF section](https://d2l.ai/chapter_recommender-systems/neumf.html) also highlights $Hit@\ell$ and AUC as practical offline ranking metrics when using time-based splits and candidate sets.

![Offline-to-online recommender evaluation flow](/media/recommender/rs-offline-online-eval.svg)

### 7.4 Feedback loops and exploration

Pure exploitation can collapse catalog diversity. You need controlled exploration:

- Epsilon-greedy or Thompson-style policies
- Re-ranking for diversity/novelty
- Periodic calibration checks

### 7.5 Reliability and monitoring

Data scientists should treat recommenders as continuously monitored systems:

- Feature drift and embedding drift
- Candidate recall degradation
- Online metric drift and alerting
- Safe fallback policies

## 8. Practical Build Sequence for Data Scientists

1. Define objective hierarchy: short-term CTR vs long-term value.
2. Build strong non-ML baselines (popular, recent, co-visitation).
3. Add collaborative filtering (matrix factorization).
4. Add metadata for hybrid/cold-start robustness.
5. Introduce two-stage retrieval + ranking.
6. Establish experiment and monitoring standards.

## 9. Summary

The article's core path is still the right conceptual backbone, the NVIDIA glossary expands it in useful ways, and the D2L chapter fills in important modeling and evaluation details:

- Explicit vs implicit feedback
- Recommendation tasks such as rating prediction, top-$n$ ranking, sequence-aware recommendation, CTR prediction, and cold-start
- Benchmark data practices such as MovieLens sparsity analysis and chronological evaluation splits
- Content-based, collaborative, contextual, and hybrid filtering
- Matrix factorization variants, AutoRec, and ranking objectives such as BPR and hinge loss
- Feature-rich recommendation with factorization machines and DeepFM
- Deep recommenders such as NCF, VAE-style models, wide-and-deep models, and DLRM-style architectures
- Hybrid models such as LightFM

For practicing data scientists, the differentiator is operational quality: robust labeling, unbiased evaluation, scalable serving, and disciplined online experimentation.

## Reference

- Article inspiration: [Recommender Systems — A Complete Guide to Machine Learning Models](https://towardsdatascience.com/recommender-systems-a-complete-guide-to-machine-learning-models-96d3f94ea748/)
- [Dive into Deep Learning: Chapter 21 Recommender Systems](https://d2l.ai/chapter_recommender-systems/index.html)
- [D2L 21.1 Overview of Recommender Systems](https://d2l.ai/chapter_recommender-systems/recsys-intro.html)
- [D2L 21.2 The MovieLens Dataset](https://d2l.ai/chapter_recommender-systems/movielens.html)
- [D2L 21.3 Matrix Factorization](https://d2l.ai/chapter_recommender-systems/mf.html)
- [D2L 21.4 AutoRec](https://d2l.ai/chapter_recommender-systems/autorec.html)
- [D2L 21.5 Personalized Ranking](https://d2l.ai/chapter_recommender-systems/ranking.html)
- [D2L 21.6 NeuMF](https://d2l.ai/chapter_recommender-systems/neumf.html)
- [D2L 21.7 Sequence-Aware Recommendation](https://d2l.ai/chapter_recommender-systems/seqrec.html)
- [D2L 21.8 Feature-Rich Recommender Systems](https://d2l.ai/chapter_recommender-systems/ctr.html)
- [D2L 21.9 Factorization Machines](https://d2l.ai/chapter_recommender-systems/fm.html)
- [D2L 21.10 DeepFM](https://d2l.ai/chapter_recommender-systems/deepfm.html)
- [NVIDIA Glossary: Recommendation System](https://www.nvidia.com/en-us/glossary/recommendation-system/)
- [Wikipedia: Recommender system](https://en.wikipedia.org/wiki/Recommender_system)
- [Surprise Python package](https://surpriselib.com/)
- [Simon Funk (2006): Netflix Update - Try This at Home](https://sifter.org/~simon/journal/20061211.html)
- [Mnih and Salakhutdinov (2007): Probabilistic Matrix Factorization (NeurIPS)](https://papers.nips.cc/paper_files/paper/2007/hash/d7322ed717dedf1eb4e6e52a37ea7bcd-Abstract.html)
- [Hu, Koren, Volinsky (2008): Collaborative Filtering for Implicit Feedback Datasets](https://doi.org/10.1109/ICDM.2008.22)
- [Koren, Bell, Volinsky (2009): Matrix Factorization Techniques for Recommender Systems](https://doi.org/10.1109/MC.2009.263)
- [Koren (2008): Factorization Meets the Neighborhood (SVD++)](https://doi.org/10.1145/1401890.1401944)
- [Kula (2015): Metadata Embeddings for User and Item Cold-start Recommendations (LightFM)](https://arxiv.org/abs/1507.08439)
