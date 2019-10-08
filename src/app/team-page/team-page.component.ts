import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { pluck } from 'rxjs/operators';
import { BoardCreatorComponent } from '../board-creator/board-creator.component';
import { MatDialog } from '@angular/material';
import { TeamService } from '../team.service';


@Component({
  selector: 'app-team-page',
  templateUrl: './team-page.component.html',
  styleUrls: ['./team-page.component.css']
})
export class TeamPageComponent implements OnInit {

  team: Team;
  teamId: string;

  constructor(private activatedRoute: ActivatedRoute, public dialog: MatDialog, private teamService: TeamService) {

  }

  ngOnInit() {
    this.activatedRoute.params.pipe(pluck('teamid')).subscribe(teamId => {

      this.teamId = teamId;
      this.teamService.getTeam(teamId).subscribe((team: Team) => {
        this.team = team;
      });
    });
  }

  getBoards(teamId: string) {
    // Do Service Calls
  }

  boardOpenDialog(): void {
    const dialogRef = this.dialog.open(BoardCreatorComponent,
      {
        data: { teamId: this.teamId },
      }
    );
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
    });
  }
}
