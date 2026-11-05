import type { Metadata, Viewport } from "next";
import "./globals.css";
export const metadata: Metadata = {
  title: "Kaarigiri — Made with meaning",
  description: "Thoughtful objects, crafted by hand. Discover artisan-made pieces from Kaarigiri.",
  applicationName: "Kaarigiri",
  manifest: "/manifest.webmanifest",
  appleWebApp: { capable: true, title: "Kaarigiri", statusBarStyle: "black-translucent" },
  icons: { icon: "/kaarigiri-icon.svg", apple: "/kaarigiri-icon.svg" }
};
export const viewport: Viewport = { themeColor: "#25271f", width: "device-width", initialScale: 1 };
export default function RootLayout({children}:{children:React.ReactNode}) { return <html lang="en"><body>{children}<script dangerouslySetInnerHTML={{__html:`if("serviceWorker" in navigator){window.addEventListener("load",()=>navigator.serviceWorker.register("/sw.js").catch(()=>{}),{once:true})}`}} /></body></html>; }
