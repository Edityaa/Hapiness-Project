import { getServerSession } from "next-auth";
import Providers from "./Providers";
import "./globals.css";

export const metadata = {
  title: "Celebra",
  description: "Workspace OS",
};

export default async function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}