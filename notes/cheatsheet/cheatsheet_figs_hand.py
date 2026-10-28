"""Small print-friendly figures for the DOTE 2030 cheatsheet (column width 2.5 in)."""
import math
import sys

import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
from matplotlib.patches import FancyBboxPatch

OUT = sys.argv[1]
BLUE, ORANGE, INK, INK2, GRID = "#2a78d6", "#eb6834", "#111111", "#52514e", "#dddddb"
W = 2.5
import os
from matplotlib import font_manager
for _f in os.listdir("/root/.local/share/fonts"):
    font_manager.fontManager.addfont("/root/.local/share/fonts/" + _f)
plt.rcParams.update({
    "font.family": ["Kalam", "DejaVu Sans"], "font.size": 4.6, "axes.linewidth": 0.4,
    "xtick.major.width": 0.4, "ytick.major.width": 0.4, "xtick.major.size": 1.5,
    "ytick.major.size": 1.5, "xtick.major.pad": 1, "ytick.major.pad": 1,
    "axes.labelpad": 1, "axes.titlepad": 2, "axes.edgecolor": INK2,
    "xtick.color": INK2, "ytick.color": INK2, "axes.labelcolor": INK2,
})


def style(ax):
    for s in ("top", "right"):
        ax.spines[s].set_visible(False)
    ax.grid(axis="y", color=GRID, linewidth=0.3)
    ax.set_axisbelow(True)


# ---------- Figure 1: continuous inventory build-up (lecture) + hospital trap
fig, (a, b) = plt.subplots(1, 2, figsize=(W, 1.05), dpi=600)
t, q = [10, 12, 14, 18], [0, 0, 200, 0]
a.fill_between(t, q, color=BLUE, alpha=0.18, lw=0)
a.plot(t, q, color=BLUE, lw=0.9)
a.axhline(75, color=INK, lw=0.5, ls=(0, (3, 2)))
a.text(17.95, 79, "average\n= 600 ÷ 8 = 75", ha="right", va="bottom", fontsize=4.0, color=INK)
a.text(12.15, 150, "slope\n+100/hr", fontsize=4.0, color=INK2, ha="right")
a.text(15.3, 160, "slope\n−50/hr", fontsize=4.0, color=INK2, ha="left")
a.text(13.35, 30, "area\n200", fontsize=3.9, ha="center", color=INK)
a.text(15.1, 30, "area\n400", fontsize=3.9, ha="center", color=INK)
a.plot([14, 14], [0, 200], color=INK2, lw=0.3, ls=(0, (2, 2)))
a.set_xticks([10, 12, 14, 16, 18]); a.set_xticklabels(["10am", "12", "2pm", "4", "6pm"])
a.set_ylim(0, 230); a.set_yticks([0, 100, 200])
a.set_title("Continuous build-up (cap 100/hr)", fontsize=4.8, color=INK, loc="left")
a.set_ylabel("queue"); style(a)

hours = [8, 11, 12, 12 + 50 / 60, 13]
b.fill_between([11, 12, 12 + 50 / 60], [0, 50, 0], color=ORANGE, alpha=0.2, lw=0)
b.plot(hours, [0, 0, 50, 0, 0], color=ORANGE, lw=0.9)
b.plot([12, 13], [50, 0], color=INK2, lw=0.5, ls=(0, (2, 1.5)))
b.text(8.05, 54, "dashed = wrong (empty at 1:00)", fontsize=3.9, color=INK2, ha="left")
b.annotate("empty at 12:50\n(50 ÷ 60/hr)", xy=(12 + 50 / 60, 0), xytext=(8.3, 22), fontsize=4.2,
           color=INK, arrowprops=dict(arrowstyle="-|>", lw=0.4, color=INK, mutation_scale=4))
b.text(11.45, 42, "+50/hr", fontsize=4.0, color=INK2, ha="right")
b.text(12.55, 40, "−60/hr", fontsize=4.0, color=INK2, ha="left")
b.set_xticks([8, 9, 10, 11, 12, 13]); b.set_xticklabels(["8", "9", "10", "11", "12", "1pm"])
b.set_ylim(0, 60); b.set_yticks([0, 25, 50])
b.set_title("SA8: avg = 45.83 ÷ 5 = 9.17", fontsize=4.8, color=INK, loc="left")
style(b)
fig.tight_layout(pad=0.2, w_pad=0.6)
fig.savefig(f"{OUT}/fig_inventory.png", facecolor="white")
plt.close(fig)

# ---------- Figure 2: Iq vs utilization + pooling vs separate queues
fig, (a, b) = plt.subplots(1, 2, figsize=(W, 1.1), dpi=600)
rho = [i / 1000 for i in range(1, 960)]
mm1 = [r * r / (1 - r) for r in rho]
md1 = [m / 2 for m in mm1]
a.plot(rho, mm1, color=BLUE, lw=0.9, label="exponential service (M/M/1)")
a.plot(rho, md1, color=ORANGE, lw=0.9, ls=(0, (3, 1.5)), label="constant service (M/D/1)")
for r, y, txt, col in [(0.8, 3.2, "3.2", BLUE), (0.9, 8.1, "8.1 (ρ 90%)", BLUE)]:
    a.plot([r], [y], "o", ms=1.8, color=col)
    a.text(r - 0.03, y + 0.6, txt, fontsize=4.0, ha="right", color=INK)
a.plot([0.8], [1.6], "o", ms=1.8, color=ORANGE)
a.text(0.83, 0.4, "1.6", fontsize=4.0, ha="left", color=INK)
a.set_xlim(0, 1); a.set_ylim(0, 20)
a.set_xticks([0, 0.5, 0.8, 1]); a.set_xticklabels(["0", "50%", "80%", "100%"])
a.set_xlabel("utilization ρ"); a.set_ylabel("people waiting I_q")
a.set_title("Queue explodes as ρ → 100%", fontsize=4.8, color=INK, loc="left")
a.legend(loc="upper left", fontsize=3.9, frameon=False, handlelength=1.6, borderaxespad=0.2)
style(a)

lam, mu = 5, 6
cs = list(range(1, 11))
sep = [c * (lam / (6 * c)) ** 2 / (1 - lam / (6 * c)) for c in cs]
pool = [(lam / (6 * c)) ** math.sqrt(2 * (c + 1)) / (1 - lam / (6 * c)) for c in cs]
b.plot(cs, sep, color=BLUE, lw=0.9, marker="o", ms=1.6, label="c separate queues")
b.plot(cs, pool, color=ORANGE, lw=0.9, ls=(0, (3, 1.5)), marker="s", ms=1.6, label="1 shared queue")
b.text(2.2, sep[1] + 0.25, f"{sep[1]:.2f}", fontsize=4.2, color=INK)
b.text(2.2, pool[1] + 0.25, f"{pool[1]:.2f}", fontsize=4.2, color=INK)
b.set_ylim(0, 4.5); b.set_xticks([1, 2, 4, 6, 8, 10])
b.set_xlabel("number of servers c"); b.set_ylabel("total waiting I_q")
b.set_title("Pooling (λ 5, μ 6 each)", fontsize=4.8, color=INK, loc="left")
b.legend(loc="upper right", fontsize=3.9, frameon=False, handlelength=1.6, borderaxespad=0.2)
style(b)
fig.tight_layout(pad=0.2, w_pad=0.6)
fig.savefig(f"{OUT}/fig_queues.png", facecolor="white")
plt.close(fig)

# ---------- Figure 3: parallel paths (HW1 Q1) with longest path highlighted
fig, ax = plt.subplots(figsize=(W, 0.62), dpi=600)
ax.set_xlim(-0.6, 10.6); ax.set_ylim(0, 2.6); ax.axis("off")
nodes = {"A": (1.15, 1.4, 5), "B": (2.9, 2.15, 3), "C": (2.9, 0.65, 5), "D": (4.8, 1.4, 2),
         "E": (6.7, 2.15, 5), "F": (6.7, 0.65, 7), "G": (8.45, 1.4, 3)}
crit = {"A", "C", "D", "F", "G"}
bw, bh = 1.45, 0.55
for k, (x, y, m) in nodes.items():
    on = k in crit
    ax.add_patch(FancyBboxPatch((x - bw / 2, y - bh / 2), bw, bh, boxstyle="round,pad=0.02,rounding_size=0.08",
                                fc="#fbe3d8" if on else "white", ec=ORANGE if on else INK2, lw=0.7 if on else 0.4))
    ax.text(x, y, f"{k}: {m} min", ha="center", va="center", fontsize=4.1, color=INK, fontweight="bold" if on else "normal")
edges = [("A", "B"), ("A", "C"), ("B", "D"), ("C", "D"), ("D", "E"), ("D", "F"), ("E", "G"), ("F", "G")]
for u, v in edges:
    (x1, y1, _), (x2, y2, _) = nodes[u], nodes[v]
    on = u in crit and v in crit
    ax.annotate("", xy=(x2 - bw / 2, y2), xytext=(x1 + bw / 2, y1),
                arrowprops=dict(arrowstyle="-|>", lw=0.8 if on else 0.4, color=ORANGE if on else INK2, mutation_scale=4))
ax.text(-0.6, 1.4, "START", fontsize=3.9, va="center", color=INK2)
ax.text(9.3, 1.4, "END", fontsize=3.9, va="center", color=INK2)
ax.text(5.0, 0.0, "Longest path A–C–D–F–G = 5+5+2+7+3 = 22 min = flow time (other paths 18, 20, 20)",
        ha="center", va="bottom", fontsize=3.9, color=INK)
fig.tight_layout(pad=0.1)
fig.savefig(f"{OUT}/fig_paths.png", facecolor="white")
plt.close(fig)
print("figures written")
