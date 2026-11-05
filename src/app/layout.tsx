import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = { title: "Kaarigiri — Made with meaning", description: "Thoughtful objects, crafted by hand. Discover artisan-made pieces from Kaarigiri." };
export default function RootLayout({children}:{children:React.ReactNode}) { return <html lang="en"><body>{children}</body></html>; }
