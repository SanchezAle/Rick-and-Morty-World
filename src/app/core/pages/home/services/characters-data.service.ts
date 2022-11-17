import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

import { Character } from 'src/app/shared/models/character.model';
import { ApiDataResponse } from 'src/app/shared/models/apiDataResponse.model';

@Injectable({
  providedIn: 'root'
})
export class CharactersDataService {

  private endPoint = 'https://rickandmortyapi.com/api/';

  public characterSummary: Subject<Character> = new Subject();
  
  public charactersForPage$: Subject<string> = new Subject();

  constructor(
    private http: HttpClient,
  ) { }

  getFirstCharacters() {
    const endPointCharacters = `${this.endPoint}/character`;
    this.charactersForPage$.next(endPointCharacters);
  }

  getCharactersForPage(url: string) {
    return this.http.get<ApiDataResponse>(url);
  }
}
