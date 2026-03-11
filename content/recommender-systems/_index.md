---
title: Understanding Recommender Systems
linktitle: Overview
summary: A chapter-based guide to recommender systems for data scientists, spanning problem framing, modeling, evaluation, and production design.
date: 2026-03-07
lastmod: 2026-03-11
draft: false
type: docs
layout: docs
menu:
  recommender-systems:
    name: Overview
    identifier: chapter-overview
    weight: 1
weight: 1
toc: false
---

A chapter-based guide to recommender systems for data scientists, spanning problem framing, modeling, evaluation, and production design.

## Formats

- [Handbook version](/recommender-systems/) for chapter-by-chapter reading and left-sidebar navigation
- [Single-page version](/recommender-systems-single-page/) for printing or saving as PDF

## Chapter Guide

1. [Why Recommender Systems Matter](why-it-matters/)
2. [Explicit vs. Implicit Feedback](explicit-vs-implicit-feedback/)
3. [Model Families](model-families/)
4. [Matrix Factorization](matrix-factorization/)
5. [Feature-Rich Recommendation](feature-rich-recommendation/)
6. [Deep Models](deep-models/)
7. [Production Concerns](production-concerns/)
8. [Build Sequence](build-sequence/)
9. [Summary](summary/)
10. [References](references/)
11. [Survey Papers and Further Reading](survey-papers-and-further-reading/)

## What This Covers

- problem framing and recommendation surfaces
- explicit, implicit, and sequence-aware recommendation tasks
- content-based, collaborative, contextual, and hybrid approaches
- factorization, ranking objectives, and deep retrieval/ranking models
- evaluation strategy, negative design, and production architecture

![Two-stage recommender architecture](/media/recommender/rs-two-stage-pipeline.svg)

## Acknowledgments

This handbook draws on a mix of open educational material, public documentation, blog-style explainers, and research papers that make recommender systems easier to learn and easier to operationalize.

In particular, several chapters and figures benefited from:

- [Dive into Deep Learning, Chapter 21](https://d2l.ai/chapter_recommender-systems/index.html), especially for task framing, evaluation, and a number of CC BY-SA figures
- [Google for Developers: Recommendation Systems course](https://developers.google.com/machine-learning/recommendation), especially for retrieval, ranking, negative sampling, and production-system tradeoffs
- [NVIDIA Glossary: Recommendation System](https://www.nvidia.com/en-us/glossary/recommendation-system/), especially for concise taxonomy and deep-recommender framing
- public technical write-ups and papers that bridge classical collaborative filtering with modern retrieval and ranking systems

<div class="article-widget">
  <div class="post-nav">
    <div class="post-nav-item"></div>
    <div class="post-nav-item">
      <div class="meta-nav">Next</div>
      <a href="/recommender-systems/why-it-matters/">1. Why Recommender Systems Matter</a>
    </div>
  </div>
</div>
