import { Component, OnInit } from '@angular/core';
import { SidebarService, UsuarioService } from 'src/app/services/services.index';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit {

  usuario:Usuario;
  constructor( public _sidebarService: SidebarService, public usuarioService:UsuarioService ) { }

  ngOnInit() {
    this.usuario = this.usuarioService.usuario;
    this._sidebarService.cargarMenu();
  }

  logOut(){
    this.usuarioService.logOut();
  }

}
