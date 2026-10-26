"""Render the cheatsheet formulas as typeset equations (PNG) and record their sizes."""
import json
import sys

import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt

OUT = sys.argv[1]
TINT = "#EEF3FB"
plt.rcParams.update({"mathtext.fontset": "dejavusans", "font.family": "DejaVu Sans"})

M = r"\mathrm"
EQS = {
    "flow1": r"$\mathrm{Flow\ time} = \sum\ \mathrm{activity\ times}\quad(\mathrm{one\ line})$",
    "flow2": r"$\mathrm{Flow\ time} = \max_{\mathrm{routes}}\ \left(\sum\ \mathrm{times\ on\ route}\right)\quad(\mathrm{parallel})$",
    "unitload": r"$\mathrm{Unit\ load} = \sum\ \mathrm{times\ of\ ALL\ activities\ the\ resource\ does}$",
    "caprate": r"$\mathrm{Capacity} = \dfrac{60}{\mathrm{unit\ load\ (min)}}\ \mathrm{per\ hr} = \dfrac{3600}{\mathrm{unit\ load\ (s)}}\ \mathrm{per\ hr}$",
    "pool": r"$\mathrm{Pool\ capacity} = n \times \mathrm{capacity\ of\ one}$",
    "proc": r"$\mathrm{Process\ capacity} = \min\ \{\mathrm{capacities\ of\ all\ resources/pools}\}$",
    "thru": r"$\mathrm{Throughput} = \min\ \{\mathrm{input\ rate},\ \mathrm{process\ capacity}\}$",
    "util": r"$\mathrm{Utilization} = \dfrac{\mathrm{throughput}}{\mathrm{resource\ capacity}}\ \leq\ 100\%$",
    "implied": r"$\mathrm{Implied\ utilization} = \dfrac{\mathrm{input\ rate}}{\mathrm{resource\ capacity}}\quad(\mathrm{can\ be} > 100\%)$",
    "cycle": r"$\mathrm{Cycle\ time} = \dfrac{1}{\mathrm{throughput}}$",
    "qend": r"$Q_{\mathrm{end}} = \max\ \{0,\ Q_{\mathrm{start}} + \mathrm{input} - \mathrm{capacity}\}$",
    "slope": r"$\mathrm{Slope} = \mathrm{input\ rate} - \mathrm{capacity\ rate}\quad(\mathrm{while\ queue} > 0)$",
    "empty": r"$\mathrm{Time\ to\ empty} = \dfrac{\mathrm{queue\ size}}{\mathrm{capacity} - \mathrm{input}}$",
    "davg": r"$\mathrm{Discrete\ average} = \dfrac{\sum\ \mathrm{end\ of\ period\ queues}}{\mathrm{number\ of\ periods}}$",
    "cavg": r"$\mathrm{Continuous\ average} = \dfrac{\mathrm{area\ under\ graph}}{\mathrm{total\ time}}$",
    "little": r"$I = R \times T\qquad R = \dfrac{I}{T}\qquad T = \dfrac{I}{R}$",
    "comp": r"$C_i = W_i + p_i\qquad \sum C_i = \sum W_i + \sum p_i$",
    "spt": r"$\mathrm{SPT:\ order\ by\ smallest}\ p_i\qquad \mathrm{WSPT:\ order\ by\ smallest}\ \dfrac{p_i}{w_i}$",
    "mean": r"$E[X] = \sum_i\ x_i \cdot P(X = x_i)$",
    "var": r"$\mathrm{Var}(X) = E\,[(X - E[X])^2] = \sum_i\ (x_i - E[X])^2 \cdot P(X = x_i)$",
    "sdcv": r"$\sigma = \sqrt{\mathrm{Var}(X)}\qquad CV = \dfrac{\sigma}{E[X]}$",
    "rho1": r"$\rho = \dfrac{\lambda}{\mu} < 1$",
    "pk1": r"$I_q \approx \dfrac{\rho^2}{1 - \rho} \times \dfrac{C_A^2 + C_S^2}{2}$",
    "tq1": r"$T_q = \dfrac{I_q}{\lambda}\qquad T_s = \dfrac{1}{\mu}\qquad I_s = \dfrac{\lambda}{\mu} = \rho$",
    "sys1": r"$I = I_q + \rho\qquad T = T_q + \dfrac{1}{\mu} = \dfrac{I}{\lambda}$",
    "mm1": r"$\mathrm{M/M/1:}\ I_q = \dfrac{\rho^2}{1 - \rho} = \dfrac{\lambda^2}{\mu(\mu - \lambda)}\qquad \mathrm{M/D/1:}\ I_q = \dfrac{\rho^2}{2(1 - \rho)}$",
    "rhoc": r"$\rho = \dfrac{\lambda}{c\,\mu} < 1$",
    "pkc": r"$I_q \approx \dfrac{\rho^{\sqrt{2(c+1)}}}{1 - \rho} \times \dfrac{C_A^2 + C_S^2}{2}$",
    "tqc": r"$T_q = \dfrac{I_q}{\lambda}\qquad I_s = c\,\rho = \dfrac{\lambda}{\mu}\qquad T = T_q + \dfrac{1}{\mu}$",
}

sizes = {}
for key, tex in EQS.items():
    fig = plt.figure(figsize=(4, 0.5), dpi=600)
    fig.text(0, 0, tex, fontsize=6.0, color="#111111")
    fig.savefig(f"{OUT}/eq_{key}.png", dpi=600, bbox_inches="tight", pad_inches=0.012, facecolor=TINT)
    plt.close(fig)
    from PIL import Image
    w, h = Image.open(f"{OUT}/eq_{key}.png").size
    sizes[key] = [w / 600, h / 600]  # inches
json.dump(sizes, open(f"{OUT}/eq_sizes.json", "w"), indent=1)
print(len(sizes), "equations")
