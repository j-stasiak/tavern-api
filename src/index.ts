import dotenv from 'dotenv';
dotenv.config();
import { typeOrmConfig } from './database/config';
import { createConnection } from 'typeorm';
import { app } from './app';
import http from 'http';
import { initSocketServer } from './socket';

const server = http.createServer(app);
const port = process.env.PORT || 4000;

initSocketServer(server);
createConnection(typeOrmConfig)
  .then(() => {
    console.log('Connected to database sucessfully!');
  })
  .catch(() => {
    console.error('Cannot connect to database...');
  });

server.listen(port, () => {
  console.log(`Application is running on port :${port} (On :4000 if running through docker compose).`);
});
