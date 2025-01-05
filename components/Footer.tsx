'use client';
import { useState } from 'react';
import Image from 'next/image';
import { pretendardRegular } from '@/lib/constants/fonts';
import { Button } from '@mui/material';

function Footer() {
  const [isType, setIsType] = useState<boolean>(false);

  return (
    <footer className="footer p-10 mt-10 border-t-2 border-gray-500/50">
      <div className="flex flex-col lg:flex-row w-full">
        <div
          className={`flex flex-col ${pretendardRegular.className} mt-10 lg:mt-0 lg:mx-32`}
        >
          <h2 className="text-lg">디코디드(주)</h2>
          <div className="flex flex-col mt-4">
            <h3 className="text-sm">
              서울시 강남구 도산대로 156(논현동) | 대표자 : 정소윤, 곽동호
            </h3>
            <h3 className="text-sm mt-2">
              사업자등록번호 : 123-45-67890 | 통신판매업신고번호 :
              2024-서울강남-0000
            </h3>
            <h3 className="text-sm mt-2">
              이메일 : decodedapp@gmail.com | 전화번호 : 02-1234-5678
            </h3>
            <h3 className="text-sm mt-4">
              2024 Decoded Limited. All Rights Reserved.
            </h3>
          </div>
        </div>
        <div
          className={`flex-col hidden lg:block ${pretendardRegular.className}`}
        >
          <p className={`text-lg`}>
            뉴스레터를 구독해 최신 뉴스를 놓치지 마세요.
          </p>
          <div className={`flex mt-4 items-center`}>
            <input
              type="text"
              placeholder="이메일 주소"
              className="w-[300px] h-[40px] border-2 border-gray-500/30 rounded-lg p-2 bg-[#212124]"
            />
            <Button
              style={{
                color: 'white',
                border: '1px solid white',
                width: '100px',
                height: '40px',
                marginLeft: '10px',
              }}
              onClick={() => {
                alert('WIP');
              }}
            >
              구독하기
            </Button>
          </div>
          <p className="text-sm mt-4 w-[80%]">
            본 뉴스레터 구독 신청에 따라 자사의 개인정보수집 관련 이용약관에
            동의한 것으로 간주됩니다.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
