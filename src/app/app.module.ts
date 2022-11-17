import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './core/pages/home/home.component';
import { TopbarComponent } from './core/components/topbar/topbar.component';
import { PageNotFoundComponent } from './core/pages/page-not-found/page-not-found.component';
import { MaterialModule } from './shared/material/material.module';
import { CharacterCardComponent } from './core/pages/home/components/character-card/character-card.component';
import { CharacterSummaryComponent } from './core/pages/home/components/character-summary/character-summary.component';
import { CharactersDetailComponent } from './features/characters-detail/characters-detail.component';
import { CharactersLocationsComponent } from './features/characters-locations/characters-locations.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TopbarComponent,
    PageNotFoundComponent,
    CharacterCardComponent,
    CharacterSummaryComponent,
    CharactersDetailComponent,
    CharactersLocationsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
