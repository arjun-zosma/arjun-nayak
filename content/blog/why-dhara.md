---
title: "Why We Built Dhara — An Open Protocol Standard for AI Agents"
date: 2026-05-12
excerpt: "Coding agents today are products, not platforms. We built Dhara because we got tired of adapting to someone else's opinionated harness. It's a protocol standard for how agents talk to tools — like HTTP for the web."
tags: ["opensource", "ai", "agents", "protocol"]
published: true
---

## Why Another Agent Tool?

Coding agents today are **products**, not platforms. Every single one ships as a bloated, all-in-one package that forces you into its way of working. Claude Code wants you to use their plugin system. Codex wants you to use their workspace model. Opencode wants you to configure a dozen YAML files before you can do anything useful.

We built [Dhara](https://github.com/zosmaai/dhara) because we got tired of adapting to someone else's opinionated harness. The agent loop itself — LLM calls tools, observes results, plans next step, repeats — is a simple state machine. It shouldn't require a platform. It shouldn't lock you into a language, a plugin API, or a vendor's release cycle.

Dhara is a **protocol standard** for how agents talk to tools. Like HTTP standardized how web servers talk to browsers, like LSP standardized how editors talk to language servers — Dhara standardizes how coding agents talk to extensions. The spec is the product. Anyone can implement it.

## The Frustration That Started This

Every coding agent harness available in 2026 has the same structural problems:

**Claude Code / Codex:** They're the most polished products in the space. But they're also the most locked down. Extensions require their proprietary plugin APIs. Customization happens within their walls. The system prompt changes between releases, sometimes breaking behavior you relied on. And they ask you to trust their code — you can't read it, you can't modify it.

**Opencode:** Open source is great. But Opencode ships with a client/server architecture, MCP servers, custom agents, themes, keybindings, config files, built-in tools, LSP support, and a plugin ecosystem — before you write a single line of your own code. You spend more time configuring than coding.

**Pi:** Its extension system is simpler, but it's TypeScript-only. In-process extensions mean one crash kills your whole session. And the security model is essentially a disclaimer: "extensions execute arbitrary code."

These aren't bad products. They're good products that are solving the wrong problem at the wrong layer. They're building **agent platforms** when what the ecosystem needs is an **agent protocol**.

## What Makes Dhara Different

Dhara is not a product you install and configure. Dhara is a **specification** — a JSON-RPC 2.0 protocol that defines how agents and tools communicate. The reference implementation is MIT-licensed. The spec is CC-BY-4.0.

### Protocol Over API

Not a TypeScript API you import. A wire protocol. Extensions communicate via JSON-RPC 2.0 over stdin/stdout, WASM, or TCP sockets. Write extensions in **any language** — Python, Rust, Go, TypeScript, Zig, whatever.

### Security by Design

Dhara implements capability-based security. Every extension declares what it needs at install time (filesystem read/write, network access, process spawning) and the sandbox enforces these at runtime. Like Android app permissions. Like Deno. Unlike every other coding agent.

### Lossless Memory

Every other coding agent compacts your session history by throwing away older messages. Dhara's compaction produces structured summaries but **never deletes the original conversation**. Your full history is always available, always searchable, always recoverable.

### Minimal Core, Rich Ecosystem

The core implementation is under **2,000 lines** — just the agent loop, protocol, session format, event bus, and sandbox. You can read the entire core in an afternoon. Everything else is an extension.

## Built From India

Dhara is built out of India. Not outsourced. Not funded by Silicon Valley. Built by a team that lives and works in India, making architectural decisions from here.

There's a persistent narrative that Indian tech companies build the cheap version. That's not what this is. Dhara's architecture — protocol-native extensions, capability-based security, lossless memory, minimal core — is what we believe is the right way to build agent infrastructure.

[Star the repo on GitHub](https://github.com/zosmaai/dhara) · [Read the spec](https://github.com/zosmaai/dhara/tree/main/spec) · [Join the community](https://discord.gg/zosma)

---

*Dhara (धारा, dhārā) is a Sanskrit word meaning **flow** or **stream** — the continuous, seamless stream between LLM and tools that defines every agent interaction.*
