import { Component, ElementRef, HostListener, Input, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { ApiService } from '../servicios/api.service';
import { ActivatedRoute } from '@angular/router';
declare var bootstrap: any;


@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.css']
})
export class DemoComponent implements OnInit, AfterViewInit {

  @Input() noInvitados: number | string = 0;
  @ViewChild('audio', { static: true }) audio!: ElementRef<HTMLAudioElement>;

  isPlaying = true;
  showButton = false;

  parametro: string | null;
  eventoId: string | null = null;
  invitacionId: string | null = null;
  error = false;
  confirmado: boolean = false; 
  invConfirmados: number | null = null;





  body = {
    id: '',
    asistencia: true,
    numeroInvitados: null
  };

  invitacion: any = {
    nombre: '',
    noInvitados: '',
  };

  fotosCarrusel1: string[] = [];
  fotosCarrusel2: string[] = [];
  currentIndexCarrusel1: number = 0;
  numeroOpciones: number[] = [];

  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute
  ) {
    this.parametro = this.route.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.eventoId = this.route.snapshot.paramMap.get('eventoId');
    this.invitacionId = this.route.snapshot.paramMap.get('invitacionId');
    

    if (this.invitacionId) {
      this.body.id = this.invitacionId;
      

   this.apiService.getById('invitaciones', 'id', this.invitacionId).subscribe(
  (response: any) => {
    const data = response[0];
    this.invitacion.nombre = data.nombre;
    this.invitacion.noInvitados = Number(data.noInvitados);

    if (data.confAsistencia === 1) {
      this.confirmado = true;
      this.invConfirmados = data.invConfirmados;
    }

    this.actualizarOpciones();
  },
  (error) => console.error('Error en la consulta:', error)
);


    
    }

    this.fotosCarrusel1 = Array.from({ length: 13 }, (_, i) => `assets/foto${i + 1}.jpg`);
    this.fotosCarrusel2 = Array.from({ length: 11 }, (_, i) => `assets/DS${i + 1}.jpg`);

    setInterval(() => {
      this.nextFotoCarrusel1();
    }, 3000);
  }

  ngAfterViewInit(): void {
    const audioEl = this.audio.nativeElement;
    audioEl.play().then(() => {
      this.isPlaying = false; // Se pudo reproducir automáticamente
    }).catch(err => {
      console.warn('Autoplay bloqueado:', err);
      this.isPlaying = false; // No se pudo reproducir, está pausado
    });
  }

@HostListener('window:scroll', [])
onWindowScroll() {
  if (!this.showButton) {
    this.showButton = true;

    const audioEl = this.audio.nativeElement;

    // Intentar reproducir aquí, ya que el usuario interactuó (scroll)
    audioEl.play().then(() => {
      this.isPlaying = true;
    }).catch(err => {
      console.warn('Error al reproducir después del scroll:', err);
      this.isPlaying = false;
    });
  }
}


  togglePlay() {
    const audio = this.audio.nativeElement;

    if (this.isPlaying) {
      audio.pause();
    } else {
      audio.play().catch(err => {
        console.warn('Error al reproducir:', err);
      });
    }

    this.isPlaying = !this.isPlaying;
  }

confirmar() {
  if (this.body.numeroInvitados === null) {
    const modalAdvertencia = new bootstrap.Modal(document.getElementById('modalAdvertencia'));
    modalAdvertencia.show();
    return;
  }

  const dataToSend = {
    ...this.body,
    invConfirmados: this.body.numeroInvitados
  };

  this.apiService.confirmar(dataToSend).subscribe(
    (response: any) => {
      console.log('Confirmación exitosa:', response);
      this.confirmado = true; 
      const modalGracias = new bootstrap.Modal(document.getElementById('modalGracias'));
      modalGracias.show();
    },
    (error: any) => {
      console.error('Error al confirmar:', error);
    }
  );
  this.confirmado = true;
this.invConfirmados = this.body.numeroInvitados;

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

  actualizarOpciones() {
    const total = Number(this.invitacion.noInvitados);
    this.numeroOpciones = [];
    if (!isNaN(total) && total > 0) {
      for (let i = 1; i <= total; i++) {
        this.numeroOpciones.push(i);
      }
    }
  }
}
