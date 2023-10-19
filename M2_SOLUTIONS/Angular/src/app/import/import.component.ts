// import { Component } from '@angular/core';
// import { FormGroup,FormControl, FormBuilder, Validators } from '@angular/forms';
// import { DataserviceService } from '../dataservice.service';

// @Component({
//   selector: 'app-import',
//   templateUrl: './import.component.html',
//   styleUrls: ['./import.component.css']
// })
// export class ImportComponent {
//   reactiveForm:any= FormGroup;
  
//   constructor(private fb:FormBuilder,private dataservice:DataserviceService)
//   {
//     this.reactiveForm=this.fb.group({
//     firstName:new FormControl('')
//     })
//   }
//   shortLink: string = ""; 
//     loading: boolean = false;
//   public userfile:any;
//   onSelectFile(event:any)
//   {
//       const file=event.target.files[0];
//       console.log(file);
//       this.userfile=file;
//   }
//   saveForm()
//   {
//     this.loading = !this.loading; 
//     console.log(this.userfile); 
//     this.dataservice.upload(this.userfile).subscribe( 
//         (event: any) => { 
//             if (typeof (event) === 'object') { 

//                 // Short link via api response 
//                 this.shortLink = event.link; 

//                 this.loading = false; // Flag variable  
//             } 
//         } 
//     ); 
      
    
//   }

// }
