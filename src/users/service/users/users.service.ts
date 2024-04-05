import { Injectable } from '@nestjs/common';
import { registerUser } from 'src/utils/types';

@Injectable()
export class UsersService {
  private fakeUser = [];

  registerUser(registerUser: registerUser) {
    return this.fakeUser.push(registerUser);
  }

  fetchUsers() {
    return this.fakeUser;
  }
}
