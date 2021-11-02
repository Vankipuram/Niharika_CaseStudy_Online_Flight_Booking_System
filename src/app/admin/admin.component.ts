import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from '../admin.service';
import { search } from '../search';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(private _adminservice: AdminService, private formBuilder: FormBuilder,private _router :Router) { }

  formvalue!: FormGroup
  flights: search[] = []; //6 step
  flew:search=new search();
  showAdd!:boolean;
  showbtn!:boolean;

  ngOnInit(): void {
    this.formvalue = this.formBuilder.group({ //1 step
      flightId: [''],
      flightName: [''],
      flightFrom: [''],
      flightTo: [''],
      date: [''],
      fare: ['']
    })
   this.getallflights();
  }
  clickAdd(){
    this.formvalue.reset();
    this.showAdd=true;
    this.showbtn=false;
  }
  addflights(){ //2 step
   
    this.flew.flightId=this.formvalue.value.flightId;
    this.flew.flightName=this.formvalue.value.flightName;
    this.flew.flightFrom=this.formvalue.value.flightFrom;
    this.flew.flightTo=this.formvalue.value.flightTo;
    this.flew.date=this.formvalue.value.date;
    this.flew.fare=this.formvalue.value.fare;

    this._adminservice.addflight(this.flew).subscribe(res=>{ //3 step
      console.log(res);
      alert("Flight Added Successfully");
      //clear fill form data
      let ref= document.getElementById('clear');
      ref?.click();

      this.formvalue.reset();
      this.getallflights();
    },
    err=>{
      alert("Flight Added Successfully")
    }
    )
    
  }
  getallflights(){
    this._adminservice.getallflight().subscribe(res => {
      this.flights = res; // step 5
    });
  }
  deleteflight(flightId:any){
    this._adminservice.deleteflight(flightId).subscribe(res =>{
      
      alert("Flight deleted successfully");
      
      this.getallflights();
    })
   
  }
  onEditflight(flight:any){
    this.showAdd=false;
    this.showbtn=true;
    this.formvalue.controls['flightId'].setValue(flight.flightId);
    this.formvalue.controls['flightName'].setValue(flight.flightName);
    this.formvalue.controls['flightFrom'].setValue(flight.flightFrom);
    this.formvalue.controls['flightTo'].setValue(flight.flightTo);
    this.formvalue.controls['date'].setValue(flight.date);
    this.formvalue.controls['fare'].setValue(flight.fare);
  }
  updateflights(){

    this.flew.flightId=this.formvalue.value.flightId;
    this.flew.flightName=this.formvalue.value.flightName;
    this.flew.flightFrom=this.formvalue.value.flightFrom;
    this.flew.flightTo=this.formvalue.value.flightTo;
    this.flew.date=this.formvalue.value.date;
    this.flew.fare=this.formvalue.value.fare;

    this._adminservice.updateflight(this.flew.flightId,this.flew,).subscribe(res=>
      {
        alert("Flight updated successfully");
        let ref= document.getElementById('clear');
      ref?.click();

      this.formvalue.reset();
      this.getallflights();
      })

  }

}
