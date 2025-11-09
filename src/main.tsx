import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "../src/styles/globals.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { EventProvider } from "./contexts/eventContext/EventContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <EventProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </EventProvider>
  </StrictMode>
);
