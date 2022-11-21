import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router'
import { AuthenticationService } from '../services/authentication.service';
 


@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  constructor(private router : Router, private authService : AuthenticationService) { }

  isLoggedIn :boolean= this.authService.isLoggedIn;
  
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

}
