"use client";

import { motion } from 'framer-motion';
import { 
  Terminal, Zap, CheckCircle2, AlertTriangle, 
  Code, Play, Copy, BookOpen, Send
} from 'lucide-react';

export default function BestPractices() {
  return (
    <div className="flex flex-col gap-16 max-w-4xl mx-auto pb-20">
      <div className="border-b border-border pb-12">
        <h1 className="text-4xl font-black tracking-tight mb-4">Automation <span className="text-primary-600">Best Practices</span></h1>
        <p className="text-slate-500 dark:text-slate-400 font-medium text-lg leading-relaxed max-w-2xl">
          Learn how to structure your Playwright tests for maximum stability, readability, and performance across your entire engineering team.
        </p>
      </div>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {[
          {
            title: 'Use Role Selectors',
            desc: 'Prefer <code>getByRole()</code> or <code>getByLabel()</code> over CSS or XPath. This makes your tests more resilient to design changes and ensures accessibility.',
            icon: <CheckCircle2 className="w-6 h-6 text-emerald-500" />
          },
          {
            title: 'Implement POM',
            desc: 'Separate your test logic from your selectors using the Page Object Model. This simplifies maintenance and makes your code more readable.',
            icon: <Zap className="w-6 h-6 text-amber-500" />
          },
          {
            title: 'Avoid Sleep/Waiting',
            desc: 'Never use <code>page.waitForTimeout()</code>. Use <code>page.waitForSelector()</code> or <code>page.waitForResponse()</code> instead for faster, non-flaky execution.',
            icon: <AlertTriangle className="w-6 h-6 text-rose-500" />
          },
          {
            title: 'Global Auth Setup',
            desc: 'Only log in once! Store authentication state in a JSON file and reuse it across all tests in your suite.',
            icon: <Terminal className="w-6 h-6 text-primary-600" />
          }
        ].map((item, idx) => (
          <div key={idx} className="glass-card p-8 rounded-3xl border border-border hover:border-primary-400 transition-all flex flex-col gap-4 group">
            <div className="w-12 h-12 rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-sm flex items-center justify-center group-hover:scale-110 transition-transform">
               {item.icon}
            </div>
            <h3 className="text-xl font-bold">{item.title}</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-medium" dangerouslySetInnerHTML={{ __html: item.desc }} />
          </div>
        ))}
      </section>

      <section className="mt-12">
        <h2 className="text-3xl font-black mb-8 px-4">Standard Test Structure</h2>
        <div className="p-8 rounded-3xl bg-slate-950 border border-slate-800 shadow-2xl relative overflow-hidden">
           <div className="absolute top-0 right-0 p-8 opacity-5">
              <Code className="w-64 h-64" />
           </div>
           <pre className="font-mono text-sm text-slate-300 leading-relaxed">
{`import { test, expect } from '@playwright/test';
import { LoginPage } from './pages/login.page';

test.describe('Authentication Flow', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.navigate();
  });

  test('user can log in with valid credentials', async ({ page }) => {
    await loginPage.login('admin', 'password123');
    await expect(page).toHaveURL(/.*dashboard/);
    await expect(page.getByRole('heading', { name: 'Welcome' })).toBeVisible();
  });

  test('user sees error with invalid password', async ({ page }) => {
    await loginPage.login('admin', 'wrong-pass');
    await expect(page.locator('.error')).toContainText('Invalid credentials');
  });
});`}
           </pre>
        </div>
      </section>
    </div>
  );
}
