# Base image
FROM node:20-alpine

RUN corepack enable && corepack prepare pnpm@8.15.5 --activate

WORKDIR /app

COPY pnpm-lock.yaml ./
COPY package.json ./

RUN pnpm install

COPY . .

CMD ["pnpm", "start:local"]
