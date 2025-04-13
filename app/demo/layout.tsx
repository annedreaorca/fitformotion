import Navbar from "@/components/Navbar/Navbar";
import ActiveWorkoutWarning from "@/components/Notices/ActiveWorkoutWarning";
import Sidebar from "@/components/Sidebar/Sidebar";
import { ThemeProvider } from "next-themes";
import LayoutWrapper from "./LayoutWrapper.client";
import SiteNotice from "./SiteNotice";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark">
      <SiteNotice
        message="Beta: Data may be subject to change or loss."
        variant="danger"
        visible={false}
      />
      <div className="flex grow z-50">
        <Sidebar />
        <main className="flex flex-col grow w-full">
          <LayoutWrapper>
            <ActiveWorkoutWarning />
            <div className="max-[767px]:pb-[60px]">
              {children}
            </div>
          </LayoutWrapper>
          <div className="fixed bottom-0 w-full z-50">
            <Navbar />
          </div>
        </main>
      </div>
    </ThemeProvider>
  );
}