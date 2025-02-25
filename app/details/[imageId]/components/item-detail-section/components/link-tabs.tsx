"use client";

import { useLocaleContext } from "@/lib/contexts/locale-context";
import { cn } from "@/lib/utils/style";

interface LinkTabsProps {
  activeTab: "sale" | "related";
  onTabChange: (tab: "sale" | "related") => void;
  saleCount?: number;
  relatedCount?: number;
  status?: "pending" | "confirm";
}

export function LinkTabs({
  activeTab,
  onTabChange,
  saleCount = 0,
  relatedCount = 0,
}: LinkTabsProps) {
  const { t } = useLocaleContext();
  return (
    <div className="flex mb-6 border-b border-neutral-800">
      <button
        onClick={() => onTabChange("sale")}
        className={cn(
          "flex-1 flex items-center justify-center gap-2 px-4 py-3 relative",
          "text-sm transition-colors",
          activeTab === "sale"
            ? "text-primary"
            : "text-neutral-400 hover:text-neutral-200"
        )}
      >
        <span>{t.provide.saleLink}</span>
        <span className="text-sm">{saleCount}</span>
        {activeTab === "sale" && (
          <div className="absolute bottom-0 left-0 w-full h-0.5 bg-primary" />
        )}
      </button>
      <button
        onClick={() => onTabChange("related")}
        className={cn(
          "flex-1 flex items-center justify-center gap-2 px-4 py-3 relative",
          "text-sm transition-colors",
          activeTab === "related"
            ? "text-primary"
            : "text-neutral-400 hover:text-neutral-200"
        )}
      >
        <span>{t.provide.relatedLink}</span>
        <span className="text-sm">{relatedCount}</span>
        {activeTab === "related" && (
          <div className="absolute bottom-0 left-0 w-full h-0.5 bg-primary" />
        )}
      </button>
    </div>
  );
}
