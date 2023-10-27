import { Component } from '@angular/core';
import { DataserviceService } from '../dataservice.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { faSnowflake } from '@fortawesome/free-solid-svg-icons';
import { faDatabase } from '@fortawesome/free-solid-svg-icons';

import { users } from '../users';
import { Observable } from 'rxjs';
import { company } from '../company';
import { LeadviewComponent } from '../leadview/leadview.component';
import { Router } from '@angular/router';
@Component({
  selector: 'app-database-view',
  templateUrl: './database-view.component.html',
  styleUrls: ['./database-view.component.css']
})
export class DatabaseViewComponent {
  myhome=faDatabase;
  snow=faSnowflake;
  names:string[]=['a','b','c','d','e','f'];
  databases:string[]=["gearup","abc","odoo","prodapt","hdfc","airtel"]
  texth1:any="List of databases";

  textp:any="";
  
  logout()
  {
    alert("You have Successfully Loged out!");
    this.router.navigate(["/"]);
  }
  filepath:string="";
  constructor(private db:DataserviceService,private router:Router){
    console.log(this.db.track)
    this.filepath=this.db.track.path!
    
    let hello$ = this.db.getcompanies(this.db.track);
        hello$.subscribe(
            (data: any) => this.message(data),
            err => console.error(err)
        );

  }
  datas:string[]=[];
  message(data2:any){
      for(let index in data2){
          this.datas.push(data2[index].cmpname)
      }
      console.log(this.datas);

      if (this.datas.length==0)

      {

        this.texth1="You have no companies or database to list."

        this.textp="Please create a database to proceeed."

      }

      else{

        this.texth1="List of Databases."

      }
  }
  
  
 
connecttodatabase(database:any){
  this.db.track.ldatabase=database;
  let hello$ = this.db.getcompid(this.db.track);
        hello$.subscribe(
            (data: any) => this.message1(data),
            err => console.error(err)
        );
  console.log(this.db.track)
  console.log("hee")
}    /// goes to adminslist page 
message1(data:any){
  this.db.track.lcid=data[0].cmpid
}
  
}
