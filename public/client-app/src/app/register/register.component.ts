import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../models/user.model';
import { AuthenticationService } from '../services/authentication.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  user: User = new User();
 
  hasSuccess : boolean = false; 
  successMessage : string ="";
  hasError : boolean = false; 
  errorMessage : string ="";
 
  constructor(private userService : UserService, private router : Router, private authService : AuthenticationService) { }
 
  ngOnInit(): void {
  } 

  onSubmit(registrationForm : NgForm){  
    this.userService.register(registrationForm.value).subscribe({
      next: (result)=> this._handleNext(result),
      error: (err)=> this._handleError(err),
      complete:()=> this._handleComplete()
    }); 
  }

  _handleNext(result :any){
    this.hasSuccess = true;
    this.successMessage = "Register successfully";
    this.authService.token = result.token; 
  }

  _handleError (err : any){  
    this.hasError = true;
    this.errorMessage = err.error.message;
  }
 
  _handleComplete(){
    setTimeout(() => {
      this.router.navigateByUrl("/"); 
     }, (3000));
  }

}
