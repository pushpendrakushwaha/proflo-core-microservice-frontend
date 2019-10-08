import { Component, OnInit } from '@angular/core';
import { TeamService } from '../team.service';
import { MatDialog } from '@angular/material';
import { SlackDialogComponent } from '../slack-dialog/slack-dialog.component';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  teams: Team[];
  constructor(
    private dialog: MatDialog,
    private teamService: TeamService) {
    this.teams = [];
  }

  ngOnInit() {
    this.teamService.getTeams().subscribe((teams: Team[]) => {
      // this.teams = teams;
      for(let i=0; i< teams.length; i++) {
        this.teams.push(teams[i]);
      }
    });

    this.teamService.getTeamsInvitation().subscribe((teams: Team[]) => {
      // this.teams = teams;
      for(let i=0; i< teams.length; i++) {
        this.teams.push(teams[i]);
      }
    });
  }
  slackIntegration(teamId): void {
    console.log(teamId);
    this.teamService.teamId = teamId;
    const dialogRef = this.dialog.open(SlackDialogComponent, {
     width: '500px',
      height: '400px',
      data: {
        id: teamId
    }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('Slack Integrate');
    });
  }

}
