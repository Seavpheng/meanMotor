import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User, UserLogin } from '../models/user.model';
import { AuthenticationService } from '../services/authentication.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  name! :string ;
  isLoggedIn : boolean= false;
  userLogin: UserLogin = new UserLogin(); 
  user! : User;
  constructor(private userService :UserService, private authService : AuthenticationService) { }

  ngOnInit(): void {
     
  }

  login(frmLogin: NgForm){ 
    
    this.userLogin.fillFromNgForm(frmLogin);
    this.userService.login(this.userLogin).subscribe({
      next : (result )=>{
        this.isLoggedIn = true;
        this.authService.token = this.authService.token; 
        console.log("result htis");
      }, 
      error : (error)=>{
        console.log(error);
      }
    })
  }

  logout(){
    this.isLoggedIn= false; 
    this.name ="";
    this.user.reset();
  }

  
}
