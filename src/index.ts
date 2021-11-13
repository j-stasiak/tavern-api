import dotenv from 'dotenv';
dotenv.config();
import { app } from './app';
import { typeOrmConfig } from './database/config';
import { createConnection } from 'typeorm';

const port = process.env.PORT || 3000;

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
