import type { Metadata } from "next";
import { Provider } from "../shared/ui/provider";
import { Header } from "../shared/components/Header";
import { Toaster } from "../shared/ui/toaster";
import { Stack } from "@chakra-ui/react";

export const metadata: Metadata = {
  title: "Directional Test",
  description: "A sample project for directional testing.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body>
        <Provider>
          <Stack w={"100%"} h={"100vh"} p={4}>
            <Header />
            <Toaster />
            {children}
          </Stack>
        </Provider>
      </body>
    </html>
  );
}
