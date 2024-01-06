import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
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

  @Input() control: FormControl;
  @Input() title: string;
  @Input() placeholder: string = '';
  @Input() tooltip: string = null;
  @Input() cleaner = true;
  @Input() focusable = true;
  @Input() readonly = false;
  @Input() pseudoFocus: boolean = null;
  @Input() validate = true;
  @Input() size: 's' | 'm' | 'l' = 'm';
  @Input() type: 'text' | 'password' = 'text';

  readonly uuid = uuidv4();
}
