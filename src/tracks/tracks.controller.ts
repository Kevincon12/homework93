import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { Track, TrackDocument } from '../shemas/track.schema';

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

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.trackModel.findByIdAndDelete(id);
  }
}
