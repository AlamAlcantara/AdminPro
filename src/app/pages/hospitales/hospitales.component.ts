import { Component, OnInit } from '@angular/core';
import { HospitalService } from 'src/app/services/services.index';
import Hospital from 'src/app/models/hospital.model';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styleUrls: ['./hospitales.component.css']
})
export class HospitalesComponent implements OnInit {

  idHospitalABuscar:string;
  hospitales:Hospital[] = [];
  totalRegistros: number = 0;

  constructor( public hospitalesService:HospitalService ) { }

  ngOnInit() {
    this.cargarHospitales();
  }

  cargarHospitales(){
    this.hospitalesService.cargarHospitales()
    .subscribe((resp:any)=>{
      console.log(resp);
      this.hospitales = resp.hospitales;
      this.totalRegistros = resp.total;
    })
  }

  buscarHospital(){
    this.hospitalesService.obtenerHospital(this.idHospitalABuscar)
    .subscribe((resp:any)=>{
      console.log(resp);
    })
  }

  crearHospital(nombreHospital:string){
    this.hospitalesService.crearHospital(nombreHospital)
      .subscribe((resp:any)=>{
        console.log(resp);
      })
  }

  borrarHospital(id:string){
    this.hospitalesService.borrarHosital(id)
    .subscribe((resp:any)=>{
      console.log(resp);
    })
  }

  buscarHospitalPorNombre(nombreHospital:string){
    this.hospitalesService.buscarHospitalPorNombre(nombreHospital)
      .subscribe((resp:any)=>{
        console.log(resp);
      })
  }

  actualizarHospital(hospital:Hospital){
    this.hospitalesService.actualizarHospital(hospital)
      .subscribe((resp:any)=>{
        console.log(resp);
      })
  }

}
