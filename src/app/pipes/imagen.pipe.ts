import { Pipe, PipeTransform } from '@angular/core';
import { URL_SERVICIOS } from '../config/config';

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(imagen: string, tipo: string = 'usuario'): any {

    let url = URL_SERVICIOS + '/imagenes';

    if (!imagen) {
      return url + '/usuarios/xxx';
    }

    if (imagen.indexOf('https') >= 0) { //si contiene https es un usuario con una imagen de google
      return imagen;
    }

    switch (tipo) {
      case 'usuario':
        url += '/usuarios/' + imagen;
        break;
      case 'hospital':
        url += '/hospitales/' + imagen;
        break;
      case 'medico':
        url += '/medicos/' + imagen;
        break;
      default:
        console.log('tipo de imagen no existe');
        url += '/usuarios/xxx';
    }
    
    return url;
  }

}
