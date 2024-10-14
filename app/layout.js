import { JetBrains_Mono } from "next/font/google";
import "./globals.css";
// Components
import Header from "@/components/Header";
import PageTransition from "./pageTransition";
import StairTransition from "./StairTransition";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
  variable: "--font-jetbrainsMono",
});

export const metadata = {
  title: "OhZed",
  description: "Portfolio Oussama Zribi software engineer",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={jetbrainsMono.variable}>
        <Header />
        <StairTransition />  
        <PageTransition>{children}</PageTransition>
      </body>
    </html>
  );
}
