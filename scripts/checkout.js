import {renderOrderSummary} from './checkout/orderSummary.js';
import {renderPaymentSummary} from './checkout/paymentSummary.js';
import {getCurrentUser} from '../data/auth.js';

if (!getCurrentUser()) {
  window.location.href = 'login.html';
}

renderOrderSummary();
renderPaymentSummary();
