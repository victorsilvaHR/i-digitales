import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../servicios/api.service';
import { ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.css']
})
export class DemoComponent implements OnInit {
  @ViewChild('audio', { static: true }) audio!: ElementRef<HTMLAudioElement>;
  isPlaying = false;
  parametro : string  | null  ;
  title = 'mi-app';
  body = {
    id : '',
    asistencia: false
  };
  invitacion: any = {
    nombre: '',
    noInvitados: ''
  };
  botonActivo = true

  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute
  ){ this.parametro = this.route.snapshot.paramMap.get('id');
  }


  ngOnInit(): void {
    if (this.parametro) {
      this.body.id = this.parametro;
    }

    this.apiService.getById('invitaciones', 'id', this.parametro +'') .subscribe(
      (response: any) => {
        console.log('Consulta exitosa:', response);
        this.invitacion.nombre = response[0].nombre;
        this.invitacion.noInvitados = response[0].noInvitados
      },
      (error) => {
        console.error('Error en la consulta:', error);
      }
    );
 
  

    this.apiService.leido(this.body).subscribe(
      (response: any) => {
        console.log('Confirmacion de lectura con exito:', response);
      },
      (error: any) => {
        console.error('Error al crear la invitación:', error);
      }
    );
  }
 
  
  confirmar(){
  this.apiService.confirmar(this.body).subscribe(
    (response: any) => {
      console.log(' Confirmacion exitosa:', response);
    },
    (error: any) => {
      console.error('Error al confirmar la invitación:', error);
    }
  );
  }
  asistencia(){
    this.botonActivo = false
  }
  togglePlay() {
    const audio = this.audio.nativeElement;

    if (this.isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }

    this.isPlaying = !this.isPlaying;
  }
}
