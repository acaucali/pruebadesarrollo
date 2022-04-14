import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { TarjetaComponent } from './tarjeta/tarjeta.component';
import { TransaccionComponent } from './transaccion/transaccion.component';
import { InicioComponent } from './inicio/inicio.component';
import { DetalleTarjetaComponent } from './tarjeta/detalle-tarjeta/detalle-tarjeta.component';
import { DetalleTransaccionComponent } from './transaccion/detalle-transaccion/detalle-transaccion.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    TarjetaComponent,
    TransaccionComponent,
    InicioComponent,
    DetalleTarjetaComponent,
    DetalleTransaccionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
