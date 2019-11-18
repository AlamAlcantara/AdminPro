import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HospitalService, MedicoService } from 'src/app/services/services.index';
import Hospital from 'src/app/models/hospital.model';
import Medico from 'src/app/models/medico.model';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styleUrls: ['./medico.component.css']
})
export class MedicoComponent implements OnInit {

  hospitales:Hospital[]= [];
  medico:Medico = new Medico();

  constructor(public hospitalService:HospitalService,public medicoService:MedicoService) { }

  ngOnInit() {
    this.cargarHospitales();
  }

  guardarMedico(form: NgForm){
    console.log(form.valid)
    console.log(form.value)

    if(form.invalid){
      return;
    }

    this.medicoService.guardarMedico(this.medico)
      .subscribe((resp:any)=>{
        console.log(resp);
      })
  }

  cargarHospitales(){
    this.hospitalService.cargarHospitales()
      .subscribe((resp:any) =>{
        this.hospitales = resp.hospitales;
      })
  }

}
