import { Controller, Post, Get, Body } from '@nestjs/common';
import { RegisterUSerDto } from 'src/dtos/RegisterUser.dto';
import { UsersService } from 'src/users/services/users/users.service';

@Controller('users')
export class UsersController {
  constructor(private userServeice: UsersService) {}

  @Get()
  getUsers() {}

  @Post('/create')
  registerUser(@Body() registerUserPayload: RegisterUSerDto) {
    console.log(registerUserPayload);
    this.userServeice.registerUser(registerUserPayload);
  }
}
