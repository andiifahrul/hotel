import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../services/Supabase';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;
      navigate('/admin'); // Jika berhasil, arahkan ke admin
    } catch (error) {
      alert('Gagal login: Email atau Password salah!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100" style={{ backgroundColor: 'var(--bg)' }}>
      <div className="card shadow-sm p-4 border-0" style={{ width: '100%', maxWidth: '400px', borderRadius: '15px' }}>
        <h3 className="text-center mb-4 fw-bold" style={{ color: 'var(--primary)' }}>Login Admin</h3>
        <form onSubmit={handleLogin}>
          <div className="mb-3"><label className="form-label">Email</label><input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} required /></div>
          <div className="mb-4"><label className="form-label">Password</label><input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} required /></div>
          <button type="submit" className="btn w-100 text-white" style={{ backgroundColor: 'var(--accent)' }} disabled={loading}>{loading ? 'Memeriksa...' : 'Masuk'}</button>
        </form>
      </div>
    </div>
  );
};

export default Login;