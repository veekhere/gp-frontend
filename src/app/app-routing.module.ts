import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppPathConstants } from '@app-constants';
import { AboutComponent } from './components/about/about.component';
import { AuthenticationComponent } from './components/authentication/authentication.component';
import { HomeComponent } from './components/home/home.component';
import { AuthorizedGuard } from '@core/guards/authorized.guard';
import { NotFoundComponent } from './components/not-found/not-found.component';

const routes: Routes = [
  {
    path: AppPathConstants.EMPTY,
    component: HomeComponent,
  },
  {
    path: AppPathConstants.AUTH,
    component: AuthenticationComponent,
  },
  {
    path: AppPathConstants.HOME,
    component: HomeComponent,
  },
  {
    path: AppPathConstants.DASHBOARD,
    component: HomeComponent,
    canActivate: [AuthorizedGuard]
  },
  {
    path: AppPathConstants.ABOUT,
    component: AboutComponent,
  },
  {
    path: AppPathConstants.WILDCARD,
    component: NotFoundComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
