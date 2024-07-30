# Next.js Starter

> An opinionated Next.js template based on [next-minimal-starter](https://github.com/ixahmedxi/next-minimal-starter)

## Features

- 🥟 Uses Bun
- ⭐️ Full ESM setup
- ⚡️ Super fast linting & formatting with [Biome](https://biomejs.dev)
  - Including Tailwind class sorting
  - Fallback to Prettier for [unsupported languages](https://biomejs.dev/internals/language-support/)
- ✨ Pre-configured with GitHub Actions for CI
- 🪝 Lints staged files with [nano-staged](https://github.com/usmanyunusov/nano-staged) & [simple-git-hooks](https://github.com/toplenboren/simple-git-hooks)
- 💅 [Shadcn/ui](https://ui.shadcn.com/) components pre-installed
- 🌚 Theming support with [Next Themes](https://github.com/pacocoursey/next-themes)
- 📊 Vercel Analytics
- 🔒 Simple Password Protection
- 📃 Dynamic Markdown/MDX Pages with [Content Collections](https://content-collections.vercel.app/)
- 🌎 Internationalization-ready
- 🔑 Environment Management with [T3 Env](https://env.t3.gg/)

## Getting Started

> [!IMPORTANT]
>
> - Setup Node.js v20 (recommended via [nvm](https://github.com/nvm-sh/nvm))
> - Install [Bun](https://bun.sh/)
> - Clone this repository

```bash
# Install dependencies
bun install

# Copy & fill environments
cp .env.local.example .env.local

# Optional: Enable simple-git-hooks
bunx simple-git-hooks
```

## Development

> [!TIP]  
> Install all recommended VSCode workspace plugins listed in `.vscode/extensions.json`.

```bash
# Start development server
bun run dev

# Build production frontend & start server
bun run build
bun run start

# Update dependencies interactively
bun run update

# Install shadcn/ui component
bunx shadcn-ui@latest add <component>
```
