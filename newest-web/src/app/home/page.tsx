// app/home/page.tsx
import { Metadata } from "next";
import HomePageContainer from "./HomePageContainer";

export const metadata: Metadata = {
  title: "Newest - 실시간 급상승 검색어",
  description: "당신만 모르는 실시간 검색어! 지금 확인해 보세요!",
  openGraph: {
    title: "Newest - 실시간 급상승 검색어",
    description: "당신만 모르는 실시간 검색어! 지금 확인해 보세요!",
    url: "https://www.shin1995seoul.com/",
    siteName: "MyApp",
    images: [
      {
        url: "/images/001.png",
        width: 1200,
        height: 630,
        alt: "Newest - 실시간 급상승 검색어",
      },
    ],
    type: "website",
    locale: "ko_KR",
  },
};

export default function HomePage() {
  return <HomePageContainer />;
}
