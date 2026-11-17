import type { Metadata } from "next";
import "./globals.css";
import { BrowserSetup } from "@/components/browser-setup.tsx";
export const metadata: Metadata = {
  metadataBase: new URL("https://jojo.jy.is"),
  title: {
    default: "탕수육 - 삼국지 조조전 온라인",
    template: "%s - 삼국지 조조전 온라인",
  },
  description:
    "섬멸전 코스트 계산기, 지형 상성표, 장수 정보 - 삼국지 조조전 온라인",
  manifest: "/manifest.webmanifest",
  icons: { icon: "/images/favicon.ico", apple: "/images/apple-icon.png" },
  openGraph: {
    type: "website",
    title: "탕수육 - 삼국지 조조전 온라인",
    description:
      "섬멸전 코스트 계산기, 지형 상성표, 장수 정보 - 삼국지 조조전 온라인",
    images: [{ url: "/images/og.jpg", width: 690, height: 360 }],
  },
};
export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ko">
      <body>
        <BrowserSetup />
        {children}
      </body>
    </html>
  );
}
