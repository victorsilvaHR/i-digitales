import { Component, OnInit } from '@angular/core';
import { ApiService } from '../servicios/api.service';

@Component({
  selector: 'app-evento',
  templateUrl: './evento.component.html',
  styleUrls: ['./evento.component.css']
})
export class EventoComponent implements OnInit {
  regex: RegExp =/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  emailError: boolean = false;

  resultQuery: any[] = [];
  error: boolean = false;

  evento = {
    idEvento: '',
    nombre_evento: '',
    email: '',
    vigencia: ''
  };
  currentDate!: Date;

  constructor(    
  private apiService: ApiService
  ) {
    this.currentDate = new Date(); 

   }

  ngOnInit(): void {
    this.apiService.getAll('Eventos').subscribe(
      (response) => {
        console.log('Consulta exitosa:', response);
        this.resultQuery = response; 
      },
      (error) => {
        console.error('Error en la consulta:', error);
      }
    );
  }
  eventoData: any = null;
  concatenado: string = '';

  crear() {
    if (this.evento.idEvento && this.evento.nombre_evento && this.evento.email) {
      this.error = false;
      this.eventoData = this.evento; 
      this.resultQuery.push({ ...this.evento });
      console.log(this.evento);
      this.concatenado = this.evento.idEvento + this.evento.nombre_evento + this.evento.email;
      this.apiService.createEvento(this.evento).subscribe(
        (response: any) => {
          console.log('Evento creado correctamente:', response);
          this.resultQuery.push(response);
          this.limpiarCampos(); 
        },
        (error: any) => {
          console.error('Error al crear el evento:', error);
          this.error = true;
        }
      );
 
    } else {
      this.error = true;
      
    }
  }
  limpiarCampos(){
  this.evento.idEvento = '';
  this.evento.nombre_evento = '';
  this.evento.email = '';
  this.evento.vigencia = '';
  }
  
  validar(event: Event) {
    const input = event.target as HTMLInputElement;
    const valor = input.value;
    if (this.regex.test(valor)) {
      this.emailError = false;
      console.log('correo valido');
    } else {
      this.emailError = true;
      console.log('correo NO valido');
    }
  }


}
