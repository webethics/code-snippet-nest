import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../schemas/user.schema';
import { IUser } from '../interfaces/user.interface';


const crypto = require('crypto');
@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) { }
  
  
  // function to get all user listing//
  public async getUsers(): Promise<any> {
    return await this.userModel.find().exec();
  }

  // function to create user //
  public async createUser(user: IUser): Promise<any> {
    const userExists = await this.userModel.findOne({
      phone_number: user.phone_number,
    });
    if (userExists) {
      return userExists;
    } else {
      user.is_updated = false;
      const userModel = new this.userModel(user);
      let userInfo = await userModel.save();
      const newuser = await this.userModel.findById(userInfo._id);
      return newuser;
    }
  }
  // function to get particular user //
  public async getUserById(user_id: string): Promise<any> {
    if (user_id.match(/^[0-9a-fA-F]{24}$/)) {
      let userinfo = await this.userModel.findById({ _id: user_id });
      return userinfo;
    } else {
      return false;
    }
  }
  // function to delete  user //
  public async removeTaskById(user_id: string) {
      if (user_id.match(/^[0-9a-fA-F]{24}$/)) {
        return this.userModel.findOneAndDelete({ _id: user_id });
      } else {
        return false;
      }
  }

    public async CheckUserByPhoneNumber(phone_number: string): Promise<any> {
    let IsMatch = await this.userModel.findOne({ phone_number: phone_number });
    return IsMatch;
  }

  async checkEmail(user: any) {
    let IsEmail = await this.userModel.findOne({ email: user.email });
    if (IsEmail) {
      // check for uid
      if (IsEmail._id && IsEmail._id == user.user_id) {
        return 'Ok';
      } else {
        return 'IsEmail';
      }
    } else {
      return 'Ok';
    }
  }

  public async CheckUserByPhoneNumberAndEmail(user: any): Promise<any> {
    // let res = await validate(user.email);
    var emailRegex =
      /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;
    var valid = emailRegex.test(user.email);
    if (!valid) {
      return 'Enter_valid_email_address';
    } else if (
      user.phone_number.length >= 6 &&
      user.phone_number.length <= 16
    ) {
      var isANumber = isNaN(user.phone_number) === false;
      if (isANumber) {
        let IsPhoneNumber = await this.userModel.findOne({
          phone_number: user.phone_number,
        });
        if (IsPhoneNumber) {
          if (IsPhoneNumber._id && IsPhoneNumber._id == user.user_id) {
            let email = await this.checkEmail(user);
            return email;
          } else {
            return 'IsPhoneNumber';
          }
        } else {
          return 'Ok';
        }
      } else {
        return 'Enter_valid_phone_number';
      }
    } else {
      return 'Enter_valid_phone_number';
    }
  }
}





