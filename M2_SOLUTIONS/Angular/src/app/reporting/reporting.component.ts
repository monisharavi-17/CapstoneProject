import { Component } from '@angular/core';
import Chart from 'chart.js/auto';
// import * as $ from 'jquery';
// import * as Highcharts from 'highcharts';
import { faSnowflake } from '@fortawesome/free-solid-svg-icons';
import { reporting } from '../users';
import { DataserviceService } from '../dataservice.service';
import { Router } from '@angular/router';
import { faBarsProgress } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-reporting',
  templateUrl: './reporting.component.html',
  styleUrls: ['./reporting.component.css']
})
export class ReportingComponent {
  progress=this.ds.progress;
  progress1="";
 
  
  logout()
  {

    alert("You have Successfully Loged out!");

    this.router.navigate(["/"]);

  }
  peru=this.ds.track.lrole;
  filepath=this.ds.track.path;
  constructor(private ds:DataserviceService,private router:Router){
    if (this.progress=="ceo")
    {
      this.progress1="Admin's Progress";
    }
    else if (this.progress=="admin"){
      this.progress1="Team's Progress";
    }
  }
  public chart: any;
  public chart1:any;
  labeldata: any[]=[];
  new:any[]=[];
  qualified:any[]=[];
  proposition:any[]=[];
  negotiation:any[]=[];
  won:any[]=[];
  adminicon=faBarsProgress;
  snow=faSnowflake;

  
  
  ngOnInit(): void {
    for (let i = 0; i <this.sales.length; i++)
    {
      console.log(this.sales[i]);
      this.labeldata.push(this.sales[i].team);
      this.new.push(this.sales[i].newones);
      this.qualified.push(this.sales[i].qualified);
      this.proposition.push(this.sales[i].preposition);
      this.negotiation.push(this.sales[i].negotiation);
      this.won.push(this.sales[i].won);
    }
    this.createChart("bar",this.labeldata,this.new,this.qualified,this.proposition,this.negotiation,this.won);
    this.createChart1("pie",this.labeldata,this.new,this.qualified,this.proposition,this.negotiation,this.won);
  }
  createChart(type1:any,labeldata:any,new1:any,qualified:any,proposition:any,negotiation:any,won:any){

    
  
    this.chart = new Chart("MyChart", {
      type: type1, //this denotes tha type of chart

      data: {// values on X-Axis
        labels: labeldata,
	       datasets: [
          {
            label: "new",
            data:new1,
            backgroundColor: 'pink'
          },
          {
            label: "qualified",
            data:qualified,
            backgroundColor: 'blue'
          },
          {
            label: "preposition",
            data:proposition,
            backgroundColor: 'green'
          },
          {
            label: "negotiation",
            data:negotiation,
            backgroundColor: 'black'
          },
          {
            label: "Won",
            data:won,
            backgroundColor: 'red'
          },
        ]
      },
      options: {
        aspectRatio:2.5
      }
      
    });
  }
  // ................................................................................
  createChart1(type1:any,labeldata:any,new1:any,qualified:any,proposition:any,negotiation:any,won:any){

    
  
    this.chart1 = new Chart("MyChart1", {
      type: type1, //this denotes tha type of chart

      data: {// values on X-Axis
        labels: labeldata,
	       datasets: [
          {
            label: "new",
            data:new1,
            backgroundColor: 'pink'
          },
          {
            label: "qualified",
            data:qualified,
            backgroundColor: 'blue'
          },
          {
            label: "preposition",
            data:proposition,
            backgroundColor: 'green'
          },
          {
            label: "negotiation",
            data:negotiation,
            backgroundColor: 'black'
          },
          {
            label: "Won",
            data:won,
            backgroundColor: 'red'
          },
        ]
      },
      options: {
        aspectRatio:2.5
      }
      
    });
  }
  sales:reporting[]=this.ds.track.reportlist!;
  //   {
  //     team:"A",
  //     new:5,
  //     qualified:2,
  //     preposition:3,
  //     negotiation:8,
  //     won:4
     
  // },
  //   {
  //     team:"B",
  //     new:4,
  //     qualified:7,
  //     preposition:10,
  //     negotiation:3,
  //     won:3
     
  // },
  //   {
  //     team:"C",
  //     new:7,
  //     qualified:9,
  //     preposition:1,
  //     negotiation:3,
  //     won:3
     
  // },
  //   {
  //     team:"D",
  //     new:10,
  //     qualified:1,
  //     preposition:1,
  //     negotiation:2,
  //     won:1
     
  // },
  //   {
  //     team:"E",
  //     new:3,
  //     qualified:7,
  //     preposition:4,
  //     negotiation:5,
  //     won:5
     
  // },
    
  
}