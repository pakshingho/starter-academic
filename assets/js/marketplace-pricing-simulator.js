document.addEventListener("DOMContentLoaded", function () {
  var tool = document.getElementById("marketplace-pricing-tool");
  if (!tool) {
    return;
  }

  var presets = {
    ride: {
      label: "Ride-hailing (Uber-like)",
      example: "Uber",
      unitPlural: "rides",
      demandSide: "rider requests",
      supplySide: "driver capacity",
      dynamicPricing: "surge pricing",
      notes: "Use city-hour or zone-hour panels and control for rain, commute windows, airport demand, and special events.",
      defaults: {
        simulationMode: "equilibrium",
        referencePrice: 22.0,
        currentPrice: 24.0,
        baselineDemand: 18000,
        priceElasticity: 1.35,
        promoDepth: 0,
        promoHalo: 3.0,
        demandShock: 12,
        referencePayout: 15.0,
        baselineSupply: 17000,
        supplyElasticity: 1.1,
        takeRate: 25,
        matchingEfficiency: 92,
        supplyShock: -4,
        incentiveMode: "threshold",
        perUnitIncentive: 0.0,
        eligibleShare: 70,
        questThreshold: 60,
        questBonus: 180,
        attainmentProbability: 60,
        guaranteedFloor: 18.0,
        dynamicPolicy: "targeted",
        dynamicSteps: 12,
        dynamicMinutes: 5,
        dynamicAggressiveness: 0.75,
        dynamicCap: 2.6,
        dynamicSupplyLag: 35,
        dynamicShockDecay: 18,
        dynamicTargetFill: 95,
        dynamicTargetBuffer: 6,
        dynamicLinkedIncentiveRate: 4.0,
        dynamicLinkedIncentiveCap: 6.0
      }
    },
    delivery: {
      label: "Delivery marketplace (DoorDash-like)",
      example: "DoorDash",
      unitPlural: "orders",
      demandSide: "consumer orders",
      supplySide: "dasher capacity",
      dynamicPricing: "fee and incentive tuning",
      notes: "DoorDash-like systems should control for basket size, store availability, ETA, and restaurant prep times when estimating demand.",
      defaults: {
        simulationMode: "equilibrium",
        referencePrice: 18.0,
        currentPrice: 17.5,
        baselineDemand: 12500,
        priceElasticity: 1.65,
        promoDepth: 12,
        promoHalo: 5.0,
        demandShock: 8,
        referencePayout: 10.75,
        baselineSupply: 11800,
        supplyElasticity: 0.85,
        takeRate: 22,
        matchingEfficiency: 88,
        supplyShock: -2,
        incentiveMode: "per-unit",
        perUnitIncentive: 1.75,
        eligibleShare: 80,
        questThreshold: 45,
        questBonus: 85,
        attainmentProbability: 55,
        guaranteedFloor: 11.5,
        dynamicPolicy: "simple",
        dynamicSteps: 10,
        dynamicMinutes: 6,
        dynamicAggressiveness: 0.6,
        dynamicCap: 2.0,
        dynamicSupplyLag: 42,
        dynamicShockDecay: 14,
        dynamicTargetFill: 94,
        dynamicTargetBuffer: 5,
        dynamicLinkedIncentiveRate: 2.5,
        dynamicLinkedIncentiveCap: 4.0
      }
    },
    rental: {
      label: "Short-term rentals (Airbnb-like)",
      example: "Airbnb",
      unitPlural: "booked nights",
      demandSide: "guest booking demand",
      supplySide: "host availability",
      dynamicPricing: "nightly price optimization",
      notes: "Airbnb-like systems move more slowly, so estimate elasticity by booking window, season, and occupancy state instead of minute-level demand shocks.",
      defaults: {
        simulationMode: "equilibrium",
        referencePrice: 210.0,
        currentPrice: 195.0,
        baselineDemand: 1400,
        priceElasticity: 0.85,
        promoDepth: 5,
        promoHalo: 2.5,
        demandShock: 15,
        referencePayout: 178.0,
        baselineSupply: 1500,
        supplyElasticity: 0.45,
        takeRate: 15,
        matchingEfficiency: 81,
        supplyShock: 4,
        incentiveMode: "none",
        perUnitIncentive: 0.0,
        eligibleShare: 35,
        questThreshold: 4,
        questBonus: 40,
        attainmentProbability: 40,
        guaranteedFloor: 180.0,
        dynamicPolicy: "simple",
        dynamicSteps: 8,
        dynamicMinutes: 60,
        dynamicAggressiveness: 0.25,
        dynamicCap: 1.4,
        dynamicSupplyLag: 20,
        dynamicShockDecay: 10,
        dynamicTargetFill: 90,
        dynamicTargetBuffer: 3,
        dynamicLinkedIncentiveRate: 0.5,
        dynamicLinkedIncentiveCap: 1.5
      }
    }
  };

  var fields = {
    marketplace: document.getElementById("mp-marketplace"),
    simulationMode: document.getElementById("mp-simulation-mode"),
    referencePrice: document.getElementById("mp-reference-price"),
    currentPrice: document.getElementById("mp-current-price"),
    baselineDemand: document.getElementById("mp-baseline-demand"),
    priceElasticity: document.getElementById("mp-price-elasticity"),
    promoDepth: document.getElementById("mp-promo-depth"),
    promoHalo: document.getElementById("mp-promo-halo"),
    demandShock: document.getElementById("mp-demand-shock"),
    referencePayout: document.getElementById("mp-reference-payout"),
    baselineSupply: document.getElementById("mp-baseline-supply"),
    supplyElasticity: document.getElementById("mp-supply-elasticity"),
    takeRate: document.getElementById("mp-take-rate"),
    matchingEfficiency: document.getElementById("mp-matching-efficiency"),
    supplyShock: document.getElementById("mp-supply-shock"),
    incentiveMode: document.getElementById("mp-incentive-mode"),
    perUnitIncentive: document.getElementById("mp-per-unit-incentive"),
    eligibleShare: document.getElementById("mp-eligible-share"),
    questThreshold: document.getElementById("mp-quest-threshold"),
    questBonus: document.getElementById("mp-quest-bonus"),
    attainmentProbability: document.getElementById("mp-attainment-probability"),
    guaranteedFloor: document.getElementById("mp-guaranteed-floor"),
    dynamicPolicy: document.getElementById("mp-dynamic-policy"),
    dynamicSteps: document.getElementById("mp-dynamic-steps"),
    dynamicMinutes: document.getElementById("mp-dynamic-minutes"),
    dynamicAggressiveness: document.getElementById("mp-dynamic-aggressiveness"),
    dynamicCap: document.getElementById("mp-dynamic-cap"),
    dynamicSupplyLag: document.getElementById("mp-dynamic-supply-lag"),
    dynamicShockDecay: document.getElementById("mp-dynamic-shock-decay"),
    dynamicTargetFill: document.getElementById("mp-dynamic-target-fill"),
    dynamicTargetBuffer: document.getElementById("mp-dynamic-target-buffer"),
    dynamicLinkedIncentiveRate: document.getElementById("mp-dynamic-linked-incentive"),
    dynamicLinkedIncentiveCap: document.getElementById("mp-dynamic-linked-cap")
  };

  var groups = {
    perUnitIncentive: document.getElementById("group-mp-per-unit-incentive"),
    eligibleShare: document.getElementById("group-mp-eligible-share"),
    questThreshold: document.getElementById("group-mp-quest-threshold"),
    questBonus: document.getElementById("group-mp-quest-bonus"),
    attainmentProbability: document.getElementById("group-mp-attainment-probability"),
    guaranteedFloor: document.getElementById("group-mp-guaranteed-floor"),
    dynamicSection: document.getElementById("group-mp-dynamic-section"),
    dynamicTargetFill: document.getElementById("group-mp-dynamic-target-fill"),
    dynamicTargetBuffer: document.getElementById("group-mp-dynamic-target-buffer"),
    dynamicLinkedIncentiveRate: document.getElementById("group-mp-dynamic-linked-incentive"),
    dynamicLinkedIncentiveCap: document.getElementById("group-mp-dynamic-linked-cap")
  };

  var outputs = {
    demand: document.getElementById("mp-metric-demand"),
    promo: document.getElementById("mp-metric-promo"),
    elasticity: document.getElementById("mp-metric-elasticity"),
    fill: document.getElementById("mp-metric-fill"),
    gap: document.getElementById("mp-metric-gap"),
    tightness: document.getElementById("mp-metric-tightness"),
    equilibriumPrice: document.getElementById("mp-metric-eq-price"),
    equilibriumVolume: document.getElementById("mp-metric-eq-volume"),
    surge: document.getElementById("mp-metric-surge"),
    revenue: document.getElementById("mp-metric-revenue"),
    payout: document.getElementById("mp-metric-payout"),
    incentiveRate: document.getElementById("mp-metric-incentive-rate"),
    incentiveCost: document.getElementById("mp-metric-incentive-cost"),
    netRevenue: document.getElementById("mp-metric-net-revenue"),
    incrementalSupply: document.getElementById("mp-metric-incremental-supply"),
    marketState: document.getElementById("mp-metric-state"),
    labelDemand: document.getElementById("mp-label-demand"),
    labelPromo: document.getElementById("mp-label-promo"),
    labelElasticity: document.getElementById("mp-label-elasticity"),
    labelFill: document.getElementById("mp-label-fill"),
    labelGap: document.getElementById("mp-label-gap"),
    labelTightness: document.getElementById("mp-label-tightness"),
    labelEquilibriumPrice: document.getElementById("mp-label-eq-price"),
    labelEquilibriumVolume: document.getElementById("mp-label-eq-volume"),
    labelSurge: document.getElementById("mp-label-surge"),
    labelRevenue: document.getElementById("mp-label-revenue"),
    labelPayout: document.getElementById("mp-label-payout"),
    labelIncentiveRate: document.getElementById("mp-label-incentive-rate"),
    labelIncentiveCost: document.getElementById("mp-label-incentive-cost"),
    labelNetRevenue: document.getElementById("mp-label-net-revenue"),
    labelIncrementalSupply: document.getElementById("mp-label-incremental-supply"),
    labelMarketState: document.getElementById("mp-label-market-state"),
    summary: document.getElementById("mp-summary"),
    error: document.getElementById("mp-error"),
    demandChart: document.getElementById("mp-demand-chart"),
    equilibriumChart: document.getElementById("mp-equilibrium-chart"),
    tertiaryChart: document.getElementById("mp-tertiary-chart"),
    chartTitleOne: document.getElementById("mp-chart-title-one"),
    chartTextOne: document.getElementById("mp-chart-text-one"),
    chartTitleTwo: document.getElementById("mp-chart-title-two"),
    chartTextTwo: document.getElementById("mp-chart-text-two"),
    chartTitleThree: document.getElementById("mp-chart-title-three"),
    chartTextThree: document.getElementById("mp-chart-text-three"),
    chartThreeCard: document.getElementById("mp-chart-card-three"),
    tableHead: document.getElementById("mp-table-head"),
    ladderBody: document.getElementById("mp-ladder-body"),
    shareStatus: document.getElementById("mp-share-status")
  };

  var shareButton = document.getElementById("mp-share");
  var resetButton = document.getElementById("mp-reset");
  var shareKeys = {
    marketplace: "m",
    simulationMode: "mode",
    referencePrice: "p0",
    currentPrice: "p",
    baselineDemand: "d0",
    priceElasticity: "ed",
    promoDepth: "promo",
    promoHalo: "halo",
    demandShock: "ds",
    referencePayout: "w0",
    baselineSupply: "s0",
    supplyElasticity: "es",
    takeRate: "tau",
    matchingEfficiency: "match",
    supplyShock: "ss",
    incentiveMode: "im",
    perUnitIncentive: "iu",
    eligibleShare: "elig",
    questThreshold: "qt",
    questBonus: "qb",
    attainmentProbability: "ap",
    guaranteedFloor: "gf",
    dynamicPolicy: "dpol",
    dynamicSteps: "dsteps",
    dynamicMinutes: "dmins",
    dynamicAggressiveness: "dl",
    dynamicCap: "dcap",
    dynamicSupplyLag: "dlag",
    dynamicShockDecay: "ddecay",
    dynamicTargetFill: "dfill",
    dynamicTargetBuffer: "dbuf",
    dynamicLinkedIncentiveRate: "dinc",
    dynamicLinkedIncentiveCap: "dmax"
  };

  function getPreset(key) {
    return presets[key] || presets.ride;
  }

  function syncControlVisibility() {
    var incentiveMode = fields.incentiveMode.value;
    var isDynamic = fields.simulationMode.value === "dynamic";
    var isTargeted = isDynamic && fields.dynamicPolicy.value === "targeted";

    groups.perUnitIncentive.hidden = incentiveMode !== "per-unit";
    groups.eligibleShare.hidden = incentiveMode !== "threshold";
    groups.questThreshold.hidden = incentiveMode !== "threshold";
    groups.questBonus.hidden = incentiveMode !== "threshold";
    groups.attainmentProbability.hidden = incentiveMode !== "threshold";
    groups.guaranteedFloor.hidden = incentiveMode !== "threshold";

    groups.dynamicSection.hidden = !isDynamic;
    groups.dynamicTargetFill.hidden = !isTargeted;
    groups.dynamicTargetBuffer.hidden = !isTargeted;
    groups.dynamicLinkedIncentiveRate.hidden = !isTargeted;
    groups.dynamicLinkedIncentiveCap.hidden = !isTargeted;
  }

  function applyPreset(key) {
    var preset = getPreset(key);
    fields.marketplace.value = key in presets ? key : "ride";

    Object.keys(preset.defaults).forEach(function (name) {
      fields[name].value = preset.defaults[name];
    });

    syncControlVisibility();
    outputs.shareStatus.textContent = "";
  }

  function clamp(value, minimum, maximum) {
    return Math.min(Math.max(value, minimum), maximum);
  }

  function formatCount(value) {
    if (!isFinite(value)) {
      return "-";
    }

    return Math.round(value).toLocaleString("en-US");
  }

  function formatSignedCount(value) {
    if (!isFinite(value)) {
      return "-";
    }

    var rounded = Math.round(value);

    if (rounded > 0) {
      return "+" + rounded.toLocaleString("en-US");
    }

    if (rounded < 0) {
      return "-" + Math.abs(rounded).toLocaleString("en-US");
    }

    return "0";
  }

  function formatPercent(value, digits) {
    if (!isFinite(value)) {
      return "-";
    }

    return (value * 100).toFixed(typeof digits === "number" ? digits : 1) + "%";
  }

  function formatSignedPercent(value, digits) {
    if (!isFinite(value)) {
      return "-";
    }

    var amount = (value * 100).toFixed(typeof digits === "number" ? digits : 1) + "%";
    return value > 0 ? "+" + amount : amount;
  }

  function formatCurrency(value, digits) {
    if (!isFinite(value)) {
      return "-";
    }

    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: typeof digits === "number" ? digits : 0,
      maximumFractionDigits: typeof digits === "number" ? digits : 0
    }).format(value);
  }

  function formatRatio(value) {
    if (!isFinite(value)) {
      return ">9.99x";
    }

    return value.toFixed(2) + "x";
  }

  function formatCurrencyRate(value) {
    return formatCurrency(value, 2) + "/unit";
  }

  function formatMinutes(value) {
    return Math.round(value) + "m";
  }

  function showError(message) {
    outputs.error.hidden = false;
    outputs.error.textContent = message;
  }

  function clearError() {
    outputs.error.hidden = true;
    outputs.error.textContent = "";
  }

  function setMetricLabels(mode) {
    if (mode === "dynamic") {
      outputs.labelDemand.textContent = "Step 1 demand";
      outputs.labelPromo.textContent = "Step 1 promotion lift";
      outputs.labelElasticity.textContent = "Point elasticity";
      outputs.labelFill.textContent = "Step 1 fill rate";
      outputs.labelGap.textContent = "Step 1 supply gap";
      outputs.labelTightness.textContent = "Peak tightness";
      outputs.labelEquilibriumPrice.textContent = "Peak surge price";
      outputs.labelEquilibriumVolume.textContent = "Final completed volume";
      outputs.labelSurge.textContent = "Peak surge multiplier";
      outputs.labelRevenue.textContent = "Cumulative gross revenue";
      outputs.labelPayout.textContent = "Final supplier payout";
      outputs.labelIncentiveRate.textContent = "Peak supplier incentive";
      outputs.labelIncentiveCost.textContent = "Cumulative incentive cost";
      outputs.labelNetRevenue.textContent = "Cumulative net revenue";
      outputs.labelIncrementalSupply.textContent = "Peak supply uplift";
      outputs.labelMarketState.textContent = "Final market state";
      return;
    }

    outputs.labelDemand.textContent = "Demand at current price";
    outputs.labelPromo.textContent = "Increment from promotion";
    outputs.labelElasticity.textContent = "Point elasticity";
    outputs.labelFill.textContent = "Fill rate at current price";
    outputs.labelGap.textContent = "Supply gap at current price";
    outputs.labelTightness.textContent = "Tightness ratio";
    outputs.labelEquilibriumPrice.textContent = "Equilibrium price";
    outputs.labelEquilibriumVolume.textContent = "Equilibrium completed volume";
    outputs.labelSurge.textContent = "Clear-market multiplier";
    outputs.labelRevenue.textContent = "Gross platform revenue";
    outputs.labelPayout.textContent = "Supplier payout incl. incentives";
    outputs.labelIncentiveRate.textContent = "Effective supplier incentive";
    outputs.labelIncentiveCost.textContent = "Incentive cost at equilibrium";
    outputs.labelNetRevenue.textContent = "Net platform revenue";
    outputs.labelIncrementalSupply.textContent = "Incremental supply from incentives";
    outputs.labelMarketState.textContent = "Market state";
  }

  function setChartCopy(mode, preset) {
    if (mode === "dynamic") {
      outputs.chartTitleOne.textContent = "Surge Path";
      outputs.chartTextOne.textContent = "Shows the surge multiplier the controller applies over time after the initial demand and supply shock.";
      outputs.chartTitleTwo.textContent = "Demand vs Effective Supply";
      outputs.chartTextTwo.textContent = "Tracks whether supply catches up as price and any supplier incentives react across the modeled horizon.";
      outputs.chartTitleThree.textContent = "Service Quality Path";
      outputs.chartTextThree.textContent = "Compares fill rate and shortage pressure as the simple or fill-rate-targeted controller updates step by step.";
      outputs.chartThreeCard.hidden = false;
      return;
    }

    outputs.chartTitleOne.textContent = "Demand Curve";
    outputs.chartTextOne.textContent = "Shows how the price assumption and promotion change expected demand at a market-day level.";
    outputs.chartTitleTwo.textContent = "Supply-Demand Equilibrium";
    outputs.chartTextTwo.textContent = "Market clearing occurs when promoted demand meets effective supply after take rate, matching frictions, and any supplier incentive program.";
    outputs.chartTitleThree.textContent = "Service Quality Path";
    outputs.chartTextThree.textContent = "Dynamic mode adds a third view for fill rate, shortage pressure, or operating targets over time.";
    outputs.chartThreeCard.hidden = true;
    outputs.tertiaryChart.innerHTML = "";
  }

  function setTableHead(mode) {
    if (mode === "dynamic") {
      outputs.tableHead.innerHTML =
        "<tr>" +
        "<th>Step</th>" +
        "<th>Minute</th>" +
        "<th>Surge</th>" +
        "<th>Gross price</th>" +
        "<th>Demand</th>" +
        "<th>Effective supply</th>" +
        "<th>Fill rate</th>" +
        "<th>Incentive / unit</th>" +
        "<th>Net revenue</th>" +
        "</tr>";
      return;
    }

    outputs.tableHead.innerHTML =
      "<tr>" +
      "<th>Gross price</th>" +
      "<th>Demand</th>" +
      "<th>Effective supply</th>" +
      "<th>Imbalance</th>" +
      "<th>Completed volume</th>" +
      "<th>Net platform revenue</th>" +
      "</tr>";
  }

  function clearRenderedOutputs() {
    [
      outputs.demand,
      outputs.promo,
      outputs.elasticity,
      outputs.fill,
      outputs.gap,
      outputs.tightness,
      outputs.equilibriumPrice,
      outputs.equilibriumVolume,
      outputs.surge,
      outputs.revenue,
      outputs.payout,
      outputs.incentiveRate,
      outputs.incentiveCost,
      outputs.netRevenue,
      outputs.incrementalSupply,
      outputs.marketState
    ].forEach(function (node) {
      node.textContent = "-";
    });

    outputs.summary.innerHTML = "";
    outputs.demandChart.innerHTML = "";
    outputs.equilibriumChart.innerHTML = "";
    outputs.tertiaryChart.innerHTML = "";
    outputs.ladderBody.innerHTML = "";
  }

  function readState() {
    var state = {
      marketplace: fields.marketplace.value,
      simulationMode: fields.simulationMode.value,
      referencePrice: Number(fields.referencePrice.value),
      currentPrice: Number(fields.currentPrice.value),
      baselineDemand: Number(fields.baselineDemand.value),
      priceElasticity: Number(fields.priceElasticity.value),
      promoDepth: Number(fields.promoDepth.value) / 100,
      promoHalo: Number(fields.promoHalo.value) / 100,
      demandShock: Number(fields.demandShock.value) / 100,
      referencePayout: Number(fields.referencePayout.value),
      baselineSupply: Number(fields.baselineSupply.value),
      supplyElasticity: Number(fields.supplyElasticity.value),
      takeRate: Number(fields.takeRate.value) / 100,
      matchingEfficiency: Number(fields.matchingEfficiency.value) / 100,
      supplyShock: Number(fields.supplyShock.value) / 100,
      incentiveMode: fields.incentiveMode.value,
      perUnitIncentive: Number(fields.perUnitIncentive.value),
      eligibleShare: Number(fields.eligibleShare.value) / 100,
      questThreshold: Number(fields.questThreshold.value),
      questBonus: Number(fields.questBonus.value),
      attainmentProbability: Number(fields.attainmentProbability.value) / 100,
      guaranteedFloor: Number(fields.guaranteedFloor.value),
      dynamicPolicy: fields.dynamicPolicy.value,
      dynamicSteps: Math.round(Number(fields.dynamicSteps.value)),
      dynamicMinutes: Number(fields.dynamicMinutes.value),
      dynamicAggressiveness: Number(fields.dynamicAggressiveness.value),
      dynamicCap: Number(fields.dynamicCap.value),
      dynamicSupplyLag: Number(fields.dynamicSupplyLag.value) / 100,
      dynamicShockDecay: Number(fields.dynamicShockDecay.value) / 100,
      dynamicTargetFill: Number(fields.dynamicTargetFill.value) / 100,
      dynamicTargetBuffer: Number(fields.dynamicTargetBuffer.value) / 100,
      dynamicLinkedIncentiveRate: Number(fields.dynamicLinkedIncentiveRate.value),
      dynamicLinkedIncentiveCap: Number(fields.dynamicLinkedIncentiveCap.value)
    };

    if (
      !(state.referencePrice > 0) ||
      !(state.currentPrice > 0) ||
      !(state.baselineDemand > 0) ||
      !(state.priceElasticity > 0) ||
      !(state.promoDepth >= 0 && state.promoDepth < 0.95) ||
      !(state.promoHalo >= 0) ||
      !(state.demandShock > -1) ||
      !(state.referencePayout > 0) ||
      !(state.baselineSupply > 0) ||
      !(state.supplyElasticity > 0) ||
      !(state.takeRate > 0 && state.takeRate < 1) ||
      !(state.matchingEfficiency > 0 && state.matchingEfficiency <= 1) ||
      !(state.supplyShock > -1) ||
      !(state.perUnitIncentive >= 0) ||
      !(state.eligibleShare >= 0 && state.eligibleShare <= 1) ||
      !(state.questThreshold >= 1) ||
      !(state.questBonus >= 0) ||
      !(state.attainmentProbability >= 0 && state.attainmentProbability <= 1) ||
      !(state.guaranteedFloor >= 0) ||
      !(state.dynamicSteps >= 3 && state.dynamicSteps <= 48) ||
      !(state.dynamicMinutes > 0 && state.dynamicMinutes <= 120) ||
      !(state.dynamicAggressiveness > 0) ||
      !(state.dynamicCap >= 1) ||
      !(state.dynamicSupplyLag > 0 && state.dynamicSupplyLag <= 1) ||
      !(state.dynamicShockDecay >= 0 && state.dynamicShockDecay <= 1) ||
      !(state.dynamicTargetFill > 0.5 && state.dynamicTargetFill <= 1) ||
      !(state.dynamicTargetBuffer >= 0) ||
      !(state.dynamicLinkedIncentiveRate >= 0) ||
      !(state.dynamicLinkedIncentiveCap >= 0)
    ) {
      return null;
    }

    return state;
  }

  function demandWithoutPromo(price, state) {
    return state.baselineDemand *
      Math.pow(Math.max(price, 0.01) / state.referencePrice, -state.priceElasticity) *
      (1 + state.demandShock);
  }

  function demandWithPromo(price, state) {
    var effectiveConsumerPrice = Math.max(price * (1 - state.promoDepth), 0.01);
    var promoHaloMultiplier = 1 + (state.promoDepth / 0.10) * state.promoHalo;

    return state.baselineDemand *
      Math.pow(effectiveConsumerPrice / state.referencePrice, -state.priceElasticity) *
      promoHaloMultiplier *
      (1 + state.demandShock);
  }

  function incentiveProfile(price, state, options) {
    options = options || {};

    var dynamicPerUnitIncentive = Math.max(Number(options.dynamicPerUnitIncentive) || 0, 0);
    var basePayout = Math.max(price * (1 - state.takeRate), 0.01);
    var questEquivalentPerCompleted = 0;
    var guaranteeTopUpPerCompleted = 0;
    var baseEquivalentPerCompleted = 0;
    var modelLabel = "No explicit incentive";

    if (state.incentiveMode === "per-unit") {
      modelLabel = "Per-unit incentive";
      baseEquivalentPerCompleted = state.perUnitIncentive;
    } else if (state.incentiveMode === "threshold") {
      modelLabel = "Threshold / guarantee";
      questEquivalentPerCompleted = state.eligibleShare *
        state.attainmentProbability *
        state.questBonus /
        Math.max(state.questThreshold, 1);
      guaranteeTopUpPerCompleted = state.eligibleShare *
        Math.max(0, state.guaranteedFloor - basePayout);
      baseEquivalentPerCompleted = questEquivalentPerCompleted + guaranteeTopUpPerCompleted;
    }

    return {
      modelLabel: modelLabel,
      basePayout: basePayout,
      questEquivalentPerCompleted: questEquivalentPerCompleted,
      guaranteeTopUpPerCompleted: guaranteeTopUpPerCompleted,
      baseEquivalentPerCompleted: baseEquivalentPerCompleted,
      dynamicEquivalentPerCompleted: dynamicPerUnitIncentive,
      variableEquivalentPerCompleted: baseEquivalentPerCompleted + dynamicPerUnitIncentive,
      effectivePayoutBoost: baseEquivalentPerCompleted + dynamicPerUnitIncentive,
      hasBaseIncentiveProgram: baseEquivalentPerCompleted > 0,
      hasDynamicIncentive: dynamicPerUnitIncentive > 0,
      hasIncentiveProgram: baseEquivalentPerCompleted + dynamicPerUnitIncentive > 0
    };
  }

  function rawSupplyForPayout(payout, state) {
    return state.baselineSupply *
      Math.pow(Math.max(payout, 0.01) / state.referencePayout, state.supplyElasticity) *
      (1 + state.supplyShock);
  }

  function supplyAtPrice(price, state, options) {
    var incentive = incentiveProfile(price, state, options);
    var payoutWithBaseIncentive = Math.max(incentive.basePayout + incentive.baseEquivalentPerCompleted, 0.01);
    var payout = Math.max(incentive.basePayout + incentive.effectivePayoutBoost, 0.01);
    var rawSupplyWithoutIncentive = rawSupplyForPayout(incentive.basePayout, state);
    var rawSupplyWithBaseIncentive = rawSupplyForPayout(payoutWithBaseIncentive, state);
    var rawSupply = rawSupplyForPayout(payout, state);

    return {
      basePayout: incentive.basePayout,
      payoutWithBaseIncentive: payoutWithBaseIncentive,
      payout: payout,
      incentive: incentive,
      rawSupplyWithoutIncentive: rawSupplyWithoutIncentive,
      effectiveSupplyWithoutIncentive: rawSupplyWithoutIncentive * state.matchingEfficiency,
      rawSupplyWithBaseIncentive: rawSupplyWithBaseIncentive,
      effectiveSupplyWithBaseIncentive: rawSupplyWithBaseIncentive * state.matchingEfficiency,
      rawSupply: rawSupply,
      effectiveSupply: rawSupply * state.matchingEfficiency
    };
  }

  function scenarioAtPrice(price, state, options) {
    var demandNoPromo = demandWithoutPromo(price, state);
    var demand = demandWithPromo(price, state);
    var supply = supplyAtPrice(price, state, options);
    var completedWithoutIncentive = Math.min(demand, supply.effectiveSupplyWithoutIncentive);
    var completedWithBaseIncentive = Math.min(demand, supply.effectiveSupplyWithBaseIncentive);
    var completed = Math.min(demand, supply.effectiveSupply);
    var fillRate = demand > 0 ? clamp(completed / demand, 0, 1) : 0;
    var gap = supply.effectiveSupply - demand;
    var tightness = supply.effectiveSupply > 0 ? demand / supply.effectiveSupply : Infinity;
    var grossPlatformRevenue = price * state.takeRate * completed;
    var incentiveCost = supply.incentive.variableEquivalentPerCompleted * completed;

    return {
      price: price,
      basePayout: supply.basePayout,
      payout: supply.payout,
      incentive: supply.incentive,
      demandNoPromo: demandNoPromo,
      demand: demand,
      promoIncrement: demand - demandNoPromo,
      rawSupplyWithoutIncentive: supply.rawSupplyWithoutIncentive,
      effectiveSupplyWithoutIncentive: supply.effectiveSupplyWithoutIncentive,
      rawSupplyWithBaseIncentive: supply.rawSupplyWithBaseIncentive,
      effectiveSupplyWithBaseIncentive: supply.effectiveSupplyWithBaseIncentive,
      rawSupply: supply.rawSupply,
      effectiveSupply: supply.effectiveSupply,
      incrementalEffectiveSupply: supply.effectiveSupply - supply.effectiveSupplyWithoutIncentive,
      dynamicIncrementalEffectiveSupply: supply.effectiveSupply - supply.effectiveSupplyWithBaseIncentive,
      completedWithoutIncentive: completedWithoutIncentive,
      completedWithBaseIncentive: completedWithBaseIncentive,
      completed: completed,
      fillRate: fillRate,
      gap: gap,
      tightness: tightness,
      grossPlatformRevenue: grossPlatformRevenue,
      baseIncentiveCost: supply.incentive.baseEquivalentPerCompleted * completed,
      dynamicIncentiveCost: supply.incentive.dynamicEquivalentPerCompleted * completed,
      incentiveCost: incentiveCost,
      netPlatformRevenue: grossPlatformRevenue - incentiveCost
    };
  }

  function findEquilibrium(state) {
    var low = Math.max(state.referencePrice * 0.25, 0.01);
    var high = state.referencePrice * 4;
    var lowScenario = scenarioAtPrice(low, state);
    var highScenario = scenarioAtPrice(high, state);
    var lowExcess = lowScenario.demand - lowScenario.effectiveSupply;
    var highExcess = highScenario.demand - highScenario.effectiveSupply;
    var iterations = 0;

    while (lowExcess < 0 && iterations < 20) {
      low = Math.max(low / 1.5, 0.01);
      lowScenario = scenarioAtPrice(low, state);
      lowExcess = lowScenario.demand - lowScenario.effectiveSupply;
      iterations += 1;
    }

    iterations = 0;
    while (highExcess > 0 && iterations < 20) {
      high *= 1.5;
      highScenario = scenarioAtPrice(high, state);
      highExcess = highScenario.demand - highScenario.effectiveSupply;
      iterations += 1;
    }

    if (!(lowExcess >= 0 && highExcess <= 0)) {
      return Math.abs(lowExcess) < Math.abs(highExcess) ? lowScenario : highScenario;
    }

    iterations = 0;
    while (iterations < 60) {
      var mid = (low + high) / 2;
      var midScenario = scenarioAtPrice(mid, state);
      var midExcess = midScenario.demand - midScenario.effectiveSupply;

      if (Math.abs(midExcess) < 1) {
        return midScenario;
      }

      if (midExcess > 0) {
        low = mid;
      } else {
        high = mid;
      }

      iterations += 1;
    }

    return scenarioAtPrice((low + high) / 2, state);
  }

  function buildDynamicStepState(state, stepIndex) {
    var retention = Math.pow(1 - state.dynamicShockDecay, stepIndex);

    return Object.assign({}, state, {
      baselineDemand: state.baselineDemand * (state.dynamicMinutes / 1440),
      baselineSupply: state.baselineSupply * (state.dynamicMinutes / 1440),
      demandShock: state.demandShock * retention,
      supplyShock: state.supplyShock * retention
    });
  }

  function dynamicStepMeetsTarget(step, state) {
    if (state.dynamicPolicy === "targeted") {
      return step.fillRate >= state.dynamicTargetFill && step.bufferShare >= state.dynamicTargetBuffer;
    }

    return step.fillRate >= 0.97 || Math.abs(step.gap) <= 0.02 * Math.max(step.demand, 1);
  }

  function dynamicTopUpPerUnit(multiplier, state) {
    if (state.dynamicPolicy !== "targeted") {
      return 0;
    }

    return clamp(
      state.dynamicLinkedIncentiveRate * Math.max(multiplier - 1, 0),
      0,
      state.dynamicLinkedIncentiveCap
    );
  }

  function simulateDynamicSurge(state) {
    var steps = [];
    var stepZeroState = buildDynamicStepState(state, 0);
    var initialSupply = supplyAtPrice(state.currentPrice, stepZeroState, { dynamicPerUnitIncentive: 0 });
    var realizedRawSupplyNoIncentive = initialSupply.rawSupplyWithoutIncentive;
    var realizedRawSupplyWithBaseIncentive = initialSupply.rawSupplyWithBaseIncentive;
    var realizedRawSupply = initialSupply.rawSupplyWithBaseIncentive;
    var multiplier = 1;
    var cumulativeGrossRevenue = 0;
    var cumulativeIncentiveCost = 0;
    var cumulativeNetRevenue = 0;
    var totalLostDemand = 0;
    var totalFillRate = 0;
    var peakMultiplier = 1;
    var peakPrice = state.currentPrice;
    var peakTightness = 0;
    var peakIncentivePerCompleted = 0;
    var peakDynamicIncentivePerCompleted = 0;
    var peakIncrementalSupply = 0;
    var peakDynamicSupplyUplift = 0;
    var peakStepIndex = 0;
    var rebalanceStep = null;
    var index;

    for (index = 0; index < state.dynamicSteps; index += 1) {
      var stepNumber = index + 1;
      var minute = index * state.dynamicMinutes;
      var stepState = buildDynamicStepState(state, index);
      var price = state.currentPrice * multiplier;
      var dynamicPerUnitIncentive = dynamicTopUpPerUnit(multiplier, state);
      var supply = supplyAtPrice(price, stepState, {
        dynamicPerUnitIncentive: dynamicPerUnitIncentive
      });
      var baseSupply = supplyAtPrice(price, stepState, {
        dynamicPerUnitIncentive: 0
      });
      var demandNoPromo = demandWithoutPromo(price, stepState);
      var demand = demandWithPromo(price, stepState);
      var completed;
      var fillRate;
      var gap;
      var bufferShare;
      var shortageShare;
      var tightness;
      var grossPlatformRevenue;
      var incentiveCost;
      var stepResult;
      var pressure;

      realizedRawSupplyNoIncentive += state.dynamicSupplyLag *
        (supply.rawSupplyWithoutIncentive - realizedRawSupplyNoIncentive);
      realizedRawSupplyWithBaseIncentive += state.dynamicSupplyLag *
        (baseSupply.rawSupplyWithBaseIncentive - realizedRawSupplyWithBaseIncentive);
      realizedRawSupply += state.dynamicSupplyLag *
        (supply.rawSupply - realizedRawSupply);

      completed = Math.min(demand, realizedRawSupply * stepState.matchingEfficiency);
      fillRate = demand > 0 ? clamp(completed / demand, 0, 1) : 0;
      gap = realizedRawSupply * stepState.matchingEfficiency - demand;
      bufferShare = gap / Math.max(demand, 1);
      shortageShare = Math.max(demand - realizedRawSupply * stepState.matchingEfficiency, 0) / Math.max(demand, 1);
      tightness = realizedRawSupply > 0 ? demand / Math.max(realizedRawSupply * stepState.matchingEfficiency, 0.0001) : Infinity;
      grossPlatformRevenue = price * stepState.takeRate * completed;
      incentiveCost = supply.incentive.variableEquivalentPerCompleted * completed;

      stepResult = {
        step: stepNumber,
        minute: minute,
        multiplier: multiplier,
        price: price,
        demandNoPromo: demandNoPromo,
        demand: demand,
        promoIncrement: demand - demandNoPromo,
        basePayout: supply.basePayout,
        payout: supply.payout,
        incentive: supply.incentive,
        effectiveSupplyWithoutIncentive: realizedRawSupplyNoIncentive * stepState.matchingEfficiency,
        effectiveSupplyWithBaseIncentive: realizedRawSupplyWithBaseIncentive * stepState.matchingEfficiency,
        effectiveSupply: realizedRawSupply * stepState.matchingEfficiency,
        incrementalEffectiveSupply: (realizedRawSupply - realizedRawSupplyNoIncentive) * stepState.matchingEfficiency,
        dynamicIncrementalEffectiveSupply: (realizedRawSupply - realizedRawSupplyWithBaseIncentive) * stepState.matchingEfficiency,
        completedWithoutIncentive: Math.min(demand, realizedRawSupplyNoIncentive * stepState.matchingEfficiency),
        completedWithBaseIncentive: Math.min(demand, realizedRawSupplyWithBaseIncentive * stepState.matchingEfficiency),
        completed: completed,
        fillRate: fillRate,
        gap: gap,
        bufferShare: bufferShare,
        shortageShare: shortageShare,
        tightness: tightness,
        grossPlatformRevenue: grossPlatformRevenue,
        baseIncentiveCost: supply.incentive.baseEquivalentPerCompleted * completed,
        dynamicIncentiveCost: supply.incentive.dynamicEquivalentPerCompleted * completed,
        incentiveCost: incentiveCost,
        netPlatformRevenue: grossPlatformRevenue - incentiveCost,
        demandShock: stepState.demandShock,
        supplyShock: stepState.supplyShock
      };

      if (stepResult.multiplier > peakMultiplier) {
        peakMultiplier = stepResult.multiplier;
        peakPrice = stepResult.price;
        peakStepIndex = index;
      }

      peakTightness = Math.max(peakTightness, stepResult.tightness);
      peakIncentivePerCompleted = Math.max(
        peakIncentivePerCompleted,
        stepResult.incentive.variableEquivalentPerCompleted
      );
      peakDynamicIncentivePerCompleted = Math.max(
        peakDynamicIncentivePerCompleted,
        stepResult.incentive.dynamicEquivalentPerCompleted
      );
      peakIncrementalSupply = Math.max(
        peakIncrementalSupply,
        stepResult.incrementalEffectiveSupply
      );
      peakDynamicSupplyUplift = Math.max(
        peakDynamicSupplyUplift,
        stepResult.dynamicIncrementalEffectiveSupply
      );
      cumulativeGrossRevenue += stepResult.grossPlatformRevenue;
      cumulativeIncentiveCost += stepResult.incentiveCost;
      cumulativeNetRevenue += stepResult.netPlatformRevenue;
      totalLostDemand += Math.max(stepResult.demand - stepResult.completed, 0);
      totalFillRate += stepResult.fillRate;

      if (rebalanceStep === null && dynamicStepMeetsTarget(stepResult, state)) {
        rebalanceStep = stepNumber;
      }

      steps.push(stepResult);

      if (state.dynamicPolicy === "targeted") {
        pressure = 0.7 * (state.dynamicTargetFill - stepResult.fillRate) +
          0.3 * (state.dynamicTargetBuffer - stepResult.bufferShare);
      } else {
        pressure = (stepResult.demand - stepResult.effectiveSupply) / Math.max(stepResult.demand, 1);
      }

      multiplier = clamp(
        multiplier * (1 + state.dynamicAggressiveness * pressure),
        1,
        state.dynamicCap
      );
    }

    steps.forEach(function (step, stepIndex) {
      step.isPeak = stepIndex === peakStepIndex;
      step.isFinal = stepIndex === steps.length - 1;
      step.isRecovered = rebalanceStep !== null && step.step === rebalanceStep;
    });

    return {
      steps: steps,
      peakMultiplier: peakMultiplier,
      peakPrice: peakPrice,
      peakTightness: peakTightness,
      peakIncentivePerCompleted: peakIncentivePerCompleted,
      peakDynamicIncentivePerCompleted: peakDynamicIncentivePerCompleted,
      peakIncrementalSupply: peakIncrementalSupply,
      peakDynamicSupplyUplift: peakDynamicSupplyUplift,
      cumulativeGrossRevenue: cumulativeGrossRevenue,
      cumulativeIncentiveCost: cumulativeIncentiveCost,
      cumulativeNetRevenue: cumulativeNetRevenue,
      totalLostDemand: totalLostDemand,
      averageFillRate: steps.length > 0 ? totalFillRate / steps.length : 0,
      rebalanceStep: rebalanceStep,
      peakStep: steps[peakStepIndex] || null,
      finalStep: steps[steps.length - 1] || null,
      horizonMinutes: state.dynamicSteps * state.dynamicMinutes,
      hasDynamicTopUp: state.dynamicPolicy === "targeted" && state.dynamicLinkedIncentiveRate > 0
    };
  }

  function buildSeriesPath(points, xScale, yScale) {
    return points.map(function (point, index) {
      var prefix = index === 0 ? "M" : "L";
      return prefix + xScale(point.x).toFixed(2) + " " + yScale(point.y).toFixed(2);
    }).join(" ");
  }

  function uniqueTicks(values) {
    return values.filter(function (value, index, all) {
      return all.findIndex(function (candidate) {
        return Math.abs(candidate - value) < 0.001;
      }) === index;
    });
  }

  function buildChartMarkup(options) {
    var width = 520;
    var height = 280;
    var padding = { top: 18, right: 16, bottom: 38, left: 58 };
    var plotWidth = width - padding.left - padding.right;
    var plotHeight = height - padding.top - padding.bottom;
    var maxY = options.maxY > 0 ? options.maxY : 1;
    var minX = options.minX;
    var maxX = options.maxX;
    var xScale = function (value) {
      return padding.left + ((value - minX) / Math.max(maxX - minX, 0.0001)) * plotWidth;
    };
    var yScale = function (value) {
      return padding.top + plotHeight - (value / maxY) * plotHeight;
    };
    var yTicks = options.yTicks || [0, maxY / 3, (2 * maxY) / 3, maxY];
    var xTicks = options.xTicks || [minX, (minX + maxX) / 2, maxX];
    var formatXTick = options.formatXTick || function (value) {
      return formatCurrency(value, 0);
    };
    var formatYTick = options.formatYTick || function (value) {
      return formatCount(value);
    };
    var grid = yTicks.map(function (tick) {
      var y = yScale(tick).toFixed(2);

      return "<line x1=\"" + padding.left + "\" y1=\"" + y + "\" x2=\"" + (width - padding.right) + "\" y2=\"" + y + "\" class=\"marketplace-pricing-tool__chart-grid\"></line>" +
        "<text x=\"" + (padding.left - 10) + "\" y=\"" + (Number(y) + 4) + "\" class=\"marketplace-pricing-tool__axis-label marketplace-pricing-tool__axis-label--y\">" + formatYTick(tick) + "</text>";
    }).join("");
    var xAxisLabels = uniqueTicks(xTicks).map(function (tick) {
      var x = xScale(tick).toFixed(2);

      return "<text x=\"" + x + "\" y=\"" + (height - 10) + "\" class=\"marketplace-pricing-tool__axis-label marketplace-pricing-tool__axis-label--x\">" + formatXTick(tick) + "</text>";
    }).join("");
    var paths = (options.series || []).map(function (series) {
      var dasharray = series.dasharray ? " stroke-dasharray=\"" + series.dasharray + "\"" : "";
      var opacity = typeof series.opacity === "number" ? " opacity=\"" + series.opacity + "\"" : "";
      var strokeWidth = series.strokeWidth || 3;

      return "<path d=\"" + buildSeriesPath(series.points, xScale, yScale) + "\" fill=\"none\" stroke=\"" + series.color + "\" stroke-width=\"" + strokeWidth + "\" stroke-linecap=\"round\" stroke-linejoin=\"round\"" + dasharray + opacity + "></path>";
    }).join("");
    var markers = (options.markers || []).map(function (marker) {
      var x = xScale(marker.x);
      var y = yScale(marker.y);
      var labelY = y + (marker.dy || -12);

      return "<circle cx=\"" + x.toFixed(2) + "\" cy=\"" + y.toFixed(2) + "\" r=\"4.75\" fill=\"" + marker.color + "\"></circle>" +
        "<text x=\"" + x.toFixed(2) + "\" y=\"" + labelY.toFixed(2) + "\" class=\"marketplace-pricing-tool__marker-label\">" + marker.label + "</text>";
    }).join("");
    var verticalLines = (options.verticalLines || []).map(function (line) {
      var x = xScale(line.x).toFixed(2);

      return "<line x1=\"" + x + "\" y1=\"" + padding.top + "\" x2=\"" + x + "\" y2=\"" + (height - padding.bottom) + "\" class=\"marketplace-pricing-tool__chart-marker-line\"></line>" +
        "<text x=\"" + x + "\" y=\"" + (padding.top + 12) + "\" class=\"marketplace-pricing-tool__marker-label\">" + line.label + "</text>";
    }).join("");
    var legend = (options.legend || []).map(function (item) {
      return "<span class=\"marketplace-pricing-tool__legend-item\"><span class=\"marketplace-pricing-tool__legend-dot\" style=\"background:" + item.color + "\"></span>" + item.label + "</span>";
    }).join("");

    return "<svg class=\"marketplace-pricing-tool__chart-svg\" viewBox=\"0 0 " + width + " " + height + "\" role=\"img\" aria-label=\"" + options.ariaLabel + "\">" +
      "<line x1=\"" + padding.left + "\" y1=\"" + (height - padding.bottom) + "\" x2=\"" + (width - padding.right) + "\" y2=\"" + (height - padding.bottom) + "\" class=\"marketplace-pricing-tool__chart-axis\"></line>" +
      "<line x1=\"" + padding.left + "\" y1=\"" + padding.top + "\" x2=\"" + padding.left + "\" y2=\"" + (height - padding.bottom) + "\" class=\"marketplace-pricing-tool__chart-axis\"></line>" +
      grid +
      verticalLines +
      paths +
      markers +
      xAxisLabels +
      "</svg>" +
      "<div class=\"marketplace-pricing-tool__legend\">" + legend + "</div>";
  }

  function buildTimeTicks(steps) {
    return uniqueTicks([
      1,
      Math.max(1, Math.round((steps + 1) / 2)),
      Math.max(1, steps)
    ]);
  }

  function renderDemandChart(state, currentScenario, equilibriumScenario, preset) {
    var minPrice = Math.max(Math.min(state.referencePrice, state.currentPrice, equilibriumScenario.price) * 0.65, 0.01);
    var maxPrice = Math.max(state.referencePrice, state.currentPrice, equilibriumScenario.price) * 1.45;
    var samples = [];
    var maxY = 0;
    var index;

    for (index = 0; index < 28; index += 1) {
      var price = minPrice + ((maxPrice - minPrice) * index) / 27;
      var demand = demandWithPromo(price, state);
      samples.push({ x: price, y: demand });
      maxY = Math.max(maxY, demand);
    }

    outputs.demandChart.innerHTML = buildChartMarkup({
      minX: minPrice,
      maxX: maxPrice,
      maxY: maxY * 1.08,
      series: [{
        color: "#0f766e",
        points: samples
      }],
      markers: [
        {
          x: state.currentPrice,
          y: currentScenario.demand,
          color: "#0f766e",
          label: "Current",
          dy: -12
        },
        {
          x: equilibriumScenario.price,
          y: equilibriumScenario.demand,
          color: "#1d4ed8",
          label: "Equilibrium",
          dy: 18
        }
      ],
      legend: [
        { color: "#0f766e", label: "Demand with current promotion assumptions" },
        { color: "#1d4ed8", label: preset.example + " market-clearing point" }
      ],
      ariaLabel: "Demand curve for the selected marketplace scenario"
    });
  }

  function renderEquilibriumChart(state, currentScenario, equilibriumScenario, preset) {
    var minPrice = Math.max(Math.min(state.referencePrice, state.currentPrice, equilibriumScenario.price) * 0.65, 0.01);
    var maxPrice = Math.max(state.referencePrice, state.currentPrice, equilibriumScenario.price) * 1.45;
    var demandSeries = [];
    var supplySeries = [];
    var baseSupplySeries = [];
    var maxY = 0;
    var hasActiveIncentiveProgram = state.incentiveMode !== "none";
    var index;

    for (index = 0; index < 28; index += 1) {
      var price = minPrice + ((maxPrice - minPrice) * index) / 27;
      var scenario = scenarioAtPrice(price, state);
      demandSeries.push({ x: price, y: scenario.demand });
      supplySeries.push({ x: price, y: scenario.effectiveSupply });
      maxY = Math.max(maxY, scenario.demand, scenario.effectiveSupply);

      if (hasActiveIncentiveProgram) {
        baseSupplySeries.push({ x: price, y: scenario.effectiveSupplyWithoutIncentive });
        maxY = Math.max(maxY, scenario.effectiveSupplyWithoutIncentive);
      }
    }

    outputs.equilibriumChart.innerHTML = buildChartMarkup({
      minX: minPrice,
      maxX: maxPrice,
      maxY: maxY * 1.08,
      series: [
        {
          color: "#0f766e",
          points: demandSeries
        },
        hasActiveIncentiveProgram
          ? {
            color: "#9a3412",
            points: baseSupplySeries,
            dasharray: "7 6",
            opacity: 0.75
          }
          : null,
        {
          color: "#d97706",
          points: supplySeries
        }
      ].filter(Boolean),
      markers: [
        {
          x: equilibriumScenario.price,
          y: equilibriumScenario.demand,
          color: "#1d4ed8",
          label: "Equilibrium",
          dy: -14
        },
        {
          x: state.currentPrice,
          y: currentScenario.demand,
          color: "#0f766e",
          label: "Current demand",
          dy: -12
        },
        {
          x: state.currentPrice,
          y: currentScenario.effectiveSupply,
          color: "#d97706",
          label: "Current supply",
          dy: 18
        }
      ],
      verticalLines: [
        {
          x: state.currentPrice,
          label: "Current price"
        }
      ],
      legend: [
        { color: "#0f766e", label: "Demand" },
        hasActiveIncentiveProgram
          ? { color: "#9a3412", label: "Supply without incentives" }
          : null,
        { color: "#d97706", label: "Effective supply after matching frictions and incentives" },
        { color: "#1d4ed8", label: preset.dynamicPricing + " clearing point" }
      ].filter(Boolean),
      ariaLabel: "Supply and demand equilibrium chart for the selected marketplace scenario"
    });
  }

  function renderDynamicSurgeChart(simulation, state) {
    var points = simulation.steps.map(function (step) {
      return { x: step.step, y: step.multiplier };
    });
    var capLine = simulation.steps.map(function (step) {
      return { x: step.step, y: state.dynamicCap };
    });
    var peak = simulation.peakStep || simulation.finalStep;
    var finalStep = simulation.finalStep;

    outputs.demandChart.innerHTML = buildChartMarkup({
      minX: 1,
      maxX: Math.max(simulation.steps.length, 2),
      maxY: Math.max(state.dynamicCap, simulation.peakMultiplier) * 1.08,
      xTicks: buildTimeTicks(simulation.steps.length),
      formatXTick: function (value) {
        return formatMinutes((value - 1) * state.dynamicMinutes);
      },
      formatYTick: function (value) {
        return formatRatio(value);
      },
      series: [
        {
          color: "#1d4ed8",
          points: points
        },
        {
          color: "#94a3b8",
          points: capLine,
          dasharray: "7 6",
          opacity: 0.85
        }
      ],
      markers: [
        peak
          ? {
            x: peak.step,
            y: peak.multiplier,
            color: "#1d4ed8",
            label: "Peak",
            dy: -12
          }
          : null,
        finalStep
          ? {
            x: finalStep.step,
            y: finalStep.multiplier,
            color: "#0f766e",
            label: "End",
            dy: 18
          }
          : null
      ].filter(Boolean),
      legend: [
        { color: "#1d4ed8", label: "Surge multiplier" },
        { color: "#94a3b8", label: "Policy cap" }
      ],
      ariaLabel: "Dynamic surge multiplier chart"
    });
  }

  function renderDynamicBalanceChart(simulation, state) {
    var demandSeries = [];
    var supplySeries = [];
    var baseSupplySeries = [];
    var maxY = 0;

    simulation.steps.forEach(function (step) {
      demandSeries.push({ x: step.step, y: step.demand });
      supplySeries.push({ x: step.step, y: step.effectiveSupply });
      maxY = Math.max(maxY, step.demand, step.effectiveSupply);

      if (simulation.hasDynamicTopUp) {
        baseSupplySeries.push({ x: step.step, y: step.effectiveSupplyWithBaseIncentive });
        maxY = Math.max(maxY, step.effectiveSupplyWithBaseIncentive);
      }
    });

    outputs.equilibriumChart.innerHTML = buildChartMarkup({
      minX: 1,
      maxX: Math.max(simulation.steps.length, 2),
      maxY: maxY * 1.08,
      xTicks: buildTimeTicks(simulation.steps.length),
      formatXTick: function (value) {
        return formatMinutes((value - 1) * state.dynamicMinutes);
      },
      formatYTick: function (value) {
        return formatCount(value);
      },
      series: [
        {
          color: "#0f766e",
          points: demandSeries
        },
        simulation.hasDynamicTopUp
          ? {
            color: "#9a3412",
            points: baseSupplySeries,
            dasharray: "7 6",
            opacity: 0.75
          }
          : null,
        {
          color: "#d97706",
          points: supplySeries
        }
      ].filter(Boolean),
      markers: simulation.finalStep
        ? [
          {
            x: simulation.finalStep.step,
            y: simulation.finalStep.demand,
            color: "#0f766e",
            label: "Final demand",
            dy: -12
          },
          {
            x: simulation.finalStep.step,
            y: simulation.finalStep.effectiveSupply,
            color: "#d97706",
            label: "Final supply",
            dy: 18
          }
        ]
        : [],
      legend: [
        { color: "#0f766e", label: "Demand per interval" },
        simulation.hasDynamicTopUp
          ? { color: "#9a3412", label: "Supply without surge-linked top-up" }
          : null,
        { color: "#d97706", label: "Effective supply after matching and incentives" }
      ].filter(Boolean),
      ariaLabel: "Dynamic demand and supply balance chart"
    });
  }

  function renderDynamicServiceChart(simulation, state) {
    var fillSeries = [];
    var shortageSeries = [];
    var targetSeries = [];
    var maxY = 1;

    simulation.steps.forEach(function (step) {
      fillSeries.push({ x: step.step, y: step.fillRate });
      shortageSeries.push({ x: step.step, y: step.shortageShare });
      maxY = Math.max(maxY, step.fillRate, step.shortageShare);

      if (state.dynamicPolicy === "targeted") {
        targetSeries.push({ x: step.step, y: state.dynamicTargetFill });
        maxY = Math.max(maxY, state.dynamicTargetFill);
      }
    });

    outputs.tertiaryChart.innerHTML = buildChartMarkup({
      minX: 1,
      maxX: Math.max(simulation.steps.length, 2),
      maxY: Math.max(maxY * 1.05, 1),
      xTicks: buildTimeTicks(simulation.steps.length),
      formatXTick: function (value) {
        return formatMinutes((value - 1) * state.dynamicMinutes);
      },
      formatYTick: function (value) {
        return formatPercent(value, 0);
      },
      series: [
        {
          color: "#0f766e",
          points: fillSeries
        },
        {
          color: "#d97706",
          points: shortageSeries,
          dasharray: "7 6"
        },
        state.dynamicPolicy === "targeted"
          ? {
            color: "#1d4ed8",
            points: targetSeries,
            dasharray: "4 5",
            opacity: 0.8
          }
          : null
      ].filter(Boolean),
      markers: simulation.rebalanceStep !== null
        ? [{
          x: simulation.rebalanceStep,
          y: simulation.steps[simulation.rebalanceStep - 1].fillRate,
          color: "#1d4ed8",
          label: "Recovered",
          dy: -12
        }]
        : [],
      legend: [
        { color: "#0f766e", label: "Fill rate" },
        { color: "#d97706", label: "Shortage share" },
        state.dynamicPolicy === "targeted"
          ? { color: "#1d4ed8", label: "Target fill rate" }
          : null
      ].filter(Boolean),
      ariaLabel: "Dynamic service quality chart"
    });
  }

  function buildEquilibriumRows(state, equilibriumScenario) {
    var priceCandidates = [
      state.currentPrice * 0.8,
      state.currentPrice * 0.9,
      state.currentPrice,
      state.currentPrice * 1.1,
      state.currentPrice * 1.25,
      equilibriumScenario.price
    ];
    var uniquePrices = [];

    priceCandidates.forEach(function (price) {
      var rounded = Math.max(Math.round(price * 100) / 100, 0.01);
      var exists = uniquePrices.some(function (stored) {
        return Math.abs(stored - rounded) < 0.01;
      });

      if (!exists) {
        uniquePrices.push(rounded);
      }
    });

    uniquePrices.sort(function (left, right) {
      return left - right;
    });

    outputs.ladderBody.innerHTML = uniquePrices.map(function (price) {
      var scenario = scenarioAtPrice(price, state);
      var isCurrent = Math.abs(price - state.currentPrice) < 0.011;
      var isEquilibrium = Math.abs(price - equilibriumScenario.price) < 0.051;
      var imbalance = scenario.gap >= 0
        ? formatCount(scenario.gap) + " surplus"
        : formatCount(Math.abs(scenario.gap)) + " short";
      var rowClass = isEquilibrium ? " class=\"marketplace-pricing-tool__table-row--highlight\"" : "";
      var priceBadges = "";

      if (isCurrent) {
        priceBadges += " <span class=\"marketplace-pricing-tool__table-badge\">current</span>";
      }

      if (isEquilibrium) {
        priceBadges += " <span class=\"marketplace-pricing-tool__table-badge marketplace-pricing-tool__table-badge--accent\">eq</span>";
      }

      return "<tr" + rowClass + ">" +
        "<td>" + formatCurrency(price, 2) + priceBadges + "</td>" +
        "<td>" + formatCount(scenario.demand) + "</td>" +
        "<td>" + formatCount(scenario.effectiveSupply) + "</td>" +
        "<td>" + imbalance + "</td>" +
        "<td>" + formatCount(scenario.completed) + "</td>" +
        "<td>" + formatCurrency(scenario.netPlatformRevenue, 0) + "</td>" +
        "</tr>";
    }).join("");
  }

  function buildDynamicRows(simulation) {
    outputs.ladderBody.innerHTML = simulation.steps.map(function (step) {
      var badges = "";
      var rowClass = step.isPeak ? " class=\"marketplace-pricing-tool__table-row--highlight\"" : "";

      if (step.step === 1) {
        badges += " <span class=\"marketplace-pricing-tool__table-badge\">start</span>";
      }

      if (step.isPeak) {
        badges += " <span class=\"marketplace-pricing-tool__table-badge marketplace-pricing-tool__table-badge--accent\">peak</span>";
      }

      if (step.isRecovered) {
        badges += " <span class=\"marketplace-pricing-tool__table-badge\">recovered</span>";
      }

      if (step.isFinal) {
        badges += " <span class=\"marketplace-pricing-tool__table-badge\">final</span>";
      }

      return "<tr" + rowClass + ">" +
        "<td>T" + step.step + badges + "</td>" +
        "<td>" + formatMinutes(step.minute) + "</td>" +
        "<td>" + formatRatio(step.multiplier) + "</td>" +
        "<td>" + formatCurrency(step.price, 2) + "</td>" +
        "<td>" + formatCount(step.demand) + "</td>" +
        "<td>" + formatCount(step.effectiveSupply) + "</td>" +
        "<td>" + formatPercent(step.fillRate, 1) + "</td>" +
        "<td>" + formatCurrencyRate(step.incentive.variableEquivalentPerCompleted) + "</td>" +
        "<td>" + formatCurrency(step.netPlatformRevenue, 0) + "</td>" +
        "</tr>";
    }).join("");
  }

  function describeMarketState(currentScenario) {
    if (currentScenario.fillRate < 0.9 || currentScenario.gap < -0.05 * currentScenario.demand) {
      return "Demand-heavy";
    }

    if (currentScenario.gap > 0.08 * currentScenario.demand) {
      return "Supply-heavy";
    }

    return "Near balance";
  }

  function incentiveSummaryText(scenario) {
    var dynamicText = scenario.incentive.dynamicEquivalentPerCompleted > 0
      ? " An extra surge-linked top-up adds " + formatCurrencyRate(scenario.incentive.dynamicEquivalentPerCompleted) + " on top of the base supplier program."
      : "";

    if (scenario.incentive.modelLabel === "No explicit incentive") {
      return "No explicit supplier incentive is active, so supply only moves through the base payout and the supply shock." + dynamicText;
    }

    if (scenario.incentive.modelLabel === "Per-unit incentive") {
      return "A direct " + formatCurrencyRate(scenario.incentive.baseEquivalentPerCompleted) + " incentive is layered on top of base payout, shifting effective supply by about " + formatSignedCount(scenario.incrementalEffectiveSupply) + " units at the current price." + dynamicText;
    }

    return "The threshold / guarantee program is converted into an expected " + formatCurrencyRate(scenario.incentive.baseEquivalentPerCompleted) + " incentive at the current price, made up of " + formatCurrencyRate(scenario.incentive.questEquivalentPerCompleted) + " from the quest and " + formatCurrencyRate(scenario.incentive.guaranteeTopUpPerCompleted) + " from the guarantee top-up." + dynamicText;
  }

  function renderEquilibriumSummary(state, currentScenario, equilibriumScenario, preset) {
    var gapText = currentScenario.gap >= 0
      ? formatCount(currentScenario.gap) + " units of spare " + preset.supplySide
      : formatCount(Math.abs(currentScenario.gap)) + " units of unmet " + preset.demandSide;
    var promoText = state.promoDepth > 0
      ? "A " + formatPercent(state.promoDepth, 0) + " promotion adds about " + formatCount(currentScenario.promoIncrement) + " incremental " + preset.unitPlural + " per day on top of the base price response."
      : "No active promotion is applied, so all demand movement comes from price elasticity and the external demand shock.";
    var multiplier = equilibriumScenario.price / state.currentPrice;
    var directionText = multiplier >= 1 ? "raise" : "lower";
    var grossNetSpread = equilibriumScenario.grossPlatformRevenue - equilibriumScenario.netPlatformRevenue;

    outputs.summary.innerHTML =
      "<div class=\"marketplace-pricing-tool__insight-grid\">" +
      "<article class=\"marketplace-pricing-tool__insight\">" +
      "<span class=\"marketplace-pricing-tool__insight-label\">Pricing read</span>" +
      "<p>At " + formatCurrency(state.currentPrice, 2) + ", " + preset.example + "-style demand is " + formatCount(currentScenario.demand) + " " + preset.unitPlural + " per day versus " + formatCount(currentScenario.effectiveSupply) + " of effective " + preset.supplySide + ". That leaves " + gapText + " and a fill rate of " + formatPercent(currentScenario.fillRate, 1) + ".</p>" +
      "</article>" +
      "<article class=\"marketplace-pricing-tool__insight\">" +
      "<span class=\"marketplace-pricing-tool__insight-label\">Promotion read</span>" +
      "<p>" + promoText + " If that seems too large, reduce the promotion halo before changing the core price elasticity estimate.</p>" +
      "</article>" +
      "<article class=\"marketplace-pricing-tool__insight\">" +
      "<span class=\"marketplace-pricing-tool__insight-label\">Incentive read</span>" +
      "<p>" + incentiveSummaryText(currentScenario) + " On the modeled completed volume, that incentive profile costs about " + formatCurrency(currentScenario.incentiveCost, 0) + " at the current price.</p>" +
      "</article>" +
      "<article class=\"marketplace-pricing-tool__insight\">" +
      "<span class=\"marketplace-pricing-tool__insight-label\">Marketplace mechanism</span>" +
      "<p>To clear the market, the model would " + directionText + " price to about " + formatCurrency(equilibriumScenario.price, 2) + " (" + formatRatio(multiplier) + " of the current price). Supplier payout would settle near " + formatCurrency(equilibriumScenario.payout, 2) + ", gross platform revenue would be " + formatCurrency(equilibriumScenario.grossPlatformRevenue, 0) + ", and incentive spend would absorb " + formatCurrency(grossNetSpread, 0) + ", leaving net platform revenue near " + formatCurrency(equilibriumScenario.netPlatformRevenue, 0) + ". " + preset.notes + "</p>" +
      "</article>" +
      "</div>";
  }

  function renderDynamicSummary(state, simulation, preset) {
    var firstStep = simulation.steps[0];
    var finalStep = simulation.finalStep;
    var peakStep = simulation.peakStep || finalStep;
    var initialGapText = firstStep.gap >= 0
      ? formatCount(firstStep.gap) + " units of spare " + preset.supplySide
      : formatCount(Math.abs(firstStep.gap)) + " units of unmet " + preset.demandSide;
    var rebalanceText = simulation.rebalanceStep !== null
      ? "The controller gets back to its service target after about " + formatMinutes((simulation.rebalanceStep - 1) * state.dynamicMinutes) + "."
      : "The modeled horizon ends before the market fully gets back to the controller's service target.";
    var policyText = state.dynamicPolicy === "targeted"
      ? "The fill-rate-targeted controller prices toward a " + formatPercent(state.dynamicTargetFill, 0) + " fill target while trying to keep about " + formatPercent(state.dynamicTargetBuffer, 0) + " spare effective supply."
      : "The simple controller only reacts to excess demand, so it is best read as a lightweight surge benchmark rather than a full operating policy.";
    var dynamicIncentiveText = simulation.hasDynamicTopUp
      ? "The surge-linked top-up peaks at " + formatCurrencyRate(simulation.peakDynamicIncentivePerCompleted) + " and lifts supply by as much as " + formatSignedCount(simulation.peakDynamicSupplyUplift) + " units relative to the base supplier program."
      : "No extra surge-linked top-up is active, so suppliers only respond through the base incentive program and the price path.";

    outputs.summary.innerHTML =
      "<div class=\"marketplace-pricing-tool__insight-grid\">" +
      "<article class=\"marketplace-pricing-tool__insight\">" +
      "<span class=\"marketplace-pricing-tool__insight-label\">Surge read</span>" +
      "<p>Starting from the base price, the controller reaches a peak of " + formatRatio(simulation.peakMultiplier) + " (" + formatCurrency(simulation.peakPrice, 2) + ") around " + formatMinutes(peakStep.minute) + " and ends near " + formatRatio(finalStep.multiplier) + " after " + formatMinutes(simulation.horizonMinutes - state.dynamicMinutes) + " of simulated time.</p>" +
      "</article>" +
      "<article class=\"marketplace-pricing-tool__insight\">" +
      "<span class=\"marketplace-pricing-tool__insight-label\">Supply response</span>" +
      "<p>Step 1 starts with " + initialGapText + " and a fill rate of " + formatPercent(firstStep.fillRate, 1) + ". Average fill rate across the run is " + formatPercent(simulation.averageFillRate, 1) + ". " + rebalanceText + "</p>" +
      "</article>" +
      "<article class=\"marketplace-pricing-tool__insight\">" +
      "<span class=\"marketplace-pricing-tool__insight-label\">Incentive read</span>" +
      "<p>" + dynamicIncentiveText + " Total incentive spend across the modeled horizon is about " + formatCurrency(simulation.cumulativeIncentiveCost, 0) + ".</p>" +
      "</article>" +
      "<article class=\"marketplace-pricing-tool__insight\">" +
      "<span class=\"marketplace-pricing-tool__insight-label\">Marketplace mechanism</span>" +
      "<p>" + policyText + " Across the whole run, the platform gives up about " + formatCount(simulation.totalLostDemand) + " " + preset.unitPlural + ", earns " + formatCurrency(simulation.cumulativeGrossRevenue, 0) + " gross revenue, and keeps about " + formatCurrency(simulation.cumulativeNetRevenue, 0) + " net of incentives. " + preset.notes + "</p>" +
      "</article>" +
      "</div>";
  }

  function renderEquilibriumMode(state, preset) {
    var currentScenario = scenarioAtPrice(state.currentPrice, state);
    var equilibriumScenario = findEquilibrium(state);
    var promoLiftShare = currentScenario.demand > 0 ? currentScenario.promoIncrement / currentScenario.demand : 0;

    setMetricLabels("equilibrium");
    setChartCopy("equilibrium", preset);
    setTableHead("equilibrium");

    outputs.demand.textContent = formatCount(currentScenario.demand);
    outputs.promo.textContent = formatSignedCount(currentScenario.promoIncrement) + " (" + formatSignedPercent(promoLiftShare, 1) + ")";
    outputs.elasticity.textContent = "-" + state.priceElasticity.toFixed(2);
    outputs.fill.textContent = formatPercent(currentScenario.fillRate, 1);
    outputs.gap.textContent = currentScenario.gap >= 0
      ? "+" + formatCount(currentScenario.gap) + " surplus"
      : "-" + formatCount(Math.abs(currentScenario.gap)) + " shortage";
    outputs.tightness.textContent = formatRatio(currentScenario.tightness);
    outputs.equilibriumPrice.textContent = formatCurrency(equilibriumScenario.price, 2);
    outputs.equilibriumVolume.textContent = formatCount(equilibriumScenario.completed);
    outputs.surge.textContent = formatRatio(equilibriumScenario.price / state.currentPrice);
    outputs.revenue.textContent = formatCurrency(equilibriumScenario.grossPlatformRevenue, 0);
    outputs.payout.textContent = formatCurrency(equilibriumScenario.payout, 2);
    outputs.incentiveRate.textContent = formatCurrencyRate(equilibriumScenario.incentive.variableEquivalentPerCompleted);
    outputs.incentiveCost.textContent = formatCurrency(equilibriumScenario.incentiveCost, 0);
    outputs.netRevenue.textContent = formatCurrency(equilibriumScenario.netPlatformRevenue, 0);
    outputs.incrementalSupply.textContent = formatSignedCount(equilibriumScenario.incrementalEffectiveSupply);
    outputs.marketState.textContent = describeMarketState(currentScenario);

    renderEquilibriumSummary(state, currentScenario, equilibriumScenario, preset);
    renderDemandChart(state, currentScenario, equilibriumScenario, preset);
    renderEquilibriumChart(state, currentScenario, equilibriumScenario, preset);
    buildEquilibriumRows(state, equilibriumScenario);
  }

  function renderDynamicMode(state, preset) {
    var simulation = simulateDynamicSurge(state);
    var firstStep = simulation.steps[0];
    var finalStep = simulation.finalStep;
    var promoLiftShare = firstStep.demand > 0 ? firstStep.promoIncrement / firstStep.demand : 0;

    setMetricLabels("dynamic");
    setChartCopy("dynamic", preset);
    setTableHead("dynamic");

    outputs.demand.textContent = formatCount(firstStep.demand);
    outputs.promo.textContent = formatSignedCount(firstStep.promoIncrement) + " (" + formatSignedPercent(promoLiftShare, 1) + ")";
    outputs.elasticity.textContent = "-" + state.priceElasticity.toFixed(2);
    outputs.fill.textContent = formatPercent(firstStep.fillRate, 1);
    outputs.gap.textContent = firstStep.gap >= 0
      ? "+" + formatCount(firstStep.gap) + " surplus"
      : "-" + formatCount(Math.abs(firstStep.gap)) + " shortage";
    outputs.tightness.textContent = formatRatio(simulation.peakTightness);
    outputs.equilibriumPrice.textContent = formatCurrency(simulation.peakPrice, 2);
    outputs.equilibriumVolume.textContent = formatCount(finalStep.completed);
    outputs.surge.textContent = formatRatio(simulation.peakMultiplier);
    outputs.revenue.textContent = formatCurrency(simulation.cumulativeGrossRevenue, 0);
    outputs.payout.textContent = formatCurrency(finalStep.payout, 2);
    outputs.incentiveRate.textContent = formatCurrencyRate(simulation.peakIncentivePerCompleted);
    outputs.incentiveCost.textContent = formatCurrency(simulation.cumulativeIncentiveCost, 0);
    outputs.netRevenue.textContent = formatCurrency(simulation.cumulativeNetRevenue, 0);
    outputs.incrementalSupply.textContent = formatSignedCount(simulation.peakIncrementalSupply);
    outputs.marketState.textContent = describeMarketState(finalStep);

    renderDynamicSummary(state, simulation, preset);
    renderDynamicSurgeChart(simulation, state);
    renderDynamicBalanceChart(simulation, state);
    renderDynamicServiceChart(simulation, state);
    buildDynamicRows(simulation);
  }

  function serializeState() {
    var params = new URLSearchParams();

    Object.keys(shareKeys).forEach(function (name) {
      params.set(shareKeys[name], fields[name].value);
    });

    return window.location.origin + window.location.pathname + "?" + params.toString();
  }

  function copyText(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      return navigator.clipboard.writeText(text);
    }

    return new Promise(function (resolve, reject) {
      var textarea = document.createElement("textarea");
      textarea.value = text;
      textarea.setAttribute("readonly", "readonly");
      textarea.style.position = "absolute";
      textarea.style.left = "-9999px";
      document.body.appendChild(textarea);
      textarea.select();

      try {
        document.execCommand("copy");
        document.body.removeChild(textarea);
        resolve();
      } catch (error) {
        document.body.removeChild(textarea);
        reject(error);
      }
    });
  }

  function restoreFromQuery() {
    var params = new URLSearchParams(window.location.search);
    var presetKey = params.get(shareKeys.marketplace);

    if (presetKey && presetKey in presets) {
      applyPreset(presetKey);
    } else {
      applyPreset(fields.marketplace.value || "ride");
    }

    Object.keys(shareKeys).forEach(function (name) {
      var param = params.get(shareKeys[name]);

      if (param !== null && param !== "") {
        fields[name].value = param;
      }
    });

    syncControlVisibility();
  }

  function update() {
    clearError();
    outputs.shareStatus.textContent = "";
    syncControlVisibility();

    var state = readState();
    var preset;

    if (!state) {
      clearRenderedOutputs();
      showError("Enter valid positive inputs for price, demand, supply, elasticities, and dynamic controls. Shocks must stay above -100%, and incentive settings must be nonnegative.");
      return;
    }

    preset = getPreset(state.marketplace);

    if (state.simulationMode === "dynamic") {
      renderDynamicMode(state, preset);
      return;
    }

    renderEquilibriumMode(state, preset);
  }

  fields.marketplace.addEventListener("change", function () {
    applyPreset(fields.marketplace.value);
    update();
  });

  fields.simulationMode.addEventListener("change", function () {
    syncControlVisibility();
    update();
  });

  fields.incentiveMode.addEventListener("change", function () {
    syncControlVisibility();
    update();
  });

  fields.dynamicPolicy.addEventListener("change", function () {
    syncControlVisibility();
    update();
  });

  [
    "referencePrice",
    "currentPrice",
    "baselineDemand",
    "priceElasticity",
    "promoDepth",
    "promoHalo",
    "demandShock",
    "referencePayout",
    "baselineSupply",
    "supplyElasticity",
    "takeRate",
    "matchingEfficiency",
    "supplyShock",
    "perUnitIncentive",
    "eligibleShare",
    "questThreshold",
    "questBonus",
    "attainmentProbability",
    "guaranteedFloor",
    "dynamicSteps",
    "dynamicMinutes",
    "dynamicAggressiveness",
    "dynamicCap",
    "dynamicSupplyLag",
    "dynamicShockDecay",
    "dynamicTargetFill",
    "dynamicTargetBuffer",
    "dynamicLinkedIncentiveRate",
    "dynamicLinkedIncentiveCap"
  ].forEach(function (name) {
    fields[name].addEventListener("input", update);
  });

  shareButton.addEventListener("click", function () {
    copyText(serializeState()).then(function () {
      outputs.shareStatus.textContent = "Shareable link copied.";
    }).catch(function () {
      outputs.shareStatus.textContent = "Could not copy the link automatically.";
    });
  });

  resetButton.addEventListener("click", function () {
    applyPreset(fields.marketplace.value);
    update();
  });

  restoreFromQuery();
  update();
});
