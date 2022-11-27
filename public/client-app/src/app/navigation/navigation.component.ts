import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router'
import { AuthenticationService } from '../services/authentication.service';
 


@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
 
  get isLoggedIn() :boolean{
    return this.authService.isLoggedIn;
  }

  get username () :string{
    return this.authService.name;
  }

  constructor(private router : Router, private authService : AuthenticationService) { }
  
  ngOnInit(): void {
     
  }

  onClickHome(){
    this.router.navigate(['']);
  }

  onClickManufacture(){
    this.router.navigate(['manufactures']);
  }

  onClickNewManufacture(){
    this.router.navigate(['manufacture/new']);
  } 

  onRegister(){
    this.router.navigate(['register']);
  } 

  onLogin(){
    this.router.navigate(['login']);
  }

  onLogout(){   
    console.log("On navigation" , this.isLoggedIn);
    localStorage.removeItem("token");
    this.router.navigateByUrl('/login');
  }
}
