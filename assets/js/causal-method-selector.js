document.addEventListener("DOMContentLoaded", function () {
  var tool = document.getElementById("causal-tool");
  if (!tool) {
    return;
  }

  var GOAL_OPTIONS = {
    experimental: [
      { value: "ate", label: "Estimate the main average treatment effect" },
      { value: "variance", label: "Improve precision with pre-period data" },
      { value: "noncompliance", label: "Handle noncompliance or encouragement design" },
      { value: "heterogeneity", label: "Learn heterogeneous effects or targeting policy" },
      { value: "mechanism", label: "Understand pathways or mediation" },
      { value: "salvage", label: "Repair imbalance, leakage, or experimental failure" }
    ],
    observational: [
      { value: "ate", label: "Estimate an average treatment effect" },
      { value: "policy", label: "Evaluate policy or rollout over time" },
      { value: "threshold", label: "Exploit a cutoff or threshold rule" },
      { value: "instrument", label: "Use an instrument or natural experiment" },
      { value: "heterogeneity", label: "Learn heterogeneous effects or targeting policy" },
      { value: "mechanism", label: "Understand pathways or mediation" }
    ]
  };

  var PACKAGE_REFS = {
    econml: {
      label: "EconML",
      url: "https://www.pywhy.org/EconML/index.html",
      note: "Use for double machine learning, DR learners, causal forests, and heterogeneous treatment effects."
    },
    causalml: {
      label: "CausalML",
      url: "https://causalml.readthedocs.io/",
      note: "Use for uplift trees, meta-learners, and policy targeting workflows."
    },
    dowhy: {
      label: "DoWhy",
      url: "https://www.pywhy.org/dowhy/v0.13/",
      note: "Use for graph-based identification, refutation, and sensitivity analysis across designs."
    },
    statsmodelsCore: {
      label: "Statsmodels",
      url: "https://www.statsmodels.org/stable/",
      note: "Use for regression adjustment, robust standard errors, and baseline econometric estimators."
    },
    statsmodelsTreatment: {
      label: "Statsmodels Treatment Effects",
      url: "https://www.statsmodels.org/stable/treatment.html",
      note: "Use for propensity-score workflows, treatment-effects estimation, and matching/weighting diagnostics."
    },
    statsmodelsAIPW: {
      label: "Statsmodels AIPW",
      url: "https://www.statsmodels.org/stable/generated/statsmodels.treatment.treatment_effects.TreatmentEffect.aipw.html",
      note: "Use for augmented inverse-probability weighting and doubly robust treatment-effect estimation."
    },
    statsmodelsMediation: {
      label: "Statsmodels Mediation",
      url: "https://www.statsmodels.org/stable/generated/statsmodels.stats.mediation.Mediation.html",
      note: "Use for classical mediation analysis once the total effect is already credible."
    },
    statsmodelsIV: {
      label: "Statsmodels IV2SLS",
      url: "https://www.statsmodels.org/stable/generated/statsmodels.sandbox.regression.gmm.IV2SLS.from_formula.html",
      note: "Use for two-stage least squares and assignment-as-instrument workflows."
    },
    statsmodelsTSA: {
      label: "Statsmodels Time Series",
      url: "https://www.statsmodels.org/stable/tsa.html",
      note: "Use for interrupted time-series diagnostics, seasonality checks, and counterfactual trend modeling."
    }
  };

  var BOOK_REFS = {
    toce2: {
      label: "Trustworthy Online Controlled Experiments",
      url: "https://www.cambridge.org/core/books/trustworthy-online-controlled-experiments/running-and-analyzing-experiments/7C945A72A66FF111B5EF27E1BF055134",
      note: "Ch. 2, 'Running and Analyzing Experiments: An End-to-End Example.'"
    },
    toce11: {
      label: "Trustworthy Online Controlled Experiments",
      url: "https://www.cambridge.org/core/books/trustworthy-online-controlled-experiments/observational-causal-studies/4473AF3C4BAAEA3A12BDAEFBBCB526CC",
      note: "Ch. 11, 'Observational Causal Studies.'"
    },
    toce18: {
      label: "Trustworthy Online Controlled Experiments",
      url: "https://www.cambridge.org/core/books/trustworthy-online-controlled-experiments/variance-estimation-and-improved-sensitivity-pitfalls-and-solutions/5B071E01319E9939629E6280ECE34C5A",
      note: "Ch. 18, 'Variance Estimation and Improved Sensitivity: Pitfalls and Solutions.'"
    },
    cfds1: {
      label: "Causal Inference for Data Science",
      url: "https://livebook.manning.com/book/causal-inference-for-data-science/chapter-1",
      note: "Ch. 1, 'Introducing causality,' including A/B testing and RCT basics."
    },
    cfds5: {
      label: "Causal Inference for Data Science",
      url: "https://livebook.manning.com/book/causal-inference-for-data-science/chapter-5",
      note: "Ch. 5, 'Finding comparable cases with propensity scores.'"
    },
    cfds8: {
      label: "Causal Inference for Data Science",
      url: "https://livebook.manning.com/book/causal-inference-for-data-science/chapter-8",
      note: "Ch. 8, 'Advanced tools with the DoubleML library,' covering DML and doubly robust estimators."
    },
    cfds9: {
      label: "Causal Inference for Data Science",
      url: "https://livebook.manning.com/book/causal-inference-for-data-science/chapter-9",
      note: "Ch. 9, 'Instrumental variables,' including IV use in randomized settings."
    },
    cfds11: {
      label: "Causal Inference for Data Science",
      url: "https://livebook.manning.com/book/causal-inference-for-data-science/chapter-11",
      note: "Ch. 11, 'The effect of a time-related event,' covering RDD, synthetic control, and DiD."
    },
    mhe2: {
      label: "Mostly Harmless Econometrics",
      url: "https://www.mostlyharmlesseconometrics.com/book-contents/",
      note: "Ch. 2, 'The Experimental Ideal.'"
    },
    mhe4: {
      label: "Mostly Harmless Econometrics",
      url: "https://www.mostlyharmlesseconometrics.com/book-contents/",
      note: "Ch. 4, 'Instrumental Variables in Action: Sometimes You Get What You Need.'"
    },
    mhe5: {
      label: "Mostly Harmless Econometrics",
      url: "https://www.mostlyharmlesseconometrics.com/book-contents/",
      note: "Ch. 5, 'Parallel Worlds: Fixed Effects, Differences-in-Differences, and Panel Data.'"
    },
    mhe6: {
      label: "Mostly Harmless Econometrics",
      url: "https://www.mostlyharmlesseconometrics.com/book-contents/",
      note: "Ch. 6, 'Getting a Little Jumpy: Regression Discontinuity Designs.'"
    },
    mixtape5: {
      label: "Causal Inference: The Mixtape",
      url: "https://mixtape.scunning.com/",
      note: "Ch. 5, 'Matching and Subclassification.'"
    },
    mixtape6: {
      label: "Causal Inference: The Mixtape",
      url: "https://mixtape.scunning.com/",
      note: "Ch. 6, 'Regression Discontinuity.'"
    },
    mixtape7: {
      label: "Causal Inference: The Mixtape",
      url: "https://mixtape.scunning.com/",
      note: "Ch. 7, 'Instrumental Variables.'"
    },
    mixtape9: {
      label: "Causal Inference: The Mixtape",
      url: "https://mixtape.scunning.com/",
      note: "Ch. 9, 'Difference-in-Differences.'"
    },
    mixtape10: {
      label: "Causal Inference: The Mixtape",
      url: "https://mixtape.scunning.com/",
      note: "Ch. 10, 'Synthetic Control.'"
    },
    cidp7: {
      label: "Causal Inference and Discovery in Python",
      url: "https://www.oreilly.com/library/view/causal-inference-and/9781804612989/B18993_07.xhtml",
      note: "Ch. 7, 'The Four-Step Process of Causal Inference,' for modeling, identification, estimation, and refutation."
    },
    cidp9: {
      label: "Causal Inference and Discovery in Python",
      url: "https://www.oreilly.com/library/view/causal-inference-and/9781804612989/B18993_09.xhtml",
      note: "Ch. 9, 'From Matching to Meta-Learners.'"
    },
    cidp10: {
      label: "Causal Inference and Discovery in Python",
      url: "https://www.oreilly.com/library/view/causal-inference-and/9781804612989/B18993_10.xhtml",
      note: "Ch. 10, 'Advanced Estimators,' covering DR, DML, causal forests, and uplift."
    },
    cidp11: {
      label: "Causal Inference and Discovery in Python",
      url: "https://www.oreilly.com/library/view/causal-inference-and/9781804612989/B18993_11.xhtml",
      note: "Ch. 11, 'Deep Learning, NLP, and Beyond,' including synthetic controls and time-series interventions."
    },
    explanation2: {
      label: "Explanation in Causal Inference",
      url: "https://www.barnesandnoble.com/w/explanation-in-causal-inference-tyler-vanderweele/1120346728",
      note: "Ch. 2, 'Mediation: Introduction and Regression-Based Approaches.'"
    },
    explanation3: {
      label: "Explanation in Causal Inference",
      url: "https://www.barnesandnoble.com/w/explanation-in-causal-inference-tyler-vanderweele/1120346728",
      note: "Ch. 3, 'Sensitivity Analysis for Mediation.'"
    }
  };

  var USE_CASE_REFS = {
    uberXP: {
      label: "Uber Engineering: experimentation platform",
      url: "https://www.uber.com/en-US/blog/xp/",
      note: "Large-scale randomized experiments for features, app redesign, promotions, and model launches."
    },
    toceSpeed: {
      label: "TOCE: speed experiments",
      url: "https://www.cambridge.org/core/books/trustworthy-online-controlled-experiments/speed-matters/35D34F276D4AF1AEE4B98D3E09B9E168",
      note: "Backend speed experiments where small latency improvements translated into material annual revenue."
    },
    uberCuped: {
      label: "Uber Engineering: CUPED",
      url: "https://www.uber.com/en-UY/blog/causal-inference-at-uber/",
      note: "Uses CUPED with pre-experiment data for variance reduction and to reduce pre-existing bias."
    },
    uberFlickers: {
      label: "Uber Engineering: experiment contamination",
      url: "https://www.uber.com/en-US/blog/xp/",
      note: "Uber explicitly audits sample imbalance and 'flickers' when treatment assignment is contaminated and repaired in analysis."
    },
    uberEmailNoncompliance: {
      label: "Uber Engineering: email noncompliance",
      url: "https://www.uber.com/en-UY/blog/causal-inference-at-uber/",
      note: "Email or messaging experiments where assignment differs from actual exposure or opens."
    },
    uberCausalLearning: {
      label: "Uber Research: retention targeting",
      url: "https://www.uber.com/blog/research/improve-user-retention-with-causal-learning/",
      note: "Targeted promotions optimized for heterogeneous treatment effects; deployed live in multiple cities."
    },
    uberMediation: {
      label: "Uber Engineering: mediation modeling",
      url: "https://www.uber.com/en-CA/blog/mediation-modeling/",
      note: "Explains why promotions, menu changes, or customer sentiment move orders, referrals, or satisfaction."
    },
    uberDelayedDeliveries: {
      label: "Uber Engineering: delayed deliveries",
      url: "https://www.uber.com/en-UY/blog/causal-inference-at-uber/",
      note: "Estimate how delayed deliveries affect future Uber Eats engagement without deliberately delaying orders."
    },
    microsoftRuntimeConfounding: {
      label: "Microsoft Research: runtime confounding",
      url: "https://www.microsoft.com/en-us/research/publication/counterfactual-predictions-under-runtime-confounding/",
      note: "Counterfactual decision support under observational selection, with examples such as loan approval/default scenarios."
    },
    uberSurgeRDD: {
      label: "Uber Engineering: surge threshold",
      url: "https://www.uber.com/en-BG/blog/causal-inference-at-uber/",
      note: "Regression discontinuity around surge pricing thresholds to study trip-request behavior."
    },
    uberCityLaunch: {
      label: "Uber Engineering: city launch analysis",
      url: "https://www.uber.com/en-BG/blog/causal-inference-at-uber/",
      note: "City-level marketing campaigns or new feature launches analyzed with untreated cities or time periods as comparisons."
    },
    googleCausalImpact: {
      label: "Google Research: CausalImpact",
      url: "https://research.google/pubs/pub41854",
      note: "Bayesian structural time-series evaluation of an online advertising campaign on search-related site visits."
    },
    uberBugInstrument: {
      label: "Uber Engineering: bugs or outages as IV",
      url: "https://www.uber.com/en-BG/blog/causal-inference-at-uber/",
      note: "Use bugs or outages as instruments when estimating the effect of delayed deliveries on downstream engagement."
    }
  };

  function resolveRefs(items, catalog) {
    return items.map(function (item) {
      var source = catalog[item.key || item];
      return {
        label: source.label,
        url: source.url,
        note: item.note || source.note
      };
    });
  }

  function packageRefs(items) {
    return resolveRefs(items, PACKAGE_REFS);
  }

  function bookRefs(items) {
    return resolveRefs(items, BOOK_REFS);
  }

  function useCaseRefs(items) {
    return resolveRefs(items, USE_CASE_REFS);
  }

  var METHODS = {
    experiment: {
      title: "Randomized experiment with covariate-adjusted analysis",
      family: "Experimental",
      summary: "Use intention-to-treat as the baseline estimate, with regression adjustment or stratification for precision and imbalance control.",
      pros: [
        "Strongest identification strategy when assignment really is random.",
        "Easy to explain to product, ops, and leadership stakeholders.",
        "Clean fit for launch, pricing, and guardrail decisions."
      ],
      cons: [
        "Can be expensive, slow, or operationally disruptive to run well.",
        "Spillovers, attrition, or leakage can quietly break identification.",
        "A single average effect can hide meaningful segment heterogeneity."
      ],
      assumptions: [
        "Treatment assignment is randomized and sufficiently implemented",
        "No material interference or spillovers across units unless explicitly modeled",
        "Outcome measurement and variance estimation match the assignment unit"
      ],
      nextChecks: [
        "Check balance, attrition, and treatment leakage",
        "Cluster standard errors if assignment was clustered",
        "Report ITT before any treatment-on-treated analysis"
      ],
      robustnessChecklist: [
        "Re-estimate the treatment effect with and without covariate adjustment to check stability.",
        "Audit balance, attrition, and leakage at the actual assignment unit.",
        "Use cluster-robust inference when assignment or interference is clustered.",
        "Check guardrail or spillover outcomes before making rollout recommendations."
      ],
      alternatives: ["CUPED", "CACE / IV", "heterogeneity models"],
      packages: packageRefs(["statsmodelsCore", "dowhy"]),
      useCases: useCaseRefs(["uberXP", "toceSpeed"]),
      bookRefs: bookRefs(["toce2", "cfds1", "mhe2"])
    },
    cuped: {
      title: "CUPED or pre-period regression adjustment",
      family: "Experimental",
      summary: "Best when randomization is valid and strong pre-treatment outcomes are available. It reduces variance without changing identification.",
      pros: [
        "Often reduces variance and sample-size needs without changing the design.",
        "Simple extension of standard experiment analysis and reporting.",
        "Especially effective when pre-period behavior strongly predicts outcomes."
      ],
      cons: [
        "Improves precision, not the underlying identification strategy.",
        "Requires genuinely pre-treatment metrics with no contamination.",
        "Adds little value when pre-period signal is weak."
      ],
      assumptions: [
        "Pre-period outcome is unaffected by treatment",
        "The adjustment variable is predictive of the post-treatment outcome",
        "Randomization itself remains valid"
      ],
      nextChecks: [
        "Measure correlation between pre-period and outcome",
        "Confirm no treatment contamination in the pre-period metric",
        "Compare variance reduction against the plain ITT estimate"
      ],
      robustnessChecklist: [
        "Verify the pre-period metric is truly pre-treatment and uncontaminated.",
        "Report the pre/post correlation that justifies CUPED.",
        "Compare the adjusted estimate against the plain ITT estimate and variance.",
        "Document whether the adjustment changes interpretation or only precision."
      ],
      alternatives: ["ANCOVA", "standard experiment analysis"],
      packages: packageRefs(["statsmodelsCore"]),
      useCases: useCaseRefs(["uberCuped"]),
      bookRefs: bookRefs(["toce18", "toce2"])
    },
    cace: {
      title: "CACE / instrumental variables for noncompliance",
      family: "Experimental",
      summary: "Use assignment as an instrument when treatment take-up differs from assignment and you need the effect among compliers.",
      pros: [
        "Recovers an interpretable complier effect when take-up differs from assignment.",
        "Preserves the value of encouragement designs and imperfect experiments.",
        "Keeps ITT and treatment-receipt effects conceptually separate."
      ],
      cons: [
        "Exclusion and monotonicity are strong and only partly testable.",
        "The estimate is local to compliers rather than all users.",
        "Weak first stages can make inference unstable or noisy."
      ],
      assumptions: [
        "Assignment strongly shifts treatment take-up",
        "Exclusion: assignment affects outcome only through treatment receipt",
        "Monotonicity or at least no strong defiers in the usual LATE setup"
      ],
      nextChecks: [
        "Report first-stage strength",
        "Report both ITT and complier estimates",
        "Explain who the compliers are in business terms"
      ],
      robustnessChecklist: [
        "Report the first-stage effect and a weak-instrument diagnostic.",
        "Present ITT and complier estimates together, not only the IV estimate.",
        "Defend exclusion with product or policy mechanics, not only statistics.",
        "State clearly who the complier population is and whether that matters for decisions."
      ],
      alternatives: ["ITT only", "encouragement design diagnostics"],
      packages: packageRefs(["statsmodelsIV", "dowhy"]),
      useCases: useCaseRefs(["uberEmailNoncompliance"]),
      bookRefs: bookRefs(["mhe4", "cfds9", "mixtape7"])
    },
    uplift: {
      title: "Causal forests, uplift models, or meta-learners",
      family: "Heterogeneity",
      summary: "Use when the main goal is differential treatment effects across users, markets, or segments rather than only one overall ATE.",
      pros: [
        "Finds who benefits most instead of stopping at one average effect.",
        "Can materially improve targeting and policy value in large-scale products.",
        "Works well when rich covariates and experimentation logs already exist."
      ],
      cons: [
        "Easier to overfit than standard ATE estimation.",
        "Needs overlap and sample size inside the segments you plan to target.",
        "Policy-value evaluation is more demanding than standard prediction metrics."
      ],
      assumptions: [
        "Identification assumptions still hold for the underlying design",
        "Enough support exists within important subgroups",
        "Evaluation is done on uplift-aware or policy-value metrics, not only prediction loss"
      ],
      nextChecks: [
        "Separate model selection from final policy evaluation",
        "Check calibration of uplift or CATE estimates",
        "Audit whether overlap collapses in high-value segments"
      ],
      robustnessChecklist: [
        "Evaluate policy value or uplift metrics on a held-out sample, not only model loss.",
        "Check overlap and sample size inside the segments you plan to target.",
        "Benchmark the policy against simpler subgroup rules or a global ATE policy.",
        "Inspect whether treatment recommendations concentrate in unsupported covariate regions."
      ],
      alternatives: ["subgroup analysis", "AIPW / DR learners"],
      packages: packageRefs(["econml", "causalml", "dowhy"]),
      useCases: useCaseRefs(["uberCausalLearning"]),
      bookRefs: bookRefs(["cidp9", "cidp10"])
    },
    mediation: {
      title: "Mediation analysis",
      family: "Mechanism",
      summary: "Use after establishing a credible total effect when the goal is to decompose direct and indirect pathways.",
      pros: [
        "Helps explain why an intervention worked or failed, not just whether it moved outcomes.",
        "Useful for product iteration when you need to compare causal channels.",
        "Can connect business levers to mechanisms such as awareness, conversion, or satisfaction."
      ],
      cons: [
        "Requires stronger assumptions than estimating the total effect alone.",
        "Sensitive to mediator timing, measurement, and post-treatment confounding.",
        "Indirect effects are easy to overinterpret causally."
      ],
      assumptions: [
        "Mediator measurement is well-defined and temporally ordered",
        "No unblocked mediator-outcome confounding after conditioning set",
        "The total causal effect is already reasonably identified"
      ],
      nextChecks: [
        "Estimate total effect first",
        "Document why the mediator is not itself confounded by post-treatment variables",
        "Run sensitivity checks because mediation assumptions are strong"
      ],
      robustnessChecklist: [
        "Demonstrate a credible total effect before decomposing it.",
        "Check that mediator timing is after treatment and before the outcome window.",
        "Stress-test mediator-outcome confounding assumptions with sensitivity analysis.",
        "Compare direct/indirect estimates under alternative mediator models."
      ],
      alternatives: ["structural causal models", "mechanism-specific experiments"],
      packages: packageRefs(["statsmodelsMediation", "dowhy"]),
      useCases: useCaseRefs(["uberMediation"]),
      bookRefs: bookRefs(["explanation2", "explanation3"])
    },
    repair: {
      title: "Propensity weighting or matching as a repair strategy",
      family: "Bias repair",
      summary: "Use only when experimental integrity is compromised enough that treatment and control are no longer meaningfully exchangeable without adjustment.",
      pros: [
        "Can salvage some information when a real experiment drifts off its intended design.",
        "Makes imbalance and support problems explicit through diagnostics.",
        "Useful as a fallback benchmark while deciding whether a rerun is necessary."
      ],
      cons: [
        "No longer enjoys the clean identification of a valid randomized trial.",
        "Results become more model-dependent and easier to dispute.",
        "Often a worse option than redesigning and rerunning the experiment."
      ],
      assumptions: [
        "Observed variables can explain the imbalance or attrition process",
        "Overlap remains adequate after filtering or trimming",
        "The repair model is treated as a fallback, not as proof of randomization"
      ],
      nextChecks: [
        "Diagnose why randomization failed",
        "Show balance before and after weighting or matching",
        "Prefer redesign if leakage is severe"
      ],
      robustnessChecklist: [
        "Document the exact failure mode: attrition, leakage, reassignment, or measurement drift.",
        "Show balance and overlap before and after the repair step.",
        "Trim unsupported units and report how the estimand changes.",
        "Treat the repaired estimate as a fallback and assess whether redesign is cheaper than trusting it."
      ],
      alternatives: ["rerun experiment", "covariate-adjusted ITT"],
      packages: packageRefs(["statsmodelsTreatment", "dowhy"]),
      useCases: useCaseRefs(["uberFlickers", "uberDelayedDeliveries"]),
      bookRefs: bookRefs(["toce11", "cfds5"])
    },
    propensity: {
      title: "Matching or propensity-score weighting",
      family: "Observational adjustment",
      summary: "Good first-line observational methods when treatment is not randomized but most confounders are observed and overlap is acceptable.",
      pros: [
        "Intuitive first observational adjustment method for many business teams.",
        "Balance and overlap diagnostics are transparent and easy to communicate.",
        "Useful baseline to benchmark richer doubly robust or ML estimators."
      ],
      cons: [
        "Cannot fix hidden confounding from missing drivers of treatment.",
        "Extreme weights and weak overlap can dominate the estimate.",
        "Matching and trimming choices can materially change the result."
      ],
      assumptions: [
        "Conditional ignorability after measured covariates",
        "Adequate common support between treated and untreated units",
        "No major model misspecification in the propensity stage"
      ],
      nextChecks: [
        "Inspect overlap and extreme weights",
        "Check balance after weighting or matching",
        "Trim unsupported regions if necessary"
      ],
      robustnessChecklist: [
        "Plot overlap and inspect the distribution of propensity scores.",
        "Report standardized mean differences before and after weighting or matching.",
        "Test sensitivity to calipers, trimming rules, or propensity specifications.",
        "Compare the weighted/matched result against a simpler regression-adjusted baseline."
      ],
      alternatives: ["AIPW", "double machine learning"],
      packages: packageRefs(["statsmodelsTreatment", "dowhy"]),
      useCases: useCaseRefs(["uberDelayedDeliveries"]),
      bookRefs: bookRefs(["cfds5", "mixtape5"])
    },
    aipw: {
      title: "AIPW / doubly robust estimation / double machine learning",
      family: "Observational adjustment",
      summary: "Preferred when confounders are observed and the feature space is rich. It combines outcome modeling and propensity modeling for more robust estimation.",
      pros: [
        "More robust than weighting-only or outcome-only approaches when one nuisance model is misspecified.",
        "Works well with rich feature spaces and modern ML nuisance models.",
        "Strong benchmark for observational ATE and heterogeneous-effect pipelines."
      ],
      cons: [
        "Still depends on credible ignorability and reasonable overlap.",
        "Easy to misuse without cross-fitting and nuisance-model diagnostics.",
        "Harder to explain than simpler matching or regression approaches."
      ],
      assumptions: [
        "Conditional ignorability remains plausible",
        "Overlap is not catastrophically weak",
        "At least one nuisance model is reasonably well specified in the doubly robust setup"
      ],
      nextChecks: [
        "Cross-fit or sample-split when using flexible ML models",
        "Inspect nuisance-model quality and overlap",
        "Explain the target estimand clearly: ATE, ATT, or policy value"
      ],
      robustnessChecklist: [
        "Use cross-fitting or sample splitting when nuisance models are flexible.",
        "Check overlap and stabilize or truncate extreme weights where needed.",
        "Benchmark against simpler weighting-only and outcome-only estimates.",
        "Report the target estimand explicitly and verify it matches the business question."
      ],
      alternatives: ["matching", "IPTW", "causal forests / DR learners"],
      packages: packageRefs(["statsmodelsAIPW", "econml", "dowhy"]),
      useCases: useCaseRefs(["microsoftRuntimeConfounding", "uberDelayedDeliveries"]),
      bookRefs: bookRefs(["cfds8", "cidp10"])
    },
    did: {
      title: "Difference-in-differences / event study",
      family: "Panel or policy",
      summary: "Best for policy or feature rollouts observed over time with untreated comparison units and a credible parallel-trends argument.",
      pros: [
        "Natural fit for policy, pricing, and staged rollout questions over time.",
        "Easy to communicate using treated-versus-control before/after logic.",
        "Event studies help reveal timing patterns and pre-trend failures."
      ],
      cons: [
        "Parallel trends can be weak in messy real-world product settings.",
        "Naive two-way fixed-effects estimates can mislead under staggered adoption.",
        "Concurrent shocks can mimic treatment effects."
      ],
      assumptions: [
        "Parallel trends or an acceptable approximation",
        "No confounding shocks that align with treatment timing",
        "Treatment timing and anticipation effects are correctly handled"
      ],
      nextChecks: [
        "Plot pre-trends",
        "Use modern staggered-adoption estimators when rollout timing differs",
        "Check sensitivity to alternative control groups and time windows"
      ],
      robustnessChecklist: [
        "Plot event-study coefficients or pre-trends before emphasizing post-treatment effects.",
        "Check sensitivity to comparison groups, time windows, and staggered-timing estimators.",
        "Probe anticipation and coincident-shock explanations.",
        "Cluster standard errors at the assignment or policy unit where appropriate."
      ],
      alternatives: ["synthetic control", "interrupted time series"],
      packages: packageRefs([
        {
          key: "statsmodelsCore",
          note: "Use for event-study or DiD regression baselines with robust standard errors; full staggered-DiD workflows may need additional tooling."
        },
        "dowhy"
      ]),
      useCases: useCaseRefs(["uberCityLaunch"]),
      bookRefs: bookRefs(["mhe5", "cfds11", "mixtape9"])
    },
    synthetic: {
      title: "Synthetic control or Bayesian structural time series",
      family: "Panel or policy",
      summary: "Useful when one or a small number of units receive treatment and you can build a credible counterfactual from donor units or pre-period dynamics.",
      pros: [
        "Well suited to one or a few treated markets, products, or geographies.",
        "Makes counterfactual construction transparent through donor weights or pre-period fit.",
        "Placebo tests and pre-fit plots are intuitive for stakeholders."
      ],
      cons: [
        "Sensitive to donor-pool choice and pre-treatment fit quality.",
        "Spillovers into donor units can break the design.",
        "Inference can be fragile with short histories or few donors."
      ],
      assumptions: [
        "Pre-treatment fit is strong",
        "Donor pool is not contaminated by treatment spillover",
        "The treated unit is comparable to a weighted combination of donors"
      ],
      nextChecks: [
        "Check pre-treatment fit visually",
        "Run placebo or leave-one-out diagnostics",
        "Justify the donor pool and outcome window"
      ],
      robustnessChecklist: [
        "Show pre-treatment fit and do not trust the design if fit is weak.",
        "Run placebo tests across untreated donor units.",
        "Repeat the estimate with donor leave-one-out or donor-pool restrictions.",
        "Audit spillovers and any contamination of the donor pool."
      ],
      alternatives: ["difference-in-differences", "interrupted time series"],
      packages: packageRefs([
        {
          key: "statsmodelsTSA",
          note: "Use for structural-break, seasonality, and counterfactual-trend diagnostics; synthetic control itself usually needs a more specialized library."
        },
        "dowhy"
      ]),
      useCases: useCaseRefs(["uberCityLaunch", "googleCausalImpact"]),
      bookRefs: bookRefs(["mixtape10", "cfds11", "cidp11"])
    },
    its: {
      title: "Interrupted time series",
      family: "Panel or policy",
      summary: "Use when the policy effect is identified mainly from a clear break in one unit's time series and a comparison group is weak or unavailable.",
      pros: [
        "Practical when only one treated time series is available.",
        "Can be deployed quickly when historical data quality is strong.",
        "Highlights abrupt breaks and post-intervention persistence clearly."
      ],
      cons: [
        "Very vulnerable to coincident shocks, seasonality, and model choice.",
        "Weaker than donor-based designs when good comparison units exist.",
        "Functional-form decisions can drive the headline result."
      ],
      assumptions: [
        "Outcome history is stable enough to model the counterfactual trend",
        "No coincident shocks explain the break",
        "Intervention timing is well defined"
      ],
      nextChecks: [
        "Inspect trend, seasonality, and structural breaks",
        "Control for known shocks if possible",
        "Prefer synthetic control if a strong donor pool exists"
      ],
      robustnessChecklist: [
        "Check sensitivity to seasonality, serial correlation, and functional-form choices.",
        "Run placebo intervention dates or alternative break specifications.",
        "Control for known concurrent shocks and explain any remaining breaks.",
        "Compare against a donor-based or comparison-group design if one becomes available."
      ],
      alternatives: ["synthetic control", "difference-in-differences"],
      packages: packageRefs(["statsmodelsTSA", "dowhy"]),
      useCases: useCaseRefs(["googleCausalImpact"]),
      bookRefs: bookRefs(["cfds11", "cidp11"])
    },
    rdd: {
      title: "Regression discontinuity design",
      family: "Quasi-experimental",
      summary: "Best when treatment assignment changes sharply at a known cutoff and units near the threshold are comparable.",
      pros: [
        "Often delivers a highly credible quasi-experimental estimate near the cutoff.",
        "Local comparisons are concrete and persuasive to non-technical stakeholders.",
        "Needs weaker modeling assumptions than broad observational adjustments."
      ],
      cons: [
        "The effect is local to units near the threshold, not necessarily global.",
        "Manipulation or sorting around the cutoff can invalidate the design.",
        "Bandwidth and specification choices can materially affect results."
      ],
      assumptions: [
        "No precise manipulation around the cutoff",
        "Potential outcomes evolve smoothly through the threshold absent treatment",
        "The estimand is local to the cutoff"
      ],
      nextChecks: [
        "Run density and balance tests near the cutoff",
        "Check bandwidth sensitivity",
        "Communicate that the effect is local, not necessarily global"
      ],
      robustnessChecklist: [
        "Run manipulation and density checks near the cutoff.",
        "Check covariate continuity around the threshold.",
        "Report bandwidth and polynomial sensitivity, not one preferred estimate only.",
        "State clearly that the estimand is local to units near the cutoff."
      ],
      alternatives: ["IV", "matching near the threshold"],
      packages: packageRefs([
        {
          key: "statsmodelsCore",
          note: "Use for local regression baselines and sensitivity checks; dedicated RDD tooling may still be preferable for production analysis."
        },
        "dowhy"
      ]),
      useCases: useCaseRefs(["uberSurgeRDD"]),
      bookRefs: bookRefs(["mhe6", "cfds11", "mixtape6"])
    },
    iv: {
      title: "Instrumental variables",
      family: "Quasi-experimental",
      summary: "Use when unobserved confounding is likely but you have a strong source of exogenous variation that shifts treatment.",
      pros: [
        "Can address unobserved confounding when a credible instrument exists.",
        "Useful when experiments are infeasible, unethical, or already failed.",
        "Maps naturally to outages, assignment quirks, or policy discontinuities."
      ],
      cons: [
        "Good instruments are rare and exclusion is hard to defend.",
        "Weak instruments create unstable and noisy estimates.",
        "Interpretation is local to the units moved by the instrument."
      ],
      assumptions: [
        "Relevance: the instrument materially shifts treatment",
        "Exclusion: the instrument affects outcome only through treatment",
        "Interpretation is usually local to compliers or units moved by the instrument"
      ],
      nextChecks: [
        "Report first-stage strength and falsification tests",
        "Explain the compliers or margin identified by the instrument",
        "Defend exclusion with domain knowledge, not statistics alone"
      ],
      robustnessChecklist: [
        "Report first-stage strength and weak-instrument diagnostics.",
        "Use falsification or over-identification tests where the design supports them.",
        "Stress-test exclusion with domain arguments and alternative instrument definitions.",
        "Explain how local the IV estimand is and whether it maps to the business decision."
      ],
      alternatives: ["RDD", "difference-in-differences", "natural-experiment design audit"],
      packages: packageRefs(["statsmodelsIV", "dowhy"]),
      useCases: useCaseRefs(["uberBugInstrument", "uberEmailNoncompliance"]),
      bookRefs: bookRefs(["mhe4", "cfds9", "mixtape7"])
    },
    design_gap: {
      title: "Design is not identified cleanly yet",
      family: "Warning",
      summary: "Current answers do not support a strong causal identification strategy. The next step is design improvement, not picking a fancier estimator.",
      pros: [
        "Prevents false confidence from choosing an estimator before the design is credible.",
        "Redirects effort toward better variation, covariates, or panel structure.",
        "Makes identification gaps explicit to stakeholders before claims get baked in."
      ],
      cons: [
        "Does not produce an immediate causal estimate.",
        "May require extra data collection, redesign, or slower decision timelines.",
        "Can feel unsatisfying when teams want a quick numerical answer."
      ],
      assumptions: [
        "You may need stronger design variation, better confounders, or quasi-experimental structure"
      ],
      nextChecks: [
        "Look for threshold rules, instruments, or rollout timing",
        "Collect better pre-treatment covariates or longitudinal data",
        "Use sensitivity analysis before making product or policy claims"
      ],
      robustnessChecklist: [
        "Draw a DAG or design map before choosing an estimator.",
        "Collect the missing pre-treatment covariates or panel structure that would unblock identification.",
        "Search explicitly for threshold rules, instruments, or rollout timing you can defend.",
        "Avoid strong causal claims until the design improves or sensitivity bounds are acceptable."
      ],
      alternatives: ["RDD", "IV", "DiD", "better experiment design"],
      packages: packageRefs([
        {
          key: "dowhy",
          note: "Use it to formalize the design assumptions, DAG, and refutation strategy before choosing an estimator."
        },
        {
          key: "statsmodelsCore",
          note: "Use it for descriptive regressions and diagnostics while you improve the design, not as a substitute for identification."
        }
      ]),
      useCases: [],
      bookRefs: bookRefs(["cidp7", "toce11"])
    }
  };

  var fields = {
    design: document.getElementById("ci-design"),
    goal: document.getElementById("ci-goal"),
    prePeriod: document.getElementById("ci-pre-period"),
    randomizationIssue: document.getElementById("ci-randomization-issue"),
    noncompliance: document.getElementById("ci-noncompliance"),
    panelData: document.getElementById("ci-panel-data"),
    staggeredPolicy: document.getElementById("ci-staggered-policy"),
    singleUnit: document.getElementById("ci-single-unit"),
    threshold: document.getElementById("ci-threshold"),
    instrument: document.getElementById("ci-instrument"),
    confounders: document.getElementById("ci-confounders"),
    overlap: document.getElementById("ci-overlap"),
    highDimensional: document.getElementById("ci-high-dimensional")
  };

  var groups = {
    prePeriod: document.getElementById("group-pre-period"),
    randomizationIssue: document.getElementById("group-randomization-issue"),
    noncompliance: document.getElementById("group-noncompliance"),
    panelData: document.getElementById("group-panel-data"),
    staggeredPolicy: document.getElementById("group-staggered-policy"),
    singleUnit: document.getElementById("group-single-unit"),
    threshold: document.getElementById("group-threshold"),
    instrument: document.getElementById("group-instrument"),
    confounders: document.getElementById("group-confounders"),
    overlap: document.getElementById("group-overlap"),
    highDimensional: document.getElementById("group-high-dimensional")
  };

  var outputs = {
    path: document.getElementById("causal-tool-path"),
    summary: document.getElementById("causal-tool-summary"),
    warning: document.getElementById("causal-tool-warning"),
    results: document.getElementById("causal-tool-results"),
    shareStatus: document.getElementById("causal-tool-share-status")
  };

  var shareButton = document.getElementById("causal-tool-share");
  var resetButton = document.getElementById("causal-tool-reset");
  var currentRender = null;

  function setGoalOptions(design, preferredGoal) {
    var current = preferredGoal || fields.goal.value;
    fields.goal.innerHTML = "";

    GOAL_OPTIONS[design].forEach(function (option) {
      var el = document.createElement("option");
      el.value = option.value;
      el.textContent = option.label;
      if (option.value === current) {
        el.selected = true;
      }
      fields.goal.appendChild(el);
    });

    if (!fields.goal.value) {
      fields.goal.value = GOAL_OPTIONS[design][0].value;
    }
  }

  function hideGroup(group, hidden) {
    group.hidden = hidden;
  }

  function getState() {
    return {
      design: fields.design.value,
      goal: fields.goal.value,
      prePeriod: fields.prePeriod.value,
      randomizationIssue: fields.randomizationIssue.value,
      noncompliance: fields.noncompliance.value,
      panelData: fields.panelData.value,
      staggeredPolicy: fields.staggeredPolicy.value,
      singleUnit: fields.singleUnit.value,
      threshold: fields.threshold.value,
      instrument: fields.instrument.value,
      confounders: fields.confounders.value,
      overlap: fields.overlap.value,
      highDimensional: fields.highDimensional.value
    };
  }

  function syncVisibility() {
    var state = getState();
    var experimental = state.design === "experimental";
    var observational = !experimental;
    var goal = state.goal;
    var panelVisible = observational;
    var heterogeneityVisible = goal === "heterogeneity" || (observational && goal === "ate");

    hideGroup(groups.prePeriod, !((experimental && (goal === "ate" || goal === "variance" || goal === "salvage")) || (observational && goal === "policy")));
    hideGroup(groups.randomizationIssue, !(experimental && (goal === "ate" || goal === "salvage")));
    hideGroup(groups.noncompliance, !experimental);
    hideGroup(groups.panelData, !panelVisible);
    hideGroup(groups.staggeredPolicy, !(observational && state.panelData === "yes" && goal === "policy"));
    hideGroup(groups.singleUnit, !(observational && state.panelData === "yes" && goal === "policy"));
    hideGroup(groups.threshold, !observational);
    hideGroup(groups.instrument, !observational);
    hideGroup(groups.confounders, !observational);
    hideGroup(groups.overlap, !(observational && state.confounders !== "unobserved"));
    hideGroup(groups.highDimensional, !heterogeneityVisible);
  }

  function addRecommendation(bucket, id, fit, reasons) {
    if (!Object.prototype.hasOwnProperty.call(bucket, "_rankCounter")) {
      Object.defineProperty(bucket, "_rankCounter", {
        value: 0,
        writable: true,
        enumerable: false
      });
    }

    if (!bucket[id]) {
      bucket[id] = { id: id, fit: fit, reasons: [], rank: bucket._rankCounter };
      bucket._rankCounter += 1;
    }
    if (fit > bucket[id].fit) {
      bucket[id].fit = fit;
    }
    reasons.forEach(function (reason) {
      if (bucket[id].reasons.indexOf(reason) === -1) {
        bucket[id].reasons.push(reason);
      }
    });
  }

  function recommend(state) {
    var methods = {};
    var warnings = [];

    if (state.design === "experimental") {
      if (state.goal === "ate") {
        addRecommendation(methods, "experiment", 3, ["Randomization is the primary source of identification."]);
        if (state.prePeriod === "yes") {
          addRecommendation(methods, "cuped", 3, ["Pre-period outcomes are available, so variance reduction is attractive."]);
        }
        if (state.randomizationIssue === "minor") {
          addRecommendation(methods, "experiment", 3, ["Minor imbalance suggests covariate-adjusted analysis rather than abandoning the experiment."]);
          warnings.push("Minor imbalance or attrition should be diagnosed, but you should still report the ITT estimate first.");
        }
        if (state.randomizationIssue === "severe") {
          addRecommendation(methods, "repair", 3, ["Serious imbalance or leakage means design repair is more important than a plain experiment estimator."]);
          addRecommendation(methods, "experiment", 2, ["Keep the randomized estimate as a baseline diagnostic if possible."]);
          warnings.push("If leakage or imbalance is severe, estimator repair is only a fallback. A redesigned experiment is often the better answer.");
        }
      }

      if (state.goal === "variance") {
        if (state.prePeriod === "yes") {
          addRecommendation(methods, "cuped", 3, ["Your stated goal is precision gain and you have pre-period outcomes."]);
          addRecommendation(methods, "experiment", 2, ["CUPED should be compared with the plain ITT estimate."]);
        } else {
          addRecommendation(methods, "experiment", 2, ["Without pre-period outcomes, use covariate adjustment or ANCOVA-style analysis for modest gains."]);
          warnings.push("CUPED is only useful when you have uncontaminated pre-treatment outcomes that predict the post-treatment metric.");
        }
      }

      if (state.goal === "noncompliance" || state.noncompliance === "yes") {
        addRecommendation(methods, "cace", 3, ["Assignment differs from actual treatment receipt, so assignment should be treated as an instrument."]);
        addRecommendation(methods, "experiment", 2, ["Always keep the ITT estimate alongside the complier effect."]);
      }

      if (state.goal === "heterogeneity") {
        if (state.highDimensional === "yes") {
          addRecommendation(methods, "uplift", 3, ["Heterogeneous effects with rich features are a good fit for causal forests, uplift models, or meta-learners."]);
        } else {
          addRecommendation(methods, "uplift", 2, ["You want heterogeneity analysis, even if a simpler subgroup design may be enough."]);
        }
        addRecommendation(methods, "experiment", 2, ["A clean randomized baseline remains useful before layering personalization models."]);
      }

      if (state.goal === "mechanism") {
        addRecommendation(methods, "mediation", 3, ["The goal is pathway or mechanism analysis rather than only the total effect."]);
        addRecommendation(methods, "experiment", 2, ["Mechanism analysis should sit on top of a credible total effect estimate."]);
      }

      if (state.goal === "salvage") {
        if (state.randomizationIssue === "none") {
          addRecommendation(methods, "experiment", 2, ["If randomization is actually valid, you probably do not need salvage methods."]);
          warnings.push("The tool cannot infer salvage needs without evidence of imbalance, leakage, or attrition.");
        } else if (state.randomizationIssue === "minor") {
          addRecommendation(methods, "experiment", 3, ["Minor problems usually call for covariate adjustment and careful diagnostics, not a design rewrite."]);
          if (state.prePeriod === "yes") {
            addRecommendation(methods, "cuped", 2, ["Pre-period outcomes can recover precision while addressing measured imbalance."]);
          }
        } else {
          addRecommendation(methods, "repair", 3, ["Severe imbalance or leakage pushes this toward bias-repair methods or redesign."]);
          warnings.push("When randomization fails materially, the question becomes observational. Treat any repaired estimate as conditional on strong adjustment assumptions.");
        }
      }
    } else {
      if (state.goal === "threshold" || state.threshold === "yes") {
        addRecommendation(methods, "rdd", 3, ["A threshold or eligibility cutoff is available, which is the clearest quasi-experimental design here."]);
      }

      if (state.goal === "instrument" || state.instrument === "yes") {
        addRecommendation(methods, "iv", 3, ["A plausible instrument or natural experiment is available."]);
        if (state.instrument === "uncertain") {
          warnings.push("A weak or invalid instrument is worse than no instrument. Relevance and exclusion must be defended explicitly.");
        }
      }

      if (state.goal === "policy") {
        if (state.panelData === "yes") {
          if (state.singleUnit === "yes") {
            addRecommendation(methods, "synthetic", 3, ["A single treated unit with time history is a classic synthetic-control setting."]);
            addRecommendation(methods, "its", 2, ["Interrupted time series is a fallback when donor units are weak."]);
          } else if (state.staggeredPolicy === "yes") {
            addRecommendation(methods, "did", 3, ["Staggered rollout over time is a strong fit for modern DiD or event-study designs."]);
            addRecommendation(methods, "synthetic", 2, ["Synthetic methods are still useful for small donor pools or targeted rollouts."]);
          } else {
            addRecommendation(methods, "did", 3, ["Repeated outcomes with treated and untreated units fit DiD-style identification."]);
            addRecommendation(methods, "its", 2, ["Interrupted time series is a fallback if comparison units are weak."]);
          }
        } else {
          warnings.push("Policy evaluation over time usually needs repeated outcomes. Without them, you are back to cross-sectional observational adjustment.");
        }
      }

      if (state.goal === "ate") {
        if (state.confounders === "observed") {
          if (state.highDimensional === "yes") {
            addRecommendation(methods, "aipw", 3, ["Observed confounders plus rich features make doubly robust or orthogonalized estimators attractive."]);
            addRecommendation(methods, "propensity", 2, ["Propensity methods remain a useful diagnostic and benchmark."]);
          } else {
            addRecommendation(methods, "propensity", 3, ["Most confounders are observed, so matching or weighting is a defensible first-line adjustment."]);
            addRecommendation(methods, "aipw", 2, ["Doubly robust estimators provide a stronger baseline if outcome modeling is feasible."]);
          }
          if (state.overlap === "weak") {
            warnings.push("Weak overlap means weighting can explode and CATE estimates can become unstable. Expect trimming or a narrower estimand.");
          }
        } else if (state.confounders === "partial") {
          addRecommendation(methods, "aipw", 1, ["Adjustment may still help, but partial confounder coverage means the causal claim remains fragile."]);
          warnings.push("Partially observed confounding weakens all selection-on-observables methods. Prefer a quasi-experimental design if possible.");
        } else {
          warnings.push("With important unobserved confounding and no threshold, instrument, or panel design, estimator choice cannot fix identification.");
        }
      }

      if (state.goal === "heterogeneity") {
        if (state.confounders === "observed") {
          if (state.highDimensional === "yes") {
            addRecommendation(methods, "uplift", 3, ["Rich features plus a heterogeneous-effect goal fit causal forests or meta-learners."]);
            addRecommendation(methods, "aipw", 2, ["Use doubly robust baselines or DR learners when identification is based on observed confounders."]);
          } else {
            addRecommendation(methods, "uplift", 2, ["You want individualized effects, but flexible heterogeneity models still need overlap and strong ignorability."]);
            addRecommendation(methods, "propensity", 2, ["Matching or weighting can still support subgroup-level effect analysis."]);
          }
          if (state.overlap !== "good") {
            warnings.push("Heterogeneous-effect models are especially brittle when overlap is weak. Targeted-policy claims should be localized to supported regions.");
          }
        } else {
          warnings.push("Heterogeneous treatment effects are not identified cleanly here without stronger design structure such as a valid instrument, threshold, or experiment.");
        }
      }

      if (state.goal === "mechanism") {
        if (state.confounders === "observed") {
          addRecommendation(methods, "mediation", 2, ["Mechanism analysis can be attempted, but only after the total effect is credibly identified."]);
          addRecommendation(methods, "aipw", 2, ["Estimate the total effect cleanly before decomposing it."]);
        } else {
          warnings.push("Mechanism analysis inherits the same identification problems as the total effect, often more severely.");
        }
      }
    }

    if (state.design === "observational" && state.goal !== "threshold" && state.goal !== "instrument") {
      if (state.threshold === "yes") {
        addRecommendation(methods, "rdd", 2, ["A valid threshold may dominate selection-on-observables methods if it is credible."]);
      }
      if (state.instrument === "yes") {
        addRecommendation(methods, "iv", 2, ["A credible instrument can be stronger than purely observational adjustment when unobserved confounding is a concern."]);
      }
    }

    if (Object.keys(methods).length === 0) {
      addRecommendation(methods, "design_gap", 3, ["The current design answers do not yet imply a clean identification strategy."]);
    }

    var ordered = Object.keys(methods).map(function (id) {
      return methods[id];
    }).sort(function (a, b) {
      if (b.fit !== a.fit) {
        return b.fit - a.fit;
      }
      if (a.rank !== b.rank) {
        return a.rank - b.rank;
      }
      return a.id.localeCompare(b.id);
    }).slice(0, 4);

    return {
      recommendations: ordered,
      warnings: warnings
    };
  }

  function fitLabel(score) {
    if (score >= 3) {
      return "Best fit";
    }
    if (score === 2) {
      return "Good fallback";
    }
    return "Conditional";
  }

  function fitClass(score) {
    if (score >= 3) {
      return "causal-tool__method--best";
    }
    if (score === 2) {
      return "causal-tool__method--good";
    }
    return "causal-tool__method--conditional";
  }

  function getGoalLabel(state) {
    var goalLabel = state.goal;
    (GOAL_OPTIONS[state.design] || []).forEach(function (option) {
      if (option.value === state.goal) {
        goalLabel = option.label;
      }
    });
    return goalLabel;
  }

  function buildPathChips(state) {
    var chips = [];
    var heterogeneityVisible = state.goal === "heterogeneity" || (state.design === "observational" && state.goal === "ate");

    chips.push(state.design === "experimental" ? "Experimental" : "Observational");
    chips.push(getGoalLabel(state));

    if (state.design === "experimental") {
      if (state.prePeriod === "yes") {
        chips.push("pre-period data");
      }
      if (state.noncompliance === "yes") {
        chips.push("noncompliance");
      }
      if (state.randomizationIssue !== "none") {
        chips.push(state.randomizationIssue + " randomization issue");
      }
    } else {
      if (state.panelData === "yes") {
        chips.push("panel data");
      }
      if (state.threshold === "yes") {
        chips.push("threshold rule");
      }
      if (state.instrument === "yes") {
        chips.push("instrument available");
      }
      chips.push(state.confounders + " confounders");
      if (state.overlap !== "unknown") {
        chips.push(state.overlap + " overlap");
      }
    }

    if (heterogeneityVisible && state.highDimensional === "yes") {
      chips.push("high-dimensional features");
    }

    return chips;
  }

  function renderPath(state) {
    outputs.path.innerHTML = buildPathChips(state).map(function (chip) {
      return '<span class="causal-tool__chip">' + chip + '</span>';
    }).join("");
  }

  function renderSummary(recommendations, warnings) {
    if (!recommendations.length) {
      outputs.summary.innerHTML = "";
      return;
    }

    var primary = recommendations[0];
    var benchmark = recommendations.length > 1 ? recommendations[1] : null;
    var primaryMeta = METHODS[primary.id];
    var benchmarkMeta = benchmark ? METHODS[benchmark.id] : null;
    var caution = warnings[0] || primaryMeta.assumptions[0];

    outputs.summary.innerHTML =
      '<div class="causal-tool__brief-card">' +
        '<div class="causal-tool__brief-head">' +
          '<h3>Suggested workflow</h3>' +
          '<p>Use the first method as the working analysis plan, then benchmark it against a strong fallback or diagnostic.</p>' +
        '</div>' +
        '<div class="causal-tool__brief-grid">' +
          '<div class="causal-tool__brief-block">' +
            '<span class="causal-tool__brief-label">' + (primary.fit >= 3 ? "Start here" : "Current best option") + '</span>' +
            '<strong>' + primaryMeta.title + '</strong>' +
            '<p>' + primary.reasons[0] + '</p>' +
          '</div>' +
          '<div class="causal-tool__brief-block">' +
            '<span class="causal-tool__brief-label">' + (benchmark ? "Benchmark next" : "Next move") + '</span>' +
            (benchmark
              ? '<strong>' + benchmarkMeta.title + '</strong><p>' + benchmark.reasons[0] + '</p>'
              : '<strong>' + primaryMeta.nextChecks[0] + '</strong><p>Validate this first before adding more estimator complexity.</p>') +
          '</div>' +
          '<div class="causal-tool__brief-block">' +
            '<span class="causal-tool__brief-label">' + (warnings[0] ? "Main caution" : "Key assumption") + '</span>' +
            '<strong>' + (warnings[0] ? "Address before shipping conclusions" : "Defend this explicitly") + '</strong>' +
            '<p>' + caution + '</p>' +
          '</div>' +
        '</div>' +
      '</div>';
  }

  function renderWarnings(warnings) {
    if (!warnings.length) {
      outputs.warning.hidden = true;
      outputs.warning.innerHTML = "";
      return;
    }

    outputs.warning.hidden = false;
    outputs.warning.innerHTML =
      "<strong>Identification cautions</strong><ul>" +
      warnings.map(function (warning) {
        return "<li>" + warning + "</li>";
      }).join("") +
      "</ul>";
  }

  function renderBulletSection(title, items) {
    if (!items || !items.length) {
      return "";
    }

    return (
      "<div><h4>" + title + "</h4><ul>" +
      items.map(function (entry) {
        return "<li>" + entry + "</li>";
      }).join("") +
      "</ul></div>"
    );
  }

  function renderReferenceSection(title, items) {
    if (!items || !items.length) {
      return "";
    }

    return (
      '<div class="causal-tool__reference-block">' +
        "<h4>" + title + "</h4>" +
        '<ul class="causal-tool__reference-list">' +
          items.map(function (entry) {
            return (
              "<li>" +
                '<a href="' + entry.url + '" target="_blank" rel="noopener noreferrer">' + entry.label + "</a>" +
                '<span class="causal-tool__reference-note">' + entry.note + "</span>" +
              "</li>"
            );
          }).join("") +
        "</ul>" +
      "</div>"
    );
  }

  function renderReferenceGrid(meta) {
    var sections = [
      renderReferenceSection("Representative industry use cases", meta.useCases),
      renderReferenceSection("Popular book references", meta.bookRefs)
    ].filter(Boolean);

    if (!sections.length) {
      return "";
    }

    return '<div class="causal-tool__reference-grid">' + sections.join("") + "</div>";
  }

  function renderPackages(packages) {
    if (!packages || !packages.length) {
      return "";
    }

    return (
      '<div class="causal-tool__packages">' +
        '<h4>Suggested packages</h4>' +
        '<ul class="causal-tool__package-list">' +
          packages.map(function (entry) {
            return (
              '<li>' +
                '<a href="' + entry.url + '" target="_blank" rel="noopener noreferrer">' + entry.label + '</a>' +
                '<span class="causal-tool__package-note">' + entry.note + '</span>' +
              '</li>'
            );
          }).join("") +
        '</ul>' +
      '</div>'
    );
  }

  function renderResults(recommendations) {
    outputs.results.innerHTML = recommendations.map(function (item) {
      var meta = METHODS[item.id];
      return (
        '<article class="causal-tool__method ' + fitClass(item.fit) + '">' +
          '<div class="causal-tool__method-head">' +
            '<div>' +
              '<span class="causal-tool__badge">' + fitLabel(item.fit) + '</span>' +
              '<h3>' + meta.title + '</h3>' +
            '</div>' +
            '<span class="causal-tool__family">' + meta.family + '</span>' +
          '</div>' +
          '<p class="causal-tool__summary">' + meta.summary + '</p>' +
          '<div class="causal-tool__columns">' +
            renderBulletSection("Why it fits", item.reasons) +
            renderBulletSection("Critical assumptions", meta.assumptions) +
          '</div>' +
          '<div class="causal-tool__columns">' +
            renderBulletSection("Pros", meta.pros) +
            renderBulletSection("Cons", meta.cons) +
          '</div>' +
          renderBulletSection("What to validate next", meta.nextChecks) +
          renderReferenceGrid(meta) +
          renderPackages(meta.packages) +
          '<p class="causal-tool__alternatives"><strong>Also consider:</strong> ' + meta.alternatives.join(', ') + '.</p>' +
          '<div class="causal-tool__method-actions">' +
            '<button type="button" class="causal-tool__button causal-tool__button--ghost" data-export-checklist="1" data-method-id="' + item.id + '">Export robustness checklist</button>' +
          '</div>' +
        '</article>'
      );
    }).join("");
  }

  function updateQueryString(state) {
    var params = new URLSearchParams();
    Object.keys(state).forEach(function (key) {
      params.set(key, state[key]);
    });
    history.replaceState(null, "", window.location.pathname + "?" + params.toString());
  }

  function applyQueryString() {
    var params = new URLSearchParams(window.location.search);
    var design = params.get("design") || fields.design.value;

    if (GOAL_OPTIONS[design]) {
      fields.design.value = design;
      setGoalOptions(design, params.get("goal"));
    }

    Object.keys(fields).forEach(function (key) {
      var value = params.get(key);
      if (value && fields[key]) {
        fields[key].value = value;
      }
    });
  }

  function setTransientStatus(message) {
    outputs.shareStatus.textContent = message;
    window.setTimeout(function () {
      if (outputs.shareStatus.textContent === message) {
        outputs.shareStatus.textContent = "";
      }
    }, 2200);
  }

  function slugify(text) {
    return text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
  }

  function buildChecklistContent(item, meta) {
    var state = currentRender.state;
    var lines = [];

    lines.push("# Robustness checklist: " + meta.title);
    lines.push("");
    lines.push("Generated on: " + new Date().toLocaleDateString());
    lines.push("");
    lines.push("## Suggested workflow");
    lines.push("- Primary recommendation: " + METHODS[currentRender.recommendations[0].id].title);
    if (currentRender.recommendations[1] && METHODS[currentRender.recommendations[1].id]) {
      lines.push("- Benchmark or fallback: " + METHODS[currentRender.recommendations[1].id].title);
    }
    if (currentRender.warnings[0]) {
      lines.push("- Main caution: " + currentRender.warnings[0]);
    }
    lines.push("");
    lines.push("## Decision context");
    lines.push("- Design: " + (state.design === "experimental" ? "Experimental or randomized data" : "Observational or non-randomized data"));
    lines.push("- Goal: " + getGoalLabel(state));
    lines.push("- Selector fit: " + fitLabel(item.fit));
    lines.push("- Decision path: " + buildPathChips(state).join(" | "));
    lines.push("");
    lines.push("## Why this method fits");
    item.reasons.forEach(function (reason) {
      lines.push("- " + reason);
    });
    lines.push("");
    lines.push("## Critical assumptions to defend");
    meta.assumptions.forEach(function (entry) {
      lines.push("- [ ] " + entry);
    });
    lines.push("");
    lines.push("## Pros");
    meta.pros.forEach(function (entry) {
      lines.push("- " + entry);
    });
    lines.push("");
    lines.push("## Cons");
    meta.cons.forEach(function (entry) {
      lines.push("- " + entry);
    });
    lines.push("");
    lines.push("## Robustness checklist");
    meta.robustnessChecklist.forEach(function (entry) {
      lines.push("- [ ] " + entry);
    });
    lines.push("");
    lines.push("## What to validate next");
    meta.nextChecks.forEach(function (entry) {
      lines.push("- [ ] " + entry);
    });
    lines.push("");
    lines.push("## Suggested packages");
    meta.packages.forEach(function (entry) {
      lines.push("- [" + entry.label + "](" + entry.url + "): " + entry.note);
    });

    if (meta.useCases && meta.useCases.length) {
      lines.push("");
      lines.push("## Representative industry use cases");
      meta.useCases.forEach(function (entry) {
        lines.push("- [" + entry.label + "](" + entry.url + "): " + entry.note);
      });
    }

    if (meta.bookRefs && meta.bookRefs.length) {
      lines.push("");
      lines.push("## Popular book references");
      meta.bookRefs.forEach(function (entry) {
        lines.push("- [" + entry.label + "](" + entry.url + "): " + entry.note);
      });
    }

    lines.push("");
    lines.push("## Alternative methods to benchmark");
    meta.alternatives.forEach(function (entry) {
      lines.push("- " + entry);
    });

    if (currentRender.warnings.length) {
      lines.push("");
      lines.push("## Identification cautions from the selector");
      currentRender.warnings.forEach(function (warning) {
        lines.push("- " + warning);
      });
    }

    lines.push("");
    lines.push("Generated from the causal method selector on pakshingho.com.");
    return lines.join("\n");
  }

  function exportChecklist(methodId) {
    if (!currentRender) {
      return;
    }

    var item = null;
    currentRender.recommendations.forEach(function (entry) {
      if (entry.id === methodId) {
        item = entry;
      }
    });

    if (!item || !METHODS[methodId]) {
      return;
    }

    var meta = METHODS[methodId];
    var blob = new Blob([buildChecklistContent(item, meta)], { type: "text/markdown;charset=utf-8" });
    var url = window.URL.createObjectURL(blob);
    var link = document.createElement("a");
    link.href = url;
    link.download = "robustness-checklist-" + slugify(meta.title) + ".md";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.setTimeout(function () {
      window.URL.revokeObjectURL(url);
    }, 1000);
    setTransientStatus("Checklist exported.");
  }

  function update() {
    syncVisibility();
    var state = getState();
    var recommendation = recommend(state);
    currentRender = {
      state: state,
      recommendations: recommendation.recommendations,
      warnings: recommendation.warnings
    };
    renderPath(state);
    renderSummary(recommendation.recommendations, recommendation.warnings);
    renderWarnings(recommendation.warnings);
    renderResults(recommendation.recommendations);
    updateQueryString(state);
  }

  function handleDesignChange() {
    setGoalOptions(fields.design.value);
    syncVisibility();
    update();
  }

  shareButton.addEventListener("click", function () {
    var url = window.location.href;
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(url).then(function () {
        setTransientStatus("Link copied.");
      }).catch(function () {
        outputs.shareStatus.textContent = url;
      });
    } else {
      outputs.shareStatus.textContent = url;
    }
  });

  resetButton.addEventListener("click", function () {
    fields.design.value = "experimental";
    setGoalOptions("experimental", "ate");
    fields.prePeriod.value = "no";
    fields.randomizationIssue.value = "none";
    fields.noncompliance.value = "no";
    fields.panelData.value = "no";
    fields.staggeredPolicy.value = "no";
    fields.singleUnit.value = "no";
    fields.threshold.value = "no";
    fields.instrument.value = "no";
    fields.confounders.value = "observed";
    fields.overlap.value = "good";
    fields.highDimensional.value = "no";
    update();
  });

  outputs.results.addEventListener("click", function (event) {
    var button = event.target.closest("[data-export-checklist]");
    if (!button) {
      return;
    }
    exportChecklist(button.getAttribute("data-method-id"));
  });

  fields.design.addEventListener("change", handleDesignChange);
  Object.keys(fields).forEach(function (key) {
    if (key === "design") {
      return;
    }
    fields[key].addEventListener("change", update);
  });

  setGoalOptions(fields.design.value);
  applyQueryString();
  syncVisibility();
  update();
});
