document.addEventListener("DOMContentLoaded", function () {
  var tool = document.getElementById("experiment-tool");
  if (!tool) {
    return;
  }

  var fields = {
    baselineRate: document.getElementById("baseline-rate"),
    mdeRelative: document.getElementById("mde-relative"),
    alpha: document.getElementById("alpha"),
    power: document.getElementById("power"),
    testSidedness: document.getElementById("test-sidedness"),
    dailyUsers: document.getElementById("daily-users"),
    trafficSplit: document.getElementById("traffic-split"),
    variants: document.getElementById("variants"),
    controlShare: document.getElementById("control-share")
  };

  var outputs = {
    absoluteMde: document.getElementById("metric-absolute-mde"),
    treatmentRate: document.getElementById("metric-treatment-rate"),
    samplePerVariant: document.getElementById("metric-sample-per-variant"),
    controlSample: document.getElementById("metric-control-sample"),
    treatmentSample: document.getElementById("metric-treatment-sample"),
    totalSample: document.getElementById("metric-total-sample"),
    runtimeDays: document.getElementById("metric-runtime-days"),
    controlUsersDay: document.getElementById("metric-control-users-day"),
    treatmentUsersDay: document.getElementById("metric-treatment-users-day"),
    notes: document.getElementById("experiment-tool-notes"),
    error: document.getElementById("experiment-tool-error")
  };

  function inverseNormalCdf(p) {
    var a = [-39.6968302866538, 220.946098424521, -275.928510446969, 138.357751867269, -30.6647980661472, 2.50662827745924];
    var b = [-54.4760987982241, 161.585836858041, -155.698979859887, 66.8013118877197, -13.2806815528857];
    var c = [-0.00778489400243029, -0.322396458041136, -2.40075827716184, -2.54973253934373, 4.37466414146497, 2.93816398269878];
    var d = [0.00778469570904146, 0.32246712907004, 2.445134137143, 3.75440866190742];
    var plow = 0.02425;
    var phigh = 1 - plow;
    var q;
    var r;

    if (!(p > 0 && p < 1)) {
      return NaN;
    }

    if (p < plow) {
      q = Math.sqrt(-2 * Math.log(p));
      return (((((c[0] * q + c[1]) * q + c[2]) * q + c[3]) * q + c[4]) * q + c[5]) /
        ((((d[0] * q + d[1]) * q + d[2]) * q + d[3]) * q + 1);
    }

    if (p > phigh) {
      q = Math.sqrt(-2 * Math.log(1 - p));
      return -(((((c[0] * q + c[1]) * q + c[2]) * q + c[3]) * q + c[4]) * q + c[5]) /
        ((((d[0] * q + d[1]) * q + d[2]) * q + d[3]) * q + 1);
    }

    q = p - 0.5;
    r = q * q;
    return (((((a[0] * r + a[1]) * r + a[2]) * r + a[3]) * r + a[4]) * r + a[5]) * q /
      (((((b[0] * r + b[1]) * r + b[2]) * r + b[3]) * r + b[4]) * r + 1);
  }

  function formatInteger(value) {
    return Math.ceil(value).toLocaleString("en-US");
  }

  function formatPercent(value) {
    return (value * 100).toFixed(2) + "%";
  }

  function showError(message) {
    outputs.error.hidden = false;
    outputs.error.textContent = message;
  }

  function clearError() {
    outputs.error.hidden = true;
    outputs.error.textContent = "";
  }

  function setNotes(variants, adjustedAlpha, sidedness, controlShare, treatmentShare) {
    var comparisonText = variants > 2
      ? "A Bonferroni adjustment is applied across " + (variants - 1) + " treatment-versus-control comparisons."
      : "This is a standard control-versus-treatment two-arm setup.";
    var sidednessText = sidedness === "one-sided" ? "one-sided" : "two-sided";

    outputs.notes.innerHTML =
      "<p>This calculator uses the normal approximation for a fixed-horizon " + sidednessText + " test of two conversion rates.</p>" +
      "<p>Control share: <strong>" + (controlShare * 100).toFixed(1) + "%</strong>. Each treatment share: <strong>" + (treatmentShare * 100).toFixed(1) + "%</strong>.</p>" +
      "<p>" + comparisonText + " Effective alpha per comparison tail rule: <strong>" + adjustedAlpha.toFixed(4) + "</strong>.</p>";
  }

  function update() {
    clearError();

    var baselineRate = Number(fields.baselineRate.value) / 100;
    var mdeRelative = Number(fields.mdeRelative.value) / 100;
    var alpha = Number(fields.alpha.value);
    var power = Number(fields.power.value);
    var testSidedness = fields.testSidedness.value;
    var dailyUsers = Number(fields.dailyUsers.value);
    var trafficSplit = Number(fields.trafficSplit.value) / 100;
    var variants = Number(fields.variants.value);
    var controlShare = Number(fields.controlShare.value) / 100;
    var treatmentArms = variants - 1;

    if (
      !(baselineRate > 0 && baselineRate < 1) ||
      !(mdeRelative > 0) ||
      !(alpha > 0 && alpha < 1) ||
      !(power > 0.5 && power < 1) ||
      !(dailyUsers > 0) ||
      !(trafficSplit > 0 && trafficSplit <= 1) ||
      !(variants >= 2) ||
      !(controlShare > 0 && controlShare < 1)
    ) {
      showError("Enter valid inputs for all fields.");
      return;
    }

    var treatmentShare = (1 - controlShare) / treatmentArms;
    if (!(treatmentShare > 0)) {
      showError("Treatment traffic share must be positive.");
      return;
    }

    var treatmentRate = baselineRate * (1 + mdeRelative);
    if (treatmentRate >= 1) {
      showError("Treatment rate implied by baseline and MDE must stay below 100%.");
      return;
    }

    var absoluteMde = treatmentRate - baselineRate;
    if (absoluteMde <= 0) {
      showError("Minimum detectable effect must be positive.");
      return;
    }

    var comparisons = Math.max(1, treatmentArms);
    var adjustedAlpha = alpha / comparisons;
    if (!(adjustedAlpha > 0 && adjustedAlpha < 1)) {
      showError("Adjusted alpha must stay between 0 and 1.");
      return;
    }

    var tailAlpha = testSidedness === "one-sided" ? adjustedAlpha : adjustedAlpha / 2;
    var zAlpha = inverseNormalCdf(1 - tailAlpha);
    var zPower = inverseNormalCdf(power);
    if (!isFinite(zAlpha) || !isFinite(zPower)) {
      showError("Could not compute z-scores from the selected alpha and power.");
      return;
    }

    var pooledRate = (baselineRate + treatmentRate) / 2;
    var allocationRatio = controlShare / treatmentShare;
    var nullVarianceConstant = pooledRate * (1 - pooledRate) * (1 + 1 / allocationRatio);
    var altVarianceConstant = baselineRate * (1 - baselineRate) / allocationRatio + treatmentRate * (1 - treatmentRate);
    var samplePerTreatment = Math.pow(zAlpha * Math.sqrt(nullVarianceConstant) + zPower * Math.sqrt(altVarianceConstant), 2) / Math.pow(absoluteMde, 2);
    var samplePerControl = allocationRatio * samplePerTreatment;

    var effectiveDailyUsers = dailyUsers * trafficSplit;
    var controlUsersDay = effectiveDailyUsers * controlShare;
    var treatmentUsersDay = effectiveDailyUsers * treatmentShare;
    if (controlUsersDay <= 0 || treatmentUsersDay <= 0) {
      showError("Users per arm per day must be positive.");
      return;
    }

    var runtimeDays = Math.max(samplePerControl / controlUsersDay, samplePerTreatment / treatmentUsersDay);
    var totalSample = samplePerControl + samplePerTreatment * treatmentArms;

    outputs.absoluteMde.textContent = (absoluteMde * 100).toFixed(2) + " pp";
    outputs.treatmentRate.textContent = formatPercent(treatmentRate);
    outputs.samplePerVariant.textContent = formatInteger(Math.max(samplePerControl, samplePerTreatment));
    outputs.controlSample.textContent = formatInteger(samplePerControl);
    outputs.treatmentSample.textContent = formatInteger(samplePerTreatment);
    outputs.totalSample.textContent = formatInteger(totalSample);
    outputs.runtimeDays.textContent = runtimeDays.toFixed(1) + " days";
    outputs.controlUsersDay.textContent = formatInteger(controlUsersDay);
    outputs.treatmentUsersDay.textContent = formatInteger(treatmentUsersDay);
    setNotes(variants, adjustedAlpha, testSidedness, controlShare, treatmentShare);
  }

  Object.keys(fields).forEach(function (key) {
    fields[key].addEventListener("input", update);
  });

  update();
});
