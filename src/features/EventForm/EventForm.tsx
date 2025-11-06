import { useForm } from "react-hook-form";
import type { Event } from "../../types/Event";
import SelectInput from "../../components/ui/SelectInput";
import {
  sportsOptions,
  stageOptions,
  statusOptions,
} from "../../constants/EventOptions";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import {
  validateLettersOnly,
  validateScoreWithStatus,
  validateStatus,
} from "./eventValidation";

type EventFormProps = { onSubmit: (data: Event) => void; submitLabel?: string };

export const EventForm = ({ onSubmit, submitLabel }: EventFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
    setValue,
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
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <SelectInput
        label="Sport"
        options={sportsOptions}
        required
        {...register("sport", { required: true })}
      />
      <Input
        label="Competition Name"
        {...register("originCompetitionName", validateLettersOnly)}
        error={errors.originCompetitionName?.message}
      />
      <div className="grid grid-cols-2 gap-4">
        <Input
          label="Home Team"
          {...register("homeTeam.abbreviation", validateLettersOnly)}
          error={errors.homeTeam?.abbreviation?.message}
        />
        <Input
          label="Away Team"
          {...register("awayTeam.abbreviation", {
            pattern: {
              value: /^[A-Za-z\s]+$/,
              message: "Only letters are allowed",
            },
          })}
          error={errors.awayTeam?.abbreviation?.message}
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <Input
          label="Date"
          required
          type="date"
          placeholder="YYYY-MM-DD"
          {...register("dateVenue", {
            required: true,
            onChange: () =>
              setValue("status", "", {
                shouldValidate: true,
                shouldDirty: true,
              }),
          })}
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
          {...register("result.homeGoals", {
            valueAsNumber: true,
            validate: validateScoreWithStatus(status),
          })}
          error={errors.result?.homeGoals?.message}
          step="1"
          min={0}
        />

        <Input
          label="Away Team Score"
          type="number"
          {...register("result.awayGoals", {
            valueAsNumber: true,
            validate: validateScoreWithStatus(status),
          })}
          isDisabled={status === "Scheduled" || status === "Postponed"}
          error={errors.result?.awayGoals?.message}
          step="1"
          min={0}
        />
      </div>
      <Button disabled={!isValid} type="submit">
        {submitLabel}
      </Button>
    </form>
  );
};
