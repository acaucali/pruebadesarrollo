import { Component, OnInit } from '@angular/core';
import { ModalService } from './detalle-transaccion/modal.service';
import { Transaccion } from './model/transaccion';
import { TransaccionService } from './model/transaccion.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-transaccion',
  templateUrl: './transaccion.component.html',
  styleUrls: ['./transaccion.component.css']
})
export class TransaccionComponent implements OnInit {

  pageCali: number =1;
 

  transacciones: Transaccion[];
  paginador: any;
  transaccionSeleccionada: Transaccion;


  elements: any = [];
  previous: any = [];

  firstItemIndex;
  lastItemIndex;

  constructor(private transaccionesService: TransaccionService,
    public modalservice: ModalService) { }

  ngOnInit(): void {
    this.getTransacciones();
  }

  delete(transaccion: Transaccion): void{

    Swal.fire({
      title: 'Está seguro?',
      text:  `¿Seguro que desea eliminar la transación ${transaccion.numeroReferencia} ?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!',
      cancelButtonText: 'No, cancelar!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.transaccionesService.delete(transaccion.transaccionId).subscribe(
          response =>{
            this.getTransacciones();
            Swal.fire(
              'Transación eliminada!',
              'La transación se ha eliminado con éxito',
              'success'
            )
          }
        )
      }
    })

  }
  
  abrirModal(transaccion: Transaccion){
    this.transaccionSeleccionada= transaccion;
    this.modalservice.abrirModal();
  }

  crearTransaccion(){ 
    this.transaccionSeleccionada = new Transaccion();
    this.modalservice.abrirModal();
  }
  
  getTransacciones(){
    this.transacciones = null;
    this.elements = [];
    this.previous = [];
    this.transaccionesService.getTransaccionesList().subscribe(response =>{
      this.transacciones = response;
      if(this.transacciones.length >0){
        this.transacciones.forEach(tra =>{
          this.elements.push({transaccionId: tra.transaccionId, numeroReferencia: tra.numeroReferencia, totalCompra: tra.totalCompra, 
            direccionCompra: tra.direccionCompra, estado: tra.estado});
        });
      }
      
    });
  }

}
