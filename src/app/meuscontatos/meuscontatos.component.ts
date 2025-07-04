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
  categoriaFiltro: string = 'todos'; 
  favoritoFiltro: string = 'todos';  


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
      filtrarPorCategoria(categoria: string): void {
    this.categoriaFiltro = categoria;
    this.aplicarFiltros(); 
  }

  filtrarPorFavorito(filtro: string): void {
    this.favoritoFiltro = filtro;
    this.aplicarFiltros(); 
  }

  


  
  aplicarFiltros(): void {
    let contatosFiltrados = this.contatos; 

    
    if (this.categoriaFiltro !== 'todos') {
      contatosFiltrados = contatosFiltrados.filter(contato => 
        contato.categoria === this.categoriaFiltro
      );
    }

    
    if (this.favoritoFiltro === 'favoritos') {
      contatosFiltrados = contatosFiltrados.filter(contato => 
        contato.favorito === true
      );
    }

    
    if (this.termoBusca) {
      const termo = this.termoBusca.toLowerCase().trim();
      contatosFiltrados = contatosFiltrados.filter(contato =>
        contato.nome.toLowerCase().includes(termo) ||
        contato.apelido.toLowerCase().includes(termo) ||
        contato.telefone.toLowerCase().includes(termo) ||
        contato.email.toLowerCase().includes(termo)
      );
    }
    
    
    this.contatosFiltrados = contatosFiltrados;

    
    this.pesquisaAtiva = (
      this.categoriaFiltro !== 'todos' || 
      this.favoritoFiltro !== 'todos' || 
      !!this.termoBusca
    );
  }
   

delete(contato: Contato) {
 
  const confirmacao = confirm(`Tem certeza que deseja excluir o contato de "${contato.nome}"?`);

  
  if (confirmacao) {
    this.service.delete(contato).subscribe({
      next: () => {
        alert('Contato removido com sucesso!');
        this.loadContatos(); 
      },
    });
  }
  
}

  onClickupdate(contato: Contato) {
    this.isEditing = true;
    this.formGroupContato.setValue(contato);
  }

update() {
  if (this.formGroupContato.invalid) {
    alert('Por favor, preencha os campos obrigatórios.');
    return;
  }

  const contatoEditado = this.formGroupContato.value;

 
  if (this.contatos.some(c => c.email.toLowerCase() === contatoEditado.email.toLowerCase() && c.id !== contatoEditado.id)) {
    alert('Erro: Este email já pertence a outro contato.');
    return;
  }
  if (this.contatos.some(c => c.telefone === contatoEditado.telefone && c.id !== contatoEditado.id)) {
    alert('Erro: Este telefone já pertence a outro contato.');
    return;
  }

  
  this.service.update(contatoEditado).subscribe({
    next: () => {
      alert('Contato atualizado com sucesso!');
      this.loadContatos();
      this.isEditing = false;
      this.formGroupContato.reset();
    },
    error: (err) => {
      alert(`Ocorreu um erro ao atualizar: ${err.message}`);
    }
  });
}

  clear() {
    this.isEditing = false;
    this.formGroupContato.reset();
  }

} 