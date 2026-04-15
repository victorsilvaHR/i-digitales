import { 
  Component, 
  AfterViewInit, 
  ElementRef, 
  OnInit, 
  ViewChild 
} from "@angular/core"; // ✅ Se agregó ViewChild y Component aquí

@Component({
  selector: 'app-mario',
  templateUrl: './mario.component.html',
  styleUrls: ['./mario.component.css']
}) // ✅ Este es el decorador que faltaba
export class MarioComponent implements OnInit, AfterViewInit {

  // static: true permite usarlo desde el ngOnInit si fuera necesario
  @ViewChild('audio', { static: true }) audio!: ElementRef<HTMLAudioElement>;

  fotos: string[] = [];
  isPlaying = false;
  showButton = true;
  confirmado: boolean = false;

  invitacion = { noInvitados: 3 };
  body = { numeroInvitados: null as number | null };
  numeroOpciones: number[] = [];
  invConfirmados: number = 0;

  constructor() {
    for (let i = 1; i <= 11; i++) {
      this.fotos.push(`ifoto${i}.jpg`);
    }
  }

  ngOnInit(): void {
    this.numeroOpciones = Array.from(
      { length: this.invitacion.noInvitados },
      (_, i) => i + 1
    );
  }

  ngAfterViewInit(): void {
    // Intentamos reproducir al cargar
    this.iniciarAudio();
  }

  togglePlay() {
    const audio = this.audio.nativeElement;

    if (audio.paused) {
      audio.play()
        .then(() => {
          this.isPlaying = true;
        })
        .catch(err => {
          console.warn('❌ Bloqueado por el navegador. Esperando clic.');
        });
    } else {
      audio.pause();
      this.isPlaying = false;
    }
  }

  iniciarAudio() {
    if (this.audio && this.audio.nativeElement) {
      const audio = this.audio.nativeElement;
      audio.play()
        .then(() => {
          this.isPlaying = true;
        })
        .catch(() => {
          this.isPlaying = false;
        });
    }
  }

  onSeleccionarInvitado(valor: number | null) {
    this.body.numeroInvitados = valor;
    
    // Si el usuario interactúa, aprovechamos para sonar la música
    if (!this.isPlaying) {
      this.iniciarAudio();
    }
  }

  confirmar() {
    if (this.body.numeroInvitados === null) {
      alert('Selecciona una opción');
      return;
    }
    this.invConfirmados = this.body.numeroInvitados;
    this.confirmado = true;
  }
}