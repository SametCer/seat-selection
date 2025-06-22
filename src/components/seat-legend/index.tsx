import { cn } from "@/lib/utils";

export default function SeatLegend() {
  const legendItems = [
    {
      label: "Müsait",
      className: "text-teal-400 border border-teal-400",
    },
    {
      label: "Seçildi",
      className: "text-white bg-teal-400",
    },
    {
      label: "Dolu",
      className: "text-gray-500 bg-gray-200 border border-gray-500",
    },
    {
      label: "Rezerve",
      className: "text-white bg-orange-400",
    },
  ];

  return (
    <div className="flex justify-center p-4 gap-4 text-xs">
      {legendItems.map((item) => (
        <div key={item.label} className="flex items-center gap-1">
          <div
            className={cn("w-5 h-5 rounded-md shadow", item.className)}
            title={item.label}
            aria-label={item.label}
          ></div>
          {item.label}
        </div>
      ))}
    </div>
  );
}
