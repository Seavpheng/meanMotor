import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Manufacture } from '../models/manufacture.model';
import { Motorbike } from '../models/motorbike.model';
import { ManufactureService } from '../services/manufacture.service';

@Component({
  selector: 'app-manufacture-editor',
  templateUrl: './manufacture-editor.component.html',
  styleUrls: ['./manufacture-editor.component.css']
})
export class ManufactureEditorComponent implements OnInit {
 
  manufacture : Manufacture = new Manufacture(); 
  isEdit : boolean = false;
  hasError : boolean = false;
  errorMessage : string = "";

  constructor(private formBuilder : FormBuilder, private router : Router, private _activatedRoute : ActivatedRoute, private manufactureService :ManufactureService ) { }

  ngOnInit(): void { 
    this.getManufacture(); 
  }  

  @Input()
  set selectedManufacture(manufacture : Manufacture){
    this.isEdit = true; 
    this.fillFormValue(manufacture);
  }

  @Output() addEvent = new EventEmitter<Manufacture>();
  
  getManufacture(){
    const manufactureId = this._activatedRoute.snapshot.params["manufactureId"];  
    if(manufactureId !== undefined){
      this.isEdit = true;
      this.manufactureService.get(manufactureId).subscribe({
        next : manufacture =>{ 
          this.manufacture._id = manufacture._id;
          this.manufacture.name = manufacture.name;
          this.manufacture.shortDescription = manufacture.shortDescription;
          this.manufacture.establishedYear = manufacture.establishedYear;
         
          this.fillFormValue(manufacture); 
        }
      });
    }else{
      this.isEdit = false;
    }
  }

  frmManufacture = this.formBuilder.group({
    _id :new FormControl(this.manufacture._id),
    name : new FormControl(this.manufacture.name),
    shortDescription : new FormControl(this.manufacture.shortDescription),
    establishedYear : new FormControl(this.manufacture.establishedYear),
    motorbikes : new FormControl() 
  });
 

  fillFormValue(manufacture : Manufacture): void{ 
    this.frmManufacture.controls._id.setValue(manufacture._id);  
    this.frmManufacture.controls.name.setValue(manufacture.name);
    this.frmManufacture.controls.shortDescription.setValue(manufacture.shortDescription);
    this.frmManufacture.controls.establishedYear.setValue(manufacture.establishedYear);
  }
      

  onSubmit(){   
    if(this.isEdit === false){  
      this.addManufacture(); 
    }else{  
      this.updateManufacture();
    } 
  } 

  onReset(){
    this.hasError = false;
    this.isEdit = false;
    this.frmManufacture.reset();
  }

  updateManufacture() : void{ 
    this.manufacture.bindFormGroup(this.frmManufacture); 
    this.manufactureService.update(this.manufacture).subscribe({
      next : (result)=> this._handleNext(result),
      error : (err) => this._handleError(err),
      complete: ()=> this._handleComplete()
    }); 
  }

  addManufacture() : void{  
    
    this.manufacture.bindFormGroup(this.frmManufacture); 
    this.manufactureService.add(this.manufacture).subscribe({
      next : (result)=> this._handleNext(result),
      error : (err) => this._handleError(err),
      complete: ()=> this._handleComplete()
    }); 
  }

  _handleNext(result : any){
    this.addEvent.emit(result);
  }
 
  _handleError(err: any){
    this.errorMessage = err.error;
  }

  _handleComplete(){
    this.onReset();
  }



 
}
