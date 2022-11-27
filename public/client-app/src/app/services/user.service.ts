import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs'; 
import { environment } from 'src/environments/environment';
import { LoginToken, User, UserLogin } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService { 

  private baseUrl = `${environment.base_url}${environment.user}`; 

  constructor(private http : HttpClient) { }
 
  public register(user: User) : Observable<LoginToken>{ 
    const url =  this.baseUrl + environment.register;
    return this.http.post<LoginToken>(url, user);
  }

  public login(user: UserLogin) : Observable<LoginToken> { 
    const url = this.baseUrl + environment.login;
    return this.http.post<LoginToken>(url, user) ;
  }
}
