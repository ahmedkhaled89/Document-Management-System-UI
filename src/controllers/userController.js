// ************************ Login User ************************
const loginUser = async (email, password) => {
  if (!email.trim() || !password.trim()) {
    throw Error('ALL FIELDS ARE REQUIRED');
  }

  const res = await fetch('/api/users/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'Application/json',
    },
    body: JSON.stringify({ email, password }),
  });
  const data = await res.json();

  if (!res.ok) {
    throw Error(data.error);
  }
  return data;
};

export { loginUser };
