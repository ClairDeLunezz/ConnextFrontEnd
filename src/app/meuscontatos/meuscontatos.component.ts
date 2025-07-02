import { Component, OnInit } from '@angular/core';
import { ContatoService } from '../contato.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; // Importei o Validators para exemplo
import { Contato } from '../contatos/contato';

@Component({
  selector: 'app-meuscontatos',
  templateUrl: './meuscontatos.component.html',
  standalone: false,
  styleUrl: './meuscontatos.component.css'
})
export class MeuscontatosComponent implements OnInit {


  contatos: Contato[] = [];
  contatosFiltrados: Contato[] = [];
  formGroupContato: FormGroup;
  isEditing: boolean = false;
  termoBusca: string = '';
  pesquisaAtiva: boolean = false;


  constructor(private service: ContatoService, private formBuilder: FormBuilder) {
    this.formGroupContato = formBuilder.group({
      id: [],
      nome: ['', Validators.required], 
      apelido: [''],
      telefone: [''],
      email: ['', Validators.email], 
      endereco: [''],
      aniversario: [''],
      categoria: [''],
      genero: [''],
      profissao: [''],
      nacionalidade: [''],
      favorito: [false]
    });
  }

   get f() { return this.formGroupContato.controls; }
 
  ngOnInit(): void {
    this.loadContatos();
  }


  loadContatos() {
    this.service.getAll().subscribe({
      next: json => {
        this.contatos = json;
        this.contatosFiltrados = json;
      }
    });
  }



pesquisar(): void {
  
  if (!this.termoBusca) {
    this.pesquisaAtiva = false;
    this.contatosFiltrados = [];
    return;
  }


  this.pesquisaAtiva = true; 
  const termo = this.termoBusca.toLowerCase().trim();

  
  this.contatosFiltrados = this.contatos.filter(contato => {
 
    return (
      contato.nome.toLowerCase().includes(termo) ||
      contato.apelido.toLowerCase().includes(termo) ||
      contato.telefone.toLowerCase().includes(termo) ||
      contato.email.toLowerCase().includes(termo)
    );
  });
}
    
   

  delete(contato: Contato) {
    this.service.delete(contato).subscribe({
      next: () => this.loadContatos()
    });
  }

  onClickupdate(contato: Contato) {
    this.isEditing = true;
    this.formGroupContato.setValue(contato);
  }

  update() {
    this.service.update(this.formGroupContato.value).subscribe({
      next: () => {
        this.loadContatos();
        this.isEditing = false;
        this.formGroupContato.reset();
      }
    });
  }

  clear() {
    this.isEditing = false;
    this.formGroupContato.reset();
  }

} 