import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
  UseGuards,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { FileInterceptor } from '@nestjs/platform-express';
import { Artist, ArtistDocument } from '../shemas/artist.schema';
import { TokenAuthGuard } from '../token-auth.guard';
import { RoleGuard } from '../role.guard';
import { Roles } from '../roles.decorator';

@Controller('artists')
export class ArtistsController {
  constructor(
    @InjectModel(Artist.name)
    private artistModel: Model<ArtistDocument>,
  ) {}

  @Get()
  async getAll() {
    return this.artistModel.find();
  }

  @Get(':id')
  async getOne(@Param('id') id: string) {
    return this.artistModel.findById(id);
  }

  @UseGuards(TokenAuthGuard)
  @Post()
  @UseInterceptors(
    FileInterceptor('image', { dest: './public/uploads/artists' }),
  )
  async create(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: { name: string },
  ) {
    const artist = new this.artistModel({
      name: body.name,
      image: file ? '/uploads/artists/' + file.filename : null,
    });

    return artist.save();
  }

  @UseGuards(TokenAuthGuard, RoleGuard)
  @Roles('admin')
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.artistModel.findByIdAndDelete(id);
  }
}
