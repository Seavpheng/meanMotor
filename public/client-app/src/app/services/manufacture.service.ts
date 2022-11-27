
import { HttpClient } from '@angular/common/http';
import  { Injectable } from '@angular/core';
import { Observable } from 'rxjs'; 
import { environment } from 'src/environments/environment';

import { Manufacture, ManufacturePagination } from '../models/manufacture.model'; 

@Injectable({
  providedIn: 'root'
})
export class ManufactureService {

  private baseUrl : string = environment.base_url + environment.manufactures;

  manufactures! : Manufacture[]; 
  manufacture! : Manufacture;
  
  constructor(private http : HttpClient) {}

  getManufactures(page : number, count: number, search :string) : Observable<ManufacturePagination>{  
    let url = `${this.baseUrl}`;
    
    url += environment.queryOffset + page + environment.queryCount +count;

    if(search !==""){
      url +=  environment.querySearch + search;
    }
    
     
    return this.http.get<ManufacturePagination>(url); 
  }

  get(manufactureId : string): Observable<Manufacture>{
    const url = this.baseUrl + manufactureId; 
    return this.http.get<Manufacture>(url); 
  }

  add(manufacture : Manufacture) :Observable<Manufacture>{
    const url = this.baseUrl;
    return this.http.post<Manufacture>(url, manufacture.toJSON());
  }

  update(manufacture: Manufacture):Observable<Manufacture>{ 
    const url =  this.baseUrl + manufacture._id;
    return this.http.put<Manufacture>(url, manufacture);
  }

  delete(manufactureId:string){
    const url =  this.baseUrl + manufactureId;
    return this.http.delete(url);
  }

}
