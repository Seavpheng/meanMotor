import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Manufacture } from '../models/manufacture.model';
import { Motorbike } from '../models/motorbike.model';
import { ManufactureService } from '../services/manufacture.service';

@Component({
  selector: 'app-manufacture-editor',
  templateUrl: './manufacture-editor.component.html',
  styleUrls: ['./manufacture-editor.component.css']
})
export class ManufactureEditorComponent implements OnInit {

  //frmManufacture! :FormGroup;
    
 

  constructor(private formBuilder : FormBuilder, private manufactureService :ManufactureService, private router : Router) { }
  
  
   frmManufacture = this.formBuilder.group({
    _id :new FormControl(),
    name : new FormControl(),
    establishedYear : new FormControl(),
    motorbikes : new FormControl() 
  });
 

  ngOnInit(): void {
    
  }

   

  onSubmit(frmManufacture : FormGroup){  
    this.manufactureService.add(frmManufacture.value).subscribe({
      next : (result)=>{
        this.router.navigateByUrl("/manufactures");
      },
      error : ()=>{},
      complete: ()=>{} 
    });
    
  }

}
