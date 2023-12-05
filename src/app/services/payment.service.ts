import { Injectable } from '@angular/core';
import { PaymentMethod } from '../models/payment.model';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  private paymentMethods: PaymentMethod[] = [
    { id: '1', name: 'Credit Card' },
    { id: '2', name: 'Paypal' },
  ];
  constructor() { }

  private selectedPaymentMethodSubject: BehaviorSubject<PaymentMethod | null> = new BehaviorSubject<PaymentMethod | null>(null);
  selectedPaymentMethod$: Observable<PaymentMethod | null> = this.selectedPaymentMethodSubject.asObservable();

  getPaymentMethods(): PaymentMethod[] {
    return this.paymentMethods;
  }

  selectPaymentMethod(paymentMethod: PaymentMethod): void {
    this.selectedPaymentMethodSubject.next(paymentMethod);
  }

  processPayment(totalCost: number): void {
    // Lógica para procesar el pago con el método seleccionado
    const selectedMethod = this.selectedPaymentMethodSubject.value;
    if (selectedMethod) {
      console.log(`Processing payment of ${totalCost} using ${selectedMethod.name}`);
      // Agrega aquí la lógica específica para procesar el pago con el método seleccionado
    } else {
      console.error('No payment method selected');
      // Maneja el caso donde no se ha seleccionado ningún método de pago
    }
  }
}
