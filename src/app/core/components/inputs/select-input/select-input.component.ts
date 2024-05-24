import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CustomFormControl } from '@core/domain/custom-form.control';
import { SelectOption } from '@core/domain/interfaces/select-options';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-select-input',
  templateUrl: './select-input.component.html',
  styleUrls: ['./select-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectInputComponent {

  @Input() control: CustomFormControl;
  @Input() title: string;
  @Input() placeholder: string = '';
  @Input() tooltip: string = null;
  @Input() options: SelectOption[] = null;
  @Input() cleaner = true;
  @Input() focusable = true;
  @Input() readonly = false;
  @Input() pseudoFocus: boolean = null;
  @Input() validate = true;
  @Input() multi = false;
  @Input() size: 's' | 'm' | 'l' = 'm';

  readonly uuid = uuidv4();

  constructor() {}

  isEmpty(): boolean {
    return this.multi
      ? !this.control?.value?.length
      : this.control?.value === null;
  }

  stringify(option: any): string {
    return option?.name;
  }

  inputErrorMessages(): string[] {
    const messages: string[] = [];

    if (!!this.control?.isRequired()) {
      messages.push('CONTROL.VALIDATION.REQUIRED');
    }

    for (const [key, error] of Object.entries(this.control?.errors ?? {})) {
      if (!!key && !!error && key !== 'required') {
        messages.push(error?.message);
      }
    }

    return messages;
  }
}
