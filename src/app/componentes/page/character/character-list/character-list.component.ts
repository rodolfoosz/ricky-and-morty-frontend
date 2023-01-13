import { Component, Inject } from '@angular/core';
import { ActivatedRoute, NavigationEnd, ParamMap, Router } from '@angular/router';
import { ICharacter } from '@app/shared/interfaces/ICharacter.interface';
import { PersonagemService } from '@app/shared/services/character.service';
import { filter, take } from 'rxjs';
import { DOCUMENT } from '@angular/common';

type RequestInfo = {
  next : string;
};

@Component({
  selector: 'app-character-list',
  templateUrl: './character-list.component.html',
  styleUrls: ['./character-list.component.scss']
})
export class CharacterListComponent {
  personagens: ICharacter[] = [];

  info: RequestInfo = {
    next: '',
  };

  private pageNumber = 1;
  private query: string = '';
  private hiddeScrollHeight = 200;
  private showScrollHeigh = 500;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private personagemService: PersonagemService,
    private route: ActivatedRoute,
    private router: Router){
      this.onUrlChanged();
    }

  ngOnInit(): void{
    this.getPersonagensPorQueryParams();
  }

  private getPersonagensPorQueryParams(){
    this.route.queryParams.pipe(
      take(1)).subscribe((parametros: ParamMap) =>{
        this.query = parametros['q'];
        this.getBuscarPersonagemService();
      });
  };

  private onUrlChanged(): void{
    this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd)).subscribe(() =>{
        this.personagens = [];
        this.pageNumber = 1;
        this.getPersonagensPorQueryParams();
      });
  };

  private getBuscarPersonagemService(): void{
    this.personagemService.buscarPersonagem(this.query, this.pageNumber)
      .pipe(take(1)
      ).subscribe((data: any) =>{

        if(data?.results?.length){
          const {info, results} = data;
          this.personagens = [...this.personagens, ...results];
          this.info = info;
        }else{
          this.personagens = [];
        }
      });
  };

  onScrollDown(): void{
    if(this.info.next){
      this.pageNumber++;
      this.getBuscarPersonagemService();
    }
  };

  onScrollUp(): void{
    this.document.body.scrollTop = 0;
    this.document.documentElement.scrollTop = 0;
  };
}
