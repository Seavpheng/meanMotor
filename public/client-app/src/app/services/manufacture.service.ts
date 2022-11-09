
import { HttpClient } from '@angular/common/http';
import  { Injectable } from '@angular/core';
import { Observable } from 'rxjs'; 

import { Manufacture } from '../models/manufacture'; 


@Injectable({
  providedIn: 'root'
})
export class ManufactureService {

  private baseUrl : string = "http://localhost:2222";

  manufacture : Manufacture[] = [];
  
  constructor(private http : HttpClient) {}

  getManufactures() : Observable<Manufacture[]>{  
    //const url : string = this.baseUrl+"/manufactures?offset=0&count=5"; 
    const url = `${this.baseUrl}/manufactures?offset=0&count=5`; 
    console.log(url); 
    return this.http.get(url) as Observable<Manufacture[]>; 
  }

}
