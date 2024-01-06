import { Component } from '@angular/core';
import { LocaleService } from '@core/services/locale.service';
import { UntilDestroy } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(
    localeService: LocaleService,
  ) {}
}
