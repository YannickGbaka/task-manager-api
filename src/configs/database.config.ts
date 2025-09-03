import { registerAs } from '@nestjs/config';

export default registerAs('database', () => ({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 5432,
  type: process.env.DB_TYPE,
  name: process.env.DB_NAME ?? 'task_manager',
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  synchronize: process.env.DB_SYNC,
  autoLoadEntities: process.env.DB_AUTO_LOAD,
}));
