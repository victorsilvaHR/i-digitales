import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { ApiService } from '../servicios/api.service';
import { isPlatformBrowser } from '@angular/common';
import { PdfService } from '../servicios/PDF.service';  // Asegúrate de ajustar la ruta del servicio

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  resultQuery: any[] = [];
  showButton: boolean = false;
  totalConfirmados: number = 0;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private apiService: ApiService,
    private pdfService: PdfService  // Inyecta el servicio PDF
  ) { }

  ngOnInit(): void {
    this.getRegistroId();
    console.log(this.resultQuery);

  }

getRegistroId() {
  if (isPlatformBrowser(this.platformId)) {
    const eventoRaw = sessionStorage.getItem('evento');    
    if (eventoRaw) {
      this.apiService.getById('invitaciones', 'idEvento', eventoRaw).subscribe(
        (response: any) => {
          console.log('Consulta exitosa:', response);
          this.resultQuery = response;
          this.totalConfirmados = this.calculateTotalConfirmados();
        },
        (error) => {
          console.error('Error en la consulta:', error);
        }
      );
    } else {
      console.warn('No se encontró "evento" en sessionStorage');
    }
  }
}


calculateTotalConfirmados(): number {
  return this.resultQuery?.reduce((total: number, fila: any) => {
    const valor = Number(fila.invConfirmados);
    return total + (isNaN(valor) ? 0 : valor);
  }, 0) || 0;
}


  generarPDF(): void {
    this.pdfService.generarPDF(this.resultQuery);
  }
}
