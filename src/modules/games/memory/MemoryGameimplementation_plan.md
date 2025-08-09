# Memory Card Game — Implementation Plan

> **Working Goal**\
> Build a responsive, fast memory game that supports solo and pass‑and‑play 2‑player modes across board sizes (3×4, 4×4, 4×5, 5×6, 6×6), using your existing stack: **React 19 + TypeScript, MUI v7 (Emotion), MUI Icons, Framer Motion, CRA (react‑scripts), Node/Express**, localStorage. 



---

## Assumptions

- **One JJJ deck** for v1 (full \~150 images = 75 pairs).
- Each pair consists of **two distinct but visually related images** (e.g., `POWTiger1.*` / `POWTiger2.*`).
- No preloading of the full deck — only the subset needed per board size.
- Game caps maximum board size on small phones; smaller boards auto-selected when screen is narrow.
- Scoring: **fewest moves wins**; ties broken by **fastest time**.
- Add match celebration animation (cards zoom to center + enlarge) when a pair is found.

---

## Image Optimization Pipeline

**Target sizes & formats**

- Primary retina: **440px width** (\~440×597), AVIF (35–60KB), WebP fallback (45–80KB).
- Small: **220px width** (\~220×299), AVIF (15–25KB), WebP fallback.

**Folder convention** example.

```
public/assets/cards/{id}/face-220.avif
public/assets/cards/{id}/face-220.webp
public/assets/cards/{id}/face-440.avif
public/assets/cards/{id}/face-440.webp
public/assets/back/back-440.avif
```

---

## Game Loop Enhancements

- Match: trigger zoom-to-center animation via Framer Motion, then mark as matched.
- Screen-size detection on game start; auto-downgrade board size for narrow viewports.

---

## Out-of-Scope for v1

- Multiple decks (planned for v2+).
- Online multiplayer or leaderboards.
- PWA/offline install.

