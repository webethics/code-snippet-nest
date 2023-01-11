import {
  Controller,
  Post,
  Body,
  Req,
  Inject,
  Ip,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiTags } from '@nestjs/swagger';
import { SendMessageDto } from '../interfaces/auth/dto/sendMessage-auth.dto';
import { VerifyDto } from '../interfaces/auth/dto/verify-auth.dto';
import { Request } from 'express';
import DeviceDetector from 'device-detector-js';
import { JwtService } from '@nestjs/jwt';
// auth routes //
@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(
    @Inject('AUTH_SERVICE') private readonly authService: ClientProxy,
    @Inject('USER_SERVICE') private readonly userServiceClient: ClientProxy,
    private readonly jwtService: JwtService,
  ) { }
  // req to send otp to number //
  @Post('/request')
  public async sendSMS(@Body() params: SendMessageDto): Promise<any> {
    const result = await this.authService
      .send<any>({ cmd: 'auth_req' }, params)
      .toPromise();
    if (result.code === 60200) {
      throw new HttpException(
        'Invalid phone number.',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    return result;
  }

// verify the otp //
  @Post('/verify')
  public async verify(
    @Body() params: VerifyDto,
    @Req()
    request: Request,
    @Ip() Ip,
  ): Promise<any> {
    const verifydata = await this.authService
      .send<any>({ cmd: 'verify' }, params)
      .toPromise();
    if (verifydata.status === false) {
      throw new HttpException(
        'Invalid verification code.',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    } else {
      const userdata = await this.userServiceClient
        .send<any>({ cmd: 'user_create' }, params)
        .toPromise();
      if (userdata._id) {
        const payload = {
          user: userdata.phone_number,
          sub: userdata._id,
        };
        const token = await this.jwtService.sign(payload);
        return {
          status: true,
          code: HttpStatus.ACCEPTED,
          message: 'succesfully verified',
          user: userdata,
          token: token,
        };
      }
      return verifydata;
    }
  }
}