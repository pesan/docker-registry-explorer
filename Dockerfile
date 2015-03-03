FROM dockerfile/nodejs-bower-grunt

RUN apt-get update
RUN apt-get install -y ruby-sass libfreetype6 libfontconfig1

WORKDIR /app

COPY package.json /app/
RUN npm install
COPY bower.json .bowerrc /app/
RUN bower install --allow-root

COPY . /app

CMD ["grunt", "serve"]

EXPOSE 5858 9000 35729
