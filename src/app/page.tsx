import CoverPhoto from "@/assets/image/mor-ve-otesi.png";
import Info from "@/components/info";
import SeatSelection from "@/components/seat-selection";

export default function Home() {
  return (
    <div className="flex flex-col min-h-[calc(100vh-72px)]">
      <Info
        title="Mor ve Ötesi"
        location="İzmir"
        date="10.01.2025"
        time="21.00"
        coverImage={CoverPhoto}
        badges={["+15 Yaş", "Açık Alan", "Bilet Zorunlu", "Canlı Müzik"]}
      />
      <SeatSelection />
    </div>
  );
}
