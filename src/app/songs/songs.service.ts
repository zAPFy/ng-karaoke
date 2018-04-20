import { Injectable } from '@angular/core'

import { Song } from './song.interface'
import { Observable } from 'rxjs/Observable'
import { of } from 'rxjs/observable/of'

@Injectable()
export class SongsService {

  constructor() { }

  private readonly songList: Song[] = [
    {
      id: 1,
      artist: 'Rick Astley',
      title: 'Never Gonna Give You Up',
      audio: 'assets/songs/music/never-gonna-give-you-up.mp3',
      lyrics: 'assets/songs/lyrics/never-gonna-give-you-up.lrc',
      lyricDelay: 1,
    },
    {
      id: 2,
      artist: 'Journey',
      title: 'Don\'t Stop Believing',
      audio: 'assets/songs/music/dont-stop-believing.mp3',
      lyrics: 'assets/songs/lyrics/dont-stop-believing.lrc',
      lyricDelay: 1,
    },
    {
      id: 3,
      artist: 'ACDC',
      title: 'Highway to Hell',
      audio: 'assets/songs/music/ACDC - Highway to Hell.mp3',
      lyrics: 'assets/songs/lyrics/ACDC-Highway To Hell.lrc',
      lyricDelay: 1,
    },
  ]

  getSongList() {
    return this.songList
  }

  getSong( id: number ): Observable<Song> {
    return of(this.songList.find(song => song.id === id));
  }

}
