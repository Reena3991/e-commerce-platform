import { Component, Input } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
  })
export class UserProfileComponent {
  //userProfile = this.authService.getUserProfile();

  @Input() userProfile: any;
  @Input() orders: any[];

  constructor(private authService: AuthService) {
      this.orders = [];
  }


    trackOrder(orderId: number) {
      console.log(`Tracking order ID: ${orderId}`);
    }
}
