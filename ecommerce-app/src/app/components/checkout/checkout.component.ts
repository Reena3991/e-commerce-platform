import { Component } from '@angular/core';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent {
  constructor(private orderService: OrderService) {}
  shippingAddress: string = '';
  paymentMethod: string = '';

  onCheckout() {
  }
}
