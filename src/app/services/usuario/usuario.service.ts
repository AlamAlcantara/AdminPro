import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario } from 'src/app/models/usuario.model';
import { URL_SERVICIOS } from 'src/app/config/config';

import { map, catchError } from 'rxjs/operators';
import {throwError} from 'rxjs';
import swal from 'sweetalert';
import { Router } from '@angular/router';
import { SubirArchivoService } from '../subir-archivo/subir-archivo.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  usuario: Usuario;
  token: string;
  menu: any[] = [];

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
          this.guardarStorage(resp.id, resp.token, resp.usuario,resp.menu);
          return true;
        })
      ).pipe(catchError((error:any) =>{
        swal('Error al hacer login', error.error.mensaje,'error');
        return throwError(error);
      }));
  }

  logOut(){
    this.token = '';
    this.usuario = null;

    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    localStorage.removeItem('menu');
 
    this.router.navigate(['/login']);
  }

  estaLogueado() {
    return (this.token.length > 5) ? true : false;
  }

  cargarStorage(){
    if(localStorage.getItem('token')){
      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse(localStorage.getItem('usuario'));
      this.menu = JSON.parse(localStorage.getItem('menu'));
    }else{
      this.token = '';
      this.usuario = null;
      this.menu = [];
    }
  }

  guardarStorage(id: string, token: string, usuario: Usuario, menu:any) {
    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usuario));
    localStorage.setItem('menu', JSON.stringify(menu));

    this.usuario = usuario;
    this.token = token;
    this.menu = menu;
  }

  loginGoogle(token: string) {
    let url = URL_SERVICIOS + '/login/google';

    return this.httpClient.post(url, { token: token })
      .pipe(
        map((resp: any) => {
          this.guardarStorage(resp.id, resp.token, resp.usuario,resp.menu);
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
      ).pipe(catchError((error:any) =>{
        console.log('ERROR',error)
        swal(error.error.mensaje, error.error.error.message,'error');
        return throwError(error);
      }));;
  }

  actualizarUsuario(usuario:Usuario){
    let url = `${URL_SERVICIOS}/usuarios/${usuario._id}?token=${this.token}`;

    return this.httpClient.put(url,usuario)
      .pipe(
        map((resp:any)=>{
          if(usuario._id === this.usuario._id){
            let _usuario:Usuario = resp.usuario;
            this.guardarStorage(_usuario._id,this.token,_usuario,this.menu);
          }
          swal('Usuario actualizado!',usuario.nombre,'success');
          return true;
        })
      )
  }

  cambiarImagen(archivo:File, id:string){

    this.subirArchivoService.subirArchivo(archivo,'usuarios',id)
    .then( (resp:any) =>{
      console.log(resp);
      this.usuario.img = resp.usuario.img;
      swal('Imagen Actualizada',this.usuario.nombre,'success');

      this.guardarStorage(id,this.token,this.usuario,this.menu);
      
    }).catch(error =>{
      console.log(error); 
    })
  }

  cargarUsuarios(desde?:number){
    let url = `${URL_SERVICIOS}/usuarios?desde=${desde}`;

    return this.httpClient.get(url);
  }

  borrarUsuario(id:string){
    let url = `${URL_SERVICIOS}/usuarios/${id}?token=${this.token}`;

    return this.httpClient.delete(url)
      .pipe(
        map((resp:any)=>{
          swal('Usuario Eliminado','usuario eliminado exitosamente','success');
        })
      )
  }

  buscarUsuario(termino:string){
    let url = `${URL_SERVICIOS}/busqueda/coleccion/usuarios/${termino}`;

    return this.httpClient.get(url)
    .pipe(
      map((resp:any)=>{
        return resp.usuarios;
      })
    );

  }
}
