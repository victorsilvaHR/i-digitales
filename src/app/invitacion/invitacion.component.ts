import { Component, OnInit } from '@angular/core';
import { ApiService } from '../servicios/api.service';

@Component({
  selector: 'app-invitacion',
  templateUrl: './invitacion.component.html',
  styleUrls: ['./invitacion.component.css']
})
export class InvitacionComponent {

  constructor(
    private apiService: ApiService

  ) { }
  invitacion = {
    idEvento: '',
    nombre: '',
    noInvitados: '',
    descripcion: '',
    noMesa: '',
  };
  error = false;
  invitacionData: any = null;
  mostrarInput: boolean = false;
  concatenado: string = '';
 
  crear() {
    if (this.invitacion.nombre && this.invitacion.noInvitados && this.invitacion.descripcion) {
      this.error = false;
      this.invitacionData = this.invitacion; 
      console.log(this.invitacion);
      this.concatenado = this.invitacion.nombre + this.invitacion.noInvitados + this.invitacion.descripcion + this.invitacion.noMesa;
      this.mostrarInput = true;
      
      this.apiService.createInvitacion(this.invitacion).subscribe(
        (response: any) => {
          console.log('Invitación creada exitosamente:', response);
        },
        (error: any) => {
          console.error('Error al crear la invitación:', error);
          this.error = true;
        }
      );
    } else {
      this.error = true; 
    }
  }

  limpiarCampos() {
    this.invitacion.nombre = '';
    this.invitacion.noInvitados = '';
    this.invitacion.descripcion = '';
    this.invitacion.noMesa = '';
    this.invitacionData = null;
    this.mostrarInput = false;
    this.concatenado = '';
  }
  numberOnly(event: any): boolean {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  onModalClose() {
    this.limpiarCampos();
  }


}
