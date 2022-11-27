import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
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
  isLoggedIn : boolean= this.authService.isLoggedIn;
  userLogin: UserLogin = new UserLogin(); 
  user! : User;

  constructor(private router : Router, private userService :UserService, private authService : AuthenticationService) { }

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLoggedIn;
  }

  login(frmLogin: NgForm){  
    this.userLogin.fillFromNgForm(frmLogin);
    this.userService.login(this.userLogin).subscribe({
      next : (result )=>{ 
        this.authService.token = result.token; 
        this.isLoggedIn = this.authService.isLoggedIn;
        console.log(this.isLoggedIn);

        this.router.navigate(['/']);
      }, 
      error : (error)=>{
        console.log(error);
      },
      complete:()=>{
        this.ngOnInit();
      }
    })
  }

  removeToken(){
    localStorage.removeItem("token");
    this.router.navigate(['login']); 
  } 
  
  logout(){
    this.isLoggedIn = this.authService.isLoggedIn
    this.name ="";
    this.user.reset();
  }

  
}
