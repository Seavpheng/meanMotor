 
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Manufacture } from '../models/manufacture.model';
import { Motorbike } from '../models/motorbike.model';
import { MotorbikeService } from '../services/motorbike.service';

@Component({
  selector: 'app-motorbike-editor',
  templateUrl: './motorbike-editor.component.html',
  styleUrls: ['./motorbike-editor.component.css']
})
export class MotorbikeEditorComponent implements OnInit {

  hasError: boolean = false;
  errorMessage: string = "";
  isEdit: boolean = false;
  motorbike: Motorbike = new Motorbike();

  constructor(private fb: FormBuilder, private motorbikeService: MotorbikeService) { }

  @Input()
  manufacture: Manufacture = new Manufacture();

  @Input()
  set selectedMotorbike(motorbike: Motorbike) {  
    if(motorbike._id !==undefined){ 
      this.isEdit = true; 
      this.fillFromValue(motorbike);
    } 
  }

  @Output() addEvent = new EventEmitter<Manufacture>();

  ngOnInit(): void { }

  frmMotorbike = this.fb.group({
    _id: new FormControl(),
    modelName: new FormControl(),
    year: new FormControl(),
    horsePower: new FormControl()
  });

  fillFromValue(motorbike: Motorbike) {
    this.frmMotorbike.controls._id.setValue(motorbike._id);
    this.frmMotorbike.controls.modelName.setValue(motorbike.modelName);
    this.frmMotorbike.controls.year.setValue(motorbike.year);
    this.frmMotorbike.controls.horsePower.setValue(motorbike.horsePower);
  } 

  onSubmit(frmMotorbike: FormGroup) {
    if (this.isEdit === false) {
      this.addMotorbike(frmMotorbike);
    } else {
      this.updateMotorbike(frmMotorbike);
    }
  }

  addMotorbike(frmMotorbike: FormGroup) {
    this.motorbike.bindFormGroup(frmMotorbike);
    this.motorbikeService.add(this.manufacture._id, this.motorbike).subscribe({
      next: (result) => this._handleNext(result),
      error: (err) => this._handleError(err),
      complete: () => this._handleComplete()
    });
  }

  updateMotorbike(frmMotorbike: FormGroup) {
    this.motorbike.bindFormGroup(frmMotorbike);
    this.motorbikeService.update(this.manufacture._id, this.motorbike).subscribe({
      next: (result) => this._handleNext(result),
      error: (err) => this._handleError(err),
      complete: () => this._handleComplete()
    });
  }

  _handleNext(result: any) {
    this.hasError = false;
    this.errorMessage = '';
    this.addEvent.emit(result);
  }

  _handleError(err: any) {
    this.hasError = true;
    this.errorMessage = err.error;
  }

  _handleComplete() {
    this.motorbike.reset();
    this.onReset();
  }

  onReset() {
    this.hasError = false;
    this.isEdit = false;
    this.frmMotorbike.reset();
  }
}
