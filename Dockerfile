# ---------- 0) 선택 : NODE 버전 ----------
ARG NODE_VERSION=20

# ---------- 1) 빌드(Stage) ----------
FROM node:${NODE_VERSION}-alpine AS builder

WORKDIR /app

# 1-1. 패키지 설치
COPY package.json package-lock.json* pnpm-lock.yaml* yarn.lock* ./
RUN \
  if [ -f yarn.lock ];      then corepack enable && yarn install --frozen-lockfile; \
  elif [ -f pnpm-lock.yaml ];then corepack enable && pnpm install --frozen-lockfile; \
  else                           npm ci --legacy-peer-deps; \
  fi

# 1-2. 소스 복사 & 빌드
COPY . .
RUN npm run build

# ---------- 2) 런타임(Stage) ----------
FROM node:${NODE_VERSION}-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000
EXPOSE 3000

# 2-1. 실행에 필요한 파일만 복사
COPY --from=builder /app/.next              ./.next
COPY --from=builder /app/public             ./public
COPY --from=builder /app/package.json       ./package.json
COPY --from=builder /app/node_modules       ./node_modules
COPY --from=builder /app/prisma             ./prisma

# 2-2. Prisma: 환경에 따라 migrate (dev 는 compose 에서)
#      배포에서는 fly, ECS 등에서 `npm run prisma:migrate-deploy` 등을 실행
# CMD 에서도 가능
CMD ["npm","run","start"]
