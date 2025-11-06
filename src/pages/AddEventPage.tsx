import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import type { Event } from "../types/Event";
import SelectInput from "../components/ui/SelectInput";
import { useForm } from "react-hook-form";
import {
  sportsOptions,
  stageOptions,
  statusOptions,
} from "../constants/EventOptions";

export default function AddEventPage() {
  const {
    register,
    handleSubmit,
    formState: { isValid },
  } = useForm<Event>({
    mode: "onChange",
    defaultValues: {
      sport: "",
      timeVenueUTC: "",
      dateVenue: "",
      originCompetitionName: "",
      homeTeam: {
        officialName: "",
        abbreviation: "",
      },
      awayTeam: {
        officialName: "",
        abbreviation: "",
      },
      stage: { name: "" },
      result: {},
      status: "",
    },
  });
  const onSubmit = (data: Event) => {
    console.log("Form Submitted ", data);
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-xl shadow-md space-y-6 my-12 lg:px-12">
      <h2 className="text-2xl font-bold text-center">Add New Event</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <SelectInput
          label="Sport"
          options={sportsOptions}
          required
          {...register("sport", { required: true })}
        />
        <Input
          label="Competition Name"
          {...register("originCompetitionName")}
        />
        <div className="grid grid-cols-2 gap-4">
          <Input label="Home Team" {...register("homeTeam.abbreviation")} />
          <Input label="Away Team" {...register("awayTeam.abbreviation")} />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Date"
            required
            type="date"
            placeholder="YYYY-MM-DD"
            {...register("dateVenue")}
          />
          <Input
            label="Time"
            required
            placeholder="HH:MM"
            type="time"
            {...register("timeVenueUTC")}
          />
          <SelectInput
            label="Status"
            options={statusOptions}
            required
            {...register("status")}
          />
          <SelectInput
            label="Stage"
            options={stageOptions}
            required
            {...register("stage.name")}
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Home Team Score"
            type="number"
            {...register("result.homeGoals")}
          />
          <Input label="Away Team Score" {...register("result.awayGoals")} />
        </div>
        <Button disabled={!isValid} type="submit">
          Add Event
        </Button>
      </form>
    </div>
  );
}
