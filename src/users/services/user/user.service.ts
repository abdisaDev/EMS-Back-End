import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Item } from 'src/typeorm/entities/items/Item';
import { Profile } from 'src/typeorm/entities/users/Profile';
import { User } from 'src/typeorm/entities/users/User';
import {
  ProfileUserParams,
  RegisterUserItemParams,
  RegisterUserParams,
} from 'src/utils/types';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Item) private itemRepository: Repository<Item>,
    @InjectRepository(Profile) private profileRepository: Repository<Profile>,
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

    const newItem = this.itemRepository.create({
      ...registerUserItem,
      user,
    });
    return this.itemRepository.save(newItem);
  }

  async userProfile(id: number) {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['profile'],
    });
    console.log(user);

    if (!user) {
      throw new HttpException('User Not Found', HttpStatus.BAD_REQUEST);
    }

    return user.profile;
  }

  async createUserProfile(id: number, userProfile: ProfileUserParams) {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new HttpException('User Not Found', HttpStatus.BAD_REQUEST);
    }

    const newProfile = this.profileRepository.create(userProfile);
    const savedProfile = await this.profileRepository.save(newProfile);
    user.profile = savedProfile;
    return this.userRepository.save(user);
  }
}
