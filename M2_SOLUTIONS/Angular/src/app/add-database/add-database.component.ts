import { Component } from '@angular/core';
import { company } from '../company';
import { DataserviceService } from '../dataservice.service';
import { Route, Router } from '@angular/router';
import { faDatabase, faSnowflake } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-add-database',
  templateUrl: './add-database.component.html',
  styleUrls: ['./add-database.component.css']
})
export class AddDatabaseComponent {
  snow=faSnowflake;
  myhome=faDatabase;
  lname:any= this.ds.track.lname;
  filepath=this.ds.track.path!
  constructor(private ds:DataserviceService,private router:Router){}
  logout(){
    alert("You have Successfully Loged out!");
    this.router.navigate(["/"]);
  }
  message(data2:any){
    console.log(data2);
    if (data2.result == false){
      alert(data2.mess)
    } 
    else 
    {
      alert(data2.mess);
      // this.ds.track.lcid=data2.cmpid
      this.router.navigate(["/ceo"]);
  
    }
  }
  createdb(frm:any){
    const Company=new company()
    Company.ceoid=this.ds.track.lid;
    Company.ceoname=this.ds.track.lname;
  Company.cmpemail=frm.value.email 
  Company.cmpname=frm.value.companyname;
  Company.cmpphonenumber=frm.value.phone;
  Company.country= frm.value.country;
  Company.cmpaddress=frm.value.address;
  Company.cmpsize=frm.value.size;
  let hello$ = this.ds.createcompany(Company);
        hello$.subscribe(
            // (data: any) => (this.k=data.result)?alert("Sign Up Successfull"):alert(data.mess),
            (data: any) => this.message(data),
            err => console.error(err)
        );



  }

}
