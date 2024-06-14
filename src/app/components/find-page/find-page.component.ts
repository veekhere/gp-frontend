import { AfterViewInit, ChangeDetectionStrategy, Component, Inject, Injector, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { EnumOptionsService } from '@app/services/enum-options.service';
import { AddPlaceModalComponent } from '@core/components/modals/add-place-modal/add-place-modal.component';
import { CustomFormControl } from '@core/domain/custom-form.control';
import { PlaceFilter, PlaceFilterControlNames } from '@core/domain/filters/place-filter.model';
import { SelectOption } from '@core/domain/interfaces/select-options';
import { PlaceProjection } from '@core/domain/place-projection.model';
import { Place } from '@core/domain/place.model';
import { PlaceService } from '@core/services/entity/place.service';
import { FormUtils } from '@core/utils/form-utils';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { TuiDialogService } from '@taiga-ui/core';
import { PolymorpheusComponent } from '@tinkoff/ng-polymorpheus';
import { BehaviorSubject, first, Observable } from 'rxjs';

@UntilDestroy()
@Component({
  selector: 'app-find-page',
  templateUrl: './find-page.component.html',
  styleUrls: ['./find-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FindPageComponent implements OnInit, AfterViewInit {

  readonly CONTROL_NAMES = PlaceFilterControlNames;
  private readonly form = new FormGroup({});
  private readonly dialog = this.dialogs.open(
    new PolymorpheusComponent(AddPlaceModalComponent, this.injector),
    { dismissible: false }
  );

  private readonly filter$ = new BehaviorSubject<PlaceFilter>(null);
  readonly places$ = new BehaviorSubject<PlaceProjection[]>([]);
  readonly isLoading$ = new BehaviorSubject<boolean>(false);

  readonly filterDisabled$ = new BehaviorSubject<boolean>(true);
  readonly addDisabled$ = new BehaviorSubject<boolean>(true);
  readonly spaceTypes$: Observable<SelectOption[]>;
  readonly rentTypes$: Observable<SelectOption[]>;
  readonly place$ = new BehaviorSubject<Place>(null);
  readonly isFiltersOpen$ = new BehaviorSubject<boolean>(false);

  constructor(
    @Inject(TuiDialogService) private readonly dialogs: TuiDialogService,
    @Inject(Injector) private readonly injector: Injector,
    private readonly placeService: PlaceService,
  ) {
    this.isLoading$.next(true);
    this.search();
    this.spaceTypes$ = EnumOptionsService.spaceTypeOptions(this);
    this.rentTypes$ = EnumOptionsService.rentTypeOptions(this);
  }

  ngOnInit(): void {
    const controls = {
      [this.CONTROL_NAMES.RENT_TYPE]: new CustomFormControl(),
      [this.CONTROL_NAMES.SPACE_TYPE]: new CustomFormControl(),
      [this.CONTROL_NAMES.AREA_FROM]: new CustomFormControl(),
      [this.CONTROL_NAMES.AREA_TO]: new CustomFormControl(),
      [this.CONTROL_NAMES.FLOOR]: new CustomFormControl(),
      [this.CONTROL_NAMES.PRICE_FROM]: new CustomFormControl(),
      [this.CONTROL_NAMES.PRICE_TO]: new CustomFormControl(),
      [this.CONTROL_NAMES.COUNTRY]: new CustomFormControl(),
      [this.CONTROL_NAMES.STATE]: new CustomFormControl(),
      [this.CONTROL_NAMES.CITY]: new CustomFormControl(),
      [this.CONTROL_NAMES.ROAD]: new CustomFormControl(),
      [this.CONTROL_NAMES.HOUSE_NUMBER]: new CustomFormControl(),
      [this.CONTROL_NAMES.PLACE_RATING_FROM]: new CustomFormControl(),
      [this.CONTROL_NAMES.PLACE_RATING_TO]: new CustomFormControl(),
      [this.CONTROL_NAMES.LANDLORD_RATING_FROM]: new CustomFormControl(),
      [this.CONTROL_NAMES.LANDLORD_RATING_TO]: new CustomFormControl(),
      [this.CONTROL_NAMES.NEIGHBOR_RATING_FROM]: new CustomFormControl(),
      [this.CONTROL_NAMES.NEIGHBOR_RATING_TO]: new CustomFormControl(),
    };
    FormUtils.addControls(this.form, controls);
  }

  ngAfterViewInit(): void {
    this.form.valueChanges
      .pipe(untilDestroyed(this))
      .subscribe(() => {
        const formObject = FormUtils.mapFormToObject(this.form, PlaceFilter);
        this.filter$?.next(new PlaceFilter(formObject));
      });

    this.spyOnFilterChanges();
    this.spyOnLoading();
  }

  getControl(name: string): CustomFormControl {
    return FormUtils.getControl(this.form, name);
  }

  search(): void {
    this.isLoading$.next(true);
    this.isFiltersOpen$.next(false);
    const filter = this.filter$?.value?.toServerObject();
    this.placeService.search(filter)
      .pipe(first())
      .subscribe({
        next: (result) => {
          this.places$.next(result);
        },
        error: () => this.isLoading$.next(false),
        complete: () => this.isLoading$.next(false),
      });
  }

  click(id?: string) {
    this.isLoading$.next(true);
    this.placeService.get(id)
      .pipe(first())
      .subscribe({
        next: (place) => this.place$.next(place),
        error: () => this.isLoading$.next(false),
        complete: () => this.isLoading$.next(false),
      });
  }

  showDialog(): void {
    this.dialog.pipe(untilDestroyed(this)).subscribe({
      next: () => {
        this.search();
      },
    });
  }

  clearFilter(): void {
    this.form.reset();
    this.form.markAsPristine();
    this.filter$.next(null);
    this.places$.next([]);
    setTimeout(() => {
      this.search();
    });
  }

  toggleFilter(): void {
    this.isFiltersOpen$.next(!this.isFiltersOpen$.value);
  }

  private spyOnFilterChanges(): void {
    this.filter$
      .pipe(untilDestroyed(this))
      .subscribe((filter) => this.filterDisabled$.next(!filter));
  }

  private spyOnLoading(): void {
    this.isLoading$
      .pipe(untilDestroyed(this))
      .subscribe((isLoading) => this.addDisabled$.next(isLoading));
  }
}
