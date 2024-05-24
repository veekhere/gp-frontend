import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppPathConstants } from '@app-constants';
import { AboutPageComponent } from './components/about-page/about-page.component';
import { FindPageComponent } from './components/find-page/find-page.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { StartPageComponent } from './components/start-page/start-page.component';

const routes: Routes = [
  {
    path: AppPathConstants.EMPTY,
    component: StartPageComponent,
  },
  {
    path: AppPathConstants.FIND,
    component: FindPageComponent,
  },
  {
    path: AppPathConstants.ABOUT,
    component: AboutPageComponent,
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
