import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Track, TrackDocument } from '../shemas/track.schema';
import { TokenAuthGuard } from '../token-auth.guard';
import { RoleGuard } from '../role.guard';
import { Roles } from '../roles.decorator';

@Controller('tracks')
export class TracksController {
  constructor(
    @InjectModel(Track.name)
    private trackModel: Model<TrackDocument>,
  ) {}

  @Get()
  async getAll(@Query('album') album?: string) {
    if (album) {
      return this.trackModel.find({ album });
    }
    return this.trackModel.find();
  }

  @Get(':id')
  async getOne(@Param('id') id: string) {
    return this.trackModel.findById(id);
  }

  @UseGuards(TokenAuthGuard)
  @Post()
  async create(
    @Body() body: { title: string; duration: number; album: string },
  ) {
    const track = new this.trackModel({
      title: body.title,
      duration: body.duration,
      album: body.album,
    });

    return track.save();
  }

  @UseGuards(TokenAuthGuard, RoleGuard)
  @Roles('admin')
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.trackModel.findByIdAndDelete(id);
  }
}
