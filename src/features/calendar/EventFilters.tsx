import { useState } from "react";
import Button from "../../components/ui/Button";
import SelectInput from "../../components/ui/SelectInput";
import { sportsOptions, statusOptions } from "../../constants/EventOptions";
import { useEvents, type EventFilters } from "../../contexts/EventContext";

export default function EventFilters() {
  const { updateFilter, resetFilters } = useEvents();
  const [localFilters, setLocalFilters] = useState<EventFilters>({
    sport: "",
    status: "",
  });
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setLocalFilters((prev) => ({ ...prev, [name]: value }));
  };

  const applyFilters = () => {
    updateFilter(localFilters);
  };
  return (
    <div className="flex flex-col md:flex-row gap-4  mb-8 p-4 rounded-lg shadow-md lg:w-112">
      <div className="flex-1">
        <SelectInput
          value={localFilters.sport}
          placeholder="Sport"
          options={sportsOptions}
          onChange={handleChange}
          name="sport"
        />
      </div>
      <div className="flex-1">
        <SelectInput
          value={localFilters.status}
          placeholder="Status"
          options={statusOptions}
          onChange={handleChange}
          name="status"
        />
      </div>
      <Button onClick={applyFilters}>Filter</Button>
      <Button onClick={resetFilters}>Reset</Button>
    </div>
  );
}
