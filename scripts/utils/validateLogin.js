export function validateLogin(users, email, password) {
  if (!email || !password) return null;
  return users.find(u => u.email === email && u.password === password) ?? null;
}
