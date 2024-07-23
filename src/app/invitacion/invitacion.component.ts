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
  urlCompleta: string = '';
 
  
  crear() {
    if (this.invitacion.nombre && this.invitacion.noInvitados && this.invitacion.descripcion) {
      this.error = false;
      this.invitacionData = this.invitacion; 
      console.log(this.invitacion);
      
      const currentUser = sessionStorage.getItem('currentUser');
      const dataUser = JSON.parse(currentUser + '');
      this.invitacion.idEvento = dataUser.idEvento;
  
      // this.concatenado = this.invitacion.nombre + this.invitacion.noInvitados + this.invitacion.descripcion + this.invitacion.noMesa + this.invitacion.idEvento;
      this.mostrarInput = true;
      
      this.apiService.createInvitacion(this.invitacion).subscribe(
        (response: any) => {
          console.log('Invitación creada exitosamente:', response);
          
          // Obtener el ID de la respuesta (ajusta esto según tu estructura de respuesta)
          const id = response.data.id; // Asegúrate de que el campo `id` esté disponible en tu respuesta


          // Concatenar la URL
          const urlBase = 'https://invitaciones-31afc.web.app';
          const evento = this.invitacion.idEvento; 
          this.urlCompleta = `${urlBase}/${evento}/${id}`;
  
          // Redirigir a la URL completa
          // window.location.href = urlCompleta;
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
    this.urlCompleta = '';
  }
  numberOnly(event: any): boolean {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }
  textOnly(event: any): boolean {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode >= 48 && charCode <= 57) {
      event.preventDefault();
      return false;
    }
    return true;
  }

  onModalClose() {
    this.limpiarCampos();
  }
  copy(event: MouseEvent) {
    if (this.urlCompleta) {
      navigator.clipboard.writeText(this.urlCompleta).then(() => {
        console.log('Id del Evento copiado al portapapeles');
      }).catch(err => {
        console.error('Error al copiar al portapapeles:', err);
      });
    }
  }

}
