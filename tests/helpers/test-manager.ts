import path from 'path';
import dotenv from 'dotenv';
dotenv.config({ path: path.resolve(process.cwd(), '.env.test') });

import { Connection, createConnection, getRepository, Repository } from 'typeorm';
import { Server as HttpServer, createServer } from 'http';

import { app } from '../../src/app';
import express from 'express';
import supertest from 'supertest';
import { testConfig } from '../../src/database/config';
import { User, UserInfo, UserRoles } from '../../src/modules/user/entities';
import { CredentialsDto } from '../../src/modules/auth/dtos/credentials';
import jwt from 'jsonwebtoken';

export class TestManager {
  private _app!: express.Application;
  private _server!: HttpServer;
  private _connection!: Connection;

  public get testApp() {
    return supertest(this._app);
  }

  public get connection() {
    return this._connection;
  }

  public get server(): HttpServer {
    return this._server;
  }

  public async init() {
    this._connection = await createConnection(testConfig);
    this._app = app;
    this._server = createServer(this._app).listen(process.env.PORT);
  }

  public async close() {
    this._server.close();
    this._connection.close();
  }

  public async loginTestUser(credentials: CredentialsDto) {
    const userRepository: Repository<User> = getRepository(User);
    const userInfoRepository: Repository<UserInfo> = getRepository(UserInfo);

    let user = await userRepository.findOne({ username: credentials.username });

    if (!user) {
      const infoEntity = userInfoRepository.create();
      const userEntity = userRepository.create({ ...credentials, role: UserRoles.ADMIN, info: infoEntity });
      user = await userRepository.save(userEntity);
    }

    return {
      jwt: jwt.sign(
        {
          sub: user.id,
          username: user.username,
          email: user.email,
          info: user.info,
          completedTutorials: user.completedTutorials,
          role: user.role,
          iat: Date.now()
        },
        process.env.JWT_SECRET!
      ),
      user
    };
  }

  public async cleanDatabase(tables?: string[]) {
    try {
      const entities = this._connection.entityMetadatas;
      const tableNames = tables ?? entities.map((entity) => `"${entity.tableName}"`).join(', ');

      await this._connection.query(`TRUNCATE ${tableNames} CASCADE;`);
    } catch (error) {
      throw new Error(`ERROR: Cleaning test database: ${error}`);
    }
  }
}
