import "./globals.css";

export const metadata = {
  title: "BynexHost Uptime Monitor",
  description: "Live status of BynexHost Services",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}