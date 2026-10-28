// Build the DOTE 2030 midterm cheatsheet as a 3-column, 6pt Word document.
const fs = require("fs");
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, WidthType,
  ShadingType, BorderStyle, LevelFormat, AlignmentType, SectionType, LineRuleType,
} = require("docx");

const OUT = process.argv[2];
const SZ = 16;            // 8pt in half-points
const FONT = "Arial";
const INK = "111111", ACCENT = "1D5FB4", WARN = "A3330F", TINT = "EEF3FB", WTINT = "FBEFE9";
const PAGE_W = 11906, MARGIN = 620, GAP = 360;
const COL_W = Math.floor((PAGE_W - 2 * MARGIN - GAP) / 2);

// Inline markup: **bold**, *italic*, _{sub}, ^{sup}
function runs(text, base = {}) {
  const out = [];
  const re = /(\*\*[^*]+\*\*|\*[^*]+\*|_\{[^}]+\}|\^\{[^}]+\})/g;
  let last = 0, m;
  const push = (t, extra = {}) => t && out.push(new TextRun({ text: t, font: FONT, size: SZ, ...base, ...extra }));
  while ((m = re.exec(text))) {
    push(text.slice(last, m.index));
    const tok = m[0];
    if (tok.startsWith("**")) push(tok.slice(2, -2), { bold: true });
    else if (tok.startsWith("*")) push(tok.slice(1, -1), { italics: true });
    else if (tok.startsWith("_{")) push(tok.slice(2, -1), { subScript: true });
    else push(tok.slice(2, -1), { superScript: true });
    last = m.index + tok.length;
  }
  push(text.slice(last));
  return out;
}

const sp = { before: 0, after: 10, line: 200, lineRule: LineRuleType.AT_LEAST };
const H = (t) => new Paragraph({
  children: [new TextRun({ text: t, font: FONT, size: SZ + 2, bold: true, color: "FFFFFF" })],
  shading: { type: ShadingType.CLEAR, color: "auto", fill: INK },
  spacing: { before: 50, after: 20, line: 200, lineRule: LineRuleType.AT_LEAST }, keepNext: true,
});
const H3 = (t) => new Paragraph({
  children: [new TextRun({ text: t, font: FONT, size: SZ, bold: true, color: ACCENT })],
  spacing: { before: 20, after: 6, line: 200, lineRule: LineRuleType.AT_LEAST }, keepNext: true,
});
const P = (t, base) => new Paragraph({ children: runs(t, base), spacing: sp });
const B = (t) => new Paragraph({ children: runs(t), numbering: { reference: "dots", level: 0 }, spacing: { before: 0, after: 4, line: 200, lineRule: LineRuleType.AT_LEAST } });
const box = (fill, color) => (lines) => lines.map((t, i) => new Paragraph({
  children: runs(t, { bold: fill === TINT }),
  shading: { type: ShadingType.CLEAR, color: "auto", fill },
  border: { left: { style: BorderStyle.SINGLE, size: 12, color, space: 2 } },
  spacing: { before: i === 0 ? 10 : 0, after: i === lines.length - 1 ? 16 : 0, line: 200, lineRule: LineRuleType.AT_LEAST },
  indent: { left: 60 },
}));
const F = box(TINT, ACCENT);
const W = box(WTINT, WARN);
const X = box("F3F3F0", "888888");

const cellBorder = { style: BorderStyle.SINGLE, size: 2, color: "BBBBBB" };
function T(rows, fracs, { header = true } = {}) {
  const widths = fracs.map((f) => Math.floor(COL_W * f));
  widths[widths.length - 1] = COL_W - widths.slice(0, -1).reduce((a, b) => a + b, 0);
  return new Table({
    width: { size: COL_W, type: WidthType.DXA },
    columnWidths: widths,
    rows: rows.map((r, ri) => new TableRow({
      cantSplit: true, tableHeader: header && ri === 0,
      children: r.map((c, ci) => new TableCell({
        width: { size: widths[ci], type: WidthType.DXA },
        margins: { top: 10, bottom: 10, left: 40, right: 40 },
        borders: { top: cellBorder, bottom: cellBorder, left: cellBorder, right: cellBorder },
        shading: header && ri === 0 ? { type: ShadingType.CLEAR, color: "auto", fill: "EFEFEB" } : undefined,
        children: [new Paragraph({ children: runs(c, header && ri === 0 ? { bold: true } : {}), spacing: { before: 0, after: 0, line: 200, lineRule: LineRuleType.AT_LEAST } })],
      })),
    })),
  });
}
const gap = () => new Paragraph({ children: [], spacing: { before: 0, after: 16, line: 120 } });


// ===================== CONDENSED SHEET TO COPY BY HAND (v4) =====================
const { ImageRun } = require("docx");
const EQDIR = process.env.EQDIR, FIGDIR = process.env.FIGDIR;
const EQSIZE = JSON.parse(fs.readFileSync(`${EQDIR}/eq_sizes.json`, "utf8"));
const EQSCALE = 1.4;
function FE(items) {
  const maxW = COL_W / 1440 - 0.15;
  return items.map((it, i) => {
    let children;
    if (typeof it === "string") children = runs(it, { bold: true });
    else {
      const [key, note] = it;
      let [w, h] = EQSIZE[key].map((v) => v * EQSCALE);
      if (w > maxW) { h *= maxW / w; w = maxW; }
      children = [new ImageRun({ type: "png", data: fs.readFileSync(`${EQDIR}/eq_${key}.png`),
        transformation: { width: Math.round(w * 96), height: Math.round(h * 96) }, altText: { title: key, description: key, name: key } })];
      if (note) {
        const fits = w + 0.055 * (note.length + 2) <= maxW;
        if (!fits) children.push(new TextRun({ break: 1, text: "", size: SZ }));
        children.push(...runs((fits ? "  " : "") + note, { color: "444444" }));
      }
    }
    return new Paragraph({
      children,
      shading: { type: ShadingType.CLEAR, color: "auto", fill: TINT },
      border: { left: { style: BorderStyle.SINGLE, size: 12, color: ACCENT, space: 3 } },
      spacing: { before: i === 0 ? 20 : 0, after: i === items.length - 1 ? 30 : 4, line: 200, lineRule: LineRuleType.AT_LEAST },
      indent: { left: 80 },
    });
  });
}
function IMG(name, ratio, widthIn) {
  const w = Math.min(widthIn, COL_W / 1440 - 0.1);
  return new Paragraph({ alignment: AlignmentType.CENTER, keepLines: true, spacing: { before: 20, after: 30 },
    children: [new ImageRun({ type: "png", data: fs.readFileSync(`${FIGDIR}/${name}.png`),
      transformation: { width: Math.round(w * 96), height: Math.round(w * ratio * 96) }, altText: { title: name, description: name, name } })] });
}
// priority tag at the start of a heading
const PH = (n, t) => H(`${["", "①", "②", "③"][n]}  ${t}`);

const c = [];
const title = new Paragraph({
  children: [
    new TextRun({ text: "DOTE 2030 Midterm — condensed sheet to copy by hand (Lectures 2–5)", font: FONT, size: 22, bold: true }),
    new TextRun({ break: 1, text: "Copy in priority order: ① sections first, then ②, then ③ if you have space. Blue = formula, grey = example, orange = trap. Sketch the graphs roughly, only the shape and labels matter.", font: FONT, size: SZ, color: "444444" }),
  ],
  border: { bottom: { style: BorderStyle.SINGLE, size: 8, color: INK, space: 2 } },
  spacing: { before: 0, after: 60 },
});

// ---------- 1 Flow time & capacity
c.push(PH(1, "Flow time, capacity, bottleneck (L2)"));
c.push(...FE([["flow1"], ["flow2", "parallel ⇒ longest route"], ["unitload", "shared activity ⇒ add to BOTH"], ["caprate"], ["pool"], ["proc", "= bottleneck"]]));
c.push(B("**Find bottleneck**: list every resource (people + machines) → add its activity times → 60 ÷ load → ×pool size → smallest wins."));
c.push(B("Pooled activity counted **once** in flow time. **Never** capacity = 1 ÷ flow time."));
c.push(B("Help bottleneck: pool it, or cut its unit load. Stop when it ties the **next** bottleneck."));
c.push(...X([
  "Burger ∥ fries: 1 + max(7, 4) + 1 = **9 min** (not 13).",
  "HW1 Q4: saw 30, Emp1 40+10 = **50**, crane 10, Emp2 60 ⇒ capacities 2, 1.2, 6, **1**/hr ⇒ bottleneck Emp2.",
]));

c.push(PH(1, "Throughput & utilization (L2)"));
c.push(...FE([["thru"], ["util", "uses throughput"], ["implied", "uses input"], ["cycle"]]));
c.push(B("**Profit**: new capacity (= new min) × $ per unit − hourly costs; compare with now."));
c.push(...X(["SA1(e): A 10, B 20, C 15 min ⇒ 6, **3**, 4/hr: $30/hr. Rent 2nd B ($14) ⇒ C limits at 4/hr: $40 − 14 = $26 ⇒ don't rent."]));

// ---------- 2 Inventory
c.push(PH(1, "Inventory build-up (L3)"));
c.push(...FE([["qend", "discrete"], ["slope", "continuous"], ["empty"], ["davg"], ["cavg"]]));
c.push(B("**Stable**: long-run average input ≤ capacity. Short bursts above capacity still make temporary queues."));
c.push(B("Areas: triangle ½·b·h, rectangle b·h. Divide by the **whole** time window."));
c.push(IMG("fig_inventory", 630 / 1500, 3.2));
c.push(...X(["Lecture: 0 → 200 (+100/hr, 12–2) → 0 (−50/hr, 2–6) ⇒ area 600 ÷ 8 hr = **75**."]));
c.push(...W(["Review SA8: queue empties at **12:50** (slope −60/hr), not 1:00 ⇒ avg **9.17**, not 10."]));

// ---------- 3 Little
c.push(PH(1, "Little's Law (L3)"));
c.push(...FE([["little"]]));
c.push(B("Same part of the process (queue only: I_{q} = R·T_{q}) and same time units."));
c.push(...X(["Rocks: 12/hr × 10 min (1/6 hr) = **2**. I = 4 waiting + 1 crushing = 5, T = 20 min ⇒ R = **0.25/min**."]));

// ---------- 4 Scheduling
c.push(PH(1, "Scheduling: SPT & WSPT (L4)"));
c.push(...FE([["comp"], ["spt"]]));
c.push(B("C_{i} = running total of the **real** p_{i}. ΣW = ΣC − Σp. Weighted: Σw_{i}W_{i} = Σw_{i}C_{i} − Σw_{i}p_{i}."));
c.push(...X(["p = 6, 5, 8, 15 ⇒ order 2, 1, 3, 4 ⇒ C = 5, 11, 19, 34 ⇒ ΣC **69**, ΣW **35**. Weights 4, 1, 2, 1 ⇒ p/w 1.5, 5, 4, 15 ⇒ order 1, 3, 2, 4."]));

// ---------- 5 Probability
c.push(PH(1, "Probability (L4)"));
c.push(...FE([["mean"], ["var"], ["sdcv"]]));
c.push(T([
  ["", "Poisson (count)", "Exponential (time)", "Constant"],
  ["Mean", "m", "1/λ", "value"],
  ["Std dev", "√m", "1/λ (= mean)", "0"],
  ["CV", "1/√m", "**1**", "**0**"],
], [0.16, 0.28, 0.32, 0.24]));
c.push(B("Poisson arrivals ⇔ exponential gaps. Mean = std dev alone does **not** prove exponential."));

// ---------- 6 Single-server
c.push(PH(1, "Single-server queue (L4)"));
c.push(...FE([["rho1"], ["pk1", "people WAITING"], ["tq1"], ["sys1", "incl. being served"], ["mm1"]]));
c.push(B("**CV**: \"exponential\" ⇒ 1; \"exactly / constant\" ⇒ 0; else std dev ÷ mean of the TIME. Names X/Y/c: M = exponential, D = constant, G = general."));
c.push(B("**Steps**: one time unit → ρ (check < 1) → C_{A}, C_{S} → I_{q} → T_{q} = I_{q}/λ (× 60 for min) → add ρ or 1/μ if \"in system\"."));
c.push(...X([
  "λ = 4/hr, 10 min service (μ = 6), exponential: ρ = 2/3 ⇒ I_{q} = 4/3, T_{q} = **20 min**. Constant service: I_{q} = 2/3, T_{q} = **10 min**.",
  "Drive-through λ 20, μ 30: I_{q} 4/3, I = 2, T_{q} 4 min, T **6 min**.",
]));

// ---------- 7 Multi-server
c.push(PH(1, "Multi-server queue, ONE shared line (L5)"));
c.push(...FE([["rhoc"], ["pkc"], ["tqc", "I_{s} = busy servers"]]));
c.push(T([
  ["c", "1", "2", "3", "4", "5"],
  ["√(2(c+1))", "2", "2.449", "2.828", "3.162", "3.464"],
], [0.25, 0.15, 0.15, 0.15, 0.15, 0.15]));
c.push(B("**Pooling**: one shared line always beats c separate lines with the same total demand and capacity."));
c.push(...X([
  "Card office λ 90, μ 20, c 5: ρ 0.9 ⇒ I_{q} = 0.9^{3.464}/0.1 = **6.94**, T_{q} = **4.63 min**.",
  "Bank: separate (5/10, 15/20) ⇒ ½ + 9/4 = **2.75**; shared M/M/2 (λ 20, μ 15) ⇒ ρ 2/3 ⇒ **1.11**.",
]));

// ---------- 8 Traps
c.push(PH(1, "True/False traps (review)"));
c.push(...W([
  "F: flow time = every unit's time (it's the minimum). F: shorten ANY task ⇒ capacity ↑ (only bottleneck's).",
  "F: input > capacity ⇒ utilization > 100% (that's IMPLIED). F: throughput = capacity ⇒ must build inventory.",
  "F: activities have capacity (only resources). Handsaw trap: the person doing 2 + 1 hr is the bottleneck.",
  "F: ρ ↑ ⇒ I_{q} ↓. T: D/D/1 ⇒ I_{q} = 0. F: double λ and μ ⇒ I_{q} × 2 (it's × 4).",
  "T: implied utilization > 100% ⇒ inventory builds. T: Poisson 15/hr ⇒ gap std dev 4 min.",
]));

// ---------- ② sections
c.push(PH(2, "Utilization vs variability · OM triangle"));
c.push(IMG("fig_queues", 660 / 1500, 3.2));
c.push(B("M/M/1 I_{q} at ρ 50 / 80 / 90 / 95%: 0.5 / 3.2 / 8.1 / 18.05. High utilization + variability ⇒ long queues."));
c.push(B("**OM triangle**: capacity (add servers) · inventory (let queue form) · information (cut variability, e.g. scheduling)."));
c.push(B("λ 8: 6 min exp ⇒ 24 min wait; 5 min exp ⇒ 10 min; 6 min constant ⇒ 12 min."));

c.push(PH(2, "More examples worth copying"));
c.push(...X([
  "Bank SA11(c): W1 4+2 = 6 min, W2 3+7 = 10 min ⇒ 6/hr: 6×$10 − $40 = $20. Hire W3 for act 3 or 4 ⇒ 8.57/hr: $85.7 − $60 = $25.7 ⇒ hire.",
  "HW1 Q4(c): 2 cars/hr ⇒ every load ≤ 30 min ⇒ QA −30 min ($300) + assemble −20 min ($200) = **$500**.",
  "Discrete POS: in 15, 32, 39, 10 vs cap 30 ⇒ queues 0, 2, 11, 0 ⇒ 13/4 = **3.25**.",
  "Airport separate lines 3, 6, 30 min ⇒ weighted 17.07 min; merged M/M/3 ρ 58/90 ⇒ **2.84 min**.",
]));

c.push(PH(2, "Review answer-key slips"));
c.push(...W(["SA8 avg = 9.17 (not 10). SA1(a) bottleneck is B. SA1(b) cycle time = 1/3 hr = 20 min. SA12(f) std dev = 1/48 day."]));

// ---------- ③ sections
c.push(PH(3, "Shouldice (L3)"));
c.push(B("Weekly: beds 210, surgeons 240, **ORs 200** (bottleneck; ≤ 40 ops/day). Now 150/wk, I = 150 × 3/7 ≈ 64. Best weekday plan 40, 40, 10, 40, 40 = **170** max (40 + 90 + 40)."));
c.push(PH(3, "Matching (L5)"));
c.push(B("Platform picks when and whom to match. Suspense + surprise ⇒ match similar skill. Trade-off: better matches vs longer waits."));
const doc = new Document({
  creator: "DOTE 2030 study notes",
  title: "DOTE 2030 Midterm Cheatsheet",
  styles: { default: { document: { run: { font: FONT, size: SZ } } } },
  numbering: { config: [{ reference: "dots", levels: [{ level: 0, format: LevelFormat.BULLET, text: "•", alignment: AlignmentType.LEFT,
    style: { paragraph: { indent: { left: 140, hanging: 110 } } } }] }] },
  sections: [{
    properties: {
      page: { size: { width: PAGE_W, height: 16838 }, margin: { top: MARGIN, bottom: MARGIN, left: MARGIN, right: MARGIN } },
    },
    children: [title],
  }, {
    properties: {
      type: SectionType.CONTINUOUS,
      page: { size: { width: PAGE_W, height: 16838 }, margin: { top: MARGIN, bottom: MARGIN, left: MARGIN, right: MARGIN } },
      column: { count: 2, space: GAP, separate: true },
    },
    children: c,
  }],
});

Packer.toBuffer(doc).then((buf) => { fs.writeFileSync(OUT, buf); console.log("wrote", OUT); });
