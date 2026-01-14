
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Lock, User, Eye, EyeOff, ArrowLeft, ShieldCheck, AlertCircle } from 'lucide-react';
import { supabase } from '../supabase';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const loginEmail = email.includes('@') ? email : `${email}@soyte.gov.vn`;
      const { error } = await supabase.auth.signInWithPassword({
        email: loginEmail,
        password: password,
      });

      if (error) throw error;
      navigate('/admin');
    } catch (err: any) {
      console.error("Login error:", err.message);
      setError('Đăng nhập thất bại: ' + (err.message || 'Vui lòng kiểm tra lại thông tin.'));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 py-12">
      <div className="max-w-md w-full animate-in fade-in slide-in-from-bottom-4 duration-500">
        <Link to="/" className="inline-flex items-center text-sm text-gray-500 hover:text-primary-600 mb-6 transition">
          <ArrowLeft size={16} className="mr-2" /> Quay lại trang chủ
        </Link>
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
          <div className="bg-primary-700 p-8 text-center relative overflow-hidden">
            <img src="https://storage-vnportal.vnpt.vn/gov-hni/6749/soyte.png" alt="Logo" className="w-20 h-20 mx-auto mb-4 bg-white rounded-full p-2"/>
            <h1 className="text-xl font-bold text-white uppercase">Xác thực Supabase</h1>
          </div>
          <form onSubmit={handleLogin} className="p-8 space-y-5">
            {error && <div className="bg-red-50 border-l-4 border-red-500 p-4 text-red-700 text-sm flex items-center gap-2"><AlertCircle size={18}/>{error}</div>}
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Email</label>
              <input type="text" required value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-3 bg-gray-50 border rounded-xl outline-none" placeholder="admin@soyte.gov.vn"/>
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Mật khẩu</label>
              <input type={showPassword ? "text" : "password"} required value={password} onChange={(e) => setPassword(e.target.value)} className="w-full p-3 bg-gray-50 border rounded-xl outline-none" placeholder="••••••••"/>
            </div>
            <button type="submit" disabled={isLoading} className="w-full py-4 bg-primary-600 text-white font-bold rounded-xl shadow-lg">
              {isLoading ? 'ĐANG ĐĂNG NHẬP...' : 'ĐĂNG NHẬP HỆ THỐNG'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
