import { Component, OnInit, Inject, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { TeamService } from '../team.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl } from '@angular/forms';
import { ViewChild, ViewContainerRef } from '@angular/core';

@Component({
  selector: 'app-my-dialog',
  templateUrl: './team-creator.component.html',
  styleUrls: ['./team-creator.component.css']
})
export class TeamCreatorDialogComponent implements OnInit {

  teamForm: FormGroup;
  @ViewChild('inviteeEmail', { static: false }) emailAddress: ElementRef;
  @ViewChild('inviteeName', { static: false }) name: ElementRef;

  constructor(
    // public route: Router,
    public dialogRef: MatDialogRef<TeamCreatorDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private teamService: TeamService) {
    this.teamForm = fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      invitees: fb.array([]),
    });
  }

  ngOnInit() { }

  inviteMember(name: string, emailAddress: string) {
    console.log('Email Address');
    const inviteesControl = this.teamForm.controls.invitees as FormArray;
    inviteesControl.push(new FormControl({memberName: name, emailId: emailAddress}));
    console.log(this.emailAddress);
    console.log(this.name);
    (this.emailAddress.nativeElement as HTMLInputElement).value = '';
    (this.name.nativeElement as HTMLInputElement).value = '';
    this.teamService.inviteToTeam(emailAddress).subscribe((invitedToTeam) => {
      console.log(invitedToTeam);
    });
  }

  createTeam() {
    if (this.teamForm.valid) {
      const team: Team = this.teamForm.value;
      console.log(team);
      this.teamService.createTeam(team).subscribe((createdTeam) => {
        console.log(createdTeam);
        this.dialogRef.close();
      });
    } else {
      console.log(this.teamForm.errors);
    }
  }

}
