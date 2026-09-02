# Superdao

An open-source app built with Next.js App Router, Server Components, TypeScript, Tailwind CSS, and Base UI.

![Superdao banner](apps/web/public/cover.png)

## About this project

Superdao is a learning project for exploring a modern Next.js application architecture. It is a pnpm monorepo for an audience and campaign-management workspace: explore wallets, labels, tokens, NFT collections, and applications; organize your team; and build campaigns for your community. Reusable primitives live in a dedicated UI package.

## Design

The interface is based on the [Superdao Growth Web App community file in Figma](https://www.figma.com/community/file/1276997317122667383/superdao-growth-web-app).

## Features

- Next.js App Router, layouts, and Server Components
- TypeScript across applications and packages
- Tailwind CSS v4 with shared design tokens
- A reusable `@superdao/ui` component library
- A searchable `/ui` catalog with live component previews
- Feature-Sliced Design for the web application
- pnpm workspaces and Turborepo task orchestration
- ESLint and Prettier for consistent code quality

## Repository structure

```text
apps/
  web/                Next.js application
packages/
  ui/                 Shared UI components and global styles
  icons/              Shared icon package
  eslint-config/      Shared ESLint configuration
  typescript-config/  Shared TypeScript configuration
```

## Running locally

1. Install dependencies:

   ```bash
   pnpm install
   ```

2. Start all development tasks:

   ```bash
   pnpm dev
   ```

## Available commands

```bash
pnpm dev
pnpm build
pnpm lint
pnpm typecheck
pnpm format
```

## License

Licensed under the [MIT License](LICENSE).
