FROM node:20-alpine AS builder

WORKDIR /build

COPY package*.json ./

RUN npm ci

COPY src ./src
COPY tsconfig.json ./
COPY public/less ./public/less
COPY public/less/variables.less ./public/less/
COPY public/less/mixins.less ./public/less/
COPY public/less/style.less ./public/less/

RUN npm run build:ts

RUN npm run build:less


FROM node:20-alpine AS dependencies

WORKDIR /app

COPY package*.json ./

RUN npm ci --only=production


FROM node:20-alpine AS runtime

WORKDIR /app

RUN addgroup -g 1001 -S nodejs && adduser -S nodejs -u 1001

COPY --from=dependencies /app/node_modules ./node_modules
COPY --from=builder /build/dist ./dist
COPY --from=builder /build/public ./public

RUN chown -R nodejs:nodejs /app

USER nodejs

EXPOSE 3000

ENV NODE_ENV=production
ENV NODE_OPTIONS="--max-old-space-size=512"

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3000', (r) => {if (r.statusCode !== 200) throw new Error(r.statusCode)})"

CMD ["node", "dist/index.js"]
