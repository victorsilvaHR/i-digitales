import { Component, OnInit } from '@angular/core';
import { ApiService } from '../servicios/api.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.css']
})
export class DemoComponent implements OnInit{
  parametro : string | null = '' ;
  title = 'mi-app';
  body = {
    id : 13,
    asistencia: false
  };


  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute
  ){ }


  ngOnInit(): void {
    this.parametro = this.route.snapshot.paramMap.get('parametro');
 
  

this.apiService.leido(this.body).subscribe(
  (response: any) => {
    console.log('Invitación creada exitosamente:', response);
  },
  (error: any) => {
    console.error('Error al crear la invitación:', error);
  }
);
  }
 


  openMap() {
    const address = encodeURIComponent("Real Miguel Hidalgo 1000, Ahuatepec, 62300 Cuernavaca, Morelos, México");
    window.open(`https://www.google.com/maps/search/?api=1&query=${address}`, '_blank');
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

}
