import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { CoreModule } from '@core/core.module';
import { TUI_SANITIZER } from "@taiga-ui/core";
import { NgDompurifySanitizer } from "@tinkoff/ng-dompurify";
import { NotifierModule } from 'angular-notifier';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AboutPageComponent } from './components/about-page/about-page.component';
import { FindPageComponent } from './components/find-page/find-page.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { StartPageComponent } from './components/start-page/start-page.component';
import { GraphQLModule } from './graphql.module';

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
    FindPageComponent,
    AboutPageComponent,
    StartPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CoreModule,
    GraphQLModule,
    ...notifier,
  ],
  providers: [{ provide: TUI_SANITIZER, useClass: NgDompurifySanitizer }],
  bootstrap: [AppComponent]
})
export class AppModule {}
