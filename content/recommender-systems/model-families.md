---
title: 3. Model Families
linktitle: 3. Model Families
toc: true
type: docs
date: 2026-03-07
lastmod: 2026-03-10
draft: false
math: true
menu:
  recommender-systems:
    weight: 4
weight: 4
---

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
