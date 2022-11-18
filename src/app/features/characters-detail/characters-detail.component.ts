import { Component, ChangeDetectionStrategy, ChangeDetectorRef, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { tap, map, takeUntil, Subject, switchMap, forkJoin } from 'rxjs';
import { ajax } from 'rxjs/ajax';

import { CharactersDataService } from 'src/app/core/services/characters-data.service';
import { FavoritesService } from 'src/app/core/services/favorites.service';
import { Character } from 'src/app/shared/models/character.model';
import { Episodes } from '../../shared/models/episodes.models'

@Component({
  selector: 'app-characters-detail',
  templateUrl: './characters-detail.component.html',
  styleUrls: ['./characters-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CharactersDetailComponent implements OnInit, OnDestroy {

  constructor(
    private changeDetector: ChangeDetectorRef,
    private currentRoute: ActivatedRoute,
    private characterSrv: CharactersDataService,
    private favoriteSrv: FavoritesService,
  ) {}

  private componentDestroyed$: Subject<void> = new Subject();
  private episodesDetail$: Subject<string> = new Subject();
  private characterId = '';

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

  episodes: Episodes[] = [];

  locationId = '';
  originId = '';

  showEpisodes = false;

  /**
   * Entrega la informacion detallada de todos los episodios donde aparece el personaje actual
   * Esta lista de episodios aparece contenido en url
   * para lograrlo cada url se convierte en un objeto con el observable ajax.getJSON con su index como propiedad
   * y una vez completada y obtenida la informacion, dicho objeto es vuelto a convertir en una matriz con Object.values
   * @param url un array de strings
   */

  async getEpisodesData(url: string[]) {
    const entries = url.map((item, index) => [index, ajax.getJSON(item)]);
    const forkData = Object.fromEntries(entries)
    forkJoin<Episodes[]>(forkData)
      .pipe(
        takeUntil(this.componentDestroyed$),
        tap(data => this.episodes = Object.values(data)),
        tap(() => this.showEpisodes = true),
        tap(() => this.changeDetector.detectChanges()),
      )
      .subscribe();
  }

  ngOnInit(): void {

    /**
     * Captura el id compartido por el url
     * Y realiza una busqueda de la informacion detallada del personaje identificado con el id
     * captura del id de origin y location del personaje usando replace
     * Y se switchea a getEpisodesData para obtener la informacion de todos los episodios
     */

    this.currentRoute.params
      .pipe(
        takeUntil(this.componentDestroyed$),
        tap(params => this.characterId = params['id']),
        switchMap(() => this.characterSrv.getOneCharacter(this.characterId)),
        tap(response => this.character = response),
        tap(response => this.originId = response.origin.url.replace(/[^0-9]+/g, "")),
        tap(response => this.locationId = response.location.url.replace(/[^0-9]+/g, "")),
        tap(() => this.getEpisodesData(this.character.episode)),
        tap(info => console.log(info)),
        tap(() => this.changeDetector.detectChanges()),
      )
      .subscribe();
  }

  // Emite la informacion del personaje para que se almacenado o eliminado de favoritos
  addFavorite() {
    this.favoriteSrv.newFavorite$.next(this.character);
  }

  ngOnDestroy(): void {
    this.componentDestroyed$.next();
    this.componentDestroyed$.complete();
  }

}
