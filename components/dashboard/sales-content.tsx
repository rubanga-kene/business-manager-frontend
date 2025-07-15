"use client";

import { Filter, FileText, } from "lucide-react";
import { Button } from "@/components/ui/button";;
import SalesDialog from "../sales/sales-dialog";
import { ToastContainer } from "react-toastify";
import SalesStatCards from "../sales/sales-stat-cards";
import SalesTable from "../sales/sales-table";

export default function SalesContent() {

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Sales & Revenue Management</h2>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-1"
          >
            <Filter className="h-4 w-4" />
            Filter by Date
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-1"
          >
            <FileText className="h-4 w-4" />
            View Report
          </Button>
          <SalesDialog/>
        </div>
      </div>
      {/* Sales stat catds */}
      <SalesStatCards/>

      {/* Sales Table */}
      <SalesTable/>

      {/* Toast container */}
      <ToastContainer/>
    </>
  );
}
