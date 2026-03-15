---
title: Causal Inference Resources
date: 2026-03-14
type: page
summary: A broad causal inference reference library covering books, courses, software, papers, tutorials, industry case studies, blogs, talks, and conferences.
---

A broad reference library for learning, applying, and staying current with causal inference. It is organized by format and use case so you can move from foundations to methods to production practice.

Most readers do not need every section. If you are new to the area, start with the short guides below and then jump into the subsection that matches your problem.

## 1) Start Here

- Foundations first: start with [Causal Inference: What If](https://www.hsph.harvard.edu/miguel-hernan/causal-inference-book/), [The Effect](https://theeffectbook.net/), and [Causal Inference: The Mixtape](https://mixtape.scunning.com/).
- Product experimentation: start with [Decision Making at Netflix](https://netflixtechblog.com/decision-making-at-netflix-33065fa06481), [Improving the Sensitivity of Online Controlled Experiments by Utilizing Pre-Experiment Data](https://www.exp-platform.com/Documents/2013-02-CUPED-ImprovingSensitivityOfControlledExperiments.pdf), and [Experiment Rigor for Switchback Experiment Analysis](https://doordash.engineering/2019/02/20/experiment-rigor-for-switchback-experiment-analysis/).
- Causal ML and personalization: start with [Applied Causal Inference Powered by ML and AI](https://causalml-book.org/), [Double/Debiased Machine Learning for Treatment and Structural Parameters](https://arxiv.org/pdf/1608.00060.pdf), and [EconML](https://github.com/py-why/EconML/).
- Observational policy evaluation: start with [Causal Inference for Statistics, Social, and Biomedical Sciences](https://www.cambridge.org/core/books/causal-inference-for-statistics-social-and-biomedical-sciences/71126BE90C58F1A431FE9B2DD07938AB), [Matching on the Estimated Propensity Score](https://onlinelibrary.wiley.com/doi/abs/10.3982/ECTA11293), and [Difference-in-Differences with Multiple Time Periods](https://arxiv.org/abs/1803.09015).

## 2) Choose by Problem

- Need better A/B tests or experimentation systems: use the industry experimentation section for platform design, variance reduction, trustworthy experimentation, and switchbacks.
- Need uplift, personalization, or treatment heterogeneity: combine the causal ML papers, the Python libraries section, and the heterogeneity case studies.
- Need matching or weighting for observational studies: use the method-specific package list for `MatchIt`, `WeightIt`, `cobalt`, `CBPS`, `optmatch`, and `PSweight`, then pair them with the observational papers.
- Need difference-in-differences or staggered adoption methods: use `did`, `did2s`, `DRDID`, `HonestDiD`, `eventStudyInteract`, and the panel-method papers.
- Need instrumental variables or regression discontinuity: start with the IV/RD package cluster plus the canonical IV and RD papers.
- Need time-varying treatment or longitudinal causal inference: start with the TMLE and longitudinal package cluster, then move to `Targeted Learning`, `Targeted Learning in Data Science`, and `Causal Inference: What If`.
- Need marketplace, network, or interference methods: jump directly to the interference papers and the marketplace case studies.

## 3) Books and Core References

### Open / free books

- [Advanced Data Analysis from an Elementary Point of View](https://www.stat.cmu.edu/~cshalizi/ADAfaEPoV/)
- [Applied Causal Inference Powered by ML and AI](https://causalml-book.org/)
- [Causal Inference for the Brave and True](https://matheusfacure.github.io/python-causality-handbook/landing-page.html)
- [Causal Inference: The Mixtape](https://mixtape.scunning.com/)
- [Causal Inference: What If](https://www.hsph.harvard.edu/miguel-hernan/causal-inference-book/)
- [The Effect](https://theeffectbook.net/)

### Print and paid books

- [Causal Analysis](https://mitpress.mit.edu/9780262545914/causal-analysis/)
- [Causal Inference and Discovery in Python](https://www.packtpub.com/product/causal-inference-and-discovery-in-python/9781804612989)
- [Causal Inference for Statistics, Social, and Biomedical Sciences](https://www.cambridge.org/core/books/causal-inference-for-statistics-social-and-biomedical-sciences/71126BE90C58F1A431FE9B2DD07938AB)
- [Causal Inference in Python](https://www.oreilly.com/library/view/causal-inference-in/9781098140243/)
- [Causal Inference in Statistics: A Primer](https://www.wiley.com/en-us/Causal+Inference+in+Statistics%3A+A+Primer-p-9781119186847)
- [Causality](https://www.cambridge.org/core/books/causality/B0046844FAE10CBF274D4ACBDAEB5F5B)
- [Counterfactuals and Causal Inference](https://www.cambridge.org/core/books/counterfactuals-and-causal-inference/5CC81E6DF63C5E5A8B88F79D45E1D1B7)
- [Design of Observational Studies](https://link.springer.com/book/10.1007/978-1-4419-1213-8)
- [Elements of Causal Inference](https://mitpress.mit.edu/9780262037310/elements-of-causal-inference/)
- [Handbook of Causal Analysis for Social Research](https://link.springer.com/book/10.1007/978-94-007-6094-37)
- [Impact Evaluation: Treatment Effects and Causal Analysis](https://www.cambridge.org/ch/universitypress/subjects/economics/econometrics-statistics-and-mathematical-economics/impact-evaluation-treatment-effects-and-causal-analysis?format=AR&isbn=9781108617772)
- [Mostly Harmless Econometrics](https://press.princeton.edu/books/paperback/9780691120355/mostly-harmless-econometrics)
- [Quasi-Experimentation: A Guide to Design and Analysis](https://www.guilford.com/books/Quasi-Experimentation/Charles-Reichardt/9781462540204)
- [Targeted Learning](https://link.springer.com/book/10.1007/978-1-4419-9782-1)
- [Targeted Learning in Data Science](https://link.springer.com/book/10.1007/978-3-319-65304-4)

## 4) Courses, Lecture Notes, and Teaching Material

### Video lecture series

- [Applied Methods](https://www.youtube.com/playlist?list=PLWWcL1M3lLlojLTSVf2gGYQ_9TlPyPbiJ)
- [Causal Inference](https://www.youtube.com/@imaikosuke/playlists)
- [Causal Inference with Panel Data](https://www.youtube.com/playlist?list=PLo0lw6BstMGZQqx_r1GnOETkFYihCgve9)
- [Causality Boot Camp](https://www.youtube.com/playlist?list=PLgKuh-lKre11SiNLE2BNNg59MGcTCpbQx)
- [Machine Learning and Causal Inference](https://www.youtube.com/playlist?list=PLxq_lXOUlvQAoWZEqhRqHNezS30lI49G-)
- [Mastering Mostly Harmless Econometrics](https://www.aeaweb.org/conference/cont-ed/2020-webcasts)
- [Modern Sampling Methods: Design and Inference](https://www.aeaweb.org/conference/cont-ed/2022-webcasts)
- [Modern Topics in Uncertainty Quantification](https://www.youtube.com/playlist?list=PLlIlhe_rS4U0D3jRXfwTfq3aDngb3w-hU)

### Slides and lecture notes

- [A First Course in Causal Inference](https://arxiv.org/pdf/2305.18793.pdf)
- [A User's Guide to Statistical Inference and Regression](https://mattblackwell.github.io/gov2002-book/)
- [Causal Econometrics](https://donskerclass.github.io/CausalEconometrics.html)
- [Causal Inference and Machine Learning](https://apoorvalal.github.io/talks/2021-GraduateSequenceTeaching/)
- [Causal Inference](https://www2.stat.duke.edu/~fl35/CausalInferenceClass.html)
- [Causal Machine Learning](https://github.com/MisraLab/cml.github.io/tree/main)
- [Introduction to Causal Inference](https://www.ucbbiostat.com/)
- [Introduction to Modern Causal Inference](https://alejandroschuler.github.io/mci/)
- [R Guide for TMLE in Medical Research](https://ehsanx.github.io/TMLEworkshop/)
- [Stefan Wager Causal Inference Notes](https://web.stanford.edu/~swager/stats361.pdf)

## 5) Libraries and Tooling

### Python

- [ananke](https://ananke.readthedocs.io/en/latest/)
- [causal-learn](https://github.com/py-why/causal-learn)
- [causal-tune](https://github.com/py-why/causaltune)
- [CausalML](https://github.com/uber/causalml)
- [CausalNex](https://github.com/quantumblacklabs/causalnex/)
- [CausalPy](https://github.com/pymc-labs/CausalPy)
- [DeepIV](https://github.com/jhartford/DeepIV)
- [DoWhy](https://github.com/py-why/dowhy)
- [DoubleML](https://github.com/DoubleML/doubleml-for-py)
- [EconML](https://github.com/py-why/EconML/)
- [GeoLift](https://github.com/facebookincubator/GeoLift/)
- [linearmodels](https://github.com/bashtage/linearmodels/)
- [metalearners](https://github.com/Quantco/metalearners)
- [pyfixest](https://github.com/s3alfisc/pyfixest)
- [scikit-uplift](https://github.com/maks-sh/scikit-uplift)
- [Statsmodels](https://github.com/statsmodels/statsmodels)
- [trimmed_match](https://github.com/google/trimmed_match)

### R

- [CausalImpact](https://github.com/google/CausalImpact)
- [DAGitty](https://github.com/jtextor/dagitty)
- [fixest](https://github.com/lrberge/fixest)
- [ggdag](https://github.com/r-causal/ggdag)
- [grf](https://github.com/grf-labs/grf/)
- [pcalg](https://cran.r-project.org/web/packages/pcalg/index.html)
- [Robyn](https://github.com/facebookexperimental/Robyn/)
- [synthdid](https://github.com/synth-inference/synthdid)
- [tidyhte](https://github.com/ddimmery/tidyhte)

### Julia

- [CausalELM.jl](https://github.com/dscolby/CausalELM.jl)
- [CausalInference.jl](https://github.com/mschauer/CausalInference.jl)
- [FixedEffectModels.jl](https://github.com/FixedEffects/FixedEffectModels.jl)

### Method-specific econometrics and diagnostics

#### Matching, weighting, and balance

- [CBPS](https://imai.fas.harvard.edu/software/CBPS.html)
- [cobalt](https://ngreifer.github.io/cobalt/)
- [MatchIt](https://kosukeimai.github.io/MatchIt/)
- [optmatch](https://cran.r-project.org/package=optmatch)
- [PSweight](https://cran.r-project.org/package=PSweight)
- [twang](https://cran.r-project.org/package=twang)
- [WeightIt](https://ngreifer.github.io/WeightIt/)

#### Difference-in-differences, event studies, and panel methods

- [did](https://bcallaway11.github.io/did/)
- [did2s](https://github.com/kylebutts/did2s)
- [DRDID](https://psantanna.com/DRDID/index.html)
- [eventStudyInteract](https://github.com/lsun20/EventStudyInteract)
- [HonestDiD](https://github.com/Mixtape-Sessions/HonestDiD)
- [PanelMatch](https://cran.r-project.org/package=PanelMatch)

#### Instrumental variables and regression discontinuity

- [AER](https://cran.r-project.org/package=AER)
- [ivmodel](https://cran.r-project.org/package=ivmodel)
- [ivreg](https://zeileis.github.io/ivreg/)
- [rdlocrand](https://rdpackages.github.io/rdlocrand/)
- [rdpower](https://rdpackages.github.io/rdpower/)
- [rdrobust](https://rdpackages.github.io/rdrobust/)

#### TMLE and longitudinal treatment

- [gfoRmula](https://cran.r-project.org/package=gfoRmula)
- [ltmle](https://cran.r-project.org/package=ltmle)
- [stremr](https://cran.r-project.org/package=stremr)
- [tmle](https://cran.r-project.org/package=tmle)
- [tmle3](https://tlverse.org/tmle3/)

## 6) Foundational and Canonical Papers

### Foundations and DAGs

- [A Crash Course in Good and Bad Controls](https://journals.sagepub.com/doi/full/10.1177/00491241221099552)
- [Causal Diagrams for Empirical Research](https://academic.oup.com/biomet/article/82/4/669/251647)
- [Causal Inference Using Potential Outcomes](https://www.tandfonline.com/doi/abs/10.1198/016214504000001880)
- [Estimating Causal Effects of Treatments in Randomized and Nonrandomized Studies](http://www.fsb.muohio.edu/lij14/420_paper_Rubin74.pdf)
- [Natural Experiments](https://arxiv.org/pdf/2002.00202.pdf)

### Heterogeneous treatment effects and causal ML

- [Adapting Neural Networks for the Estimation of Treatment Effects](https://arxiv.org/pdf/1906.02120.pdf)
- [Double/Debiased Machine Learning for Treatment and Structural Parameters](https://arxiv.org/pdf/1608.00060.pdf)
- [Empirical Analysis of Model Selection for Heterogeneous Causal Effect Estimation](https://arxiv.org/pdf/2211.01939.pdf)
- [Machine Learning Estimation of Heterogeneous Causal Effects: Empirical Monte Carlo Evidence](https://arxiv.org/pdf/1810.13237.pdf)
- [Meta-learners for Estimating Heterogeneous Treatment Effects using Machine Learning](https://arxiv.org/pdf/1706.03461.pdf)
- [Quasi-Oracle Estimation of Heterogeneous Treatment Effects](https://arxiv.org/pdf/1712.04912.pdf)
- [Towards Optimal Doubly Robust Estimation of Heterogeneous Causal Effects](https://arxiv.org/pdf/2004.14497.pdf)

### Experiments, bandits, and interference

- [Asymptotically Efficient Adaptive Allocation Rules](https://www.sciencedirect.com/science/article/pii/0196885885900028)
- [Design and Analysis of Switchback Experiments](https://arxiv.org/pdf/2009.00148.pdf)
- [Estimation Considerations in Contextual Bandits](https://arxiv.org/pdf/1711.07077.pdf)
- [Exact P-values for Network Interference](https://arxiv.org/pdf/1506.02084.pdf)
- [On Causal Inference in the Presence of Interference](https://journals.sagepub.com/doi/pdf/10.1177/0962280210386779)
- [Time-uniform, Nonparametric, Nonasymptotic Confidence Sequences](https://arxiv.org/abs/1810.08240.pdf)
- [Toward Causal Inference With Interference](https://www.tandfonline.com/doi/abs/10.1198/016214508000000292)

### Observational and quasi-experimental methods

- [Difference-in-Differences with Multiple Time Periods](https://arxiv.org/abs/1803.09015)
- [Difference-in-Differences with Variation in Treatment Timing](https://www.sciencedirect.com/science/article/abs/pii/S0304407621001445)
- [Efficient Estimation of Average Treatment Effects Using the Estimated Propensity Score](https://onlinelibrary.wiley.com/doi/abs/10.1111/1468-0262.00442)
- [Identification and Estimation of Local Average Treatment Effects](https://www.jstor.org/stable/2951620)
- [Identification and Estimation of Treatment Effects with a Regression-Discontinuity Design](https://www.jstor.org/stable/pdf/2692190.pdf)
- [Large Sample Properties of Matching Estimators for Average Treatment Effects](https://onlinelibrary.wiley.com/doi/abs/10.1111/j.1468-0262.2006.00655.x)
- [Matching on the Estimated Propensity Score](https://onlinelibrary.wiley.com/doi/abs/10.3982/ECTA11293)
- [Synthetic Difference In Differences Estimation](https://arxiv.org/pdf/2301.11859.pdf)
- [The Central Role of the Propensity Score in Observational Studies for Causal Effects](https://academic.oup.com/biomet/article/70/1/41/240879)

### Inference and robustness

- [Robust Standard Errors in Small Samples: Some Practical Advice](https://direct.mit.edu/rest/article-abstract/98/4/701/58336/Robust-Standard-Errors-in-Small-Samples-Some)
- [Sampling-Based versus Design-Based Uncertainty in Regression Analysis](https://onlinelibrary.wiley.com/doi/full/10.3982/ECTA12675)
- [Targeted Maximum Likelihood Estimation for Causal Inference in Observational Studies](https://academic.oup.com/aje/article/185/1/65/2662306)
- [When Should You Adjust Standard Errors for Clustering?](https://academic.oup.com/qje/article/138/1/1/6750017)

## 7) Tutorials, Surveys, and Practitioner Guides

- [A Practical Introduction to Regression Discontinuity Designs: Extensions](https://arxiv.org/pdf/2301.08958.pdf)
- [A Practical Introduction to Regression Discontinuity Designs: Foundations](https://arxiv.org/pdf/1911.09511.pdf)
- [A Tutorial on Thompson Sampling](https://arxiv.org/abs/1707.02038)
- [Causal Models for Longitudinal and Panel Data: A Survey](https://www.nber.org/papers/w31942)
- [Group Sequential Designs: A Tutorial](https://osf.io/preprints/psyarxiv/x4azm)
- [Using Synthetic Controls: Feasibility, Data Requirements, and Methodological Aspects](https://par.nsf.gov/servlets/purl/10331930)
- [What's Trending in Difference-in-Differences? A Synthesis of the Recent Econometrics Literature](https://arxiv.org/pdf/2201.01194.pdf)

## 8) Industry Experimentation and Applied Case Studies

### Experimentation platforms and systems

- [Decision Making at Netflix](https://netflixtechblog.com/decision-making-at-netflix-33065fa06481)
- [Democratizing Online Controlled Experiments at Booking.com](https://arxiv.org/pdf/1710.08217.pdf)
- [Experimentation Platform at Zalando: Part 1 - Evolution](https://engineering.zalando.com/posts/2021/01/experimentation-platform-part1.html)
- [How We Reimagined A/B Testing at Squarespace](https://engineering.squarespace.com/blog/2021/how-we-reimagined-ab-testing-at-squarespace)
- [How We Scaled Experimentation at Hulu](https://medium.com/disney-streaming/how-we-scaled-experimentation-at-hulu-82d62a4779be)
- [Scaling Airbnb's Experimentation Platform](https://medium.com/airbnb-engineering/https-medium-com-jonathan-parks-scaling-erf-23fd17c91166)
- [Spotify's New Experimentation Platform](https://engineering.atspotify.com/2020/10/spotifys-new-experimentation-platform-part-1/)
- [Supporting Rapid Product Iteration with an Experimentation Analysis Platform](https://doordash.engineering/2020/09/09/experimentation-analysis-platform-mvp/)
- [Under the Hood of Uber's Experimentation Platform](https://www.uber.com/en-JP/blog/xp/)

### Power, variance reduction, and metrics

- [Comparing Quantiles at Scale in Online A/B-Testing](https://engineering.atspotify.com/2022/03/comparing-quantiles-at-scale-in-online-a-b-testing/)
- [CUPED for Switchback Tests](https://medium.com/@garret.oconnell/cuped-for-switchback-tests-9e5b924ce1b0)
- [Deep Dive Into Variance Reduction](https://www.microsoft.com/en-us/research/group/experimentation-platform-exp/articles/deep-dive-into-variance-reduction/)
- [How Booking.com Increases the Power of Online Experiments with CUPED](https://booking.ai/how-booking-com-increases-the-power-of-online-experiments-with-cuped-995d186fff1d)
- [How Meta Scaled Regression Adjustment to Improve Power Across Hundreds of Thousands of Experiments](https://medium.com/@AnalyticsAtMeta/how-meta-scaled-regression-adjustment-to-improve-power-across-hundreds-of-thousands-of-experiments-624e08aaf560)
- [Improving Experimental Power through Control Using Predictions as Covariate (CUPAC)](https://doordash.engineering/2020/06/08/improving-experimental-power-through-control-using-predictions-as-covariate-cupac/)
- [Improving the Sensitivity of Online Controlled Experiments by Utilizing Pre-Experiment Data](https://www.exp-platform.com/Documents/2013-02-CUPED-ImprovingSensitivityOfControlledExperiments.pdf)
- [Large-Scale Online Experimentation with Quantile Metrics](https://arxiv.org/pdf/1903.08762.pdf)

### Network effects, switchbacks, and marketplace interference

- [Budget-split Testing: A Trustworthy and Powerful Approach to Marketplace A/B Testing](https://engineering.linkedin.com/blog/2021/budget-split-testing)
- [Detecting Interference: An A/B Test of A/B Tests](https://engineering.linkedin.com/blog/2019/06/detecting-interference--an-a-b-test-of-a-b-tests)
- [Experiment Rigor for Switchback Experiment Analysis](https://doordash.engineering/2019/02/20/experiment-rigor-for-switchback-experiment-analysis/)
- [Experimental Design in Two-Sided Platforms: An Analysis of Bias](https://arxiv.org/abs/2002.05670)
- [How Meta Tests Products with Strong Network Effects](https://medium.com/@AnalyticsAtMeta/how-meta-tests-products-with-strong-network-effects-96003a056c2c)
- [Reducing Marketplace Interference Bias Via Shadow Prices](https://arxiv.org/abs/2205.02274)
- [Tips and Considerations for Switchback Test Designs](https://medium.com/bolt-labs/tips-and-considerations-for-switchback-test-designs-d1bd7c493024)
- [Using Ego-Clusters to Measure Network Effects at LinkedIn](https://arxiv.org/pdf/1903.08755.pdf)

### Heterogeneous treatment effects, personalization, and bandits

- [Free Lunch! Retrospective Uplift Modeling for Dynamic Promotions Recommendation within ROI Constraints](https://arxiv.org/pdf/2008.06293.pdf)
- [Heterogeneous Treatment Effects at Netflix](https://netflixtechblog.medium.com/heterogeneous-treatment-effects-at-netflix-da5c3dd58833)
- [Leveraging Causal Modeling to Get More Value from Flat Experiment Results](https://doordash.engineering/2020/09/18/causal-modeling-to-get-more-value-from-flat-experiment-results)
- [Multi-Armed Bandits and the Stitch Fix Experimentation Platform](https://multithreaded.stitchfix.com/blog/2020/08/05/bandits/)
- [Practical Bandits: An Industry Perspective](https://www.youtube.com/watch?v=NkVWwZKdMac)
- [Smarter Promotions With Causal Machine Learning](https://careersatdoordash.com/blog/doordash-smarter-promotions-with-causal-machine-learning)

### Quasi-experiments, synthetic controls, and counterfactual measurement

- [Gaining Confidence in Synthetic Control Causal Inference with Sensitivity Analysis](https://research.atspotify.com/2023/04/gaining-confidence-in-synthetic-control-causal-inference-with-sensitivity-analysis/)
- [How to Use Quasi-experiments and Counterfactuals to Build Great Products](https://medium.com/data-shopify/how-to-use-quasi-experiments-and-counterfactuals-to-build-great-products-487193794da)
- [Key Challenges with Quasi Experiments at Netflix](https://netflixtechblog.com/key-challenges-with-quasi-experiments-at-netflix-89b4f234b852)
- [Optimizing at the Edge: Using Regression Discontinuity Designs to Power Decision-Making](https://tech.instacart.com/optimizing-at-the-edge-using-regression-discontinuity-designs-to-power-decision-making-51e296615046)
- [Quasi Experimentation at Netflix](https://netflixtechblog.com/quasi-experimentation-at-netflix-566b57d2e362)
- [Using Back-Door Adjustment Causal Analysis to Measure Pre-Post Effects](https://doordash.engineering/2022/06/02/using-back-door-adjustment-causal-analysis-to-measure-pre-post-effects/)

### Trustworthy experimentation and diagnostics

- [Addressing the Challenges of Sample Ratio Mismatch in A/B Testing](https://doordash.engineering/2023/10/17/addressing-the-challenges-of-sample-ratio-mismatch-in-a-b-testing/)
- [Data Quality: Fundamental Building Blocks for Trustworthy A/B Testing Analysis](https://www.microsoft.com/en-us/research/group/experimentation-platform-exp/articles/data-quality-fundamental-building-blocks-for-trustworthy-a-b-testing-analysis/)
- [Imbalance Detection for Healthier Experimentation](https://www.etsy.com/codeascraft/imbalance-detection-for-healthier-experimentation)
- [Patterns of Trustworthy Experimentation: During-Experiment Stage](https://www.microsoft.com/en-us/research/group/experimentation-platform-exp/articles/patterns-of-trustworthy-experimentation-during-experiment-stage/)
- [Patterns of Trustworthy Experimentation: Post-Experiment Stage](https://www.microsoft.com/en-us/research/group/experimentation-platform-exp/articles/patterns-of-trustworthy-experimentation-post-experiment-stage/)
- [Patterns of Trustworthy Experimentation: Pre-Experiment Stage](https://www.microsoft.com/en-us/research/group/experimentation-platform-exp/articles/patterns-of-trustworthy-experimentation-pre-experiment-stage/)
- [Why We Shouldn't Condition on Posttreatment Variables in Experiments](https://medium.com/@AnalyticsAtMeta/why-we-shouldnt-condition-on-posttreatment-variables-in-experiments-5746220133ca)

## 9) Blogs and Ongoing Writing

### Industry and applied experimentation

- [Airbnb Engineering](https://medium.com/airbnb-engineering)
- [Booking AI](https://booking.ai/)
- [DoorDash Engineering](https://doordash.engineering/category/data-platform/)
- [Instacart Data Science](https://tech.instacart.com/tagged/data-science)
- [Microsoft Data Science](https://medium.com/data-science-at-microsoft)
- [Microsoft Experimentation Platform](https://www.microsoft.com/en-us/research/group/experimentation-platform-exp/)
- [Netflix Tech Blog](https://netflixtechblog.com)
- [Spotify Data Science](https://engineering.atspotify.com/category/data-science/)
- [Spotify Research](https://research.atspotify.com/)
- [Uber Engineering](https://www.uber.com/en-DE/blog/berlin/engineering/)
- [Wayfair Data Science](https://www.aboutwayfair.com/tag/data-science)
- [Zalando Engineering](https://engineering.zalando.com/)

### Independent and academic writing

- [Data Colada](https://datacolada.org/)
- [evanmiller.org](https://www.evanmiller.org/)
- [Numbers, Letters, Sometimes Both](https://dpananos.github.io/)
- [Statistical Modeling, Causal Inference, and Social Science](https://statmodeling.stat.columbia.edu/)
- [Statistical Odds and Ends](https://statisticaloddsandends.wordpress.com/)

## 10) Talks, Seminars, and Communities

### Talks and recorded lectures

- [A Tutorial on Bayesian Causal Inference](https://www.youtube.com/watch?v=9pZtsVA6o4o)
- [Always Valid Inference: Continuous Monitoring of A/B Test](https://www.youtube.com/watch?v=BanBrr3Hzm8)
- [Analysis and Design of Multi-Armed Bandit Experiments and Policy Learning](https://www.youtube.com/watch?v=I6GyDWh8kfw)
- [Causal Inference Libraries: What They Do, What I'd Like Them To Do](https://www.youtube.com/watch?v=cRS4yZt6OU4)
- [Interference and Spillovers in Randomized Experiments](https://www.youtube.com/watch?v=i5kyzT_CpwQ)
- [Modern Balancing Methods for Causal Inference](https://www.youtube.com/watch?v=CO9VnGy3esI)
- [Regression Discontinuity Designs: Foundations](https://www.youtube.com/watch?v=ckZx0j1tYoY)
- [Regression Discontinuity Designs: Practice and Topics](https://www.youtube.com/watch?v=bFNUeTXOnQ4)
- [Synthetic Controls: Methods and Practice](https://www.youtube.com/watch?v=oDNaOpNK6G4)

### Conferences and recurring communities

- [American Causal Inference Conference](https://sci-info.org/annual-meeting/)
- [Causal Data Science Meeting](https://www.causalscience.org/)
- [Causal Learning and Reasoning](https://www.cclear.cc/)
- [Conference on Digital Experimentation (MIT IDE)](https://ide.mit.edu/events/code24/)
- [European Causal Inference Meeting](https://www.eurocim.org/)
- [Interactive Causal Learning Conference](http://interactivecausallearning.com/2023/)
- [Pacific Causal Inference Conference](https://www.spco.cc/pcic/)
