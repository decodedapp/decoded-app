'use client';

import React, { useEffect, useCallback, useRef } from 'react';
import Image from 'next/image';
import { useImageColor } from './hooks/useImageColor';

interface ChannelImageSectionProps {
  imageUrl: string;
  channelName: string;
  colorShiftOnHover?: boolean;
  onColorExtracted?: (colorData: {
    primary: { rgb: string; hex: string; hsl: string };
    vibrant: { rgb: string; hex: string; hsl: string };
    muted: { rgb: string; hex: string; hsl: string };
  }) => void;
}

const ChannelImageSection: React.FC<ChannelImageSectionProps> = ({
  imageUrl,
  channelName,
  colorShiftOnHover = false,
  onColorExtracted,
}) => {
  const { extractedColor, isExtracting, extractFromImgEl } = useImageColor();
  const hasExtractedRef = useRef(false);
  const lastImageUrlRef = useRef<string>('');
  const imgRef = useRef<HTMLImageElement>(null);

  // Memoize the callback to prevent infinite loops
  const handleColorExtracted = useCallback(
    (colorData: any) => {
      if (onColorExtracted && !hasExtractedRef.current) {
        onColorExtracted(colorData);
        hasExtractedRef.current = true;
      }
    },
    [onColorExtracted],
  );

  useEffect(() => {
    // Only extract colors if imageUrl changed and we haven't extracted yet
    if (imageUrl && imageUrl !== lastImageUrlRef.current && !hasExtractedRef.current) {
      console.log('🖼️ Starting color extraction for:', imageUrl);
      lastImageUrlRef.current = imageUrl;
      hasExtractedRef.current = false;

      // Next.js Image가 완전히 로드된 후 색상 추출
      if (imgRef.current?.complete) {
        extractFromImgEl(imgRef.current);
      }
    }
  }, [imageUrl, extractFromImgEl]);

  useEffect(() => {
    if (extractedColor && !hasExtractedRef.current) {
      handleColorExtracted(extractedColor);
    }
  }, [extractedColor, handleColorExtracted]);

  // Dynamic gradient styles based on extracted colors (always use extractedColor or fallback)
  const primaryGradientStyle = extractedColor
    ? `linear-gradient(180deg, transparent 0%, transparent 45%, rgba(${extractedColor.primary.rgb}, 0.03) 55%, rgba(${extractedColor.primary.rgb}, 0.08) 65%, rgba(${extractedColor.primary.rgb}, 0.25) 75%, rgba(${extractedColor.primary.rgb}, 0.6) 85%, rgba(${extractedColor.primary.rgb}, 0.8) 95%, rgba(${extractedColor.primary.rgb}, 0.9) 100%)`
    : 'linear-gradient(180deg, transparent 0%, transparent 45%, rgba(100, 116, 139, 0.03) 55%, rgba(100, 116, 139, 0.08) 65%, rgba(100, 116, 139, 0.25) 75%, rgba(100, 116, 139, 0.6) 85%, rgba(100, 116, 139, 0.8) 95%, rgba(100, 116, 139, 0.9) 100%)';

  const blurGradientStyle = extractedColor
    ? `linear-gradient(to top, rgba(${extractedColor.primary.rgb}, 0.1) 0%, transparent 70%)`
    : 'linear-gradient(to top, rgba(100, 116, 139, 0.1) 0%, transparent 70%)';

  const atmosphericGradientStyle = extractedColor
    ? `linear-gradient(to top, rgba(${extractedColor.primary.rgb}, 0.05) 0%, transparent 100%)`
    : 'linear-gradient(to top, rgba(100, 116, 139, 0.05) 0%, transparent 100%)';

  return (
    <div className="absolute inset-0">
      {/* Background Image - Next.js Image 사용 */}
      <Image
        ref={imgRef}
        src={imageUrl}
        alt={channelName}
        fill
        className="object-cover"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        onLoad={() => {
          // 이미지 완전 로드 후 색상 추출
          if (imgRef.current && !hasExtractedRef.current) {
            console.log('🖼️ Image loaded, extracting colors...');
            extractFromImgEl(imgRef.current);
          }
        }}
        onError={() => {
          console.warn('Failed to load image:', imageUrl);
        }}
      />

      {/* Enhanced Gradient Overlay with Blur Effect */}
      <div className="absolute inset-0">
        {/* Primary gradient - 자연스러운 하단 그라디언트 */}
        <div
          className="absolute inset-0 transition-all duration-1000"
          style={{
            background: primaryGradientStyle,
          }}
        />

        {/* Subtle backdrop blur for text readability */}
        <div
          className="absolute bottom-0 left-0 right-0 h-32 backdrop-blur-[1px] transition-all duration-1000"
          style={{
            background: blurGradientStyle,
            maskImage:
              'linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0.7) 50%, rgba(0,0,0,0.2) 80%, transparent 100%)',
            WebkitMaskImage:
              'linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0.7) 50%, rgba(0,0,0,0.2) 80%, transparent 100%)',
          }}
        />

        {/* Ultra-light atmospheric effect */}
        <div
          className="absolute bottom-0 left-0 right-0 h-24 backdrop-blur-[0.5px] transition-all duration-1000"
          style={{
            background: atmosphericGradientStyle,
            maskImage:
              'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.3) 60%, transparent 100%)',
            WebkitMaskImage:
              'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.3) 60%, transparent 100%)',
          }}
        />
      </div>

      {/* 색상 시프트 오버레이 (호버 시) */}
      {colorShiftOnHover && extractedColor && (
        <div
          className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-500"
          style={{
            background: `linear-gradient(45deg, rgba(${extractedColor.vibrant.rgb}, 0.1) 0%, rgba(${extractedColor.primary.rgb}, 0.05) 100%)`,
          }}
        />
      )}

      {/* 로딩 상태 표시 */}
      {isExtracting && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-20">
          <div className="text-white text-sm">색상 분석 중...</div>
        </div>
      )}
    </div>
  );
};

export default ChannelImageSection;
