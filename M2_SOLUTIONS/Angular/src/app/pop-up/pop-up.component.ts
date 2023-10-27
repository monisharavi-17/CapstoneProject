import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { alluser } from '../alluser';
import { DataserviceService } from '../dataservice.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-pop-up',
  templateUrl: './pop-up.component.html',
  styleUrls: ['./pop-up.component.css']
})
export class PopUpComponent //implements OnInit 
{
  // firstName;
  // constructor(@Inject(MAT_DIALOG_DATA) public data1){
  //   this.firstName = data1.name;
  // }

  // ngOnInit(): void {
      
  // }
  gender: string = "Male";
  k:boolean=this.ds.t;
  constructor(private ds:DataserviceService,private dialogRef: MatDialogRef<PopUpComponent>,private router:Router,private dialogRef1: MatDialog){}
  message(data2:any){
    this.ds.photoid=data2.empid
    if (data2.result == false){
      alert(data2.mess)
    } 
    else 
    {
      alert("Admin added Successfully");
      this.ds.t=true;
      
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.router.navigate(['admins']);
    }); 
    

  
    this.dialogRef1.open(PopUpComponent,{
      height:'200px',
      width:'300px',
      backdropClass: 'backdropBackground',
    });
      console.log(this.k+"hi");

    }

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
    var formData = new FormData();
    formData.append('file',this.userfile);
    let hello$ = this.ds.savePhoto(formData);
    hello$.subscribe(
        (data: any) => this.message1(data),
        err => console.error(err)
    );
    alert("Photo Uploaded Successfully");
    this.ds.t=false
    this.dialogRef1.closeAll();
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {

      this.router.navigate(['admins']);

  });  
    
  }
  message1(data:any){
    this.ds.track.photoid=this.ds.photoid
    let hello$ = this.ds.photos1(this.ds.track);
    hello$.subscribe(
        (data: any) => console.log(data),
        err => console.error(err)
    );
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {

      this.router.navigate(['admins']);

  }); 
  }

  skip()
  {
    alert("Can be updated later by clicking on profile");
//     this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {

//       this.router.navigate(['/']);

//   });   
//   this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {

//     this.router.navigate(['/']);

// });   
//     this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {

//       this.router.navigate(['/admins']);

//   });
this.dialogRef1.closeAll();
this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
  this.router.navigate(['admins']);
}); 
// this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
//   this.router.navigate(['admins']);
// }); 

     
  }
 
  createAdmin(frm:any)
  {
      if (frm.value.name!="" && frm.value.email!="" && frm.value.phone!="" && frm.value.address!="" && frm.value.gender!="" && frm.value.uname!="" && frm.value.code !="" )
      {
        const all=new alluser()
        const expressionemail: RegExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
        const expressionphone: RegExp = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;
      
        all.empname=frm.value.name
        all.email=frm.value.email 
        all.phonenumber=frm.value.phone
        all.address = frm.value.address
        // const gender:string = frm.value.gender
        all.username = frm.value.uname
        all.password= frm.value.code
        
        all.cmpid=this.ds.track.lcid;
        console.log(this.ds.track.lcid)
        console.log(this.ds.track)
        all.ceoname=this.ds.track.lname
        all.emprole="Admin"
      
        const resultemail: boolean = expressionemail.test(all.email!);
        const resultphone: boolean = expressionphone.test(all.phonenumber!);
        console.log(all.empname);
        console.log(all.cmpid);
        // console.log(phone);
        // console.log(address);
        // // console.log(gender);
        // console.log(uname);
        // console.log(code);
        // console.log(name);
  
        if (resultemail==true && resultphone==true)
        {
          // User.cname=frm.value.name
          // User.cemail=frm.value.email
          // User.cphone=(frm.value.phone)
          // User.cusername=(frm.value.username);
          // User.cpassword=(frm.value.password)
          // alert("ok");
          this.dialogRef.close();
          let hello$ = this.ds.addadmindetails(all);
        hello$.subscribe(
            (data: any) => this.message(data),
            err => console.error(err)
        );
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
  
      else{
  
        alert("Please Fill Out Remaining Fields");
  
      }
  
  
  }

}
