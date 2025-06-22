import { StaticImageData } from "next/image";

export interface InfoProps {
  title: string;
  location: string;
  date: string;
  time: string;
  coverImage: StaticImageData;
  badges: string[];
}
