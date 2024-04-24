import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SuperHeroListComponent } from './components/super-hero-list/super-hero-list.component';
import { SuperHeroDetailsComponent } from './components/super-hero-details/super-hero-details.component';
import { AddSuperHeroComponent } from './components/add-super-hero/add-super-hero.component';
import { LoginComponent } from './account/login/login.component';
import { RegisterComponent } from './account/register/register.component';
import { AuthGuard } from './_helpers/auth.guard';
import { UserProfileComponent } from './account/user-profile/user-profile.component';

const routes: Routes = [
  { path: '', redirectTo: 'superheroes', pathMatch: 'full' },
  { path: 'superheroes', component: SuperHeroListComponent },
  { path: 'superhero/:id', component: SuperHeroDetailsComponent, canActivate: [AuthGuard] },
  { path: 'addsuperhero', component: AddSuperHeroComponent, canActivate: [AuthGuard] },
  { path: 'account/login', component: LoginComponent },
  { path: 'account/register', component: RegisterComponent },
  { path: 'profile', component: UserProfileComponent, canActivate: [AuthGuard] },
  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
