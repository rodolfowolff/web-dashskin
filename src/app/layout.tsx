import "./globals.css";
import type { Metadata } from "next";
import { clsx } from "@nextui-org/shared-utils";
import { fontSans } from "@/config/fonts";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: "Dashskins",
  description: "Site para visualização de dados de dashboards",
  keywords: ["dashskins", "dashboards", "visualização de dados"],
  icons: {
    icon: "/favicon.ico",
  },
  authors: [{ name: "Rodolfo Wolff", url: "https://github.com/rodolfowolff" }],
  creator: "Rodolfo Wolff",
  viewport:
    "width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=5",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" style={{ backgroundColor: "#111111" }}>
      <head />
      <body
        suppressHydrationWarning={true}
        className={clsx(
          "min-h-screen bg-[#111111] font-sans antialiased",
          fontSans.variable
        )}
      >
        <Providers>
          <div
            className="relative flex flex-col justify-between min-h-screen"
            id="app-container"
          >
            {children}
          </div>
        </Providers>
      </body>
    </html>
  );
}
