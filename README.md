# Playwright Copilot - Prompt Library

The fastest way for QA engineers to generate high-quality Playwright tests using GitHub Copilot. This application provides a curated library of battle-tested prompts designed for real-world scenarios.

## Features

- **30+ Expert Prompts:** Specialized in login, e-commerce, API, and advanced network interception.
- **Dynamic Variable Replacement:** Configure your URLs and selectors directly in the UI.
- **Copilot Optimized:** Prompts formatted specifically for GitHub Copilot's best performance.
- **Best Practices Guide:** Learn the industry standards for non-flaky automation.
- **Starter Templates:** Quick-start config, POM, and API test files.
- **Dark/Light Mode:** Aesthetic, premium developer-focused UI.

## Tech Stack

- **Framework:** Next.js (App Router, Static Export)
- **Styling:** Tailwind CSS (Premium glassmorphism design)
- **Icons:** Lucide React
- **Animations:** Framer Motion

## Getting Started

1.  **Install dependencies:**
    ```bash
    npm install
    ```

2.  **Run development server:**
    ```bash
    npm run dev
    ```

3.  **Build and Export:**
    ```bash
    npm run build
    ```

## Project Structure

- `app/`: Main application pages and layout.
- `components/`: Reusable premium UI components.
- `data/prompts.json`: The core library with all 30+ prompts.
- `tailwind.config.ts`: Custom theme and color tokens.

## How to use with GitHub Copilot

1.  Browse the library and configure your prompt.
2.  Click **"For Copilot"** to copy the comment-ready version.
3.  Paste into your Playwright spec file in VS Code.
4.  Press **Enter** and let Copilot generate the code.
5.  Press **Tab** to accept and refine as needed.
