import {
  HttpException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from 'src/users/services/user/user.service';
import * as bcrypt from 'bcrypt';
import { SignInParams } from 'src/utils/types';
import { JwtService } from '@nestjs/jwt';
import { HttpStatusCode } from 'axios';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signIn(signInParam: SignInParams) {
    const user = await this.userService.findUserByPhonenumber(
      signInParam.phone_number,
    );

    if (!user) {
      throw new HttpException('User Not Found!', HttpStatusCode.NotFound);
    } else if (!(await bcrypt.compare(signInParam.password, user.password))) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user.id, phone_number: user.phone_number };

    return {
      access_token: await this.jwtService.signAsync(payload),
      role: user.role,
      userId: user.id,
      name: user.first_name,
    };
  }

  async verifyToken(token: string, secret: string | Buffer) {
    return await this.jwtService.verifyAsync(token, { secret });
  }
}
