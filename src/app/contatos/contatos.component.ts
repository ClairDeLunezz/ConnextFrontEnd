import { Component } from '@angular/core';
import { Contato } from './contato';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContatoService } from '../contato.service';

@Component({
  selector: 'app-contatos',
  standalone: false,
  templateUrl: './contatos.component.html',
  styleUrl: './contatos.component.css'
})
export class ContatosComponent {
contatos: Contato[]= [];
  formGroupContato : FormGroup
  isEditing: boolean=false;

  constructor(private service: ContatoService,
              private formBuilder:  FormBuilder
  ){
      this.formGroupContato = formBuilder.group({
    id:[],
    nome:['',Validators.required],
    apelido:[],
    telefone:['',Validators.required],
    email:[],
    endereco:[],
    aniversario:[],
    categoria:[],
    genero:[],
    profissao:[],
    nacionalidade:[],
    favorito:[]
      });

  }

  get f() { return this.formGroupContato.controls; }

  ngOnInit(): void {
    this.loadContatos();
  }

  loadContatos(){
    this.service.getAll().subscribe({
      next: json => this.contatos = json
   });
  }
  
save() {
  if (this.formGroupContato.invalid) {
    alert('Por favor, preencha os campos obrigatórios.');
    return;
  }

  const novoContato = this.formGroupContato.value;




  if (this.contatos.some(contato => contato.email === novoContato.email)) {
    alert('Erro: Este email já existe na sua lista de contatos.');
    return; 
  }

  
  if (this.contatos.some(contato => contato.telefone === novoContato.telefone)) {
    alert('Erro: Este telefone já existe na sua lista de contatos.');
    return; 
  }
  this.service.save(novoContato).subscribe({
    next: () => {
      alert('Contato salvo com sucesso!');
      this.loadContatos();
      this.formGroupContato.reset();
    },
    error: (err) => {
      alert(`Ocorreu um erro no servidor: ${err.message}`);
    }
  });
}
    delete(contato: Contato) {
      this.service.delete(contato).subscribe({
        next: ()  => this.loadContatos()
          
        
      }
    )
  }
  onClickupdate(contato: Contato) {
    this.isEditing=true;
   this.formGroupContato.setValue(contato);
    }
  clear(){

    this.isEditing=false;
    this.formGroupContato.reset()
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
}


