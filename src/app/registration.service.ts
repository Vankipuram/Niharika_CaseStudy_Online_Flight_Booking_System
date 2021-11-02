import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  constructor(private _http :HttpClient) { }

 //Here i am call rest api from java using httpclient
  public loginuserFromRemote(user :User):Observable<any>{  // Here httpclient is using observable to handle asynchronous service and responce
return this._http.post<any>("http://localhost:8003/login",user)
  }
  public registerUserFromRemote(user :User):Observable<any>{
    return this._http.post<any>("http://localhost:8003/register",user)
  }
}
