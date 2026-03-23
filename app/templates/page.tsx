"use client";

import { motion } from 'framer-motion';
import { 
  Terminal, Zap, CheckCircle2, AlertTriangle, 
  Code, Play, Copy, BookOpen, Send
} from 'lucide-react';
import { useState } from 'react';

export default function Templates() {
  const [copyStatus, setCopyStatus] = useState<string | null>(null);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopyStatus(id);
    setTimeout(() => setCopyStatus(null), 2000);
  };

  const templates = [
    {
      id: 'config',
      title: 'Playwright Config',
      desc: 'Optimized configuration for parallel execution and visual regression.',
      code: `import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'mobile', use: { ...devices['iPhone 13'] } },
  ],
});`
    },
    {
      id: 'pom',
      title: 'Page Object Template',
      desc: 'Standard class structure for reusable page components.',
      code: `import { Page, Locator } from '@playwright/test';

export class BasePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigate(path: string) {
    await this.page.goto(path);
  }

  async waitForLoad() {
    await this.page.waitForLoadState('networkidle');
  }
}`
    },
    {
      id: 'api-test',
      title: 'API Test Template',
      desc: 'Boilerplate for fast API-driven automation.',
      code: `import { test, expect } from '@playwright/test';

test.describe('API Validation', () => {
  const endpoint = '/api/v1/users';

  test('GET returns list of users', async ({ request }) => {
    const response = await request.get(endpoint);
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(Array.isArray(body)).toBeTruthy();
  });
});`
    }
  ];

  return (
    <div className="flex flex-col gap-16 max-w-5xl mx-auto pb-20">
      <div className="border-b border-border pb-12">
        <h1 className="text-4xl font-black tracking-tight mb-4">Starter <span className="text-primary-600">Templates</span></h1>
        <p className="text-slate-500 dark:text-slate-400 font-medium text-lg leading-relaxed max-w-2xl">
          Quickly bootstrap your Playwright project with these standard templates designed for efficiency and scale.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {templates.map((template) => (
          <div key={template.id} className="glass-card flex flex-col rounded-3xl overflow-hidden border border-border group">
             <div className="p-8 border-b border-border bg-slate-50/50 dark:bg-slate-900/40">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-2xl font-bold">{template.title}</h3>
                  <button 
                    onClick={() => copyToClipboard(template.code, template.id)}
                    className="p-3 rounded-xl border border-border bg-white dark:bg-black/20 hover:border-primary-600 transition-all active:scale-95 group/btn"
                  >
                    {copyStatus === template.id ? <CheckCircle2 className="w-4 h-4 text-primary-600" /> : <Copy className="w-4 h-4 group-hover/btn:scale-110 transition-transform" />}
                  </button>
                </div>
                <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{template.desc}</p>
             </div>
             <div className="p-8 bg-slate-950 font-mono text-xs leading-relaxed text-slate-300 overflow-x-auto h-[300px] custom-scrollbar">
                <pre>{template.code}</pre>
             </div>
          </div>
        ))}
      </div>
    </div>
  );
}
