import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "天选桃花运 - 脱单抽签 | 今日桃花运 | 相亲匹配度",
  description: "测算你的桃花运！脱单抽签、今日桃花运、相亲匹配度、复合抽签，专业的情感运势分析工具。",
  keywords: "桃花运,脱单,抽签,相亲,匹配度,复合,恋爱,运势",
  authors: [{ name: "天选桃花运" }],
  openGraph: {
    title: "天选桃花运 - 测算你的桃花运",
    description: "专业的情感运势分析工具",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className="antialiased">
        <div className="min-h-screen bg-[#FFF9F5]">
          {children}
        </div>
      </body>
    </html>
  );
}
