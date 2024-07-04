import { Injectable } from '@angular/core';
import { initializeApp } from "firebase/app";
import { child, get, getDatabase, ref, set } from "firebase/database";
import { User } from 'firebase/auth';
import { environment } from 'src/environments/enviroment';


@Injectable({
  providedIn: 'root'
})
export class DataService {
    usuarioById(uid: any) {
      throw new Error('Method not implemented.');
    }

    app = initializeApp(environment.firebaseConfig);
    db = getDatabase(this.app);

    usuarios = {
      email:'mail@mail.com',
      idevento:'mailboda',
      nombreUser:'Juan Perez',
      nombreEvento:'boda',
      telefono:'1234567890'
    };

    cargarData() {
    // recibe BD, ruta/nodo, Object puede o no llevar llaves
    // set(ref(this.db, 'users/'+this.usuario.uid), this.usuario);
      // set(ref(this.db, 'operadores/'), this.pilotos);
      set(ref(this.db, 'usuarios/'), this.usuarios);
      
    }

    async consulta(): Promise<any> {
      try {
        const dbRef = ref(getDatabase());
        const snapshot = await get(child(dbRef, `/usuarios`));
        
        if (snapshot.exists()) {
          console.log(snapshot.val())
          return snapshot.val();
        } else {
          console.log("No data available");
          return null;
        }
      } catch (error) {
        console.error(error);
        throw error;
      }
    }
    crearUserFb(user : User){
      set(ref(this.db, 'usuarios/'),user);
    }
 
}