import { Component, OnInit } from '@angular/core';
import { Tarjeta } from './model/tarjeta';
import swal from 'sweetalert2';
import { TarjetaService } from './model/tarjeta.service';
import { ModalService } from './detalle-tarjeta/modal.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tarjeta',
  templateUrl: './tarjeta.component.html',
  styleUrls: ['./tarjeta.component.css']
})
export class TarjetaComponent implements OnInit {

  pageCali: number =1;
 

  tarjetas: Tarjeta[] | undefined;
  paginador: any;
  tarjetaSeleccionada: Tarjeta | undefined;

  elements: any = [];
  previous: any = [];

  firstItemIndex: any;
  lastItemIndex: any;

  constructor(private tarjetaService: TarjetaService,
    public modalservice: ModalService, 
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
  }

  /* metodos calificaciones */

  delete(tarjeta: Tarjeta): void{
    swal.fire({
      title: 'Está seguro?',
      text:  `¿Seguro que desea eliminar la calificación ${tarjeta.numeroTarjeta} ?`,
      type: 'warning',
      showCancelButton: true,
      confirmButtonClass: 'btn btn-success',
      cancelButtonClass: 'btn btn-danger',
      confirmButtonText: 'Si, eliminar!',
      cancelButtonText: 'No, cancelar!',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33'
    }).then((result) => {
      if (result.value) {
        this.tarjetaService.delete(tarjeta.tarjetaId).subscribe(
          response =>{
            this.getTarjetas();
            swal.fire(
              'Calificación eliminada!',
              'La calificación se ha eliminado con éxito',
              'success'
            )
          }
        )
        
      }
    })
  }
  
  abrirModal(tarjeta: Tarjeta){
    this.tarjetaSeleccionada= tarjeta;
    this.modalservice.abrirModal();
  }

  crearTarjeta(){
    this.tarjetaSeleccionada = new Tarjeta();
    this.modalservice.abrirModal();
  }
  
    
  getTarjetas(){
    this.tarjetas = null;
    this.elements = [];
    this.previous = [];
    this.calificacionesService.getCalificacionesList().subscribe(response =>{
      this.calificaciones = response;
      if(this.calificaciones.length >0){
        this.calificaciones.forEach(cal =>{
          this.elements.push({calificacionesRiesgoId: cal.calificacionesRiesgoId, calificacionesRiesgo: cal.calificacionesRiesgo, calificacionesRiesgoMaximo: cal.calificacionesRiesgoMaximo, 
            calificacionesRiesgoMinimo: cal.calificacionesRiesgoMinimo, calificacionesRiesgoColor: cal.calificacionesRiesgoColor, calificacionesRiesgoAccion: cal.calificacionesRiesgoAccion});
        });
      }
      
    });
  }

}
