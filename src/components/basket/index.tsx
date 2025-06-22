import TrashIcon from "@/assets/trash.svg";
import { validateSeatSelection } from "@/lib/validation";
import { BasketProps } from "@/types/basket.types";
import { toast } from "sonner";

const TICKET_PRICE = 100;
const SERVICE_FEE = 2.9;

export default function Basket({
  seats,
  selectedSeats,
  onSelectedSeatsChange,
}: BasketProps) {
  const sortedSeats = [...selectedSeats].sort((a, b) => {
    if (a.row < b.row) return -1;
    if (a.row > b.row) return 1;
    return a.seat - b.seat;
  });

  const removeSeat = (seatId: number) => {
    onSelectedSeatsChange(selectedSeats.filter((seat) => seat.id !== seatId));
  };
  const clearAllSeats = () => {
    onSelectedSeatsChange([]);
  };

  const totalPrice =
    selectedSeats.length > 0
      ? Number(((TICKET_PRICE + SERVICE_FEE) * selectedSeats.length).toFixed(2))
      : 0;

  return (
    <div className="flex flex-col w-full md:w-1/3 md:border-l shadow-md bg-white">
      <div className="flex-1">
        <div className="p-4 flex gap-2 border-b">
          <div className="w-full">
            <div className="font-semibold text-lg">
              Seçilen Koltuklar ({selectedSeats.length})
            </div>
            <div>Sıra-Koltuk</div>
          </div>
          {selectedSeats.length > 0 && (
            <div
              className="w-full flex justify-end cursor-pointer items-center"
              onClick={() => clearAllSeats()}
            >
              <div className="border h-fit px-2 py-1 rounded-md text-red-500 border-red-500 hover:bg-red-500 hover:text-white transition-transform duration-300 ease-in-out hover:scale-110">
                Hepsini Sil
              </div>
            </div>
          )}
        </div>
        <div className="p-4">
          <div className="border border-dashed rounded-xl bg-gray-50 p-6 text-center text-gray-500">
            <div className="flex flex-wrap gap-2 ">
              {sortedSeats.length > 0 ? (
                sortedSeats.map((seat) => (
                  <div
                    key={seat.id}
                    className="relative px-4 py-2 bg-white border rounded-md shadow-sm text-sm flex items-center gap-2 transition-transform duration-300 ease-in-out hover:scale-110 cursor-pointer"
                    onClick={() => removeSeat(seat.id)}
                  >
                    S{seat.row}-{seat.seat}
                    <div
                      className="text-red-500 ml-2 text-xs"
                      aria-label="Koltuk sil"
                    >
                      <TrashIcon width={16} height={16} />
                    </div>
                  </div>
                ))
              ) : (
                <div>Bilet almak için lütfen koltuk seçin.</div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="p-4 border-t text-gray-600 flex flex-col gap-2">
        <div className="font-semibold text-base">Sipariş özeti</div>
        <div className="flex justify-between text-sm">
          <div>Bilet Fiyatı</div>
          <div>{TICKET_PRICE * selectedSeats.length} ₺</div>
        </div>
        <div className="flex justify-between border-b text-sm pb-2">
          <div>Hizmet Bedeli x ({selectedSeats.length})</div>
          <div>{(SERVICE_FEE * selectedSeats.length).toFixed(2)} ₺</div>
        </div>
        <div className="flex justify-between font-semibold pb-4">
          <div>Toplam Tutar</div>
          <div className="text-teal-500">{totalPrice.toFixed(2)} ₺</div>
        </div>
        <div
          className="bg-gray-200 px-4 py-2 rounded-xl text-center font-semibold cursor-pointer hover:bg-gray-400 hover:text-white"
          onClick={() => {
            if (validateSeatSelection(selectedSeats, seats)) {
              //Seçim geçerli ödeme işlemine devam et.
            } else {
              toast.error("Arada tek boş koltuk bırakılamaz.");
            }
          }}
        >
          Ödeme İşlemine Geç
        </div>
      </div>
    </div>
  );
}
