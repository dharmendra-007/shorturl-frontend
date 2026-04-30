import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import LayoutWrapper from "@/components/wrapper/LayoutWrapper";
import { AuthProvider } from "@/context/AuthContext";
import { Toaster} from 'sonner'
import { cookies } from "next/headers"
import { AUTH_COOKIE_NAME } from "@/lib/auth"
import { decodeSessionFromToken } from "@/lib/session"

export const metadata: Metadata = {
  title: "ShortUrl",
  description: "An ultimate url shortner site you will ever need",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies()
  const token = cookieStore.get(AUTH_COOKIE_NAME)?.value
  const initialSession = decodeSessionFromToken(token)

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className="font-sans antialiased"
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider initialSession={initialSession}>
            <LayoutWrapper>
              {children}
              <Toaster position="top-center" richColors closeButton/>
            </LayoutWrapper>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
