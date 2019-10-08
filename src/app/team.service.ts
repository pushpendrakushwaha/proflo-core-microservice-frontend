import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TeamService {
teamId: string;
  constructor(private http: HttpClient) { }

  createTeam(teamPayload) {
    return this.http.post(`${environment.baseUrl}/api/teams`, teamPayload);
  }

  inviteToTeam(email) {
    return this.http.post(`${environment.baseUrl}/api/email`, { emailId: email });
  }

  getTeams() {
    return this.http.get(`${environment.baseUrl}/api/teams`);
  }

  getTeamsInvitation() {
    return this.http.get(`${environment.baseUrl}/api/invitation`);
  }
  getTeam(teamId: string) {
    return this.http.get(`${environment.baseUrl}/api/teams/${teamId}`);
  }

  removeTeam(teamId: any) {
    return this.http.delete(`${environment.baseUrl}/api/teams/${teamId}`);
  }
}

