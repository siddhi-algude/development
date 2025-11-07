// public/src/core/grid.js

/**
 * Initialize the grid container with sensible defaults.
 * - Adds CSS vars for gap and min width
 * - Provides an API to toggle density (compact/comfortable)
 * - Optional "snapWhileDragging" class hook for visual feedback
 */
export function initGrid(container, opts = {}) {
  const {
    gap = 12,
    minColWidth = 280,
    density = "comfortable", // "compact" | "comfortable" | "spacious"
    snapWhileDragging = true
  } = opts;

  container.style.setProperty("--grid-gap", `${gap}px`);
  container.style.setProperty("--grid-min", `${minColWidth}px`);
  setDensity(container, density);

  if (snapWhileDragging) {
    container.classList.add("grid-snap");
  }

  // resize observer can be used if you want to react to container width
  const ro = new ResizeObserver(() => {
    // place for future logic (e.g., change minColWidth at breakpoints)
  });
  ro.observe(container);

  return {
    setDensity: (d) => setDensity(container, d),
    destroy: () => ro.disconnect()
  };
}

function setDensity(container, density) {
  // density affects min height of widgets and padding (via class)
  container.classList.remove("density-compact", "density-comfortable", "density-spacious");
  container.classList.add(`density-${density}`);
}
