FROM node:alpine 

WORKDIR /app

COPY . /app

RUN npm install &&\
    npm install react-router-dom &&\
    npm install @mui/material @emotion/react @emotion/styled @mui/icons-material @mui/styled-engine


EXPOSE 3000

CMD ["npm", "start"]