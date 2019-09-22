import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: []
})
export class IncrementadorComponent implements OnInit {

  @ViewChild('txtProgreso',{static:false}) txtProgeso: ElementRef;

  @Input('nombre') leyenda:string = 'leyenda';

  @Input() progreso:number = 50;

  @Output() cambioPorgreso: EventEmitter<number> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  onChanges(newVlaue:number){

    // let elemHtml: any =  document.getElementsByName('progreso')[0];

    if(newVlaue < 0){
      this.progreso = 0;
    }else if(newVlaue >= 100){
      this.progreso = 100;
    }else{
      this.progreso = newVlaue;
    }

    // elemHtml.value = Number(this.progreso);
    this.txtProgeso.nativeElement.value = Number(this.progreso);
    this.cambioPorgreso.emit(this.progreso);
    this.txtProgeso.nativeElement.focus();

  }

  cambiarValor(valor:number){
    if(valor < 0 && this.progreso > 0){
      this.progreso += valor;
      this.cambioPorgreso.emit(this.progreso);
    }else if(valor > 0 && this.progreso < 100 ){
      this.progreso += valor;
      this.cambioPorgreso.emit(this.progreso);
    }else{
      console.log('range reached');
      return;
    }
  }

}
