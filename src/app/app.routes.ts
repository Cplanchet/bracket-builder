import { Routes } from '@angular/router';
import { HomePage } from './pages/home-page/home-page';
import { BracketPage } from './pages/bracket-page/bracket-page';
import { WinnerPage } from './pages/winner-page/winner-page';

export const routes: Routes = [
  { path: 'home', component: HomePage },
  { path: 'bracket', component: BracketPage },
  { path: 'winner', component: WinnerPage },
  { path: '**', redirectTo: 'home' },
];
