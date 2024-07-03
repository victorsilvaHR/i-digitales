import { Component, Injectable, OnInit } from '@angular/core';
import { UserService } from '../servicios/user.service';
import { ApiService } from '../servicios/api.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { initializeApp } from 'firebase/app';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../servicios/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
@Injectable({
  providedIn: 'root'
})
export class LoginComponent implements OnInit , CanActivate {
  loginForm!: FormGroup;
  analytics: any;
  mostrarPassword: boolean = false;
  badCredentials: boolean = false;
  showSpiner: boolean = false;
  campoVacio: boolean = false;
  nombre : string = ''

  constructor(
    private userService : UserService,
    private apiService: ApiService,
    private authService: AuthService, private router: Router
  ) { 
    this.loginForm = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }
  canActivate1( 
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.authService.isAuthenticated()) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
  login() {
    this.authService.login();
    this.router.navigate(['/protected']);
  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    throw new Error('Method not implemented.');
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


