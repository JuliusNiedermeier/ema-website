import localFont from "next/font/local";

export const catamaran = localFont({
  src: [
    {
      path: "./catamaran-medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "./catamaran-regular.woff2",
      weight: "400",
      style: "normal",
    },
  ],
  display: "swap",
  variable: "--font-catamaran",
});

export const tiempos = localFont({
  src: [
    {
      path: "./tiempos-light.woff2",
      weight: "300",
      style: "normal",
    },
  ],
  display: "swap",
  variable: "--font-tiempos",
});
