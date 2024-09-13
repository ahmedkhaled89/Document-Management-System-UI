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

// ************************ Login User ************************
const registerUser = async ({
  firstName,
  lastName,
  nationalID,
  email,
  password,
  passwordConfirm,
}) => {
  if (
    !firstName.trim() ||
    !lastName.trim() ||
    !nationalID.trim() ||
    !password.trim() ||
    !passwordConfirm.trim()
  ) {
    throw Error('ALL FIELDS ARE REQUIRED');
  }
  if (password !== passwordConfirm) {
    throw Error('PASSWORD DOES NOT MATCH');
  }
  const res = await fetch('/api/users/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'Application/json',
    },
    body: JSON.stringify({
      firstName,
      lastName,
      nationalID,
      email,
      password,
    }),
  });
  const data = await res.json();

  if (!res.ok) {
    throw Error(data.error);
  }
  return data;
};
export { loginUser, registerUser };
