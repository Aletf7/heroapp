# Stage 1: Build
FROM node:14.15.4-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build --prod

# Stage 2: Serve
FROM nginx:1.19.6-alpine
COPY --from=build /app/dist/heroapp /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf