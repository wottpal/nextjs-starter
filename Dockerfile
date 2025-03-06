# syntax=docker/dockerfile:1
# check=skip=SecretsUsedInArgOrEnv

FROM imbios/bun-node:latest-22-alpine AS base
# FROM node:18-alpine AS base
# FROM oven/bun:alpine AS base


# 1. Install dependencies only when needed
FROM base AS deps
WORKDIR /app

# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
# RUN apk add --no-cache libc6-compat 

# Install dependencies based on the preferred package manager
COPY package.json bun.lock* bunfig.toml* ./
RUN bun install

# 2. Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NEXT_TELEMETRY_DISABLED=1
RUN bun run build:standalone

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
CMD ["bun", "server.js"]
# CMD ["node", "server.js"]
