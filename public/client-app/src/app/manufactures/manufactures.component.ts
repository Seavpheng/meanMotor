import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
 
import { Manufacture } from '../models/manufacture.model';
import { AuthenticationService } from '../services/authentication.service';
import { ManufactureService } from '../services/manufacture.service';

@Component({
  selector: 'app-manufactures',
  templateUrl: './manufactures.component.html',
  styleUrls: ['./manufactures.component.css']
})
export class ManufacturesComponent implements OnInit {

  get isLoggedIn () : boolean{
    return this._authService.isLoggedIn;
  }

  numPages : number = 0;
  currentPage:number =0;
  count : number =5;
  pre :number = 0;
  next :number = 0;
  search : string="";
  

  selectedManufacture : Manufacture = new Manufacture();

  manufactures! : Manufacture[];

  constructor(private manufactureService : ManufactureService, private router: Router, private _authService : AuthenticationService) { }
  
  ngOnInit(): void {
   this.getManufactureList();
  }

  getManufactureList(){
    this.manufactureService.getManufactures(this.currentPage, this.count, this.search).subscribe(data => {
      this.manufactures = data.message; 
      this.numPages = data.numPages; 
 
    });
  }

  getManufacture(manufactureId :string){
    this.router.navigateByUrl(`/manufacture/${manufactureId}`);
  }

  newManufacture(){
    this.router.navigateByUrl(`/manufacture/create`);
  }

  selectManufacture(manufacture : Manufacture) : void{ 
    this.selectedManufacture = manufacture; 
  } 
  
  setAddMotorBike(){
    this.getManufactureList();
  }


  deleteManufacture(manufactureId :string){
    this.manufactureService.delete(manufactureId).subscribe({
      next: ()=>{ },
      error : ()=>{},
      complete:()=>{
        this.getManufactureList();
      }
    });
  }

  onPrevious(){
    this.currentPage = this.currentPage - 1;
    this.getManufactureList();
  } 

  onNext(){
    this.currentPage = this.currentPage + 1;
    this.getManufactureList();
  }
  
  onSearch(){
    this.getManufactureList(); 
  }
}

