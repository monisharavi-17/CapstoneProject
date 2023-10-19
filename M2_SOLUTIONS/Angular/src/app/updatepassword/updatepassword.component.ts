import { Component } from '@angular/core';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { faSnowflake } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import { DataserviceService } from '../dataservice.service';
import { alluser } from '../alluser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-updatepassword',
  templateUrl: './updatepassword.component.html',
  styleUrls: ['./updatepassword.component.css']
})
export class UpdatepasswordComponent {
  exporticon=faLock;
  myhome=faUser;
  snow=faSnowflake;
  filepath=this.ds.track.path;
  peru=this.ds.track.lrole;
  constructor(private ds:DataserviceService,private router:Router){
    // let hello$ = this.ds.gettheuser(this.ds.track);
    //     hello$.subscribe(
            
    //         (data: any) => this.message(data),
    //         err => console.error(err)
    //     );

    
  }
  // name:any="";
  // email:any="";
  // phone:any="";
  // company:any="";
  // role:any="";
  // password:any="";
  // username:any="";
  // name1:any="";
  // email1:any="";
  // phone1:any="";
  // company1:any="";
  // role1:any="";
  // password1:any="";
  // username1:any="";
  // employeeid:number|undefined
  // message(data:any)
  // {
  //   console.log(data)
  //    this.name=data.empname;
  //    this.email=data.email;
  //    this.phone=data.phonenumber;
  //    this.role=data.emprole;
  //    this.password=data.password;
  //    this.username=data.username;
  //   this.employeeid=data.empid
  //    this.name1=data.empname;
  //    this.email1=data.email;
  //    this.phone1=data.phonenumber;
  //    this.role1=data.emprole;
  //    this.password1=data.password;
  //    this.username1=data.username;

    
     
  // }
  newpassword:string=""
  confirmpassword:string=""

  validateSignupForm(frm:any){
    const user1= new alluser();
    this.newpassword=frm.value.password
    this.confirmpassword=frm.value.confirmPassword
    if(this.newpassword==this.confirmpassword){
        user1.empid=this.ds.track.lid
        user1.password=this.newpassword
        let hello$ = this.ds.updatepass(user1);
        hello$.subscribe(
            
            (data: any) => console.log(data),
            err => console.error(err)
        );
    }
    alert("Password updated successfully!!!")


  }
  logout()

  {

    alert("You have Successfully Loged out!");

    this.router.navigate(["/"]);

  }


}
