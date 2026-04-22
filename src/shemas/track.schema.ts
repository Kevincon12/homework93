import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type TrackDocument = Track & Document;

@Schema()
export class Track {
  @Prop({ required: true })
  title: string;

  @Prop()
  duration: number;

  @Prop({ type: Types.ObjectId, ref: 'Album', required: true })
  album: string;
}

export const TrackSchema = SchemaFactory.createForClass(Track);