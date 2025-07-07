import { Injectable } from '@angular/core';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

@Injectable({
  providedIn: 'root',
})
export class PdfService {
  constructor() {}

  generarPDF(resultQuery: any[]): void {
    const doc = new jsPDF();

    let finalY = 0; // Variable para almacenar la posición Y final de la tabla

    // Genera la tabla principal
    autoTable(doc, {
      head: [['Invitado', 'Num. Personas', 'Descripción', 'Mesa', 'Visto', 'Confirmación']],
      body: resultQuery.map(fila => [
        fila.nombre,
        fila.noInvitados,
        fila.descripcion,
        fila.noMesa,
        fila.leido ? '✓' : '-',
        fila.confAsistencia ? '✓' : '-'
      ]),
      startY: 20,
      didDrawCell: (data) => {
        if (data.cursor) {
          finalY = data.cursor.y; // Actualiza la posición Y final de la tabla
        }
      }
    });

    // Calcula el total de invitados
    const totalInvitados = resultQuery.reduce((total, fila) => total + fila.noInvitados, 0);

    // Añade la suma total al final del PDF
    doc.setFontSize(13);
    doc.text(`Total de Personas: ${totalInvitados}`, 14, finalY + 20);

    // Guarda el PDF
    doc.save('registro-invitados.pdf');
  }
}
