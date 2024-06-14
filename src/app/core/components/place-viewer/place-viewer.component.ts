import { ChangeDetectionStrategy, Component, Inject, Injector, Input, OnInit } from '@angular/core';
import { Place } from '@core/domain/place.model';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { TuiDialogService } from '@taiga-ui/core';
import { PolymorpheusComponent } from '@tinkoff/ng-polymorpheus';
import { BehaviorSubject } from 'rxjs';
import { RatePlaceModalComponent } from '../modals/rate-place-modal/rate-place-modal.component';

@UntilDestroy()
@Component({
  selector: 'app-place-viewer',
  templateUrl: './place-viewer.component.html',
  styleUrls: ['./place-viewer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlaceViewerComponent implements OnInit {

  @Input() place: Place;

  private readonly placeId$ = new BehaviorSubject<string>(null);
  private readonly dialog = this.dialogs.open(
    new PolymorpheusComponent(RatePlaceModalComponent, this.injector),
    { dismissible: false, data: this.placeId$ }
  );

  constructor(
    @Inject(TuiDialogService) private readonly dialogs: TuiDialogService,
    @Inject(Injector) private readonly injector: Injector,
  ) {}

  ngOnInit(): void {
    this.placeId$.next(this.place?.id);
  }

  ratePlace(): void {
    this.dialog.pipe(untilDestroyed(this)).subscribe();
  }
}
