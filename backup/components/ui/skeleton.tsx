import { cn } from "@/lib/utils/style";

interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-md bg-gray-700/30",
        className
      )}
    />
  );
} 