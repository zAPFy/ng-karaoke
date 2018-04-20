import { Component } from '@angular/core';
import { Song } from './songs/song.interface'
import './natural'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  public songList: Song[] = []
  public currentSong: Song

  constructor() {}

  ngOnInit() {

  }


}
