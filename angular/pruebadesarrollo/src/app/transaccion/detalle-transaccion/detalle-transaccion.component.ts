import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Transaccion } from '../model/transaccion';
import { TransaccionService } from '../model/transaccion.service';
import { TransaccionComponent } from '../transaccion.component';
import { ModalService } from './modal.service';
import swal from 'sweetalert2';

@Component({
  selector: 'detalle-transaccion',
  templateUrl: './detalle-transaccion.component.html',
  styleUrls: ['./detalle-transaccion.component.css']
})
export class DetalleTransaccionComponent implements OnInit {

  private errores: string[];
  @Input() transaccion: Transaccion;
  public numero: number;
  
  titulo: string = "Datos de la transacción";
  constructor(public modalservice: ModalService, private router: Router, 
    private activatedRoute: ActivatedRoute, private transaccionService: TransaccionService, private transaccionComponent: TransaccionComponent) { }

  ngOnInit(): void {
  }

  create(): void{
    this.transaccionService.create(this.transaccion, this.numero).subscribe(
      json => {
      swal.fire('Nueva Transacción', `${json.mensaje}`, 'success');
      this.cerrarModal();
      this.transaccionComponent.getTransacciones();
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
