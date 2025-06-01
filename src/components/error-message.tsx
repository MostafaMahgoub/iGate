"use client";

import { Button } from "@/components/ui/button";
import type { ErrorMessageProps } from "@/types";
import { AlertTriangle, RotateCcw } from "lucide-react";

export function ErrorMessage({ message }: ErrorMessageProps) {
  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
        <AlertTriangle className="text-red-600 text-2xl" aria-hidden="true" />
      </div>
      <h3 className="text-lg font-medium text-gray-900 mb-2 font-philosopher">
        Something went wrong
      </h3>
      <p className="text-gray-600 mb-6 max-w-md">{message}</p>
      <Button onClick={handleRefresh} aria-label="Refresh page">
        <RotateCcw className="mr-2 h-4 w-4" aria-hidden="true" />
        Try Again
      </Button>
    </div>
  );
}
