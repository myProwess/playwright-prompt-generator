# Playwright Prompt Library

![License: ISC](https://img.shields.io/badge/License-ISC-orange.svg) 
![Stack: Next.js 16](https://img.shields.io/badge/Stack-Next.js%2016-black.svg)
![UI: Tailwind CSS 4](https://img.shields.io/badge/UI-Tailwind%20CSS%204-blue.svg)

### 🚀 [Live Demo](https://myprowess.github.io/playwright-prompt-generator/)

## 🏢 The Virtual Storefront for Modern QA Automation

Playwright Prompt Library is a high-performance, developer-centric "virtual bookstore" for test automation engineers. Built on the cutting-edge Next.js 16 stack, it provides an expertly curated repository of **171+ battle-tested Playwright prompts** designed specifically to feed GitHub Copilot. Stop writing repetitive boilerplate and start generating production-grade test suites in seconds by using standardized, proven automation patterns.

---

## 🏗️ Architecture & Technology Stack

The project is designed with a **Static Site Generation (SSG)** architecture, ensuring near-instant load times and zero-latency searching across nearly two-hundred data entries.

- **Frontend Core**: [Next.js 16 (App Router)](https://nextjs.org/) utilizing the high-speed **Turbopack** compiler.
- **Styling Engine**: [Tailwind CSS 4](https://tailwindcss.com/) with a custom premium design system featuring glassmorphism and high-contrast typography.
- **Interactions**: [Framer Motion](https://www.framer.com/motion/) for fluid, professional micro-animations.
- **Iconography**: [Lucide React](https://lucide.dev/) for a clean, consistent visual language.
- **Data Architecture**: Decentralized JSON datasources (`prompts.json` & `enterprise_prompts.json`) integrated at build-time for maximum performance.

---

## 📸 Visual Overview

### Main Dashboard
*(Preview of the high-contrast orange identity and simplified navigation)*
![Dashboard Placeholder](https://via.placeholder.com/1200x630/FFFFFF/EA580C?text=Playwright+Library+Dashboard)

### Prompt Exploration
*(The streamlined library view with 171+ unique automation scenarios)*
![Library Placeholder](https://via.placeholder.com/1200x630/FFFFFF/EA580C?text=171+Expert+Prompts+Overview)

---

## 🛠️ Installation & Setup

Ensure you have **Node.js 18+** installed on your system before proceeding.

### 1. Clone & Install
```bash
git clone https://github.com/myProwess/playwright-prompt-generator.git
cd playwright-prompt-generator
npm install
```

### 2. Local Development
Start the Turbopack-powered development server:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the application in your browser.

### 3. Production Build
Generate an optimized static export:
```bash
npm run build
```
The static files will be generated in the `.next` and `out` directories.

---

## 🚀 Usage Examples

### Using the "Copy-to-Clipboard" Workflow
1. **Find**: Navigate to the [Library](http://localhost:3000/library) and use the search bar to find a scenario (e.g., "Login Robustness").
2. **Copy**: Click the **"Copy Prompt"** button on the card or the detail page.
3. **Generate**: Paste the copied text as a comment in your `.spec.ts` file:

```typescript
// Copied Prompt:
// Generate a Playwright ui test for a login application handling 
// robust waits, network synchronization, and production-grade stability.

/* ENTER and let GitHub Copilot do the rest! */
```

---

## 📂 Directory Structure

```text
.
├── app/                 # Next.js App Router (Layouts, Pages, Styles)
├── components/          # Premium React components (Common UI, Navbar, Footer)
├── data/                # Core Data Sources
│   ├── prompts.json     # Standard open-source prompt entries
│   └── enterprise_prompts.json # 150+ Advanced enterprise automation scenarios
├── public/              # Static assets and media
├── tailwind.config.ts   # Design system tokens and orange branding
└── next.config.ts       # Framework configuration
```

---

## 🤝 Contribution & License

### Contributing
We welcome contributions that improve the quality of our prompt library or the UI experience.
1. Fork the Project.
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`).
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`).
4. Push to the Branch (`git push origin feature/AmazingFeature`).
5. Open a Pull Request.

### License
Distributed under the **ISC License**. See `package.json` for details.

---

<p align="center">
  <b>Built for Modern QA Engineers • Powered by Next.js</b>
</p>
