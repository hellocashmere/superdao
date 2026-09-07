# syntax=docker/dockerfile:1.7
FROM node:22.22.2-bookworm-slim AS base
WORKDIR /repo
RUN npm install --global pnpm@11.25.0

FROM base AS web-deps
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml turbo.json ./
COPY apps/web/package.json apps/web/package.json
COPY apps/mock-api/package.json apps/mock-api/package.json
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

FROM web-deps AS mock-build
COPY apps/mock-api ./apps/mock-api
COPY apps/web/public/avatars ./apps/web/public/avatars
RUN pnpm --filter @superdao/mock-api seed && pnpm deploy --legacy --filter @superdao/mock-api --prod /out
RUN cp apps/mock-api/db.json /out/db.json

FROM node:22.22.2-bookworm-slim AS mock-api
WORKDIR /app
RUN useradd --system --uid 1001 mockapi
COPY --from=mock-build --chown=mockapi:mockapi /out/ ./
USER mockapi
EXPOSE 3001
HEALTHCHECK --interval=10s --timeout=5s --start-period=10s --retries=5 CMD node -e "fetch('http://127.0.0.1:3001/wallets?_start=0&_limit=1').then(async r=>{if(!r.ok||!(await r.json()).length)process.exit(1)}).catch(()=>process.exit(1))"
CMD ["/app/node_modules/.bin/json-server", "db.json", "--host", "0.0.0.0", "--port", "3001"]
