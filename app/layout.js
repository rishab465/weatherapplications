import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Weather App - Real-time Weather Forecast",
  description: "A modern weather application that provides real-time weather information for any location worldwide. Built with Next.js and OpenWeatherMap API.",
  icons: {
    icon: "/favicon.ico",
  },
  keywords: "weather, forecast, temperature, humidity, real-time",
  openGraph: {
    title: "Weather App",
    description: "Get real-time weather information for any location",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
