import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { initializeApp } from 'firebase/app';
import { getAuth, signOut, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { environment } from 'src/environments/environment';
@Injectable({
    providedIn: 'root'
  })
  export class UserService {
  
      constructor(private router: Router,) {}
  
      app = initializeApp(environment.firebaseConfig);
      private auth = getAuth();
      private uid: any = {}  ;
      private isLoggedIn = false;
      newUid = '';
  
      async singIn(email: string, password: string): Promise<any> {
        try {
          const credentials = await signInWithEmailAndPassword(this.auth, email, password);
          this.uid = {
            mail: credentials.user.email,
            token: credentials.user.uid
          };
          console.log(this.uid)
          this.loginUser();
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
        sessionStorage.setItem('mail',this.uid.mail );
        sessionStorage.setItem('token',this.uid.token );

        this.isLoggedIn = true;
      }
      logOutUser(){
        sessionStorage.removeItem('mail');
        sessionStorage.removeItem('currentUser');
        this.isLoggedIn = false;
      }
      getIsLoged (){
        const sessionTrue = sessionStorage.getItem('mail');
        this.isLoggedIn = sessionTrue !== null ? true : false;
        return this.isLoggedIn;
      }
  }