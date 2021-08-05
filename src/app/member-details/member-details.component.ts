import { Component, OnInit, OnChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AppService } from '../app.service';
import { Router } from '@angular/router';

// This interface may be useful in the times ahead...
export interface Member {
  firstName: string;
  lastName: string;
  jobTitle: string;
  team: string;
  status: string;
  memberId: number;
}

@Component({
  selector: 'app-member-details',
  templateUrl: './member-details.component.html',
  styleUrls: ['./member-details.component.css']
})
export class MemberDetailsComponent implements OnInit, OnChanges {
  memberModel: Member;
  memberForm: FormGroup;
  firstName: FormControl;
  submitted = false;
  alertType: String;
  alertMessage: String;
  teams: any [];

  currMember;

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
        team: [
          '',
          Validators.compose([
            Validators.required,
          ]),
        ],
        status: [
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

      if(this.appService.currMember){
        this.currMember = this.appService.currMember
        console.log(this.currMember)
        this.memberForm.setValue({
          firstName: this.currMember.firstName,
          lastName: this.currMember.lastName,
          jobTitle: this.currMember.jobTitle,
          team: this.currMember.team,
          status: this.currMember.status
        });
    
      }
  }

  ngOnChanges() {
  }

  // TODO: Add member to members
  onSubmit(form: FormGroup) {
    this.memberModel = form.value;
    console.log(this.memberModel)
    console.log("testing on submit")
    if(!this.currMember){
      this.appService.addMember(this.memberModel).subscribe(res => {
        console.log(res)
      })
    } else{
      this.appService.updateMember()
    }

    this.goBackToSummary()

  }

  goBackToSummary(){
    this.router.navigate(['/members']);
  }



}
