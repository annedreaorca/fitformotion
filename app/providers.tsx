"use client";
import { ConfettiProvider } from "@/contexts/ConfettiContext";
import { SidebarToggleProvider } from "@/contexts/SidebarToggleContext";
import { WorkoutControlsProvider } from "@/contexts/WorkoutControlsContext";
import { WorkoutDataProvider } from "@/contexts/WorkoutDataContext";
import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NextUIProvider className="flex flex-col grow">
      <NextThemesProvider
        attribute="class"
        defaultTheme="dark"
        themes={["light", "dark"]}
      >
        <WorkoutControlsProvider>
          <WorkoutDataProvider>
            <SidebarToggleProvider>
              <ConfettiProvider>{children}</ConfettiProvider>
            </SidebarToggleProvider>
          </WorkoutDataProvider>
        </WorkoutControlsProvider>
      </NextThemesProvider>
    </NextUIProvider>
  );
}
