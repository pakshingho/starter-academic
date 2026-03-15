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
        supplyShock: -4
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
        supplyShock: -2
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
        supplyShock: 4
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
    supplyShock: document.getElementById("mp-supply-shock")
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
    supplyShock: "ss"
  };

  function getPreset(key) {
    return presets[key] || presets.ride;
  }

  function applyPreset(key) {
    var preset = getPreset(key);
    fields.marketplace.value = key in presets ? key : "ride";

    Object.keys(preset.defaults).forEach(function (name) {
      fields[name].value = preset.defaults[name];
    });

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

  function showError(message) {
    outputs.error.hidden = false;
    outputs.error.textContent = message;
  }

  function clearError() {
    outputs.error.hidden = true;
    outputs.error.textContent = "";
  }

  function clearRenderedOutputs() {
    var metrics = [
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
      outputs.marketState
    ];

    metrics.forEach(function (node) {
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
      supplyShock: Number(fields.supplyShock.value) / 100
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
      !(state.supplyShock > -1)
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

  function supplyAtPrice(price, state) {
    var payout = Math.max(price * (1 - state.takeRate), 0.01);
    var rawSupply = state.baselineSupply *
      Math.pow(payout / state.referencePayout, state.supplyElasticity) *
      (1 + state.supplyShock);

    return {
      payout: payout,
      rawSupply: rawSupply,
      effectiveSupply: rawSupply * state.matchingEfficiency
    };
  }

  function scenarioAtPrice(price, state) {
    var demandNoPromo = demandWithoutPromo(price, state);
    var demand = demandWithPromo(price, state);
    var supply = supplyAtPrice(price, state);
    var completed = Math.min(demand, supply.effectiveSupply);
    var fillRate = demand > 0 ? clamp(completed / demand, 0, 1) : 0;
    var gap = supply.effectiveSupply - demand;
    var tightness = supply.effectiveSupply > 0 ? demand / supply.effectiveSupply : Infinity;

    return {
      price: price,
      payout: supply.payout,
      demandNoPromo: demandNoPromo,
      demand: demand,
      promoIncrement: demand - demandNoPromo,
      rawSupply: supply.rawSupply,
      effectiveSupply: supply.effectiveSupply,
      completed: completed,
      fillRate: fillRate,
      gap: gap,
      tightness: tightness,
      platformRevenue: price * state.takeRate * completed
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
      return "<path d=\"" + buildSeriesPath(series.points, xScale, yScale) + "\" fill=\"none\" stroke=\"" + series.color + "\" stroke-width=\"3\" stroke-linecap=\"round\" stroke-linejoin=\"round\"></path>";
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
    var maxY = 0;
    var index;

    for (index = 0; index < 28; index += 1) {
      var price = minPrice + ((maxPrice - minPrice) * index) / 27;
      var scenario = scenarioAtPrice(price, state);
      demandSeries.push({ x: price, y: scenario.demand });
      supplySeries.push({ x: price, y: scenario.effectiveSupply });
      maxY = Math.max(maxY, scenario.demand, scenario.effectiveSupply);
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
        {
          color: "#d97706",
          points: supplySeries
        }
      ],
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
        { color: "#d97706", label: "Effective supply after matching frictions" },
        { color: "#1d4ed8", label: preset.dynamicPricing + " clearing point" }
      ],
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

  function renderSummary(state, currentScenario, equilibriumScenario, preset) {
    var gapText = currentScenario.gap >= 0
      ? formatCount(currentScenario.gap) + " units of spare " + preset.supplySide
      : formatCount(Math.abs(currentScenario.gap)) + " units of unmet " + preset.demandSide;
    var promoText = state.promoDepth > 0
      ? "A " + formatPercent(state.promoDepth, 0) + " promotion adds about " + formatCount(currentScenario.promoIncrement) + " incremental " + preset.unitPlural + " per day on top of the base price response."
      : "No active promotion is applied, so all demand movement comes from price elasticity and the external demand shock.";
    var multiplier = equilibriumScenario.price / state.currentPrice;
    var directionText = multiplier >= 1
      ? "raise"
      : "lower";

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
      "<span class=\"marketplace-pricing-tool__insight-label\">Marketplace mechanism</span>" +
      "<p>To clear the market, the model would " + directionText + " price to about " + formatCurrency(equilibriumScenario.price, 2) + " (" + formatRatio(multiplier) + " of the current price). Supplier payout would move to " + formatCurrency(equilibriumScenario.payout, 2) + ", and completed volume would settle near " + formatCount(equilibriumScenario.completed) + " " + preset.unitPlural + ". " + preset.notes + "</p>" +
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
  }

  function update() {
    clearError();
    outputs.shareStatus.textContent = "";

    var state = readState();
    if (!state) {
      clearRenderedOutputs();
      showError("Enter valid positive inputs for price, demand, supply, and elasticities. Shocks must stay above -100%.");
      return;
    }

    var preset = getPreset(state.marketplace);
    var currentScenario = scenarioAtPrice(state.currentPrice, state);
    var equilibriumScenario = findEquilibrium(state);
    var promoLiftShare = currentScenario.demand > 0 ? currentScenario.promoIncrement / currentScenario.demand : 0;

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
    outputs.revenue.textContent = formatCurrency(equilibriumScenario.platformRevenue, 0);
    outputs.payout.textContent = formatCurrency(equilibriumScenario.payout, 2);
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
    "supplyShock"
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
