import { Body, Controller, Post } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../shemas/user.schema';

@Controller('users')
export class UsersController {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
  ) {}

  @Post()
  async register(
    @Body() body: { email: string; password: string; displayName: string },
  ) {
    const user = new this.userModel({
      email: body.email,
      password: body.password,
      displayName: body.displayName,
    });

    user.generateToken();

    return user.save();
  }
}