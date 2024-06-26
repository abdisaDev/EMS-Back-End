import { Module } from '@nestjs/common';
import { UsersController } from './controllers/users/users.controller';
import { UsersService } from './services/users/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/typeorm/entities/users/User';
import { UserController } from './controllers/user/user.controller';
import { UserService } from './services/user/user.service';
import { Item } from 'src/typeorm/entities/items/Item';
import { Guard } from 'src/typeorm/entities/users/Guard';

@Module({
  imports: [TypeOrmModule.forFeature([User, Guard, Item])],
  controllers: [UsersController, UserController],
  providers: [UsersService, UserService],
})
export class UsersModule {}
