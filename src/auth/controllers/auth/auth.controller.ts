import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from 'src/auth/services/auth/auth.service';
import { SignInDto } from 'src/dtos/auth/SignIn.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async signIn(@Body() signInPayload: SignInDto) {
    return await this.authService.signIn(signInPayload);
  }

  @Post('verify-token')
  async verifyToken(@Body() token: string) {
    return this.authService.verifyToken(token, `${process.env.JWT_SECRET}`);
  }
}
