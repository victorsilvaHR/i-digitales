
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/enviroment';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

        constructor(
            private http: HttpClient,
        )  { }

        getAll(table: string): Observable<any> {
            
            const params = new HttpParams().set('table', table);
            return this.http.get(`${environment.dev}${environment.endpoints.query}`, { params });
          
          }
          createUser(newUser: any){
            const headers = new HttpHeaders({
               'Content-Type': 'application/json',
               'X-Auth-Token': environment.auth
               });

            return this.http.post(environment.dev + environment.endpoints.postUser, JSON.stringify(newUser), { headers });
            
          }
          getById(tabla: string, campo: string, valor: string): Observable<any> {
            const headers = new HttpHeaders({
              'Content-Type': 'application/json',
              'X-Auth-Token': environment.auth
            });
          
            let params = new HttpParams()
              .set('tabla', tabla)
              .set('campo', campo)
              .set('valor', valor);
          
            return this.http.get(environment.dev + environment.endpoints.custom, { headers, params })
            .pipe(
              catchError((error: HttpErrorResponse) => {
                console.error('Error al hacer la solicitud', error);
                return throwError(() => new Error('Error al hacer la solicitud: ' + error.message));
              })
            );
          }
          
          createEvento(evento: any){
            const headers = new HttpHeaders({
               'Content-Type': 'application/json',
               'X-Auth-Token': environment.auth
               });

            return this.http.post(environment.dev + environment.endpoints.postEvento, JSON.stringify(evento), { headers });
            
          }
          createInvitacion(invitacion: any){
            const headers = new HttpHeaders({
              'Content-Type': 'application/json',
              'X-Auth-Token': environment.auth
            });
        
            return this.http.post(environment.dev + environment.endpoints.postInvitaciones, JSON.stringify(invitacion), { headers });
          }
}