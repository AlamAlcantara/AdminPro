import { Component, OnInit } from '@angular/core';
import { SubirArchivoService } from 'src/app/services/services.index';
import { ModalUploadService } from './modal-upload.service';

import * as _swal from 'sweetalert';
import { SweetAlert } from 'sweetalert/typings/core';
const swal: SweetAlert = _swal as any;

@Component({
  selector: 'app-modal-upload',
  templateUrl: './modal-upload.component.html',
  styleUrls: ['./modal-upload.component.css']
})
export class ModalUploadComponent implements OnInit {

  imagenASubir:File;
  imagenTemp:string;

  constructor(public _subirArchivoService:SubirArchivoService,public modalUploadService:ModalUploadService) { }

  ngOnInit() {
  }

  seleccionImagen(archivo:File){ 
    if(!archivo){
      this.imagenASubir = null;
      return;
    }

    if(archivo.type.indexOf('image') < 0){ //no es una imagen
      swal('Solo Imagenes','Debe seleccionar una imagen como archivo a subir','error');
      this.imagenASubir = null;
      return;
    }

    // console.log(event);
    this.imagenASubir = archivo;

    let reader= new FileReader();
    let urlImagenTemp = reader.readAsDataURL(archivo);

    reader.onloadend = ()=> this.imagenTemp = reader.result.toString();

  }

  guardarImagen(){
    this._subirArchivoService.subirArchivo(this.imagenASubir,this.modalUploadService.tipo,this.modalUploadService.id)
        .then((resp:any)=>{
          console.log(resp);

          this.modalUploadService.notificacion.emit(resp);  
          this.modalUploadService.ocultarModal();
        }).catch(error =>{
          console.log(error);
        })
  }

  cerrarModal(){
    this.imagenASubir = null;
    this.imagenTemp = null;

    this.modalUploadService.ocultarModal();
  }

}
