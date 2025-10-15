"use client"
import { useEffect, useState } from "react";
import LowStock from "../dashboard-content/LowStock";
import ExpiringProducts from "../dashboard-content/ExpiringProducts";
import { ToastContainer } from "react-toastify";
import DashboardStatCards from "../dashboard-content/DashboardStatCards";
import DashboardStatCharts from "../dashboard-content/DashboardStatCharts";
import SalesChart from "../sales/SalesCharts";

export default function DashboardContent() {
  const [todayString, setTodayString] = useState("");

  useEffect(() => {
    const today = new Date();
    const dayOfWeek = today.toLocaleString("en-US", { weekday: "long" });
    const day = today.getDate().toString().padStart(2, "0");
    const month = (today.getMonth() + 1).toString().padStart(2, "0");
    const year = today.getFullYear();
    setTodayString(`${dayOfWeek}, ${day}/${month}/${year}`);
  }, []);

  return (
    <>
      <div className="flex justify-end mb-4">
        <p className="text-sm text-muted-foreground">
          {todayString || "Loading date..."}
        </p>
      </div>

      <DashboardStatCards />
      <SalesChart />
      <DashboardStatCharts />
      <LowStock />
      <ExpiringProducts />
      <ToastContainer />
    </>
  );
}
