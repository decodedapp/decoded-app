'use client';

import React, { useState, useEffect, useRef } from 'react';
import { LoginButton } from '@/components/Header/nav/LoginButton';
import { X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { SearchModal } from '@/components/Header/search/SearchModal';
import { CategoryFilter } from './CategoryFilter';

export function ImageGridHeader() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [isCategoryFilterOpen, setIsCategoryFilterOpen] = useState(false);
  const router = useRouter();
  const searchContainerRef = useRef<HTMLDivElement>(null);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const toggleCategoryFilter = () =>
    setIsCategoryFilterOpen(!isCategoryFilterOpen);

  const handleSearchInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const query = event.target.value;
    setSearchQuery(query);
    if (query.trim().length > 0) {
      setIsSearchModalOpen(true);
    } else {
      setIsSearchModalOpen(false);
    }
  };

  const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (searchQuery.trim()) {
      setIsSearchModalOpen(false);
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target as Node)
      ) {
        setIsSearchModalOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [searchContainerRef]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 py-3 flex items-center justify-between relative">
        {/* Left: Logo */}
        <div className="text-2xl font-bold text-yellow-300 tracking-tight">
          decoded
        </div>

        {/* Center: Search Bar with SearchModal */}
        <div
          ref={searchContainerRef}
          className="absolute left-1/2 transform -translate-x-1/2 w-1/3 max-w-md"
        >
          <form onSubmit={handleSearchSubmit} className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg
                className="h-5 w-5 text-neutral-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <input
              id="search"
              name="search"
              className="block w-full pl-10 pr-3 py-2 border border-yellow-400 rounded-md leading-5 bg-black/30 text-white placeholder-neutral-400 focus:outline-none focus:bg-black/40 focus:ring-1 focus:ring-yellow-400 focus:border-yellow-400 sm:text-sm"
              placeholder="Search"
              type="search"
              value={searchQuery}
              onChange={handleSearchInputChange}
              onFocus={() => {
                if (searchQuery.trim().length > 0) setIsSearchModalOpen(true);
              }}
              autoComplete="off"
            />
          </form>
          <SearchModal
            isOpen={isSearchModalOpen}
            onClose={() => setIsSearchModalOpen(false)}
            searchQuery={searchQuery}
            onSearchReset={() => setSearchQuery('')}
          />
        </div>

        {/* Right: Menu Button */}
        <div className="flex items-center space-x-2">
          {/* <button
            type="button"
            onClick={toggleSidebar}
            className="p-2 rounded-md text-neutral-300 hover:text-white hover:bg-black/20 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-yellow-400"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button> */}
          <LoginButton />
          <button
            type="button"
            onClick={toggleCategoryFilter}
            className="p-2 rounded-md text-neutral-300 hover:text-white hover:bg-black/20 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-yellow-400"
          >
            {/* Filter Icon (Heroicons) */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 3c-1.2 0-2.3.4-3.2 1.1C7.9 4.8 7 6.2 7 7.7v.8c0 .5.1 1 .3 1.5L10 14v5c0 .6.4 1 1 1h2c.6 0 1-.4 1-1v-5l2.7-4c.2-.4.3-.9.3-1.5v-.8c0-1.5-.9-2.9-1.8-3.6C14.3 3.4 13.2 3 12 3z M7 11h10"
              />
            </svg>
            <span className="sr-only">Filter</span>
          </button>
        </div>
      </div>

      {/* 하단 행: 카테고리 필터 (조건부 렌더링) */}
      {isCategoryFilterOpen && (
        <>
          {/* Backdrop */}
          <CategoryFilter />
          <div
            className="fixed inset-0 bg-black/50 z-40"
            onClick={toggleCategoryFilter}
            aria-hidden="true"
          ></div>
        </>
      )}

      {/* Sidebar (Login Navigation) */}
      {isSidebarOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/50 z-40"
            onClick={toggleSidebar}
            aria-hidden="true"
          ></div>

          {/* Sidebar Panel */}
          <div className="fixed top-0 right-0 w-80 h-full bg-neutral-900 z-50 p-6 shadow-xl flex flex-col">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-white">메뉴</h2>
              <button
                onClick={toggleSidebar}
                className="p-1 rounded-md text-neutral-400 hover:text-white hover:bg-neutral-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-yellow-400"
              >
                <X className="h-6 w-6" />
                <span className="sr-only">Close menu</span>
              </button>
            </div>

            {/* Navigation Content */}
            <nav className="flex flex-col space-y-4">
              {/* <LoginButton /> */}
              {/* 추가적인 네비게이션 링크나 컴포넌트를 여기에 추가할 수 있습니다. */}
              {/* 예: <a href="/profile" className="text-neutral-300 hover:text-white">프로필</a> */}
            </nav>
          </div>
        </>
      )}
    </header>
  );
}
