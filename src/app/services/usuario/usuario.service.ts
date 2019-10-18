import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario } from 'src/app/models/usuario.model';
import { URL_SERVICIOS } from 'src/app/config/config';

import {map} from 'rxjs/operators';
import swal from 'sweetalert';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(public httpClient: HttpClient) { 
    console.log('Servicio de usuario listo');
  }

  login(usuario:Usuario, recordar:boolean = false){
    let url = URL_SERVICIOS + '/login'; 

    if(recordar){
      localStorage.setItem('email',usuario.email);
    }else{
      localStorage.removeItem('email');
    }

    return this.httpClient.post(url,usuario)
      .pipe(
        map((resp:any)=>{
          localStorage.setItem('id',resp.id);
          localStorage.setItem('token',resp.token);
          localStorage.setItem('usuario',JSON.stringify(resp.usuario));

          return true;
        })
      );
  }

  loginGoogle(token:string){
    let url = URL_SERVICIOS + '/login/google';  

    return this.httpClient.post(url,{token:token});
  }

  crearUsuario(usuario:Usuario){
    let url = URL_SERVICIOS+'/usuarios';

    return this.httpClient.post(url,usuario)
            .pipe( 
              map((resp:any)=>{
                swal('Usuario Creado!',`Bienvenido ${usuario.nombre} ---- ${usuario.email}`,'success')
              })
            );
  }
}
