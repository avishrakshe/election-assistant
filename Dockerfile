FROM node:20-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# Production server
FROM nginx:alpine
# Copy the built assets to Nginx
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose port 80 for Cloud Run
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
