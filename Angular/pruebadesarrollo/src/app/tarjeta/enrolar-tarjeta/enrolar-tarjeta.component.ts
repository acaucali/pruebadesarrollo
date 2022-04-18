import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TarjetaService } from '../model/tarjeta.service';
import { TarjetaComponent } from '../tarjeta.component';
import { ModalEnrolarService } from './modal.service';
import swal from 'sweetalert2';

@Component({
  selector: 'enrolar-tarjeta',
  templateUrl: './enrolar-tarjeta.component.html',
  styleUrls: ['./enrolar-tarjeta.component.css']
})
export class EnrolarTarjetaComponent implements OnInit {

  private errores: string[];
  
  public numero: number;
  public identificador: number;
  
  titulo: string = "Enrolar tarjeta";
  constructor(public modalservice: ModalEnrolarService, private router: Router, 
    private activatedRoute: ActivatedRoute, private tarjetaService: TarjetaService, private tarjetaComponent: TarjetaComponent) { }

  ngOnInit(): void {
  }

  enrolar(): void{

      this.tarjetaService.update(this.identificador, this.numero).subscribe(json =>{
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
