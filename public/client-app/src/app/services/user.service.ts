import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs'; 
import { LoginToken, User, UserLogin } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = "http://localhost:2222/users"; 
  constructor(private http : HttpClient) { }
 
  public register(user: User){ 
    const url = `${this.baseUrl}/register`;
    return this.http.post(url, user);
  }

  public login(user: UserLogin) : Observable<LoginToken> { 
    const url = this.baseUrl + "/login";
    return this.http.post<LoginToken>(url, user) ;
  }
}
