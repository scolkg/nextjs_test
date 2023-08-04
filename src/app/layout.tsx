import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import { Control } from "./components/Control";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "WEB Tutorial",
  description: "Generated by scolkg",
};

type TopicType = {
  id: string;
  title: string;
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const resp = await fetch(`${process.env.NEXT_PUBLIC_API_URL}topics`, { cache: "no-cache" });
  const topics = await resp.json();
  // console.log("page/layout.tsx/topics", topics);

  return (
    <html>
      <body>
        <h1>
          <Link href="/">WEB</Link>
        </h1>
        <ol>
          {topics.map((topic: TopicType) => {
            return (
              <li key={topic.id}>
                <Link href={`/read/${topic.id}`}>{topic.title}</Link>
              </li>
            );
          })}
        </ol>
        {children}
        <Control />
      </body>
    </html>
  );
}
