import { Injectable } from '@angular/core';
import { tap, Subject } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Character } from 'src/app/shared/models/character.model';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {

  newFavorite$: Subject<Character> = new Subject();

  /**
   * Esta funcion ejecuta la logica del servicio, en cuanto si un personaje sera agregado o eliminado de la lista de favoritos.
   * @param character objeto con la informacion del personaje
   * @returns
   */
  private favoriteInteractive(character: Character) {
    const favoriteList = this.getFavorites();
    const verifyCharacter = this.verifyCharacter(character.id, favoriteList);

    if(!verifyCharacter) return this.addFavorite(character, favoriteList);
    if(verifyCharacter) return this.removeFavorite(verifyCharacter, favoriteList);
  }

  /**
   * Agrega un personaje a la lista de favoritos ubicada en localStorage con el id "Favorites"
   * @param character objeto con la informacion del personaje
   * @param list lista de favoritos
   */
  private addFavorite(character: Character, list: any) {
    const listUpdated = list;
    const { url, type, ...restCharacter } = character;
    listUpdated.push(restCharacter);
    const newFavorite = JSON.stringify(listUpdated);
    localStorage.setItem('Favorites', newFavorite);
    this.matSnackBar.open(`${character.name} ha sido añadido a favoritos`, 'Aceptar', { duration: 1 * 1000 });
  }

  /**
   * Elimina un personaje a la lista de favoritos ubicada en localStorage con el id "Favorites"
   * @param character objeto con la informacion del personaje
   * @param list lista de favoritos
   */
  private removeFavorite(character: Character, list: Character[]) {
    const removeFavorite = list.filter(favorite => favorite.id !== character.id);
    const listUpdated = JSON.stringify(removeFavorite);
    localStorage.setItem('Favorites', listUpdated);
    this.matSnackBar.open(`${character.name} ha sido eliminado de favoritos`, 'Aceptar', { duration: 1 * 1000 });
  }

  // Inicializa la lista de favoritos en el localStorage en el caso que no exista
  private initFavorites() {
    const favoritesAll = localStorage.getItem('Favorites');
    if(!favoritesAll) localStorage.setItem('Favorites', '[]');
  }

  /**
   * Verifica que un personaje exista en la lista de personajes
   * @param id string que es el id del personaje
   * @param favorieList array con la lista de personajes en favoritos
   * @returns de ser true, devuelve el personaje. De ser false, devuelve undefined
   */
  private verifyCharacter(id: number, favorieList: Character[]): any {
    return favorieList.find(character => character.id === id);
  }

  // Obtiene la lista de personajes contenido en localStorage
  getFavorites() {
    const favorites = localStorage.getItem('Favorites');
    if(favorites) return JSON.parse(favorites);
  }

  constructor( private matSnackBar: MatSnackBar ) {

    // Captura la accion del usuario en otros componentes si quiere almacenar o eliminar de favoritos un personaje
    this.newFavorite$
      .pipe(
        tap(character => this.favoriteInteractive(character)),
        tap(character => console.log('Personaje seleccionado', character)),
      )
      .subscribe();

    this.initFavorites();
  }

}
