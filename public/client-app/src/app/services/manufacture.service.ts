
import { HttpClient } from '@angular/common/http';
import  { Injectable } from '@angular/core';
import { Observable } from 'rxjs'; 

import { Manufacture } from '../models/manufacture.model'; 

@Injectable({
  providedIn: 'root'
})
export class ManufactureService {

  private baseUrl : string = "http://localhost:2222";

  manufactures! : Manufacture[]; 
  manufacture! : Manufacture;
  
  constructor(private http : HttpClient) {}

  getManufactures() : Observable<Manufacture[]>{   
    const url = `${this.baseUrl}/manufactures?offset=0&count=5`;  
    return this.http.get(url) as Observable<Manufacture[]>; 
  }

  get(manufactureId : string): Observable<Manufacture>{
    const url = `${this.baseUrl}/manufactures/${manufactureId}`; 
    return this.http.get<Manufacture>(url); 
  }

  add(manufacture : Manufacture) :Observable<Manufacture>{
    const url = `${this.baseUrl}/manufactures`;
    return this.http.post(url, manufacture) as Observable<Manufacture>;
  }

  update(manufacture: Manufacture){
    const url = `${this.baseUrl}/manufactures/${manufacture._id}`;
    return this.http.put(url, manufacture);
  }

  delete(manufactureId:string){
    const url = `${this.baseUrl}/manufactures/${manufactureId}`;
    return this.http.delete(url);
  }

}
