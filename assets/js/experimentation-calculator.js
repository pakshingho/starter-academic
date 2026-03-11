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
    dailyUsers: document.getElementById("daily-users"),
    trafficSplit: document.getElementById("traffic-split"),
    variants: document.getElementById("variants")
  };

  var outputs = {
    absoluteMde: document.getElementById("metric-absolute-mde"),
    treatmentRate: document.getElementById("metric-treatment-rate"),
    samplePerVariant: document.getElementById("metric-sample-per-variant"),
    totalSample: document.getElementById("metric-total-sample"),
    runtimeDays: document.getElementById("metric-runtime-days"),
    usersPerVariantDay: document.getElementById("metric-users-per-variant-day"),
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

  function setNotes(variants, adjustedAlpha) {
    var comparisonText = variants > 2
      ? "A Bonferroni adjustment is applied across " + (variants - 1) + " treatment-versus-control comparisons."
      : "This is a standard control-versus-treatment two-arm setup.";

    outputs.notes.innerHTML =
      "<p>This calculator uses the normal approximation for a fixed-horizon two-sided test of two conversion rates with equal allocation across variants.</p>" +
      "<p>" + comparisonText + " Effective two-sided alpha per comparison: <strong>" + adjustedAlpha.toFixed(4) + "</strong>.</p>";
  }

  function update() {
    clearError();

    var baselineRate = Number(fields.baselineRate.value) / 100;
    var mdeRelative = Number(fields.mdeRelative.value) / 100;
    var alpha = Number(fields.alpha.value);
    var power = Number(fields.power.value);
    var dailyUsers = Number(fields.dailyUsers.value);
    var trafficSplit = Number(fields.trafficSplit.value) / 100;
    var variants = Number(fields.variants.value);

    if (
      !(baselineRate > 0 && baselineRate < 1) ||
      !(mdeRelative > 0) ||
      !(alpha > 0 && alpha < 1) ||
      !(power > 0.5 && power < 1) ||
      !(dailyUsers > 0) ||
      !(trafficSplit > 0 && trafficSplit <= 1) ||
      !(variants >= 2)
    ) {
      showError("Enter valid inputs for all fields.");
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

    var comparisons = Math.max(1, variants - 1);
    var adjustedAlpha = alpha / comparisons;
    if (!(adjustedAlpha > 0 && adjustedAlpha < 1)) {
      showError("Adjusted alpha must stay between 0 and 1.");
      return;
    }

    var zAlpha = inverseNormalCdf(1 - adjustedAlpha / 2);
    var zPower = inverseNormalCdf(power);
    if (!isFinite(zAlpha) || !isFinite(zPower)) {
      showError("Could not compute z-scores from the selected alpha and power.");
      return;
    }

    var pooledRate = (baselineRate + treatmentRate) / 2;
    var pooledVariance = 2 * pooledRate * (1 - pooledRate);
    var treatmentVariance = baselineRate * (1 - baselineRate) + treatmentRate * (1 - treatmentRate);
    var samplePerVariant = Math.pow(zAlpha * Math.sqrt(pooledVariance) + zPower * Math.sqrt(treatmentVariance), 2) / Math.pow(absoluteMde, 2);

    var effectiveDailyUsers = dailyUsers * trafficSplit;
    var usersPerVariantDay = effectiveDailyUsers / variants;
    if (usersPerVariantDay <= 0) {
      showError("Users per variant per day must be positive.");
      return;
    }

    var runtimeDays = samplePerVariant / usersPerVariantDay;
    var totalSample = samplePerVariant * variants;

    outputs.absoluteMde.textContent = (absoluteMde * 100).toFixed(2) + " pp";
    outputs.treatmentRate.textContent = formatPercent(treatmentRate);
    outputs.samplePerVariant.textContent = formatInteger(samplePerVariant);
    outputs.totalSample.textContent = formatInteger(totalSample);
    outputs.runtimeDays.textContent = runtimeDays.toFixed(1) + " days";
    outputs.usersPerVariantDay.textContent = formatInteger(usersPerVariantDay);
    setNotes(variants, adjustedAlpha);
  }

  Object.keys(fields).forEach(function (key) {
    fields[key].addEventListener("input", update);
  });

  update();
});
