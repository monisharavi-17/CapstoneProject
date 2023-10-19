import { Component } from '@angular/core';
import { DataserviceService } from '../dataservice.service';

@Component({
  selector: 'app-ceodashboard',
  templateUrl: './ceodashboard.component.html',
  styleUrls: ['./ceodashboard.component.css']
})
export class CeodashboardComponent {
  names:string[]=['a','b','c','d','e','f'];
  databases:string[]=["gearup","abc","odoo","prodapt","hdfc","airtel"]
  private base="localhost:2023/data"
    
  constructor(private db:DataserviceService){
    

  }
  name:string[]=[];
   getsss(){
  // this.db.gets().subscribe(data =>{  
  //   this.students =data;  
  //   this.dtTrigger.next();  
  // }) 
  this.name=this.names;
}
  // student1:users = new users();
 


  // students=new Array<users>()
  
saveStudent(): void{  
  
  // this.student1.cname="monisha";      
  // this.student1.cemail="monisha@1233";  
  // this.student1.cpassword="jdcjefb@ejfv";  
  // this.student1.cphone="1232"
  // this.student1.cpassword="12345"
  // this.save();  
}  

  

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
