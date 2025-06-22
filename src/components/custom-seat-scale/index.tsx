"use client";
import { cn } from "@/lib/utils";
import { useEffect, useMemo } from "react";
import { Seat } from "@/types/seat.types";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import React from "react";

export default function CustomScale({
  seats,
  onSizeCalculated,
  selectedSeats,
  onSelectedSeatsChange,
}: {
  seats: Seat[];
  onSizeCalculated?: (w: number, h: number) => void;
  selectedSeats: Seat[];
  onSelectedSeatsChange: (seats: Seat[]) => void;
}) {
  const { minX, maxX, minY, maxY } = useMemo(() => {
    return {
      minX: Math.min(...seats.map((s) => s.x)),
      maxX: Math.max(...seats.map((s) => s.x)),
      minY: Math.min(...seats.map((s) => s.y)),
      maxY: Math.max(...seats.map((s) => s.y)),
    };
  }, [seats]);
  const width = ((maxX - minX) / 24 + 1) * 24 + 40;
  const height = ((maxY - minY) / 24 + 1) * 24;

  const toggleSeat = (seat: Seat) => {
    if (seat.isSold || seat.isReserved) return;

    const isSelected = selectedSeats.some((s) => s.id === seat.id);
    const newSelection = isSelected
      ? selectedSeats.filter((s) => s.id !== seat.id)
      : [...selectedSeats, seat];

    onSelectedSeatsChange(newSelection);
  };

  useEffect(() => {
    if (onSizeCalculated) {
      onSizeCalculated(width, height);
    }
  }, [width, height, onSizeCalculated]);

  return (
    <div
      className={cn("relative overflow-hidden")}
      style={{ width: `${width}px`, height: `${height}px` }}
    >
      {seats.map((seat) => {
        const left = seat.x - minX + 20;
        const top = seat.y - minY;
        const isSelected = selectedSeats.some((s) => s.id === seat.id);

        return (
          <div
            key={seat.id}
            className={cn(
              "absolute cursor-pointer",
              (seat.isSold || seat.isReserved) && "cursor-no-drop"
            )}
            style={{ top, left }}
            onClick={() => {
              toggleSeat(seat);
            }}
          >
            <Tooltip>
              <TooltipTrigger asChild>
                <div
                  className={cn(
                    "w-5 h-5 flex gap-2 items-center justify-center text-xs rounded-md shadow",
                    seat.isSold &&
                      "text-gray-500 bg-gray-200 border border-gray-500",
                    seat.isReserved && "text-white bg-orange-400",
                    seat.isSelectable && "text-teal-400 border border-teal-400",
                    isSelected && "text-white bg-teal-400"
                  )}
                >
                  {seat.seat}
                </div>
              </TooltipTrigger>
              <TooltipContent
                side="top"
                className="rounded-md p-2 shadow-xl border bg-white text-sm"
              >
                <div className="flex gap-2 text-center text-gray-500 text-xs">
                  <div>
                    <div>DURUM</div>
                    <div
                      className={
                        seat.isSold
                          ? "text-gray-500"
                          : seat.isReserved
                          ? "text-orange-400"
                          : "text-teal-500"
                      }
                    >
                      {seat.isSold
                        ? "Dolu"
                        : seat.isReserved
                        ? "Rezerve"
                        : "Müsait"}
                    </div>
                  </div>
                  <div>
                    <div>SIRA</div>
                    <div className="text-black">{seat.row}</div>
                  </div>
                  <div>
                    <div>KOLTUK</div>
                    <div className="text-black">{seat.seat}</div>
                  </div>
                </div>
              </TooltipContent>
            </Tooltip>
          </div>
        );
      })}
    </div>
  );
}
