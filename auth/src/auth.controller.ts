import { Controller, HttpStatus } from '@nestjs/common';
import { authService } from './services/auth.services';
import { MessagePattern } from '@nestjs/microservices';
import { JwtService } from '@nestjs/jwt';
import { RecordingRulesInstance } from 'twilio/lib/rest/video/v1/room/roomRecordingRule';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: authService
  ) {}
  @MessagePattern({ cmd: 'auth_req' })
  public async sendSMS(params: { phone_number: string }): Promise<any> {
    if (params) {
      if (params) {
        return await this.authService.sendSMS(params.phone_number);
      } else {
        return {
          status: false,
          code: HttpStatus.BAD_REQUEST,
          message: 'Phone number is not found.',
        };
      }
    }
  }

  @MessagePattern({ cmd: 'verify' })
  public async verify(params: { vcode: any; phone_number: string }) {
    if (params) {
      {
        {
          const data = await this.authService.verify(
            params.vcode,
            params.phone_number,
          );
          if (data.status === true) {
            await this.authService.findAndUpdateIsVerified({
              phone_number: params.phone_number,
            });
          }
          return data;
        }
      }
    } else {
      return {
        status: false,
        code: HttpStatus.BAD_REQUEST,
        message: 'Phone number is not found.',
      };
    }
  }

}
