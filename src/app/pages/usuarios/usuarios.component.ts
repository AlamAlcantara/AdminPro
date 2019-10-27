import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/services/services.index';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { ModalUploadService } from 'src/app/components/modal-upload/modal-upload.service';
// import swal from 'sweetalert';

declare var swal:any;


@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  usuarios:Usuario[] = [];
  cargarDesde:number = 0;
  totalRegistros:number = 0;

  constructor(public _usuarioSerice:UsuarioService, public modalUploadService:ModalUploadService) { }

  ngOnInit() {
    this.cargarUsuarios();

    this.modalUploadService.notificacion.subscribe(resp => this.cargarUsuarios());
  }

  cargarUsuarios(){
    this._usuarioSerice.cargarUsuarios(this.cargarDesde)
      .subscribe((resp:any) =>{
        console.log(resp);
        this.totalRegistros = resp.total;
        this.usuarios = resp.Usuarios;
      })
  }

  cambiarDesde(valor:number){
    this.cargarDesde += valor;

    if(this.cargarDesde >= 0){
      this.cargarUsuarios();
    }else if(this.cargarDesde > this.totalRegistros){
      return;
    }else if(this.cargarDesde < 0){
      return;
    }
  }

  borrarUsuario( usuario:Usuario ){
    console.log(usuario);

    if(usuario._id === this._usuarioSerice.usuario._id){
      swal('No pude eliminar usuario','No se puede eliminar su mismo usuario','error');
      return;
    }

    swal({
      title: `Está seguro que desea eliminar usuario ${usuario.nombre}?` ,
      text: 'Si acepta se eliminará el usuario permanentemente!',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    })
    .then((borrar) => {
      if (borrar) {
        this._usuarioSerice.borrarUsuario(usuario._id)
          .subscribe((resp:any)=>{
            this.cargarUsuarios(); 
          })
      }
    });

  }

  guardarUsuario( usuario:Usuario ){
    console.log(usuario);
    this._usuarioSerice.actualizarUsuario(usuario).subscribe();
  }

  mostrarModal(id:string){
    this.modalUploadService.mostrarModal('usuarios',id); 
  }

}
