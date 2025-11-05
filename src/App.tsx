import { Route, Routes } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import CalendarOverviewPage from "./pages/CalendarOverviewPage";
import AddEventPage from "./pages/AddEventPage";
import EventDetailsPage from "./pages/EventDetailsPage";
import "../src/styles/globals.css";

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<CalendarOverviewPage />} />
        <Route path="/calendar/add" element={<AddEventPage />} />
        <Route path="/event/:id" element={<EventDetailsPage />} />
      </Route>
    </Routes>
  );
}

export default App;
