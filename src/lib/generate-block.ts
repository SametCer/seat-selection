import { concertSeats } from "@/lib/concert-seats";
import { cinemaSeats } from "@/lib/cinema-seats";
import { theatreSeats } from "@/lib/theatre-seats";
import { Seat } from "@/types/seat.types";
import { reverseSeats } from "./reverse-seats";

export function getSeatsByBlock(block: string | null): Seat[] {
  switch (block) {
    case "A":
      return theatreSeats;
    case "B":
      return concertSeats;
    case "C":
      return cinemaSeats;
    case "D":
      return reverseSeats;
    default:
      return [];
  }
}
