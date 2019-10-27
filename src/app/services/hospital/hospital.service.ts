import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from 'src/app/config/config';
import { UsuarioService } from '../usuario/usuario.service';
import Hospital from 'src/app/models/hospital.model';

@Injectable({
  providedIn: 'root'
})
export class HospitalService {

  constructor(public httpClient:HttpClient, public usuarioService:UsuarioService) { }

  cargarHospitales(desde:number = 0){
    let url = `${URL_SERVICIOS}/hospitales?desde=${desde}`;

    return this.httpClient.get(url);  
  }

  obtenerHospital(id:string){
    let url = `${URL_SERVICIOS}/hospitales/${id}`;

    return this.httpClient.get(url);
  }

  crearHospital(nombre:string){
    let token = this.usuarioService.token;
    let url = `${URL_SERVICIOS}/hospitales?token=${token}`;

    return this.httpClient.post(url,{nombre:nombre});
  }

  borrarHosital(id:string){
    let token = this.usuarioService.token;
    let url = `${URL_SERVICIOS}/hospitales/${id}?token=${token}`;

    return this.httpClient.delete(url);
  }

  buscarHospitalPorNombre(nombre:string){
    let url = `${URL_SERVICIOS}/hospitales/${nombre}`;

    return this.httpClient.get(url);
  }

  actualizarHospital(hospital:Hospital){
    let token = this.usuarioService.token;
    let url = `${URL_SERVICIOS}/hospitales/${hospital._id}?token=${token}`;

    return this.httpClient.put(url,{
      nombre:hospital.nombre,
      img:hospital.img,
      usuario:hospital.usuario
    });

  }
}
