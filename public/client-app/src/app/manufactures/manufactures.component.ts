import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
 
import { Manufacture } from '../models/manufacture.model';
import { ManufactureService } from '../services/manufacture.service';

@Component({
  selector: 'app-manufactures',
  templateUrl: './manufactures.component.html',
  styleUrls: ['./manufactures.component.css']
})
export class ManufacturesComponent implements OnInit {

   constructor(private manufactureService : ManufactureService, private router: Router) { }
 
  manufactures! : Manufacture[] ;
  ngOnInit(): void {
    this.manufactureService.getManufactures().subscribe(data => {
      this.manufactures = data; 
    });
  }

  getManufacture(manufactureId :string){
    this.router.navigateByUrl(`/manufacture/${manufactureId}`);
  }

  newManufacture(){
    this.router.navigateByUrl(`/manufacture-create`);
  }

}
