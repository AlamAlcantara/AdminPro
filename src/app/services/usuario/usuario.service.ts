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
