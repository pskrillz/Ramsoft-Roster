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
    this.asyncLoadTable()
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
    this.appService.getMembers().subscribe(members => (this.members = members));
  }

  loadTable = new Promise<void>((resolve, reject) => {
    this.getMembers()
    setTimeout(() => {
      

      if (this.members.length) {
        this.isLoading = false;
        resolve()
      } else {
        reject('Took too Long')
      }
      
     }, 1000);
    
  })

  asyncLoadTable(){
    this.loadTable.then(() =>{
      console.log("resolved")
    }).catch((error)=>{
      console.log("reject", error)
    })
  }


}