import dotenv from 'dotenv';
dotenv.config();
import { typeOrmConfig } from './database/config';
import { createConnection } from 'typeorm';
import { app } from './app';
import { grpcServer } from './grpc-server';
import { ServerCredentials } from '@grpc/grpc-js';

const port = process.env.PORT || 4000;

createConnection(typeOrmConfig)
  .then(() => {
    console.log('Connected to database sucessfully!');
  })
  .catch((reason) => {
    console.log(reason);
    console.error('Cannot connect to database...');
  });

app.listen(port, () => {
  console.log(`Application is running on port :${port} (On :4000 if running through docker compose).`);
});
grpcServer.bindAsync(`0.0.0.0:${process.env.GRPC_SERVER_PORT}`, ServerCredentials.createInsecure(), (err, port) => {
  if (err) {
    throw new Error('Failed to run grpc server');
  }

  console.log(`Grpc server running on port ${port}`);
  grpcServer.start();
});
