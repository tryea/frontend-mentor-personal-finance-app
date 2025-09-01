import { IconCaretRight } from "@/src/shared/ui/icons";
import React from "react";

interface SummaryCardProps {
  children: React.ReactNode;
  title: string;
  className?: string;
  onSeeDetailsClick: () => void;
  actionLabel?: string;
}

const SummaryCard = ({
  children,
  className,
  title,
  onSeeDetailsClick,
  actionLabel = "See Details",
}: SummaryCardProps) => {
  return (
    <div className={`big-card bg-white rounded-xl flex flex-col ${className}`}>
      <div className="flex flex-row justify-between">
        <p className="text-preset-2 text-grey-900">{title}</p>
        <button
          onClick={onSeeDetailsClick}
          className="text-preset-4 text-grey-500 flex flex-row gap-3 cursor-pointer items-center"
        >
          {actionLabel}
          <IconCaretRight className="inline-block text-grey-500 w-3 h-3" />
        </button>
      </div>
      {children}
    </div>
  );
};

export default SummaryCard;
