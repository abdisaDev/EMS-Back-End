import { Controller, Get } from '@nestjs/common';
import { UsersService } from 'src/users/services/users/users.service';

@Controller('users')
export class UsersController {
  constructor(private userServeice: UsersService) {}

  @Get()
  async getUsers() {
    return await this.userServeice.fetchUsers();
  }
}
