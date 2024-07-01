import { Body, Controller, Post } from '@nestjs/common';
import { GetOtpDto, VerifyOtpDto } from 'src/dtos/otp/Otp.dto';
import { OtpService } from 'src/otp/service/otp/otp.service';

@Controller('otp')
export class OtpController {
  constructor(private otpService: OtpService) {}

  @Post('get')
  async getOtp(@Body() otpPayload: GetOtpDto) {
    return await this.otpService.getOtp(otpPayload);
  }

  @Post('verify')
  async verifyOtp(@Body() otpPayload: VerifyOtpDto) {
    return await this.otpService.verifyOtp(otpPayload);
  }
}
