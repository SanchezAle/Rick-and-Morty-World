import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { CharactersDataService } from 'src/app/core/services/characters-data.service';
import { FavoritesService } from 'src/app/core/services/favorites.service';
import { Character } from 'src/app/shared/models/character.model';

@Component({
  selector: 'app-characters-favorites',
  templateUrl: './characters-favorites.component.html',
  styleUrls: ['./characters-favorites.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CharactersFavoritesComponent implements OnInit {

  constructor(
    private favoriteSrv: FavoritesService,
    private characterSrv: CharactersDataService,
    private changeDetector: ChangeDetectorRef,
  ) { }

  favoriteList: Character[] = [];
  activeSummary = false;

  // Activa o desactiva el estado que hace aparecer el componente character-summary
  toggleSummary() {
    this.activeSummary = !this.activeSummary;
  }

  /**
   * Comparte la informacion del personaje seleccionado al observable que es capturado por el componente character-summary
   * @param character objeto que contiene la informacion del personaje
   */
  submitCharacter(character: Character) {
    this.characterSrv.characterSummary.next(character);
    this.toggleSummary();
  }

  ngOnInit(): void {
    this.favoriteList = this.favoriteSrv.getFavorites();
    this.changeDetector.detectChanges();
  }

}
