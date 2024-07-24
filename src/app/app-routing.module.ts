import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { InvitacionComponent } from './invitacion/invitacion.component';
import { RegistroComponent } from './registro/registro.component';
import { EventoComponent } from './evento/evento.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { DemoComponent } from './demo/demo.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './servicios/guard.service';

const routes: Routes = [
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path:'invitacion', component: InvitacionComponent ,  canActivate: [AuthGuard] },
  { path:'registro', component: RegistroComponent , canActivate: [AuthGuard]  },
  { path:'eventos', component: EventoComponent , canActivate: [AuthGuard]  },
  { path:'usuarios', component: UsuariosComponent ,  canActivate: [AuthGuard] },
  { path:'demo', component: DemoComponent  },
  { path:'demo/:id', component: DemoComponent  },
  { path:'login', component: LoginComponent },
  { path:'victor.hugo.silva01-bautizo/:id', component: DemoComponent  },
  { path:'', component: LoginComponent },
  { path:'**', component: LoginComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
