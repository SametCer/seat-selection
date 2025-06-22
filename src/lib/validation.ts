import { Seat } from "@/types/seat.types";

export const validateSeatSelection = (
  selectedSeats: Seat[],
  allSeats: Seat[]
): boolean => {
  const rows = [...new Set(selectedSeats.map((s) => s.row))];

  for (const row of rows) {
    const sameRowSeats = allSeats
      .filter((s) => s.row === row)
      .sort((a, b) => a.x - b.x);

    const selectedSet = new Set(
      selectedSeats.filter((s) => s.row === row).map((s) => s.x)
    );

    for (let i = 1; i < sameRowSeats.length - 1; i++) {
      const prev = sameRowSeats[i - 1];
      const current = sameRowSeats[i];
      const next = sameRowSeats[i + 1];

      const isCurrentEmpty =
        !current.isSold && !current.isReserved && !selectedSet.has(current.x);

      const isPrevSelectedOrSold =
        prev.isSold || prev.isReserved || selectedSet.has(prev.x);
      const isNextSelectedOrSold =
        next.isSold || next.isReserved || selectedSet.has(next.x);

      if (isCurrentEmpty && isPrevSelectedOrSold && isNextSelectedOrSold) {
        return false;
      }
    }
  }

  return true;
};
