'use client';

import { RequestButtonProps } from '../types';
import { networkManager } from '@/lib/network/network';
import { useStatusStore } from '@/components/ui/modal/status-modal/utils/store';
import { handleApiError } from '@/lib/api/core/error-handler';
import { AxiosError } from 'axios';

export function RequestButton({
  newMarkers,
  handleAdd,
  image,
  onClose,
}: RequestButtonProps) {
  const setStatus = useStatusStore((state) => state.setStatus);

  const handleRequest = async () => {
    if (sessionStorage.getItem('USER_DOC_ID') === null) {
      setStatus({
        type: 'warning',
        messageKey: 'login',
      });
      return;
    }

    const requestAddItem = {
      requestBy: sessionStorage.getItem('USER_DOC_ID'),
      items: newMarkers.map((marker) => ({
        position: {
          top: marker.y.toString(),
          left: marker.x.toString(),
        },
        context: marker.context || '',
      })),
    };

    try {
      await networkManager.request(
        `user/${sessionStorage.getItem('USER_DOC_ID')}/image/${
          image.docId
        }/request/add`,
        'POST',
        requestAddItem
      );

      handleAdd([]);
      setStatus({
        type: 'success',
        messageKey: 'request',
      });
      onClose?.();
    } catch (error: any) {
      setStatus({
        type: 'warning',
        messageKey: 'duplicate',
      });
    }
  };

  return (
    <div className="px-8 py-5">
      <div className="max-w-[600px] mx-auto">
        <button
          onClick={handleRequest}
          className={`
            w-full px-4 py-3 rounded-lg text-sm font-medium transition-colors duration-200
            bg-gray-400/10 text-gray-400 hover:bg-[#EAFD66]
            ${
              newMarkers.length === 0
                ? 'cursor-not-allowed opacity-50'
                : 'hover:text-gray-900'
            }
          `}
          disabled={newMarkers.length === 0}
        >
          요청하기
        </button>
      </div>
    </div>
  );
}
