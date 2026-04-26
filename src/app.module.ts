import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Artist, ArtistSchema } from './shemas/artist.schema';
import { ArtistsController } from './artists/artists.controller';
import { Album, AlbumSchema } from './shemas/album.schema';
import { AlbumsController } from './albums/albums.controller';
import { Track, TrackSchema } from './shemas/track.schema';
import { TracksController } from './tracks/tracks.controller';
import { User, UserSchema } from './shemas/user.schema';
import { UsersController } from './users/users.controller';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/music'),
    MongooseModule.forFeature([
      { name: Artist.name, schema: ArtistSchema },
      { name: Album.name, schema: AlbumSchema },
      { name: Track.name, schema: TrackSchema },
      { name: User.name, schema: UserSchema },
    ]),
  ],
  controllers: [
    AppController,
    ArtistsController,
    AlbumsController,
    TracksController,
    UsersController,
  ],
  providers: [AppService],
})
export class AppModule {}
