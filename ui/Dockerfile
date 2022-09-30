FROM node:alpine 

WORKDIR /app

COPY . /app

RUN npm install &&\
    npm install react-router-dom &&\
    npm install react-awesome-calendar &&\
    npm install @mui/material &&\
    npm install @emotion/react &&\
    npm install @emotion/styled &&\
    npm install @mui/icons-material &&\
    npm install @mui/styled-engine
  


EXPOSE 3000

CMD ["npm", "start"]