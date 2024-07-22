import { Component, OnInit } from '@angular/core';
import { UserService } from '../servicios/user.service';
import { DataService } from '../servicios/db.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  nombre = ''
  isCollapsed = true;
  owner = false;
  
  constructor(
    private userService: UserService,
    private dataService : DataService,
  ) { }

  ngOnInit(): void {
    this.validarSesion();

  }
  toggleNavbar() {
    this.isCollapsed = !this.isCollapsed;
  }
  collapseNavbar() {
    this.isCollapsed = true;
  }
  cerrarSesion(){
    this.userService.logOut();
    this.userService.logOutUser();
   }
   consulta(){
    this.dataService.consulta();
   }
  cargarData(){
    this.dataService.cargarData();
  }
  validarSesion(){
    if (typeof window !== 'undefined' && typeof window.sessionStorage !== 'undefined') {
      const uid = sessionStorage.getItem('uid');
      const usuario = JSON.parse(sessionStorage.getItem('currentUser') + '');
      this.nombre = usuario ? usuario.nombre : "";
      this.owner = usuario ? usuario.owner : "";
      return !!uid;
    } else {
      return false;
    }
  }

}
