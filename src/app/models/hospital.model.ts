import { Usuario } from './usuario.model';

export default class Hospital{
    _id?:string;
    nombre:string;
    img?:string;
    usuario?:Usuario; //representa el usuario al que correponde la manipulacion del hospital
}