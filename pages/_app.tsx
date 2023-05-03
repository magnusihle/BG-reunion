import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Lexend_Exa, Lexend_Tera } from "next/font/google";

const exa = Lexend_Exa({
  variable: "--font-exa",
  subsets: ["latin"],
  display: "swap",
});
const tera = Lexend_Tera({
  variable: "--font-tera",
  subsets: ["latin"],
  display: "swap",
  // @todo: understand why extrabold (800) isn't being respected when explicitly specified in this weight array
  // weight: ['500', '700', '800'],
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={`${tera.variable} ${exa.variable} font-sans`}>
      <Component {...pageProps} />
    </main>
  );
}
