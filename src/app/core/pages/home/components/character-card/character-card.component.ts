import { Component, Input, Output, EventEmitter } from '@angular/core';

import { Character } from 'src/app/shared/models/character.model';
import { FavoritesService } from 'src/app/core/services/favorites.service';

@Component({
  selector: 'app-character-card',
  templateUrl: './character-card.component.html',
  styleUrls: ['./character-card.component.scss']
})
export class CharacterCardComponent {

  @Input('character') character!: Character;
  @Output() viewCharacter = new EventEmitter<Character>();

  constructor(
    private favoriteSrv: FavoritesService,
  ) {}

  viewCharacterEmitter() {
    this.viewCharacter.emit(this.character);
  }

  addFavorite() {
    this.favoriteSrv.newFavorite$.next(this.character);
  }

}
