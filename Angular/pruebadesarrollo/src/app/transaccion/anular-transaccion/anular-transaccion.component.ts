import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import swal from 'sweetalert2';
import { TransaccionService } from '../model/transaccion.service';
import { TransaccionComponent } from '../transaccion.component';
import { ModalAnularService } from './modal.service';

@Component({
  selector: 'app-anular-transaccion',
  templateUrl: './anular-transaccion.component.html',
  styleUrls: ['./anular-transaccion.component.css']
})
export class AnularTransaccionComponent implements OnInit {

  private errores: string[];
  
  public numero: number;
  public identificador: number;
  
  titulo: string = "Enrolar tarjeta";
  constructor(public modalservice: ModalAnularService, private router: Router, 
    private activatedRoute: ActivatedRoute, private transaccionService: TransaccionService, private transaccionComponent: TransaccionComponent) { }

  ngOnInit(): void {
  }

  enrolar(): void{

      this.transaccionService.update(this.identificador, this.numero).subscribe(json =>{
        swal.fire('Tarjeta Actualizada',  `${json.mensaje}`, 'success')
        this.cerrarModal();
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
