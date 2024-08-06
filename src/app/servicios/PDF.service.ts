import { Injectable } from '@angular/core';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

@Injectable({
  providedIn: 'root'
})
export class PdfService {

  constructor() { }

  

  public generarPDF(resultQuery: any[]): void {
    const doc = new jsPDF();
    const col = ["Invitado", "Num. Personas", "Descripción", "Mesa", "Visto", "Confirmación"];
    const rows: any[][] = [];

    resultQuery.forEach(fila => {
      const temp = [
        fila.nombre,
        fila.noInvitados,
        fila.descripcion,
        fila.noMesa,
        fila.leido ? 'Si' : 'No',
        fila.confAsistencia ? 'Si' : 'No'
      ];
      rows.push(temp);
    });

    autoTable(doc, {
      head: [col],
      body: rows,
      startY: 10,
      theme: 'striped'
    });

    doc.save('registro.pdf');
  }
}
