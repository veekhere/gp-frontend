import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { UiKitModule } from '../ui-kit/ui-kit.module';
import { FooterComponent } from './components/common/footer/footer.component';
import { HeaderComponent } from './components/common/header/header.component';
import { SettingsButtonComponent } from './components/common/settings-button/settings-button.component';
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
import { RatingCardComponent } from './components/rating-card/rating-card.component';
import { FormatDatePipe } from './pipes/format-date.pipe';
import { CurrencyPipe } from './pipes/currency.pipe';
import { SelectInputComponent } from './components/inputs/select-input/select-input.component';
import { AddPlaceModalComponent } from './components/modals/add-place-modal/add-place-modal.component';
import { PlaceCardComponent } from './components/place-card/place-card.component';
import { PlaceViewerComponent } from './components/place-viewer/place-viewer.component';
import { RatePlaceModalComponent } from './components/modals/rate-place-modal/rate-place-modal.component';
import { TextareaInputComponent } from './components/inputs/textarea-input/textarea-input.component';

const components = [
  HeaderComponent,
  FooterComponent,
  NotificationBadgeComponent,
  MenuButtonComponent,
  SettingsButtonComponent,
  MapPreviewComponent,
  RatingCardComponent,
  PlaceCardComponent,
  PlaceViewerComponent,
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
  SelectInputComponent,
  TextareaInputComponent,
];

const pipes = [
  FilterPipe,
  FormatDatePipe,
  CurrencyPipe,
];

const modals = [
  AddPlaceModalComponent,
  RatePlaceModalComponent,
];

function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    ...components,
    ...directives,
    ...inputs,
    ...modals,
    ...pipes,
  ],
  imports: [
    RouterModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    UiKitModule,
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
    FormsModule,
    ReactiveFormsModule,
    UiKitModule,
    TranslateModule,
    ...components,
    ...directives,
    ...inputs,
    ...modals,
    ...pipes,
  ]
})
export class CoreModule {}
