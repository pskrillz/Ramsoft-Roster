import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css']
})
export class MembersComponent implements OnInit {
  members = [];

  constructor(public appService: AppService, private router: Router) {}

  ngOnInit() {
    this.loadTable()
  }

  goToAddMemberForm() {
    this.router.navigate(['/add-member'])
  }

  editMemberById(id: number) {}

  deleteMemberById(id: number) {
    this.appService.deleteMember(id).subscribe(res => {
      this.loadTable()
      console.log(res)
    })
  }


  loadTable(){
    this.appService.getMembers().subscribe(members => (this.members = members));
  }

}