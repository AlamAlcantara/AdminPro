import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from 'src/app/config/config';

@Injectable({
  providedIn: 'root'
})
export class HospitalService {

  constructor(public httpClient:HttpClient) { }

  cargarHospitales(){
    let url = `${URL_SERVICIOS}/hospitales`;

    return this.httpClient.get(url);  
  }

  obtenerHospital(id:string){
    let url = `${URL_SERVICIOS}/hospitales/${id}`;

    return this.httpClient.get(url);
  }
}
