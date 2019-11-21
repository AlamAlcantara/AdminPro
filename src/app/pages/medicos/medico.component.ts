import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HospitalService, MedicoService } from 'src/app/services/services.index';
import Hospital from 'src/app/models/hospital.model';
import Medico from 'src/app/models/medico.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styleUrls: ['./medico.component.css']
})
export class MedicoComponent implements OnInit {

  hospitales:Hospital[]= [];
  medico:Medico = new Medico("","","","","");
  hospital:Hospital = new Hospital();

  constructor(public hospitalService:HospitalService,
              public medicoService:MedicoService,
              public router:Router) { }

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
      .subscribe((medico:any)=>{
        this.medico._id = medico._id;
        this.router.navigate(['/medico',this.medico._id]);
      })
  }

  cargarHospitales(){
    this.hospitalService.cargarHospitales()
      .subscribe((resp:any) =>{
        this.hospitales = resp.hospitales;
      })
  }

  cambiarHospital(id:string){
    this.hospitalService.obtenerHospital(id)
      .subscribe((resp:any)=> this.hospital = resp.hospital)
  }

}
