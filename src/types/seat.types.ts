export interface Seat {
  id: number;
  x: number;
  y: number;
  row: string;
  seat: number;
  isSold: boolean;
  isReserved: boolean;
  isSelectable: boolean;
}
