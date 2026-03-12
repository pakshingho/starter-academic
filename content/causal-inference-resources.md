---
title: Causal Inference Resources
date: 2026-03-12
type: page
summary: Curated causal inference references grouped by method, with alphabetized links.
---

This page curates high-signal causal inference material, inspired by and starting from [Awesome Causal Inference](https://github.com/matteocourthoud/awesome-causal-inference).

I grouped links by **methods** (instead of by content type) so you can jump directly to the estimation family you need. Within each section, links are sorted in **alphabetical order**.

## Core Collections

- [Awesome Causal Inference](https://github.com/matteocourthoud/awesome-causal-inference)
- [Causal Inference for the Brave and True (Cunningham)](https://mixtape.scunning.com/)
- [Causal Inference: The Mixtape (book site)](https://www.scunning.com/mixtape.html)
- [The Effect: An Introduction to Research Design and Causality (book)](https://theeffectbook.net/)

## Difference-in-Differences, Event Studies, and Synthetic Controls

- [did (R package)](https://bcallaway11.github.io/did/)
- [fixest (R package)](https://lrberge.github.io/fixest/)
- [HonestDiD (R package)](https://github.com/Mixtape-Sessions/HonestDiD)
- [SyntheticControlMethods (Python package)](https://github.com/OscarEngelbrektson/SyntheticControlMethods)
- [Synth (R package)](https://cran.r-project.org/package=Synth)

## Instrumental Variables and Regression Discontinuity

- [AER::ivreg (R package)](https://cran.r-project.org/package=AER)
- [ivreg (R package)](https://zeileis.github.io/ivreg/)
- [linearmodels (Python package)](https://bashtage.github.io/linearmodels/)
- [rdrobust](https://rdpackages.github.io/rdrobust/)
- [rddensity](https://rdpackages.github.io/rddensity/)

## Matching, Weighting, and General Causal Estimation

- [causalinference (Python package)](https://github.com/laurencium/Causalinference)
- [CausalML Book (Matheus Facure)](https://matheusfacure.github.io/python-causality-handbook/)
- [DoWhy (Python package)](https://www.pywhy.org/dowhy/)
- [EconML (Python package)](https://www.pywhy.org/EconML/)
- [MatchIt (R package)](https://kosukeimai.github.io/MatchIt/)
- [WeightIt (R package)](https://ngreifer.github.io/WeightIt/)

## Causal Graphs and Discovery

- [Causal Discovery Toolbox (Python package)](https://fentechsolutions.github.io/CausalDiscoveryToolbox/html/index.html)
- [dagitty](https://www.dagitty.net/)
- [gCastle (Python package)](https://gcastle.readthedocs.io/)
- [pgmpy (Python package)](https://pgmpy.org/)

## Uplift and Heterogeneous Treatment Effects

- [Causal Forests in grf (R package)](https://grf-labs.github.io/grf/)
- [CausalML (Python package)](https://causalml.readthedocs.io/)
- [DoubleML](https://docs.doubleml.org/)
- [metalearners (Python package)](https://metalearners.readthedocs.io/)
- [X-Learner / Meta-Learners overview (Künzel et al.)](https://www.pnas.org/doi/10.1073/pnas.1706608114)

## Should we build a retrieval tool?

Short answer: **not yet**.

A retrieval tool is useful when the resource list becomes too large or changes frequently. For now, this static page is easier to maintain and keeps quality high.

If you want, next iteration can add:

1. A small script that ingests `awesome-causal-inference` link metadata.
2. Rules to auto-sort links alphabetically within each method section.
3. A generated markdown output checked into this repo.
