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

  var METHODS = {
    experiment: {
      title: "Randomized experiment with covariate-adjusted analysis",
      family: "Experimental",
      summary: "Use intention-to-treat as the baseline estimate, with regression adjustment or stratification for precision and imbalance control.",
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
      alternatives: ["CUPED", "CACE / IV", "heterogeneity models"]
    },
    cuped: {
      title: "CUPED or pre-period regression adjustment",
      family: "Experimental",
      summary: "Best when randomization is valid and strong pre-treatment outcomes are available. It reduces variance without changing identification.",
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
      alternatives: ["ANCOVA", "standard experiment analysis"]
    },
    cace: {
      title: "CACE / instrumental variables for noncompliance",
      family: "Experimental",
      summary: "Use assignment as an instrument when treatment take-up differs from assignment and you need the effect among compliers.",
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
      alternatives: ["ITT only", "encouragement design diagnostics"]
    },
    uplift: {
      title: "Causal forests, uplift models, or meta-learners",
      family: "Heterogeneity",
      summary: "Use when the main goal is differential treatment effects across users, markets, or segments rather than only one overall ATE.",
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
      alternatives: ["subgroup analysis", "AIPW / DR learners"]
    },
    mediation: {
      title: "Mediation analysis",
      family: "Mechanism",
      summary: "Use after establishing a credible total effect when the goal is to decompose direct and indirect pathways.",
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
      alternatives: ["structural causal models", "mechanism-specific experiments"]
    },
    repair: {
      title: "Propensity weighting or matching as a repair strategy",
      family: "Bias repair",
      summary: "Use only when experimental integrity is compromised enough that treatment and control are no longer meaningfully exchangeable without adjustment.",
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
      alternatives: ["rerun experiment", "covariate-adjusted ITT"]
    },
    propensity: {
      title: "Matching or propensity-score weighting",
      family: "Observational adjustment",
      summary: "Good first-line observational methods when treatment is not randomized but most confounders are observed and overlap is acceptable.",
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
      alternatives: ["AIPW", "double machine learning"]
    },
    aipw: {
      title: "AIPW / doubly robust estimation / double machine learning",
      family: "Observational adjustment",
      summary: "Preferred when confounders are observed and the feature space is rich. It combines outcome modeling and propensity modeling for more robust estimation.",
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
      alternatives: ["matching", "IPTW", "causal forests / DR learners"]
    },
    did: {
      title: "Difference-in-differences / event study",
      family: "Panel or policy",
      summary: "Best for policy or feature rollouts observed over time with untreated comparison units and a credible parallel-trends argument.",
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
      alternatives: ["synthetic control", "interrupted time series"]
    },
    synthetic: {
      title: "Synthetic control or Bayesian structural time series",
      family: "Panel or policy",
      summary: "Useful when one or a small number of units receive treatment and you can build a credible counterfactual from donor units or pre-period dynamics.",
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
      alternatives: ["difference-in-differences", "interrupted time series"]
    },
    its: {
      title: "Interrupted time series",
      family: "Panel or policy",
      summary: "Use when the policy effect is identified mainly from a clear break in one unit's time series and a comparison group is weak or unavailable.",
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
      alternatives: ["synthetic control", "difference-in-differences"]
    },
    rdd: {
      title: "Regression discontinuity design",
      family: "Quasi-experimental",
      summary: "Best when treatment assignment changes sharply at a known cutoff and units near the threshold are comparable.",
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
      alternatives: ["IV", "matching near the threshold"]
    },
    iv: {
      title: "Instrumental variables",
      family: "Quasi-experimental",
      summary: "Use when unobserved confounding is likely but you have a strong source of exogenous variation that shifts treatment.",
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
      alternatives: ["RDD", "difference-in-differences", "natural-experiment design audit"]
    },
    design_gap: {
      title: "Design is not identified cleanly yet",
      family: "Warning",
      summary: "Current answers do not support a strong causal identification strategy. The next step is design improvement, not picking a fancier estimator.",
      assumptions: [
        "You may need stronger design variation, better confounders, or quasi-experimental structure"
      ],
      nextChecks: [
        "Look for threshold rules, instruments, or rollout timing",
        "Collect better pre-treatment covariates or longitudinal data",
        "Use sensitivity analysis before making product or policy claims"
      ],
      alternatives: ["RDD", "IV", "DiD", "better experiment design"]
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
    warning: document.getElementById("causal-tool-warning"),
    results: document.getElementById("causal-tool-results"),
    shareStatus: document.getElementById("causal-tool-share-status")
  };

  var shareButton = document.getElementById("causal-tool-share");
  var resetButton = document.getElementById("causal-tool-reset");

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
    if (!bucket[id]) {
      bucket[id] = { id: id, fit: fit, reasons: [] };
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

  function renderPath(state) {
    var chips = [];
    chips.push(state.design === "experimental" ? "Experimental" : "Observational");
    chips.push(fields.goal.options[fields.goal.selectedIndex].textContent);

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

    if (state.highDimensional === "yes") {
      chips.push("high-dimensional features");
    }

    outputs.path.innerHTML = chips.map(function (chip) {
      return '<span class="causal-tool__chip">' + chip + '</span>';
    }).join("");
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
            '<div><h4>Why it fits</h4><ul>' + item.reasons.map(function (reason) { return '<li>' + reason + '</li>'; }).join("") + '</ul></div>' +
            '<div><h4>Critical assumptions</h4><ul>' + meta.assumptions.map(function (entry) { return '<li>' + entry + '</li>'; }).join("") + '</ul></div>' +
          '</div>' +
          '<div><h4>What to validate next</h4><ul>' + meta.nextChecks.map(function (entry) { return '<li>' + entry + '</li>'; }).join("") + '</ul></div>' +
          '<p class="causal-tool__alternatives"><strong>Also consider:</strong> ' + meta.alternatives.join(', ') + '.</p>' +
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

  function update() {
    syncVisibility();
    var state = getState();
    var recommendation = recommend(state);
    renderPath(state);
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
        outputs.shareStatus.textContent = "Link copied.";
      }).catch(function () {
        outputs.shareStatus.textContent = url;
      });
    } else {
      outputs.shareStatus.textContent = url;
    }
    window.setTimeout(function () {
      outputs.shareStatus.textContent = "";
    }, 2200);
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
