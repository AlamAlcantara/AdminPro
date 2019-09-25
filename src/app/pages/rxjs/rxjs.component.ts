import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscriber, Subscription } from 'rxjs';
import {retry,map, filter} from 'rxjs/operators'

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styleUrls: ['./rxjs.component.css']
})
export class RxjsComponent implements OnInit,OnDestroy {

  subscripcion: Subscription;

  constructor() {

    this.subscripcion = this.regresaObservable().pipe(
      retry(2)
    )
    .subscribe(
      (numero) => console.log('Cont: ', numero),
      error => console.error('Error ',error),
      () => console.log('El observador termino')
      );
   }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    console.log('componente rxjs cerrado');
    this.subscripcion.unsubscribe();
  }

  regresaObservable():Observable<any>  {
    return new Observable( (observer:Subscriber<any>) => {

      let contador = 0;

      let intervalo = setInterval(()=>{
        contador += 1;

        let salida ={
          valor: contador
        }

        observer.next(salida);

        // if(contador === 3){
        //   clearInterval(intervalo);
        //   observer.complete();
        // }
        //else if(contador === 2){
        //   // clearInterval(intervalo);
        //   observer.error('Auxilio');
        // }
      },1000);

    }).pipe(
      map(resp => resp.valor),
      filter((valor)=>{
        if((valor%2) == 1){
          return true;
        }else{
          return false;
        }
      })
    );
  }

}
