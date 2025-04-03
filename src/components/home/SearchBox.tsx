import React from "react";
import { DollarSign, MapPin, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const SearchBox: React.FC = () => {
  return (
    <div className="mb-6 rounded-lg bg-white p-4 shadow-lg">
      <div className="mb-4 flex items-center gap-2">
        <Search className="h-5 w-5 text-gray-400" />
        <Input
          type="text"
          placeholder="Nhập từ khóa tìm việc (vd: Frontend Developer, Python)"
          className="border-0 focus-visible:ring-0"
        />
      </div>

      <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="flex items-center gap-2">
          <MapPin className="h-5 w-5 text-gray-400" />
          <Select>
            <SelectTrigger className="w-full border-0 bg-gray-50">
              <SelectValue placeholder="Địa điểm" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="all">Tất cả địa điểm</SelectItem>
                <SelectItem value="hanoi">Hà Nội</SelectItem>
                <SelectItem value="hcmc">TP. Hồ Chí Minh</SelectItem>
                <SelectItem value="danang">Đà Nẵng</SelectItem>
                <SelectItem value="remote">Remote</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-2">
          <DollarSign className="h-5 w-5 text-gray-400" />
          <Select>
            <SelectTrigger className="w-full border-0 bg-gray-50">
              <SelectValue placeholder="Mức lương" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="all">Tất cả mức lương</SelectItem>
                <SelectItem value="0-1000">Dưới $1,000</SelectItem>
                <SelectItem value="1000-2000">$1,000 - $2,000</SelectItem>
                <SelectItem value="2000-3000">$2,000 - $3,000</SelectItem>
                <SelectItem value="3000+">Trên $3,000</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Button className="w-full">Tìm việc ngay</Button>
    </div>
  );
};

export default SearchBox;
