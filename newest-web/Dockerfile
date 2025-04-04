# 의존성 설치용 스테이지
FROM node:20-alpine AS deps
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

# 빌드 스테이지
FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# 프로덕션 스테이지
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV NEXTAUTH_SECRET="Duq471ukc6Uxa2G2tIcMFzZhrX00i5wJWB7air4DnD8="

COPY package.json package-lock.json ./
RUN npm ci --omit=dev
RUN apk update && apk add curl wget

COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.ts ./

EXPOSE 3000
CMD ["npm", "start"]