"use client";

import "./globals.css";
import { Providers } from "./GlobalRedux/provider";

// export const metadata = {
//   title: "AirliPay",
//   description: "your number one salary solution",
// };

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className=" bg-gray-300">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
