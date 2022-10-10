FROM node:18

WORKDIR /app

COPY package*.json .
COPY prisma ./prisma/
COPY .env.test .
COPY tsconfig.json .

RUN npm ci

COPY . .

EXPOSE 1234

CMD ["npm", "run", "docker:test"]
