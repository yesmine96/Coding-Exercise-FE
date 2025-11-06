import { Outlet } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import { Toaster } from "react-hot-toast";

export default function MainLayout() {
  return (
    <div className="flex min-h-screen flex-col ">
      <Navbar />
      <div className="mt-28">
        <Toaster position="top-right" reverseOrder={false} />
        <Outlet />
      </div>
    </div>
  );
}
