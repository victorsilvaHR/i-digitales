import { Component, ElementRef, Input, OnInit, ViewChild, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-inv-ivan',
  templateUrl: './inv-ivan.component.html',
  styleUrls: ['./inv-ivan.component.css']
})
export class InvIvanComponent implements OnInit, AfterViewInit {
  @ViewChild('audio', { static: true }) audio!: ElementRef<HTMLAudioElement>;

  fotos: string[] = [];
  isPlaying = false; // Inicia en pausa
  showButton = true; // Mostrar el botón desde el principio

  constructor() {
    for (let i = 1; i <= 11; i++) {
      this.fotos.push(`ifoto${i}.jpg`);
    }
  }

  @Input() fotosCarrusel1: string[] = [];
  currentIndexCarrusel1: number = 0;

  ngOnInit(): void {
    setInterval(() => {
      this.nextFotoCarrusel1();
    }, 5000);
  }

  ngAfterViewInit(): void {
    const audioEl = this.audio.nativeElement;
    audioEl.play().then(() => {
      this.isPlaying = true;
    }).catch(err => {
      console.warn('No se pudo iniciar la reproducción automática:', err);
      // En algunos navegadores, la reproducción automática sin interacción puede ser bloqueada.
    });
  }

  nextFotoCarrusel1() {
    this.currentIndexCarrusel1 = (this.currentIndexCarrusel1 + 1) % this.fotosCarrusel1.length;
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
}
