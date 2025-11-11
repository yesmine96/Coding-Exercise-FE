import { useState } from "react";
import Button from "../../components/ui/Button";
import SelectInput from "../../components/ui/SelectInput";
import { sportsOptions, statusOptions } from "../../constants/EventOptions.constants";
import { useEvents } from "../../contexts/eventContext/EventContext";
import type { EventFilters } from "../../types/Event";

export default function EventFilters() {
  const { updateFilter, resetFilters } = useEvents();

  const [localFilters, setLocalFilters] = useState<EventFilters>({
    sport: "",
    status: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setLocalFilters((prev) => ({ ...prev, [name]: value }));
  };

  const applyFilters = () => {
    updateFilter(localFilters);
  };
  const applyResetFilters = () => {
    setLocalFilters({ sport: "", status: "" });
    resetFilters();
  };
  return (
    <div className="flex flex-wrap -mx-2 gap-4  mb-8 p-4 rounded-lg shadow-md lg:w-134">
      <div>
        <SelectInput
          value={localFilters.sport}
          placeholder="Sport"
          options={sportsOptions}
          onChange={handleChange}
          name="sport"
        />
      </div>
      <div>
        <SelectInput
          value={localFilters.status}
          placeholder="Status"
          options={statusOptions}
          onChange={handleChange}
          name="status"
        />
      </div>
      <Button variant="secondary" onClick={applyFilters}>
        Filter
      </Button>
      <Button onClick={applyResetFilters}>Reset</Button>
    </div>
  );
}
