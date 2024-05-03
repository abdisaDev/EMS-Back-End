import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/typeorm/entities/users/User';
import { RegisterUserParams } from 'src/utils/types';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  getUser(id: number) {
    return this.userRepository.findOne({
      where: {
        id,
      },
    });
  }

  registerUser(registerPayload: RegisterUserParams) {
    const userInstance = this.userRepository.create(registerPayload);

    this.userRepository.save(userInstance);
    return 'User Successfully Registered!';
  }
}
