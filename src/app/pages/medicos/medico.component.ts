import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HospitalService, MedicoService } from 'src/app/services/services.index';
import Hospital from 'src/app/models/hospital.model';
import Medico from 'src/app/models/medico.model';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalUploadService } from 'src/app/components/modal-upload/modal-upload.service';

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
  public router:Router,
  public activatedRoute:ActivatedRoute,
  public modalUploadService: ModalUploadService) {

    this.activatedRoute.params.subscribe((params)=>{
      let id = params['id'];

      if(id !=='nuevo'){
        this.cargarMedico(id);
      }

    })

  }

  ngOnInit() {
    this.cargarHospitales();

    this.modalUploadService.notificacion
    .subscribe(resp=>{
      console.log(resp)
      this.medico.img = resp.medico.img;
    })
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

  cargarMedico(id:string){
    this.medicoService.obtenerMedicoPorId(id)
      .subscribe((medico:any) => {
        this.medico = medico;
        this.medico.hospital = medico.hospital._id;
        this.cambiarHospital(this.medico.hospital);
      })
  }

  cambiarFoto(){
    this.modalUploadService.mostrarModal('medicos',this.medico._id);
  }

}
