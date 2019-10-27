import { Component, OnInit } from '@angular/core';
import { HospitalService } from 'src/app/services/services.index';
import Hospital from 'src/app/models/hospital.model';
import { ModalUploadService } from 'src/app/components/modal-upload/modal-upload.service';
// import swal from 'sweetalert';

declare var swal:any;

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styleUrls: ['./hospitales.component.css']
})
export class HospitalesComponent implements OnInit {

  idHospitalABuscar:string;
  hospitales:Hospital[] = [];
  totalRegistros: number = 0;
  cargarDesde:number = 0;
  masRegistros:boolean = false;

  constructor( public hospitalesService:HospitalService, public modalUploadService: ModalUploadService ) { }

  ngOnInit() {
    this.cargarHospitales();
  }

  cargarHospitales(cargarDesde:number = 0){
    this.hospitalesService.cargarHospitales(this.cargarDesde)
    .subscribe((resp:any)=>{
      console.log(resp);
      this.hospitales = resp.hospitales;
      this.totalRegistros = resp.total;
      this.masRegistros = true;
    })
  }

  buscarHospital(){
    this.hospitalesService.obtenerHospital(this.idHospitalABuscar)
    .subscribe((resp:any)=>{
      // console.log(resp);
    })
  }

  crearHospital(nombreHospital:string){
    this.hospitalesService.crearHospital(nombreHospital)
      .subscribe((resp:any)=>{
        // console.log(resp);

        if(resp.ok === true){
          swal('Hospital creado exitosamente!',`${resp.hospitalCreado.nombre} creado exitosamente`,'success');
          this.cargarHospitales();
        }else{
          swal('Error al intentar crear hospital','Hubo un error','error');
          this.cargarHospitales();
        }
      })
  }

  borrarHospital(hospital:Hospital){
    swal({
      title: `Está seguro que desea eliminar hospital ${hospital.nombre}?` ,
      text: 'Si acepta se eliminará el hospital permanentemente!',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    })
    .then((borrar) => {
      if (borrar) {
        this.hospitalesService.borrarHosital(hospital._id)
          .subscribe((resp:any)=>{
            if(resp.ok === true){
              swal('Hospital Eliminado',`${hospital.nombre} eliminado exitosamente`,'success');
              this.cargarHospitales();
            }else{
              swal('Error',`hubo un error al tratar de eliminar hospital ${hospital.nombre}`,'error');
              this.cargarHospitales();
            }
          })
      }
    });
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
        // console.log(resp);
        if(resp.ok === true){
          swal('Hospital Actualizado',`${hospital.nombre} actualizado exitosamente`,'success');
        }else{
          swal('Error',`hubo un error al actualizar ${hospital.nombre}`,'error');
        }
      })
  }

  mostrarModal(id:string){
    this.modalUploadService.mostrarModal('hospitales',id);
    this.modalUploadService.notificacion.subscribe((resp:any)=>{
      this.cargarHospitales();
    })
  }

  cambiarDesde(valor:number){
    this.cargarDesde += valor;

    if(this.cargarDesde > this.totalRegistros){
      this.masRegistros = false;
      return;
    }else if(this.cargarDesde < 0){
      return;
    }else if(this.cargarDesde >= 0){
      this.cargarHospitales();
    }
  }

  modalCrearHospital(){
    swal({
      title:'Introduzca el nombre del hospital',
      content:'input',
      buttons:true
    }).then((resp)=>{
      if(resp){
        this.crearHospital(resp);
      }
    })
  }

}
