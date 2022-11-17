import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './core/pages/home/home.component';
import { PageNotFoundComponent } from './core/pages/page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
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
