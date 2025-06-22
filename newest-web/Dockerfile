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
COPY env.local .
RUN npm run build

# 3. 프로덕션 스테이지
FROM node:20-alpine AS runner
WORKDIR /app
COPY env.local .
ENV NODE_ENV=production
ENV NEXTAUTH_SECRET="Duq471ukc6Uxa2G2tIcMFzZhrX00i5wJWB7air4DnD8="

# PM2 설치 (pm2-runtime 권장)
RUN npm install -g pm2-runtime

# 프로덕션 의존성만 복사 및 설치
COPY package.json package-lock.json ./
RUN npm ci --omit=dev

# 필수 빌드 결과물 및 정적 파일 복사
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.ts ./
COPY --from=builder /app/pm2.config.js ./pm2.config.js

EXPOSE 3000

# PM2 설정 파일이 있는 경우
CMD ["pm2-runtime", "start", "npm", "--", "run", "start"]