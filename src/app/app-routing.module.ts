import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PlayerComponent } from './player/player.component';
import { SongSelectionComponent } from './song-selection/song-selection.component';

const routes: Routes = [
  { path: '', redirectTo: '/songs', pathMatch: 'full' },
  { path: 'player/:id', component: PlayerComponent },
  { path: 'songs', component: SongSelectionComponent }
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forRoot(routes)]
})
export class AppRoutingModule { }
