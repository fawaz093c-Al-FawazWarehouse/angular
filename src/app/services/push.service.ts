import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

declare const window: any;

@Injectable({ providedIn: 'root' })
export class PushService {
  constructor(private http: HttpClient) {}

  async requestPermissionAndSaveToken(userId?: string, products: string[] = []) {
    try {
      const firebase = (window as any).firebase;
      if (!firebase) throw new Error('Firebase client not found. Add Firebase SDK to index.html');

      const messaging = firebase.messaging();
      await Notification.requestPermission();
      const token = await messaging.getToken({ vapidKey: environment.vapidKey });
      console.log('FCM token', token);

      await this.http.post(`${environment.backendUrl}/save-token`, { token, userId, products }).toPromise();
      return token;
    } catch (err) {
      console.error('requestPermission error', err);
      throw err;
    }
  }

  listenToMessages() {
    const firebase = (window as any).firebase;
    if (!firebase) return;
    const messaging = firebase.messaging();
    messaging.onMessage((payload: any) => {
      console.log('Message received. ', payload);
      if (Notification.permission === 'granted') {
        new Notification(payload.notification?.title || 'تنبيه', {
          body: payload.notification?.body || '',
        });
      }
    });
  }
}
