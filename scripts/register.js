import { validateRegister } from './utils/validateRegister.js';

document.querySelector('.js-register-form').addEventListener('submit', async (event) => {
  event.preventDefault();

  const name = document.querySelector('.js-name').value.trim();
  const email = document.querySelector('.js-email').value.trim();
  const password = document.querySelector('.js-password').value;
  const confirmPassword = document.querySelector('.js-confirm-password').value;
  const errorEl = document.querySelector('.js-error-message');

  errorEl.textContent = '';

  const validationError = validateRegister(name, email, password, confirmPassword);
  if (validationError) {
    errorEl.textContent = validationError;
    return;
  }

  try {
    const response = await fetch('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await response.json();

    if (response.ok) {
      window.location.href = 'login.html?registered=1';
    } else {
      errorEl.textContent = data.error || 'An error occurred. Please try again.';
    }
  } catch {
    errorEl.textContent = 'An error occurred. Please try again.';
  }
});
