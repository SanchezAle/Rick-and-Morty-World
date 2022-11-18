import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './core/pages/home/home.component';
import { PageNotFoundComponent } from './core/pages/page-not-found/page-not-found.component';
import { CharactersDetailComponent } from './features/characters-detail/characters-detail.component';
import { CharactersFavoritesComponent } from './features/characters-favorites/characters-favorites.component';
import { CharactersLocationsComponent } from './features/characters-locations/characters-locations.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'character/:id',
    component: CharactersDetailComponent,
  },
  {
    path: 'location/:id',
    component: CharactersLocationsComponent,
  },
  {
    path: 'favorites',
    component: CharactersFavoritesComponent,
  },
  {
    path: '**',
    redirectTo: '404',
  },
  {
    path: '404',
    component: PageNotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
