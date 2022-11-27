import { Injectable } from '@angular/core';
import { JwtHelperService} from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
 
  constructor(private _jwtService :JwtHelperService) { }
  
  get isLoggedIn (){   
    if(this.token){
      return true;
    }
    return false;
    //return this.token ? true : false;
  } 

  set token(token:string){
    localStorage.setItem(environment.token, token);
  }
  
  get token (){ 
    return localStorage.getItem(environment.token) || "" as string;
  } 

  get name() : string {
    if(this.token){
      
      return (this._jwtService.decodeToken(this.token)).username;
    }else{
      return "";
    }
  }
    


 
}
