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
        guaranteedFloor: 18.0
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
        guaranteedFloor: 11.5
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
        guaranteedFloor: 180.0
      }
    }
  };

  var fields = {
    marketplace: document.getElementById("mp-marketplace"),
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
    guaranteedFloor: document.getElementById("mp-guaranteed-floor")
  };

  var groups = {
    perUnitIncentive: document.getElementById("group-mp-per-unit-incentive"),
    eligibleShare: document.getElementById("group-mp-eligible-share"),
    questThreshold: document.getElementById("group-mp-quest-threshold"),
    questBonus: document.getElementById("group-mp-quest-bonus"),
    attainmentProbability: document.getElementById("group-mp-attainment-probability"),
    guaranteedFloor: document.getElementById("group-mp-guaranteed-floor")
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
    summary: document.getElementById("mp-summary"),
    error: document.getElementById("mp-error"),
    demandChart: document.getElementById("mp-demand-chart"),
    equilibriumChart: document.getElementById("mp-equilibrium-chart"),
    ladderBody: document.getElementById("mp-ladder-body"),
    shareStatus: document.getElementById("mp-share-status")
  };

  var shareButton = document.getElementById("mp-share");
  var resetButton = document.getElementById("mp-reset");
  var shareKeys = {
    marketplace: "m",
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
    guaranteedFloor: "gf"
  };

  function getPreset(key) {
    return presets[key] || presets.ride;
  }

  function syncIncentiveFields() {
    var mode = fields.incentiveMode.value;
    var isPerUnit = mode === "per-unit";
    var isThreshold = mode === "threshold";

    groups.perUnitIncentive.hidden = !isPerUnit;
    groups.eligibleShare.hidden = !isThreshold;
    groups.questThreshold.hidden = !isThreshold;
    groups.questBonus.hidden = !isThreshold;
    groups.attainmentProbability.hidden = !isThreshold;
    groups.guaranteedFloor.hidden = !isThreshold;
  }

  function applyPreset(key) {
    var preset = getPreset(key);
    fields.marketplace.value = key in presets ? key : "ride";

    Object.keys(preset.defaults).forEach(function (name) {
      fields[name].value = preset.defaults[name];
    });

    syncIncentiveFields();
    outputs.shareStatus.textContent = "";
  }

  function clamp(value, minimum, maximum) {
    return Math.min(Math.max(value, minimum), maximum);
  }

  function formatCount(value) {
    return Math.round(value).toLocaleString("en-US");
  }

  function formatSignedCount(value) {
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
    return (value * 100).toFixed(typeof digits === "number" ? digits : 1) + "%";
  }

  function formatSignedPercent(value, digits) {
    var amount = (value * 100).toFixed(typeof digits === "number" ? digits : 1) + "%";
    return value > 0 ? "+" + amount : amount;
  }

  function formatCurrency(value, digits) {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: typeof digits === "number" ? digits : 0,
      maximumFractionDigits: typeof digits === "number" ? digits : 0
    }).format(value);
  }

  function formatRatio(value) {
    return value.toFixed(2) + "x";
  }

  function formatCurrencyRate(value) {
    return formatCurrency(value, 2) + "/unit";
  }

  function showError(message) {
    outputs.error.hidden = false;
    outputs.error.textContent = message;
  }

  function clearError() {
    outputs.error.hidden = true;
    outputs.error.textContent = "";
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
    outputs.ladderBody.innerHTML = "";
  }

  function readState() {
    var state = {
      marketplace: fields.marketplace.value,
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
      guaranteedFloor: Number(fields.guaranteedFloor.value)
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
      !(state.guaranteedFloor >= 0)
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

  function incentiveProfile(price, state) {
    var basePayout = Math.max(price * (1 - state.takeRate), 0.01);
    var questEquivalentPerCompleted = 0;
    var guaranteeTopUpPerCompleted = 0;
    var modelLabel = "No explicit incentive";

    if (state.incentiveMode === "per-unit") {
      modelLabel = "Per-unit incentive";

      return {
        modelLabel: modelLabel,
        basePayout: basePayout,
        questEquivalentPerCompleted: 0,
        guaranteeTopUpPerCompleted: 0,
        variableEquivalentPerCompleted: state.perUnitIncentive,
        effectivePayoutBoost: state.perUnitIncentive,
        hasIncentiveProgram: state.perUnitIncentive > 0
      };
    }

    if (state.incentiveMode === "threshold") {
      modelLabel = "Threshold / guarantee";
      questEquivalentPerCompleted = state.eligibleShare *
        state.attainmentProbability *
        state.questBonus /
        Math.max(state.questThreshold, 1);
      guaranteeTopUpPerCompleted = state.eligibleShare *
        Math.max(0, state.guaranteedFloor - basePayout);

      return {
        modelLabel: modelLabel,
        basePayout: basePayout,
        questEquivalentPerCompleted: questEquivalentPerCompleted,
        guaranteeTopUpPerCompleted: guaranteeTopUpPerCompleted,
        variableEquivalentPerCompleted: questEquivalentPerCompleted + guaranteeTopUpPerCompleted,
        effectivePayoutBoost: questEquivalentPerCompleted + guaranteeTopUpPerCompleted,
        hasIncentiveProgram: true
      };
    }

    return {
      modelLabel: modelLabel,
      basePayout: basePayout,
      questEquivalentPerCompleted: 0,
      guaranteeTopUpPerCompleted: 0,
      variableEquivalentPerCompleted: 0,
      effectivePayoutBoost: 0,
      hasIncentiveProgram: false
    };
  }

  function supplyAtPrice(price, state) {
    var incentive = incentiveProfile(price, state);
    var payout = Math.max(incentive.basePayout + incentive.effectivePayoutBoost, 0.01);
    var rawSupplyWithoutIncentive = state.baselineSupply *
      Math.pow(incentive.basePayout / state.referencePayout, state.supplyElasticity) *
      (1 + state.supplyShock);
    var rawSupply = state.baselineSupply *
      Math.pow(payout / state.referencePayout, state.supplyElasticity) *
      (1 + state.supplyShock);

    return {
      basePayout: incentive.basePayout,
      payout: payout,
      incentive: incentive,
      rawSupplyWithoutIncentive: rawSupplyWithoutIncentive,
      effectiveSupplyWithoutIncentive: rawSupplyWithoutIncentive * state.matchingEfficiency,
      rawSupply: rawSupply,
      effectiveSupply: rawSupply * state.matchingEfficiency
    };
  }

  function scenarioAtPrice(price, state) {
    var demandNoPromo = demandWithoutPromo(price, state);
    var demand = demandWithPromo(price, state);
    var supply = supplyAtPrice(price, state);
    var completed = Math.min(demand, supply.effectiveSupply);
    var completedWithoutIncentive = Math.min(demand, supply.effectiveSupplyWithoutIncentive);
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
      rawSupply: supply.rawSupply,
      effectiveSupply: supply.effectiveSupply,
      incrementalEffectiveSupply: supply.effectiveSupply - supply.effectiveSupplyWithoutIncentive,
      completed: completed,
      completedWithoutIncentive: completedWithoutIncentive,
      incrementalCompleted: completed - completedWithoutIncentive,
      fillRate: fillRate,
      gap: gap,
      tightness: tightness,
      grossPlatformRevenue: grossPlatformRevenue,
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

  function buildSeriesPath(points, xScale, yScale) {
    return points.map(function (point, index) {
      var prefix = index === 0 ? "M" : "L";
      return prefix + xScale(point.x).toFixed(2) + " " + yScale(point.y).toFixed(2);
    }).join(" ");
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
    var yTicks = [0, maxY / 3, (2 * maxY) / 3, maxY];
    var xTicks = [minX, (minX + maxX) / 2, maxX];
    var grid = yTicks.map(function (tick) {
      var y = yScale(tick).toFixed(2);

      return "<line x1=\"" + padding.left + "\" y1=\"" + y + "\" x2=\"" + (width - padding.right) + "\" y2=\"" + y + "\" class=\"marketplace-pricing-tool__chart-grid\"></line>" +
        "<text x=\"" + (padding.left - 10) + "\" y=\"" + (Number(y) + 4) + "\" class=\"marketplace-pricing-tool__axis-label marketplace-pricing-tool__axis-label--y\">" + formatCount(tick) + "</text>";
    }).join("");
    var xAxisLabels = xTicks.map(function (tick) {
      var x = xScale(tick).toFixed(2);

      return "<text x=\"" + x + "\" y=\"" + (height - 10) + "\" class=\"marketplace-pricing-tool__axis-label marketplace-pricing-tool__axis-label--x\">" + formatCurrency(tick, 0) + "</text>";
    }).join("");
    var paths = options.series.map(function (series) {
      var dasharray = series.dasharray ? " stroke-dasharray=\"" + series.dasharray + "\"" : "";
      var opacity = typeof series.opacity === "number" ? " opacity=\"" + series.opacity + "\"" : "";
      var strokeWidth = series.strokeWidth || 3;

      return "<path d=\"" + buildSeriesPath(series.points, xScale, yScale) + "\" fill=\"none\" stroke=\"" + series.color + "\" stroke-width=\"" + strokeWidth + "\" stroke-linecap=\"round\" stroke-linejoin=\"round\"" + dasharray + opacity + "></path>";
    }).join("");
    var markers = options.markers.map(function (marker) {
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
    var legend = options.legend.map(function (item) {
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
      verticalLines: [],
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

  function buildLadderRows(state, equilibriumScenario) {
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
    if (scenario.incentive.modelLabel === "No explicit incentive") {
      return "No explicit supplier incentive is active, so supply only moves through the base payout and the supply shock.";
    }

    if (scenario.incentive.modelLabel === "Per-unit incentive") {
      return "A direct " + formatCurrencyRate(scenario.incentive.variableEquivalentPerCompleted) + " incentive is layered on top of base payout, shifting effective supply by about " + formatSignedCount(scenario.incrementalEffectiveSupply) + " units at the current price.";
    }

    return "The threshold / guarantee program is converted into an expected " + formatCurrencyRate(scenario.incentive.variableEquivalentPerCompleted) + " incentive at the current price, made up of " + formatCurrencyRate(scenario.incentive.questEquivalentPerCompleted) + " from the quest and " + formatCurrencyRate(scenario.incentive.guaranteeTopUpPerCompleted) + " from the guarantee top-up.";
  }

  function renderSummary(state, currentScenario, equilibriumScenario, preset) {
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

    syncIncentiveFields();
  }

  function update() {
    clearError();
    outputs.shareStatus.textContent = "";
    syncIncentiveFields();

    var state = readState();
    var preset;
    var currentScenario;
    var equilibriumScenario;
    var promoLiftShare;

    if (!state) {
      clearRenderedOutputs();
      showError("Enter valid positive inputs for price, demand, supply, and elasticities. Shocks must stay above -100%, and incentive settings must be nonnegative.");
      return;
    }

    preset = getPreset(state.marketplace);
    currentScenario = scenarioAtPrice(state.currentPrice, state);
    equilibriumScenario = findEquilibrium(state);
    promoLiftShare = currentScenario.demand > 0 ? currentScenario.promoIncrement / currentScenario.demand : 0;

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

    renderSummary(state, currentScenario, equilibriumScenario, preset);
    renderDemandChart(state, currentScenario, equilibriumScenario, preset);
    renderEquilibriumChart(state, currentScenario, equilibriumScenario, preset);
    buildLadderRows(state, equilibriumScenario);
  }

  fields.marketplace.addEventListener("change", function () {
    applyPreset(fields.marketplace.value);
    update();
  });

  fields.incentiveMode.addEventListener("change", function () {
    syncIncentiveFields();
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
    "guaranteedFloor"
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
