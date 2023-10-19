import { Component } from '@angular/core';
import { DataserviceService } from '../dataservice.service';
import { alluser } from '../alluser';
import { faLock, faSnowflake, faUser } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.css']
})
export class UserprofileComponent {
  filepath:string=""
  exporticon=faLock;
  myhome=faUser;
  snow=faSnowflake;
  peru=this.ds.track.lrole;
  logout()

  {

    alert("You have Successfully Loged out!");

    this.router.navigate(["/"]);

  }
  constructor(private ds:DataserviceService,private router:Router){
    console.log(this.ds.track)
    this.filepath=this.ds.track.path!
    
  // let image = document.getElementById("event-1");
  // image!.src=this.filepath

    console.log(this.filepath)
    let hello$ = this.ds.gettheuser(this.ds.track);
        hello$.subscribe(
            
            (data: any) => this.message(data),
            err => console.error(err)
        );
    console.log(ds.track)
  }

  // anotherimg()
  // {
  //   document.getElementById('immg')!.src="https://icons.iconarchive.com/icons/iconoir-team/iconoir/128/profile-circle-icon.png";
  // }
  name:any="";
  email:any="";
  phone:any="";
  company:any="";
  role:any="";
  password:any="";
  username:any="";
  name1:any="";
  email1:any="";
  phone1:any="";
  company1:any="";
  role1:any="";
  password1:any="";
  username1:any="";
  employeeid:number|undefined
  message(data:any)
  {
   
    console.log(data)
     this.name=data.empname;
     this.email=data.email;
     this.phone=data.phonenumber;
     this.role=data.emprole;
     this.password=data.password;
     this.username=data.username;
    this.employeeid=data.empid
     this.name1=data.empname;
     this.email1=data.email;
     this.phone1=data.phonenumber;
     this.role1=data.emprole;
     this.password1=data.password;
     this.username1=data.username;

    
     
  }
  updateForm(frm:any)
  {
    console.log("hi");
    const user1= new alluser();
    if (frm.value.name==this.name1 && frm.value.phone==this.phone1)
    {
      console.log(frm.value.name);
      console.log(this.name);
      alert("No fields Changed");
    }
    else{
      user1.empname=frm.value.name;
      user1.phonenumber=frm.value.phone;
      user1.emprole=frm.value.role;
      user1.email=frm.value.email;
      user1.password=frm.value.password;
      user1.username=frm.value.username;
      user1.empid=this.employeeid
      let hello$ = this.ds.updateuser(user1);
        hello$.subscribe(
            
            (data: any) => this.message(data),
            err => console.error(err)
        );
      console.log(user1);
      alert("Profile Updated!")
    }
  }
  userfile:any="";
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
    
}
  message1(data:any){
    this.ds.track.path=data.path
    this.ds.photos(this.ds.track).subscribe((response)=>
    {
      console.log(response);
    });
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
  
      this.router.navigate(['userprofile']);
  }
    );
  }

}
