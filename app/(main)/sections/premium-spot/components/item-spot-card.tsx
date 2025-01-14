import { cn } from '@/lib/utils/style';
import { Link as LinkIcon, Sparkles } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { ImagePlaceholder } from '@/components/ui/icons/image-placeholder';

interface ItemSpotCardProps {
  image: string | null;
  title: string;
  brand: string | null;
  views: number;
  requestCount: number;
  exposureRate: string;
  trendingScore: number;
  featured?: boolean;
  imageDocId: string;
  itemDocId: string;
}

export function ItemSpotCard({
  image,
  title,
  brand,
  views,
  requestCount,
  exposureRate,
  trendingScore,
  featured,
  imageDocId,
  itemDocId,
}: ItemSpotCardProps) {
  return (
    <div
      className={cn(
        'group relative',
        'rounded-2xl overflow-hidden',
        'border border-zinc-800/50',
        'hover:border-[#EAFD66]/20',
        'transition-all duration-300',
        featured && 'ring-2 ring-[#EAFD66]'
      )}
    >
      {/* 이미지 */}
      <div className="relative aspect-[4/3] bg-zinc-900 overflow-hidden">
        {image ? (
          <Image
            src={image}
            alt={title}
            fill
            className={cn(
              'object-cover',
              'transform group-hover:scale-110',
              'transition-transform duration-700 ease-in-out'
            )}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <ImagePlaceholder
              width={62}
              height={62}
              className="text-zinc-700"
            />
          </div>
        )}
        {featured && (
          <div
            className={cn(
              'absolute top-3 right-3 z-10',
              'px-2 py-1 rounded-full',
              'bg-[#EAFD66] text-black',
              'text-xs font-medium',
              'flex items-center gap-1'
            )}
          >
            <Sparkles className="w-3 h-3" />
            <span>인기</span>
          </div>
        )}
      </div>

      {/* 콘텐츠 */}
      <div className="p-5 space-y-4">
        {/* 아이템 정보 */}
        <div>
          <h3 className="font-medium text-white">{title}</h3>
          <p className="text-sm text-zinc-400">{brand || '브랜드 정보 없음'}</p>
        </div>

        {/* 통계 */}
        <div className="grid grid-cols-3 gap-2 text-center text-sm">
          <div>
            <p className="text-[#EAFD66] font-medium">
              {views.toLocaleString()}
            </p>
            <p className="text-zinc-500 text-xs">조회</p>
          </div>
          <div>
            <p className="text-[#EAFD66] font-medium">{requestCount}</p>
            <p className="text-zinc-500 text-xs">요청</p>
          </div>
          <div>
            <p className="text-[#EAFD66] font-medium">
              {parseFloat(exposureRate).toFixed(1)}%
            </p>
            <p className="text-zinc-500 text-xs">노출률</p>
          </div>
        </div>

        {/* 링크 제공 버튼 */}
        <Link
          href={`/details/${imageDocId}?itemId=${itemDocId}`}
          className={cn(
            'w-full flex items-center justify-center gap-2',
            'py-2 rounded-lg',
            'bg-zinc-800/50 hover:bg-zinc-700/50',
            'text-sm font-medium text-white',
            'transition-colors duration-200'
          )}
        >
          <LinkIcon className="w-4 h-4" />
          <span>링크 제공하기</span>
        </Link>
      </div>
    </div>
  );
}
