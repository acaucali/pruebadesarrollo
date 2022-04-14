import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './inicio/inicio.component';
import { TarjetaComponent } from './tarjeta/tarjeta.component';
import { TransaccionComponent } from './transaccion/transaccion.component';

const routes: Routes = [

  {path: '', redirectTo: '/inicio', pathMatch: 'full'},
  {path: 'tarjetas', component: TarjetaComponent},
  {path: 'transaccion', component: TransaccionComponent},
  {path: 'inicio', component: InicioComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
