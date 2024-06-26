import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Item } from 'src/typeorm/entities/items/Item';
import { User } from 'src/typeorm/entities/users/User';
import { RegisterUserItemParams, RegisterUserParams } from 'src/utils/types';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Item) private itemRepository: Repository<Item>,
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

  async registerUserItem(id: number, registerUserItem: RegisterUserItemParams) {
    const user = await this.userRepository.findOneBy({ id });

    if (!user) {
      throw new HttpException('User Not Found', HttpStatus.BAD_REQUEST);
    }

    const newItem = this.itemRepository.create(registerUserItem);
    return await this.itemRepository.save(newItem);
  }
}
