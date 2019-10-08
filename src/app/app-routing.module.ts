import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TeamPageComponent } from './team-page/team-page.component';
import { BoardpageComponent } from './boardpage/boardpage.component';
import { TeamCreatorDialogComponent } from './team-creator/team-creator.component';
import { HomeComponent } from './home/home.component';
import { BoardCreatorComponent } from '../app/board-creator/board-creator.component';
import { DialogOpenerComponent } from './dialog-opener/dialog-opener.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: HomeComponent },
  { path: 'teams/create', outlet: 'secondary', component: DialogOpenerComponent },
  { path: 'teams/:teamid/boards/create', outlet: 'secondary', component: DialogOpenerComponent },
  // { path: 'boards/:boardid/card/:cardid/comment/create', outlet: 'secondary', component: DialogOpenerComponent },
  { path: 'teams/:teamid', component: TeamPageComponent },
  { path: 'boards/:boardid', component: BoardpageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
