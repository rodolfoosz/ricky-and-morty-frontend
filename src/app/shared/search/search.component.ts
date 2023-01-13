import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  template: `
    <input 
      #inputBuscar
      autofocus
      type="text"
      class="form-control form-control-dark text-bg-dark"
      (keyup)="buscarPersonagem(inputBuscar.value)"
      aria-label="Search"
      placeholder="Buscar Personagem"/>
  `,
  styles: ['']
})
export class SearchComponent {
  constructor(private router: Router){}

  ngOnInit(): void {}

  buscarPersonagem(value: string): void {
    if(value){
      this.router.navigate(['/character-list'], {
        queryParams: {
          q: value
        }
      }); 
    }
  }
}
