import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login, setToken } from './authSlice';
import { useNavigate, Link } from 'react-router-dom';
//import { setToken } from './authSlice'; // ✅ adjust path if needed


const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const dispatch = useDispatch();
  const navigate = useNavigate();


const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const result = await dispatch(login(form)).unwrap(); // result is token string
    dispatch(setToken(result)); // store in Redux
    localStorage.setItem('token', result); // store in localStorage
          navigate('/tasks');

  } catch (err) {
    console.error('Login failed:', err);
  }
};


  return (
    <form onSubmit={handleSubmit} className="p-4 max-w-md mx-auto">
      <h2 className="text-xl mb-4 font-bold">Login</h2>
      <input
        type="email"
        placeholder="Email"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
        className="block w-full mb-2 p-2 border"
      />
      <input
        type="password"
        placeholder="Password"
        value={form.password}
        onChange={(e) => setForm({ ...form, password: e.target.value })}
        className="block w-full mb-2 p-2 border"
      />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
        Login
      </button>
      <p className="mt-2 text-sm">
        Don't have an account? <Link to="/signup" className="text-green-600 underline">Register</Link>
      </p>
    </form>
  );
};

export default Login;