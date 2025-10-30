import { Outlet } from "react-router-dom";
import Navbar from "../components/layout/Navbar";

export default function MainLayout() {
  return (
    <div className="flex min-h-screen flex-col ">
      <Navbar />
      <Outlet />
    </div>
  );
}
