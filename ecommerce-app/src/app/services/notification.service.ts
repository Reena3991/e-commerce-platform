import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private notificationSubject = new BehaviorSubject<string>('');
  notification$ = this.notificationSubject.asObservable();

  sendNotification(message: string): void {
    this.notificationSubject.next(message);
  }

  clearNotification(): void {
    this.notificationSubject.next('');
  }
}
