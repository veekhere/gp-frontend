import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CustomFormControl } from '@core/domain/custom-form.control';
import { PlaceProjection, PlaceProjectionControlNames } from '@core/domain/place-projection.model';
import { FormUtils } from '@core/utils/form-utils';

@Component({
  selector: 'app-place-card',
  templateUrl: './place-card.component.html',
  styleUrls: ['./place-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlaceCardComponent implements OnInit {

  @Input() placeProjection: PlaceProjection;
  @Output() onCardClick = new EventEmitter<string>();

  readonly CONTROL_NAMES = PlaceProjectionControlNames;
  private readonly form = new FormGroup({});

  constructor() {}

  ngOnInit(): void {
    const controls = {
      [this.CONTROL_NAMES.AVG_PLACE_RATING]: new CustomFormControl(this.placeProjection?.avgPlaceRating),
      [this.CONTROL_NAMES.AVG_LANDLORD_RATING]: new CustomFormControl(this.placeProjection?.avgLandlordRating),
      [this.CONTROL_NAMES.AVG_NEIGHBOR_RATING]: new CustomFormControl(this.placeProjection?.avgNeighborRating),
      [this.CONTROL_NAMES.AVG_RATING]: new CustomFormControl(this.placeProjection?.avgRating),
    };
    FormUtils.addControls(this.form, controls);
  }

  getControl(controlName: string): FormControl {
    return FormUtils.getControl(this.form, controlName);
  }

  click(): void {
    if (this.placeProjection) {
      this.onCardClick.emit(this.placeProjection.id);
    }
  }
}
