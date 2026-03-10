---
title: Recommender Systems
date: 2026-03-07
type: page
math: true
---

A data-science-first guide to recommender systems with practical modeling, evaluation, and production considerations.

<nav id="page-contents" class="recommender-toc" aria-label="On this page">
  <div class="recommender-toc__title">On this page</div>
  <ol class="recommender-toc__list">
    <li class="recommender-toc__section">
      <details class="recommender-toc__group">
        <summary>1. Why it matters</summary>
        <ol class="recommender-toc__sublist">
          <li><a href="#why-recommender-systems-matter">Section overview</a></li>
          <li><a href="#common-applications">1.1 Common applications</a></li>
          <li><a href="#business-value">1.2 Business value</a></li>
        </ol>
      </details>
    </li>
    <li class="recommender-toc__section">
      <details class="recommender-toc__group">
        <summary>2. Explicit vs. implicit</summary>
        <ol class="recommender-toc__sublist">
          <li><a href="#explicit-vs-implicit-feedback">Section overview</a></li>
          <li><a href="#explicit-feedback">2.1 Explicit feedback</a></li>
          <li><a href="#implicit-feedback">2.2 Implicit feedback</a></li>
          <li><a href="#recommendation-tasks">2.3 Recommendation tasks</a></li>
          <li><a href="#benchmark-datasets-and-split-strategy">2.4 Benchmark datasets</a></li>
        </ol>
      </details>
    </li>
    <li class="recommender-toc__section">
      <details class="recommender-toc__group">
        <summary>3. Model families</summary>
        <ol class="recommender-toc__sublist">
          <li><a href="#content-based-vs-collaborative-vs-contextual-vs-hybrid">Section overview</a></li>
          <li><a href="#content-based-filtering">3.1 Content-based filtering</a></li>
          <li><a href="#collaborative-filtering">3.2 Collaborative filtering</a></li>
          <li><a href="#contextual-filtering">3.3 Contextual filtering</a></li>
          <li><a href="#hybrid-models">3.4 Hybrid models</a></li>
          <li><a href="#embedding-spaces-and-similarity-measures">3.5 Embedding spaces and similarity</a></li>
        </ol>
      </details>
    </li>
    <li class="recommender-toc__section">
      <details class="recommender-toc__group">
        <summary>4. Matrix factorization</summary>
        <ol class="recommender-toc__sublist">
          <li><a href="#collaborative-filtering-with-matrix-factorization">Section overview</a></li>
          <li><a href="#pmf-latent-factors">4.1 PMF / latent factors</a></li>
          <li><a href="#svd-style-bias-terms">4.2 SVD-style bias terms</a></li>
          <li><a href="#implicit-feedback-factorization">4.3 Implicit-feedback factorization</a></li>
          <li><a href="#evaluation-for-rating-prediction">4.4 Evaluation for rating prediction</a></li>
          <li><a href="#autorec">4.5 AutoRec</a></li>
          <li><a href="#personalized-ranking-objectives">4.6 Personalized ranking objectives</a></li>
          <li><a href="#svdplusplus-intuition">4.7 SVD++ intuition</a></li>
        </ol>
      </details>
    </li>
    <li class="recommender-toc__section">
      <details class="recommender-toc__group">
        <summary>5. Feature-rich recommendation</summary>
        <ol class="recommender-toc__sublist">
          <li><a href="#feature-rich-and-hybrid-recommendation">Section overview</a></li>
          <li><a href="#feature-rich-recommendation-and-ctr">5.1 Feature-rich recommendation and CTR</a></li>
          <li><a href="#factorization-machines">5.2 Factorization machines</a></li>
          <li><a href="#deepfm">5.3 DeepFM</a></li>
          <li><a href="#hybrid-factorization-with-features">5.4 Hybrid factorization with features</a></li>
        </ol>
      </details>
    </li>
    <li class="recommender-toc__section">
      <details class="recommender-toc__group">
        <summary>6. Deep models</summary>
        <ol class="recommender-toc__sublist">
          <li><a href="#deep-neural-recommendation-models">Section overview</a></li>
          <li><a href="#two-tower-retrieval-models">6.1 Two-tower retrieval</a></li>
          <li><a href="#neural-collaborative-filtering">6.2 Neural collaborative filtering</a></li>
          <li><a href="#variational-autoencoders-for-collaborative-filtering">6.3 Variational autoencoders</a></li>
          <li><a href="#contextual-sequence-learning">6.4 Contextual sequence learning</a></li>
          <li><a href="#wide-and-deep-style-models">6.5 Wide-and-deep</a></li>
          <li><a href="#dlrm-style-models">6.6 DLRM-style models</a></li>
        </ol>
      </details>
    </li>
    <li class="recommender-toc__section">
      <details class="recommender-toc__group">
        <summary>7. Production concerns</summary>
        <ol class="recommender-toc__sublist">
          <li><a href="#what-the-article-misses-for-production-ds-work">Section overview</a></li>
          <li><a href="#retrieval-ranking-architecture">7.1 Retrieval + ranking</a></li>
          <li><a href="#label-design-and-negatives">7.2 Label design and negatives</a></li>
          <li><a href="#evaluating-recommender-and-ranking-systems">7.3 Evaluating recommender and ranking systems</a></li>
          <li><a href="#reranking-freshness-diversity-and-exploration">7.4 Re-ranking, freshness, diversity, and exploration</a></li>
          <li><a href="#reliability-and-monitoring">7.5 Reliability and monitoring</a></li>
        </ol>
      </details>
    </li>
    <li class="recommender-toc__section"><a href="#practical-build-sequence-for-data-scientists">8. Build sequence</a></li>
    <li class="recommender-toc__section"><a href="#summary">9. Summary</a></li>
  </ol>
</nav>

<details class="recommender-float-toc" aria-label="Floating table of contents">
  <summary class="recommender-float-toc__toggle" aria-label="Open section navigation">
    <span class="recommender-float-toc__toggle-icon" aria-hidden="true"></span>
  </summary>
  <div id="floating-page-contents" class="recommender-float-toc__panel">
    <div class="recommender-float-toc__title">On this page</div>
    <ol class="recommender-toc__list">
      <li class="recommender-toc__section">
        <details class="recommender-toc__group">
          <summary>1. Why it matters</summary>
          <ol class="recommender-toc__sublist">
            <li><a href="#why-recommender-systems-matter">Section overview</a></li>
            <li><a href="#common-applications">1.1 Common applications</a></li>
            <li><a href="#business-value">1.2 Business value</a></li>
          </ol>
        </details>
      </li>
      <li class="recommender-toc__section">
        <details class="recommender-toc__group">
          <summary>2. Explicit vs. implicit</summary>
          <ol class="recommender-toc__sublist">
            <li><a href="#explicit-vs-implicit-feedback">Section overview</a></li>
            <li><a href="#explicit-feedback">2.1 Explicit feedback</a></li>
            <li><a href="#implicit-feedback">2.2 Implicit feedback</a></li>
            <li><a href="#recommendation-tasks">2.3 Recommendation tasks</a></li>
            <li><a href="#benchmark-datasets-and-split-strategy">2.4 Benchmark datasets</a></li>
          </ol>
        </details>
      </li>
      <li class="recommender-toc__section">
        <details class="recommender-toc__group">
          <summary>3. Model families</summary>
          <ol class="recommender-toc__sublist">
            <li><a href="#content-based-vs-collaborative-vs-contextual-vs-hybrid">Section overview</a></li>
            <li><a href="#content-based-filtering">3.1 Content-based filtering</a></li>
            <li><a href="#collaborative-filtering">3.2 Collaborative filtering</a></li>
            <li><a href="#contextual-filtering">3.3 Contextual filtering</a></li>
            <li><a href="#hybrid-models">3.4 Hybrid models</a></li>
            <li><a href="#embedding-spaces-and-similarity-measures">3.5 Embedding spaces and similarity</a></li>
          </ol>
        </details>
      </li>
      <li class="recommender-toc__section">
        <details class="recommender-toc__group">
          <summary>4. Matrix factorization</summary>
          <ol class="recommender-toc__sublist">
            <li><a href="#collaborative-filtering-with-matrix-factorization">Section overview</a></li>
            <li><a href="#pmf-latent-factors">4.1 PMF / latent factors</a></li>
            <li><a href="#svd-style-bias-terms">4.2 SVD-style bias terms</a></li>
            <li><a href="#implicit-feedback-factorization">4.3 Implicit-feedback factorization</a></li>
            <li><a href="#evaluation-for-rating-prediction">4.4 Evaluation for rating prediction</a></li>
            <li><a href="#autorec">4.5 AutoRec</a></li>
            <li><a href="#personalized-ranking-objectives">4.6 Personalized ranking objectives</a></li>
            <li><a href="#svdplusplus-intuition">4.7 SVD++ intuition</a></li>
          </ol>
        </details>
      </li>
      <li class="recommender-toc__section">
        <details class="recommender-toc__group">
          <summary>5. Feature-rich recommendation</summary>
          <ol class="recommender-toc__sublist">
            <li><a href="#feature-rich-and-hybrid-recommendation">Section overview</a></li>
            <li><a href="#feature-rich-recommendation-and-ctr">5.1 Feature-rich recommendation and CTR</a></li>
            <li><a href="#factorization-machines">5.2 Factorization machines</a></li>
            <li><a href="#deepfm">5.3 DeepFM</a></li>
            <li><a href="#hybrid-factorization-with-features">5.4 Hybrid factorization with features</a></li>
          </ol>
        </details>
      </li>
      <li class="recommender-toc__section">
        <details class="recommender-toc__group">
          <summary>6. Deep models</summary>
          <ol class="recommender-toc__sublist">
            <li><a href="#deep-neural-recommendation-models">Section overview</a></li>
            <li><a href="#two-tower-retrieval-models">6.1 Two-tower retrieval</a></li>
            <li><a href="#neural-collaborative-filtering">6.2 Neural collaborative filtering</a></li>
            <li><a href="#variational-autoencoders-for-collaborative-filtering">6.3 Variational autoencoders</a></li>
            <li><a href="#contextual-sequence-learning">6.4 Contextual sequence learning</a></li>
            <li><a href="#wide-and-deep-style-models">6.5 Wide-and-deep</a></li>
            <li><a href="#dlrm-style-models">6.6 DLRM-style models</a></li>
          </ol>
        </details>
      </li>
      <li class="recommender-toc__section">
        <details class="recommender-toc__group">
          <summary>7. Production concerns</summary>
          <ol class="recommender-toc__sublist">
            <li><a href="#what-the-article-misses-for-production-ds-work">Section overview</a></li>
            <li><a href="#retrieval-ranking-architecture">7.1 Retrieval + ranking</a></li>
            <li><a href="#label-design-and-negatives">7.2 Label design and negatives</a></li>
            <li><a href="#evaluating-recommender-and-ranking-systems">7.3 Evaluating recommender and ranking systems</a></li>
            <li><a href="#reranking-freshness-diversity-and-exploration">7.4 Re-ranking, freshness, diversity, and exploration</a></li>
            <li><a href="#reliability-and-monitoring">7.5 Reliability and monitoring</a></li>
          </ol>
        </details>
      </li>
      <li class="recommender-toc__section"><a href="#practical-build-sequence-for-data-scientists">8. Build sequence</a></li>
      <li class="recommender-toc__section"><a href="#summary">9. Summary</a></li>
    </ol>
  </div>
</details>

<div id="why-recommender-systems-matter"></div>

## 1. Why Recommender Systems Matter

Recommender systems help users navigate very large item catalogs (videos, products, courses, jobs, music) by ranking items likely to be relevant to each user. See the background overview in [Wikipedia: Recommender system](https://en.wikipedia.org/wiki/Recommender_system).

![Recommendation process illustration](https://classic.d2l.ai/_images/rec-intro.svg)

*Image credit: [Dive into Deep Learning](https://classic.d2l.ai/chapter_recommender-systems/recsys-intro.html), CC BY-SA 4.0.*

For data scientists, this is usually not a pure prediction task. It is a ranking and decision problem with constraints:

- Relevance and personalization
- Diversity and novelty
- Latency and serving cost
- Business goals (retention, conversion, long-term value)

![Two-stage recommender architecture](/media/recommender/rs-two-stage-pipeline.svg)

<div id="common-applications"></div>

### 1.1 Common applications

- E-commerce and retail: cross-sell, upsell, "complete the look", and basket expansion
- Media and entertainment: personalized ranking of video, music, articles, and ads
- Banking and financial services: product recommendations, offers, and next-best action

<div id="business-value"></div>

### 1.2 Business value

- Helps users discover items they would not have found through search alone
- Increases engagement, session depth, and content consumption
- Improves conversion, basket size, and retention when recommendations are well-targeted

Google's recommender course also makes a useful product distinction between two common surfaces:

- Homepage recommendations, where the query is the user or session context
- Related-item recommendations, where the query is the current item being viewed

That distinction matters because homepage recommendation usually starts from a user or context embedding, while related-item recommendation often starts from the item embedding itself and retrieves nearby items in embedding space.

<div id="explicit-vs-implicit-feedback"></div>

## 2. Explicit vs. Implicit Feedback

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

<div id="content-based-vs-collaborative-vs-contextual-vs-hybrid"></div>

## 3. Content-Based vs. Collaborative vs. Contextual vs. Hybrid

Model choice depends heavily on what data you have. If you only observe interactions, collaborative filtering is usually the first serious approach. If you also have user and item attributes, content-based or hybrid models become more useful. If the current situation matters, such as device, country, time, or within-session behavior, then contextual models become important.

<div id="content-based-filtering"></div>

### 3.1 Content-based filtering

Use user/item attributes and metadata.

- Item vectors from text/category/tags/embeddings
- User representation from demographics and/or consumed item profiles
- Similarity models (cosine, k-NN) or supervised models over features

Strength:

- Better cold-start for new items (and sometimes new users)

Limitation:

- Limited collaborative signal; can over-specialize
- Can become overly narrow if the feature space does not capture richer or emerging interests

Google's course also emphasizes that content-based systems are often easier to explain and easier to cold-start for new items, but they tend to be weaker at serendipity than collaborative models.

| Aspect | Advantages | Disadvantages |
| --- | --- | --- |
| User specificity | Does not require interaction data from other users, so it can scale cleanly across many users and preserve privacy better | Quality depends heavily on having good item features and user profiles |
| Discovery pattern | Can serve niche items that match a user's known interests very well | Usually expands less well beyond existing interests, so serendipity is weaker |
| Modeling burden | Easier to explain because recommendations can be tied back to item attributes | Requires substantial domain knowledge and hand-engineered or high-quality learned features |

![Content-based filtering feature matrix illustration](/media/recommender/google/google-matrix1.svg)

*Image credit: [Google for Developers Recommendation Systems course](https://developers.google.com/machine-learning/recommendation/content-based/basics), CC BY 4.0.*

<div id="collaborative-filtering"></div>

### 3.2 Collaborative filtering

Use interaction patterns across all users/items.

- Neighborhood methods (user-user, item-item)
- Latent-factor methods (matrix factorization)

Strength:

- Often strong personalization with enough interaction history

Limitation:

- Cold-start if no history exists

| Aspect | Advantages | Disadvantages |
| --- | --- | --- |
| Feature engineering | Embeddings are learned automatically, so little prior domain knowledge is required | Harder to incorporate side features such as demographics, metadata, or context without model extensions |
| Discovery pattern | Can introduce serendipity because similar users can pull an item into a user's candidate set | Suffers from cold-start for fresh users and fresh items without interactions |
| Practical role | Strong starting point because a feedback matrix alone can power a usable candidate generator | Production systems usually need extra machinery such as WALS projection heuristics, side-feature augmentation, or hybrid models to fill the gaps |

<div id="contextual-filtering"></div>

### 3.3 Contextual filtering

Contextual filtering incorporates information about the current situation into the recommendation process.

- Examples of context: device, country, date, time, session state, or recent action sequence
- Useful when the same user may want different items under different circumstances
- Often framed as next-action or next-item prediction rather than only long-run preference estimation

![Contextual recommendation diagram](/media/recommender/rs-contextual-filtering.svg)

<div id="hybrid-models"></div>

### 3.4 Hybrid models

Combine metadata with interaction learning.

- Best default choice in many production systems
- Handles cold-start better than pure collaborative filtering
- Usually outperforms pure content-based methods once enough interactions accumulate

![Content-based, collaborative filtering, and hybrid model comparison](/media/recommender/rs-content-vs-cf.svg)

<div id="embedding-spaces-and-similarity-measures"></div>

### 3.5 Embedding spaces and similarity measures for candidate generation

The Google Developers course sharpens an important operational point: candidate generation is usually a nearest-neighbor search problem in an embedding space. Given a query embedding $q$ and item embedding $x$, the retrieval stage depends heavily on the similarity measure you choose.

Common choices are:

$$
s_{\mathrm{cos}}(q, x) = \frac{\langle q, x \rangle}{\lVert q \rVert_2 \lVert x \rVert_2}
$$

$$
s_{\mathrm{dot}}(q, x) = \langle q, x \rangle
$$

$$
d_{\mathrm{L2}}(q, x) = \lVert q - x \rVert_2
$$

If the embeddings are normalized, cosine, dot product, and squared Euclidean distance induce closely related rankings. Without normalization, however, they behave differently:

- Dot product favors larger embedding norms, which often correlates with popular or frequent items
- Cosine focuses more on angular alignment, which can be better for semantic similarity
- Euclidean distance emphasizes physical closeness in the embedding space

Google also suggests a useful interpolation between pure cosine and pure dot product:

$$
s_{\alpha}(q, x) = \lVert q \rVert_2^{\alpha} \lVert x \rVert_2^{\alpha} \cos(q, x), \quad \alpha \in (0, 1)
$$

This lets you keep some popularity signal without letting large-norm items dominate retrieval.

![Candidate retrieval in embedding space](/media/recommender/google/google-similarity.svg)

*Image credit: [Google for Developers Recommendation Systems course](https://developers.google.com/machine-learning/recommendation/overview/candidate-generation), CC BY 4.0.*

![Different similarity choices induce different rankings](/media/recommender/google/google-similarity-ak.svg)

*Image credit: [Google for Developers Recommendation Systems course](https://developers.google.com/machine-learning/recommendation/overview/candidate-generation), CC BY 4.0.*

<div id="collaborative-filtering-with-matrix-factorization"></div>

## 4. Collaborative Filtering with Matrix Factorization

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

<div id="feature-rich-and-hybrid-recommendation"></div>

## 5. Feature-Rich and Hybrid Recommendation

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

<div id="deep-neural-recommendation-models"></div>

## 6. Deep Neural Recommendation Models

The NVIDIA glossary adds an important extension: deep learning recommenders build on embeddings and factorization ideas, but replace simple linear interactions with more expressive neural architectures.

Useful model families include:

- Feedforward networks and multilayer perceptrons for flexible nonlinear scoring
- Convolutional models when image content matters
- Recurrent networks and transformers for sequential, session-based behavior

<div id="two-tower-retrieval-models"></div>

### 6.1 Two-tower retrieval models

The Google course gives the retrieval intuition, and the two blog references sharpen how that intuition gets productionized. A two-tower model is a dual-encoder architecture: one tower maps the query side into an embedding, and the other maps the item side into the same embedding space. The interaction is deliberately delayed until the very end.

If $x_q$ is the query-side input and $x_i$ is the item-side input, the core score is:

$$
s(x_q, x_i) = \langle \psi(x_q), \phi(x_i) \rangle
$$

where $\psi(\cdot)$ is the query tower and $\phi(\cdot)$ is the item tower.

This late-interaction design is the key reason two-tower models dominate retrieval and pre-ranking. The towers can be trained jointly, but item embeddings can then be precomputed and indexed, which makes large-scale ANN retrieval practical.

![Two-tower retrieval architecture](/media/recommender/rs-two-tower-core.svg)

#### Training objectives and the softmax view

Instead of only factorizing a user-item matrix, you can map a query context $x$ through a neural network to a dense representation $\psi(x)$ and score the catalog with a softmax layer:

$$
z(x) = \psi(x) V^\top
$$

$$
p(i \mid x) = \frac{\exp(z_i)}{\sum_{j=1}^{|\mathcal{I}|} \exp(z_j)}
$$

where $V$ contains the learned item representations.

In practice, exact softmax over a large catalog is too expensive, so industrial systems usually rely on sampled softmax, [negative sampling](https://developers.google.com/machine-learning/recommendation/dnn/training#negative_sampling), hard negatives, BPR-style pairwise losses, or contrastive objectives such as InfoNCE. Google's negative-sampling subsection is worth reading because it gives a concrete explanation of *folding*: if you train only on positive pairs, embeddings from unrelated categories can collapse into the same region and produce spurious recommendations. The Shaped deep dive also notes that pointwise log loss is still common when the retriever is trained as a coarse candidate generator ahead of a stronger ranker.

![Training a softmax recommendation model](/media/recommender/google/google-training.svg)

*Image credit: [Google for Developers Recommendation Systems course](https://developers.google.com/machine-learning/recommendation/dnn/training), CC BY 4.0.*

| Aspect | Matrix factorization | Softmax DNN / dual-encoder training |
| --- | --- | --- |
| Query and side features | Not easy to include directly | Can incorporate richer query, context, and side features |
| Cold start | Weak by default, though heuristics and projection tricks can help | Handles new queries more naturally when query features are available |
| Folding risk | Less prone to folding; WALS-style weighting can help control it | More prone to folding and usually needs [negative sampling](https://developers.google.com/machine-learning/recommendation/dnn/training#negative_sampling) or related regularization |
| Training scalability | Easier to scale to very large sparse corpora | Harder to scale; often needs sampling, hashing, or other approximations |
| Serving cost | Very cheap when user and item embeddings are static or cheaply updated | Item embeddings can be cached, but query embeddings often need to be computed online |

Google's summary judgment is useful: matrix factorization is usually the better retrieval choice for very large corpora, while DNN-based retrieval becomes attractive when you need richer query features and more personalized relevance modeling.

#### Training versus serving

This is where the architecture becomes operationally attractive:

- During training, the two towers are optimized jointly so that relevant query-item pairs are close in the embedding space and irrelevant pairs are pushed apart.
- During serving, the item tower is run offline over the full catalog and its embeddings are stored in an ANN index.
- At request time, the system computes only the query embedding online, queries the ANN index, and returns a top-$K$ candidate set for downstream ranking.

This decoupling is why two-tower models are common in candidate generation, related-item retrieval, and pre-ranking stages with strict latency budgets.

![Two-tower training and serving workflow](/media/recommender/rs-two-tower-serving.svg)

#### Tower design choices

The towers do not have to be simple MLPs. As the Shaped article emphasizes, the query tower may consume user IDs, demographics, session state, search context, or sequential behavior, while the item tower may consume item IDs, metadata, text, image embeddings, or other modality-specific features.

Common choices include:

- MLPs over concatenated embeddings and dense features
- Sequence models or transformers on the query side for recent behavior
- Text or multimodal encoders on the item side for semantic retrieval
- Symmetric dual encoders when both sides have similar modalities
- Asymmetric dual encoders when the query and item spaces are very different

For smaller catalogs, the raw two-tower score may be enough to rank directly. For very large catalogs, it is almost always used as a retrieval or pre-ranking model ahead of a richer scorer.

#### Limitations and promising extensions

The main weakness is also the reason the model is fast: user-item interaction is restricted to the final dot product. This creates an information bottleneck.

In practice, that means:

- Fine-grained cross-feature interactions are not modeled explicitly
- Subtle conditional preferences can be missed
- The retriever usually needs a downstream ranker to recover accuracy

The Reach Sumit survey is useful here because it covers several extensions aimed at reducing this bottleneck while keeping most of the serving efficiency:

- DAT (Dual Augmented Two-Tower): augments each tower with cross-side historical interaction signals
- IntTower: adds feature-importance calibration, fine-grained early interaction, and contrastive interaction regularization
- ColBERT-style late interaction: preserves query-item decoupling better than a full cross-encoder while keeping richer token-level matching than a pure dot product

These models live in the space between pure representation-based retrieval and full interaction-heavy ranking models.

![Interaction-enhanced two-tower variants](/media/recommender/rs-two-tower-extensions.svg)

<div id="neural-collaborative-filtering"></div>

### 6.2 Neural collaborative filtering

Neural collaborative filtering keeps the collaborative setup of user-item interactions, but learns the interaction function with a neural network instead of relying only on a dot product.

- In [NeuMF from D2L](https://d2l.ai/chapter_recommender-systems/neumf.html), a generalized matrix factorization (GMF) path is combined with an MLP path
- This can capture more complex nonlinear relationships than matrix factorization alone
- It is most useful when interaction volume is high enough to support a richer model

NeuMF also fits naturally with pairwise ranking and [negative sampling](https://developers.google.com/machine-learning/recommendation/dnn/training#negative_sampling), rather than only explicit rating prediction.

![NeuMF architecture](https://d2l.ai/_images/rec-neumf.svg)

*Image credit: [Dive into Deep Learning](https://d2l.ai/chapter_recommender-systems/neumf.html), CC BY-SA 4.0.*

<div id="variational-autoencoders-for-collaborative-filtering"></div>

### 6.3 Variational autoencoders for collaborative filtering

Variational autoencoder approaches learn a compressed latent representation of a user's interaction history and then reconstruct likely missing interactions.

- Useful for implicit-feedback recommendation
- Helps capture nonlinear structure in sparse user-item behavior
- Often treated as a reconstruction problem over interaction vectors

![VAE-style collaborative filtering architecture](/media/recommender/rs-vae-cf.svg)

<div id="contextual-sequence-learning"></div>

### 6.4 Contextual sequence learning

Session-based recommenders often care less about static preference and more about what the user is likely to do next.

- In [D2L's sequence-aware recommendation section](https://d2l.ai/chapter_recommender-systems/seqrec.html), the featured model is Caser, which uses horizontal and vertical convolutions over the recent interaction matrix
- Horizontal filters capture union-level patterns across multiple recent actions
- Vertical filters capture point-level effects of individual recent actions
- RNN, LSTM, GRU, and transformer models are also widely used for this setting
- Inputs can include both ordered actions and contextual features such as time, device, or location
- This is especially relevant in streaming, shopping, and short-session products

![Caser architecture](https://d2l.ai/_images/rec-caser.svg)

*Image credit: [Dive into Deep Learning](https://d2l.ai/chapter_recommender-systems/seqrec.html), CC BY-SA 4.0.*

D2L also provides a useful view of how sequence-aware samples are constructed from chronological user histories, including the held-out next item and sampled negatives:

![Sequence-aware data generation](https://d2l.ai/_images/rec-seq-data.svg)

*Image credit: [Dive into Deep Learning](https://d2l.ai/chapter_recommender-systems/seqrec.html), CC BY-SA 4.0.*

<div id="wide-and-deep-style-models"></div>

### 6.5 Wide-and-deep style models

Wide-and-deep architectures combine memorization and generalization.

- The wide component captures simpler feature interactions that may occur rarely
- The deep component learns richer nonlinear structure through embeddings and dense layers
- This pattern is effective when recommendation quality depends on both handcrafted cross-features and learned representations

![Wide-and-deep recommendation architecture](/media/recommender/rs-wide-deep.svg)

<div id="dlrm-style-models"></div>

### 6.6 DLRM-style models

DLRM-style models are designed for recommendation data with many categorical features and some numerical features.

- Embeddings handle sparse categorical inputs
- MLP layers process dense features
- Explicit pairwise feature interactions are then modeled before final prediction

![DLRM-style recommendation architecture](/media/recommender/rs-dlrm.svg)

These models are widely used in large-scale ranking and click-through prediction systems.

<div id="what-the-article-misses-for-production-ds-work"></div>

## 7. What the Article Misses for Production DS Work

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

<div id="practical-build-sequence-for-data-scientists"></div>

## 8. Practical Build Sequence for Data Scientists

1. Define objective hierarchy: short-term CTR vs long-term value.
2. Build strong non-ML baselines (popular, recent, co-visitation).
3. Add collaborative filtering (matrix factorization).
4. Add metadata for hybrid/cold-start robustness.
5. Introduce two-stage retrieval + ranking.
6. Establish experiment and monitoring standards.

<div id="summary"></div>

## 9. Summary

The article's core path is still the right conceptual backbone, the NVIDIA glossary expands it in useful ways, and the D2L chapter fills in important modeling and evaluation details:

- Explicit vs implicit feedback
- Recommendation tasks such as rating prediction, top-$n$ ranking, sequence-aware recommendation, CTR prediction, and cold-start
- Benchmark data practices such as MovieLens sparsity analysis and chronological evaluation splits
- Content-based, collaborative, contextual, and hybrid filtering
- Embedding-space candidate generation, similarity design, and matrix factorization variants
- AutoRec and ranking objectives such as BPR and hinge loss
- Feature-rich recommendation with factorization machines and DeepFM
- Deep recommenders such as two-tower retrieval, interaction-enhanced dual encoders, NCF, VAE-style models, wide-and-deep models, and DLRM-style architectures
- Hybrid models such as LightFM
- Three-stage production design with retrieval, scoring, and re-ranking for freshness, diversity, and fairness

For practicing data scientists, the differentiator is operational quality: robust labeling, unbiased evaluation, scalable serving, and disciplined online experimentation.

## Reference

- Article inspiration: [Recommender Systems — A Complete Guide to Machine Learning Models](https://towardsdatascience.com/recommender-systems-a-complete-guide-to-machine-learning-models-96d3f94ea748/)
- [21. Recommender Systems](https://d2l.ai/chapter_recommender-systems/index.html)
- [Google for Developers: Recommendation Systems course](https://developers.google.com/machine-learning/recommendation)
- [Shaped: The Two-Tower Model for Recommendation Systems: A Deep Dive](https://www.shaped.ai/blog/the-two-tower-model-for-recommendation-systems-a-deep-dive)
- [Sumit's Diary: Two Tower Model Architecture: Current State and Promising Extensions](https://blog.reachsumit.com/posts/2023/03/two-tower-model/)
- [NVIDIA Glossary: Recommendation System](https://www.nvidia.com/en-us/glossary/recommendation-system/)
- [Wikipedia: Recommender system](https://en.wikipedia.org/wiki/Recommender_system)
- [Surprise Python package](https://surpriselib.com/)
- [Simon Funk (2006): Netflix Update - Try This at Home](https://sifter.org/~simon/journal/20061211.html)
- [Mnih and Salakhutdinov (2007): Probabilistic Matrix Factorization (NeurIPS)](https://papers.nips.cc/paper_files/paper/2007/hash/d7322ed717dedf1eb4e6e52a37ea7bcd-Abstract.html)
- [Hu, Koren, Volinsky (2008): Collaborative Filtering for Implicit Feedback Datasets](https://doi.org/10.1109/ICDM.2008.22)
- [Koren, Bell, Volinsky (2009): Matrix Factorization Techniques for Recommender Systems](https://doi.org/10.1109/MC.2009.263)
- [Koren (2008): Factorization Meets the Neighborhood (SVD++)](https://doi.org/10.1145/1401890.1401944)
- [Kula (2015): Metadata Embeddings for User and Item Cold-start Recommendations (LightFM)](https://arxiv.org/abs/1507.08439)
