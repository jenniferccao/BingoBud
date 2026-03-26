/**
 * Image processing utilities for mapping overlay coordinates to image pixels
 * and cropping bingo card cells from a captured image.
 */

/** A rectangular region in pixel coordinates. */
export interface CardRegion {
  x: number;
  y: number;
  width: number;
  height: number;
}

export function computeCardRegion(
  naturalWidth: number,
  naturalHeight: number,
  containerWidth: number,
  containerHeight: number,
): CardRegion {
  // 1. The image/video element is 100% width/height of the container
  //    and uses `object-fit: cover`.
  //    "cover" means the image is scaled to maintain its aspect ratio while
  //    filling the element's entire content box. The aspect ratio is preserved,
  //    so the image is scaled to fit the *larger* ratio.
  const videoRatio = naturalWidth / naturalHeight;
  const containerRatio = containerWidth / containerHeight;

  let renderWidth, renderHeight;

  if (containerRatio > videoRatio) {
    // Container is wider than the video — video width becomes container width,
    // video height is scaled up proportionally and overflows top/bottom.
    renderWidth = containerWidth;
    renderHeight = containerWidth / videoRatio;
  } else {
    // Container is taller than the video — video height becomes container height,
    // video width is scaled up proportionally and overflows left/right.
    renderHeight = containerHeight;
    renderWidth = containerHeight * videoRatio;
  }

  // Calculate top/left offset of the rendered image relative to the container
  // Because object-position defaults to 50% 50%, the overflow is split evenly.
  const renderOffsetX = (containerWidth - renderWidth) / 2;
  const renderOffsetY = (containerHeight - renderHeight) / 2;

  // 2. The GridOverlay is positioned center-center in the container:
  //    width/height is min(75% of container width, 320px).
  const overlaySize = Math.min(containerWidth * 0.75, 320);
  const overlayX = (containerWidth - overlaySize) / 2;
  const overlayY = (containerHeight - overlaySize) / 2;

  // 3. Map overlay coordinates (relative to container) → natural image pixels
  // Step A: Translate overlay coordinates from container-relative to render-relative
  const overlayInRenderX = overlayX - renderOffsetX;
  const overlayInRenderY = overlayY - renderOffsetY;

  // Step B: Scale render-relative coordinates to natural image pixels
  const scale = naturalWidth / renderWidth; // Also equals naturalHeight / renderHeight
  
  const cardPixelX = overlayInRenderX * scale;
  const cardPixelY = overlayInRenderY * scale;
  const cardPixelW = overlaySize * scale;
  const cardPixelH = overlaySize * scale;

  return {
    x: Math.round(Math.max(0, cardPixelX)),
    y: Math.round(Math.max(0, cardPixelY)),
    width: Math.round(Math.min(cardPixelW, naturalWidth)),
    height: Math.round(Math.min(cardPixelH, naturalHeight)),
  };
}

/**
 * Crop the 25 cells (5×5) from a captured image data URL.
 * Returns a 5×5 array of HTMLCanvasElement, each containing one cell.
 *
 * @param imageSrc - data URL of the captured image
 * @param region - the card region in natural image pixel space
 * @param paddingRatio - fraction of cell size to inset (reduces grid-line noise)
 */
export async function cropCellsFromImage(
  imageSrc: string,
  region: CardRegion,
  paddingRatio = 0.1,
): Promise<HTMLCanvasElement[][]> {
  const img = await loadImage(imageSrc);

  const cellW = region.width / 5;
  const cellH = region.height / 5;
  const padX = cellW * paddingRatio;
  const padY = cellH * paddingRatio;

  const cells: HTMLCanvasElement[][] = [];

  for (let row = 0; row < 5; row++) {
    const rowCells: HTMLCanvasElement[] = [];
    for (let col = 0; col < 5; col++) {
      const srcX = region.x + col * cellW + padX;
      const srcY = region.y + row * cellH + padY;
      const srcW = cellW - 2 * padX;
      const srcH = cellH - 2 * padY;

      const canvas = document.createElement('canvas');
      canvas.width = Math.round(srcW);
      canvas.height = Math.round(srcH);
      const ctx = canvas.getContext('2d')!;
      ctx.drawImage(
        img,
        Math.round(srcX),
        Math.round(srcY),
        Math.round(srcW),
        Math.round(srcH),
        0,
        0,
        canvas.width,
        canvas.height,
      );
      rowCells.push(canvas);
    }
    cells.push(rowCells);
  }

  return cells;
}

/** Load an image from a data URL. */
function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}
