import { HttpException, Injectable } from '@nestjs/common';

import axios, { HttpStatusCode } from 'axios';

import { UserService } from 'src/users/services/user/user.service';
import { GetOtpParams, VerifyOtpParams } from 'src/utils/types';

@Injectable()
export class OtpService {
  constructor(private userService: UserService) {}

  async getOtp(getOtpParams: GetOtpParams) {
    const isPhoneNumberRegistered =
      await this.userService.findUserByPhonenumber(
        getOtpParams.phone_number.replace('+251', '0'),
      );

    if (isPhoneNumberRegistered) {
      throw new HttpException(
        'The Phone Number is already in use. Please Contact the adminstrator.',
        HttpStatusCode.Conflict,
      );
    }
    return await axios
      .get('https://hahu.io/api/send/otp', {
        params: {
          type: 'sms',
          secret: process.env.SMS_GATEWAY_API_KEY,
          sim: 1,
          mode: 'devices',
          device: process.env.SMS_GATEWAY_DEVICE_ID,
          phone: getOtpParams.phone_number,
          message: `Hello this message is sent from EMS.\n----------------------\n{{otp}} is your verification code (otp).\nThis token is valid for 5 mins.`,
        },
      })
      .then(async (response) => {
        const { message, status } = await response.data;
        return {
          status,
          message,
        };
      })
      .catch(async (error) => {
        const { status, message } = await error.response.data;
        return {
          status,
          message,
        };
      });
  }
  async verifyOtp(verifyOtpParams: VerifyOtpParams) {
    return await axios
      .get('https://hahu.io/api/get/otp', {
        params: {
          secret: process.env.SMS_GATEWAY_API_KEY,
          otp: verifyOtpParams.otp,
        },
      })
      .then((res) => {
        return {
          status: res.status,
          message: res.data.message,
        };
      });
  }
}
