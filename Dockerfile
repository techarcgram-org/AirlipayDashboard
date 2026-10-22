# Install dependencies.
FROM node:20-bookworm-slim AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

# Build the Next.js standalone server.
FROM node:20-bookworm-slim AS build
WORKDIR /app
ARG NEXT_PUBLIC_BASE_URL=https://api.airlipay.com
ENV NEXT_PUBLIC_BASE_URL=$NEXT_PUBLIC_BASE_URL
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# Runtime image: only the standalone server, static assets, and public files.
FROM node:20-bookworm-slim AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3001
ENV HOSTNAME=0.0.0.0

COPY --from=build /app/public ./public
COPY --from=build --chown=node:node /app/.next/standalone ./
COPY --from=build --chown=node:node /app/.next/static ./.next/static

USER node
EXPOSE 3001

CMD ["node", "server.js"]
