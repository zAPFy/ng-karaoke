import { AfterViewInit, Component, EventEmitter, OnChanges, OnDestroy, Output, SimpleChanges, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Observable, Subscription } from 'rxjs';
import { PlayerService } from './player.service';
import { SongsService } from '../songs/songs.service';
import { Song } from '../songs/song.interface';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnChanges, OnInit {

  public lines: string[] = [];
  public onLyricsTimeUpdate = new EventEmitter<number>();
  private currentSong: Song;

  constructor(
    private playerService: PlayerService,
    private Songs: SongsService,
    private route: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit() {
    this.getSong();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.playerService.hasPropertyChanged(changes.currentSong)) {
      this.resetPlayer();
    }
  }

  getSong(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.Songs.getSong(id).subscribe(song => this.currentSong = song);
  }

  resetPlayer() {
    this.lines = [];
  }

  handleAudioTimeUpdate = (time: number) => {
    this.onLyricsTimeUpdate.emit(time);
  }

  handleLyricsNewLine = (line) => {
    // Keep up to last 5 lines in array
    this.lines = [line].concat(this.lines).slice(0, 5);
  }

}
