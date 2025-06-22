import { ZoomControlsProps } from "@/types/zoom.types";

export default function ZoomControls({
  onZoomIn,
  onZoomOut,
  onZoomReset,
}: ZoomControlsProps) {
  return (
    <div className="flex bg-white rounded shadow divide-x border ">
      <div
        onClick={onZoomOut}
        className="px-2 py-1 hover:bg-gray-100 cursor-pointer"
        aria-label="Zoom Out"
      >
        -
      </div>
      <div
        onClick={onZoomIn}
        className="px-2 py-1 hover:bg-gray-100 cursor-pointer"
        aria-label="Zoom In"
      >
        +
      </div>
      <div
        onClick={onZoomReset}
        className="px-2 py-1 hover:bg-gray-100 cursor-pointer justify-center"
        aria-label="Reset Zoom"
      >
        Reset
      </div>
    </div>
  );
}
