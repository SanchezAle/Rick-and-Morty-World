import { Component, OnInit, OnDestroy } from '@angular/core';
import { tap, takeUntil, Subject, switchMap } from 'rxjs';

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
  activeSummary = false;
  characters: Character[] = [];
  characterCount = 0;
  pagination = 1;
  private nextPage: string = '';
  private prevPage: string = '';
  private componentDestroyed$: Subject<void> = new Subject();

  submitCharacter(character: Character) {
    this.characterSrv.characterSummary.next(character);
    this.toggleSummary();
  }

  toggleSummary() {
    this.activeSummary = !this.activeSummary;
  }

  paginator(direction: any){
    
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
        )
        .subscribe();

      this.characterSrv.getCharacters();
  }

  ngOnDestroy(): void {
    this.componentDestroyed$.next();
    this.componentDestroyed$.complete();
  }

}
