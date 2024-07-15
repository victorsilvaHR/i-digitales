import { Component, OnInit } from '@angular/core';
import { ApiService } from '../servicios/api.service';
import { UserService } from '../servicios/user.service';
import { Usuario } from '../model/usuarios';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {
  regex: RegExp =/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  emailError: boolean = false;

  constructor( 
    private apiService: ApiService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.fillRegistro();
  }
  newUser = {
    uid:'',
    nombreUser: '',
    idEvento: '',
    email: '',
    telefono:'',
    nombreFiesta: ''
  }
  concatenado: string = '';
  resultQuery: any[] = [];
  error: boolean = false;
  eventoData: any = null;
  password : string = 'Mexico123';

  fillRegistro() {
    this.apiService.getAll('usuarios').subscribe(
      (response: any[]) => {
        console.log('Consulta exitosa:', response);
        this.resultQuery = response; 
      },
      (error) => {
        console.error('Error en la consulta:', error);
      }
    );
  }
  crear() {
    if (this.newUser.nombreUser && this.newUser.nombreFiesta && this.newUser.email && this.newUser.telefono) {
      this.error = false;
      this.eventoData = this.newUser; 
      this.armarIdEvento(this.newUser);
      console.log(this.newUser);
      this.onRegister(this.newUser.email, environment.def);
      
    } else {
      this.error = true;
    }
  }

  limpiarCampos(){
    this.newUser.uid = '';
    this.newUser.nombreUser = '';
    this.newUser.idEvento = '';
    this.newUser.email = '';
    this.newUser.telefono = '';
    this.newUser.nombreFiesta = '';

  }

  onInput(event: any) {
    const value = event.target.value;
    if (value.length > 10) {
      event.target.value = value.slice(0, 10);
      this.newUser.telefono = value.slice(0, 10);
    } else {
      this.newUser.telefono = value;
    }
  }

  validar(event: Event) {
    const input = event.target as HTMLInputElement;
    const valor = input.value;
    if (this.regex.test(valor)) {
      this.emailError = false;
      console.log('correo valido');
    } else {
      this.emailError = true;
      console.log('correo NO valido');
    }
  }
  onRegister(email: string, password: string) {
    this.userService.createUser(email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        this.newUser.uid = user.uid;
        this.registerUserDb(this.newUser);
      })
      .catch((error) => {
        console.error('Error during registration:', error);
      });
  }
  registerUserDb(userWithUid: Usuario) {
    this.apiService.createUser(userWithUid).subscribe(
      (response: any) => {
        console.log('Usuario creado exitosamente:', response);
        // this.resultQuery.push(response); 
        this.limpiarCampos();
        this.fillRegistro();
      },
      (error: any) => {
        console.error('Error al crear el usuario:', error);
        this.error = true;
      }
    );
  }
  armarIdEvento(newUser: Usuario) {
    const correoArray = newUser.email.split('@')
    const fiestaArray = newUser.nombreFiesta.trim().split(' ');
    const fiestaString = fiestaArray.join();
    this.newUser.idEvento = correoArray[0]+fiestaString;
  }
}
