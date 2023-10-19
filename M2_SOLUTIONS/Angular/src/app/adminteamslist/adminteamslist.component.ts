import { Component, ViewEncapsulation } from '@angular/core';
import { AddsalespersonComponent } from '../addsalesperson/addsalesperson.component';
import { MatDialog } from '@angular/material/dialog';
//import { AddsalesteamComponent } from '../addsalesteam/addsalesteam.component';
import { NewleadComponent } from '../newlead/newlead.component';
import { DataserviceService } from '../dataservice.service';
import { AddsalesteamComponent } from '../addsalesteam/addsalesteam.component';
import { GenerateleadsComponent } from '../generateleads/generateleads.component';
import { TeammembersPopupComponent } from '../teammembers-popup/teammembers-popup.component';
import { faBinoculars, faCloudArrowDown, faFolderPlus, faNetworkWired, faPeopleGroup, faSnowflake, faUpload, faUserPlus, faUsers } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';

@Component({
  selector: 'app-adminteamslist',
  templateUrl: './adminteamslist.component.html',
  styleUrls: ['./adminteamslist.component.css'],
  encapsulation: ViewEncapsulation.None,

 
})
export class AdminteamslistComponent {
  teams:string[]=["team1","team2","team3","team4"]
  myhome=faSnowflake;
  snow=faSnowflake;
  teamicon=faUsers;
  empicon=faUserPlus;
  addleadicon=faFolderPlus;
  importleadicon=faUpload;
  generateleadicon=faCloudArrowDown;
  viewleadicon=faBinoculars;
  addadminicon=faPeopleGroup;
  assignworkicon=faNetworkWired;
  role1:boolean=true;
  teamMembers:string[]=[];
  Name:string="";
  filepath=this.ds.track.path;

  logout()

  {

    alert("You have Successfully Loged out!");

    this.router.navigate(["/"]);

  }
  constructor(private ds:DataserviceService, private dialogRef: MatDialog,private router:Router)
  {
    this.Name=this.ds.track.ladminname!;
    
    const role=this.ds.track.lrole;
    if (role=="ceo")
    {
      this.role1=false;
    }
    let hello$ = this.ds.gototeamslist(this.ds.track);
    hello$.subscribe(
        (data: any) => this.message(data),
        err => console.error(err)
    );
  }
  datas:string[]=[];
  teamids:number[]=[]
  message(data2:any){
      for(let index in data2){
        if(!this.datas.includes(data2[index].teamname)){
          this.datas.push(data2[index].teamname)
          this.teamids.push(data2[index].teamid)
        }
      }
      console.log(this.datas);
  }
  geteamid(data:any){
    const num=this.datas.indexOf(data);
    this.ds.track.lteamid=this.teamids[num]
    console.log(this.ds.track.lteamid)
  }
  generateLead(){
    this.ds.track.leadadminid=this.ds.track.leadadminid
    this.ds.track.leadadminname=undefined
    console.log("inside gen")
    
    const a =this.dialogRef.open(GenerateleadsComponent,{
      
      height:'300px',

 

      width:'400px',

      backdropClass: 'backdropBackground',
 

    });

 

   

      // a.updatePosition({

      //   bottom: '0px',  

      //   right: '0px',

      //   left: '100px',

      //   top: '120px',

      // });

 

 

  }
  openDialog1(){
    this.dialogRef.open(AddsalespersonComponent,{
      height:'400px',
      width:'600px',
      backdropClass: 'backdropBackground',
    });

  }
  printteammembers(data:any)
  {
    // console.log(i);
    this.teamMembers=[]
    const num1=this.datas.indexOf(data);
    this.ds.track.lteamid=this.teamids[num1]
    console.log(this.ds.track.lteamid)
    this.ds.track.lteam=data 
    const num=this.datas.indexOf(data)
    this.ds.track.lteamid=this.teamids[num]
    let hello$ = this.ds.getmemberdetail(this.ds.track);
        hello$.subscribe(
            // (data: any) => (this.k=data.result)?alert("Sign Up Successfull"):alert(data.mess),
            (data: any) => this.message1(data),
            err => console.error(err)
        );

      // this.teamMembers=["Monisha","Yogesh","SubhaLakshmi","Shanmugam"]
  }
  message1(data:any){
    console.log(data)
    for(let index in data){
      if(!this.teamMembers.includes(data[index].empname)){
        this.teamMembers.push(data[index].empname);
      }
    }
  
  }
//   teammembers(data:any){
    // const num1=this.datas.indexOf(data);
    // this.ds.track.lteamid=this.teamids[num1]
    // console.log(this.ds.track.lteamid)
    // this.ds.track.lteam=data 
    // const num=this.datas.indexOf(data)
    // this.ds.track.lteamid=this.teamids[num]
//   const a =this.dialogRef.open(TeammembersPopupComponent,{
//  height:'250px',
//   width:'200px',
//  });
//  a.updatePosition({
//   bottom: '0px',  
//   right: '0px',
//   left: '400px',
//   top: '220px',
//   });


//   }
  openDialog2(){
    this.dialogRef.open(AddsalesteamComponent,{
      height:'300px',
      width:'400px',
      backdropClass: 'backdropBackground',
    });

  }
  newLead(){
    // this.ds.track.leadadminid=this.ds.track.lid
    // this.ds.track.leadadminname=undefined
    console.log(this.ds.track)
    this.dialogRef.open(NewleadComponent,{
      height:'500px',
      width:'750px',
      backdropClass: 'backdropBackground',
    });

  }
}
