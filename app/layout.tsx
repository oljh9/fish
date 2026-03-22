import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: '이준희의 낚시터',
  description: '심해를 유영하는 컬러칩 물고기를 낚아 전체 화면 그라데이션 카드로 저장하는 인터랙티브 싱글 페이지 앱',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ko" style={{ height: '100%' }}>
      <body
        style={{
          minHeight: '100%',
          margin: 0,
          background: '#020916',
          color: '#effcff',
          fontFamily:
            "Pretendard, SUIT, 'Noto Sans KR', 'Apple SD Gothic Neo', sans-serif",
        }}
      >
        {children}
      </body>
    </html>
  );
}
