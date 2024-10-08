import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { RegisterUserItemDto } from 'src/dtos/item/RegisterItem.dto';
import { ProfileUserDto } from 'src/dtos/user/ProfileUser.dto';
import { RegisterUserDto } from 'src/dtos/user/RegisterUser.dto';
import { UserService } from 'src/users/services/user/user.service';
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get(':id')
  getUser(@Param('id', ParseIntPipe) id: number) {
    return this.userService.getUser(id);
  }

  @Post('/register')
  async registerUser(@Body() registerPayload: RegisterUserDto) {
    await this.userService.registerUser(registerPayload);
    return 'User Successfully Registered!';
  }

  @Post(':id/registerItem')
  async registerUserItem(
    @Param('id', ParseIntPipe) id: number,
    @Body() registerUserItemDto: RegisterUserItemDto,
  ) {
    const items = await this.userService.registerUserItem(
      id,
      registerUserItemDto,
    );
    console.log(items);
    return 'Item Successfuly Added';
  }

  @Get(':id/items')
  async fetchUsetItems(@Param('id', ParseIntPipe) id: number) {
    return this.userService.fetchRegisterdItem(id);
  }

  @Get(':id/profile')
  async userProfile(@Param('id', ParseIntPipe) id: number) {
    return await this.userService.userProfile(id);
  }

  @Post(':id/profile')
  async createUserProfile(
    @Param('id', ParseIntPipe) id: number,
    @Body() userProfilePayload: ProfileUserDto,
  ) {
    return this.userService.createUserProfile(id, userProfilePayload);
  }

  @Post(':id/verify-items')
  async verifyUserItems(
    @Param('id', ParseIntPipe) id: number,
    @Body() itemLists: RegisterUserItemDto[],
  ) {
    return await this.userService.verifyUserItems(id, itemLists);
  }
}
