import { Seat } from "./seat.types";

export interface BasketProps {
  seats: Seat[];
  selectedSeats: Seat[];
  onSelectedSeatsChange: (seats: Seat[]) => void;
}
