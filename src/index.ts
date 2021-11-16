import dotenv from 'dotenv';
dotenv.config();
import { typeOrmConfig } from './database/config';
import { createConnection } from 'typeorm';
import { app } from './app';

const port = process.env.PORT || 4000;

createConnection(typeOrmConfig)
  .then(() => {
    console.log('Connected to database sucessfully!');
  })
  .catch(() => {
    console.error('Cannot connect to database...');
  });

app.listen(port, () => {
  console.log(
    `Application is running on port :${port} (On :4000 if running through docker compose).`
  );
});
