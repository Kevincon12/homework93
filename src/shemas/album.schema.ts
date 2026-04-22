import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type AlbumDocument = Album & Document;

@Schema()
export class Album {
  @Prop({ required: true })
  title: string;

  @Prop()
  image: string;

  @Prop({ type: Types.ObjectId, ref: 'Artist', required: true })
  artist: string;
}

export const AlbumSchema = SchemaFactory.createForClass(Album);
