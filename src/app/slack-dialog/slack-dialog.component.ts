import { Component, OnInit } from '@angular/core';
import { TeamService } from '../team.service';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-slack-dialog',
  templateUrl: './slack-dialog.component.html',
  styleUrls: ['./slack-dialog.component.css']
})
export class SlackDialogComponent implements OnInit {
  teamId: string;

  constructor(
    private teamService: TeamService,
    private dialogRef: MatDialogRef<SlackDialogComponent>
  ) { }

  ngOnInit() {
    this.teamId = this.teamService.teamId;
    console.log(this.teamService.teamId);

  }
  getTeamId(id: string) {
    {
    let selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = id;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
    }
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  close() {
    this.onNoClick();
  }

}
