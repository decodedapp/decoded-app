'use client';

import React, { useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ContentsCard, type ContentsCardProps } from '@/components/ContentsCard/ContentsCard';
import { toContentHref, getContentLinkProps } from '@/lib/routing';
import { useRecentContentStore } from '@/store/recentContentStore';

interface ContentsCardLinkProps extends Omit<ContentsCardProps, 'onCardClick'> {
  channelId: string;
  prefetchOnHover?: boolean;
  prefetchOnViewport?: boolean;
}

/**
 * Link 기반 네비게이션을 지원하는 ContentsCard 래퍼
 * 기존 ContentsCard의 모든 기능을 유지하면서 Intercepting Routes 지원
 */
export function ContentsCardLink({
  channelId,
  prefetchOnHover = true,
  prefetchOnViewport = false,
  ...cardProps
}: ContentsCardLinkProps) {
  const router = useRouter();
  const { addContent } = useRecentContentStore();
  const contentUrl = toContentHref({ channelId, contentId: cardProps.card.id });
  const linkProps = getContentLinkProps({ channelId, contentId: cardProps.card.id });

  // 호버 시 prefetch (성능 최적화)
  const handlePrefetch = useCallback(() => {
    if (prefetchOnHover) {
      router.prefetch(contentUrl);
    }
  }, [router, contentUrl, prefetchOnHover]);

  // 기존 onCardClick을 Link 네비게이션으로 교체
  const handleCardClick = useCallback(() => {
    // Link에서 네비게이션을 처리하므로 여기서는 analytics만
    console.log('🎯 [ContentsCardLink] Card clicked, navigating to:', contentUrl);

    // 최근 본 콘텐츠에 추가
    addContent({
      id: cardProps.card.id,
      channelId: channelId,
      title: cardProps.card.metadata?.title || 'Untitled',
      thumbnailUrl: cardProps.card.thumbnailUrl,
    });

    // TODO: Analytics 이벤트 추가
    // trackEvent('content_card_click', {
    //   content_id: cardProps.card.id,
    //   channel_id: channelId,
    //   position: cardProps.gridIndex
    // });
  }, [contentUrl, cardProps.card.id, channelId, cardProps.gridIndex, addContent, cardProps.card.metadata?.title, cardProps.card.thumbnailUrl]);

  return (
    <div
      onMouseEnter={prefetchOnHover ? handlePrefetch : undefined}
      onClick={handleCardClick}
      className="block focus:outline-none focus:ring-2 focus:ring-primary-500 rounded-xl cursor-pointer"
      aria-label={`${cardProps.card.metadata?.title || cardProps.card.id} 콘텐츠 보기`}
    >
      <ContentsCard
        {...cardProps}
        onCardClick={() => {}} // Link가 네비게이션을 처리하므로 빈 함수
      />
    </div>
  );
}
