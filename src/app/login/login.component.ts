import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms'
import { UsuarioService } from '../services/services.index';
import { Usuario } from '../models/usuario.model';
import { URL_SERVICIOS } from '../config/config';

declare function init_plugins();
declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  recuerdame: boolean = false;
  email: string;
  auth2: any;

  constructor(public router: Router, public _usuarioService: UsuarioService) { }

  ngOnInit() {
    init_plugins();
    this.googleInit();

    this.email = localStorage.getItem('email') || '';

    if (this.email.length > 0) {
      this.recuerdame = true;
    }
  }

  googleInit() {
    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id: '900586482707-1kktouedin4ne7fee2bebb9k8d2vc9ih.apps.googleusercontent.com',
        cookie_policy: 'single_host_origin',
        scope: 'profile email'
      });

      this.attachSignIn(document.getElementById('btnGoogle'));

    });
  }

  attachSignIn(element) {
    this.auth2.attachClickHandler(element, {}, googleUser => {
      // let profile = googleUser.getBasicProfile();
      let token = googleUser.getAuthResponse().id_token;

      this._usuarioService.loginGoogle(token)
        .subscribe(() => this.router.navigate(['/dashboard']));
      // console.log(token);
    })
  }

  ingresar(forma: NgForm) {

    if (forma.invalid) {
      return;
    }

    let usuario: Usuario = new Usuario(null, forma.value.correo, forma.value.password)

    this._usuarioService.login(usuario, forma.value.recuerdame)
      .subscribe(correcto => this.router.navigate(['/dashboard']));


    console.log(forma.valid);
    console.log(forma.value);
  }

}
