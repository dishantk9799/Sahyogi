import { Providers } from "./providers";
import "./globals.css";
export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"),
  title: {
    default: "Sahyogi - Publishing for serious independent voices",
    template: "%s | Sahyogi",
  },
  description:
    "A premium publishing platform for writers, publications, subscriptions, and durable reader relationships.",
  openGraph: {
    title: "Sahyogi",
    description: "A refined publishing platform for independent writers and publications.",
    type: "website",
  },
};
export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
