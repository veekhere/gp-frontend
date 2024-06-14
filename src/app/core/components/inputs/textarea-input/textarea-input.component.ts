import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { CustomFormControl } from '@core/domain/custom-form.control';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-textarea-input',
  templateUrl: './textarea-input.component.html',
  styleUrls: ['./textarea-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextareaInputComponent implements OnInit {

  @Input() control: CustomFormControl;
  @Input() title: string;
  @Input() placeholder: string = '';
  @Input() tooltip: string = null;
  @Input() readonly = false;
  @Input() validate = true;
  @Input() maxLength: number = null;

  readonly uuid = uuidv4();

  ngOnInit(): void {
    this.control?.addValidator(Validators.maxLength(this.maxLength));
  }

  inputErrorMessages(): string[] {
    const messages: string[] = [];

    if (!!this.control?.isRequired() && !!Object.entries(this.control?.errors ?? {})?.find(([key, value]) => key === 'required' && value)) {
      messages.push('CONTROL.VALIDATION.REQUIRED');
    }

    for (const [key, error] of Object.entries(this.control?.errors ?? {})) {
      if (!!key && !!error && key !== 'required') {
        if (key !== 'required' && key !== 'maxlength') {
          messages.push(error?.message);
        } else if (key === 'maxlength') {
          messages.push(`CONTROL.VALIDATION.MAX_LENGTH`);
        }
      }
    }

    return messages;
  }
}
