import { Component, OnInit } from '@angular/core';
import { CharactersDataService } from 'src/app/core/services/characters-data.service';
import { FavoritesService } from 'src/app/core/services/favorites.service';
import { Character } from 'src/app/shared/models/character.model';

@Component({
  selector: 'app-characters-favorites',
  templateUrl: './characters-favorites.component.html',
  styleUrls: ['./characters-favorites.component.scss']
})
export class CharactersFavoritesComponent implements OnInit {

  constructor(
    private favoriteSrv: FavoritesService,
    private characterSrv: CharactersDataService,
  ) { }

  favoriteList: Character[] = [];
  activeSummary = false;

  toggleSummary() {
    this.activeSummary = !this.activeSummary;
  }

  submitCharacter(character: Character) {
    this.characterSrv.characterSummary.next(character);
    this.toggleSummary();
  }

  ngOnInit(): void {
    this.favoriteList = this.favoriteSrv.getFavorites();
    console.log(this.favoriteList);
  }

}
