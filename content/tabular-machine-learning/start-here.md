---
title: Start Here
linktitle: 0. Start Here
toc: false
type: docs
date: 2026-03-14
lastmod: 2026-03-14
draft: false
menu:
  tabular-machine-learning:
    identifier: chapter-start-here
    weight: 2
weight: 2
---

This short course is designed to feel like a guided handbook, not a stack of lecture notes. Start here to understand the scope, the rhythm, and what to focus on.

### Who this course is for

This material is a good fit if you:

- work with structured datasets such as transactions, surveys, operations data, customer records, or measurements
- want a practical overview of common ML methods without turning this into a purely mathematical course
- need enough fluency to build models, review model choices, or collaborate well with technical partners

### What this course covers

The course centers on a typical tabular ML workflow:

1. define the task and choose the right problem framing
2. inspect the data and prepare it for modeling
3. evaluate models in a disciplined way
4. compare classical and modern model families
5. turn model-building into a repeatable pipeline

### What this course does not try to do

- it does not cover deep theory in probability or optimization
- it does not aim to make neural networks the default answer for every tabular problem
- it does not treat AutoML as a substitute for judgment

Instead, it aims to make you effective with the kinds of tabular data problems that appear constantly in applied work.

### Suggested study rhythm

- Read one chapter at a time.
- Keep a small working notebook or scratchpad beside you.
- After each chapter, write down one modeling decision you would now make differently.
- Use the mini-project to consolidate the whole workflow.

### Setup suggestions

If you want to work hands-on while reading, a minimal setup is enough:

- Python
- pandas
- scikit-learn
- matplotlib or seaborn
- a notebook environment such as Jupyter

### Success criteria

By the end of the course, you should be able to:

- translate a practical question into a supervised or unsupervised ML task
- explain why a metric, split strategy, or preprocessing step was chosen
- compare at least three model families for the same dataset
- build a baseline workflow that is simple, reproducible, and defensible

### Before moving on

Use this quick self-check:

- Can I explain the difference between a prediction task and a product decision?
- Do I know what kind of tabular data problems I care about most?
- Am I willing to prioritize clean baselines over premature complexity?

If yes, move to the next chapter: [Workflow and Problem Framing](../workflow-and-problem-framing/).
