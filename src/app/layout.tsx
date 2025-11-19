import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Rotador de Matrices NxN | Visualizador de Rotaciones 90°",
  description:
    "Herramienta gratuita para rotar matrices cuadradas NxN 90 grados. Visualiza en tiempo real las rotaciones horarias y antihorarias. Perfecta para estudiantes y profesionales de matemáticas, programación y ciencias de la computación.",
  keywords:
    "matriz, rotación matriz, rotación 90 grados, matriz NxN, visualizador matriz, rotación horaria, rotación antihoraria, matemáticas, transformación matriz, álgebra lineal, programación, ciencias computación",
  authors: [{ name: "Tu Nombre" }],
  creator: "Tu Nombre",
  publisher: "Tu Nombre",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://tu-dominio.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Rotador de Matrices NxN | Visualizador de Rotaciones 90°",
    description:
      "Herramienta gratuita para rotar matrices cuadradas NxN 90 grados. Visualiza en tiempo real las rotaciones horarias y antihorarias. Perfecta para estudiantes y profesionales de matemáticas, programación y ciencias de la computación.",
    url: "https://tu-dominio.com",
    siteName: "Rotador de Matrices",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Visualizador de Rotación de Matrices NxN - Herramienta interactiva para rotar matrices 90 grados",
      },
    ],
    locale: "es_ES",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rotador de Matrices NxN | Visualizador de Rotaciones 90°",
    description:
      "Herramienta gratuita para rotar matrices cuadradas NxN 90 grados. Visualiza en tiempo real las rotaciones horarias y antihorarias. Perfecta para estudiantes y profesionales de matemáticas, programación y ciencias de la computación.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "tu-codigo-de-verificacion",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="theme-color" content="#ffffff" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="application-name" content="Rotador de Matrices NxN" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Rotador de Matrices" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-TileColor" content="#ffffff" />
        <meta name="msapplication-tap-highlight" content="no" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
