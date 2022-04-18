import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';

import { Tarjeta } from '../model/tarjeta';
import { TarjetaService } from '../model/tarjeta.service';
import { TarjetaComponent } from '../tarjeta.component';
import { ModalConsultaService } from './modal.service';

@Component({
  selector: 'consultar-tarjeta',
  templateUrl: './consultar-tarjeta.component.html',
  styleUrls: ['./consultar-tarjeta.component.css']
})
export class ConsultarTarjetaComponent implements OnInit {

  private errores: string[];
  @Input() tarjeta: Tarjeta;
  
  titulo: string = "Datos de la tarjeta";
  constructor(public modalservice: ModalConsultaService, private router: Router, 
    private activatedRoute: ActivatedRoute, private tarjetaService: TarjetaService, private tarjetaComponent: TarjetaComponent) { }

  ngOnInit(): void {
  }

  cerrarModal(){
    this.modalservice.cerrarModal();
  }


}
