import { Injectable } from '@angular/core';

import { Observable, of , throwError} from 'rxjs';
import { HttpClient, HttpHeaders, HttpRequest, HttpEvent } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import swal from 'sweetalert2';
import { Router } from '@angular/router';

import { URL_BACKEND } from 'src/app/config/config';
import { Transaccion } from './transaccion';

@Injectable()

export class TransaccionService {

  private urlEndPoint:string =URL_BACKEND+'api/pruebadesarrollo/transaccion/transaccion';
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
  public transacciones: Transaccion[];

  constructor(private http: HttpClient, private router: Router) { }

  getTransaccionesList(){
    return this.http.get(this.urlEndPoint).pipe(map(res =>{
      this.transacciones = res as Transaccion[];
      return this.transacciones;
    }));
  }

  getTransacciones(page: number): Observable<any> {
    //return of(transacciones);
    return this.http.get(this.urlEndPoint+ '/page/'+page).pipe(
      map((response: any) => {
        (response.content as Transaccion[]).map(transaccion=>{
          return transaccion;
        });
        return response;
      })
    );
  }

  create(transaccion: Transaccion, id: number) : Observable<any>{
    return this.http.post<any>(`${this.urlEndPoint}/${id}`, transaccion, {headers: this.httpHeaders}).pipe(
      catchError(e =>{
        if(e.status==400){
          return throwError(e);
        }
        console.error(e.error.mensaje);
        swal.fire(e.error.mensaje,e.error.error, 'error');
        return throwError(e);
      })
    );
  }

  getTransaccion(id): Observable<Transaccion>{
    return this.http.get<Transaccion>(`${this.urlEndPoint}/${id}`).pipe(
      catchError(e=>{
        this.router.navigate(['/transacciones']);
        console.error(e.error.mensaje);
        swal.fire('Error al editar', e.error.mensaje, 'error');
        return throwError(e);
      })
    );
  }

  update(id: number, numero: number): Observable<any>{
    return this.http.put<any>(`${this.urlEndPoint}/${id}/${numero}`, {headers: this.httpHeaders }).pipe(
      catchError(e =>{
        if(e.status==400){
          return throwError(e);
        }
        console.error(e.error.mensaje);
        swal.fire(e.error.mensaje, e.error.error, 'error');
        return throwError(e);
      })
    );
  }

  delete(id: number): Observable<Transaccion>{
    return this.http.delete<Transaccion>(`${this.urlEndPoint}/${id}`,{headers: this.httpHeaders }).pipe(
      catchError(e =>{
        console.error(e.error.mensaje);
        swal.fire(e.error.mensaje, e.error.error, 'error');
        return throwError(e);
      })
    );
  }


}
