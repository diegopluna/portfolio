FROM oven/bun:latest
WORKDIR /app

COPY package.json .
COPY bun.lockb .
RUN bun install
COPY . .
RUN bun run build
ENV NODE_ENV=production
EXPOSE 4173
CMD [ "bun", "run", "preview", "--host" ]