import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectTwilio, TwilioClient } from 'nestjs-twilio';
import { InjectModel, Schema } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/schemas/user.schema';
import { IUser } from './../interfaces/user.interface';


@Injectable()
export class authService {
  public constructor(
    @InjectTwilio() private readonly client: TwilioClient,
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
  ) {}

  async sendSMS(phone_number: string) {
    try {
      return await this.client.verify
        .services(process.env.TWILIO_VERIFICATION_SERVICE_SID)
        .verifications.create({ to: phone_number, channel: 'sms' })
        .then((data) => {
          if (data.sid && data.status === 'pending') {
            return {
              status: true,
              code: HttpStatus.OK,
              message: 'Verification code has been sent to your phone.',
            };
          }
          return {
            status: false,
            code: HttpStatus.OK,
            message: 'There is some issue to send verification code.',
          };
        })
        .catch((e) => {
          return {
            status: false,
            message: 'Invalid phone number.',
            code: e.code,
          };
        });
    } catch (e) {
      return {
        status: false,
        message: e.status,
      };
    }
  }

  async verify(vcode: any, phone_number: string): Promise<any> {
    try {
      return await this.client.verify
        .services(process.env.TWILIO_VERIFICATION_SERVICE_SID)
        .verificationChecks.create({ code: vcode, to: phone_number })
        .then((data) => {
          if (data.sid && data.status === 'approved') {
            return {
              status: true,
              code: HttpStatus.OK,
              message: 'Succsecfully verified',
            };
          }
          return {
            status: false,
            code: HttpStatus.OK,
            message: ' Not sended',
          };
        });
    } catch (e) {
      return {
        status: false,
        message:
          'Your Request cannot be processed please check your otp or regenerate it',
        code: e.code,
      };
    }
  }

  public async searchUserWithPhoneNumber(params: {
    phone_number: string;
  }): Promise<any> {
    const saltGenerator = function (secret) {
      return process.env.SALT_GENERATOR_KEY;
    };
    const user = await this.userModel.findOne({ phone_number: params.phone_number });
    return user;
  }

  public async findAndUpdateIsVerified(params: {
    phone_number: string;
  }): Promise<IUser[]> {
    return await this.userModel.findOneAndUpdate(
      { phone_number: params.phone_number },
      { $set: { is_verified: true } },
    );
  }
}
