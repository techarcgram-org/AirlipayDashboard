FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Install dependencies based on the preferred package manager
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./
RUN \
  if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
  elif [ -f package-lock.json ]; then npm ci; \
  elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm i --frozen-lockfile; \
  else echo "Lockfile not found." && exit 1; \
  fi


# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Next.js collects completely anonymous telemetry data about general usage.
# Learn more here: https://nextjs.org/telemetry
# Uncomment the following line in case you want to disable telemetry during the build.
# ENV NEXT_TELEMETRY_DISABLED 1

RUN \
  if [ -f yarn.lock ]; then yarn run build; \
  elif [ -f package-lock.json ]; then npm run build; \
  elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm run build; \
  else echo "Lockfile not found." && exit 1; \
  fi

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
# Uncomment the following line in case you want to disable telemetry during runtime.
# ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

# Set the correct permission for prerender cache
RUN mkdir .next
RUN chown nextjs:nodejs .next

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=prebuild --chown=10101 /app/.next/standalone ./
COPY --from=prebuild --chown=10101 /app/.next/static ./.next/static
COPY --from=prebuild --chown=10101 /app/.next/static ./.next/standalone/.next/static
COPY --from=prebuild --chown=10101 /app/public ./
COPY --from=prebuild --chown=10101 /app/public ./public
COPY --from=prebuild --chown=10101 /app/.next/server ./.next/standalone/server
COPY --from=prebuild --chown=10101 /app/.next/cache ./.next/standalone/cache
COPY --from=prebuild --chown=10101 /app/.next/static ./_next/static
COPY --from=prebuild --chown=10101 /app/.next ./_next

USER nextjs

EXPOSE 3001

ENV PORT 3001
# set hostname to localhost
ENV HOSTNAME "0.0.0.0"

# server.js is created by next build from the standalone output
# https://nextjs.org/docs/pages/api-reference/next-config-js/output
CMD ["node", "server.js"]

# FROM node:18-alpine AS prebuild

# USER root

# WORKDIR /app

# ARG env 
# ENV NODE_ENV=dev

# RUN apk add --no-cache libc6-compat
# RUN apk add --update npm

# COPY . .


# RUN npm i --legacy-peer-deps

# WORKDIR /app

# RUN npm run build

# # /*Prepare Final Deployable Artifact*/

# FROM prebuild as builder 

# USER root

# WORKDIR /app

# ENV NEXT_TELEMETRY_DISABLED 1
# ENV UID=10101
# ENV GID=10101

# # /* create & switch to non-root user */
# RUN apk add shadow
# RUN /usr/sbin/groupadd -g ${GID} docker
# RUN /usr/sbin/useradd -s /bin/sh -g ${GID} -u ${UID} ./

# USER 10101

# COPY --from=prebuild --chown=10101 /app/.next/standalone ./
# COPY --from=prebuild --chown=10101 /app/.next/static ./.next/static
# COPY --from=prebuild --chown=10101 /app/.next/static ./.next/standalone/.next/static
# COPY --from=prebuild --chown=10101 /app/public ./
# COPY --from=prebuild --chown=10101 /app/public ./public
# COPY --from=prebuild --chown=10101 /app/.next/server ./.next/standalone/server
# COPY --from=prebuild --chown=10101 /app/.next/cache ./.next/standalone/cache
# COPY --from=prebuild --chown=10101 /app/.next/static ./_next/static
# COPY --from=prebuild --chown=10101 /app/.next ./_next


# # /* Fire up node server */
# ENV PORT 3001
# EXPOSE 3001
# CMD ["node", "server.js"]