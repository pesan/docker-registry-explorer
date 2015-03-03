FROM dockerfile/nodejs

ENV NODE_ENV production

WORKDIR /app
COPY . /app/
RUN npm install --production

CMD ["npm", "start"]

EXPOSE 8080
