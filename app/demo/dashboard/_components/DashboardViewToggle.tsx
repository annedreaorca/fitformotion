"use client";
import { Switch } from "@nextui-org/switch";
import { IconBulb, IconGraph } from "@tabler/icons-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

// Define valid view types to limit possible values
type ViewType = "beginner" | "advanced";

const isValidViewType = (view: string | null): view is ViewType => {
  return view === "advanced" || view === null; // null represents beginner view
};

export default function DashboardViewToggle() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // Validate the incoming view parameter
  const viewParam = searchParams.get("view");
  const validatedViewParam = isValidViewType(viewParam) ? viewParam : null;
  
  const [isAdvanced, setIsAdvanced] = useState<boolean>(validatedViewParam === "advanced");

  useEffect(() => {
    // Update URL when view changes, with validation
    const current = new URLSearchParams(Array.from(searchParams.entries()));
    
    if (isAdvanced) {
      current.set("view", "advanced");
    } else {
      current.delete("view");
    }
    
    // Limit other potentially malicious URL parameters if needed
    // For example, you might want to whitelist allowed parameters:
    const allowedParams = ["view", "tab"]; // Add other allowed params here
    
    Array.from(current.keys()).forEach(key => {
      if (!allowedParams.includes(key)) {
        current.delete(key);
      }
    });
    
    const search = current.toString();
    const query = search ? `?${search}` : "";
    
    router.replace(`/demo/dashboard${query}`);
  }, [isAdvanced, router, searchParams]);

  return (
    <div className="flex items-center gap-2">
      <IconBulb size={20} className={isAdvanced ? "text-gray-400" : "text-primary"} />
      <Switch
        size="sm"
        color="primary"
        isSelected={isAdvanced}
        onValueChange={setIsAdvanced}
        aria-label="Toggle advanced view"
        classNames={{
          base: "flex-row-reverse"
        }}
      />
      <IconGraph size={20} className={isAdvanced ? "text-primary" : "text-gray-400"} />
      <span className="text-sm ml-1">{isAdvanced ? "Advanced" : "Beginner"}</span>
    </div>
  );
}