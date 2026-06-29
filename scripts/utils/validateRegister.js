export function validateRegister(name, email, password, confirmPassword) {
  if (!name.trim()) return 'Full name is required.';
  if (!email.trim() || !email.includes('@')) return 'Please enter a valid email address.';
  if (password.length < 6) return 'Password must be at least 6 characters.';
  if (password !== confirmPassword) return 'Passwords do not match.';
  return null;
}
