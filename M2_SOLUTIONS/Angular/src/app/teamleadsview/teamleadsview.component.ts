import { Component } from '@angular/core';
import { DataserviceService } from '../dataservice.service';
import { userleads } from '../users';
import * as XLSX from "xlsx"
import { faFileArrowDown, faSignature, faSnowflake } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
@Component({
  selector: 'app-teamleadsview',
  templateUrl: './teamleadsview.component.html',
  styleUrls: ['./teamleadsview.component.css']
})
export class TeamleadsviewComponent {
  myhome=faSignature;
  snow=faSnowflake;
  exporticon=faFileArrowDown
  role:string=""
  constructor(private ds:DataserviceService, private router:Router){
    console.log(ds.track)
    this.role=this.ds.track.lrole!
    // if(this.ds.track.lrole=="ceo"){
    //   this.ds.track.leadadminid=this.ds.track.lid
    // }
    // else if(this.ds.track.lrole=="Admin"){
    //   this.ds.track.leadadminid=this.ds.track.lmemberid
    // }
    // else{
    //   this.ds.track.leadadminid=this.ds.track.lteamid
    // }
    let hello$ = this.ds.connecttoleadsfromteam(this.ds.track);
        hello$.subscribe(
            // (data: any) => (this.k=data.result)?alert("Sign Up Successfull"):alert(data.mess),
            (data: any) => this.message(data),
            err => console.error(err)
        );
  }
  Leads:userleads[]=[]
  message(data:any){
    console.log(data)
    console.log(this.ds.track)
    
    for(let index in data){
      if(data[index].lteamid==this.ds.track.lteamid && data[index].stage!="Won"){
        this.Leads.push(data[index])
      }
      
    }
    console.log(this.Leads);
  }
  searching(){
    let element = document.getElementById('table'); 
    
  }
  leademail:any="";
  leadspage(group:userleads)
  { 
    console.log(document.getElementById("email")?.innerHTML)
    this.leademail=document.getElementById("email")?.innerHTML;
    this.ds.track.useleads=group
    console.log(this.ds.track.useleads)
  }
  fileName= 'ExcelSheet.xlsx';  
  exportexcel()
  {
    let element = document.getElementById('table'); 
    const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);

    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1'); 

    XLSX.writeFile(wb, this.fileName);
    
  }
  exportcsv()
  {
        
  }
  progressreport()
  {
    console.log(this.ds.track)
    if(this.ds.track.lrole=="ceo"){
      console.log(this.ds.track)
      let hello$ = this.ds.reportfromceo(this.ds.track);
        hello$.subscribe(
            // (data: any) => (this.k=data.result)?alert("Sign Up Successfull"):alert(data.mess),
            (data: any) => this.message1(data),
            err => console.error(err)
        );
    }
    if(this.ds.track.lrole=="Admin"){
      console.log(this.ds.track)
      let hello$ = this.ds.reportfromadmin(this.ds.track);
        hello$.subscribe(
            // (data: any) => (this.k=data.result)?alert("Sign Up Successfull"):alert(data.mess),
            (data: any) => this.message1(data),
            err => console.error(err)
        );
    }
  }
  message1(data:any){
    console.log(data)
    this.ds.track.reportlist=data
    this.router.navigate(['/report'])
}
  term:string="";

  logout()

  {

    alert("You have Successfully Loged out!");

    this.router.navigate(["/"]);

  }
  filepath=this.ds.track.path;

}


