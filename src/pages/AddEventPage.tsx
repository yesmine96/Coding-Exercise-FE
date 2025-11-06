import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import type { Event } from "../types/Event";
import SelectInput from "../components/ui/SelectInput";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import {
  sportsOptions,
  stageOptions,
  statusOptions,
} from "../constants/EventOptions";
import { useEvents } from "../contexts/EventContext";
import { useNavigate } from "react-router-dom";

export default function AddEventPage() {
  const { addEvent } = useEvents();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
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
  const status = watch("status");

  const validateStatus = (statusValue?: string, matchDate?: string) => {
    if (!matchDate) return "Please select a match date first";

    const today = new Date();
    const match = new Date(matchDate);

    switch (statusValue) {
      case "Scheduled":
        if (match < today) return "Scheduled cannot be set for past matches";
        break;
      case "Live":
        if (match.toDateString() !== today.toDateString())
          return "Live can only be set for todays match";
        break;
      case "Played":
        if (match > today) return "Completed cannot be set for future matches";
        break;
    }

    return true;
  };
  const onSubmit = (data: Event) => {
    try {
      addEvent(data);
      toast.success(`Event added successfully!`);
      navigate("/");
    } catch (err) {
      toast.error("Failed to add event. Please try again.");
    }
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
            {...register("dateVenue", { required: true })}
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
            {...register("status", {
              required: true,
              validate: (value) => validateStatus(value, watch("dateVenue")),
            })}
            error={errors.status?.message}
          />

          <SelectInput
            label="Stage"
            options={stageOptions}
            required
            {...register("stage.name", { required: true })}
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Home Team Score"
            type="number"
            isDisabled={status === "Scheduled" || status === "Postponed"}
            {...register("result.homeGoals")}
            error={
              status === "Scheduled" || status === "Postponed"
                ? "Scores can only be entered after the match starts"
                : ""
            }
          />

          <Input
            label="Away Team Score"
            {...register("result.awayGoals")}
            isDisabled={status === "Scheduled" || status === "Postponed"}
            error={
              status === "Scheduled" || status === "Postponed"
                ? "Scores can only be entered after the match starts"
                : ""
            }
          />
        </div>
        <Button disabled={!isValid} type="submit">
          Add Event
        </Button>
      </form>
    </div>
  );
}
