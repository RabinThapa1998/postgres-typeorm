import { DataSource } from 'typeorm';
import { User } from './model/User';
import { ApiKey } from './model/ApiKey';
import { Role } from './model/Role';

export const db = {
    name: process.env.DB_NAME || '',
    host: process.env.DB_HOST || '',
    port: process.env.DB_PORT || '',
    user: process.env.DB_USER || '',
    dialect: process.env.DB_DIALECT || '',
    password: process.env.DB_PWD || '',
    minPoolSize: parseInt(process.env.DB_MIN_POOL_SIZE || '5'),
    maxPoolSize: parseInt(process.env.DB_MAX_POOL_SIZE || '10'),
    acquire: 30000,
    idle: 10000,
};
export const AppDataSource = new DataSource({
    type: 'postgres',
    host: 'db',
    port: 5432,
    username: 'postgres',
    password: 'maverick',
    database: 'maverick',
    entities: [__dirname + '/model/*.ts'],
    // synchronize: true,
    logging: true,
    migrations: [__dirname + '/migrations/*.ts'],
});
