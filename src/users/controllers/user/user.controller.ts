import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { RegisterUserDto } from 'src/dtos/user/RegisterUser.dto';
import { UserService } from 'src/users/services/user/user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get(':id')
  getUser(@Param('id', ParseIntPipe) id: number) {
    return this.userService.getUser(id);
  }

  @Post('/create')
  registerUser(@Body() registerPayload: RegisterUserDto) {
    return this.userService.registerUser(registerPayload);
  }
}
