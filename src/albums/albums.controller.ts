import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
  UseGuards,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { FileInterceptor } from '@nestjs/platform-express';
import { Album, AlbumDocument } from '../shemas/album.schema';
import { TokenAuthGuard } from '../token-auth.guard';
import { RoleGuard } from '../role.guard';
import { Roles } from '../roles.decorator';

@Controller('albums')
export class AlbumsController {
  constructor(
    @InjectModel(Album.name)
    private albumModel: Model<AlbumDocument>,
  ) {}

  @Get()
  async getAll(@Query('artist') artist?: string) {
    if (artist) {
      return this.albumModel.find({ artist });
    }
    return this.albumModel.find();
  }

  @Get(':id')
  async getOne(@Param('id') id: string) {
    return this.albumModel.findById(id);
  }

  @UseGuards(TokenAuthGuard)
  @Post()
  @UseInterceptors(
    FileInterceptor('image', { dest: './public/uploads/albums' }),
  )
  async create(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: { title: string; artist: string },
  ) {
    const album = new this.albumModel({
      title: body.title,
      artist: body.artist,
      image: file ? '/uploads/albums/' + file.filename : null,
    });

    return album.save();
  }

  @UseGuards(TokenAuthGuard, RoleGuard)
  @Roles('admin')
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.albumModel.findByIdAndDelete(id);
  }
}
