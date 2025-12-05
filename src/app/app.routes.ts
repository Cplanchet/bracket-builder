import { Routes } from '@angular/router';
import { HomePage } from './pages/home-page/home-page';
import { BracketPage } from './pages/bracket-page/bracket-page';

export const routes: Routes = [
  { path: 'home', component: HomePage },
  { path: 'bracket', component: BracketPage },
  { path: '**', redirectTo: 'home' },
];
