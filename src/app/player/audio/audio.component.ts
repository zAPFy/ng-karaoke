import { AfterViewInit, Component, EventEmitter, Input, OnDestroy, OnInit, Output, SimpleChanges, OnChanges } from '@angular/core';
import { Observable, Subscription, fromEvent } from 'rxjs';
import { map } from 'rxjs/operators';
import { PlayerService } from '../player.service';


@Component({
  selector: 'app-player-audio',
  templateUrl: './audio.component.html',
  styleUrls: ['./audio.component.css']
})
export class AudioComponent implements OnInit, AfterViewInit, OnDestroy, OnChanges {

  @Output() onCurrentTimeUpdate = new EventEmitter<number>();
  @Output() PlayPause = new EventEmitter<boolean>();
  @Input() src = '';
  private audio: HTMLAudioElement;
  private timeSubscription: Subscription;
  private loadSubscription: Subscription;
  public isPlaying = false;
  public currentTime: string;
  public duration: string;
  public durationSeconds: number;
  public currentTimeSeconds: number;

  constructor(
    private service: PlayerService
  ) { }

  ngOnInit() {
    this.audio = this.initAudio();
    this.currentTime = this.service.formatTime(0);
    this.duration = this.service.formatTime(0);
  }

  ngAfterViewInit() {
    // Loads new audio source
    this.loadAudioSource(this.src);

    // Subscribes timeupdate
    this.timeSubscription = fromEvent(this.audio, 'timeupdate')
      .subscribe(this.handleAudioTimeUpdate);

    // Subscribe to loaded event
    this.loadSubscription = fromEvent(this.audio, 'loadeddata')
      .subscribe(this.handleAudioLoaded);

    // Subscribe other events
    this.audio.addEventListener('playing', this.handleAudioPlayed);
    this.audio.addEventListener('pause', this.handleAudioPaused);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.service.hasPropertyChanged(changes.src)) {
      this.loadAudioSource(changes.src.currentValue);
    }
  }

  ngOnDestroy() {
    // Unsubscribe
    this.timeSubscription.unsubscribe();
    this.loadSubscription.unsubscribe();

    // Destroy audio tag
    this.loadAudioSource('');
    this.audio.load();
  }

  initAudio(): HTMLAudioElement {
    const audio = new Audio();
    audio['autobuffer'] = true;
    audio.autoplay = false;
    audio.preload = 'auto';

    return audio;
  }

  loadAudioSource(src: string) {
    this.audio.pause();
    this.handleAudioPaused();
    this.audio.src = src;
  }

  handleAudioLoaded = e => {
    this.duration = this.service.formatTime(this.audio.duration);
    this.durationSeconds = this.audio.duration;
  }

  handleAudioTimeUpdate = e => {
    this.currentTime = this.service.formatTime(this.audio.currentTime);
    this.currentTimeSeconds = this.audio.currentTime;
    this.onCurrentTimeUpdate.emit(this.audio.currentTime);
  }

  handleAudioPlayed = () => {
    this.PlayPause.emit(true);
    this.isPlaying = true;
  }

  handleAudioPaused = () => {
    this.PlayPause.emit(false);
    this.isPlaying = false;
  }

  handleAudioPlayPause() {
    if (this.audio.paused) {
      this.audio.play();
    } else {
      this.audio.pause();
    }
  }

}
