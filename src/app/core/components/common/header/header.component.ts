import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AppPathConstants } from '@app-constants';
import { NavigationService } from '@app/services/navigation.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {

  readonly paths = AppPathConstants;

  constructor(
    readonly navigationService: NavigationService,
  ) {}
}
