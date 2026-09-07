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
  mock-api/           Seeded json-server API for local demos
packages/
  ui/                 Shared UI components and global styles
  icons/              Shared icon package
  eslint-config/      Shared ESLint configuration
  typescript-config/  Shared TypeScript configuration
```

## Quick start with Docker

Prerequisite: Docker Engine or Docker Desktop with Compose v2.

```bash
docker compose -f docker-compose.dev.yaml up --build
```

Open the app at http://localhost:3000 and the mock API at http://localhost:3001.
Stop with `docker compose -f docker-compose.dev.yaml down`; add `--remove-orphans` when troubleshooting cleanup. The first build downloads images and dependencies and is slower; subsequent builds use the cache.

To run the production Compose variant:

```bash
docker compose -f docker-compose.prod.yaml up --build
```

Both variants currently compile `NEXT_PUBLIC_API_URL=http://localhost:3001` into the browser bundle. Changing it requires rebuilding the web image.

| Issue | Resolution |
| --- | --- |
| Port 3000/3001 occupied | Stop the conflicting process or change the published ports in the selected Compose file. |
| Stale images | Run `docker compose -f docker-compose.dev.yaml up --build`. |
| Health failures | Run `docker compose -f docker-compose.dev.yaml logs web mock-api`. |

## Running locally

1. Install dependencies:

   ```bash
   pnpm install
   ```

2. Copy `apps/web/.env.example` to `apps/web/.env.local`.

3. Start all development tasks (including the mock API):

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
