"use client";
import { useRef, useState } from "react";
import Basket from "../basket";
import CustomScale from "../custom-seat-scale";
import { Seat } from "@/types/seat.types";
import { useZoom } from "@/hooks/useZoom";
import ZoomControls from "../zoom-controls";
import SeatLegend from "../seat-legend";
import BlockSelector from "../block-selector";
import { useDraggable } from "@/hooks/draggable";
import { getSeatsByBlock } from "@/lib/generate-block";

export default function SeatSelection() {
  const [selectedSeats, setSelectedSeats] = useState<Seat[]>([]);
  const [selectedBlock, setSelectedBlock] = useState<string>("A");
  const currentSeats = getSeatsByBlock(selectedBlock);
  const containerRef = useRef<HTMLDivElement>(null);

  const {
    offset,
    onMouseDown,
    onMouseMove,
    onMouseUp,
    onTouchStart,
    onTouchMove,
    onTouchEnd,
    resetOffset,
  } = useDraggable();
  const {
    computedZoom,
    handleZoomIn,
    handleZoomOut,
    handleZoomReset,
    handleWheel,
    handleSizeFromCustomScale,
  } = useZoom(containerRef, resetOffset);

  return (
    <div className="flex flex-col md:flex-row w-full border-t flex-grow h-full overflow-hidden">
      <div className="flex flex-col w-full md:w-2/3 transition-all duration-300 overflow-auto bg-gray-50">
        <BlockSelector
          onChange={(block) => {
            setSelectedBlock(block);
            setSelectedSeats([]);
          }}
        />
        <div
          className="flex flex-1 justify-center items-center overflow-hidden relative touch-none select-none"
          onWheel={handleWheel}
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={onMouseUp}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
          ref={containerRef}
        >
          <div className="absolute top-4 left-4 z-20">
            <ZoomControls
              onZoomIn={handleZoomIn}
              onZoomOut={handleZoomOut}
              onZoomReset={handleZoomReset}
              zoomLevel={computedZoom}
            />
          </div>
          <div
            className="origin-center inline-block transition-transform duration-300 cursor-grab"
            style={{
              transform: `translate(${offset.x}px, ${offset.y}px) scale(${computedZoom})`,
            }}
          >
            <CustomScale
              seats={currentSeats}
              onSizeCalculated={handleSizeFromCustomScale}
              selectedSeats={selectedSeats}
              onSelectedSeatsChange={setSelectedSeats}
            />
          </div>
        </div>
        <SeatLegend />
      </div>
      <Basket
        seats={currentSeats}
        selectedSeats={selectedSeats}
        onSelectedSeatsChange={setSelectedSeats}
      />
    </div>
  );
}
