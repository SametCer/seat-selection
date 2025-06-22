import { useRef, useState } from "react";

export function useDraggable() {
  const pos = useRef({ x: 0, y: 0 });
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const isDragging = useRef(false);

  const onMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    pos.current = { x: e.clientX - offset.x, y: e.clientY - offset.y };
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current) return;
    setOffset({
      x: e.clientX - pos.current.x,
      y: e.clientY - pos.current.y,
    });
  };

  const onMouseUp = () => {
    isDragging.current = false;
  };

  const onTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    isDragging.current = true;
    pos.current = { x: touch.clientX - offset.x, y: touch.clientY - offset.y };
  };

  const onTouchMove = (e: React.TouchEvent) => {
    if (!isDragging.current) return;
    const touch = e.touches[0];
    setOffset({
      x: touch.clientX - pos.current.x,
      y: touch.clientY - pos.current.y,
    });
  };

  const onTouchEnd = () => {
    isDragging.current = false;
  };

  const resetOffset = () => {
    setOffset({ x: 0, y: 0 });
  };

  return {
    offset,
    onMouseDown,
    onMouseMove,
    onMouseUp,
    onTouchStart,
    onTouchMove,
    onTouchEnd,
    resetOffset,
  };
}
