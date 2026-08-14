import { Component } from '@angular/core';
import { PushService } from '../../services/push.service';

@Component({
  selector: 'app-notification-settings',
  templateUrl: './notification-settings.component.html'
})
export class NotificationSettingsComponent {
  subscribing = false;
  exampleProducts = ['aspirin-100', 'paracetamol-500'];
  selectedProducts: string[] = [];

  constructor(private push: PushService) {}

  async subscribe() {
    this.subscribing = true;
    try {
      const token = await this.push.requestPermissionAndSaveToken('anonymous-user', this.selectedProducts);
      alert('تم التسجيل: ' + token);
    } catch (err: any) {
      alert('خطأ في التسجيل: ' + (err.message || err));
    } finally {
      this.subscribing = false;
    }
  }
}
