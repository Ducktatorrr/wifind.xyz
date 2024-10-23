FROM oven/bun

WORKDIR /app
COPY package.json package.json
RUN bun install

COPY . .
RUN bun run build

EXPOSE 4173

# Add the --host option to bind to 0.0.0.0
ENV ORIGIN=https://wifind.xyz
ENTRYPOINT ["bun", "run", "preview", "--host", "0.0.0.0"]
