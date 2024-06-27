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
import * as bcrypt from 'bcrypt';

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

  findUserByPhonenumber(phone_number: string) {
    return this.userRepository.findOneBy({ phone_number });
  }

  async registerUser(registerPayload: RegisterUserParams) {
    const { password, ...rest } = registerPayload;
    const salt = await bcrypt.genSalt(5);
    const hashedPassword = await bcrypt.hash(password, salt);

    const userInstance = this.userRepository.create({
      password: hashedPassword,
      ...rest,
    });

    return await this.userRepository.save(userInstance);
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

  async fetchRegisterdItem(id: number) {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['items'],
    });
    if (!user) {
      throw new HttpException('User Not Found', HttpStatus.BAD_REQUEST);
    }
    return user.items;
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
