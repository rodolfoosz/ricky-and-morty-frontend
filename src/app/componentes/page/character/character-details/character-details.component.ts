import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ICharacter } from '@app/shared/interfaces/ICharacter.interface';
import { PersonagemService } from '@app/shared/services/character.service';
import { Observable, take } from 'rxjs';

@Component({
  selector: 'app-character-details',
  templateUrl: './character-details.component.html',
  styleUrls: ['./character-details.component.scss']
})
export class CharacterDetailsComponent {
  personagem$: Observable<ICharacter>;

  constructor(
    private route: ActivatedRoute, 
    private personagemService: PersonagemService,
    private location: Location){}

    ngOnInit(){
      this.carregaDetalhePersonagem();
    }

    voltar(): void{
      this.location.back();
    }

    carregaDetalhePersonagem(){
      this.route.params.pipe(take(1)).subscribe((result) => {
        const id = result['id'];
        this.personagem$ = this.personagemService.getDetalhe(id);
      });
    }
}
