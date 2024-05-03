import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  ParseIntPipe,
  Delete,
} from '@nestjs/common';
import { RegisterUserDto } from 'src/dtos/RegisterUser.dto';
import { UsersService } from 'src/users/services/users/users.service';

@Controller('users')
export class UsersController {
  constructor(private userServeice: UsersService) {}

  @Get()
  getUsers() {
    return this.userServeice.fetchUsers();
  }

  @Post('/create')
  registerUser(@Body() registerUserPayload: RegisterUserDto) {
    this.userServeice.registerUser(registerUserPayload);
    return 'User Registered Successfully!';
  }

  @Delete(':id')
  async deleteUserById(@Param('id', ParseIntPipe) id: number) {
    await this.userServeice.deleteUser(id);
    return 'User Successfully Deleted!';
  }
}
