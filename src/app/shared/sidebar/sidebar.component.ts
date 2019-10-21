import { Component, OnInit } from '@angular/core';
import { SidebarService, UsuarioService } from 'src/app/services/services.index';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit {

  constructor( public _sidebarService: SidebarService, public usuarioService:UsuarioService ) { }

  ngOnInit() {
  }

  logOut(){
    this.usuarioService.logOut();
  }

}
