"use client";

interface ErrorComponentProps {
  error: Error;
  reset: () => void;
}

export default function Error({ error, reset }: ErrorComponentProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold text-red-500 mb-4">Error</h1>
      <p className="text-gray-400">
        {error.message || "Failed to load image details"}
      </p>
      <button
        onClick={reset}
        className="mt-4 px-4 py-2 bg-blue-500 text-white/80 rounded hover:bg-blue-600 transition-colors"
      >
        Try again
      </button>
    </div>
  );
}

interface ErrorProps {
  message?: string;
}

export function ErrorDisplay({
  message = "데이터를 불러오는데 실패했습니다",
}: ErrorProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold text-red-500 mb-4">Error</h1>
      <p className="text-gray-400">{message}</p>
    </div>
  );
}
