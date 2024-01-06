import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { TuiPaymentSystem } from '@taiga-ui/addon-commerce';
import { TuiSizeM, TuiSizeS } from '@taiga-ui/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardComponent {
  @Input() paymentSystem: TuiPaymentSystem = 'visa';
  @Input() size: TuiSizeS | TuiSizeM = 'm';
  @Input() cardNumber: string = '0000';
}
