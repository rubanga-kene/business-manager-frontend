"use client"
import LowStock from "../dashboard-content/low-stock"
import ExpiringProducts from "../dashboard-content/expiring-products"
import { ToastContainer } from "react-toastify"
import DashboardStatCards from "../dashboard-content/dashboard-stat-cards"
import DashboardStatCharts from "../dashboard-content/dashboard-stat-charts"

export default function DashboardContent() {

 const today = () => {
  const today = new Date()
  const dayOfWeek = today.toLocaleString('en-US', {weekday:'long'})
  const day = today.getDate().toString().padStart(2, '0')
  const month = (today.getMonth() + 1).toString().padStart(2,'0')
  const year = today.getFullYear()
  return `${dayOfWeek}, ${day}/${month}/${year}`
}

  return (
    <>
      <div className="flex justify-end mb-4">
        <p className="text-sm text-muted-foreground">{today()}</p>
      </div>
      {/* Stat cards */}
      < DashboardStatCards />

      {/* Stat charts */}
      <DashboardStatCharts />
 
      {/* Low stock alerts */}
      <LowStock />

      {/* Expiring products */}
      <ExpiringProducts/>

      {/* Toast container */}
      <ToastContainer />
    </>
  )
}
