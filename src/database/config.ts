import path from 'path';
import { ConnectionOptions } from 'typeorm';
export const typeOrmConfig: ConnectionOptions = {
  name: 'default',
  type: 'postgres',
  migrations: [path.join(__dirname, 'migrations/*.ts')],
  // eslint-disable-next-line prettier/prettier
  url: `postgresql://${process.env.POSTGRES_USER}:${process.env.POSTGRES_PASSWORD}@${process.env.POSTGRES_HOST + ':' + process.env.POSTGRES_PORT}/${process.env.POSTGRES_DB}`,
  entities: [path.join(__dirname, '..', 'modules/**/entities/*.{ts,js}')],
  synchronize: true
};
