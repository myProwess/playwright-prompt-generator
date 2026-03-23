import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Playwright Prompt Library | Advanced QA Automation with Copilot',
  description: 'The fastest way for QA engineers to generate high-quality Playwright tests using GitHub Copilot. Standardize your automation and boost productivity.',
  keywords: 'Playwright, GitHub Copilot, QA automation, Prompts, Test Engineering, TypeScript',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
        <div className="flex min-h-screen flex-col">
          <Navbar />
          <main className="flex-1 px-4 py-8 md:px-8 max-w-7xl mx-auto w-full">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
