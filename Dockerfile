# Stage 1: Build
FROM node:22-alpine AS build

WORKDIR /app

# Cache dependencies layer
COPY package*.json ./

RUN npm ci

# Copy application sources
COPY . .

# Build the Nuxt production application
RUN npm run build

# Stage 2: Runtime
FROM node:22-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV PORT=3000

# Create non-root user
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nuxt

# Copy compiled Nitro output (self-contained, no node_modules required)
COPY --from=build --chown=nuxt:nodejs /app/.output ./.output

USER nuxt

EXPOSE 3000

CMD ["node", ".output/server/index.mjs"]

