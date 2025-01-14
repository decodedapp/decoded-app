'use client';

import Nav from './nav/Nav';
import { cn } from '@/lib/utils/style';
import { useState, useEffect } from 'react';

interface HeaderProps {
  isSearchOpen: boolean;
  onSearchToggle: () => void;
  onLoginClick: () => void;
  onSidebarOpen: () => void;
}

function Header({
  isSearchOpen,
  onSearchToggle,
  onLoginClick,
  onSidebarOpen,
}: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={cn(
        'fixed top-0 w-full',
        'z-header',
        'flex justify-center',
        'animate-fade-in',
        isScrolled ? 'bg-black/5 backdrop-blur-[10px]' : 'bg-black/1 backdrop-blur-[0px]',
      )}
      style={{
        transform: `translateZ(0)`,
      }}
    >
      <div className="w-full max-w-[1728px] h-header-mobile md:h-header-desktop flex items-center gap-4">
        <Nav
          isSearchOpen={isSearchOpen}
          onSearchToggle={onSearchToggle}
          onLoginClick={onLoginClick}
          onSidebarOpen={onSidebarOpen}
        />
      </div>
    </header>
  );
}

export default Header;
