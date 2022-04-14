import { Injectable } from "@angular/core";
import { URL_BACKEND } from "src/app/config/config";
import { HttpClient, HttpHeaders, HttpRequest, HttpEvent } from '@angular/common/http';
import { Router } from "@angular/router";

import { map, catchError } from 'rxjs/operators';
import { Observable, of , throwError} from 'rxjs';
import swal from 'sweetalert2';
import { Transaccion } from "./transaccion";

@Injectable()

export class TransaccionService {

  private urlEndPoint:string =URL_BACKEND+'/api/pruebadesarrollo/transaccion';
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
  public transacciones: Transaccion[] | undefined;

  constructor(private http: HttpClient, private router: Router) { }

  getTarjetasList(){
    return this.http.get(this.urlEndPoint).pipe(map(res =>{
      this.transacciones = res as Transaccion[];
      return this.transacciones;
    }));
  }

  getTarjetas(page: number): Observable<any> {
    //return of(tarjetas);
    return this.http.get(this.urlEndPoint+ '/page/'+page).pipe(
      map((response: any) => {
        (response.content as Transaccion[]).map(transaccion=>{
          return transaccion;
        });
        return response;
      })
    );
  }

  create(transaccion: Transaccion) : Observable<any>{
    return this.http.post<any>(this.urlEndPoint, transaccion, {headers: this.httpHeaders}).pipe(
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

  getCalificacion(id: any): Observable<Transaccion>{
    return this.http.get<Transaccion>(`${this.urlEndPoint}/${id}`).pipe(
      catchError(e=>{
        this.router.navigate(['/transaccion']);
        console.error(e.error.mensaje);
        swal.fire('Error al editar', e.error.mensaje, 'error');
        return throwError(e);
      })
    );
  }

  update(transaccion: Transaccion): Observable<any>{
    return this.http.put<any>(`${this.urlEndPoint}/${transaccion.transaccionId}`, transaccion, {headers: this.httpHeaders }).pipe(
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