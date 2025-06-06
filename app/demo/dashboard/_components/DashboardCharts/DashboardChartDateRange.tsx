"use client";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { Slider } from "@nextui-org/slider";

export default function DashboardChartDateRange({
  chartId,
}: {
  chartId: number;
}) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const valueToLabelMap: { [key: number]: string } = {
    10: "1W",
    20: "1M",
    30: "1Y",
  };

  function handleChangeDateRange(term: number) {
    const params = new URLSearchParams(searchParams);
    const dynamicKey = `chart${chartId}`;
    const label = valueToLabelMap[term] || String(term);

    if (term || term === 0) {
      params.set(dynamicKey, label);
    } else {
      params.delete(dynamicKey);
    }
    replace(`${pathname}?${params.toString()}`, { scroll: false });
  }

  return (
    <Slider
      aria-label="Date Range Slider"
      onChange={(value) => {
        if (typeof value === "number") {
          handleChangeDateRange(value);
        } else {
          console.error(
            "Expected 'value' to be a number, but received an array.",
          );
        }
      }}
      size="sm"
      step={10}
      color="foreground"
      showSteps={true}
      defaultValue={10}
      maxValue={30}
      minValue={10}
      className="w-44"
      classNames={{ mark: "text-xs text-zinc-600 dark:text-zinc-400" }}
      marks={[
        { value: 10, label: "1W" },
        { value: 20, label: "1M" },
        { value: 30, label: "1Y" },
      ]}
    />
  );
}
