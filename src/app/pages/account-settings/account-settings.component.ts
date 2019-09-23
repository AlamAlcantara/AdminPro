import { Component, OnInit } from '@angular/core';
import { SettingsService } from 'src/app/services/settings.service';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styles: []
})
export class AccountSettingsComponent implements OnInit {

  constructor(public settings: SettingsService ) { }

  ngOnInit() {
    this.colocarCheck();
  }

  cambiarColor(tema:string,link:any){
    // console.log(tema);
    this.aplicarCheck(link);

    this.settings.aplicarTema(tema);
  }

  aplicarCheck(link:any){
    // console.log(link);

    let selectores:any = document.getElementsByClassName('selector');

    for(let ref of selectores){
      ref.classList.remove('working');
    }
    link.classList.add('working');
  }

  colocarCheck(){
    let selectores:any = document.getElementsByClassName('selector');
    let tema = this.settings.ajustes.tema;

    for(let ref of selectores){
      if (ref.getAttribute('data-theme') === tema ){
        ref.classList.add('working');
        break;
      }
    }
  }

}
