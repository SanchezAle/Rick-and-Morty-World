import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

import { Character } from 'src/app/shared/models/character.model';
import { ApiDataResponse } from 'src/app/shared/models/apiDataResponse.model';
import { Episodes } from 'src/app/shared/models/episodes.models';
import { Location } from 'src/app/shared/models/locationCharacter.model';

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

  getCharacters() {
    const endPointCharacters = `${this.endPoint}/character`;
    this.charactersForPage$.next(endPointCharacters);
  }

  getCharactersForPage(url: string) {
    return this.http.get<ApiDataResponse>(url);
  }

  getOneCharacter(param: string = '') {
    const url = `${this.endPoint}/character/${param}`;
    return this.http.get<Character>(url);
  }

  getLocation(param: string = '') {
    const url = `${this.endPoint}/location/${param}`;
    return this.http.get<Location>(url);
  }

  searchEpisodeName(url: string) {
    return this.http.get<Episodes>(url);
  }
}
