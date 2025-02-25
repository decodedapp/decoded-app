'use client';

import { ProvideData } from '@/types/model.d';
import useModalClose from '@/lib/hooks/common/useModalClose';
import {
  StatusModal,
  StatusType,
  StatusMessageKey,
} from '@/components/ui/modal/status-modal';
import { useState, useEffect } from 'react';

interface LinkFormSectionProps {
  showLinkForm: boolean;
  onClose: () => void;
  onSubmit: () => void;
  onProvideDataChange: (data: ProvideData) => void;
}

export default function LinkFormSection({
  showLinkForm,
  onClose,
  onSubmit,
  onProvideDataChange,
}: LinkFormSectionProps) {
  const [modalConfig, setModalConfig] = useState<{
    type: StatusType;
    messageKey?: StatusMessageKey;
    isOpen: boolean;
    onClose: () => void;
  }>({
    type: 'warning',
    messageKey: 'login',
    isOpen: false,
    onClose: () => setModalConfig((prev) => ({ ...prev, isOpen: false })),
  });

  const { handleClose, isClosing, modalRef } = useModalClose({
    onClose,
  });

  useEffect(() => {
    if (window.sessionStorage.getItem('USER_DOC_ID') === null) {
      setModalConfig({
        type: 'warning',
        messageKey: 'login',
        isOpen: true,
        onClose: () => setModalConfig((prev) => ({ ...prev, isOpen: false })),
      });
      return;
    }

    if (!showLinkForm) {
      setModalConfig({
        type: 'error',
        isOpen: true,
        onClose: () => setModalConfig((prev) => ({ ...prev, isOpen: false })),
      });
      return;
    }
  }, [showLinkForm]);

  const handleSubmit = () => {
    onSubmit();
    handleClose();
    setModalConfig({
      type: 'success',
      isOpen: true,
      onClose: () => setModalConfig((prev) => ({ ...prev, isOpen: false })),
    });
  };

  if (!showLinkForm) return null;

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center p-4 z-50 
        transition-opacity duration-300 ${
          isClosing ? 'opacity-0' : 'opacity-100'
        }`}
    >
      <div
        ref={modalRef}
        className={`bg-[#111111] p-6 rounded-lg w-full max-w-md space-y-4 
          transition-transform duration-300 ${
            isClosing ? 'scale-95 opacity-0' : 'scale-100 opacity-100'
          }`}
      >
        <h3 className="text-lg font-medium text-white mb-4">링크 제공하기</h3>
        <input
          type="url"
          placeholder="아이템과 관련된 링크를 입력하세요"
          className="w-full px-4 py-3 bg-[#1A1A1A] rounded-lg border border-white/5 
                  text-white placeholder-gray-500 focus:border-[#EAFD66] 
                  focus:ring-1 focus:ring-[#EAFD66] transition-colors outline-none
                  hover:border-white/10"
          onChange={(e) => {
            const url = e.target.value;
            onProvideDataChange({
              links: [url],
            });
          }}
        />
        <div className="flex gap-2 pt-4">
          <button
            onClick={handleClose}
            className="flex-1 px-6 py-3 bg-[#1A1A1A] text-white rounded-lg font-medium
                      hover:bg-[#222222] transition-colors"
          >
            취소
          </button>
          <button
            onClick={handleSubmit}
            className="flex-1 px-6 py-3 bg-[#EAFD66] text-black rounded-lg font-medium
                      hover:bg-[#d9ec55] transition-colors"
          >
            제출하기
          </button>
        </div>
      </div>
    </div>
  );
}
