# Этап 1: сборка приложения
FROM --platform=linux/amd64 node:22-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

FROM nginx:stable-alpine

WORKDIR /usr/share/nginx/html

COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.local.conf /etc/nginx/conf.d/default.conf

RUN nginx -t

CMD ["nginx", "-g", "daemon off;"]