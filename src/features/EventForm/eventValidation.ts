export const validateStatus = (statusValue?: string, matchDate?: string) => {
  if (!matchDate) return "Please select a match date first";
  const today = new Date();
  const match = new Date(matchDate);

  switch (statusValue) {
    case "scheduled":
      if (match < today) return "Scheduled cannot be set for past matches";
      break;
    case "live":
      if (match.toDateString() !== today.toDateString())
        return "Live can only be set for today's match";
      break;
    case "played":
      if (match > today) return "Completed cannot be set for future matches";
      break;
  }

  return true;
};

export const validateLettersOnly = {
  pattern: {
    value: /^[A-Za-z\s]+$/,
    message: "Only letters are allowed",
  },
};
export const validateScoreWithStatus =
  (status?: string) => (value?: number) => {
    if (status === "scheduled" || status === "postponed") {
      return "Scores can only be entered after the match starts";
    }

    if (value == null || Number.isNaN(value)) return true;

    return (
      Number.isInteger(value) ||
      "Score must be an integer, no decimals allowed!"
    );
  };
