
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, ArrowLeft, AlertCircle, Loader2 } from 'lucide-react';
import { api } from '../api';

interface LoginProps {
  onLoginSuccess?: () => void;
}

const Login: React.FC<LoginProps> = ({ onLoginSuccess }) => {
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
      // Append domain if user just enters a username
      const loginEmail = email.includes('@') ? email : `${email}@soyte.gov.vn`;
      
      const data = await api.post('/auth/login', {
        email: loginEmail,
        password: password,
      });

      if (data && data.token) {
        localStorage.setItem('auth_token', data.token);
        
        // Trigger auth refresh in App.tsx
        if (onLoginSuccess) {
          await onLoginSuccess();
        }
        window.dispatchEvent(new Event('auth-change'));
        
        // Final transition to Admin
        navigate('/admin', { replace: true });
      } else {
        throw new Error("Phản hồi từ máy chủ không hợp lệ.");
      }
    } catch (err: any) {
      console.error("Login component error:", err);
      if (err.message.includes('Failed to fetch')) {
        setError('Không thể kết nối đến máy chủ API (http://localhost:7001). Vui lòng kiểm tra lại dịch vụ backend.');
      } else {
        setError('Đăng nhập thất bại: Tài khoản hoặc mật khẩu không chính xác.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 py-12">
      <div className="max-w-md w-full animate-in fade-in slide-in-from-bottom-4 duration-500">
        <Link to="/" className="inline-flex items-center text-sm text-gray-500 hover:text-primary-600 mb-6 transition group">
          <ArrowLeft size={16} className="mr-2 group-hover:-translate-x-1 transition-transform" /> Quay lại trang chủ
        </Link>
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
          <div className="bg-primary-700 p-8 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
            <img src="https://storage-vnportal.vnpt.vn/gov-hni/6749/soyte.png" alt="Logo" className="w-20 h-20 mx-auto mb-4 bg-white rounded-full p-2 shadow-lg relative z-10"/>
            <h1 className="text-xl font-bold text-white uppercase tracking-tight relative z-10">Hệ Thống Quản Trị</h1>
            <p className="text-primary-200 text-xs font-medium uppercase tracking-widest mt-1 relative z-10">Sở Y Tế Hà Nội</p>
          </div>
          <form onSubmit={handleLogin} className="p-8 space-y-5">
            {error && (
              <div className="bg-red-50 border-l-4 border-red-500 p-4 text-red-700 text-sm flex items-start gap-3 animate-in fade-in slide-in-from-top-2">
                <AlertCircle size={18} className="shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}
            <div>
              <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Tài khoản / Email</label>
              <input 
                type="text" 
                required 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                className="w-full p-3.5 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-primary-100 focus:bg-white transition-all" 
                placeholder="admin@soyte.gov.vn"
              />
            </div>
            <div>
              <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Mật khẩu</label>
              <div className="relative">
                <input 
                  type={showPassword ? "text" : "password"} 
                  required 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                  className="w-full p-3.5 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-primary-100 focus:bg-white transition-all" 
                  placeholder="••••••••"
                />
                <button 
                  type="button" 
                  onClick={() => setShowPassword(!showPassword)} 
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary-600 transition-colors"
                >
                  {showPassword ? <EyeOff size={18}/> : <Eye size={18}/>}
                </button>
              </div>
            </div>
            <button 
              type="submit" 
              disabled={isLoading} 
              className="w-full py-4 bg-primary-600 text-white font-bold rounded-xl shadow-lg hover:bg-primary-700 transition-all flex items-center justify-center gap-2 disabled:opacity-70 group"
            >
              {isLoading ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  <span>ĐANG KIỂM TRA...</span>
                </>
              ) : (
                <>
                  <span>ĐANG ĐĂNG NHẬP</span>
                </>
              )}
            </button>
          </form>
          <div className="bg-gray-50 p-4 text-center border-t border-gray-100">
             <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Truy cập nội bộ dành cho cán bộ Sở Y Tế</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
