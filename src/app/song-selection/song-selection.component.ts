import { Component, OnInit } from '@angular/core';
import { Song } from '../songs/song.interface';
import { SongsService } from '../songs/songs.service';

@Component({
  selector: 'app-song-selection',
  templateUrl: './song-selection.component.html',
  styleUrls: ['./song-selection.component.css']
})
export class SongSelectionComponent implements OnInit {

  songList: Song[];
  currentSong: Song;

  constructor(private Songs: SongsService) { }

  ngOnInit() {
    this.songList = this.Songs.getSongList();
  }

}
