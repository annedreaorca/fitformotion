'use client';
import KebabMenu from "@/components/KebabMenu/KebabMenu";
import PageHeading from "@/components/PageHeading/PageHeading";
import { IconLogin2, IconSettings, IconUser, IconWalk } from "@tabler/icons-react";
import dynamic from "next/dynamic";
import { useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useRef, useState } from "react";
import DashboardCards from "./_components/DashboardCards/DashboardCards";
import DashboardCharts from "./_components/DashboardCharts/DashboardCharts";
import DashboardGoals from "./_components/DashboardGoals/DashboardGoals";
import DashboardLinks from "./_components/DashboardLinks";
import DashboardRecentActivity from "./_components/DashboardRecentActivity";

// Import the components dynamically to ensure they're client-side rendered
const DashboardViewToggle = dynamic(() => import("./_components/DashboardViewToggle"), { 
  ssr: false,
  loading: () => <div>Loading toggle...</div>
});

const DashboardBeginnerCharts = dynamic(
  () => import("./_components/DashboardCharts/DashboardBeginnerCharts"),
  { 
    ssr: false,
    loading: () => <div>Loading beginner charts...</div>
  }
);

// Load TourGuide on client only
const TourGuide = dynamic(() => import("@/components/TourGuide/DashboardGuide"), {
  ssr: false,
  loading: () => null
});

function DashboardContent() {
  // Use the useSearchParams hook to access search parameters
  const searchParams = useSearchParams();
  
  // Use a ref to track initial render
  const initialRenderDone = useRef(false);
  
  // Properly type the tour module ref
  const tourModuleRef = useRef<any>(null);
 
  // Client-side only state
  const [isMounted, setIsMounted] = useState(false);
  const [chartParams, setChartParams] = useState({
    chart1: "1W",
    chart2: "1W",
    chart3: "1W",
    chart4: "1W"
  });
  const [isAdvancedView, setIsAdvancedView] = useState(false);
 
  // Handle initial mount - runs only once
  useEffect(() => {
    setIsMounted(true);
    
    // Pre-load the tour module without triggering it
    import("@/components/TourGuide/DashboardGuide")
      .then(module => {
        tourModuleRef.current = module;
      })
      .catch(err => console.error("Failed to preload tour module:", err));
  }, []);

  // Handle URL params - separated from mount effect
  useEffect(() => {
    // Skip during SSR
    if (!isMounted) return;
    
    // Skip first client-side render to avoid double initialization
    if (!initialRenderDone.current) {
      initialRenderDone.current = true;
      
      // Initialize state from URL params once
      const chart1 = searchParams.get('chart1') || "1W";
      const chart2 = searchParams.get('chart2') || "1W";
      const chart3 = searchParams.get('chart3') || "1W";
      const chart4 = searchParams.get('chart4') || "1W";
      const advancedView = searchParams.get('view') === "advanced";
      
      setChartParams({
        chart1,
        chart2,
        chart3,
        chart4
      });
      
      setIsAdvancedView(advancedView);
      return;
    }
    
    // For subsequent param changes, compare before updating
    const newChart1 = searchParams.get('chart1') || "1W";
    const newChart2 = searchParams.get('chart2') || "1W";
    const newChart3 = searchParams.get('chart3') || "1W";
    const newChart4 = searchParams.get('chart4') || "1W";
    const newAdvancedView = searchParams.get('view') === "advanced";
    
    // Only update if values actually changed
    if (chartParams.chart1 !== newChart1 || 
        chartParams.chart2 !== newChart2 || 
        chartParams.chart3 !== newChart3 || 
        chartParams.chart4 !== newChart4) {
      setChartParams({
        chart1: newChart1,
        chart2: newChart2,
        chart3: newChart3,
        chart4: newChart4
      });
    }
    
    if (isAdvancedView !== newAdvancedView) {
      setIsAdvancedView(newAdvancedView);
    }
  }, [searchParams, isMounted]);

  const menuItems = [
    {
      icon: <IconUser size={22} />,
      label: "Profile",
      href: "/profile",
    },
    {
      icon: <IconSettings size={22} />,
      label: "Settings",
      href: "/profile/advanced",
    },
    {
      icon: <IconLogin2 size={22} />,
      label: "Login",
      href: "https://app.fitformotion.com",
    },
  ];

  // Move startTour inside the component
  const handleStartTour = () => {
    // Use the pre-loaded module if available
    if (tourModuleRef.current) {
      tourModuleRef.current.startTour();
    } else {
      // Fallback if module isn't loaded yet
      import("@/components/TourGuide/DashboardGuide")
        .then((module) => {
          tourModuleRef.current = module;
          module.startTour();
        })
        .catch((error) => {
          console.error("Failed to load tour guide:", error);
        });
    }
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
          <DashboardViewToggle />
          <button
            onClick={handleStartTour}
            className="p-[5px] bg-zinc-800 text-white rounded-full hover:bg-zinc-700 w-10 h-10 flex items-center justify-center"
          >
            <IconWalk size={22} />
          </button>
          {/* <KebabMenu
            items={menuItems}
            header="Menu"
            footer={<div className="p-2">User Profile Actions</div>}
            itemClassName="hover:bg-blue-100"
          /> */}
        </div>
      </div>
      
      <div id="dashboard-cards">
        <DashboardCards isAdvancedView={isAdvancedView} />
      </div>
      {/* Render different chart components based on view mode */}
      <div id="dashboard-charts">
        {isAdvancedView ? (
          <DashboardCharts
            chart1DateRange={chartParams.chart1}
            chart2DateRange={chartParams.chart2}
            chart3DateRange={chartParams.chart3}
            chart4DateRange={chartParams.chart4}
            isAdvancedView={isAdvancedView}
          />
        ) : (
          <div>
            {/* We're not using Suspense here directly */}
            <DashboardBeginnerCharts />
          </div>
        )}
      </div>
      
      <div id="dashboard-links">
        <DashboardLinks isAdvancedView={isAdvancedView} />
      </div>
      
      <div id="dashboard-goals">
        <DashboardGoals isAdvancedView={isAdvancedView} />
      </div>

      <div>
        {/* No direct Suspense in the client component */}
        <DashboardRecentActivity isAdvancedView={isAdvancedView} />
      </div>
      
      {/* Only render TourGuide after client-side hydration */}
      <TourGuide autoStart={false} />
    </div>
  );
}

export default function DashboardPage() {
  // Move Suspense to the outer component
  return (
    <Suspense fallback={<div className="page-container">Loading dashboard...</div>}>
      <DashboardContent />
    </Suspense>
  );
}