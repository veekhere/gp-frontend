import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CustomFormControl } from '@core/domain/custom-form.control';
import { tuiInputPasswordOptionsProvider } from '@taiga-ui/kit';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    tuiInputPasswordOptionsProvider({
      icons: {
        hide: null,
        show: null,
      },
    }),
  ],
})
export class TextInputComponent {

  @Input() control: CustomFormControl;
  @Input() title: string;
  @Input() placeholder: string = '';
  @Input() tooltip: string = null;
  @Input() cleaner = true;
  @Input() focusable = true;
  @Input() readonly = false;
  @Input() pseudoFocus: boolean = null;
  @Input() validate = true;
  @Input() size: 's' | 'm' | 'l' = 'm';
  @Input() type: 'text' | 'password' | 'number' = 'text';
  @Input() postfix: string = '';
  @Input() precision: number = 2;
  @Input() minValue = -Infinity;
  @Input() maxValue = Infinity;

  readonly uuid = uuidv4();

  inputErrorMessages(): string[] {
    const messages: string[] = [];

    if (!!this.control?.isRequired() && !!Object.entries(this.control?.errors ?? {})?.find(([key, value]) => key === 'required' && value)) {
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
