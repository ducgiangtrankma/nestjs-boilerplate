import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RegisterReqDto } from './dto/register.req.dto';
import { User } from './schema/user.schema';
import { ErrorMessages } from 'src/constants/error-key.constant';

@Injectable()
export class AuthService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async register(registerReqDto: RegisterReqDto) {
    try {
      const { username } = registerReqDto;
      const existingUser = await this.userModel.findOne({ username }).exec();
      if (existingUser) {
        throw new HttpException(
          {
            statusCode: HttpStatus.UNPROCESSABLE_ENTITY,
            message: ErrorMessages.Register_PhoneHasRegistered,
            data: null,
          },
          HttpStatus.UNPROCESSABLE_ENTITY,
        );
      }
      const newUser = new this.userModel({
        ...registerReqDto,
      });
      return await newUser.save();
    } catch (error) {
      throw error;
    }
  }

  async validateUser(username: string) {
    try {
      const user = await this.userModel
        .findOne({
          username: username,
        })
        .exec();
      if (!user) {
        throw new HttpException(
          {
            statusCode: HttpStatus.NOT_FOUND,
            message: ErrorMessages.UserNotFound,
            data: null,
          },
          HttpStatus.UNPROCESSABLE_ENTITY,
        );
      }
      return user;
    } catch (error) {
      throw error;
    }
  }
}
