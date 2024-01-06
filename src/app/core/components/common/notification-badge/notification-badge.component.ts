import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-notification-badge',
  templateUrl: './notification-badge.component.html',
  styleUrls: ['./notification-badge.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotificationBadgeComponent {

  @Input() rounded = true;
  @Input() badgeBorderColor: string = null;
  @Input() showBadge = false;
}
