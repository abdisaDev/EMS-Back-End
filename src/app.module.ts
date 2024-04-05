import { Module } from '@nestjs/common';
import { UsersController } from './users/controller/users/users.controller';
import { UsersService } from './users/service/users/users.service';

@Module({
  imports: [],
  controllers: [UsersController],
  providers: [UsersService],
})
export class AppModule {}
