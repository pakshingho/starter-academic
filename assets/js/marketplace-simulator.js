document.addEventListener("DOMContentLoaded", function () {
  var tool = document.getElementById("marketplace-tool");
  if (!tool) {
    return;
  }

  var PRESETS = {
    balanced: {
      demandIntercept: 120,
      demandSlope: 0.8,
      supplyIntercept: 20,
      supplySlope: 0.55,
      takeRate: 18,
      demandShock: 0,
      sellerCostShock: 0
    },
    promo: {
      demandIntercept: 120,
      demandSlope: 0.8,
      supplyIntercept: 20,
      supplySlope: 0.55,
      takeRate: 18,
      demandShock: 18,
      sellerCostShock: 0
    },
    "supply-crunch": {
      demandIntercept: 120,
      demandSlope: 0.8,
      supplyIntercept: 20,
      supplySlope: 0.55,
      takeRate: 18,
      demandShock: 0,
      sellerCostShock: 14
    },
    "high-fee": {
      demandIntercept: 120,
      demandSlope: 0.8,
      supplyIntercept: 20,
      supplySlope: 0.55,
      takeRate: 32,
      demandShock: 0,
      sellerCostShock: 0
    }
  };

  var fields = {
    demandIntercept: document.getElementById("mp-demand-intercept"),
    demandSlope: document.getElementById("mp-demand-slope"),
    supplyIntercept: document.getElementById("mp-supply-intercept"),
    supplySlope: document.getElementById("mp-supply-slope"),
    takeRate: document.getElementById("mp-take-rate"),
    demandShock: document.getElementById("mp-demand-shock"),
    sellerCostShock: document.getElementById("mp-seller-cost-shock")
  };

  var outputs = {
    quantity: document.getElementById("mp-metric-quantity"),
    buyerPrice: document.getElementById("mp-metric-buyer-price"),
    sellerPayout: document.getElementById("mp-metric-seller-payout"),
    feeWedge: document.getElementById("mp-metric-fee-wedge"),
    gmv: document.getElementById("mp-metric-gmv"),
    platformRevenue: document.getElementById("mp-metric-platform-revenue"),
    consumerSurplus: document.getElementById("mp-metric-consumer-surplus"),
    sellerSurplus: document.getElementById("mp-metric-seller-surplus"),
    totalSurplus: document.getElementById("mp-metric-total-surplus"),
    deadweightLoss: document.getElementById("mp-metric-deadweight-loss"),
    notes: document.getElementById("marketplace-tool-notes"),
    error: document.getElementById("marketplace-tool-error"),
    chart: document.getElementById("marketplace-chart")
  };

  var presetButtons = Array.prototype.slice.call(
    tool.querySelectorAll("[data-marketplace-preset]")
  );
  var resetButton = document.getElementById("marketplace-tool-reset");

  function formatCurrency(value, decimals) {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals
    }).format(value);
  }

  function formatNumber(value) {
    return new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 1,
      maximumFractionDigits: 1
    }).format(value);
  }

  function showError(message) {
    outputs.error.hidden = false;
    outputs.error.textContent = message;
  }

  function clearError() {
    outputs.error.hidden = true;
    outputs.error.textContent = "";
  }

  function resetOutputs() {
    [
      outputs.quantity,
      outputs.buyerPrice,
      outputs.sellerPayout,
      outputs.feeWedge,
      outputs.gmv,
      outputs.platformRevenue,
      outputs.consumerSurplus,
      outputs.sellerSurplus,
      outputs.totalSurplus,
      outputs.deadweightLoss
    ].forEach(function (node) {
      node.textContent = "-";
    });
    outputs.notes.innerHTML = "";
    outputs.chart.innerHTML = "";
  }

  function readInputs() {
    return {
      demandIntercept: Number(fields.demandIntercept.value),
      demandSlope: Number(fields.demandSlope.value),
      supplyIntercept: Number(fields.supplyIntercept.value),
      supplySlope: Number(fields.supplySlope.value),
      takeRate: Number(fields.takeRate.value) / 100,
      demandShock: Number(fields.demandShock.value) / 100,
      sellerCostShock: Number(fields.sellerCostShock.value)
    };
  }

  function computeOutcome(params) {
    var adjustedDemandIntercept = params.demandIntercept * (1 + params.demandShock);
    var adjustedSupplyIntercept = params.supplyIntercept + params.sellerCostShock;
    var retainedShare = 1 - params.takeRate;
    var denominator = params.supplySlope + retainedShare * params.demandSlope;
    var numerator = retainedShare * adjustedDemandIntercept - adjustedSupplyIntercept;

    if (!(denominator > 0)) {
      return { error: "The demand and supply slopes must imply a valid equilibrium denominator." };
    }

    if (!(retainedShare > 0 && retainedShare <= 1)) {
      return { error: "Platform take rate must stay between 0% and 100%." };
    }

    if (!(numerator > 0)) {
      return { error: "These settings imply no positive-trade equilibrium. Lower the fee or seller cost shock, or raise demand." };
    }

    var quantity = numerator / denominator;
    var buyerPrice = adjustedDemandIntercept - params.demandSlope * quantity;
    var sellerPayout = retainedShare * buyerPrice;
    var feeWedge = buyerPrice - sellerPayout;
    var gmv = buyerPrice * quantity;
    var platformRevenue = params.takeRate * gmv;
    var consumerSurplus = 0.5 * (adjustedDemandIntercept - buyerPrice) * quantity;
    var sellerSurplus = 0.5 * (sellerPayout - adjustedSupplyIntercept) * quantity;
    var totalSurplus = consumerSurplus + sellerSurplus + platformRevenue;

    var noFeeDenominator = params.demandSlope + params.supplySlope;
    var noFeeNumerator = adjustedDemandIntercept - adjustedSupplyIntercept;
    var noFeeQuantity = noFeeNumerator > 0 ? noFeeNumerator / noFeeDenominator : 0;
    var noFeeBuyerPrice = adjustedDemandIntercept - params.demandSlope * noFeeQuantity;
    var noFeeConsumerSurplus = 0.5 * (adjustedDemandIntercept - noFeeBuyerPrice) * noFeeQuantity;
    var noFeeSellerSurplus = 0.5 * (noFeeBuyerPrice - adjustedSupplyIntercept) * noFeeQuantity;
    var noFeeTotalSurplus = noFeeConsumerSurplus + noFeeSellerSurplus;
    var deadweightLoss = Math.max(0, noFeeTotalSurplus - totalSurplus);

    return {
      adjustedDemandIntercept: adjustedDemandIntercept,
      adjustedSupplyIntercept: adjustedSupplyIntercept,
      quantity: quantity,
      buyerPrice: buyerPrice,
      sellerPayout: sellerPayout,
      feeWedge: feeWedge,
      gmv: gmv,
      platformRevenue: platformRevenue,
      consumerSurplus: consumerSurplus,
      sellerSurplus: sellerSurplus,
      totalSurplus: totalSurplus,
      noFeeQuantity: noFeeQuantity,
      noFeeBuyerPrice: noFeeBuyerPrice,
      noFeeTotalSurplus: noFeeTotalSurplus,
      deadweightLoss: deadweightLoss
    };
  }

  function updateMetrics(result) {
    outputs.quantity.textContent = formatNumber(result.quantity);
    outputs.buyerPrice.textContent = formatCurrency(result.buyerPrice, 1);
    outputs.sellerPayout.textContent = formatCurrency(result.sellerPayout, 1);
    outputs.feeWedge.textContent = formatCurrency(result.feeWedge, 1);
    outputs.gmv.textContent = formatCurrency(result.gmv, 0);
    outputs.platformRevenue.textContent = formatCurrency(result.platformRevenue, 0);
    outputs.consumerSurplus.textContent = formatCurrency(result.consumerSurplus, 0);
    outputs.sellerSurplus.textContent = formatCurrency(result.sellerSurplus, 0);
    outputs.totalSurplus.textContent = formatCurrency(result.totalSurplus, 0);
    outputs.deadweightLoss.textContent = formatCurrency(result.deadweightLoss, 0);
  }

  function setNotes(params, result) {
    var quantityGap = result.noFeeQuantity > 0
      ? ((result.noFeeQuantity - result.quantity) / result.noFeeQuantity) * 100
      : 0;
    var demandDirection = params.demandShock > 0
      ? "Demand is shifted outward."
      : params.demandShock < 0
        ? "Demand is shifted inward."
        : "Demand is at baseline.";
    var supplyDirection = params.sellerCostShock > 0
      ? "Seller costs are higher than baseline."
      : params.sellerCostShock < 0
        ? "Seller costs are lower than baseline."
        : "Seller costs are at baseline.";

    outputs.notes.innerHTML =
      "<p><strong>Reading:</strong> buyers pay <strong>" + formatCurrency(result.buyerPrice, 1) + "</strong>, sellers keep <strong>" + formatCurrency(result.sellerPayout, 1) + "</strong>, and the fee wedge is <strong>" + formatCurrency(result.feeWedge, 1) + "</strong> per transaction.</p>" +
      "<p><strong>Benchmark:</strong> without a fee, quantity would be <strong>" + formatNumber(result.noFeeQuantity) + "</strong>. The current wedge reduces volume by <strong>" + quantityGap.toFixed(1) + "%</strong> and creates deadweight loss of <strong>" + formatCurrency(result.deadweightLoss, 0) + "</strong>.</p>" +
      "<p><strong>Scenario:</strong> " + demandDirection + " " + supplyDirection + "</p>";
  }

  function renderChart(params, result) {
    var chart = outputs.chart;
    var width = 640;
    var height = 420;
    var margin = { top: 24, right: 24, bottom: 48, left: 64 };
    var retainedShare = 1 - params.takeRate;
    var qMaxCandidate = Math.max(result.quantity, result.noFeeQuantity, 1) * 1.45;
    var qMax = Math.max(qMaxCandidate, result.adjustedDemandIntercept / params.demandSlope * 0.95);
    var safeQMax = Math.max(qMax, result.quantity * 1.15, result.noFeeQuantity * 1.15, 10);
    var pMax = Math.max(
      result.adjustedDemandIntercept,
      (result.adjustedSupplyIntercept + params.supplySlope * safeQMax) / retainedShare,
      result.adjustedSupplyIntercept + params.supplySlope * safeQMax,
      result.buyerPrice,
      result.noFeeBuyerPrice
    ) * 1.12;

    var innerWidth = width - margin.left - margin.right;
    var innerHeight = height - margin.top - margin.bottom;

    function xScale(quantity) {
      return margin.left + (quantity / safeQMax) * innerWidth;
    }

    function yScale(price) {
      return margin.top + innerHeight - (price / pMax) * innerHeight;
    }

    function linePath(fn) {
      return "M " + xScale(0).toFixed(2) + " " + yScale(fn(0)).toFixed(2) +
        " L " + xScale(safeQMax).toFixed(2) + " " + yScale(fn(safeQMax)).toFixed(2);
    }

    function demandPrice(quantity) {
      return result.adjustedDemandIntercept - params.demandSlope * quantity;
    }

    function feeAdjustedSupplyPrice(quantity) {
      return (result.adjustedSupplyIntercept + params.supplySlope * quantity) / retainedShare;
    }

    function noFeeSupplyPrice(quantity) {
      return result.adjustedSupplyIntercept + params.supplySlope * quantity;
    }

    var xTicks = 5;
    var yTicks = 5;
    var xTickMarkup = "";
    var yTickMarkup = "";
    var gridMarkup = "";
    var i;

    for (i = 0; i <= xTicks; i += 1) {
      var qTick = (safeQMax / xTicks) * i;
      var x = xScale(qTick);
      gridMarkup += "<line x1=\"" + x.toFixed(2) + "\" y1=\"" + margin.top + "\" x2=\"" + x.toFixed(2) + "\" y2=\"" + (height - margin.bottom) + "\" class=\"marketplace-tool__grid-line\" />";
      xTickMarkup += "<line x1=\"" + x.toFixed(2) + "\" y1=\"" + (height - margin.bottom) + "\" x2=\"" + x.toFixed(2) + "\" y2=\"" + (height - margin.bottom + 6) + "\" class=\"marketplace-tool__axis-line\" />";
      xTickMarkup += "<text x=\"" + x.toFixed(2) + "\" y=\"" + (height - margin.bottom + 22) + "\" text-anchor=\"middle\" class=\"marketplace-tool__axis-label\">" + qTick.toFixed(0) + "</text>";
    }

    for (i = 0; i <= yTicks; i += 1) {
      var pTick = (pMax / yTicks) * i;
      var y = yScale(pTick);
      gridMarkup += "<line x1=\"" + margin.left + "\" y1=\"" + y.toFixed(2) + "\" x2=\"" + (width - margin.right) + "\" y2=\"" + y.toFixed(2) + "\" class=\"marketplace-tool__grid-line\" />";
      yTickMarkup += "<line x1=\"" + (margin.left - 6) + "\" y1=\"" + y.toFixed(2) + "\" x2=\"" + margin.left + "\" y2=\"" + y.toFixed(2) + "\" class=\"marketplace-tool__axis-line\" />";
      yTickMarkup += "<text x=\"" + (margin.left - 10) + "\" y=\"" + (y + 4).toFixed(2) + "\" text-anchor=\"end\" class=\"marketplace-tool__axis-label\">" + pTick.toFixed(0) + "</text>";
    }

    var equilibriumX = xScale(result.quantity);
    var buyerY = yScale(result.buyerPrice);
    var sellerY = yScale(result.sellerPayout);
    var benchmarkX = xScale(result.noFeeQuantity);
    var benchmarkY = yScale(result.noFeeBuyerPrice);

    chart.innerHTML =
      "<rect x=\"0\" y=\"0\" width=\"" + width + "\" height=\"" + height + "\" rx=\"18\" class=\"marketplace-tool__chart-bg\" />" +
      gridMarkup +
      "<line x1=\"" + margin.left + "\" y1=\"" + (height - margin.bottom) + "\" x2=\"" + (width - margin.right) + "\" y2=\"" + (height - margin.bottom) + "\" class=\"marketplace-tool__axis-line marketplace-tool__axis-line--strong\" />" +
      "<line x1=\"" + margin.left + "\" y1=\"" + margin.top + "\" x2=\"" + margin.left + "\" y2=\"" + (height - margin.bottom) + "\" class=\"marketplace-tool__axis-line marketplace-tool__axis-line--strong\" />" +
      xTickMarkup +
      yTickMarkup +
      "<path d=\"" + linePath(demandPrice) + "\" class=\"marketplace-tool__curve marketplace-tool__curve--demand\" />" +
      "<path d=\"" + linePath(feeAdjustedSupplyPrice) + "\" class=\"marketplace-tool__curve marketplace-tool__curve--supply\" />" +
      "<path d=\"" + linePath(noFeeSupplyPrice) + "\" class=\"marketplace-tool__curve marketplace-tool__curve--benchmark\" />" +
      "<line x1=\"" + equilibriumX.toFixed(2) + "\" y1=\"" + buyerY.toFixed(2) + "\" x2=\"" + equilibriumX.toFixed(2) + "\" y2=\"" + sellerY.toFixed(2) + "\" class=\"marketplace-tool__wedge\" />" +
      "<line x1=\"" + equilibriumX.toFixed(2) + "\" y1=\"" + buyerY.toFixed(2) + "\" x2=\"" + equilibriumX.toFixed(2) + "\" y2=\"" + (height - margin.bottom) + "\" class=\"marketplace-tool__guide\" />" +
      "<line x1=\"" + margin.left + "\" y1=\"" + buyerY.toFixed(2) + "\" x2=\"" + equilibriumX.toFixed(2) + "\" y2=\"" + buyerY.toFixed(2) + "\" class=\"marketplace-tool__guide\" />" +
      "<circle cx=\"" + equilibriumX.toFixed(2) + "\" cy=\"" + buyerY.toFixed(2) + "\" r=\"6.5\" class=\"marketplace-tool__point marketplace-tool__point--buyer\" />" +
      "<circle cx=\"" + equilibriumX.toFixed(2) + "\" cy=\"" + sellerY.toFixed(2) + "\" r=\"5.5\" class=\"marketplace-tool__point marketplace-tool__point--seller\" />" +
      "<circle cx=\"" + benchmarkX.toFixed(2) + "\" cy=\"" + benchmarkY.toFixed(2) + "\" r=\"5\" class=\"marketplace-tool__point marketplace-tool__point--benchmark\" />" +
      "<text x=\"" + (equilibriumX + 10).toFixed(2) + "\" y=\"" + (buyerY - 10).toFixed(2) + "\" class=\"marketplace-tool__annotation\">Buyer price</text>" +
      "<text x=\"" + (equilibriumX + 10).toFixed(2) + "\" y=\"" + (sellerY + 18).toFixed(2) + "\" class=\"marketplace-tool__annotation\">Seller payout</text>" +
      "<text x=\"" + (benchmarkX + 10).toFixed(2) + "\" y=\"" + (benchmarkY - 10).toFixed(2) + "\" class=\"marketplace-tool__annotation\">No-fee benchmark</text>" +
      "<text x=\"" + (margin.left + innerWidth / 2).toFixed(2) + "\" y=\"" + (height - 10) + "\" text-anchor=\"middle\" class=\"marketplace-tool__axis-title\">Quantity</text>" +
      "<text x=\"18\" y=\"" + (margin.top + innerHeight / 2).toFixed(2) + "\" text-anchor=\"middle\" transform=\"rotate(-90 18 " + (margin.top + innerHeight / 2).toFixed(2) + ")\" class=\"marketplace-tool__axis-title\">Price / payout</text>";
  }

  function setActivePreset(name) {
    presetButtons.forEach(function (button) {
      button.classList.toggle(
        "marketplace-tool__preset--active",
        button.getAttribute("data-marketplace-preset") === name
      );
    });
  }

  function applyPreset(name) {
    var preset = PRESETS[name];
    if (!preset) {
      return;
    }

    fields.demandIntercept.value = preset.demandIntercept;
    fields.demandSlope.value = preset.demandSlope;
    fields.supplyIntercept.value = preset.supplyIntercept;
    fields.supplySlope.value = preset.supplySlope;
    fields.takeRate.value = preset.takeRate;
    fields.demandShock.value = preset.demandShock;
    fields.sellerCostShock.value = preset.sellerCostShock;
    setActivePreset(name);
    update();
  }

  function detectPreset(params) {
    var names = Object.keys(PRESETS);
    var i;
    for (i = 0; i < names.length; i += 1) {
      var preset = PRESETS[names[i]];
      if (
        preset.demandIntercept === params.demandIntercept &&
        preset.demandSlope === params.demandSlope &&
        preset.supplyIntercept === params.supplyIntercept &&
        preset.supplySlope === params.supplySlope &&
        preset.takeRate / 100 === params.takeRate &&
        preset.demandShock / 100 === params.demandShock &&
        preset.sellerCostShock === params.sellerCostShock
      ) {
        return names[i];
      }
    }
    return null;
  }

  function update() {
    clearError();

    var params = readInputs();
    if (
      !(params.demandIntercept > 0) ||
      !(params.demandSlope > 0) ||
      !(params.supplyIntercept >= 0) ||
      !(params.supplySlope > 0) ||
      !(params.takeRate >= 0 && params.takeRate < 1)
    ) {
      resetOutputs();
      showError("Enter positive demand and supply parameters, with take rate below 100%.");
      return;
    }

    var result = computeOutcome(params);
    if (result.error) {
      resetOutputs();
      showError(result.error);
      return;
    }

    updateMetrics(result);
    setNotes(params, result);
    renderChart(params, result);

    var matchingPreset = detectPreset(params);
    setActivePreset(matchingPreset);
  }

  presetButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      applyPreset(button.getAttribute("data-marketplace-preset"));
    });
  });

  Object.keys(fields).forEach(function (key) {
    fields[key].addEventListener("input", update);
  });

  resetButton.addEventListener("click", function () {
    applyPreset("balanced");
  });

  applyPreset("balanced");
});
