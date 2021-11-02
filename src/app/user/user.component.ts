import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { FlightBookRequest } from '../flight-book-request';
import { FlightsearchService } from '../flightsearch.service';
import { search } from '../search';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
formvalue!: FormGroup
form!: FormGroup
flights: search[] = [];
search= new search();
flightbook = new FlightBookRequest();

  constructor(private searchservice:FlightsearchService,  private formBuilder: FormBuilder,private _router :Router) { }

  ngOnInit(): void {
    this.formvalue = this.formBuilder.group({
      flightFrom: [''],
      flightTo: [''],
      date: ['']
    })
    this.form = this.formBuilder.group({
      email: [''],
      firstname: [''],
      lastname: [''],
      gender: [''],
      age: [''],
      flightId: [''],
      flightName: [''],
      flightFrom: [''],
      flightTo: [''],
      date: [''],
      fare: [''],
      flightsheet: ['']

    })
  }

  searchflight(){

    this.search.flightFrom=this.formvalue.value.flightFrom;
    this.search.flightTo=this.formvalue.value.flightTo;
    this.search.date=this.formvalue.value.date;
   this.searchservice.searchFlightFromRemote(this.search.flightFrom,this.search.flightTo,this.search.date).subscribe(res=>{
     this.flights=res;
     alert("Flight available")
   },
   err=>{
     alert("Flight Not Available")
    }
   )
    
  }
  onEditflight(flight:any){
    
    this.form.controls['flightId'].setValue(flight.flightId);
    this.form.controls['flightName'].setValue(flight.flightName);
    this.form.controls['flightFrom'].setValue(flight.flightFrom);
    this.form.controls['flightTo'].setValue(flight.flightTo);
    this.form.controls['date'].setValue(flight.date);
    this.form.controls['fare'].setValue(flight.fare);
  }
  bookflight(){
      this.flightbook.email=this.form.value.email;
      this.flightbook.flightId=this.form.value.flightId;
      this.flightbook.flightName=this.form.value.flightName;
      this.flightbook.flightFrom=this.form.value.flightFrom;
      this.flightbook.flightTo=this.form.value.flightTo;
      this.flightbook.date=this.form.value.date;
      this.flightbook.fare=this.form.value.fare;
      this.flightbook.firstname=this.form.value.firstname;
      this.flightbook.lastname=this.form.value.lastname;
      this.flightbook.gender=this.form.value.gender;
      this.flightbook.age=this.form.value.age;
      this.flightbook.flightsheet=this.form.value.flightsheet;
      sessionStorage.setItem('email',this.flightbook.email);
      this.searchservice.saveUserDetails(this.flightbook).subscribe(res=>{
      alert("Flight Booked Successfully");
      this._router.navigate(['/booking'])
      window.location.reload();
      })
  }
  

}
