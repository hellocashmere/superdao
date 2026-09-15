# Superdao Mock API

A seeded, read-only mock API built with Next.js Route Handlers and TypeScript.

This mock API and its fixture data were generated with ChatGPT.

> [!WARNING]
> This application is a mock API for local development and interface demonstrations. It is not a functional production API and must not be treated as a working backend.

## About this project

The API application supplies deterministic fixture data to the Superdao web interface. Its versioned endpoints are available under `/api/v1` and imitate the response shapes needed by the client without connecting to a database or external services.

The application does not provide real persistence, authentication, authorization, blockchain access, analytics processing, or production-grade validation and security. Mutating data in the web interface does not make this API a complete or deployable backend.

## Features

- Next.js App Router and Route Handlers
- TypeScript response contracts
- Deterministic fixture data
- Read-only collection and resource endpoints
- Filtering, sorting, and pagination for local UI development
- Versioned routes under `/api/v1`

## Project structure

```text
app/api/v1/       Versioned mock Route Handlers and fixtures
public/           Static assets served by the API application
shared/api/       Shared request parsing and response helpers
shared/config/    Fixture and demo-profile configuration
```

## Quick start

Install dependencies from the repository root:

```bash
pnpm install
```

Copy `apps/api/.env.example` to `apps/api/.env.local`, then start only the mock API:

```bash
pnpm dev:api
```

To start the complete local development environment, including the web application, run:

```bash
pnpm dev
```

## Available commands

Run these commands from the repository root:

```bash
pnpm dev:api
pnpm build:api
pnpm lint:api
pnpm typecheck:api
pnpm test:api
```

The equivalent workspace commands are also available:

```bash
pnpm --filter @superdao/api dev
pnpm --filter @superdao/api build
pnpm --filter @superdao/api lint
pnpm --filter @superdao/api typecheck
pnpm --filter @superdao/api test
```

## Production use

Do not deploy this application as a production backend. A real API must replace the fixtures with persistent data sources and implement authentication, authorization, input validation, observability, rate limiting, security controls, and operational error handling.
