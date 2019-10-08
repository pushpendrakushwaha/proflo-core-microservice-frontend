import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { TeamService } from './team.service';
import { BoardService } from './board.service';
import { BoardCreatorComponent } from './board-creator/board-creator.component';
import { ListService } from './list.service';
import { DeleteTeamComponent } from './delete-team/delete-team.component';
import { TeamCreatorDialogComponent } from './team-creator/team-creator.component';
import { BoardList } from './models/boardList';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Proflo';
  teams: Team[];
  boards: TeamBoard[];
  lists: BoardList[];

constructor(public dialog: MatDialog, private teamService: TeamService,
            private boardService: BoardService, private listService: ListService) { }

  ngOnInit() {
    this.getTeams();
  }

  getTeams() {
    this.teamService.getTeams().subscribe((teams: Team[]) => {
      this.teams = teams;
    });
  }

  getBoards() {
    this.boardService.getBoards().subscribe((boards: TeamBoard[]) => {
      this.boards = boards;
    });
  }
}
