import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import swal from 'sweetalert2';
import { Tarjeta } from '../model/tarjeta';
import { TarjetaService } from '../model/tarjeta.service';
import { TarjetaComponent } from '../tarjeta.component';
import { ModalService } from './modal.service';

@Component({
  selector: 'detalle-tarjeta',
  templateUrl: './detalle-tarjeta.component.html',
  styleUrls: ['./detalle-tarjeta.component.css']
})
export class DetalleTarjetaComponent implements OnInit {

  
  private errores: string[];
  @Input() tarjeta: Tarjeta;
  
  titulo: string = "Datos de la tarjeta";
  constructor(public modalservice: ModalService, private router: Router, 
    private activatedRoute: ActivatedRoute, private tarjetaService: TarjetaService, private tarjetaComponent: TarjetaComponent) { }

  ngOnInit(): void {
  }

  create(): void{
    this.tarjetaService.create(this.tarjeta).subscribe(
      json => {
      swal.fire('Nueva Tarjeta', `${json.mensaje}`, 'success');
      this.cerrarModal();
      this.tarjetaComponent.getTarjetas();
    },
    err =>{
      this.errores = err.error.errors as string[];
      console.error('Código error: '+err.status);
      console.error(err.error.errors);
    }
    );
  }

  

  cerrarModal(){
    this.modalservice.cerrarModal();
  }

}
