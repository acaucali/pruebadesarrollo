import { Injectable } from "@angular/core";
import { URL_BACKEND } from "src/app/config/config";
import { HttpClient, HttpHeaders, HttpRequest, HttpEvent } from '@angular/common/http';
import { Router } from "@angular/router";
import { Tarjeta } from "./tarjeta";
import { map, catchError } from 'rxjs/operators';
import { Observable, of , throwError} from 'rxjs';
import swal from 'sweetalert2';

@Injectable()

export class TarjetaService {

  private urlEndPoint:string =URL_BACKEND+'/api/pruebadesarrollo/tarjeta';
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
  public tarjetas: Tarjeta[] | undefined;

  constructor(private http: HttpClient, private router: Router) { }

  getTarjetasList(){
    return this.http.get(this.urlEndPoint).pipe(map(res =>{
      this.tarjetas = res as Tarjeta[];
      return this.tarjetas;
    }));
  }

  getTarjetas(page: number): Observable<any> {
    //return of(tarjetas);
    return this.http.get(this.urlEndPoint+ '/page/'+page).pipe(
      map((response: any) => {
        (response.content as Tarjeta[]).map(tarjeta=>{
          return tarjeta;
        });
        return response;
      })
    );
  }

  create(tarjeta: Tarjeta) : Observable<any>{
    return this.http.post<any>(this.urlEndPoint, tarjeta, {headers: this.httpHeaders}).pipe(
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

  getTarjeta(id: any): Observable<Tarjeta>{
    return this.http.get<Tarjeta>(`${this.urlEndPoint}/${id}`).pipe(
      catchError(e=>{
        this.router.navigate(['/tarjetas']);
        console.error(e.error.mensaje);
        swal.fire('Error al editar', e.error.mensaje, 'error');
        return throwError(e);
      })
    );
  }

  update(tarjeta: Tarjeta): Observable<any>{
    return this.http.put<any>(`${this.urlEndPoint}/${tarjeta.tarjetaId}`, tarjeta, {headers: this.httpHeaders }).pipe(
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

  delete(id: number): Observable<Tarjeta>{
    return this.http.delete<Tarjeta>(`${this.urlEndPoint}/${id}`,{headers: this.httpHeaders }).pipe(
      catchError(e =>{
        console.error(e.error.mensaje);
        swal.fire(e.error.mensaje, e.error.error, 'error');
        return throwError(e);
      })
    );
  }


}


