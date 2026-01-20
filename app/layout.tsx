import "./globals.css";

export const metadata = {
  title: "Skina Review Kiosk",
  description: "Random no-repeat review templates for Skina",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-Hans">
      <body>{children}</body>
    </html>
  );
}
