import { lazy } from "react";
import { Outlet } from "react-router-dom";
const Friends = lazy(() => import("../components/Friends"));

export default function Home() {
  return (
    <main className="flex">
      <div className="w-[30%]">
        <Friends />
      </div>
      <div className="w-[70%]">
        <Outlet />
      </div>
    </main>
  );
}
