import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './typeorm/entities/users/User';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { Guard } from './typeorm/entities/users/Guard';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env.development.local',
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host:
        process.env.MODE === 'dev'
          ? process.env.LOCAL_ADDRESS
          : process.env.PUBLIC_ADDRESS,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [User, Guard],
      synchronize: true,
      autoLoadEntities: true,
    }),
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
