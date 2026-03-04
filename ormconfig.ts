import { DataSource, DataSourceOptions } from 'typeorm';
import * as dotenv from 'dotenv';

dotenv.config();

export const baseConfig: DataSourceOptions = {
  type: 'mysql',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '3306', 10),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  entities: ['src/modules/**/*.entity.ts'],
  migrations: ['migrations/*.ts'],
  synchronize: false,
};

export const typeOrmNestConfig = {
  ...baseConfig,
  autoLoadEntities: true,
};

export const AppDataSource = new DataSource(baseConfig);

export default typeOrmNestConfig;
