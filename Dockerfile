FROM imbios/bun-node:latest-iron-alpine AS base
# FROM node:18-alpine AS base
# FROM oven/bun:alpine AS base


# 1. Install dependencies only when needed
FROM base AS deps
WORKDIR /app

# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
# RUN apk add --no-cache libc6-compat 

# Install dependencies based on the preferred package manager
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* bun.lockb* bun.lock* ./
RUN \
  if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
  elif [ -f package-lock.json ]; then npm ci; \
  elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm i --frozen-lockfile; \
  elif [ -f bun.lockb ]; then bun install; \
  elif [ -f bun.lock ]; then bun install; \
  else echo "Lockfile not found." && exit 1; \
  fi

# 2. Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NEXT_TELEMETRY_DISABLED=1
RUN \
  if [ -f yarn.lock ]; then yarn run build:standalone; \
  elif [ -f package-lock.json ]; then npm run build:standalone; \
  elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm run build:standalone; \
  elif [ -f bun.lockb ]; then bun run --bun build:standalone; \
  elif [ -f bun.lock ]; then bun run --bun build:standalone; \
  else echo "Lockfile not found." && exit 1; \
  fi


# 3. Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

# Fix healthchecks
RUN apk update && apk add --no-cache curl

COPY --from=builder /app/public ./public

# Set the correct permission for prerender cache
RUN addgroup --system --gid 7294 nodejs \
  && adduser --system --uid 7294 nextjs \
  && mkdir .next \
  && chown nextjs:nodejs .next

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production
ENV HOSTNAME="0.0.0.0"
ENV PORT=3000

EXPOSE 3000

# Run server.js which is created by next build from the standalone output
CMD ["bun", "--bun", "server.js"]
# CMD ["node", "server.js"]
