FROM node:24-alpine as build

WORKDIR /app

COPY package.json ./
COPY package-lock.json ./

RUN npm ci

COPY . .

RUN npm run build --configuration=production

FROM nginx:1.29.4

COPY --from=build app/dist/mortgage-calculator/* /usr/share/nginx/html

EXPOSE 80
