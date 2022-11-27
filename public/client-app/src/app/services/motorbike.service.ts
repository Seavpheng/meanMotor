import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Manufacture } from '../models/manufacture.model';
import { Motorbike } from '../models/motorbike.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MotorbikeService { 
  motorbike! : Motorbike;
  constructor(private http : HttpClient) { }

  private baseUrl : string = environment.base_url + environment.manufactures;  
  private motorbikesPath : string = environment.motorbikes;

  getMotorbike(manufactureId :string, motorbikeId : string){
    const url = this.baseUrl + manufactureId + this.motorbikesPath + motorbikeId;
    return this.http.get(url);
  }

  add(manufactureId: string, motorbike : Motorbike): Observable<Manufacture> {
    const url = this.baseUrl + manufactureId + this.motorbikesPath;
    return this.http.post<Manufacture>(url, motorbike.toJSON());
  }

  update(manufactureId: string, motorbike :Motorbike): Observable<Manufacture> {
    const url = this.baseUrl +manufactureId + this.motorbikesPath + motorbike._id;
    return this.http.put<Manufacture>(url, motorbike);
  }

  delete(manufactureId: string, motorbikeId :string){
    const url = this.baseUrl + manufactureId + this.motorbikesPath + motorbikeId;
    return this.http.delete(url); 
  }
}
