import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InicioComponent } from './inicio/inicio.component';
import { TarjetaComponent } from './tarjeta/tarjeta.component';
import { TransaccionComponent } from './transaccion/transaccion.component';
import { DetalleTransaccionComponent } from './transaccion/detalle-transaccion/detalle-transaccion.component';
import { HeaderComponent } from './header/header.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { TransaccionService } from './transaccion/model/transaccion.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { DetalleTarjetaComponent } from './tarjeta/detalle-tarjeta/detalle-tarjeta.component';
import { TarjetaService } from './tarjeta/model/tarjeta.service';
import { ConsultarTarjetaComponent } from './tarjeta/consultar-tarjeta/consultar-tarjeta.component';
import { EnrolarTarjetaComponent } from './tarjeta/enrolar-tarjeta/enrolar-tarjeta.component';
import { AnularTransaccionComponent } from './transaccion/anular-transaccion/anular-transaccion.component';

@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    TarjetaComponent,
    TransaccionComponent,
    DetalleTransaccionComponent,
    HeaderComponent,
    DetalleTarjetaComponent,
    ConsultarTarjetaComponent,
    EnrolarTarjetaComponent,
    AnularTransaccionComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    NgxPaginationModule
  ],
  providers: [TransaccionService, TarjetaService],
  bootstrap: [AppComponent]
})
export class AppModule { }
