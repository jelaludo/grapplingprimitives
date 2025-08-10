export type GridRect = { left: number; top: number; width: number; height: number };
export type GridLayout = {
  rects: GridRect[];
  cols: number;
  rows: number;
  cellW: number;
  cellH: number;
  gap: number;
  containerLeft: number;
  containerTop: number;
  containerWidth: number;
  containerHeight: number;
};

const CARD_RATIO = 597 / 440; // h / w

export function computeGridLayout(opts: { viewportW: number; viewportH: number; numCards: number; isMobile: boolean }): GridLayout {
  const { viewportW: vw, viewportH: vh, numCards, isMobile } = opts;
  const gap = isMobile ? 6 : 10;
  const sidePadding = isMobile ? 12 : 16;
  const topReserve = isMobile ? 110 : 140; // tighter header/controls space
  const availableW = Math.max(280, vw - sidePadding * 2);
  const availableH = Math.max(200, vh - topReserve);

  // Columns: fixed 4 on mobile; otherwise choose the largest that fits with min cell width
  const minCellW = isMobile ? 80 : 110;
  let cols = isMobile ? 4 : Math.max(4, Math.floor((availableW + gap) / (minCellW + gap)));
  cols = Math.min(cols, Math.max(4, numCards));
  const rows = Math.ceil(numCards / cols);

  // Find cell width that fits vertically and horizontally
  let cellW = Math.floor((availableW - gap * (cols - 1)) / cols);
  let cellH = Math.floor(cellW * CARD_RATIO);
  // Adjust down if too tall
  while (rows * cellH + gap * (rows - 1) > availableH && cellW > 40) {
    cellW -= 1;
    cellH = Math.floor(cellW * CARD_RATIO);
  }

  const containerWidth = cols * cellW + gap * (cols - 1);
  const containerHeight = rows * cellH + gap * (rows - 1);
  const containerLeft = Math.round((vw - containerWidth) / 2);
  const containerTop = Math.round(topReserve / 2); // slight top padding

  const rects: GridRect[] = [];
  for (let i = 0; i < numCards; i++) {
    const r = Math.floor(i / cols);
    const c = i % cols;
    rects.push({
      left: containerLeft + c * (cellW + gap),
      top: containerTop + r * (cellH + gap),
      width: cellW,
      height: cellH,
    });
  }

  return { rects, cols, rows, cellW, cellH, gap, containerLeft, containerTop, containerWidth, containerHeight };
}


