import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { TeamService } from '../team.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-delete-team',
  templateUrl: './delete-team.component.html',
  styleUrls: ['./delete-team.component.css']
})
export class DeleteTeamComponent implements OnInit {
  removeForm: FormGroup;
  constructor(public dialogRef: MatDialogRef<DeleteTeamComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any, private fb: FormBuilder, private teamService: TeamService) {
    this.removeForm = fb.group({
      name: ['', Validators.required],
    });
  }

  ngOnInit() {
  }


  removeTeam() {
    if (this.removeForm.valid) {
      const team: Team = this.removeForm.value;
      this.teamService.removeTeam(team).subscribe((t: any) => {
        console.log(t);
        this.dialogRef.close('it was done');
      });
    } else {
      console.log(this.removeForm.errors);
    }

  }
}
