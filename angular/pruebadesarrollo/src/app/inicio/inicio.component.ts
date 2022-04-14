import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  public numero = 0;
  constructor() { }

  ngOnInit(): void {
  }

  generar(){
    this.numero=Math.floor((Math.random() * (100 - 1 + 1)) + 1);
  }

}
