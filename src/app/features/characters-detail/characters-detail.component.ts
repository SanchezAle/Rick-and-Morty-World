import { Component, ChangeDetectionStrategy, ChangeDetectorRef, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { tap, map, takeUntil, Subject, switchMap, forkJoin } from 'rxjs';
import { ajax } from 'rxjs/ajax';

import { CharactersDataService } from 'src/app/core/services/characters-data.service';
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
    location: { name: '', url: '' },
    origin: { name: '', url: '' },
    episode: [],
  }

  episodes: Episodes[] = [];

  locationId = '';

  showEpisodes = false;

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
    this.currentRoute.params
      .pipe(
        takeUntil(this.componentDestroyed$),
        tap(params => this.characterId = params['id']),
        switchMap(() => this.characterSrv.getOneCharacter(this.characterId)),
        tap(response => this.character = response),
        tap(response => this.locationId = response.location.url.replace(/[^0-9]+/g, "")),
        tap(() => this.getEpisodesData(this.character.episode)),
        tap(info => console.log(info)),
        tap(() => this.changeDetector.detectChanges()),
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.componentDestroyed$.next();
    this.componentDestroyed$.complete();
  }

}
