import Store from "./Context/Store";
import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Chat app",
  description: "Chatting app to talk with your friends",
};

export default async function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <Store>{children}</Store>
      </body>
    </html>
  );
}
