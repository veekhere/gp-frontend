import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { TUI_SANITIZER } from "@taiga-ui/core";
import { NgDompurifySanitizer } from "@tinkoff/ng-dompurify";

import { ScreenTrackingService, UserTrackingService } from '@angular/fire/analytics';
import { CoreModule } from '@core/core.module';
import { NotifierModule } from 'angular-notifier';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AboutComponent } from './components/about/about.component';
import { HomeComponent } from './components/home/home.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

const notifier = [
  NotifierModule.withConfig({
    position: {
      horizontal: {
        position: 'right',
        distance: 26,
      },
    },
    behaviour: {
      autoHide: 4000,
    },
  })
];

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
    HomeComponent,
    AboutComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CoreModule,
    ...notifier,
  ],
  providers: [
    ScreenTrackingService, UserTrackingService, { provide: TUI_SANITIZER, useClass: NgDompurifySanitizer }],
  bootstrap: [AppComponent]
})
export class AppModule {}
