import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  tap,
  takeUntil,
  Subject,
  switchMap,
  catchError,
  of
} from 'rxjs';

import { CharactersDataService } from '../../services/characters-data.service'
import { Character } from 'src/app/shared/models/character.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  constructor(
    private characterSrv: CharactersDataService,
  ) {}

  await = false;
  message = '';
  activeSummary = false;
  characters: Character[] = [];
  characterCount = 0;
  pagination = 1;
  private nextPage: string = '';
  private prevPage: string = '';
  private componentDestroyed$: Subject<void> = new Subject();

  /**
   * Se encarga de transmitir la informacion de algun personaje que el usuario quiera conocer
   * esta informacion fue pensado en principio para ser capturada por el componente character-summary
   * Esto con la intencion de realizar una accion reactiva sin el uso de Outputs
   * @param character objeto con los datos de los personajes
   */

  submitCharacter(character: Character) {
    this.characterSrv.characterSummary.next(character);
    this.toggleSummary();
  }

  /**
   * Se encarga de activar o desactivar el menu de Resumen de los personajes
   * El cual es una barra lateral en la parte derecha de la pantalla.
   * Esto activa el app-character-summary y un div que presenta un fondo detras que oculta las cards
   */

  toggleSummary() {
    this.activeSummary = !this.activeSummary;
  }

  /**
   * Define la funcion del paginador y su accion sobre las cards de personajes,
   * si es prev la app renderizara los personajes que entrega la api en su paginacion anterior
   * si es next la app renderizara los personajes que entrega la api en su siguiente paginacion
   * @direction: string
   */

  paginator(direction: string){

    if(direction === 'prev' && this.pagination > 1) {
      this.characterSrv.charactersForPage$.next(this.prevPage);
      this.pagination--;
      return;
    }

    if(direction == 'next') {
      this.characterSrv.charactersForPage$.next(this.nextPage);
      this.pagination++;
    }

  }

  ngOnInit(): void {

    /**
     * observable que recibe si hay una nueva url que enlista de personajes de la api
     * Y se switchea al servicio que emite la peticion, y mientras se completa, la app activara el estado de espera por los datos
     * una vez completada y asignadas las variables desactivara el estado de espera y renderizara las cards con los personajes
     */

      this.characterSrv.charactersForPage$
        .pipe(
          takeUntil(this.componentDestroyed$),
          tap(() => this.await = !this.await),
          switchMap(url => this.characterSrv.getCharactersForPage(url)),
          tap(response => this.nextPage = response.info.next),
          tap(response => this.prevPage = response.info.prev),
          tap(response => this.characterCount = response.info.count),
          tap(response => this.characters = response.results),
          tap(() => this.await = !this.await),
          catchError(() => {
            this.message = 'Ha ocurrido un error al cargar los personajes.';
            this.await = !this.await;
            return of();
          })
        )
        .subscribe();

      // Inicializa una primera lista de personajes
      this.characterSrv.getCharacters();
  }

  ngOnDestroy(): void {
    this.componentDestroyed$.next();
    this.componentDestroyed$.complete();
  }

}
