import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RegistrationService } from '../registration.service';
import { User } from '../user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user = new User();
  msg =''
  invalidLogin: boolean = false;
  constructor(private _service :RegistrationService, private _router :Router) { }

  ngOnInit(): void {
  }

  loginUser(){
    if(this._service.loginuserFromRemote(this.user)){
    this._service.loginuserFromRemote(this.user).subscribe(
      (data:User)=>{
        alert("signed in successfully");
        this.user=data;
        this.redirect();
        
      },
      err=>{alert("Enter valid Email and Password")}
      )
  }
  else
  {
    console.log("Invalid Login Credentials");
    this.msg="Enter valid email and password";
  }
}

  redirect(){
      
    if(this.user.useremail=="Admin@gmail.com" && this.user.password==123456789){
     sessionStorage.setItem('role','admin');
     sessionStorage.setItem('useremail',String(this.user.useremail));
     this.invalidLogin=false;
     this._router.navigate(['/admin']).then(()=>{
       window.location.reload();
     })
   }
   else{
     
    sessionStorage.setItem('role','customer');
    sessionStorage.setItem('useremail',String(this.user.useremail));
    this.invalidLogin=false;
    this._router.navigate(["/user"]).then(()=>{
      window.location.reload();
    });
  }

  }

}
