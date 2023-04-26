import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { AutentificacionService } from 'src/app/servicios/autentificacion.service';
import { Proyecto } from 'src/app/model/proyecto.model';
import { ProyectoService } from 'src/app/servicios/proyecto.service';


@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.component.html',
  styleUrls: ['./proyectos.component.css']
})
export class ProyectosComponent {

  proyectoList: any;
  id: number;
  proyecto: Proyecto = new Proyecto();

  constructor(private loginPrd: AutentificacionService, private proyectoService: ProyectoService){}

  ngOnInit(): void {
    
    this.listProyecto(); 

  }

  public visualizarBotones():boolean{
    return this.loginPrd.hablitarLogueo()
  }

  public obtenerIdProyecto(id: number) {
    this.proyectoService.obtenerProyecto(id).subscribe(data => {
      this.proyecto = data;
    });
  }

  public limpiarProyecto(){
    this.proyecto = new Proyecto();
  }

  public updateProyecto(id: number) {
    this.proyectoService.actualizarProyecto(id, this.proyecto).subscribe(data => {
      Swal.fire({
        icon: 'info',
        title: 'Proyecto Actualizado!!!',
        showConfirmButton: false,
        timer: 1800
      })

      this.listProyecto();

    }, err => alert(err.message))
  }

  public addProyecto() {
    this.proyectoService.crearProyecto(this.proyecto).subscribe(dato => {
      Swal.fire({
        icon: 'info',
        title: 'Proyecto Agregado!!!',
        showConfirmButton: false,
        timer: 1800
      })

      this.listProyecto();

    }, err => alert(err.message));
  }

  public deleteProyecto(id: number) {
    Swal.fire({
      title: '¿Desea eliminar este Proyecto?',
      text: "Eliminar definitivamente",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Ok'
    }).then((result) => {
      if (result.isConfirmed) {

        this.proyectoService.eliminarProyecto(id).subscribe(data => {

        });

        Swal.fire({
          icon: 'info',
          title: 'Proyecto Eliminado !!!',
          showConfirmButton: false,
          timer: 1800
        })

        this.listProyecto();

      }
    })

  }

  private listProyecto() {
    this.proyectoService.listaDeProyecto().subscribe(data => {
      this.proyectoList = data;
    });
  }

}
