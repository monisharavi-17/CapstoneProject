import { Component, NgModule } from '@angular/core';

import { DataserviceService } from '../dataservice.service';

import { HttpClient, HttpClientModule } from '@angular/common/http';

import { faHouse } from '@fortawesome/free-solid-svg-icons';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faSnowflake } from '@fortawesome/free-solid-svg-icons';
import { faDatabase } from '@fortawesome/free-solid-svg-icons';

 

import { users } from '../users';

import { Observable } from 'rxjs';

import { company } from '../company';
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
    this.router.navigate(['']);
  }

  
 

  constructor(private db:DataserviceService,private router: Router){

    console.log(this.db.track)

   

    let hello$ = this.db.getcompanies(this.db.track);

        hello$.subscribe(

            (data: any) => this.message(data),

            err => console.error(err)

        );

 

  }

  datas:string[]=["Google","Amazon","Microsoft",];

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
 

 

 

 

 

 

  name:string[]=[];

   getsss(){

  // this.db.gets().subscribe(data =>{  

  //   this.students =data;  

  //   this.dtTrigger.next();  

  // })

  this.name=this.names;

}

  student1:users = new users();

 

connecttodatabase(database:any){

  this.db.track.ldatabase=database;

  let hello$ = this.db.getcompid(this.db.track);

        hello$.subscribe(

            (data: any) => this.db.track.lcid=data[0].cmpid,

            err => console.error(err)

        );

  console.log(database)

}

 

  students=new Array<users>()

 

// saveStudent(): void{  

 

//   this.student1.cname="monisha";      

//   this.student1.cemail="monisha@1233";  

//   this.student1.cpassword="jdcjefb@ejfv";  

//   this.student1.cphone="1232"

//   this.student1.cpassword="12345"

//   this.save();  

// }  

 

 

 

save() {

  // return this.db.createStudent(this.student1)

  // console.log(this.student1.student_id);      

  // console.log(this.student1.student_name);  

  // console.log(this.student1.student_email);

  // this.db.createStudent(this.student1)  

  //   .subscribe(data => console.log(data), error => console.log(error));  

 

 }  //

 

  // gerc(){

  //   console.log("me")

  //   return this.http.get(this.base)

  // }

  // getsss(){

  //   console.log("hii")

  //   this.db.gets()

   

  // }

  // meth(){

  //   this.db.getStudentList().subscribe(data =>{  

  //     this.students =data;  

  //     console.log()

       

  //     })  

  //   }  
  
 

 

}
