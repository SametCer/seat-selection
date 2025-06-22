import Image from "next/image";
import MapIcon from "@/assets/map.svg";
import DateIcon from "@/assets/date.svg";
import ClockIcon from "@/assets/clock.svg";
import { InfoProps } from "@/types/info.types";

export default function Info({
  title,
  location,
  date,
  time,
  coverImage,
  badges,
}: InfoProps) {
  return (
    <div className="container mx-auto px-4 py-4">
      <div className="flex flex-col md:flex-row justify-between">
        <div className="flex gap-4 text-gray-600">
          <Image
            alt={`Kapak görseli: ${title}`}
            src={coverImage}
            width={100}
            height={100}
            priority
            className="rounded-md transition-transform duration-300 ease-in-out hover:scale-110"
          />
          <div className="flex flex-col text-sm gap-2">
            <div className="font-semibold text-base sm:text-xl md:text-2xl">
              {title}
            </div>
            <div className="flex gap-4">
              <div className="flex items-center gap-1">
                <MapIcon width={18} height={18} />
                {location}
              </div>
              <div className="flex items-center gap-1">
                <DateIcon width={18} height={18} />
                {date}
              </div>
              <div className="flex items-center gap-1">
                <ClockIcon width={18} height={18} />
                {time}
              </div>
            </div>
          </div>
        </div>

        {badges && badges.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {badges.map((badge, idx) => (
              <span
                key={idx}
                className="bg-[#E2E8F0] text-xs font-medium px-2 py-1 rounded-full h-fit"
              >
                {badge}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
