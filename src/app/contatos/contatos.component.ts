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
      this.service.save(this.formGroupContato.value).subscribe(
        {
          next: json => {
            this.contatos.push(json);
            this.formGroupContato.reset()
          }
        }
      )
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
     this.service.update(this.formGroupContato.value).subscribe(
      {
        next: () =>{ this.loadContatos();
          this.isEditing=false;
        this.formGroupContato.reset()
        }
      }
     )
      }
}


