import {
  Component,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  OnInit,
  OnDestroy
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { tap, takeUntil, switchMap, Subject } from 'rxjs';

import { CharactersDataService } from 'src/app/core/services/characters-data.service';
import { Location } from 'src/app/shared/models/locationCharacter.model';

@Component({
  selector: 'app-characters-locations',
  templateUrl: './characters-locations.component.html',
  styleUrls: ['./characters-locations.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CharactersLocationsComponent implements OnInit, OnDestroy {

  constructor(
    private changeDetector: ChangeDetectorRef,
    private currentRoute: ActivatedRoute,
    private characterSrv: CharactersDataService,
  ) { }

  private componentDestroyed$: Subject<void> = new Subject();
  private locationId = '';

  // contiene un banco de imagenes para ser renderizadas de manera aleatoria
  images = [
    'https://i.pinimg.com/564x/a0/fb/9e/a0fb9eba4b967007c898638cb1a1de46.jpg',
    'https://i.pinimg.com/564x/af/d3/81/afd3810c39d1ca1c41714a6522b3a6dc.jpg',
    'https://i.pinimg.com/564x/ce/5b/ca/ce5bcac1485f3fa1496e7d8c9945ce4a.jpg',
    'https://i.pinimg.com/564x/9c/83/e4/9c83e48ee72e26fa968a212526db6340.jpg',
  ]

  img = '';

  location: Location = {
    name: '',
    type: '',
    dimension: '',
    residents: [],
    url: '',
  }

  // Entrega una imagen aleatorea del array imeges
  getRandomImage() {
    return this.images[Math.floor(Math.random() * this.images.length)];
  }

  ngOnInit(): void {

    this.img = this.getRandomImage();

    /**
     * Captura el id compartido por el url
     * Realiza una peticion de la informacion de la location a la api
     */
    this.currentRoute.params
      .pipe(
        takeUntil(this.componentDestroyed$),
        tap(params => this.locationId = params['id']),
        switchMap(() => this.characterSrv.getLocation(this.locationId)),
        tap(response => this.location = response),
        tap(() => this.changeDetector.detectChanges()),
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.componentDestroyed$.next();
    this.componentDestroyed$.complete();
  }

}
