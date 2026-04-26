import { Body, Controller, Post, UseGuards, Req } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../shemas/user.schema';
import { AuthGuard } from '@nestjs/passport';
import type { Request } from 'express';

@Controller('users')
export class UsersController {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
  ) {}

  @UseGuards(AuthGuard('local'))
  @Post('sessions')
  login(@Req() req: Request) {
    return req.user;
  }

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