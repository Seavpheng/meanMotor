import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../models/user.model';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  user: User = new User();

  //page decorator
  hasSuccess : boolean = false; 
  successMessage : string ="";
  hasError : boolean = false; 
  errorMessage : string ="";
 
  constructor(private userService : UserService, private router : Router) { }
 
  ngOnInit(): void {
  }


  onSubmit(registrationForm : NgForm){  
    this.userService.register(registrationForm.value).subscribe({
      next: (result)=>{
         this.hasSuccess = true;
         this.successMessage = "Register successfully";
         setTimeout(() => {
          this.router.navigateByUrl("/");
          
         }, (3000));

      },
      error: ()=>{},
      complete:()=>{}
    });
   
  }

}
