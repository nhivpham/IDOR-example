import { Routes } from '@angular/router';
import { ProfilePage } from './pages/profile/profile.component';


export const routes: Routes = [
  {
    path: "profile/:userId", 
    component: ProfilePage,
  },
  {
    path: "**", 
    redirectTo: "/profile/1",
  }
];
