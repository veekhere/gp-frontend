import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { CustomFormControl } from '@core/domain/custom-form.control';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RatingComponent implements OnInit {
  @Input() control: FormControl;
  @Input() readonly = false;
  @Input() value: number = null;

  ngOnInit(): void {
    if (this.value != null) {
      this.control = new CustomFormControl(this.value);
    }
  }
}
