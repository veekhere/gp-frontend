import { AfterViewInit, ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { EnumOptionsService } from '@app/services/enum-options.service';
import { CustomFormControl } from '@core/domain/custom-form.control';
import { OperationStatusEnum } from '@core/domain/enums/operation-status.enum';
import { SelectOption } from '@core/domain/interfaces/select-options';
import { Place, PlaceControlNames } from '@core/domain/place.model';
import { PlaceService } from '@core/services/entity/place.service';
import { FormUtils } from '@core/utils/form-utils';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { TuiDialogContext } from '@taiga-ui/core';
import { POLYMORPHEUS_CONTEXT } from '@tinkoff/ng-polymorpheus';
import { BehaviorSubject, first, Observable } from 'rxjs';

@UntilDestroy()
@Component({
  selector: 'app-add-place-modal',
  templateUrl: './add-place-modal.component.html',
  styleUrls: ['./add-place-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddPlaceModalComponent implements OnInit, AfterViewInit {

  private readonly form = new FormGroup({});
  readonly controlNames = PlaceControlNames;

  private readonly entity$ = new BehaviorSubject<Place>(null);
  readonly spaceTypes$: Observable<SelectOption[]>;
  readonly rentTypes$: Observable<SelectOption[]>;

  constructor(
    @Inject(POLYMORPHEUS_CONTEXT)
    private readonly context: TuiDialogContext<boolean, any>,
    private readonly entityService: PlaceService,
  ) {
    this.entity$?.next(new Place());
    this.spaceTypes$ = EnumOptionsService.spaceTypeOptions(this);
    this.rentTypes$ = EnumOptionsService.rentTypeOptions(this);
  }

  get isValid(): boolean {
    const controls = [
      this.controlNames.AREA,
      this.controlNames.FLOOR,
      this.controlNames.RENT_TYPE,
      this.controlNames.SPACE_TYPE,
      this.controlNames.LOCATION,
    ];
    return controls?.map((controlName) => {
      const value = this.getControl(controlName)?.value;
      return Array.isArray(value) ? !!value?.length : !!value;
    })
      ?.filter((notEmpty) => !!notEmpty)?.length === controls?.length;
  }

  ngOnInit(): void {
    const entity = this.entity$?.value;
    const controls = {
      [this.controlNames.AREA]: new CustomFormControl(entity.area ?? 1, [
        Validators.required,
      ]),
      [this.controlNames.FLOOR]: new CustomFormControl(entity.floor ?? 1, [
        Validators.required,
      ]),
      [this.controlNames.RENT_TYPE]: new CustomFormControl(entity.rentType, [
        Validators.required,
      ]),
      [this.controlNames.SPACE_TYPE]: new CustomFormControl(entity.spaceType, [
        Validators.required,
      ]),
      [this.controlNames.LOCATION]: new CustomFormControl(entity.location, [
        Validators.required,
      ]),
    };
    FormUtils.addControls(this.form, controls);
  }

  ngAfterViewInit(): void {
    this.form.valueChanges
      .pipe(untilDestroyed(this))
      .subscribe(() => {
        const formObject = FormUtils.mapFormToObject(this.form, Place);
        this.entity$?.next(new Place(formObject));
      });
  }

  getControl(controlName: string): CustomFormControl {
    return FormUtils.getControl(this.form, controlName);
  }

  submit(): void {
    if (!this.isValid) {
      return;
    }
    if (this.entity$?.value !== null) {
      this.entityService.create(this.entity$?.value?.toServerObject())
        .pipe(first())
        .subscribe((result) => this.context?.completeWith(result?.id === OperationStatusEnum.Success));
    }
  }

  cancel(): void {
    this.context.completeWith(false);
  }
}
