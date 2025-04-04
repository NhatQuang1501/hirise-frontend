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
          placeholder="Enter job keywords (e.g. Frontend Developer, Python)"
          className="border-0 focus-visible:ring-0"
        />
      </div>

      <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="flex items-center gap-2">
          <MapPin className="h-5 w-5 text-gray-400" />
          <Select>
            <SelectTrigger className="w-full border-0 bg-gray-50">
              <SelectValue placeholder="Location" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="all">All locations</SelectItem>
                <SelectItem value="hanoi">Hanoi</SelectItem>
                <SelectItem value="hcmc">Ho Chi Minh City</SelectItem>
                <SelectItem value="danang">Danang</SelectItem>
                <SelectItem value="remote">Remote</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-2">
          <DollarSign className="h-5 w-5 text-gray-400" />
          <Select>
            <SelectTrigger className="w-full border-0 bg-gray-50">
              <SelectValue placeholder="Salary" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="all">All salary</SelectItem>
                <SelectItem value="0-1000">Under 5.000.000 VND</SelectItem>
                <SelectItem value="1000-2000">5.000.000 - 20.000.000 VND</SelectItem>
                <SelectItem value="2000-3000">20.000.000 - 50.000.000 VND</SelectItem>
                <SelectItem value="3000+">Above 50.000.000 VND</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Button className="w-full">Find job now</Button>
    </div>
  );
};

export default SearchBox;
