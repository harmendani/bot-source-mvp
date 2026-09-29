FROM node:22-alpine AS base
WORKDIR /app
RUN corepack enable && \
  apk add --no-cache libc6-compat


FROM base AS deps
COPY package.json yarn.lock ./ 
RUN yarn config set nodeLinker node-modules && \
  yarn install --immutable


FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN yarn config set nodeLinker node-modules && \
  yarn build


FROM base AS prod-deps
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn config set nodeLinker node-modules && \
  yarn workspaces focus --production


FROM node:22-alpine  AS runner-build
WORKDIR /app

COPY --from=prod-deps /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package.json /app/.env ./

RUN apk add --no-cache libc6-compat dumb-init && \
  rm -rf /usr/local/lib/node_modules/npm && \
  rm -rf /usr/local/lib/node_modules/corepack && \
  rm -rf /opt/yarn-* && \
  rm -f /usr/local/bin/npm /usr/local/bin/npx /usr/local/bin/corepack && \
  rm -f /usr/local/bin/yarn /usr/local/bin/yarnpkg && \
  rm -rf /var/cache/* /tmp/* /root/* && \
  rm -rf /usr/share/man /usr/share/doc /usr/share/info && \
  rm -rf /usr/share/i18n /usr/share/misc /usr/share/terminfo


FROM scratch AS runner
COPY --from=runner-build / /
WORKDIR /app
EXPOSE 3001
CMD ["dumb-init", "node", "dist/server.js"]
