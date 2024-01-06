import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AppPathConstants } from '@app-constants';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotFoundComponent {
  readonly paths = AppPathConstants;
}
