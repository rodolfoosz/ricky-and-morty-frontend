import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [

  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },

  { path: 'home', loadChildren: () => import('./componentes/page/home/home.module').then(m => m.HomeModule) },

  { path: 'character-list', loadChildren: () => import('./componentes/page/character/character-list/character-list.module').then(m => m.CharacterListModule) },

  { path: 'character-details/:id', loadChildren: () => import('./componentes/page/character/character-details/character-details.module').then(m => m.CharacterDetailsModule) },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
