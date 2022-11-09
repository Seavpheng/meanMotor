import { Component, OnInit } from '@angular/core';
import { Manufacture } from '../models/manufacture';
import { ManufactureService } from '../services/manufacture.service';

@Component({
  selector: 'app-manufactures',
  templateUrl: './manufactures.component.html',
  styleUrls: ['./manufactures.component.css']
})
export class ManufacturesComponent implements OnInit {

   constructor(private manufactureService : ManufactureService) { }
 
  manufactures! : Manufacture[] ;
  ngOnInit(): void {
    this.manufactureService.getManufactures().subscribe(data => {
      this.manufactures = data;

      console.log(data);
    });
  }

}
