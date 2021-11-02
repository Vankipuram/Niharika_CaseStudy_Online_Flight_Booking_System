import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { FlightBookRequest } from '../flight-book-request';
import { FlightsearchService } from '../flightsearch.service';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {

email!: string | null;
bookedticket = new FlightBookRequest();
ticket: FlightBookRequest[]=[];

  constructor(private searchservice:FlightsearchService,  private formBuilder: FormBuilder,private _router :Router ) { }

  ngOnInit(): void {
  }
  getUserTicket(){
    this.email=sessionStorage.getItem('email')  //getting the value from session storage object using getItem
    this.searchservice.searchUserDetails(this.email).subscribe(res=>{
      this.ticket=res;
    console.log("Booked Ticket");
    
    })
  }
  deleteTicket(){
    this.email=sessionStorage.getItem('email')
    this.searchservice.deleteUserDetails(this.email).subscribe(res=>{
      alert("Ticket Cancelled")
      let ref= document.getElementById('clear');
      ref?.click();

      
    })
  }

}
