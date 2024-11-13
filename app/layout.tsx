import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google";
import "./globals.css";
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import '@mantine/notifications/styles.css';
import '@mantine/tiptap/styles.css';
import { Notifications } from '@mantine/notifications';


import { ColorSchemeScript, MantineProvider } from '@mantine/core';
import StoreProvider from "./StoreProvider";

const inter = Inter({ subsets: ["latin"] });
const montserrat = Montserrat({ subsets: ['latin'] })
export const metadata: Metadata = {
  title: "TeamSpace",
  description: "Your favourite workspace",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
      <ColorSchemeScript />
      </head>
      <body className={montserrat.className}>
        <MantineProvider>
          <StoreProvider>

        {/* <AblyProvider client={client}>
        <ChannelProvider channelName="get-started"> */}
          <Notifications position="top-right" zIndex={1} />
           {children}
           {/* </ChannelProvider>
           </AblyProvider> */}
          </StoreProvider>
        </MantineProvider>
      </body>
    </html>
  );
}
