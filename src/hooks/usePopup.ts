import { useState } from "react";

export function usePopup() {
  const [open, setOpen] = useState(false);

  const openPopup = () => setOpen(true);
  const closePopup = () => setOpen(false);

  return { open, openPopup, closePopup };
}
