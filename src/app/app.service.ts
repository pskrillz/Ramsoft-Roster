import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { Member } from '../app/member-details/member-details.component'
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  api = environment.url;
  username: string;

  currMember;
  currMemberId;
  

  constructor(private http: HttpClient) {}

  // Returns all members
  getMembers() {
    return this.http
      .get(`${this.api}/members`)
      .pipe(catchError(this.handleError));
  }

  setUsername(name: string): void {
    this.username = name;
  }

  updateMember(memberForm: Member, currMemberId){
    return this.http
    .patch(`${this.api}/updateMember/${currMemberId}`, memberForm)
    .pipe(catchError(this.handleError));
  }

  addMember(memberForm: Member){
    return this.http
    .post(`${this.api}/addMember`, memberForm)
    .pipe(catchError(this.handleError));
  }

  deleteMember(id: number){
    return this.http
    .delete(`${this.api}/deleteMember/${id}`)
    .pipe(catchError(this.handleError));
  }


  getTeams() {
    return this.http
    .get(`${this.api}/teams`)
    .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }
    return [];
  }
}
