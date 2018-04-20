import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './/app-routing.module';
import { SongsService } from './songs/songs.service';

import { PlayerComponent } from './player/player.component';
import { PlayerService } from './player/player.service';
import { AudioComponent } from './player/audio/audio.component';
import { LyricsComponent } from './player/lyrics/lyrics.component';

import { SongSelectionComponent } from './song-selection/song-selection.component';

import {MatButtonModule, MatSliderModule, MatToolbarModule, MatListModule} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';



@NgModule({
  declarations: [
    AppComponent,
    PlayerComponent,
    AudioComponent,
    LyricsComponent,
    SongSelectionComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatSliderModule,
    MatToolbarModule,
    MatListModule
  ],
  providers: [
    PlayerService,
    SongsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
