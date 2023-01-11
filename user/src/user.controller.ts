import { Controller, Get, HttpStatus } from '@nestjs/common';
import { UserService } from './services/user.service';
import { MessagePattern } from '@nestjs/microservices';
import { IUser } from './interfaces/user.interface';
import { IUserSearchResponse } from './interfaces/user-search-response.interface';
import { IUserUpdateParams } from './interfaces/user-update-params.interface';
import { IUserUpdateByIdResponse } from './interfaces/user-update-by-id-response.interface';
import { ApiBasicAuth } from '@nestjs/swagger';
@ApiBasicAuth()
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @MessagePattern({ cmd: 'get_users' })
  public async getUsers(): Promise<IUser> {
    return await this.userService.getUsers();
  }

  @MessagePattern({ cmd: 'user_create' })
  public async createUser(userParams: IUser): Promise<any> {
    return await this.userService.createUser(userParams);
  }
  @MessagePattern({ cmd: 'get_user_by_id' })
  public async getUserById(params: {
    user_id: string;
  }): Promise<IUserSearchResponse> {
    let result: IUserSearchResponse;
    if (params) {
      const user = await this.userService.getUserById(params.user_id);
      if (user) {
        result = {
          status: HttpStatus.OK,
          message: 'User found',
          user: user,
        };
      } else {
        result = {
          status: HttpStatus.NOT_FOUND,
          message: 'User not found',
          user: null,
        };
      }
    } else {
      result = {
        status: HttpStatus.BAD_REQUEST,
        message: 'Bad request',
        user: null,
      };
    }

    return result;
  }

  @MessagePattern({ cmd: 'update_user' })
  public async updateUserrById(params: {
    user: IUserUpdateParams;
    user_id: string;
  }): Promise<IUserUpdateByIdResponse> {
    let result: IUserUpdateByIdResponse;
    if (params.user_id) {
      try {
        const user = await this.userService.getUserById(params.user_id);
        if (user) {
          if (user._id == params.user_id) {
            let userdata = {
              user_id: params.user_id,
              phone_number: params.user.phone_number,
              email: params.user.email,
            };
            const userinfo =
              await this.userService.CheckUserByPhoneNumberAndEmail(userdata);
            if (userinfo == 'Enter_valid_phone_number') {
              result = {
                status: HttpStatus.BAD_REQUEST,
                message: 'Please Enter Valid Phone Number',
                user: null,
                errors: null,
              };
            } else {
              if (userinfo == 'IsPhoneNumber') {
                result = {
                  status: HttpStatus.CONFLICT,
                  message: 'User with this number is already registered',
                  user: null,
                  errors: null,
                };
              } else {
                if (userinfo == 'IsEmail') {
                  result = {
                    status: HttpStatus.CONFLICT,
                    message: 'User with this Email is already registered',
                    user: null,
                    errors: null,
                  };
                } else if (userinfo == 'Enter_valid_email_address') {
                  result = {
                    status: HttpStatus.CONFLICT,
                    message: 'Invalid email address',
                    user: null,
                    errors: null,
                  };
                } else {
                  try {
                    const updatedTask = Object.assign(user, params.user);
                    await updatedTask.save();
                    result = {
                      status: HttpStatus.OK,
                      message: 'User updated successfully',
                      user: updatedTask,
                      errors: null,
                    };
                  } catch (e) {
                    result = {
                      status: HttpStatus.BAD_REQUEST,
                      message: 'Not Updated',
                      user: null,
                      errors: e.errors,
                    };
                  }
                }
              }
            }
          } else {
            result = {
              status: HttpStatus.OK,
              message: 'Invalid user id',
              user: null,
              errors: null,
            };
          }
        } else {
          result = {
            status: HttpStatus.NOT_FOUND,
            message: 'User not found',
            user: null,
            errors: null,
          };
        }
      } catch (e) {
        result = {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Something went wrong',
          user: null,
          errors: e.errors,
        };
      }
    } else {
      result = {
        status: HttpStatus.BAD_REQUEST,
        message: 'Bad request',
        user: null,
        errors: null,
      };
    }

    return result;
  }

  @MessagePattern({ cmd: 'delete_user_by_id' })
  public async deleteUser(params: {
    user_id: string;
  }): Promise<any> {
    return await this.userService.removeTaskById(params.user_id);
  }
}
