import { Injectable, signal } from '@angular/core';
import { Toast } from './types';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private _toasts = signal<Toast[]>([]);
  readonly toasts = this._toasts.asReadonly();

  showToast(
    message: string,
    type: 'success' | 'error' | 'info' | 'win' | 'lose',
    duration: number = 5000
  ): void {
    const id = Date.now();
    const toast: Toast = { id, message, type, duration };
    this._toasts.update((toasts) => [...toasts, toast]);

    setTimeout(() => this.removeToast(id), duration);
  }

  removeToast(id: number): void {
    this._toasts.update((toasts) => toasts.filter((toast) => toast.id !== id));
  }
}
