---
title: "We Built a Desktop AI Coworker So You Don't Need a Claude Subscription"
date: 2026-05-12
excerpt: "Our team was spending $700/month on AI. Now we spend $10-20/month for the whole team. We built a desktop app that lets anyone run AI agents on their own computer with their own files."
tags: ["opensource", "ai", "productivity", "desktop"]
published: true
---

## The Problem With AI Right Now

Our team was spending $700/month on AI. Claude subscriptions, GPT-4 API calls, experiments that ran up bills before we noticed.

Now we spend $10-20/month for the whole team.

We didn't stop using AI. We stopped overpaying for it. And we built a desktop app that lets anyone — not just developers — run AI agents on their own computer, with their own files, using whatever model they want. Local, open-source, cheap API, or premium — pick when the task demands it.

This is **Zosma Cowork**.

If you're non-technical and you want AI to actually do work — process invoices, generate reports, analyze spreadsheets — you have bad options:

1. **Web chatbots** (ChatGPT, Claude) — They can't touch your files. You copy-paste, they guess. $20/month each, and you still do the actual work.
2. **Coding agents** (Claude Code, Codex) — Powerful but terminal-only. You need to know command line, install things, configure API keys. Not for most people.
3. **SaaS AI tools** — $50-200/month per tool, each for one specific task. They add up fast.

None of these let you use your own local models. None of them let you pick cheap providers for easy tasks and save the expensive models for hard problems. And none of them are open source.

## What We Built Instead

Zosma Cowork is a desktop app. You install it, add your API key (or point it at a local model via Ollama), and start giving it tasks. No terminal. No TUI. No subscription.

**It runs on anything.** We support OpenAI, Anthropic, Google, Groq, Together AI, and local models via Ollama or LM Studio. For sensitive work (financial data, customer records), we run Qwen 2.5-32B locally — the data never leaves the machine. For everyday tasks, we use cheap API providers that cost pennies.

**Our actual costs:** $10-20/month for the entire team. We use local models for finance, cheap API for design and content, and only use Claude for the hardest problems (about 5% of usage).

## What It Can Do

**Design a mobile app:** The agent wrote HTML, CSS, and JavaScript for a multi-screen prototype — home screen, menu, cart, checkout. It iterated on layout issues it noticed itself. No human touched a design tool.

**Process invoices into a spreadsheet:** The agent read PDFs, identified fields, and wrote a formatted .xlsx file. What takes 15-30 minutes manually happened in under a minute.

**Generate financial reports:** The agent categorized transactions, calculated totals, identified spending patterns, and produced structured reports with summaries.

## No Lock-In

Everything we built is open source under MIT. The desktop app, the agent sidecar, the extension system — all on GitHub.

- Use any model provider
- Run local models for sensitive data
- Switch providers per task
- Take your data with you
- Modify the code if you want

## Getting Started

1. [Download the latest release](https://github.com/zosmaai/zosma-cowork/releases)
2. Add your API key (or set up Ollama for local models)
3. Start giving it tasks

No subscription. No terminal required. No lock-in.

**Requirements:** macOS or Linux (Windows coming).

- [Star the repo on GitHub](https://github.com/zosmaai/zosma-cowork)
- [Watch all demos](https://zosma.ai/zosma-cowork/gallery)
- [Join the community](https://discord.gg/zosma)
