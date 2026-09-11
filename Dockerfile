# syntax=docker/dockerfile:1.7
FROM node:22.22.2-bookworm-slim AS base
WORKDIR /repo
RUN npm install --global pnpm@12.3.4

FROM base AS web-deps
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml turbo.json ./
COPY apps/web/package.json apps/web/package.json
COPY apps/api/package.json apps/api/package.json
COPY packages/ui/package.json packages/ui/package.json
COPY packages/icons/package.json packages/icons/package.json
COPY packages/hooks/package.json packages/hooks/package.json
COPY packages/lib/package.json packages/lib/package.json
COPY packages/eslint-config/package.json packages/eslint-config/package.json
COPY packages/typescript-config/package.json packages/typescript-config/package.json
RUN --mount=type=cache,id=superdao-pnpm,target=/pnpm/store pnpm config set store-dir /pnpm/store && pnpm install --frozen-lockfile

FROM web-deps AS web-build
COPY . .
ARG NEXT_PUBLIC_API_URL=http://localhost:3001
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL
RUN pnpm --filter @superdao/web build

FROM web-deps AS development
COPY . .

FROM node:22.22.2-bookworm-slim AS web
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV HOSTNAME=0.0.0.0
ENV PORT=3000
RUN useradd --system --uid 1001 nextjs
COPY --from=web-build --chown=nextjs:nextjs /repo/apps/web/.next/standalone/ ./
COPY --from=web-build --chown=nextjs:nextjs /repo/apps/web/public ./apps/web/public
COPY --from=web-build --chown=nextjs:nextjs /repo/apps/web/.next/static ./apps/web/.next/static
USER nextjs
EXPOSE 3000
HEALTHCHECK --interval=10s --timeout=5s --start-period=20s --retries=5 CMD node -e "fetch('http://127.0.0.1:3000').then(r=>{if(!r.ok)process.exit(1)}).catch(()=>process.exit(1))"
CMD ["node", "apps/web/server.js"]

FROM web-deps AS api-build
COPY . .
RUN pnpm --filter @superdao/api build

FROM node:22.22.2-bookworm-slim AS api
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV HOSTNAME=0.0.0.0
ENV PORT=3001
RUN useradd --system --uid 1001 api
COPY --from=api-build --chown=api:api /repo/apps/api/.next/standalone/ ./
COPY --from=api-build --chown=api:api /repo/apps/api/.next/static ./apps/api/.next/static
COPY --from=api-build --chown=api:api /repo/apps/api/public ./apps/api/public
USER api
EXPOSE 3001
HEALTHCHECK --interval=10s --timeout=5s --start-period=10s --retries=5 CMD node -e "fetch('http://127.0.0.1:3001/api/v1/dapps?limit=1&offset=0').then(r=>{if(!r.ok)process.exit(1)}).catch(()=>process.exit(1))"
CMD ["node", "apps/api/server.js"]
