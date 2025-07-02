import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContatosComponent } from './contatos/contatos.component';
import { HomeComponent } from './home/home.component';
import { MeuscontatosComponent } from './meuscontatos/meuscontatos.component';

const routes: Routes = [
   {path: 'contatos', component: ContatosComponent},
  {path:'', component: HomeComponent},
  {path: 'meuscontatos', component: MeuscontatosComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
