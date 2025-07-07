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
  resultQuery: any;
  showButton: boolean = false;
  totalInvitados: number = 0;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private apiService: ApiService,
    private pdfService: PdfService  // Inyecta el servicio PDF
  ) { }

  ngOnInit(): void {
    this.getRegistroId();
  }

  getRegistroId() {
    if (isPlatformBrowser(this.platformId)) {
      const currentUser = sessionStorage.getItem('currentUser');
      const usuario = JSON.parse(currentUser + '');
      this.apiService.getById('invitaciones', 'idEvento', usuario.idEvento).subscribe(
        (response: any) => {
          console.log('Consulta exitosa:', response);
          this.resultQuery = response;
          this.totalInvitados = this.calculateTotalInvitados();
          const paquete = usuario.paquete;
          this.showButton = paquete === 'P';
        },
        (error) => {
          console.error('Error en la consulta:', error);
        }
      );
    }
  }

  calculateTotalInvitados(): number {
    return this.resultQuery.reduce((total: number, fila: any) => total + fila.noInvitados, 0);
  }

  generarPDF(): void {
    this.pdfService.generarPDF(this.resultQuery);
  }
}
