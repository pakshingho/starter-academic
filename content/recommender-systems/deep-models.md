---
title: 6. Deep Models
linktitle: 6. Deep Models
toc: false
type: docs
date: 2026-03-07
lastmod: 2026-03-10
draft: false
math: true
menu:
  recommender-systems:
    identifier: chapter-deep-models
    weight: 7
weight: 7
---

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
