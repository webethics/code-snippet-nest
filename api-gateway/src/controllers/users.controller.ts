import {
  Controller,
  Post,
  Put,
  Get,
  Body,
  Delete,
  Inject,
  Param,
  UseGuards,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { IUser } from '../interfaces/user.interface';
import { ApiTags } from '@nestjs/swagger';
import { UpdateUserDto } from '../interfaces/user/dto/update-user.dto';
import { UserIdDto } from '../interfaces/user/dto/user-id.dto';
import { DeleteUserDto } from '../interfaces/user/dto/delete-user-dto';
import { GetUserDto } from '../interfaces/user/dto/get-user-profile-dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';

// user routes //
@ApiBearerAuth('defaultBearerAuth')
@Controller('users')
@ApiTags('Users')
export class UsersController {
  constructor(
    @Inject('USER_SERVICE') private readonly userServiceClient: ClientProxy,
  ) {}

  //to list the all users //
  @UseGuards(JwtAuthGuard)
  @Get('/all')
  public async getUsers(): Promise<IUser[]> {
    return await this.userServiceClient
      .send<IUser[]>({ cmd: 'get_users' }, {})
      .toPromise();
  }

  // to get the paricular user //
  @UseGuards(JwtAuthGuard)
  @Get('/:user_id')
  public async getSessionByUId(@Param() params: GetUserDto): Promise<string> {
    return await this.userServiceClient
      .send<string>({ cmd: 'get_user_by_id' }, params)
      .toPromise();
  }

  // to update the user //
  @UseGuards(JwtAuthGuard)
  @Put('/update/:user_id')
  public async updateUserrById(
    @Param() params: UserIdDto,
    @Body() userRequest: UpdateUserDto,
  ): Promise<any> {
    const data = {
      user_id: params.user_id,
      user: userRequest,
    };
    const userupdate = await this.userServiceClient
      .send<any>({ cmd: 'update_user' }, data)
      .toPromise();
    if (userupdate.status == 200) {
      throw new HttpException('Updated', HttpStatus.ACCEPTED);
    } else if (userupdate.message == 'Please Enter valid email address') {
      throw new HttpException(
        'Invalid email address.',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    } else if (
      userupdate.message == 'User with this Email is already registered'
    ) {
      throw new HttpException(
        'User with this Email is already registered.',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    } else if (
      userupdate.message == 'User with this number is already registered'
    ) {
      throw new HttpException(
        'User with this number is already registered',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    } else if (userupdate.message == 'Invalid email address') {
      throw new HttpException(
        'Invalid email address',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    } else if (userupdate.message == 'Please Enter Valid Phone Number') {
      throw new HttpException(
        'Invalid phone number',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    return userupdate;
  }

  // to detete the user //
  @UseGuards(JwtAuthGuard)
  @Delete('/delete/:user_id')
  public async deleteUser(@Param() params: DeleteUserDto): Promise<any> {
    let user = await this.userServiceClient
      .send<string>({ cmd: 'delete_user_by_id' }, params)
      .toPromise();
    if (!user) {
throw new HttpException(
  'Invalid ID',
  HttpStatus.UNPROCESSABLE_ENTITY,
);
    }
          return user;
    }
  }

