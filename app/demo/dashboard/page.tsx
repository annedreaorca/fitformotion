'use client';
import KebabMenu from "@/components/KebabMenu/KebabMenu";
import PageHeading from "@/components/PageHeading/PageHeading";
import { IconLogin2, IconSettings, IconUser, IconWalk } from "@tabler/icons-react";
import dynamic from "next/dynamic";
import { useSearchParams } from 'next/navigation';
import { Suspense, useCallback, useEffect, useRef, useState } from "react";
import DashboardCards from "./_components/DashboardCards/DashboardCards";
import DashboardCharts from "./_components/DashboardCharts/DashboardCharts";
import DashboardGoals from "./_components/DashboardGoals/DashboardGoals";
import DashboardLinks from "./_components/DashboardLinks";
import DashboardRecentActivity from "./_components/DashboardRecentActivity";

// Import the components dynamically with proper error boundaries
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

// Create a separate component for the tour functionality
interface TourButtonProps {
  onStartTour: () => void;
}

const TourButton: React.FC<TourButtonProps> = ({ onStartTour }) => {
  return (
    <button
      onClick={onStartTour}
      className="p-[5px] bg-zinc-800 text-white rounded-full hover:bg-zinc-700 w-10 h-10 flex items-center justify-center"
    >
      <IconWalk size={22} />
    </button>
  );
};

// Separate component for TourGuide to isolate the dynamic import
interface TourGuideWrapperProps {
  autoStart: boolean;
}

const TourGuideWrapper: React.FC<TourGuideWrapperProps> = ({ autoStart }) => {
  const [TourGuideComponent, setTourGuideComponent] = useState<React.ComponentType<{ autoStart: boolean }> | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    
    const loadTourGuide = async () => {
      try {
        const module = await import("@/components/TourGuide/DashboardGuide");
        if (isMounted) {
          setTourGuideComponent(() => module.default);
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Failed to load TourGuide:", error);
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadTourGuide();

    return () => {
      isMounted = false;
    };
  }, []);

  if (isLoading || !TourGuideComponent) {
    return null;
  }

  return <TourGuideComponent autoStart={autoStart} />;
};

function DashboardContent() {
  const searchParams = useSearchParams();
  const initialRenderDone = useRef(false);
  const [isMounted, setIsMounted] = useState(false);
  const [chartParams, setChartParams] = useState({
    chart1: "1W",
    chart2: "1W",
    chart3: "1W",
    chart4: "1W"
  });
  const [isAdvancedView, setIsAdvancedView] = useState(false);

  // Handle initial mount
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Handle URL params with useCallback to prevent unnecessary re-renders
  const updateFromSearchParams = useCallback(() => {
    if (!isMounted) return;

    if (!initialRenderDone.current) {
      initialRenderDone.current = true;
      
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
    
    const newChart1 = searchParams.get('chart1') || "1W";
    const newChart2 = searchParams.get('chart2') || "1W";
    const newChart3 = searchParams.get('chart3') || "1W";
    const newChart4 = searchParams.get('chart4') || "1W";
    const newAdvancedView = searchParams.get('view') === "advanced";
    
    setChartParams(prev => {
      if (prev.chart1 !== newChart1 || 
          prev.chart2 !== newChart2 || 
          prev.chart3 !== newChart3 || 
          prev.chart4 !== newChart4) {
        return {
          chart1: newChart1,
          chart2: newChart2,
          chart3: newChart3,
          chart4: newChart4
        };
      }
      return prev;
    });
    
    setIsAdvancedView(prev => prev !== newAdvancedView ? newAdvancedView : prev);
  }, [searchParams, isMounted]);

  useEffect(() => {
    updateFromSearchParams();
  }, [updateFromSearchParams]);

  // Tour handler without dynamic imports in the handler
  const handleStartTour = useCallback(async () => {
    try {
      const module = await import("@/components/TourGuide/DashboardGuide");
      if (module.startTour) {
        module.startTour();
      }
    } catch (error) {
      console.error("Failed to start tour:", error);
    }
  }, []);

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

  // Return simple placeholder during server rendering
  if (!isMounted) {
    return <div className="page-container">Loading dashboard...</div>;
  }

  return (
    <div className="page-container">
      <div className="flex items-center justify-between mb-6">
        <div id="dashboard-heading">
          <PageHeading title="Dashboard Overview" />
        </div>
        <div className="flex gap-[10px] items-center">
          <DashboardViewToggle />
          <TourButton onStartTour={handleStartTour} />
          <KebabMenu
            items={menuItems}
            header="Menu"
            footer={<div className="p-2">User Profile Actions</div>}
            itemClassName="hover:bg-blue-100"
          />
        </div>
      </div>
      
      <div id="dashboard-cards">
        <DashboardCards isAdvancedView={isAdvancedView} />
      </div>
      
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
          <Suspense fallback={<div>Loading beginner charts...</div>}>
            <DashboardBeginnerCharts />
          </Suspense>
        )}
      </div>
      
      <div id="dashboard-links">
        <DashboardLinks isAdvancedView={isAdvancedView} />
      </div>
      
      <div id="dashboard-goals">
        <DashboardGoals isAdvancedView={isAdvancedView} />
      </div>

      <div>
        <DashboardRecentActivity isAdvancedView={isAdvancedView} />
      </div>
      
      {/* Wrap TourGuide in its own component to isolate the dynamic import */}
      <TourGuideWrapper autoStart={false} />
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