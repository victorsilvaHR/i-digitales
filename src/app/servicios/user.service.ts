import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { initializeApp } from 'firebase/app';
import { getAuth, signOut, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { environment } from 'src/environments/enviroment';
@Injectable({
    providedIn: 'root'
  })
  export class UserService {
  createInvitacion(invitacion: { idEvento: string; nombre: string; noInvitados: string; descripcion: string; noMesa: string; }) {
    throw new Error('Method not implemented.');
  }
  
      constructor(private router: Router,) {}
  
      app = initializeApp(environment.firebaseConfig);
      private auth = getAuth();
      private uid = '';
      private isLoggedIn = false;
      newUid = '';
  
        async singIn(email: string, password: string): Promise<any> {
          try {
            const credentials = await signInWithEmailAndPassword(this.auth, email, password);
            this.uid = credentials.user.uid;
            this.loginUser();
            this.router.navigateByUrl('/home');
            return credentials.user;
          } catch (error: any) {
            console.log(error);
          }
        }
      createUser(email: string, password: string): Promise<any>{
         return createUserWithEmailAndPassword(this.auth, email, password);
      }
      logOut() {
          signOut(this.auth).then(() => {
          this.logOutUser();
          this.router.navigateByUrl('/');
            }).catch((error) => {
              console.log('Error de Logout', error);
            });
      }
      loginUser() {
        sessionStorage.setItem('uid', this.uid);
        this.isLoggedIn = true;
      }
      logOutUser(){
        sessionStorage.removeItem('uid');
        this.isLoggedIn = false;
      }
      getIsLoged (){
        const sessionTrue = sessionStorage.getItem('uid');
        this.isLoggedIn = sessionTrue !== null ? true : false;
        return this.isLoggedIn;
      }
  }