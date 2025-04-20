"use client";
import KebabMenu from "@/components/KebabMenu/KebabMenu";
import PageHeading from "@/components/PageHeading/PageHeading";
import { IconLogin2, IconSettings, IconUser, IconWalk } from "@tabler/icons-react";
import dynamic from "next/dynamic";
import { useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useState } from "react";
import DashboardCards from "./_components/DashboardCards/DashboardCards";
import DashboardCharts from "./_components/DashboardCharts/DashboardCharts";
import DashboardGoals from "./_components/DashboardGoals/DashboardGoals";
import DashboardLinks from "./_components/DashboardLinks";

// Load TourGuide on client only
const TourGuide = dynamic(() => import("@/components/TourGuide/DashboardGuide"), {
  ssr: false,
});

function DashboardContent() {
  // Use the useSearchParams hook to access search parameters
  const searchParams = useSearchParams();
  
  // Client-side only state
  const [isMounted, setIsMounted] = useState(false);
  const [chartParams, setChartParams] = useState({
    chart1: "1W",
    chart2: "1W",
    chart3: "1W",
    chart4: "1W"
  });
 
  useEffect(() => {
    setIsMounted(true);
   
    // Safe access to searchParams once on client
    setChartParams({
      chart1: searchParams.get('chart1') || "1W",
      chart2: searchParams.get('chart2') || "1W",
      chart3: searchParams.get('chart3') || "1W",
      chart4: searchParams.get('chart4') || "1W"
    });
  }, [searchParams]);

  const menuItems = [
    {
      icon: <IconUser size={22} />,
      label: "Profile",
      href: "../profile",
    },
    {
      icon: <IconSettings size={22} />,
      label: "Settings",
      href: "https://app.fitformotion.com/dashboard",
    },
    {
      icon: <IconLogin2 size={22} />,
      label: "Login",
      href: "https://app.fitformotion.com",
    },
  ];

  // Move startTour inside the component
  const handleStartTour = () => {
    import("@/components/TourGuide/DashboardGuide").then((module) => {
      module.startTour();
    });
  };

  // Return simple placeholder during server rendering
  if (!isMounted) {
    return <div className="page-container"></div>;
  }

  return (
    <div className="page-container">
      <div className="flex items-center justify-between mb-6">
        <div id="dashboard-heading">
          <PageHeading title="Dashboard Overview" />
        </div>
        <div className="flex gap-[10px] items-center">
          <button
            onClick={handleStartTour}
            className="p-[5px] bg-zinc-800 text-white rounded-full hover:bg-zinc-700 w-10 h-10 flex items-center justify-center"
          >
            <IconWalk size={22} />
          </button>
          <KebabMenu
            items={menuItems}
            header="Menu"
            itemClassName="hover:bg-blue-100"
          />
        </div>
      </div>
      <div id="dashboard-cards">
        <DashboardCards />
      </div>
      <div id="dashboard-charts">
        <DashboardCharts
          chart1DateRange={chartParams.chart1}
          chart2DateRange={chartParams.chart2}
          chart3DateRange={chartParams.chart3}
          chart4DateRange={chartParams.chart4}
        />
      </div>
      <div id="dashboard-links">
        <DashboardLinks />
      </div>
      <div id="dashboard-goals">
        <DashboardGoals />
      </div>
      {/* Only render TourGuide after client-side hydration */}
      <TourGuide autoStart={false} />
    </div>
  );
}

export default function DashboardPage() {
  return (
    <Suspense fallback={<div className="page-container">Loading dashboard...</div>}>
      <DashboardContent />
    </Suspense>
  );
}