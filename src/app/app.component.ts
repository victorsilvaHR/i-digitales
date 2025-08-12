import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  mostrarHeader = true;

  constructor(private router: Router) {}

  ngOnInit() {
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd) // Filtramos solo NavigationEnd
      )
      .subscribe(event => {
        const navEnd = event as NavigationEnd; // Casteamos aquí para evitar error
        const rutasSinHeader = ['/invIvan']; // Rutas sin header
        this.mostrarHeader = !rutasSinHeader.includes(navEnd.urlAfterRedirects);
      });
  }
}
