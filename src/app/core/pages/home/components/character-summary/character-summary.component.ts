import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, takeUntil, Subject, switchMap } from 'rxjs';

import { CharactersDataService } from '../../../../services/characters-data.service'
import { Character } from 'src/app/shared/models/character.model';
import { Episodes } from 'src/app/shared/models/episodes.models';
import { FavoritesService } from 'src/app/core/services/favorites.service';

@Component({
  selector: 'app-character-summary',
  templateUrl: './character-summary.component.html',
  styleUrls: ['./character-summary.component.scss']
})
export class CharacterSummaryComponent implements OnInit, OnDestroy {

  constructor(
    private characterSrv: CharactersDataService,
    private http: HttpClient,
    private favoriteSrv: FavoritesService,
  ) { }

  @Output() toggle = new EventEmitter<Event>();

  character: Character = {
    id: 0,
    name: '',
    status: '',
    type: '',
    species: '',
    image: '',
    url: '',
    gender: '',
    location: { name: '', url: '', type: '', dimension: '', residents: [] },
    origin: { name: '', url: '' },
    episode: [],
  }

  lastEpisode: Episodes = { id: 0, name: '' };
  locationId = '';
  originId = '';

  private componentDestroyed$: Subject<void> = new Subject();

  ngOnInit(): void {

    /**
     * Observable que captura los datos detallados del personaje que el usuario quiere conocer,
     * la funcion replace en origin y location se emplea por ausencia del id del origen y location del personaje desde la api
     * por lo que recorre la url y captura solo los numeros del string que aparecen al final del url
     * por ultimo se switchea a una peticion al ultimo episodio para obtener la informacion del mismo, por ejemplo: el nombre del episodio.
     */

    this.characterSrv.characterSummary
      .pipe(
        takeUntil(this.componentDestroyed$),
        tap(character => this.character = character),
        tap(response => this.originId = response.origin.url.replace(/[^0-9]+/g, "")),
        tap(response => this.locationId = response.location.url.replace(/[^0-9]+/g, "")),
        switchMap(info => this.characterSrv.searchEpisodeName(info.episode[info.episode.length-1])),
        tap(response => this.lastEpisode = response),
      )
      .subscribe();
  }

  // Emite la informacion del personaje para que se almacenado o eliminado de favoritos
  addFavorite() {
    this.favoriteSrv.newFavorite$.next(this.character);
  }

  // Emite el evento que informa que el usuario genero una accion que activa el componente
  toggleSummary() {
    this.toggle.emit();
  }

  ngOnDestroy(): void {
    this.componentDestroyed$.next();
    this.componentDestroyed$.complete();
  }

}
