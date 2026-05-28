import { Injectable } from '@angular/core';
import { NzNotificationService, NzNotificationDataOptions } from 'ng-zorro-antd/notification';

@Injectable({ providedIn: 'root' })
export class NotificationService {

  constructor(private notification: NzNotificationService) {}

  showNotification(isSuccess: boolean, message: string): void {



    this.notification.create(
      isSuccess ? 'success' : 'error',
      message,
      ''
    );
  }
}
