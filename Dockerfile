FROM node:8 as react-build
WORKDIR /app
COPY . ./
RUN npm run build
CMD [ "npm", "run", "start"]