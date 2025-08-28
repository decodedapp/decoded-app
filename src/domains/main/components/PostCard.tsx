'use client';

import React, { useState } from 'react';

interface PostCardProps {
  id: number;
  title: string;
  description?: string;
  channel: string;
  author: string;
  timeAgo: string;
  upvotes: number;
  comments: number;
  thumbnail?: string | null;
  contentType: 'text' | 'image' | 'video' | 'link';
  onClick?: () => void;
}

// 썸네일 이미지 컴포넌트
function ThumbnailImage({
  src,
  alt,
  contentType,
  getContentIcon,
  getContentTypeColor,
}: {
  src: string;
  alt: string;
  contentType: string;
  getContentIcon: () => string;
  getContentTypeColor: () => string;
}) {
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  if (imageError) {
    return (
      <div className="w-full h-64 bg-zinc-800 rounded-lg flex items-center justify-center border border-zinc-700">
        <span className={`text-4xl ${getContentTypeColor()}`}>{getContentIcon()}</span>
      </div>
    );
  }

  return (
    <div className="relative w-full bg-zinc-800 rounded-lg overflow-hidden border border-zinc-700">
      {!imageLoaded && (
        <div className="w-full h-64 bg-zinc-800 animate-pulse flex items-center justify-center">
          <div className="w-8 h-8 bg-zinc-600 rounded-full"></div>
        </div>
      )}
      <div className="p-2 bg-zinc-900">
        <img
          src={src}
          alt={alt}
          className={`w-full h-auto object-contain rounded-md transition-opacity duration-200 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={() => setImageLoaded(true)}
          onError={() => {
            console.log('Image failed to load:', src);
            setImageError(true);
          }}
        />
      </div>
      {imageLoaded && (
        <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-sm px-2 py-1 rounded text-xs">
          <span className={`text-xs font-medium ${getContentTypeColor()}`}>{getContentIcon()}</span>
        </div>
      )}
    </div>
  );
}

export function PostCard({
  title,
  description,
  channel,
  author,
  timeAgo,
  upvotes,
  comments,
  thumbnail,
  contentType,
  onClick,
}: PostCardProps) {
  // 디버깅을 위한 로그
  if (process.env.NODE_ENV === 'development' && thumbnail) {
    console.log('PostCard with thumbnail:', { title, thumbnail, contentType });
  }

  const getContentIcon = () => {
    switch (contentType) {
      case 'image':
        return '📷';
      case 'video':
        return '🎥';
      case 'link':
        return '🔗';
      default:
        return '📝';
    }
  };

  const getContentTypeColor = () => {
    switch (contentType) {
      case 'image':
        return 'text-blue-400';
      case 'video':
        return 'text-red-400';
      case 'link':
        return 'text-green-400';
      default:
        return 'text-gray-400';
    }
  };

  return (
    <div
      className="bg-zinc-900 border border-zinc-800 rounded-lg overflow-hidden hover:border-zinc-700 transition-all duration-200 cursor-pointer group"
      onClick={onClick}
    >
      <div className="p-4">
        {/* 상단: 채널 정보 및 메타데이터 */}
        <div className="flex items-center gap-3 mb-3">
          {/* 동그란 채널 썸네일 */}
          <div className="w-8 h-8 bg-gradient-to-br from-[#eafd66] to-[#d4e85c] rounded-full flex items-center justify-center flex-shrink-0">
            <span className="text-zinc-900 font-bold text-sm">r</span>
          </div>

          {/* 채널명, 작성자, 시간 */}
          <div className="flex items-center gap-2 text-sm text-zinc-400">
            <span
              className="text-[#eafd66] hover:text-white cursor-pointer font-medium"
              onClick={(e) => {
                e.stopPropagation();
                // TODO: Navigate to channel
              }}
            >
              r/{channel}
            </span>
            <span className="text-zinc-600">•</span>
            <span
              className="hover:text-zinc-300 cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                // TODO: Navigate to editor profile
              }}
            >
              u/{author}
            </span>
            <span className="text-zinc-600">•</span>
            <span>{timeAgo}</span>
          </div>n
        </div>

        {/* 제목 */}
        <h3 className="text-white font-semibold mb-3 line-clamp-2 leading-tight text-lg group-hover:text-[#eafd66] transition-colors">
          {title}
        </h3>

        {/* 설명 */}
        {description && (
          <p className="text-zinc-400 text-sm mb-4 line-clamp-3 leading-relaxed">{description}</p>
        )}

        {/* 이미지 (있는 경우) */}
        {thumbnail && (
          <div className="mb-4">
            <ThumbnailImage
              src={thumbnail}
              alt={title}
              contentType={contentType}
              getContentIcon={getContentIcon}
              getContentTypeColor={getContentTypeColor}
            />
          </div>
        )}

        {/* 포스트 액션 버튼들 */}
        <div className="flex items-center gap-6 text-sm text-zinc-500 border-t border-zinc-800 pt-4">
          <button className="hover:text-orange-400 transition-colors flex items-center gap-2">
            <span className="text-orange-400 text-lg">▲</span>
            <span className="font-medium">{upvotes.toLocaleString()}</span>
          </button>
          <button className="hover:text-blue-400 transition-colors flex items-center gap-2">
            <span className="text-lg">💬</span>
            <span className="font-medium">{comments}</span>
          </button>
          <button className="hover:text-green-400 transition-colors flex items-center gap-2">
            <span className="text-lg">📤</span>
            <span>Share</span>
          </button>
          <button className="hover:text-purple-400 transition-colors flex items-center gap-2">
            <span className="text-lg">🔖</span>
            <span>Save</span>
          </button>
        </div>
      </div>
    </div>
  );
}
