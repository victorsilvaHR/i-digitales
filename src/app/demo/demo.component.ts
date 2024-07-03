import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.css']
})
export class DemoComponent {
  title = 'mi-app';


  openMap() {
    const address = encodeURIComponent("Real Miguel Hidalgo 1000, Ahuatepec, 62300 Cuernavaca, Morelos, México");
    window.open(`https://www.google.com/maps/search/?api=1&query=${address}`, '_blank');
  }
 

}
