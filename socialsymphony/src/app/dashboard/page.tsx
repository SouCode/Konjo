"use client";

import React, { useEffect } from "react";
import GridLayout from "react-grid-layout";
import useStore from "@/app/store/useStore";

export default function DashboardPage() {
  const { gridLayout, fetchGridLayout, saveGridLayout } = useStore();

  // Fetch the layout when the component mounts
  useEffect(() => {
    const loadLayout = async () => {
      try {
        await fetchGridLayout();
      } catch (error) {
        console.error("Error fetching grid layout:", error);
      }
    };
    loadLayout();
  }, [fetchGridLayout]);

  // Handle layout changes
  const handleLayoutChange = (newLayout: any) => {
    try {
      saveGridLayout(newLayout); // Save the updated layout to Supabase
    } catch (error) {
      console.error("Error saving grid layout:", error);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Dashboard</h2>
      <GridLayout
        className="layout"
        layout={gridLayout || []} // Fallback to an empty array
        cols={12}
        rowHeight={30}
        width={1200}
        onLayoutChange={handleLayoutChange}
      >
        {(gridLayout || []).map((item) => (
          <div key={item.i} className="border bg-light text-center p-3">
            {item.i.toUpperCase()}
          </div>
        ))}
      </GridLayout>
    </div>
  );
}
