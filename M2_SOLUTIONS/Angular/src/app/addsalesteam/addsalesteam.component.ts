import { AfterViewInit, Component, ElementRef } from '@angular/core';

@Component({
  selector: 'app-addsalesteam',
  templateUrl: './addsalesteam.component.html',
  styleUrls: ['./addsalesteam.component.css']
})
export class AddsalesteamComponent { 

  member:any="member A";
   
  onChange(event:any)
  {
      this.member=event.target.value;
  }
  addsalesteam(frm:any)
  {
    if (frm.value.teamname!="")
    {
      console.log("hi");
          const teamname=frm.value.teamname; 
          const member = this.member; 

          console.log(teamname);
          console.log(member);
    }
    else{
      alert("Please Enter the name for team");
    }
  }

}
