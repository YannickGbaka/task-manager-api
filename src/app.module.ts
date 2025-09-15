import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskModule } from './task/task.module';
import { Task } from './task/task.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
import appConfig from './configs/app.config';
import databaseConfig from './configs/database.config';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

const envType = process.env.NODE_ENV || 'development';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      // playground: false,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      graphiql: true,
    }),

    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${envType}`,
      load: [appConfig, databaseConfig],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('database.host'),
        port: configService.get('database.port'),
        database: configService.get('database.name'),
        username: configService.get('database.username'),
        password: configService.get('database.password'),
        synchronize: configService.get('database.synchronize'),
        autoLoadEntities: configService.get('database.autoLoadEntities'),
        entities: [Task],
      }),
    }),
    TaskModule,
    UsersModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
