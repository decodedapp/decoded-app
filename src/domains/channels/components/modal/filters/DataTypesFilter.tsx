'use client';

import React, { memo } from 'react';

interface DataTypesFilterProps {
  selectedDataTypes: string[];
  onDataTypesChange: (dataTypes: string[]) => void;
}

const DATA_TYPES = [
  { id: 'link', label: 'Link', icon: '🔗' },
  { id: 'image', label: 'Image', icon: '🖼️' },
  { id: 'pdf', label: 'PDF', icon: '📄' },
  { id: 'video', label: 'Video', icon: '🎥' },
  { id: 'audio', label: 'Audio', icon: '🎵' },
  { id: 'text', label: 'Text', icon: '📝' },
];

export const DataTypesFilter = memo(function DataTypesFilter({
  selectedDataTypes,
  onDataTypesChange,
}: DataTypesFilterProps) {
  const handleDataTypeToggle = (dataTypeId: string) => {
    const newSelected = selectedDataTypes.includes(dataTypeId)
      ? selectedDataTypes.filter((id) => id !== dataTypeId)
      : [...selectedDataTypes, dataTypeId];

    onDataTypesChange(newSelected);
  };

  const handleSelectAll = () => {
    const allIds = DATA_TYPES.map((dataType) => dataType.id);
    onDataTypesChange(allIds);
  };

  const handleClearAll = () => {
    onDataTypesChange([]);
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h3 className="font-medium text-base text-white">Data Types</h3>
          <svg
            className="w-4 h-4 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>

        <div className="flex gap-2">
          <button
            onClick={handleSelectAll}
            className="text-xs text-emerald-400 hover:text-emerald-300 transition-colors duration-200"
          >
            All
          </button>
          <button
            onClick={handleClearAll}
            className="text-xs text-gray-400 hover:text-gray-300 transition-colors duration-200"
          >
            Clear
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2">
        {DATA_TYPES.map((dataType) => {
          const isSelected = selectedDataTypes.includes(dataType.id);
          return (
            <button
              key={dataType.id}
              onClick={() => handleDataTypeToggle(dataType.id)}
              className={`
                group relative flex items-center justify-between p-2.5 rounded-lg text-sm transition-all duration-200
                ${
                  isSelected
                    ? 'bg-white text-black shadow-lg scale-105'
                    : 'bg-zinc-800 hover:bg-zinc-700 text-gray-300 hover:scale-102'
                }
              `}
            >
              <div className="flex items-center gap-2 min-w-0 flex-1">
                <span className="text-base flex-shrink-0">{dataType.icon}</span>
                <span className="font-medium truncate">{dataType.label}</span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
});
