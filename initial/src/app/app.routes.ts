import { Routes } from '@angular/router';
import { IdorDemoComponent } from './idor-demo/idor-demo.component';

export const routes: Routes = [
  { path: 'profile/:userId', component: IdorDemoComponent },
  { path: '', redirectTo: '/profile/1', pathMatch: 'full' }
];