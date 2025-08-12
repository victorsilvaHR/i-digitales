import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../servicios/api.service';
declare var bootstrap: any;


@Component({
  selector: 'app-invitacion',
  templateUrl: './invitacion.component.html',
  styleUrls: ['./invitacion.component.css']
})
export class InvitacionComponent implements OnInit  {
  @ViewChild('exampleModal') exampleModal!: ElementRef;


  constructor(
    private apiService: ApiService

  ) { }
  ngOnInit(): void {
  this.setIdEvento();
  }
  invitacion = {
    idEvento: '',
    nombre: '',
    noInvitados: '',
    descripcion: '',
    noMesa: '',
    confAsistencia	: false,
    invConfirmados: 0
  };
  error = false;
  invitacionData: any = null;
  mostrarInput: boolean = false;
  urlCompleta: string = '';




setIdEvento() {
  const currentUserStr = sessionStorage.getItem('currentUser');
  if (currentUserStr) {
    const uid = JSON.parse(currentUserStr).uid;
    this.invitacion.idEvento = uid;
    sessionStorage.setItem('evento', JSON.stringify(uid));
   
  } else {
    console.error('No se encontró currentUser en sessionStorage');
  }
}


  
  crear() {
    if (this.invitacion.nombre && this.invitacion.noInvitados && this.invitacion.descripcion) {
      this.error = false;
      this.invitacionData = this.invitacion; 
      console.log(this.invitacion);
  
      // this.concatenado = this.invitacion.nombre + this.invitacion.noInvitados + this.invitacion.descripcion + this.invitacion.noMesa + this.invitacion.idEvento;
      this.mostrarInput = true;
      
      this.apiService.createInvitacion(this.invitacion).subscribe(
        (response: any) => {
          console.log('Invitación creada exitosamente:', response);
          
          // Obtener el ID de la respuesta (ajusta esto según tu estructura de respuesta)
          const id = response.data.id; // Asegúrate de que el campo `id` esté disponible en tu respuesta


          // Concatenar la URL
          const urlBase = 'https://invitaciones-31afc.web.app/A&G';
          const evento = this.invitacion.idEvento; 
          this.urlCompleta = `${urlBase}/${evento}/${id}`;
this.invitacion = {
  nombre: '',
  noInvitados: '', // ← corregido aquí
  descripcion: '',
  noMesa: '',
  idEvento: this.invitacion.idEvento, // si quieres mantener el mismo evento
  confAsistencia: false,
  invConfirmados: 0
};


  
       
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
copiarUrl(inputElement: HTMLInputElement) {
  inputElement.select();
  inputElement.setSelectionRange(0, 99999); // Para móviles

  try {
    const success = document.execCommand('copy');
    if (success) {
      const modalElement = document.getElementById('exampleModal');
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    } else {
      console.error('No se pudo copiar la URL');
    }
  } catch (err) {
    console.error('Error al copiar:', err);
  }

  inputElement.setSelectionRange(0, 0);
  inputElement.blur();
}





}
