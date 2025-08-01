# Use specific version for consistency
FROM node:20-alpine AS base
# Install pnpm globally once
RUN npm install -g pnpm

# Dependencies stage
FROM base AS deps
WORKDIR /app
# Copy only package files first (better caching)
COPY package.json pnpm-lock.yaml* ./
# Install dependencies with caching
RUN pnpm install --frozen-lockfile

# Builder stage  
FROM base AS builder
WORKDIR /app
# Copy dependencies from previous stage
COPY --from=deps /app/node_modules ./node_modules
# Copy source code
COPY . .

# Add memory optimization for build
ENV NODE_OPTIONS="--max-old-space-size=4096"
ENV NEXT_TELEMETRY_DISABLED=1

# Build the application
RUN pnpm build

# Production stage
FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production

# Create non-root user
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy built application and dependencies
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

# Set proper permissions
RUN chown -R nextjs:nodejs /app
USER nextjs

EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["pnpm", "start"]