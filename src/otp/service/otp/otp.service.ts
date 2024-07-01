import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { GetOtpParams, VerifyOtpParams } from 'src/utils/types';

@Injectable()
export class OtpService {
  async getOtp(getOtpParams: GetOtpParams) {
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
      .then((res) => {
        return {
          status: res.status,
          message: res.data.message,
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
