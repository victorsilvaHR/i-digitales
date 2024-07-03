import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { initializeApp } from 'firebase/app';
import { getAuth, signOut, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { environment } from 'src/environments/environment';
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
      private isLoggedIn = false;
      newUid = '';
  
        async singIn(email: string, password: string): Promise<any> {
          try {
            const credentials = await signInWithEmailAndPassword(this.auth, email, password);
            this.router.navigateByUrl('/home');
            return credentials.user;
          } catch (error: any) {
            console.log(error);
          }
        }
      createUser(email: string, password: string): Promise<any>{
         return createUserWithEmailAndPassword(this.auth, email, password);
          // .then((userCredential) => {
          //     const user = userCredential.user;
          //     console.log(user);
          // })
          // .catch((error) => {
          //     const errorCode = error.code;
          //     const errorMessage = error.message;
          //     console.log(errorCode, errorMessage);
          // })
      }
      logOut() {
          signOut(this.auth).then(() => {
           sessionStorage.removeItem('uid');
          this.router.navigateByUrl('/');
            }).catch((error) => {
              console.log('Error de Logout', error);
            });
      }
      loginUser() {
        this.isLoggedIn = true;

      }
     logOutUser(){
      this.isLoggedIn = false;
     }
     getIsLoged (){
      return this.isLoggedIn;
     }
  }