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

  // Notifica a los componentes que hay una nueva lista de caracteres
  getCharacters() {
    const endPointCharacters = `${this.endPoint}character`;
    this.charactersForPage$.next(endPointCharacters);
  }

  // Obtiene una lista de personajes paginados por la api, hasta 20 personajes en el response
  getCharactersForPage(url: string) {
    return this.http.get<ApiDataResponse>(url);
  }

  /**
   * Obtiene la informacion detallada de un personaje especifico por su id
   * @param param string
   * @returns objeto con la informacion del personaje
   */
  getOneCharacter(param: string = '') {
    const url = `${this.endPoint}character/${param}`;
    return this.http.get<Character>(url);
  }

  /**
   * Obtiene la informacion detallada de una location especificada por su id
   * @param param string
   * @returns objeto con la informacion del location
   */
  getLocation(param: string = '') {
    const url = `${this.endPoint}location/${param}`;
    return this.http.get<Location>(url);
  }

  /**
   * Obtiene la informacion detallada de un episodio especificado por su id
   * @param url string
   * @returns objeto con la informacion de un episodio
   */
  searchEpisodeName(url: string) {
    return this.http.get<Episodes>(url);
  }
}
