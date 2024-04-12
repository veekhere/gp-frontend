import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { UiKitModule } from '../ui-kit/ui-kit.module';
import { CardComponent } from './components/common/card/card.component';
import { FooterComponent } from './components/common/footer/footer.component';
import { HeaderComponent } from './components/common/header/header.component';
import { LocaleSelectButtonComponent } from './components/common/locale-select-button/locale-select-button.component';
import { MapPreviewComponent } from './components/common/map-preview/map-preview.component';
import { MenuButtonComponent } from './components/common/menu-button/menu-button.component';
import { NotificationBadgeComponent } from './components/common/notification-badge/notification-badge.component';
import { BadgeBorderColorDirective } from './components/directives/badge-border-color.directive';
import { CaptureParentClassDirective } from './components/directives/capture-parent-class.directive';
import { ButtonSelectComponent } from './components/inputs/button-select/button-select.component';
import { LocationAutocompleteComponent } from './components/inputs/location-autocomplete/location-autocomplete.component';
import { TextInputComponent } from './components/inputs/text-input/text-input.component';
import { FilterPipe } from './pipes/filter.pipe';
import { RatingComponent } from './components/inputs/rating/rating.component';

const components = [
  HeaderComponent,
  FooterComponent,
  NotificationBadgeComponent,
  MenuButtonComponent,
  CardComponent,
  LocaleSelectButtonComponent,
  MapPreviewComponent,
];

const directives = [
  BadgeBorderColorDirective,
  CaptureParentClassDirective,
];

const inputs = [
  TextInputComponent,
  ButtonSelectComponent,
  LocationAutocompleteComponent,
  RatingComponent,
];

const pipes = [
  FilterPipe
];

function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    ...components,
    ...directives,
    ...inputs,
    ...pipes,
  ],
  imports: [
    RouterModule,
    CommonModule,
    ReactiveFormsModule,
    UiKitModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
  ],
  exports: [
    RouterModule,
    CommonModule,
    ReactiveFormsModule,
    UiKitModule,
    HttpClientModule,
    TranslateModule,
    ...components,
    ...directives,
    ...inputs,
    ...pipes,
  ]
})
export class CoreModule {}
