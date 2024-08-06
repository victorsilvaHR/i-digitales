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
        },
        (error) => {
          console.error('Error en la consulta:', error);
        }
      );
    }
  }

  generarPDF(): void {
    this.pdfService.generarPDF(this.resultQuery);
  }
}
