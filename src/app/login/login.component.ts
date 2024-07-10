import { Component, OnInit } from '@angular/core';
import { UserService } from '../servicios/user.service';
import { ApiService } from '../servicios/api.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { initializeApp } from 'firebase/app';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  analytics: any;
  mostrarPassword: boolean = false;
  badCredentials: boolean = false;
  showSpiner: boolean = false;
  campoVacio: boolean = false;
  nombre : string = ''

  constructor(
    private userService : UserService,private router: Router,
    private apiService: ApiService
  ) { 
    this.loginForm = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }

  ngOnInit(): void {
    const app = initializeApp(environment.firebaseConfig);
    this.apiService.getAll('invitaciones');


  }
  showPass() {
    this.mostrarPassword = !this.mostrarPassword;
  }
  async sendCredentials() {
    const { email, password } = this.loginForm.value;
    console.log(email,password)
    if(!!email && !!password) {
      this.showSpiner = true;
      try {
        const user =  await this.userService.singIn(email, password);
        this.userService.loginUser();
        this.showSpiner = false;
        this.router.navigate(['/home']);
        this.getUserById();
      } catch (error) {
        console.log(error);
        this.badCredentials = true;
        this.showSpiner = false;
      }
    } else {
      this.campoVacio = true;

    } 
  }
  getUserById() {
    const uid = sessionStorage.getItem('uid');
    if (uid) {
      this.apiService.getById('usuarios','uid',uid).subscribe(
        (response) => {
          console.log('Datos del usuario:', response[0]);
          this.nombre = response.nombre
          sessionStorage.setItem('currentUser',JSON.stringify(response[0]))

        },
        (error) => {
          console.error('Error al obtener los datos del usuario:', error);
        }
      );
    } else {
      console.error('UID no encontrado en sessionStorage');
    }
  }
  
  }


