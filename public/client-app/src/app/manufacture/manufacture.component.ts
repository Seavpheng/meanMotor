import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Manufacture } from '../models/manufacture.model';
import { ManufactureService } from '../services/manufacture.service';

@Component({
  selector: 'app-manufacture',
  templateUrl: './manufacture.component.html',
  styleUrls: ['./manufacture.component.css']
})
export class ManufactureComponent implements OnInit {

  manufacture : Manufacture = new Manufacture();
  constructor(private route : ActivatedRoute, private router :Router,  private manufactureService: ManufactureService) { }

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

  deleteManufacture(manufactureId :string){
    this.manufactureService.delete(manufactureId).subscribe({
      next: ()=>{ },
      error : ()=>{},
      complete:()=>{
        this.router.navigate(['manufactures']);
      }
    });
  }

}
