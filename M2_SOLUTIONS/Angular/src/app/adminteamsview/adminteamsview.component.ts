import { Component, ViewEncapsulation } from '@angular/core';
import { NewleadComponent } from '../newlead/newlead.component';
import { AddsalesteamComponent } from '../addsalesteam/addsalesteam.component';
import { AddsalespersonComponent } from '../addsalesperson/addsalesperson.component';
import { GenerateleadsComponent } from '../generateleads/generateleads.component';
import { DataserviceService } from '../dataservice.service';
import { MatDialog } from '@angular/material/dialog';
import { faBinoculars, faCloudArrowDown, faFolderPlus, faNetworkWired, faPeopleGroup, faSnowflake, faUpload, faUserPlus, faUsers } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';

@Component({
  selector: 'app-adminteamsview',
  templateUrl: './adminteamsview.component.html',
  styleUrls: ['./adminteamsview.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class AdminteamsviewComponent {
  role1:boolean=true;
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
  Name:string=""
  filepath=this.ds.track.path
  constructor(private ds:DataserviceService, private dialogRef: MatDialog,private router:Router)
  {
    this.Name=this.ds.track.lname!;
    console.log(this.ds.track)
    console.log(this.Name)
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
  teamMembers:string[]=[];
  message1(data:any){
    console.log(data)
    for(let index in data){
      if(!this.teamMembers.includes(data[index].empname)){
        this.teamMembers.push(data[index].empname);
      }
    }
  
  }
  generateLead(){
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
  openDialog2(){
    this.dialogRef.open(AddsalesteamComponent,{
      height:'300px',
      width:'400px',
      backdropClass: 'backdropBackground',
    });

  }
  newLead(){
    this.dialogRef.open(NewleadComponent,{
      height:'500px',
      width:'750px',
      backdropClass: 'backdropBackground',
    });

  }
  logout()

  {

    alert("You have Successfully Loged out!");

    this.router.navigate(["/"]);

  }
}

