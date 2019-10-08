FROM node:12.9.0 as node
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build -- --prod

FROM nginx:1.17.3-alpine as prod
COPY --from=node /app/dist/core-microservice-frontend /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
