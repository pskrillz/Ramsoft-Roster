import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css']
})
export class MembersComponent implements OnInit {


  constructor(public appService: AppService, private router: Router) {}

  ngOnInit() {
   // this.asyncLoadTable()
   this.getMembers()
  }

  ngAfterViewInit(){
    this.getMembers();
  }


  goToAddMemberForm() {
    this.router.navigate(['/add-member'])
  }

  editMemberById(id: number) {}

  editMember(member, memberId){
    this.goToAddMemberForm()
    this.appService.currMember = member;
    console.log(member)
    this.appService.currMemberId = memberId;
  }

  deleteMemberById(id: number) {
    this.appService.deleteMember(id).subscribe(res => {
      this.getMembers()
      console.log(res)
    })
  }

  members = [];
  isLoading: boolean = true;


  getMembers(){
    this.appService.getMembers().subscribe(members => { //.subscribe already calls a callback no need for anything fancy 
      this.members = members
      this.isLoading = false;
    });
  }


}