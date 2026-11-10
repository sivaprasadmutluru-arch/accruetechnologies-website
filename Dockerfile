FROM node:22-bookworm-slim AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci --ignore-scripts
COPY . .
ENV NEXT_TELEMETRY_DISABLED=1
RUN npx next build --webpack
FROM node:22-bookworm-slim
WORKDIR /app
ENV NODE_ENV=production NEXT_TELEMETRY_DISABLED=1 HOSTNAME=0.0.0.0 PORT=3000
COPY --from=build /app/.next/standalone ./
COPY --from=build /app/.next/static ./.next/static
COPY --from=build /app/public ./public
COPY --from=build /app/drizzle ./drizzle
COPY --from=build /app/scripts/sync-accruehr.mjs ./scripts/sync-accruehr.mjs
COPY --from=build /app/lib/runtime.ts ./lib/runtime.ts
COPY --from=build /app/lib/portal-delivery.mjs ./lib/portal-delivery.mjs
COPY --from=build /app/lib/enquiry-options.mjs ./lib/enquiry-options.mjs
RUN mkdir /data && chown node:node /data
USER node
EXPOSE 3000
CMD ["node","server.js"]
