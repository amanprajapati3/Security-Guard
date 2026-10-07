import type { Metadata } from "next";
import "./globals.css";
import Header from "./components/section/header/Header";
import Footer from "./components/section/footer/Footer";
import SmoothScroll from "./components/shared/SmoothScroll";

export const metadata: Metadata = {
  title: "Safe Guard",
  description: "Security Service",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={` h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <SmoothScroll/>
        <Header/>
        {children}
        <Footer/>
        </body>
    </html>
  );
}
