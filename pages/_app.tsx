import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { NavigationProvider } from "@/public/context/navigation";
import { ToastProvider } from "@/public/context/toast";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ToastProvider>
      <NavigationProvider>
        <Component {...pageProps} />
      </NavigationProvider>
    </ToastProvider>
  );
}
