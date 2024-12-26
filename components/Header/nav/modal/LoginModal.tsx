'use client';

import React from 'react';
import { AccountSection } from './sections/AccountSection';
import { StatsSection } from './sections/StatsSection';
import { PointSection } from './sections/PointSection';
import { ModalNav } from './sections/ModalNav';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const isLoggedIn = true;

  if (!isOpen) return null;

  return (
    <div className="absolute right-0 top-[calc(100%+12px)] w-[400px] bg-[#171717] rounded-xl overflow-hidden">
      <div className="flex items-center bg-[#494E29] p-4 relative">
        <div className="flex-1">
          <img
            src="/brandings/logos/logo_white.png"
            alt="DECODED"
            className="h-6"
          />
        </div>
        <button
          onClick={onClose}
          className="absolute right-4 text-white/60 hover:text-white"
        >
          ✕
        </button>
      </div>

      <div className="bg-[#171717]">
        <AccountSection />
      </div>
      <div className="bg-[#171717]">
        <StatsSection />
        <PointSection />
      </div>
      <div className="bg-[#222222] border-t border-white/10">
        <ModalNav />
      </div>
    </div>
  );
}
