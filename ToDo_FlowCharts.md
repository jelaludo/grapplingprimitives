## Flow Charts / Decision Trees – To Do

Purpose: reproduce Keynote-style decision trees (states, reactions, paths) as dynamic, data-driven graphs inside the app.

### Goals
- Visualize grappling decision trees with readable nodes and styled links
- Author interactively (add/move/connect, inline edit) and present (lock + path highlighting)
- Save/load JSON; export to SVG/PNG/PDF; responsive + theme-aware

### MVP (editor + viewer)
- Data model: nodes + edges (+ optional groups)
- Layered auto-layout (dagre) with manual drag overrides
- Node templates: ellipse (state/outcome), rounded-rect (tool/action), small note labels
- Edge templates: solid/dashed, colored, arrowheads; optional short label
- Pan/zoom, snap-to-grid, align/distribute, undo/redo (basic)
- Export to SVG/PNG; import/export JSON

### Data model (draft)
- Node: `{ id, label, type: 'state'|'action'|'note'|'group', position?, style?, size? }`
- Edge: `{ id, source, target, kind: 'option'|'reaction'|'counter', label?, style? }`
- Group: `{ id, title, members: string[], style? }` (for toolboxes like “Kuzushi”)

### Library options (ranked)
1) React Flow + dagre (recommended)
   - Fastest to interactive editor; custom nodes/edges; good zoom/pan; robust
2) D3 + dagre/elk (custom)
   - Max control; more plumbing; great for bespoke styling
3) Cytoscape.js
   - Many layouts; heavier styling model; good performance
4) Mermaid/Markmap
   - Text-first authoring; limited styling/interactivity (useful as import/export)

### Layout strategies
- Layered (Sugiyama/dagre): columns for phases/reactions; edge ranking to reduce crossings
- Manual pinning: persist user-placed positions; re-run layout only on new nodes
- Edge routing: straight vs curved; avoid-node routing if needed (elk/orthogonal later)

### Rendering & responsiveness
- SVG first (easy export, crisp text); full-bleed on mobile via container tricks
- Clamp-based typography: `font-size: clamp(10px, 1.4vw, 14px)`; halo stroke for contrast
- Density control on small screens: show every Nth label; multi-line wrapping; skip-on-collision

### Authoring UX (v1)
- Add node, connect by drag; inline label edits
- Palette of node/edge styles (color, dashed, shape)
- Group boxes with titles (e.g., "Kuzushi Toolbox")
- Path highlight: hover node highlights reachable edges; click to focus
- Keyboard: delete, duplicate, align, distribute; snap-to-grid

### Persistence & export
- JSON store; version nodes/edges separately from render state
- Export PNG/SVG; copy-to-clipboard; optional PDF preset (A3 landscape)

### Roadmap
Phase 1 (Viewer): read JSON, render with dagre layout; click-to-highlight paths; export SVG/PNG
Phase 2 (Editor): drag/move, add/delete nodes/edges, inline edit; persist positions; undo/redo (simple)
Phase 3 (Styling): themes, halos, edge labels, density controls; grouping; snap/align
Phase 4 (Authoring polish): import Mermaid; export to Keynote-friendly SVG; edge routing improvements
Phase 5 (Presentation mode): lock graph; step-through animations; hotspot navigation

### Performance notes
- Keep SVG for <2–3k elements; consider Canvas/WebGL only if very large
- Batch updates; memoize nodes/edges; debounce layout recompute

### Open questions
- Do we need multi-root graphs and cross-links between columns?
- Path semantics (primary vs secondary) and legend conventions
- Per-node "examples"/tooltips popup versus inline notes
- Versioning: tie diagrams to concept IDs for deep links?


