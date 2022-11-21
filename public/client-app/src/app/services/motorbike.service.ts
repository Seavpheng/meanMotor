import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Motorbike } from '../models/motorbike.model';

@Injectable({
  providedIn: 'root'
})
export class MotorbikeService { 
  motorbike! : Motorbike;
  constructor(private http : HttpClient) { }

  private baseUrl : string = "http://localhost:2222";

  getMotorbike(manufactureId :string, motorbikeId : string){
    const url = `${this.baseUrl}/manufactures/${manufactureId}/motorbikes/${motorbikeId}`;
    return this.http.get(url);
  }

  update(manufactureId: string, motorbike :Motorbike){
    const url = `${this.baseUrl}/manufactures/${manufactureId}/motorbikes/${motorbike._id}`;
    return this.http.post(url, motorbike);
  }

  delete(manufactureId: string, motorbikeId :string){
    const url = `${this.baseUrl}/manufactures/${manufactureId}/motorbikes/${motorbikeId}`;
    return this.http.delete(url); 
  }
}
