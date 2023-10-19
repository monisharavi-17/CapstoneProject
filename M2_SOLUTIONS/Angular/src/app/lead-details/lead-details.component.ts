import { Component } from '@angular/core';
import { DataserviceService } from '../dataservice.service';
import { userleads } from '../users';
import { log } from '../alluser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lead-details',
  templateUrl: './lead-details.component.html',
  styleUrls: ['./lead-details.component.css']
})
export class LeadDetailsComponent {
  uses:userleads|undefined
  ifs:boolean=true;
  filepath=this.ds.track.path;

  logout()

  {

    alert("You have Successfully Loged out!");

    this.router.navigate(["/"]);

  }
  constructor(private ds:DataserviceService,private router:Router){
    console.log(this.ds.track)
    this.uses=ds.track.useleads
    this.uses!.salesperson=this.ds.track.lname
    this.mess1()
    console.log(this.ds.track);

    const lrole=this.ds.track.lrole ;

    console.log("hii"+lrole);

    if (lrole=="Admin" || lrole=="ceo")

    {

      this.ifs=false;

    }
    let hello$ = this.ds.getlog(this.ds.track);
        hello$.subscribe(
            // (data: any) => (this.k=data.result)?alert("Sign Up Successfull"):alert(data.mess),
            (data: any) => this.message1(data),
            err => console.error(err)
        );
        console.log(this.Logdetails)
  }
  mess1(){
    this.uses=this.ds.track.useleads
    console.log(this.uses?.lcmpname)
  }
  sites:any = [
    "https://meet.google.com/mnd-tpqm-gbb",
    "https://meet.google.com/dht-wjsn-eur",
    "https://meet.google.com/rie-wieu-wmz",
    "https://meet.google.com/eus-abrm-qoe",
    "https://meet.google.com/fgj-eiro-eur",
    "https://meet.google.com/mkf-wirp-cbg",
    "https://meet.google.com/zxd-mhsi-tut",
    "https://meet.google.com/pro-irut-cmg",
    "https://meet.google.com/shf-ruei-rit",
    "https://meet.google.com/asd-dfgh-hjk",
    "https://meet.google.com/cxv-erty-dcb",
    "https://meet.google.com/vbn-efgs-eur",
    "https://meet.google.com/mvn-lfkg-wur",
    "https://meet.google.com/wer-dvgd-jgk",
    "https://meet.google.com/edf-vbtf-kdl",
    "https://meet.google.com/nxh-nvbd-eit",
    "https://meet.google.com/mcj-jflf-enx",
    "https://meet.google.com/sri-mrgs-mon",
    "https://meet.google.com/nvm-wirj-wnx",
    "https://meet.google.com/fgh-fuss-lkj",
  
];
randomSite(p:any) {
  console.log("inside")
  
  const i: number = Math.floor(Math.random()*(this.sites.length - 0 + 1) + 0);
 console.log(this.sites.length)
  console.log(this.sites[i]);
  this.ds.track.meetlink=this.sites[i]
  this.ds.track.timing=p
  let hello$ = this.ds.schedulemeet(this.ds.track);
        hello$.subscribe(
            // (data: any) => (this.k=data.result)?alert("Sign Up Successfull"):alert(data.mess),
            (data: any) => this.message1(data),
            err => console.error(err)
        );
  
}
  
  
  
  Logdetails:any[]=[]
  message1(data:any){
    console.log(data)
    for(let index in data){
      if(data[index].leadid==this.ds.track.useleads?.leadid){
        this.Logdetails.push(data[index])
      }
    }
  }
  datetime:any

  prompt1:any="";
  updatelogs()
  {
      this.datetime=new Date();
  }
  schedule(){
    const p=prompt("Enter the timing");
    this.randomSite(p);
  }
  
  

 

 


  type:boolean=false;

  // prompt1:any="";


 

  // updatelog()

  // {

  //     this.datetime=new Date();

  // }

  getinputlog()

  {
    const p=prompt("Enter Log Details");
    const l = new log();
    l.salesman=this.ds.track.lname;
    l.timestamp=new Date();
    l.log=p;
    l.teamid=this.ds.track.lteamid
    l.teamname=this.ds.track.lteam
    l.message=l.log
    l.type=false
    l.leadid=this.ds.track.useleads!.leadid
    this.Logdetails.splice(0,0,l);
    let hello$ = this.ds.updatelog(l);
        hello$.subscribe(
            // (data: any) => (this.k=data.result)?alert("Sign Up Successfull"):alert(data.mess),
            (data: any) => this.message(data),
            err => console.error(err)
        );
    
  }

  newlog()

  {
    const p =prompt("More details required for changing to new:");
    const l = new log();
    l.salesman=this.ds.track.lname;
    l.stagebefore=this.ds.track.useleads!.stage;
    this.ds.track.useleads!.stage="New"
    l.stageafter="New";
    l.timestamp=new Date;
    l.log=p;
    l.teamid=this.ds.track.lteamid
    l.teamname=this.ds.track.lteam
    l.message=l.log
    l.type=true
    l.leadid=this.ds.track.useleads!.leadid
    this.Logdetails.splice(0,0,l);
    let hello$ = this.ds.updatelog(l);
        hello$.subscribe(
            // (data: any) => (this.k=data.result)?alert("Sign Up Successfull"):alert(data.mess),
            (data: any) => this.message(data),
            err => console.error(err)
        );

  }

  qualifiedlog()

  {

    const p =prompt("More details required for changing to qualified:");

    const l = new log();

    l.salesman=this.ds.track.lname;
    l.stagebefore=this.ds.track.useleads!.stage;
    this.ds.track.useleads!.stage="Qualified"
    l.stageafter=this.ds.track.useleads!.stage;
    l.timestamp=new Date;
    l.timestamp=new Date;
    l.log=p;
    l.type=true
    l.teamid=this.ds.track.lteamid
    l.teamname=this.ds.track.lteam
    l.message=l.log
    l.leadid=this.ds.track.useleads!.leadid
    this.Logdetails.splice(0,0,l);
    console.log(l)
    let hello$ = this.ds.updatelog(l);
        hello$.subscribe(
            // (data: any) => (this.k=data.result)?alert("Sign Up Successfull"):alert(data.mess),
            (data: any) => this.message(data),
            err => console.error(err)
        );

    // this.type=false;

  }
message(data:any){
  let hello$ = this.ds.updatestage(this.ds.track);
        hello$.subscribe(
            // (data: any) => (this.k=data.result)?alert("Sign Up Successfull"):alert(data.mess),
            (data: any) => console.log(data),
            err => console.error(err)
        );
}
  prepositionlog()

  {

    const p =prompt("More details required for changing to preposition:");

    const l = new log();

    l.salesman=this.ds.track.lname;
    l.stagebefore=this.ds.track.useleads!.stage;
    this.ds.track.useleads!.stage="Preposition"
    l.stageafter=this.ds.track.useleads!.stage;
    l.timestamp=new Date;
    l.teamid=this.ds.track.lteamid
    l.teamname=this.ds.track.lteam
    l.message=l.log
    l.log=p;
    l.type=true
    l.leadid=this.ds.track.useleads!.leadid
    this.Logdetails.splice(0,0,l);
    let hello$ = this.ds.updatelog(l);
        hello$.subscribe(
            // (data: any) => (this.k=data.result)?alert("Sign Up Successfull"):alert(data.mess),
            (data: any) => this.message(data),
            err => console.error(err)
        );
    // this.type=false;

  }

  negotiationlog()

  {

    const p =prompt("More details required for changing to negetiation:");

    const l = new log();

    l.salesman=this.ds.track.lname;
    l.stagebefore=this.ds.track.useleads!.stage;
    this.ds.track.useleads!.stage="Negotiation"
    l.stageafter=this.ds.track.useleads!.stage;
    l.timestamp=new Date;
    l.log=p;
    l.type=true
    l.teamid=this.ds.track.lteamid
    l.teamname=this.ds.track.lteam
    l.message=l.log
    l.leadid=this.ds.track.useleads!.leadid
    this.Logdetails.splice(0,0,l);
    let hello$ = this.ds.updatelog(l);
        hello$.subscribe(
            // (data: any) => (this.k=data.result)?alert("Sign Up Successfull"):alert(data.mess),
            (data: any) => this.message(data),
            err => console.error(err)
        );
    // this.type=false;

  }

  wonlog()

  {

    const p =prompt("More details required for changing to Won:");

    const l = new log();

    l.salesman=this.ds.track.lname;
    l.stagebefore=this.ds.track.useleads!.stage;
    this.ds.track.useleads!.stage="Won"
    l.stageafter=this.ds.track.useleads!.stage;
    l.timestamp=new Date;
    l.teamid=this.ds.track.lteamid
    l.teamname=this.ds.track.lteam
    l.message=l.log
    l.log=p;
    l.type=true
    this.Logdetails.splice(0,0,l);
    l.leadid=this.ds.track.useleads!.leadid
    // this.type=false;
    let hello$ = this.ds.updatelog(l);
        hello$.subscribe(
            // (data: any) => (this.k=data.result)?alert("Sign Up Successfull"):alert(data.mess),
            (data: any) => this.message(data),
            err => console.error(err)
        );
  }

 


}


function random(arg0: number, arg1: number): number {
  throw new Error('Function not implemented.');
}

