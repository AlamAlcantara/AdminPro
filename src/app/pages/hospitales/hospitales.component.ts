import { Component, OnInit } from '@angular/core';
import { HospitalService } from 'src/app/services/services.index';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styleUrls: ['./hospitales.component.css']
})
export class HospitalesComponent implements OnInit {

  idHospitalABuscar:string;

  constructor( public hospitalesService:HospitalService ) { }

  ngOnInit() {
    this.cargarHospitales();
  }

  cargarHospitales(){
    this.hospitalesService.cargarHospitales()
    .subscribe((resp:any)=>{
      console.log(resp);
    })
  }

  buscarHospital(){
    this.hospitalesService.obtenerHospital(this.idHospitalABuscar)
    .subscribe((resp:any)=>{
      console.log(resp);
    })
  }

  

}
