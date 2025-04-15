# 1. 의존성 설치용 스테이지
FROM node:20-alpine AS deps
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

# 2. 빌드 스테이지
FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# 3. 프로덕션 스테이지
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV NEXTAUTH_SECRET="Duq471ukc6Uxa2G2tIcMFzZhrX00i5wJWB7air4DnD8="

# PM2 설치
RUN npm install -g pm2

# 앱 코드 및 의존성 복사
COPY package.json package-lock.json ./
RUN npm ci --omit=dev

COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.ts ./
COPY --from=builder /app/pm2.config.js ./pm2.config.js

EXPOSE 3000

# PM2로 실행
CMD ["pm2-runtime", "pm2.config.js"]