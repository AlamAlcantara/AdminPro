import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from 'src/app/config/config';
import { map } from 'rxjs/operators';
import { UsuarioService } from '../usuario/usuario.service';
import swal from 'sweetalert';
import Medico from 'src/app/models/medico.model';

@Injectable({
  providedIn: 'root'
})
export class MedicoService {

  constructor(public http: HttpClient, public usuariosService:UsuarioService) { }

  cargarMedicos(){
    let URL = URL_SERVICIOS;

    return this.http.get(`${URL}/medicos`)
      .pipe(
        map((resp:any) =>{
          console.log('data',resp)
          return resp.medicos;
        })
      );
  }
  
  totalRegistros(){
    let URL = URL_SERVICIOS;

    return this.http.get(`${URL}/medicos`)
      .pipe(
        map((resp:any) =>{
          return resp.total;
        })
      );
  }

  buscarMedico(termino:string){
    let url = `${URL_SERVICIOS}/busqueda/coleccion/medicos/${termino}`;

    return this.http.get(url)
    .pipe(
      map((resp:any)=>{
        return resp.medicos;
      })
    );
  }

  borrarMedico(id:string){
    let usuarioToken = this.usuariosService.token;
    let url = `${URL_SERVICIOS}/medicos/${id}?token=${usuarioToken}`;

    return this.http.delete(url).pipe(
      map(resp=>{
        swal('Medico Borrado','Medico borrado correctamente','success');

        return resp;
      })
    )
  }


  guardarMedico(medico:Medico){
    let token = this.usuariosService.token;
    let url = `${URL_SERVICIOS}/medicos?token=${token}`;

    return this.http.post(url,medico).pipe(
        map((resp:any)=>{
          swal('Medico Creado',medico.nombre,'success');
          console.log('respuesta',resp)
          return resp.medicoCreado;
        })
    )

  }

}
