import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environment/environment';
import { ICharacter } from '../interfaces/ICharacter.interface';
import { catchError, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PersonagemService {

  constructor(private httpClient: HttpClient) { }

  buscarPersonagem(param = '', page = 1): Observable<ICharacter[]>{
    let filter = `/character/?name=${param}&page=${page}`;
    return this.httpClient.get<ICharacter[]>(
      `${environment.baseUrlAPI}${filter}`
    );
  }
  getDetalhe(id: number): Observable<ICharacter>{
    return this.httpClient.get<ICharacter>(`${environment.baseUrlAPI}/character/${id}`);
  }
}
