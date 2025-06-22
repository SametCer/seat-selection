import { useCallback, useState, useEffect } from "react";

type Size = { width: number; height: number };

export function useZoom(
  containerRef: React.RefObject<HTMLDivElement | null>,
  onResetOffset?: () => void
) {
  const [autoZoom, setAutoZoom] = useState(0.8);
  const [manualZoom, setManualZoom] = useState(0.8);
  const [contentSize, setContentSize] = useState<Size | null>(null);
  const [containerSize, setContainerSize] = useState<Size | null>(null);
  const computedZoom = autoZoom * manualZoom;

  const handleSizeFromCustomScale = useCallback(
    (contentW: number, contentH: number) => {
      const container = containerRef.current;
      if (!container) return;

      const availableW = container.clientWidth;
      const availableH = container.clientHeight;

      if (
        contentSize &&
        containerSize &&
        contentSize.width === contentW &&
        contentSize.height === contentH &&
        containerSize.width === availableW &&
        containerSize.height === availableH
      ) {
        return;
      }

      const scaleX = availableW / contentW;
      const scaleY = availableH / contentH;
      const scale = Math.min(scaleX, scaleY, 1.5);

      setAutoZoom(scale);
      setContentSize({ width: contentW, height: contentH });
      setContainerSize({ width: availableW, height: availableH });
    },
    [contentSize, containerSize, containerRef]
  );

  const handleZoomIn = () => setManualZoom((prev) => Math.min(prev + 0.1, 2));

  const handleZoomOut = () =>
    setManualZoom((prev) => Math.max(prev - 0.1, 0.5));

  const handleZoomReset = () => {
    setManualZoom(1);
    if (onResetOffset) onResetOffset();
  };

  const handleWheel = (e: React.WheelEvent) => {
    const delta = e.deltaY;
    if (delta > 0) {
      setManualZoom((prev) => Math.max(prev - 0.1, 0.5));
    } else {
      setManualZoom((prev) => Math.min(prev + 0.1, 2));
    }
  };

  useEffect(() => {
    if (!containerRef.current || !contentSize) return;

    const observer = new ResizeObserver(() => {
      handleSizeFromCustomScale(contentSize.width, contentSize.height);
      setManualZoom(1);
    });

    observer.observe(containerRef.current);

    return () => observer.disconnect();
  }, [contentSize, handleSizeFromCustomScale, containerRef]);

  return {
    computedZoom,
    manualZoom,
    setManualZoom,
    handleZoomIn,
    handleZoomOut,
    handleZoomReset,
    handleWheel,
    handleSizeFromCustomScale,
  };
}
