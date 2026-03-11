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
    error: document.getElementById("experiment-tool-error")
  };

  var zTable = [
    { p: 0.80, z: 0.8416 },
    { p: 0.85, z: 1.0364 },
    { p: 0.90, z: 1.2816 },
    { p: 0.95, z: 1.6449 },
    { p: 0.975, z: 1.96 },
    { p: 0.99, z: 2.3263 },
    { p: 0.995, z: 2.5758 },
    { p: 0.999, z: 3.0902 }
  ];

  function interpolateZ(p) {
    if (p <= zTable[0].p) {
      return zTable[0].z;
    }

    for (var i = 1; i < zTable.length; i += 1) {
      if (p <= zTable[i].p) {
        var prev = zTable[i - 1];
        var next = zTable[i];
        var ratio = (p - prev.p) / (next.p - prev.p);
        return prev.z + ratio * (next.z - prev.z);
      }
    }

    return zTable[zTable.length - 1].z;
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

    var zAlpha = interpolateZ(1 - alpha / 2);
    var zPower = interpolateZ(power);
    var pooledVariance = 2 * baselineRate * (1 - baselineRate);
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
  }

  Object.keys(fields).forEach(function (key) {
    fields[key].addEventListener("input", update);
  });

  update();
});
