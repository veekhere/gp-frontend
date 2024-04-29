import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CustomFormControl } from '@core/domain/custom-form.control';
import { Rating, RatingControlNames } from '@core/domain/rating.model';
import { FormUtils } from '@core/utils/form-utils';

@Component({
  selector: 'app-rating-card',
  templateUrl: './rating-card.component.html',
  styleUrls: ['./rating-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RatingCardComponent implements OnInit {

  @Input() rating: Rating;

  readonly AVG = 'avg';
  readonly CONTROL_NAMES = RatingControlNames;
  private readonly form = new FormGroup({});

  constructor() {}

  ngOnInit(): void {
    const controls = {
      [this.CONTROL_NAMES.PLACE_RATING]: new CustomFormControl(this.rating?.placeRating),
      [this.CONTROL_NAMES.LANDLORD_RATING]: new CustomFormControl(this.rating?.landlordRating),
      [this.CONTROL_NAMES.NEIGHBOR_RATING]: new CustomFormControl(this.rating?.neighborRating),
      [this.CONTROL_NAMES.AVG_RATING]: new CustomFormControl(this.rating?.avgRating),
    };
    FormUtils.addControls(this.form, controls);
  }

  getControl(controlName: string): FormControl {
    return FormUtils.getControl(this.form, controlName);
  }
}
