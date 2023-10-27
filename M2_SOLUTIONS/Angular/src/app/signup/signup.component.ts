import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataserviceService } from '../dataservice.service';
import { FormsModule } from '@angular/forms';
import { users } from '../users';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { RouterModule, Routes} from '@angular/router';
import { alluser } from '../alluser';
import { TermsComponent } from '../terms/terms.component';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  providers:[DataserviceService] 
})
export class SignupComponent {
  data2: any;
  k:boolean=false;
  kp:boolean=false;

  constructor(private ds:DataserviceService,private router: Router,private dialogRef: MatDialog){}
 
  checkboxChanged(event:any)
  {
    this.kp=event.checked;
  }
  message(data2:any){
    console.log(data2)
    if (data2.result == false){
      alert(data2.mess)
    } 
    else 
    {
      this.ds.track.lid=data2.empid

      alert("Sign Up Successfull");
      this.k=true;
      console.log(this.ds.track)
      // this.router.navigate(["/"]);
    }

  }
  update(frm:any)
  {
    const User=new users();
    
    if (frm.value.name!="" && frm.value.email!="" && frm.value.phone!="" && frm.value.username!="" && frm.value.password!="" && frm.value.confirmpassword)
    {
      
      const expressionemail: RegExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
      const expressionphone: RegExp = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;
      const email:string=frm.value.email 
      const phone:string=frm.value.phone
      const pass:string = frm.value.password
      const confirmpass:string = frm.value.confirmpassword
      const resultemail: boolean = expressionemail.test(email); 
      const resultphone: boolean = expressionphone.test(phone);
      
      if (pass != confirmpass)
      {
        alert("Confirm Password does not match");
      }
      else if(this.kp!=true)
      {
        alert("Please accept terms of service!");
      }
      else 
      {
      if (resultemail==true && resultphone==true)
      {
        
        
        User.cname=frm.value.name
        User.cemail=frm.value.email
        User.cphone=(frm.value.phone)
        User.cusername=(frm.value.username);
        User.cpassword=(frm.value.password)
        

        
        let hello$ = this.ds.addceodetails(User);
        hello$.subscribe(
            // (data: any) => (this.k=data.result)?alert("Sign Up Successfull"):alert(data.mess),
            (data: any) => this.message(data),
            err => console.error(err)
        );

        
        
        // if (this.data2.result == false){
        //   alert(this.data2.mess)
        // } 
        // else 
        // {
        //   alert("Sign Up Successfull");
        //   this.k = true;
        // }
        // let hello$ = this.ds.creates();

        // hello$.subscribe(
        //     (data: any) => console.log(data),
        //     err => console.error(err)
        // );
        // const message =this.ds.addceodetails(User);
        // console.log(message)
       
      }
      else if(resultemail==false)
      {
        alert("Please Enter a valid Emailid");
      }
      else
      {
        alert("Please Enter a valid MobileNumber");
      } 
    }
    }
    else{
      alert("Please Fill Out Remaining Fields");
    }
  }
  skip()
  {
    alert("You can update it later by clicking on your profile");
     this.router.navigate(["/"]);
  }
  // info:string[]=[]
  // getdata1(){
  //   this.info=this.ds.setData1()
  //   console.log(this.info);
  // }
  terms(){
    const a = this.dialogRef.open(TermsComponent,{

      height:'500px',

      width:'600px',

    });

    a.updatePosition({
      // bottom: '0px',  
      // right: '0px',
      // left: '400px',
      // top: '220px',
    });
  }

  public userfile:any;

  onSelectFile(event:any)

  {
    const file=event.target.files[0];
    console.log(file);
    this.userfile=file;
  }

  saveForm()
  {
    console.log(this.ds.track)
    var formData = new FormData();

    formData.append('file',this.userfile);

    let hello$ = this.ds.savePhoto(formData);
    hello$.subscribe(
        (data: any) => this.message1(data),
        err => console.error(err)
    );
    alert("Photo Uploaded Successfully");
     this.router.navigate(["/"]);
  }
  message1(data:any){
    this.ds.photos(this.ds.track).subscribe((response)=>
    {
      console.log(response);
    });
  }

}