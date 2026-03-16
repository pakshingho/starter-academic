---
title: Data Science Foundations for New Grads
linktitle: Overview
summary: A compact handbook on the minimum practical knowledge needed to work credibly in data science as a new graduate.
date: 2026-03-15
lastmod: 2026-03-15
draft: false
type: docs
layout: docs
menu:
  data-science-foundations:
    name: Overview
    identifier: chapter-overview
    weight: 1
weight: 1
toc: false
---

Data science can look overwhelming because the field borrows from statistics, machine learning, software, analytics, and product thinking all at once. In practice, the minimum useful core is smaller than it first appears.

This handbook focuses on the set of ideas a fresh graduate should understand well enough to contribute on a real team:

- reason about uncertainty instead of treating every number as exact
- measure change with sound statistical and experimental thinking
- build and evaluate simple models before reaching for complexity
- write SQL and understand the shape of the data underneath it
- code clearly enough for other people to trust and reuse your work
- connect analysis to product, business, and operational decisions

## Why this handbook exists

Many learning paths in data science are either too academic or too tool-specific. This one is meant to be a practical first layer.

It is not trying to turn you into a specialist in every subfield. It is trying to make you reliable.

## Course at a glance

- Format: self-paced online handbook
- Suggested pace: 4 to 6 hours total
- Audience: fresh graduates, junior data scientists, analysts moving into data science, and anyone who wants a clean first mental model
- Prerequisites: basic Python familiarity and comfort with algebra, tables, and plots

## What "minimum knowledge" means here

Minimum does not mean shallow.

It means you should be able to:

- ask the right clarifying questions before touching data
- tell when a metric, split, or experiment is misleading
- explain the strengths and risks of a simple model choice
- avoid common SQL mistakes such as counting the wrong grain after a join
- turn analysis into a recommendation with assumptions and caveats stated clearly

## Skill map

| Core area | Main question | Minimum standard |
| --- | --- | --- |
| Probability | How uncertain is the world behind the data? | understand conditional probability, expectation, and common distributions |
| Statistics | Is a difference real, noisy, or practically unimportant? | understand sampling variability, confidence intervals, testing, and power |
| Machine learning | When should we model, and how do we know the model is any good? | build baselines, evaluate honestly, and recognize overfitting and leakage |
| SQL and data modeling | What exactly does each row mean, and how do tables relate? | work confidently with joins, aggregation, windows, and primary keys |
| Coding | Can someone else trust and rerun this work? | write readable functions, reason about complexity, and test edge cases |
| Product thinking | Why does this metric matter? | connect user behavior to business goals and guardrails |
| Case thinking | How do we move from ambiguity to a practical answer? | scope the problem, propose a method, and communicate trade-offs |

## Course path

1. [Start Here](start-here/)
2. [Probability and Uncertainty](probability-and-uncertainty/)
3. [Statistics and Experiments](statistics-and-experiments/)
4. [Machine Learning Essentials](machine-learning-essentials/)
5. [SQL and Data Modeling](sql-and-data-modeling/)
6. [Coding Habits for Data Work](coding-habits-for-data-work/)
7. [Product Thinking and Metrics](product-thinking-and-metrics/)
8. [End-to-End Case Thinking](end-to-end-case-thinking/)

## How to use this handbook

Read it in order if you are new. If you already know the basics of statistics or coding, you can jump directly to the sections where you feel least confident.

This handbook is intentionally reading-first. It is designed to help you build judgment quickly, not to bury you under proofs or long problem sets.

If you want deeper follow-up after this, the site also has fuller handbooks on [Applied Machine Learning for Tabular Data](/tabular-machine-learning/) and [Decision Trees and Ensemble Methods in Machine Learning](/tree-based-machine-learning/).
