import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { InvitacionComponent } from './invitacion/invitacion.component';
import { RegistroComponent } from './registro/registro.component';
import { EventoComponent } from './evento/evento.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { CountdownComponent } from './countdown/countdown.component';
import { DemoComponent } from './demo/demo.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent},
  { path:'invitacion', component: InvitacionComponent },
  { path:'registro', component: RegistroComponent },
  { path:'eventos', component: EventoComponent },
  { path:'usuarios', component: UsuariosComponent },
  {path: 'countdown',component: CountdownComponent},
  {path:'demo', component: DemoComponent},
  { path:'', component: LoginComponent },
  { path:'**', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
