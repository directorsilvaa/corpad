import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Transforme sua presença digital em crescimento",
  description:
    "Sites, lojas virtuais, marketing, tráfego pago, hospedagem e automações para empresas que querem crescer com tecnologia.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
