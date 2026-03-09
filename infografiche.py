"""
INFOGRAFICHE — Social Media & Adolescenti
Tesi di ricerca — Marco Fracchetti
6 grafici per ogni domanda, estetica dark/research
"""

import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import matplotlib.patches as mpatches
import matplotlib.patheffects as pe
from matplotlib.patches import FancyArrowPatch
import matplotlib.gridspec as gridspec
import numpy as np
import pandas as pd
from scipy.ndimage import gaussian_filter1d
import warnings
warnings.filterwarnings('ignore')

# ─────────────────────────────────────────────
#  PALETTE & STILE GLOBALE
# ─────────────────────────────────────────────
BG        = '#080c10'
SURFACE   = '#0d1219'
SURFACE2  = '#131b24'
BORDER    = '#1a2535'
ACCENT    = '#3b82f6'   # blu
ACCENT2   = '#06d6a0'   # verde
ACCENT3   = '#f72585'   # magenta
ACCENT4   = '#ffd166'   # giallo
ACCENT5   = '#a855f7'   # viola
TEXT      = '#e8f0fe'
TEXT_DIM  = '#4a6080'
COLORS    = [ACCENT, ACCENT2, ACCENT3, ACCENT4, ACCENT5]

plt.rcParams.update({
    'figure.facecolor':  BG,
    'axes.facecolor':    BG,
    'axes.edgecolor':    BORDER,
    'axes.labelcolor':   TEXT,
    'text.color':        TEXT,
    'xtick.color':       TEXT_DIM,
    'ytick.color':       TEXT_DIM,
    'grid.color':        BORDER,
    'grid.linewidth':    0.5,
    'font.family':       'monospace',
    'font.size':         10,
    'savefig.facecolor': BG,
    'savefig.bbox':      'tight',
    'savefig.dpi':       150,
})

# ─────────────────────────────────────────────
#  DATI DI ESEMPIO
#  Sostituisci con i tuoi CSV reali
# ─────────────────────────────────────────────
DOMANDA = "I social influenzano la tua autostima?"

# Risposte per profilo: { label: { opzione: count } }
DATA = {
    'Adolescenti': {'Sì': 42, 'No': 18, 'Non so': 20},
    'Genitori':    {'Sì': 55, 'No': 12, 'Non so': 13},
    'Insegnanti':  {'Sì': 38, 'No': 22, 'Non so': 10},
    'Psicologi':   {'Sì': 61, 'No':  8, 'Non so': 11},
}

OPTIONS   = ['Sì', 'No', 'Non so']
PROFILES  = list(DATA.keys())
N_TOTAL   = sum(sum(v.values()) for v in DATA.values())

# Flatten totali per opzione
TOTALS = {opt: sum(DATA[p].get(opt, 0) for p in PROFILES) for opt in OPTIONS}

# ─────────────────────────────────────────────
#  HELPERS
# ─────────────────────────────────────────────
def glow_text(ax, x, y, txt, size=11, weight='bold', color=TEXT, ha='left', va='center', glow_color=None):
    gc = glow_color or ACCENT
    t = ax.text(x, y, txt, fontsize=size, fontweight=weight,
                color=color, ha=ha, va=va, transform=ax.transAxes)
    t.set_path_effects([
        pe.withStroke(linewidth=6, foreground=gc + '30'),
        pe.Normal()
    ])
    return t

def add_header(fig, domanda, grafico_nome, grafico_num):
    fig.text(0.04, 0.96, f'GRAFICO {grafico_num}/6 — {grafico_nome.upper()}',
             fontsize=9, color=ACCENT, fontfamily='monospace',
             fontweight='bold', va='top')
    fig.text(0.04, 0.91, domanda,
             fontsize=15, color=TEXT, fontfamily='monospace',
             fontweight='bold', va='top', wrap=True)
    fig.text(0.04, 0.86, f'N={N_TOTAL} risposte  ·  4 profili  ·  {len(OPTIONS)} opzioni',
             fontsize=8, color=TEXT_DIM, fontfamily='monospace', va='top')
    # linea decorativa
    fig.add_artist(plt.Line2D([0.04, 0.96], [0.84, 0.84],
                              transform=fig.transFigure,
                              color=BORDER, linewidth=1))

def watermark(fig):
    fig.text(0.96, 0.02, 'FRACCHETTI MARCO — RICERCA TESI',
             fontsize=7, color=TEXT_DIM, ha='right', fontfamily='monospace')


# ══════════════════════════════════════════════
#  GRAFICO 1 — DONUT / TORTA
# ══════════════════════════════════════════════
def grafico_donut():
    fig = plt.figure(figsize=(14, 9))
    add_header(fig, DOMANDA, 'Donut — Distribuzione risposte', 1)

    # 4 donut (uno per profilo) + 1 centrale (totale)
    positions = [(0.14,0.42), (0.37,0.42), (0.60,0.42), (0.83,0.42)]
    r = 0.13

    for i, prof in enumerate(PROFILES):
        vals  = [DATA[prof].get(o, 0) for o in OPTIONS]
        total = sum(vals)
        cx, cy = positions[i]

        ax = fig.add_axes([cx - r, cy - r, r*2, r*2])
        ax.set_facecolor(BG)

        wedges, _ = ax.pie(
            vals,
            colors=COLORS[:len(OPTIONS)],
            startangle=90,
            wedgeprops=dict(width=0.45, edgecolor=BG, linewidth=2)
        )

        # Glow effect: aggiungi wedges fantasma
        for w, c in zip(wedges, COLORS):
            w.set_path_effects([pe.withStroke(linewidth=3, foreground=c + '40'), pe.Normal()])

        # Centro: label profilo
        ax.text(0, 0.12, prof, ha='center', va='center',
                fontsize=8, fontweight='bold', color=TEXT, fontfamily='monospace')
        ax.text(0, -0.18, f'n={total}', ha='center', va='center',
                fontsize=7, color=TEXT_DIM, fontfamily='monospace')

        # Percentuali attorno
        for j, (val, opt) in enumerate(zip(vals, OPTIONS)):
            pct = val / total * 100 if total else 0
            angle = 90 - (sum(vals[:j]) + val/2) / total * 360
            rad = np.radians(angle)
            xp = 0.75 * np.cos(rad)
            yp = 0.75 * np.sin(rad)
            ax.text(xp, yp, f'{pct:.0f}%', ha='center', va='center',
                    fontsize=7, color=COLORS[j], fontfamily='monospace', fontweight='bold')

    # Legenda
    handles = [mpatches.Patch(color=COLORS[i], label=opt) for i, opt in enumerate(OPTIONS)]
    fig.legend(handles=handles, loc='lower center', ncol=len(OPTIONS),
               frameon=False, fontsize=9,
               labelcolor=TEXT, bbox_to_anchor=(0.5, 0.04))

    watermark(fig)
    plt.savefig('/mnt/user-data/outputs/grafico_1_donut.svg', format='svg')
    plt.savefig('/mnt/user-data/outputs/grafico_1_donut.png', format='png', dpi=150)
    plt.close()
    print('✓ Grafico 1 — Donut')


# ══════════════════════════════════════════════
#  GRAFICO 2 — SCATTER / XY
# ══════════════════════════════════════════════
def grafico_scatter():
    fig, ax = plt.subplots(figsize=(14, 9))
    fig.subplots_adjust(top=0.80, left=0.1, right=0.92, bottom=0.1)
    add_header(fig, DOMANDA, 'Scatter — Risposte per profilo', 2)

    np.random.seed(42)
    y_map = {opt: i for i, opt in enumerate(OPTIONS)}

    for pi, prof in enumerate(PROFILES):
        vals = [DATA[prof].get(o, 0) for o in OPTIONS]
        total = sum(vals)
        color = COLORS[pi]

        for oi, (opt, count) in enumerate(zip(OPTIONS, vals)):
            # Genera punti con jitter
            n = count
            xs = np.random.normal(pi, 0.18, n)
            ys = np.random.normal(oi, 0.12, n)

            ax.scatter(xs, ys, s=28, color=color, alpha=0.55,
                       edgecolors='none', zorder=3)

            # Punto medio grande (centroide)
            ax.scatter(pi, oi, s=200, color=color, alpha=0.9,
                       edgecolors=BG, linewidths=2, zorder=5)

            # Count label
            ax.text(pi + 0.22, oi, f'{count}',
                    fontsize=8, color=color, va='center',
                    fontfamily='monospace', fontweight='bold')

    # Griglia orizzontale
    for oi, opt in enumerate(OPTIONS):
        ax.axhline(oi, color=BORDER, linewidth=0.8, zorder=1)
        ax.text(-0.55, oi, opt, fontsize=9, color=TEXT_DIM,
                va='center', fontfamily='monospace')

    ax.set_xlim(-0.8, len(PROFILES) - 0.3)
    ax.set_ylim(-0.6, len(OPTIONS) - 0.4)
    ax.set_xticks(range(len(PROFILES)))
    ax.set_xticklabels(PROFILES, fontsize=9)
    ax.set_yticks([])
    ax.spines[['top','right','left']].set_visible(False)
    ax.spines['bottom'].set_color(BORDER)

    # Linee verticali profilo
    for pi in range(len(PROFILES)):
        ax.axvline(pi, color=BORDER, linewidth=0.5, linestyle='--', zorder=1)

    # Legenda colori profili
    handles = [mpatches.Patch(color=COLORS[i], label=p) for i, p in enumerate(PROFILES)]
    ax.legend(handles=handles, frameon=False, fontsize=8,
              labelcolor=TEXT, loc='upper right')

    watermark(fig)
    plt.savefig('/mnt/user-data/outputs/grafico_2_scatter.svg', format='svg')
    plt.savefig('/mnt/user-data/outputs/grafico_2_scatter.png', format='png', dpi=150)
    plt.close()
    print('✓ Grafico 2 — Scatter')


# ══════════════════════════════════════════════
#  GRAFICO 3 — RADAR / SPIDER
# ══════════════════════════════════════════════
def grafico_radar():
    fig = plt.figure(figsize=(14, 9))
    add_header(fig, DOMANDA, 'Radar — Confronto tra profili', 3)

    ax = fig.add_subplot(111, polar=True)
    ax.set_facecolor(BG)
    fig.patch.set_facecolor(BG)
    fig.subplots_adjust(top=0.78, bottom=0.08)

    N = len(OPTIONS)
    angles = np.linspace(0, 2 * np.pi, N, endpoint=False).tolist()
    angles += angles[:1]

    # Griglia
    ax.set_theta_offset(np.pi / 2)
    ax.set_theta_direction(-1)
    ax.set_xticks(angles[:-1])
    ax.set_xticklabels(OPTIONS, fontsize=10, color=TEXT, fontfamily='monospace')
    ax.set_yticklabels([])
    ax.spines['polar'].set_color(BORDER)
    ax.grid(color=BORDER, linewidth=0.8)

    # Cerchi griglia colorati
    max_val = max(max(v.values()) for v in DATA.values())
    for r_pct in [0.25, 0.5, 0.75, 1.0]:
        circle = plt.Circle((0, 0), r_pct * max_val,
                             transform=ax.transData._b,
                             fill=False, color=BORDER, linewidth=0.5)

    for pi, prof in enumerate(PROFILES):
        vals = [DATA[prof].get(o, 0) for o in OPTIONS]
        vals += vals[:1]
        color = COLORS[pi]

        ax.plot(angles, vals, color=color, linewidth=2, zorder=4,
                path_effects=[pe.withStroke(linewidth=5, foreground=color + '30'), pe.Normal()])
        ax.fill(angles, vals, alpha=0.08, color=color)

        # Punti ai vertici
        ax.scatter(angles[:-1], vals[:-1], s=60, color=color,
                   edgecolors=BG, linewidths=1.5, zorder=5)

    # Legenda
    handles = [mpatches.Patch(color=COLORS[i], label=p) for i, p in enumerate(PROFILES)]
    ax.legend(handles=handles, loc='lower right', bbox_to_anchor=(1.35, -0.05),
              frameon=False, fontsize=9, labelcolor=TEXT)

    watermark(fig)
    plt.savefig('/mnt/user-data/outputs/grafico_3_radar.svg', format='svg')
    plt.savefig('/mnt/user-data/outputs/grafico_3_radar.png', format='png', dpi=150)
    plt.close()
    print('✓ Grafico 3 — Radar')


# ══════════════════════════════════════════════
#  GRAFICO 4 — BEESWARM
# ══════════════════════════════════════════════
def grafico_beeswarm():
    fig, ax = plt.subplots(figsize=(14, 9))
    fig.subplots_adjust(top=0.80, left=0.12, right=0.95, bottom=0.12)
    add_header(fig, DOMANDA, 'Beeswarm — Ogni punto è una risposta', 4)

    np.random.seed(7)
    dot_r = 0.04  # raggio punto

    # Per ogni opzione, distribuiamo i punti in colonne impaccate
    for oi, opt in enumerate(OPTIONS):
        all_points = []
        for pi, prof in enumerate(PROFILES):
            count = DATA[prof].get(opt, 0)
            color = COLORS[pi]

            # Posizioni: colonne verticali per profilo dentro ogni opzione
            x_base = oi * 1.0 + (pi - 1.5) * 0.20
            placed = []

            for _ in range(count):
                # Impacca i punti verticalmente
                y = len(placed) * (dot_r * 2.2)
                placed.append((x_base + np.random.uniform(-dot_r*0.3, dot_r*0.3), y))

            xs = [p[0] for p in placed]
            ys = [p[1] for p in placed]
            ax.scatter(xs, ys, s=22, color=color, alpha=0.8,
                       edgecolors=color + '60', linewidths=0.5, zorder=3)

    # Label opzioni
    for oi, opt in enumerate(OPTIONS):
        ax.text(oi, -0.25, opt, ha='center', fontsize=11,
                fontweight='bold', color=TEXT, fontfamily='monospace')
        ax.axvline(oi, color=BORDER, linewidth=0.5, linestyle='--', zorder=1)

    # Conteggi totali
    for oi, opt in enumerate(OPTIONS):
        tot = TOTALS[opt]
        ax.text(oi, -0.45, f'tot: {tot}', ha='center', fontsize=8,
                color=TEXT_DIM, fontfamily='monospace')

    ax.set_xlim(-0.6, len(OPTIONS) - 0.4)
    ax.set_ylim(-0.6, None)
    ax.set_xticks([])
    ax.set_yticks([])
    ax.spines[['top','right','bottom','left']].set_visible(False)

    # Legenda profili
    handles = [mpatches.Patch(color=COLORS[i], label=p) for i, p in enumerate(PROFILES)]
    ax.legend(handles=handles, frameon=False, fontsize=9,
              labelcolor=TEXT, loc='upper right',
              bbox_to_anchor=(1.0, 1.0))

    # Nota metodologica
    ax.text(0.02, 0.02, '● = 1 risposta', transform=ax.transAxes,
            fontsize=8, color=TEXT_DIM, fontfamily='monospace')

    watermark(fig)
    plt.savefig('/mnt/user-data/outputs/grafico_4_beeswarm.svg', format='svg')
    plt.savefig('/mnt/user-data/outputs/grafico_4_beeswarm.png', format='png', dpi=150)
    plt.close()
    print('✓ Grafico 4 — Beeswarm')


# ══════════════════════════════════════════════
#  GRAFICO 5 — STREAM / ALLUVIAL
# ══════════════════════════════════════════════
def grafico_stream():
    fig, ax = plt.subplots(figsize=(14, 9))
    fig.subplots_adjust(top=0.80, left=0.08, right=0.92, bottom=0.1)
    add_header(fig, DOMANDA, 'Stream — Flusso risposte per profilo', 5)

    n_prof = len(PROFILES)
    x_pos = np.linspace(0, 1, n_prof)

    # Per ogni opzione, calcola i valori normalizzati per profilo
    # poi disegna bande di flusso (fill_between su curva smoothed)

    # Prepara matrice: [opzione][profilo] = percentuale
    pcts = np.zeros((len(OPTIONS), n_prof))
    for pi, prof in enumerate(PROFILES):
        total = sum(DATA[prof].values())
        for oi, opt in enumerate(OPTIONS):
            pcts[oi, pi] = DATA[prof].get(opt, 0) / total * 100

    # Calcola baseline cumulativa (stacked)
    cumulative = np.zeros(n_prof)
    band_centers = []

    for oi, opt in enumerate(OPTIONS):
        vals = pcts[oi]
        color = COLORS[oi]

        # Smooth tra i punti
        x_fine = np.linspace(0, 1, 300)
        y_bot = np.interp(x_fine, x_pos, cumulative)
        y_top = np.interp(x_fine, x_pos, cumulative + vals)

        # Smooth leggero
        y_bot_s = gaussian_filter1d(y_bot, sigma=8)
        y_top_s = gaussian_filter1d(y_top, sigma=8)

        ax.fill_between(x_fine, y_bot_s, y_top_s,
                        color=color, alpha=0.75, zorder=3)
        ax.plot(x_fine, y_top_s, color=color, linewidth=0.8, alpha=0.9)
        ax.plot(x_fine, y_bot_s, color=BG, linewidth=1.5, alpha=1.0, zorder=4)

        # Centro banda per label
        mid_y = (y_bot_s[150] + y_top_s[150]) / 2
        band_centers.append((opt, mid_y, color))

        cumulative += vals

    # Label destra
    for opt, mid_y, color in band_centers:
        ax.text(1.02, mid_y, opt, fontsize=9, color=color,
                va='center', fontfamily='monospace', fontweight='bold')

    # Label profili (asse X)
    for pi, prof in enumerate(PROFILES):
        ax.text(x_pos[pi], -4, prof, ha='center', fontsize=9,
                color=TEXT, fontfamily='monospace', fontweight='bold')
        # Linea verticale marker
        ax.axvline(x_pos[pi], color=BORDER, linewidth=1, zorder=5)

        # Percentuali per ogni opzione su quel profilo
        cum = 0
        for oi, opt in enumerate(OPTIONS):
            pct = pcts[oi, pi]
            mid = cum + pct / 2
            if pct > 6:
                ax.text(x_pos[pi], mid, f'{pct:.0f}%',
                        ha='center', va='center', fontsize=8,
                        color=BG, fontfamily='monospace', fontweight='bold',
                        zorder=6)
            cum += pct

    ax.set_xlim(-0.05, 1.15)
    ax.set_ylim(-8, 108)
    ax.set_xticks([])
    ax.set_yticks([0, 25, 50, 75, 100])
    ax.set_yticklabels(['0%','25%','50%','75%','100%'], fontsize=8, color=TEXT_DIM)
    ax.spines[['top','right','bottom']].set_visible(False)
    ax.spines['left'].set_color(BORDER)

    watermark(fig)
    plt.savefig('/mnt/user-data/outputs/grafico_5_stream.svg', format='svg')
    plt.savefig('/mnt/user-data/outputs/grafico_5_stream.png', format='png', dpi=150)
    plt.close()
    print('✓ Grafico 5 — Stream')


# ══════════════════════════════════════════════
#  GRAFICO 6 — WORD CLOUD TIPOGRAFICO
#  (senza libreria wordcloud — fatto con matplotlib)
# ══════════════════════════════════════════════
def grafico_wordcloud():
    fig, ax = plt.subplots(figsize=(14, 9))
    fig.subplots_adjust(top=0.80, left=0.04, right=0.96, bottom=0.04)
    add_header(fig, DOMANDA, 'Tipografico — Peso delle risposte', 6)
    ax.set_facecolor(BG)
    ax.set_xticks([])
    ax.set_yticks([])
    ax.spines[['top','right','bottom','left']].set_visible(False)

    # Costruiamo una composizione tipografica
    # Parole = opzioni, dimensione = peso totale
    # Aggiungiamo anche le parole chiave legate alla domanda
    words_data = [
        # (testo, peso_raw, colore, stile)
        ('SÌ',          TOTALS.get('Sì', 50),       ACCENT,  'bold'),
        ('NO',          TOTALS.get('No', 20),        ACCENT3, 'bold'),
        ('NON SO',      TOTALS.get('Non so', 15),    ACCENT4, 'bold'),
        ('autostima',   40, TEXT_DIM, 'normal'),
        ('social',      38, TEXT_DIM, 'normal'),
        ('identità',    30, TEXT_DIM, 'normal'),
        ('confronto',   28, TEXT_DIM, 'normal'),
        ('immagine',    25, TEXT_DIM, 'normal'),
        ('pressione',   22, TEXT_DIM, 'normal'),
        ('like',        20, ACCENT5,  'normal'),
        ('commenti',    18, TEXT_DIM, 'normal'),
        ('follower',    17, ACCENT5,  'normal'),
        ('influencer',  15, TEXT_DIM, 'normal'),
        ('filtri',      14, TEXT_DIM, 'normal'),
        ('ansia',       13, ACCENT3,  'normal'),
        ('benessere',   12, ACCENT2,  'normal'),
    ]

    np.random.seed(42)
    max_weight = max(w[1] for w in words_data)

    # Griglia di posizioni
    positions = []
    for _ in range(len(words_data) * 10):
        positions.append((np.random.uniform(0.05, 0.95),
                          np.random.uniform(0.08, 0.92)))

    placed = []

    def overlaps(x, y, size, placed):
        for px, py, ps in placed:
            dist = np.sqrt((x-px)**2 + (y-py)**2)
            if dist < (size + ps) * 0.012:
                return True
        return False

    pos_idx = 0
    for word, weight, color, style in sorted(words_data, key=lambda x: -x[1]):
        size = 14 + (weight / max_weight) * 52
        placed_ok = False
        for _ in range(200):
            if pos_idx >= len(positions):
                positions.extend([(np.random.uniform(0.05,0.95),
                                   np.random.uniform(0.08,0.92))
                                  for _ in range(100)])
            x, y = positions[pos_idx]
            pos_idx += 1
            if not overlaps(x, y, size, placed):
                placed.append((x, y, size))
                rotation = np.random.choice([0, 0, 0, 90]) if size < 30 else 0

                t = ax.text(x, y, word,
                            fontsize=size,
                            color=color,
                            fontweight=style,
                            ha='center', va='center',
                            fontfamily='monospace',
                            rotation=rotation,
                            transform=ax.transAxes,
                            alpha=0.85)

                if size > 35:
                    t.set_path_effects([
                        pe.withStroke(linewidth=8, foreground=color + '20'),
                        pe.Normal()
                    ])
                placed_ok = True
                break

    # Nota
    ax.text(0.98, 0.02, 'dimensione = peso totale risposte',
            transform=ax.transAxes, fontsize=7,
            color=TEXT_DIM, ha='right', fontfamily='monospace')

    watermark(fig)
    plt.savefig('/mnt/user-data/outputs/grafico_6_wordcloud.svg', format='svg')
    plt.savefig('/mnt/user-data/outputs/grafico_6_wordcloud.png', format='png', dpi=150)
    plt.close()
    print('✓ Grafico 6 — Word Cloud tipografico')


# ─────────────────────────────────────────────
#  ESEGUI TUTTI
# ─────────────────────────────────────────────
if __name__ == '__main__':
    print(f'\n{"─"*50}')
    print(f'  GENERAZIONE INFOGRAFICHE')
    print(f'  Domanda: "{DOMANDA}"')
    print(f'  N totale risposte: {N_TOTAL}')
    print(f'{"─"*50}\n')

    grafico_donut()
    grafico_scatter()
    grafico_radar()
    grafico_beeswarm()
    grafico_stream()
    grafico_wordcloud()

    print(f'\n{"─"*50}')
    print('  Tutti i grafici salvati in:')
    print('  /mnt/user-data/outputs/')
    print('  Formato: SVG (vettoriale) + PNG (preview)')
    print(f'{"─"*50}\n')
