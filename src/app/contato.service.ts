import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Contato } from './contatos/contato';

@Injectable({
  providedIn: 'root'
})
export class ContatoService {

   private apiurl = "https://connextbackend.duckdns.org/contatos"; 

  constructor(private http: HttpClient) {}

  getAll() : Observable <Contato[]>{
    return this.http.get<Contato[]>(this.apiurl)
  }
  save(contato: Contato): Observable<Contato>{
    return this.http.post<Contato>(this.apiurl,contato);
  }

  delete(contato: Contato): Observable<void>{
    return this.http.delete<void>(`${this.apiurl}/${contato.id}`);
  }

  update(contato: Contato) : Observable<Contato>{
    return this.http.put<Contato>(`${this.apiurl}/${contato.id}`,contato);
  }
}
