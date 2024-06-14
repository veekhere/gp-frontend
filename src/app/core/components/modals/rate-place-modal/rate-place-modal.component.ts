import { AfterViewInit, ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { CustomFormControl } from '@core/domain/custom-form.control';
import { FormUtils } from '@core/utils/form-utils';
import { BehaviorSubject, first, Observable } from 'rxjs';
import { Rating, RatingControlNames } from '@core/domain/rating.model';
import { POLYMORPHEUS_CONTEXT } from '@tinkoff/ng-polymorpheus';
import { TuiDialogContext } from '@taiga-ui/core';
import { RatingService } from '@core/services/entity/rating.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { OperationStatusEnum } from '@core/domain/enums/operation-status.enum';
import { EnumOptionsService } from '@app/services/enum-options.service';
import { SelectOption } from '@core/domain/interfaces/select-options';
import { CommonProjection } from '@core/domain/common/projection.model';

@UntilDestroy()
@Component({
  selector: 'app-rate-place-modal',
  templateUrl: './rate-place-modal.component.html',
  styleUrls: ['./rate-place-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RatePlaceModalComponent implements OnInit, AfterViewInit {

  private readonly form = new FormGroup({});
  readonly controlNames = RatingControlNames;

  private readonly entity$ = new BehaviorSubject<Rating>(null);
  readonly rentTypes$: Observable<SelectOption[]>;

  constructor(
    @Inject(POLYMORPHEUS_CONTEXT)
    private readonly context: TuiDialogContext<boolean, BehaviorSubject<string>>,
    private readonly entityService: RatingService,
  ) {
    this.entity$?.next(new Rating());
    this.rentTypes$ = EnumOptionsService.rentTypeOptions(this);
  }

  get isValid(): boolean {
    const controls = [
      this.controlNames.RENT_TYPE,
      this.controlNames.PROS,
      this.controlNames.CONS,
      this.controlNames.PLACE_RATING,
      this.controlNames.LANDLORD_RATING,
      this.controlNames.NEIGHBOR_RATING,
    ];
    return controls?.map((controlName) => {
      const value = this.getControl(controlName)?.value;
      return Array.isArray(value) ? !!value?.length : !!value;
    })
      ?.filter((notEmpty) => !!notEmpty)?.length === controls?.length;
  }

  ngOnInit(): void {
    const entity = this.entity$?.value;
    entity.place = new CommonProjection({ id: this.context.data?.value });
    this.entity$.next(entity);

    const controls = {
      [this.controlNames.PRICE]: new CustomFormControl(entity.price, [
        Validators.required,
      ]),
      [this.controlNames.RENT_TYPE]: new CustomFormControl(entity.rentType, [
        Validators.required,
      ]),
      [this.controlNames.PROS]: new CustomFormControl(entity.pros, [
        Validators.required,
      ]),
      [this.controlNames.CONS]: new CustomFormControl(entity.cons, [
        Validators.required,
      ]),
      [this.controlNames.COMMENT]: new CustomFormControl(entity.comment),
      [this.controlNames.PLACE_RATING]: new CustomFormControl(entity.placeRating, [
        Validators.required,
      ]),
      [this.controlNames.LANDLORD_RATING]: new CustomFormControl(entity.landlordRating, [
        Validators.required,
      ]),
      [this.controlNames.NEIGHBOR_RATING]: new CustomFormControl(entity.neighborRating, [
        Validators.required,
      ]),
    };
    FormUtils.addControls(this.form, controls);
  }

  ngAfterViewInit(): void {
    this.form.valueChanges
      .pipe(untilDestroyed(this))
      .subscribe(() => {
        const formObject = FormUtils.mapFormToObject(this.form, Rating, this.entity$?.value);
        this.entity$?.next(new Rating(formObject));
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
      this.entityService.ratePlace(this.entity$?.value?.toServerObject())
        .pipe(first())
        .subscribe((result) => this.context?.completeWith(result?.id === OperationStatusEnum.Success));
    }
  }

  cancel(): void {
    this.context.completeWith(false);
  }
}
