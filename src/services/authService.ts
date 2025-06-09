export const login = async (username: string, password: string) => {
  try {
    const response = await fetch('https://srp-backend.onrender.com/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include', // Important for cookies
      body: JSON.stringify({ username, password }),
    });
    if (!response.ok) {
      const data = await response.json();
      return { success: false, error: data.error || 'Login failed' };
    }
    const data = await response.json();
    return { success: true, token: data.token };
  } catch (error) {
    return { success: false, error: 'Network error' };
  }
};

export const signup = async (username: string, password: string) => {
  try {
    const response = await fetch('https://srp-backend.onrender.com/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include', // Important for cookies
      body: JSON.stringify({ username, password }),
    });
    if (!response.ok) {
      const data = await response.json();
      return { success: false, error: data.error || 'Signup failed' };
    }
    const data = await response.json();
    return { success: true, token: data.token };
  } catch (error) {
    return { success: false, error: 'Network error' };
  }
};

export const isAuthenticated = async () => {
  // Check for the 'token' cookie as set by the backend
  // 
  const res = await fetch('https://srp-backend.onrender.com/api/check-auth', {
    method: 'GET',
    credentials: 'include', // Important: sends cookies!
  });
  return res.ok;
};

export const logout = async () => {
  // Remove the 'token' cookie by setting its expiration in the past
  // document.cookie = 'token=; Max-Age=0; path=/;';
  const res = await fetch('https://srp-backend.onrender.com/api/logout', {
    method: 'POST',
    credentials: 'include', // Important: sends cookies!
  });
  return res.ok;
}; 