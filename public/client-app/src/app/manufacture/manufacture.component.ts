import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Manufacture } from '../models/manufacture.model';
import { Motorbike } from '../models/motorbike.model';
import { AuthenticationService } from '../services/authentication.service';
import { ManufactureService } from '../services/manufacture.service';
import { MotorbikeService } from '../services/motorbike.service';

@Component({
  selector: 'app-manufacture',
  templateUrl: './manufacture.component.html',
  styleUrls: ['./manufacture.component.css']
})
export class ManufactureComponent implements OnInit {

  manufacture : Manufacture = new Manufacture();

  selectedMotorbike : Motorbike = new Motorbike();

  get isLoggedIn(): boolean {
    return this._authService.isLoggedIn;
  }

  constructor(private route : ActivatedRoute, private router :Router,  private manufactureService: ManufactureService, private motorbikeService : MotorbikeService, private _authService : AuthenticationService) { }

  ngOnInit(): void {
    this.getManufacture();
  }
 
  getManufacture(){
    const manufactureId = this.route.snapshot.params["manufactureId"];
    this.manufactureService.get(manufactureId).subscribe({
      next: (result)=>{
        this.manufacture = result;
        console.log(result);
      } 
    });  
  }

  editManufacture(manufactureId :string){
    this.router.navigateByUrl(`manufacture/edit/${manufactureId}`);
  }
 

  deleteMotorbike(manufactureId :string, motorbikeId : string){
    this.motorbikeService.delete(manufactureId, motorbikeId).subscribe({
      next : result =>{
        
      },
      error: err=>{},
      complete: ()=>{
        this.getManufacture();
      } 
    })
  }

  setAddMotorBike($event: Manufacture){
    this.manufacture = $event;
  } 

  selectMotorbike(motorbike : Motorbike){  
    console.log(motorbike);
    this.selectedMotorbike = motorbike;
  }

}
