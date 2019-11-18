import { Component, OnInit } from '@angular/core';
import { MedicoService } from 'src/app/services/services.index';
import Medico from '../../models/medico.model';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styleUrls: ['./medicos.component.css']
})
export class MedicosComponent implements OnInit {

  totalRegistros: Number = 0;
  medicos:Medico[] = [];

  constructor(public medicoService:MedicoService) { }

  ngOnInit() {
    this.cargarMedicos();
    this.cargarTotalMedicos();
  }

  cargarMedicos(){
    this.medicoService.cargarMedicos().subscribe((resp)=>{
      this.medicos = resp;
    });
  }

  cargarTotalMedicos(){
    this.medicoService.totalRegistros().subscribe(resp =>{
      this.totalRegistros = resp;
    })
  }

  buscarMedico(termino:string){

    if(termino.length <= 0){
      this.cargarMedicos();
      return;
    }
    this.medicoService.buscarMedico(termino)
    .subscribe((resp:any)=>{
      this.medicos = resp;
    })

  }

  borrarMedico(medico:Medico){
    this.medicoService.borrarMedico(medico._id)
    .subscribe((resp:any)=>{
      this.cargarMedicos();
      console.log(resp);
    })
  }

}
