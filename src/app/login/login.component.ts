import { Component, OnInit } from '@angular/core';
import { UserService } from '../servicios/user.service';
import { ApiService } from '../servicios/api.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { initializeApp } from 'firebase/app';

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
    private userService : UserService,
    private apiService: ApiService
  ) { 
    this.loginForm = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }

  ngOnInit(): void {
    const app = initializeApp(environment.firebaseConfig);
    // this.analytics = getAnalytics(app);
    this.apiService.getAll('invitaciones');

    // const evento = {
    //   uid: 'laskdjkladsf98735lkj',
    //   email: 'email.user@t_mail.com',
    //   idEvento: 'email.user-boda',
    //   nombre: 'Test User',
    //   telefono: '1020304050'
    // };
    // this.apiService.createUser(evento).subscribe(
    //   (response) => {
    //     console.log('Usuario creado correctamente:', response);
    //   },
    //   (error) => {
    //     console.error('Error al crear el usuario:', error);
    //   }
    // );
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
        // console.log(user);
        sessionStorage.setItem('uid',user.uid);
        this.showSpiner = false;
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


