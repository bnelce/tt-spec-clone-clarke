import "../app/globals.css";
import { Providers } from "./providers";
import { ReactNode } from "react";

export const metadata = {
  title: "Gestora ACL",
  description: "Sistema interno da gestora ACL"
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
