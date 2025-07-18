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
  parametro: string | null;
  title = 'mi-app';

  body = {
    id: '',
    asistencia: null,
    numeroInvitados: 1
  };

  invitacion: any = {
    nombre: '',
    noInvitados: '',
    // noMesa: ''
  };

  botonActivo = true;
  fotosCarrusel1: string[] = []; // foto1.jpg - foto13.jpg
  fotosCarrusel2: string[] = []; // DS1.jpg - DS11.jpg
  currentIndexCarrusel1: number = 0;

  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute
  ) {
    this.parametro = this.route.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {

    if (this.parametro) {
      this.body.id = this.parametro;
    }

     this.apiService.getById('invitaciones', 'id', this.parametro + '').subscribe(
      (response: any) => {
        console.log('Consulta exitosa:', response);
        this.invitacion.nombre = response[0].nombre;
        this.invitacion.noInvitados = Number(response[0].noInvitados); // convierte a número
      },
      (error) => {
        console.error('Error en la consulta:', error);
      }
    );

    this.apiService.leido(this.body).subscribe(
      (response: any) => {
        console.log('Confirmación de lectura con éxito:', response);
      },
      (error: any) => {
        console.error('Error al crear la invitación:', error);
      }
    );

    this.fotosCarrusel1 = Array.from({ length: 13 }, (_, i) => `assets/foto${i + 1}.jpg`);
    this.fotosCarrusel2 = Array.from({ length: 11 }, (_, i) => `assets/DS${i + 1}.jpg`);

     setInterval(() => {
      this.nextFotoCarrusel1();
    }, 3000);
  }

  confirmar() {
      console.log('Número de invitados confirmados:', this.body.numeroInvitados);
    this.apiService.confirmar(this.body).subscribe(
      (response: any) => {
        console.log('Confirmación exitosa:', response);
      },
      (error: any) => {
        console.error('Error al confirmar la invitación:', error);
      }
    );
    
  }

  asistencia() {
    this.botonActivo = false;
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

  nextFotoCarrusel1() {
    this.currentIndexCarrusel1 = (this.currentIndexCarrusel1 + 1) % this.fotosCarrusel1.length;
  }

  getPreviousIndex(): number {
    return (this.currentIndexCarrusel1 - 1 + this.fotosCarrusel1.length) % this.fotosCarrusel1.length;
  }

  getTwoBehindIndex(): number {
    return (this.currentIndexCarrusel1 - 2 + this.fotosCarrusel1.length) % this.fotosCarrusel1.length;
  }
}
