import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { ContatosComponent } from './contatos/contatos.component';
import { MeuscontatosComponent } from './meuscontatos/meuscontatos.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { provideHttpClient } from '@angular/common/http';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    FooterComponent,
    ContatosComponent,
    MeuscontatosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    ReactiveFormsModule,
    FormsModule,
    NgxMaskDirective, 
    NgxMaskPipe
  ],
  providers: [provideHttpClient(),
    provideNgxMask()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
