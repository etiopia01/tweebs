import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { createPagesBrowserClient } from "@supabase/auth-helpers-nextjs";
import { SessionContextProvider } from "@supabase/auth-helpers-react";

export default function App({ Component, pageProps }: AppProps) {
  const supabaseClient = createPagesBrowserClient({
    supabaseKey:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRrdXFkbHJ1c2lqZXVhZWxibHdyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDE1MjA0MDIsImV4cCI6MjAxNzA5NjQwMn0.-nbX3r2qRBAfkKJtyd4YZZoPbVY_H0X3NIRdVCGYqnY",
    supabaseUrl: "https://dkuqdlrusijeuaelblwr.supabase.co",
  });
  return (
    <SessionContextProvider
      supabaseClient={supabaseClient}
      initialSession={pageProps.initialSession}
    >
      <Component {...pageProps} />
    </SessionContextProvider>
  );
}
