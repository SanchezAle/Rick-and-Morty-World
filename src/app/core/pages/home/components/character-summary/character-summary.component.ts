import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, takeUntil, Subject, switchMap } from 'rxjs';

import { CharactersDataService } from '../../services/characters-data.service';
import { Character } from 'src/app/shared/models/character.model';
import { Episodes } from 'src/app/shared/models/episodes.models';

@Component({
  selector: 'app-character-summary',
  templateUrl: './character-summary.component.html',
  styleUrls: ['./character-summary.component.scss']
})
export class CharacterSummaryComponent implements OnInit, OnDestroy {

  constructor(
    private characterSrv: CharactersDataService,
    private http: HttpClient,
  ) { }

  character: Character = {
    id: 0,
    name: '',
    status: '',
    type: '',
    species: '',
    image: '',
    url: '',
    location: { name: '', url: '' },
    origin: { name: '', url: '' },
    episode: [],
  }

  lastEpisode: Episodes = { id: 0, name: '' };

  private componentDestroyed$: Subject<void> = new Subject();

  searchEpisodeName(url: string) {
    return this.http.get<Episodes>(url);
  }

  ngOnInit(): void {
    this.characterSrv.characterSummary
      .pipe(
        takeUntil(this.componentDestroyed$),
        tap(character => this.character = character),
        switchMap(info => this.searchEpisodeName(info.episode[info.episode.length-1])),
        tap(response => this.lastEpisode = response),
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.componentDestroyed$.next();
    this.componentDestroyed$.complete();
  }

}
