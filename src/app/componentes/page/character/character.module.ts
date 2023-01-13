import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CharacterDetailsComponent } from './character-details/character-details.component';
import { CharacterListComponent } from './character-list/character-list.component';
import { RouterModule } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';


const meuComponente = [CharacterDetailsComponent, CharacterListComponent];

@NgModule({
  declarations: [... meuComponente],
  imports: [
    CommonModule,
    RouterModule,
    NgxPaginationModule,
    InfiniteScrollModule
  ],
  exports: [... meuComponente]
})
export class CharacterModule { }
