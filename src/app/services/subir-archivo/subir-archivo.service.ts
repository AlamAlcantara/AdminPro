import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from 'src/app/config/config';

@Injectable({
  providedIn: 'root'
})
export class SubirArchivoService {

  constructor() { }

  subirArchivo(archivo:File, tipo:string, id:string){
    return new Promise((resolve,reject)=>{
      let formdata:FormData = new FormData();
      let xhr = new XMLHttpRequest();
      let url = `${URL_SERVICIOS}/upload/${tipo}/${id}`;

      formdata.append('imagen',archivo,archivo.name);
  
      xhr.onreadystatechange = function(){
        if(xhr.readyState === 4){
          if(xhr.status === 200){
            console.log('imagen subida');
            resolve(xhr.response);
          }else{
            console.log('falló subida');
            reject(xhr.response);
          }
        }
      }

      xhr.open('PUT',url,true);

    });

  }
}
