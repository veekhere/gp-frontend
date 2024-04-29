import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonSelectGroup } from '@core/components/inputs/button-select/domain/button-select-group.model';
import { ButtonSelectItem } from '@core/components/inputs/button-select/domain/button-select-item.model';
import { NotificationManagerService, NotificationStreamNode } from '@core/services/notification-manager.service';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
  selector: 'app-menu-button',
  templateUrl: './menu-button.component.html',
  styleUrls: ['./menu-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuButtonComponent implements OnInit {

  @Input() items: ButtonSelectGroup[];

  readonly data$ = new BehaviorSubject<ButtonSelectGroup[]>([]);

  constructor(
    private readonly router: Router,
    private readonly notificationManagerService: NotificationManagerService,
  ) {}

  ngOnInit(): void {
    this.data$.next(this.items);
  }

  isNotified(): Observable<boolean> {
    return this.notificationManagerService.hasNotifiedChild([
      // this.notificationManagerService.notificationStreams.get(NotificationStreamNode.Dashboard),
    ]);
  }

  onSelect(item?: ButtonSelectItem): void {
    this.router.navigate([item?.id]);
  }
}
