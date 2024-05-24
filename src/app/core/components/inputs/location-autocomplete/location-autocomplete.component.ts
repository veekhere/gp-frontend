import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { CustomFormControl } from '@core/domain/custom-form.control';
import { Location } from '@core/domain/location.model';
import { LocationService } from '@core/services/location.service';
import { validators } from '@core/services/validation.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { BehaviorSubject, debounceTime, distinctUntilChanged, filter, switchMap } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';

@UntilDestroy()
@Component({
  selector: 'app-location-autocomplete',
  templateUrl: './location-autocomplete.component.html',
  styleUrls: ['./location-autocomplete.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LocationAutocompleteComponent implements OnInit {

  @Input() control: CustomFormControl;
  @Input() title: string = null;
  @Input() placeholder: string = '';
  @Input() tooltip: string = null;
  @Input() cleaner = true;
  @Input() focusable = true;
  @Input() readonly = false;
  @Input() pseudoFocus: boolean = null;
  @Input() validate = true;
  @Input() size: 's' | 'm' | 'l' = 'm';

  readonly uuid = uuidv4();

  readonly searchString$ = new BehaviorSubject<string>(null);
  readonly items$ = new BehaviorSubject<Location[]>([]);

  constructor(
    private readonly locationService: LocationService,
  ) {}

  ngOnInit(): void {
    this.control?.addValidators(validators.locationAutocomplete());

    this.searchString$
      .pipe(
        filter((searchString) => !!searchString),
        debounceTime(1000),
        distinctUntilChanged(),
        switchMap((searchString) =>
          this.locationService.searchAddress(searchString)),
        untilDestroyed(this)
      )
      .subscribe((locations) => this.items$.next(locations));
  }

  inputErrorMessage(): string {
    const message: string = this.control?.errors?.['houseIsNotSelected']?.message;
    return message
      ? message
      : !!this.control?.isRequired() ? 'CONTROL.VALIDATION.REQUIRED' : null;
  }

  stringify(item?: Location): string {
    return item?.toString();
  }
}
