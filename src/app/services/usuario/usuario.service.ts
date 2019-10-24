import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario } from 'src/app/models/usuario.model';
import { URL_SERVICIOS } from 'src/app/config/config';

import { map } from 'rxjs/operators';
import swal from 'sweetalert';
import { Router } from '@angular/router';
import { SubirArchivoService } from '../subir-archivo/subir-archivo.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  usuario: Usuario;
  token: string;

  constructor(public httpClient: HttpClient, public router:Router, public subirArchivoService:SubirArchivoService) {
    // console.log('Servicio de usuario listo');
    this.cargarStorage();
  }

  login(usuario: Usuario, recordar: boolean = false) {
    let url = URL_SERVICIOS + '/login';

    if (recordar) {
      localStorage.setItem('email', usuario.email);
    } else {
      localStorage.removeItem('email');
    }

    return this.httpClient.post(url, usuario)
      .pipe(
        map((resp: any) => {
          this.guardarStorage(resp.id, resp.token, resp.usuario);
          return true;
        })
      );
  }

  logOut(){
    this.token = '';
    this.usuario = null;

    localStorage.removeItem('token');
    localStorage.removeItem('usuario');

    this.router.navigate(['/login']);
  }

  estaLogueado() {
    return (this.token.length > 5) ? true : false;
  }

  cargarStorage(){
    if(localStorage.getItem('token')){
      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse(localStorage.getItem('usuario'));
    }else{
      this.token = '';
      this.usuario = null;
    }
  }

  guardarStorage(id: string, token: string, usuario: Usuario) {
    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usuario));

    this.usuario = usuario;
    this.token = token;
  }

  loginGoogle(token: string) {
    let url = URL_SERVICIOS + '/login/google';

    return this.httpClient.post(url, { token: token })
      .pipe(
        map((resp: any) => {
          this.guardarStorage(resp.id, resp.token, resp.usuario);
          return true;
        })
      );
  }

  crearUsuario(usuario: Usuario) {
    let url = URL_SERVICIOS + '/usuarios';

    return this.httpClient.post(url, usuario)
      .pipe(
        map((resp: any) => {
          swal('Usuario Creado!', `Bienvenido ${usuario.nombre} ---- ${usuario.email}`, 'success')
        })
      );
  }

  actualizarUsuario(usuario:Usuario){
    let url = `${URL_SERVICIOS}/usuarios/${usuario._id}?token=${this.token}`;

    return this.httpClient.put(url,usuario)
      .pipe(
        map((resp:any)=>{
          let _usuario:Usuario = resp.usuario;

          this.guardarStorage(_usuario._id,this.token,_usuario);
          swal('Usuario actualizado!',this.usuario.nombre,'success');
          return true;
        })
      )
  }

  cambiarImagen(archivo:File, id:string){

    this.subirArchivoService.subirArchivo(archivo,'usuarios',id).then( resp =>{
      console.log(resp);
      
    }).catch(error =>{
      console.log(error); 
    })
  }
}
