import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styleUrls: ['./promesas.component.css']
})
export class PromesasComponent implements OnInit {

  constructor() { 

    this.contarTres().then((mensaje)=> console.log('Termino! '+mensaje))
    .catch((error)=> console.error('Ocurrio un error en la funcion '+error));

  }

  ngOnInit() {
  }

  contarTres():Promise<boolean>{

    return new Promise((resolve,reject)=>{

      let contador = 0;

      let intervalo = setInterval(()=>{
        contador += 1;
        console.log(contador);
        if(contador == 3){
          resolve(true);
          // reject(false);
          clearInterval(intervalo);
        }
      },1000);
    });
  }

}
