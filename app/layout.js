import "./globals.css";
import { ThemeProvider } from "../components/theme-provider";
import Headers from "../components/header";
import { ConvexClientProvider } from "./ConvexClientProvider";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/ui/themes";
import { Toaster } from "sonner";

export const metadata = {
  title: "AI Event",
  description: "Event management platform powered by AI",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body
        className={`bg-linear-to-br from-gray-950 via-zinc-900 to-stone-900 text-white`}
        suppressHydrationWarning={true}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ClerkProvider
            appearance={{
              theme: dark,
            }}
          >
            <ConvexClientProvider>
              <Headers />
              <main className="relative min-h-screen container mx-auto pt-40 md:pt-20">
                <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
                  <div className="absolute top-0 left-1/4 w-96 h-96 bg-pink-600/20 rounded-full blur-3xl" />
                  <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-orange-600/20 rounded-full blur-3xl" />
                </div>
                <div className="relative z-10 min-h-[63vh]">{children}</div>
                <footer className="border-t border-gray-800/50 py-12 px-6 max-w-3xl mx-auto w-full flex flex-col items-center justify-center text-center">
                  <h3 className="text-lg font-semibold text-gray-200 mb-2">
                    Spott
                  </h3>
                  <p className="text-sm text-gray-400 mb-6">
                    Discover local events, connect with the community, and
                    experience more.
                  </p>
                  <div className="text-xs text-gray-600">
                    &copy; {new Date().getFullYear()} Spott. All rights
                    reserved.
                  </div>
                </footer>
                <Toaster richColors />
              </main>
            </ConvexClientProvider>
          </ClerkProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
