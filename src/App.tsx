import "./App.css";
import { Route, Routes } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import CalendarOverviewPage from "./pages/CalendarOverviewPage";
import AddEventPage from "./pages/AddEventPage";

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<CalendarOverviewPage />} />
        <Route path="/calendar/add" element={<AddEventPage />} />
      </Route>
    </Routes>
  );
}

export default App;
