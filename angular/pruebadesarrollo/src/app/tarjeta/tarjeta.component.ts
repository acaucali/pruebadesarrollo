import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { ModalConsultaService } from './consultar-tarjeta/modal.service';
import { ModalService } from './detalle-tarjeta/modal.service';
import { ModalEnrolarService } from './enrolar-tarjeta/modal.service';
import { Tarjeta } from './model/tarjeta';
import { TarjetaService } from './model/tarjeta.service';

@Component({
  selector: 'app-tarjeta',
  templateUrl: './tarjeta.component.html',
  styleUrls: ['./tarjeta.component.css']
})
export class TarjetaComponent implements OnInit {

  pageTarj: number =1;
 

  tarjetas: Tarjeta[];
  paginador: any;
  tarjetaSeleccionada: Tarjeta;

  elements: any = [];
  previous: any = [];

  firstItemIndex;
  lastItemIndex;

  constructor(private tarjetasService: TarjetaService,
    public modalservice: ModalService, public consultaModal: ModalConsultaService, public enrolarModal: ModalEnrolarService) { }

  ngOnInit(): void {
    this.getTarjetas();
  }

  delete(tarjeta: Tarjeta): void{

    
    var numero = tarjeta.numeroTarjeta.toString().substring(0, 6) + '****' + tarjeta.numeroTarjeta.toString().substring(10);
    Swal.fire({
      title: 'Está seguro?',
      text:  `¿Seguro que desea eliminar la tarjeta ${numero} ?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!',
      cancelButtonText: 'No, cancelar!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.tarjetasService.delete(tarjeta.tarjetaId).subscribe(
          response =>{
            this.getTarjetas();
            Swal.fire(
              'Tarjeta eliminada!',
              'La tarjeta se ha eliminada con éxito',
              'success'
            )
          }
        )
      }
    })

  }
  
  abrirModal(tarjeta: Tarjeta){
    this.tarjetaSeleccionada= tarjeta;
    this.consultaModal.abrirModal();
  }

  crearTarjeta(){
    this.tarjetaSeleccionada = new Tarjeta();
    this.modalservice.abrirModal();
  }

  enrolarTarjeta(){
    
    this.enrolarModal.abrirModal();
  }
  
  getTarjetas(){
    this.tarjetas = null;
    this.elements = [];
    this.previous = [];
    this.tarjetasService.getTarjetasList().subscribe(response =>{
      this.tarjetas = response;
      if(this.tarjetas.length >0){
        this.tarjetas.forEach(tar =>{
          var numero = tar.numeroTarjeta.toString().substring(0, 6) + '****' + tar.numeroTarjeta.toString().substring(10);
          this.elements.push({tarjetaId: tar.tarjetaId, numeroTarjeta: numero, titular: tar.titular, 
            cedula: tar.cedula, tipo: tar.tipo, telefono: tar.telefono, estado: tar.estado});
        });
      }
      
    });
  }

}
