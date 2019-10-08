
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatDialogModule, MatDialogRef, MatSelectModule, MatDialogTitle } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';

import { MaterialModule } from './material/material.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BoardpageComponent } from './boardpage/boardpage.component';
import { TeamCreatorDialogComponent  } from './team-creator/team-creator.component';
import { BoardCreatorComponent } from './board-creator/board-creator.component';
import { BoardService} from '../app/board.service';
import { TeamBoardComponent } from './team-board/team-board.component';
import { TeamPageComponent } from './team-page/team-page.component';
import { RouterModule } from '@angular/router';
import { ListCreatorComponent } from './list-creator/list-creator.component';
import { CardCreatorComponent } from './card-creator/card-creator.component';
import { AvatarModule } from 'ngx-avatar';
import { DeleteTeamComponent } from './delete-team/delete-team.component';
import { HomeComponent } from './home/home.component';
import { DialogOpenerComponent } from './dialog-opener/dialog-opener.component';
import { ProfloRealTimeService } from './proflo-realtime.service';
import { DragDropModule} from '@angular/cdk/drag-drop';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { InterceptorService } from './interceptor.service';
import { CookieService } from 'ngx-cookie-service';
import { CardEditDialogComponent } from './card-edit-dialog/card-edit-dialog.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material';
import { CommentpageComponent } from './commentpage/commentpage.component';
import { SlackDialogComponent } from './slack-dialog/slack-dialog.component';


@NgModule({
  declarations: [
    AppComponent,
    BoardpageComponent,
    TeamCreatorDialogComponent,
    BoardCreatorComponent,
    TeamBoardComponent,
    TeamPageComponent,
    ListCreatorComponent,
    CardCreatorComponent,
    DeleteTeamComponent,
    HomeComponent,
    DialogOpenerComponent,
    CardEditDialogComponent,
    CommentpageComponent,
    SlackDialogComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
    MatDialogModule,
    HttpClientModule,
    MatIconModule,
    AvatarModule,
    RouterModule,
    DragDropModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule
  ],
  entryComponents: [
    TeamCreatorDialogComponent,
    BoardCreatorComponent,
    CardCreatorComponent,
    DeleteTeamComponent,
    CardEditDialogComponent,
    CommentpageComponent,
    SlackDialogComponent
  ],
  providers: [
    BoardService,
    ProfloRealTimeService,
    CookieService,
    { provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true },
],
  bootstrap: [AppComponent, ]
})
export class AppModule { }
