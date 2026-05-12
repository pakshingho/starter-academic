document.addEventListener("DOMContentLoaded", function () {
  var tool = document.getElementById("probability-tool");
  if (!tool) {
    return;
  }

  var fields = {
    example: document.getElementById("probability-tool-example"),
    delta: document.getElementById("probability-tool-delta"),
    reps: document.getElementById("probability-tool-reps"),
    snapshot: document.getElementById("probability-tool-snapshot")
  };

  var outputs = {
    exampleCopy: document.getElementById("probability-tool-example-copy"),
    target: document.getElementById("probability-tool-metric-target"),
    band: document.getElementById("probability-tool-metric-band"),
    small: document.getElementById("probability-tool-metric-small"),
    large: document.getElementById("probability-tool-metric-large"),
    inside: document.getElementById("probability-tool-metric-inside"),
    theory: document.getElementById("probability-tool-metric-theory"),
    notes: document.getElementById("probability-tool-notes"),
    error: document.getElementById("probability-tool-error"),
    tailChart: document.getElementById("probability-tool-tail-chart"),
    snapshotChart: document.getElementById("probability-tool-snapshot-chart"),
    tableBody: document.getElementById("probability-tool-table-body")
  };

  var buttons = {
    run: document.getElementById("probability-tool-run"),
    reset: document.getElementById("probability-tool-reset")
  };

  var presets = {
    "rare-jump": {
      label: "Rare jump to theta + 1",
      copy: "This is the note's toy example: the statistic equals the target almost all the time, but with probability 1/n it jumps by exactly one unit.",
      target: 2,
      defaultDelta: 0.5,
      defaultReps: 5000,
      defaultSnapshot: 100,
      sampleSizes: [10, 20, 50, 100, 250, 500, 1000],
      theory: function (n, delta) {
        return delta < 1 ? 1 / n : 0;
      },
      simulate: function (reps, delta, sampleSizes, snapshotN, rng) {
        var rows = [];
        var snapshot = [];
        var snapshotLimit = 150;
        var nIndex;
        var rep;
        var target = 2;

        for (nIndex = 0; nIndex < sampleSizes.length; nIndex += 1) {
          var n = sampleSizes[nIndex];
          var misses = 0;

          for (rep = 0; rep < reps; rep += 1) {
            var draw = rng.uniform() < 1 / n ? target + 1 : target;

            if (Math.abs(draw - target) > delta) {
              misses += 1;
            }

            if (n === snapshotN && snapshot.length < snapshotLimit) {
              snapshot.push(draw);
            }
          }

          rows.push({
            n: n,
            simulated: misses / reps,
            theory: delta < 1 ? 1 / n : 0
          });
        }

        return {
          target: target,
          rows: rows,
          snapshot: snapshot,
          note:
            "<p>In this example, a miss happens only when the rare jump occurs. That is why the theoretical line is exactly <strong>1/n</strong> whenever the tolerance is below 1.</p>" +
            "<p>The snapshot plot often shows a pile of draws right on the target and only a few orange misses, especially at larger n.</p>"
        };
      }
    },
    "sample-mean": {
      label: "Sample mean of iid N(0,1)",
      copy: "This is the law of large numbers in action. Each draw is noisy, but their average becomes more concentrated around zero as the sample size increases.",
      target: 0,
      defaultDelta: 0.1,
      defaultReps: 5000,
      defaultSnapshot: 100,
      sampleSizes: [10, 20, 50, 100, 250, 500, 1000],
      theory: function (n, delta) {
        return 2 * (1 - normalCdf(delta * Math.sqrt(n)));
      },
      simulate: function (reps, delta, sampleSizes, snapshotN, rng) {
        var counts = [];
        var snapshot = [];
        var snapshotLimit = 150;
        var maxN = sampleSizes[sampleSizes.length - 1];
        var rep;
        var step;

        for (step = 0; step < sampleSizes.length; step += 1) {
          counts.push(0);
        }

        for (rep = 0; rep < reps; rep += 1) {
          var cumulative = 0;
          var nextSizeIndex = 0;

          for (step = 1; step <= maxN; step += 1) {
            cumulative += rng.normal();

            if (step === snapshotN && snapshot.length < snapshotLimit) {
              snapshot.push(cumulative / step);
            }

            if (step === sampleSizes[nextSizeIndex]) {
              if (Math.abs(cumulative / step) > delta) {
                counts[nextSizeIndex] += 1;
              }

              nextSizeIndex += 1;
              if (nextSizeIndex >= sampleSizes.length) {
                break;
              }
            }
          }
        }

        return {
          target: 0,
          rows: sampleSizes.map(function (n, index) {
            return {
              n: n,
              simulated: counts[index] / reps,
              theory: 2 * (1 - normalCdf(delta * Math.sqrt(n)))
            };
          }),
          snapshot: snapshot,
          note:
            "<p>Here the exact distribution is known: <code>Ubar_n ~ N(0, 1/n)</code>. So the dashed line is the true tail probability <strong>2(1 - Phi(delta sqrt(n)))</strong>.</p>" +
            "<p>The shrinking orange share in the snapshot plot is the visual form of convergence in probability.</p>"
        };
      }
    }
  };

  var lastResult = null;
  var runCounter = 0;

  function showError(message) {
    outputs.error.hidden = false;
    outputs.error.textContent = message;
  }

  function clearError() {
    outputs.error.hidden = true;
    outputs.error.textContent = "";
  }

  function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
  }

  function formatProbability(value) {
    if (!isFinite(value)) {
      return "—";
    }

    if (value < 0.0001) {
      return "<0.0001";
    }

    return value.toFixed(4);
  }

  function formatPercent(value) {
    if (!isFinite(value)) {
      return "—";
    }

    return (value * 100).toFixed(2) + "%";
  }

  function formatNumber(value) {
    if (!isFinite(value)) {
      return "—";
    }

    if (Math.abs(value) >= 100) {
      return value.toFixed(0);
    }

    if (Math.abs(value) >= 10) {
      return value.toFixed(1);
    }

    return value.toFixed(2);
  }

  function mulberry32(seed) {
    var state = seed >>> 0;

    return function () {
      state = (state + 0x6D2B79F5) >>> 0;
      var t = Math.imul(state ^ (state >>> 15), 1 | state);
      t ^= t + Math.imul(t ^ (t >>> 7), 61 | t);

      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  function createRng(seed) {
    var uniform = mulberry32(seed);
    var spare = null;

    return {
      uniform: uniform,
      normal: function () {
        var u1;
        var u2;
        var radius;
        var angle;

        if (spare !== null) {
          var value = spare;
          spare = null;
          return value;
        }

        u1 = Math.max(uniform(), 1e-12);
        u2 = uniform();
        radius = Math.sqrt(-2 * Math.log(u1));
        angle = 2 * Math.PI * u2;
        spare = radius * Math.sin(angle);

        return radius * Math.cos(angle);
      }
    };
  }

  function normalCdf(x) {
    var sign = x < 0 ? -1 : 1;
    var absX = Math.abs(x) / Math.sqrt(2);
    var t = 1 / (1 + 0.3275911 * absX);
    var a1 = 0.254829592;
    var a2 = -0.284496736;
    var a3 = 1.421413741;
    var a4 = -1.453152027;
    var a5 = 1.061405429;
    var erf = 1 - (((((a5 * t + a4) * t) + a3) * t + a2) * t + a1) * t * Math.exp(-absX * absX);

    return 0.5 * (1 + sign * erf);
  }

  function updateSnapshotOptions(exampleKey, preferredValue) {
    var preset = presets[exampleKey];
    var selected = String(preferredValue || preset.defaultSnapshot);

    fields.snapshot.innerHTML = preset.sampleSizes.map(function (size) {
      var selectedAttr = String(size) === selected ? " selected" : "";
      return "<option value=\"" + size + "\"" + selectedAttr + ">" + size + "</option>";
    }).join("");
  }

  function applyPreset(exampleKey) {
    var preset = presets[exampleKey];

    outputs.exampleCopy.textContent = preset.copy;
    fields.delta.value = preset.defaultDelta.toFixed(2);
    fields.reps.value = String(preset.defaultReps);
    updateSnapshotOptions(exampleKey, preset.defaultSnapshot);
  }

  function uniqueTicks(values) {
    return values.filter(function (value, index, all) {
      return all.indexOf(value) === index;
    });
  }

  function buildSeriesPath(points, xScale, yScale) {
    return points.map(function (point, index) {
      return (index === 0 ? "M" : "L") + xScale(point.x).toFixed(2) + " " + yScale(point.y).toFixed(2);
    }).join(" ");
  }

  function buildTailChart(rows) {
    var width = 560;
    var height = 300;
    var padding = { top: 18, right: 18, bottom: 42, left: 58 };
    var plotWidth = width - padding.left - padding.right;
    var plotHeight = height - padding.top - padding.bottom;
    var logMin = Math.log(rows[0].n);
    var logMax = Math.log(rows[rows.length - 1].n);
    var maxY = rows.reduce(function (currentMax, row) {
      return Math.max(currentMax, row.simulated, row.theory || 0);
    }, 0);

    maxY = Math.max(maxY * 1.08, 0.05);

    function xScale(value) {
      return padding.left + ((Math.log(value) - logMin) / Math.max(logMax - logMin, 0.0001)) * plotWidth;
    }

    function yScale(value) {
      return padding.top + plotHeight - (value / maxY) * plotHeight;
    }

    var yTicks = [0, maxY / 4, maxY / 2, (3 * maxY) / 4, maxY];
    var grid = yTicks.map(function (tick) {
      var y = yScale(tick);

      return "<line x1=\"" + padding.left + "\" y1=\"" + y.toFixed(2) + "\" x2=\"" + (width - padding.right) + "\" y2=\"" + y.toFixed(2) + "\" class=\"probability-tool__chart-grid\"></line>" +
        "<text x=\"" + (padding.left - 10) + "\" y=\"" + (y + 4).toFixed(2) + "\" class=\"probability-tool__axis-label\">" + formatProbability(tick) + "</text>";
    }).join("");

    var xLabels = uniqueTicks(rows.map(function (row) {
      return row.n;
    })).map(function (value) {
      var x = xScale(value);

      return "<text x=\"" + x.toFixed(2) + "\" y=\"" + (height - 10) + "\" class=\"probability-tool__axis-label probability-tool__axis-label--x\">" + value + "</text>";
    }).join("");

    var simulatedPoints = rows.map(function (row) {
      return { x: row.n, y: row.simulated };
    });
    var theoryPoints = rows.map(function (row) {
      return { x: row.n, y: row.theory };
    });
    var circles = simulatedPoints.map(function (point) {
      return "<circle cx=\"" + xScale(point.x).toFixed(2) + "\" cy=\"" + yScale(point.y).toFixed(2) + "\" r=\"4\" fill=\"#0f766e\"></circle>";
    }).join("");

    return "<svg class=\"probability-tool__chart-svg\" viewBox=\"0 0 " + width + " " + height + "\" role=\"img\" aria-label=\"Miss probability as a function of sample size\">" +
      "<line x1=\"" + padding.left + "\" y1=\"" + (height - padding.bottom) + "\" x2=\"" + (width - padding.right) + "\" y2=\"" + (height - padding.bottom) + "\" class=\"probability-tool__chart-axis\"></line>" +
      "<line x1=\"" + padding.left + "\" y1=\"" + padding.top + "\" x2=\"" + padding.left + "\" y2=\"" + (height - padding.bottom) + "\" class=\"probability-tool__chart-axis\"></line>" +
      grid +
      "<path d=\"" + buildSeriesPath(simulatedPoints, xScale, yScale) + "\" fill=\"none\" stroke=\"#0f766e\" stroke-width=\"3\" stroke-linecap=\"round\" stroke-linejoin=\"round\"></path>" +
      "<path d=\"" + buildSeriesPath(theoryPoints, xScale, yScale) + "\" fill=\"none\" stroke=\"#2563eb\" stroke-width=\"2.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-dasharray=\"7 6\"></path>" +
      circles +
      xLabels +
      "</svg>" +
      "<div class=\"probability-tool__legend\">" +
      "<span class=\"probability-tool__legend-item\"><span class=\"probability-tool__legend-swatch\" style=\"background:#0f766e\"></span>Simulated</span>" +
      "<span class=\"probability-tool__legend-item\"><span class=\"probability-tool__legend-swatch\" style=\"background:#2563eb\"></span>Theoretical</span>" +
      "</div>";
  }

  function buildSnapshotChart(snapshotValues, target, delta) {
    var width = 560;
    var height = 300;
    var padding = { top: 18, right: 18, bottom: 42, left: 28 };
    var plotWidth = width - padding.left - padding.right;
    var plotHeight = height - padding.top - padding.bottom;
    var minValue = Math.min.apply(null, snapshotValues.concat([target - delta]));
    var maxValue = Math.max.apply(null, snapshotValues.concat([target + delta]));
    var range = Math.max(maxValue - minValue, delta * 1.2, 0.4);
    var xMin = minValue - 0.15 * range;
    var xMax = maxValue + 0.15 * range;

    function xScale(value) {
      return padding.left + ((value - xMin) / Math.max(xMax - xMin, 0.0001)) * plotWidth;
    }

    function yScale(index) {
      var row = index % 10;
      var stack = Math.floor(index / 10);
      var base = padding.top + plotHeight - ((row + 0.65) / 10) * plotHeight;
      return base - (stack % 2) * 4;
    }

    var bandLeft = xScale(target - delta);
    var bandRight = xScale(target + delta);
    var points = snapshotValues.map(function (value, index) {
      var inside = Math.abs(value - target) <= delta;
      return "<circle cx=\"" + xScale(value).toFixed(2) + "\" cy=\"" + yScale(index).toFixed(2) + "\" r=\"4.2\" fill=\"" + (inside ? "#0f766e" : "#f97316") + "\" opacity=\"0.88\"></circle>";
    }).join("");
    var xTicks = [xMin, target - delta, target, target + delta, xMax];
    var xLabels = uniqueTicks(xTicks.map(function (value) {
      return Number(value.toFixed(2));
    })).map(function (value) {
      var x = xScale(value);

      return "<text x=\"" + x.toFixed(2) + "\" y=\"" + (height - 10) + "\" class=\"probability-tool__axis-label probability-tool__axis-label--x\">" + formatNumber(value) + "</text>";
    }).join("");

    return "<svg class=\"probability-tool__chart-svg\" viewBox=\"0 0 " + width + " " + height + "\" role=\"img\" aria-label=\"Snapshot of simulated values for one sample size\">" +
      "<rect x=\"" + bandLeft.toFixed(2) + "\" y=\"" + padding.top + "\" width=\"" + Math.max(bandRight - bandLeft, 1).toFixed(2) + "\" height=\"" + plotHeight + "\" class=\"probability-tool__chart-band\"></rect>" +
      "<line x1=\"" + padding.left + "\" y1=\"" + (height - padding.bottom) + "\" x2=\"" + (width - padding.right) + "\" y2=\"" + (height - padding.bottom) + "\" class=\"probability-tool__chart-axis\"></line>" +
      "<line x1=\"" + xScale(target).toFixed(2) + "\" y1=\"" + padding.top + "\" x2=\"" + xScale(target).toFixed(2) + "\" y2=\"" + (height - padding.bottom) + "\" class=\"probability-tool__chart-target\"></line>" +
      points +
      xLabels +
      "<text x=\"" + xScale(target).toFixed(2) + "\" y=\"" + (padding.top + 12) + "\" class=\"probability-tool__marker-label\">target</text>" +
      "</svg>" +
      "<div class=\"probability-tool__legend\">" +
      "<span class=\"probability-tool__legend-item\"><span class=\"probability-tool__legend-swatch\" style=\"background:#0f766e\"></span>Inside band</span>" +
      "<span class=\"probability-tool__legend-item\"><span class=\"probability-tool__legend-swatch\" style=\"background:#f97316\"></span>Outside band</span>" +
      "</div>";
  }

  function render(result, preset, delta, snapshotN, reps) {
    var rows = result.rows;
    var selectedRow = rows.filter(function (row) {
      return row.n === snapshotN;
    })[0] || rows[rows.length - 1];

    outputs.target.textContent = formatNumber(result.target);
    outputs.band.textContent = "[" + formatNumber(result.target - delta) + ", " + formatNumber(result.target + delta) + "]";
    outputs.small.textContent = formatPercent(rows[0].simulated);
    outputs.large.textContent = formatPercent(rows[rows.length - 1].simulated);
    outputs.inside.textContent = formatPercent(1 - selectedRow.simulated);
    outputs.theory.textContent = formatPercent(rows[rows.length - 1].theory);
    outputs.notes.innerHTML =
      "<p><strong>" + preset.label + ".</strong> This run used <strong>" + reps.toLocaleString("en-US") + "</strong> repetitions and the snapshot plot is drawn at <strong>n = " + snapshotN + "</strong>.</p>" +
      result.note;
    outputs.tailChart.innerHTML = buildTailChart(rows);
    outputs.snapshotChart.innerHTML = buildSnapshotChart(result.snapshot, result.target, delta);
    outputs.tableBody.innerHTML = rows.map(function (row) {
      var highlightClass = row.n === snapshotN ? " class=\"probability-tool__table-row--highlight\"" : "";
      return "<tr" + highlightClass + ">" +
        "<td>" + row.n + "</td>" +
        "<td>" + formatProbability(row.simulated) + "</td>" +
        "<td>" + formatProbability(row.theory) + "</td>" +
        "</tr>";
    }).join("");
  }

  function runSimulation() {
    var preset = presets[fields.example.value];
    var delta = Number(fields.delta.value);
    var reps = Number(fields.reps.value);
    var snapshotN = Number(fields.snapshot.value);
    var rngSeed = 20260419 + runCounter * 97;
    var result;

    clearError();

    if (!(delta > 0)) {
      showError("Choose a positive tolerance delta.");
      return;
    }

    if (!(reps >= 500 && reps <= 20000)) {
      showError("Choose repetitions between 500 and 20,000.");
      return;
    }

    if (!snapshotN) {
      showError("Choose a snapshot sample size.");
      return;
    }

    runCounter += 1;
    result = preset.simulate(reps, delta, preset.sampleSizes, snapshotN, createRng(rngSeed));
    lastResult = {
      result: result,
      preset: preset,
      delta: delta,
      reps: reps,
      snapshotN: snapshotN
    };
    render(result, preset, delta, snapshotN, reps);
  }

  fields.example.addEventListener("change", function () {
    applyPreset(fields.example.value);
    runSimulation();
  });

  fields.snapshot.addEventListener("change", function () {
    if (!lastResult) {
      runSimulation();
      return;
    }

    lastResult.snapshotN = Number(fields.snapshot.value);
    lastResult.result = lastResult.preset.simulate(
      lastResult.reps,
      lastResult.delta,
      lastResult.preset.sampleSizes,
      lastResult.snapshotN,
      createRng(20260419 + runCounter * 97)
    );
    render(lastResult.result, lastResult.preset, lastResult.delta, lastResult.snapshotN, lastResult.reps);
  });

  buttons.run.addEventListener("click", runSimulation);

  buttons.reset.addEventListener("click", function () {
    applyPreset(fields.example.value);
    runSimulation();
  });

  applyPreset(fields.example.value);
  runSimulation();
});
