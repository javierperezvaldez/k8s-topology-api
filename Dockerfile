FROM node:10-alpine

WORKDIR /app

ADD ./package.json ./package.json
ADD ./node_modules ./node_modules
ADD ./dist ./dist

CMD ["npm", "run", "start:prod"]
