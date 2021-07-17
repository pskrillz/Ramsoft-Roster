import { Component, OnInit, OnChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppService } from '../app.service';
import { Router } from '@angular/router';

// This interface may be useful in the times ahead...
export interface Member {
  firstName: string;
  lastName: string;
  jobTitle: string;
  team: string;
  status: string;
}

@Component({
  selector: 'app-member-details',
  templateUrl: './member-details.component.html',
  styleUrls: ['./member-details.component.css']
})
export class MemberDetailsComponent implements OnInit, OnChanges {
  memberModel: Member;
  memberForm: FormGroup;
  submitted = false;
  alertType: String;
  alertMessage: String;
  teams: any [];

  constructor(
    private fb: FormBuilder, 
    private appService: AppService, 
    private router: Router) {
      this.memberForm = this.fb.group({
        firstName: [
          '',
          Validators.compose([
            Validators.required,
          ]),
        ],
        lastName: [
          '',
          Validators.compose([
            Validators.required,
          ]),
        ],
        jobTitle: [
          '',
          Validators.compose([
            Validators.required,
          ]),
        ],
        teamName: [
          '',
          Validators.compose([
            Validators.required,
          ]),
        ],
        activeStatus: [
          '',
          Validators.compose([
            Validators.required,
          ]),
        ],
      })
    }


  ngOnInit() {
    this.appService.getTeams()
      .subscribe(res => {
        this.teams = res;
      });
  }

  ngOnChanges() {
  }

  // TODO: Add member to members
  onSubmit(form: FormGroup) {
    this.memberModel = form.value;
    console.log(this.memberModel)
    console.log("testing on submit")
    this.appService.addMember(this.memberModel)
    this.goBackToSummary()

  }

  goBackToSummary(){
    this.router.navigate(['/members']);
  }



}
