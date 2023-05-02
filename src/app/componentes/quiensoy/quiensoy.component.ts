import { Component } from '@angular/core';
import { AutentificacionService } from 'src/app/servicios/autentificacion.service';

import Swal from 'sweetalert2';
import { Persona } from 'src/app/model/persona.model';
import { PersonaService } from 'src/app/servicios/persona.service';
import { TokenService } from 'src/app/servicios/token.service';

@Component({
  selector: 'app-quiensoy',
  templateUrl: './quiensoy.component.html',
  styleUrls: ['./quiensoy.component.css']
})
export class QuiensoyComponent {

  personaList: any;
  id: number;
  persona: Persona = new Persona();;

  isLogged = false;

  constructor(private personaService: PersonaService, private loginPrd: AutentificacionService,
    private tokenService: TokenService){

  }

  ngOnInit(): void {
    
    this.id = 1;
    this.personaService.obtenerPerfil(this.id).subscribe(data => {
      this.persona = data;
    });

    if (this.tokenService.getToken()) {
      this.isLogged = true;
    } else {
      this.isLogged = false;
    }

  }

  public visualizarBotones():boolean{
    return this.loginPrd.hablitarLogueo()
  }

  public listPersona() {
    this.personaService.listaDePersona().subscribe(data => {
      this.personaList = data;
    });
  }

  public updateAcerca() {
    this.personaService.actualizarPersona(this.id, this.persona).subscribe(data => {
      Swal.fire({
        icon: 'info',
        title: 'Información actualizada !!!',
        showConfirmButton: false,
        timer: 1800
      })

      this.listPersona();

    }, err => alert(err.message));
  }

}
