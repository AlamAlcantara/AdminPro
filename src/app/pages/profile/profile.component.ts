import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/services/services.index';
import { emit } from 'cluster';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  usuario:Usuario;
  imagenASubir:File;

  constructor(public _usuarioService:UsuarioService) {
    this.usuario = _usuarioService.usuario;
   }

  ngOnInit() {
  }

  guardar(_usuario:Usuario){
    console.log(_usuario);
    this.usuario.nombre = _usuario.nombre;

    if(!this.usuario.google){
      this.usuario.email = _usuario.email;
    }

    this._usuarioService.actualizarUsuario(this.usuario)
        .subscribe(resp => {
          console.log(resp);
        })
  }

  seleccionImagen(archivo:File){ 
    if(!archivo){
      this.imagenASubir = null;
      return;
    }
    // console.log(event);
    this.imagenASubir = archivo;
  }

  cambiarImagen(){
    console.log('metodo activado')
    this._usuarioService.cambiarImagen(this.imagenASubir,this.usuario._id);
  }

}
