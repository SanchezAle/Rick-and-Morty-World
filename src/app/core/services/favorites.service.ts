import { Injectable } from '@angular/core';
import { tap, Subject } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Character } from 'src/app/shared/models/character.model';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {

  newFavorite$: Subject<Character> = new Subject();

  private favoriteInteractive(character: Character) {
    const favoriteList = this.getFavorites();
    const verifyCharacter = this.verifyCharacter(character.id, favoriteList);
   
    if(!verifyCharacter) return this.addFavorite(character, favoriteList);
    if(verifyCharacter) return this.removeFavorite(verifyCharacter, favoriteList);
  }

  private addFavorite(character: Character, list: any) {
    const listUpdated = list;
    const { url, type, ...restCharacter } = character;
    listUpdated.push(restCharacter);
    const newFavorite = JSON.stringify(listUpdated);
    localStorage.setItem('Favorites', newFavorite);
    this.matSnackBar.open(`${character.name} ha sido añadido a favoritos`, 'Aceptar');
  }

  private removeFavorite(character: Character, list: Character[]) {
    const removeFavorite = list.filter(favorite => favorite.id !== character.id);
    const listUpdated = JSON.stringify(removeFavorite);
    localStorage.setItem('Favorites', listUpdated);
    this.matSnackBar.open(`${character.name} ha sido eliminado de favoritos`, 'Aceptar');
  }

  private initFavorites() {
    const favoritesAll = localStorage.getItem('Favorites');
    if(!favoritesAll) localStorage.setItem('Favorites', '[]');
  }

  private verifyCharacter(id: number, favorieList: Character[]): any {
    return favorieList.find(character => character.id === id);
  }

  getFavorites() {
    const favorites = localStorage.getItem('Favorites');    
    if(favorites) return JSON.parse(favorites);
  }

  constructor( private matSnackBar: MatSnackBar ) {
    this.newFavorite$
      .pipe(
        tap(character => this.favoriteInteractive(character)),
        tap(character => console.log('Personaje seleccionado', character)),
      )
      .subscribe();

    this.initFavorites();
  }

}
