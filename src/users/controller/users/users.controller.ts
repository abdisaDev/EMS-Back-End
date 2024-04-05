import { Controller, Post, Body, Get } from '@nestjs/common';
import { RegisterUserDto } from 'src/users/dtos/registerUser.dto';
import { UsersService } from 'src/users/service/users/users.service';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Post('register')
  registerUser(@Body() registrationPayload: RegisterUserDto) {
    this.userService.registerUser(registrationPayload);
    return 'User Successfully Registered!';
  }

  @Get()
  fetchUsers() {
    console.log(this.userService.fetchUsers());
  }
}
