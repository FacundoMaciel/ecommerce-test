import { saveCurrentUser, getCurrentUser } from '../data/auth.js';
import { validateLogin } from './utils/validateLogin.js';

if (getCurrentUser()) {
  window.location.href = 'index.html';
}

const params = new URLSearchParams(window.location.search);
if (params.get('registered')) {
  document.querySelector('.js-success-message').textContent =
    'Account created successfully. Please sign in.';
}

document.querySelector('.js-login-form').addEventListener('submit', async (event) => {
  event.preventDefault();

  const email = document.querySelector('.js-email').value.trim();
  const password = document.querySelector('.js-password').value;
  const errorEl = document.querySelector('.js-error-message');

  errorEl.textContent = '';

  try {
    const response = await fetch('backend/users.json');
    const users = await response.json();
    const user = validateLogin(users, email, password);

    if (user) {
      saveCurrentUser({ id: user.id, name: user.name, email: user.email });
      window.location.href = 'index.html';
    } else {
      errorEl.textContent = 'Incorrect email or password.';
    }
  } catch {
    errorEl.textContent = 'An error occurred. Please try again.';
  }
});
