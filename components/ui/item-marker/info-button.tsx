"use client";

import { ItemButtonProps } from '@/types/button.d';

interface InfoButtonProps {
  item: ItemButtonProps['item'];
  isActive: boolean;
  onClick?: () => void;
}

export function InfoButton({ item, isActive, onClick }: InfoButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`relative transition-transform duration-200 hover:scale-110 active:scale-95`}
    >
      <div className="w-6 h-6 cursor-pointer">
        <div className="absolute inset-0 border-2 border-gray-700 rounded-full animate-ping"></div>
        <div className="relative w-full h-full">
          <div className="absolute inset-0 bg-white/50 backdrop-blur-sm rounded-full border-2 border-gray-700/50"></div>
          <div className="absolute inset-[4px] bg-white rounded-full shadow-lg"></div>
        </div>
      </div>
    </button>
  );
}
