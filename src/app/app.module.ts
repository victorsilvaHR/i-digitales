import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CountdownComponent } from './countdown/countdown.component';
import { DemoComponent } from './demo/demo.component';
import { EventoComponent } from './evento/evento.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { InvitacionComponent } from './invitacion/invitacion.component';
import { LoginComponent } from './login/login.component';
import { RegistroComponent } from './registro/registro.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    CountdownComponent,
    DemoComponent,
    EventoComponent,
    HeaderComponent,
    HomeComponent,
    InvitacionComponent,
    LoginComponent,
    RegistroComponent,
    UsuariosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
