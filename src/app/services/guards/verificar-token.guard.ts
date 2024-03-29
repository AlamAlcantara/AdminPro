import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class VerificarTokenGuard implements CanActivate {

  constructor(public usuarioService:UsuarioService, public router:Router){}

  canActivate(): Promise<boolean> | boolean {

    let token = this.usuarioService.token;

    if(token){
      let payload = JSON.parse( atob(token.split('.')[1] ));
      let expirado = this.expirado(payload.exp);

      if(expirado){
        this.router.navigate(['/login'])
        return false;
      }
      return this.verificaRenueva(payload.exp);
    }
  }

  verificaRenueva(fechaExp:number): Promise<boolean>{

    return new Promise((resolve,reject)=>{
      let fechaToken = new Date(fechaExp * 1000); // a milisegundos
      let ahora = new Date();

      ahora.setTime(ahora.getTime() + (4 * 60 * 60 * 1000))

      if(fechaToken.getTime() > ahora.getTime()){
        resolve(true)
      }else{
        this.usuarioService.renuevaToken()
          .subscribe(()=>{
            resolve(true);
          },()=>{
            this.router.navigate(['/login'])
            reject(false);
          })
      }
    })
  }

  expirado(fechaExp: number){
    let ahora = new Date().getTime() / 1000;

    if(fechaExp < ahora){
      return true
    }
    return false;
  }
  
}
