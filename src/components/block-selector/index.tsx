import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

export default function BlockSelector({
  onChange,
}: {
  onChange: (value: string) => void;
}) {
  return (
    <div className="flex justify-center p-4">
      <Select onValueChange={onChange} defaultValue="A">
        <SelectTrigger>
          <SelectValue placeholder="Blok Seçiniz" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="A">A Blok</SelectItem>
          <SelectItem value="B">B Blok</SelectItem>
          <SelectItem value="C">C Blok</SelectItem>
          <SelectItem value="D">D Blok</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
