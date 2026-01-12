
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Lock, User, Eye, EyeOff, ArrowLeft, ShieldCheck, AlertCircle } from 'lucide-react';
import { auth } from '../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('isLoggedIn') === 'true') {
      navigate('/');
    }
  }, [navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // Tự động thêm domain nếu người dùng chỉ nhập username là 'admin'
      const loginEmail = email.includes('@') ? email : `${email}@soyte.gov.vn`;
      
      const userCredential = await signInWithEmailAndPassword(auth, loginEmail, password);
      const user = userCredential.user;

      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('userName', user.email?.split('@')[0] || 'Quản trị viên');
      
      // Đồng bộ hóa trạng thái đăng nhập cho toàn ứng dụng
      window.dispatchEvent(new Event('storage'));
      navigate('/');
    } catch (err: any) {
      console.error("Firebase Login Error:", err.code, err.message);
      
      switch (err.code) {
        case 'auth/invalid-credential':
          setError('Tên đăng nhập hoặc mật khẩu không chính xác.');
          break;
        case 'auth/user-not-found':
          setError('Tài khoản không tồn tại trên hệ thống.');
          break;
        case 'auth/wrong-password':
          setError('Mật khẩu không chính xác.');
          break;
        case 'auth/too-many-requests':
          setError('Tài khoản bị tạm khóa do nhập sai nhiều lần. Thử lại sau.');
          break;
        case 'auth/network-request-failed':
          setError('Lỗi kết nối mạng. Vui lòng kiểm tra internet.');
          break;
        default:
          setError('Lỗi hệ thống Firebase: ' + (err.message || 'Vui lòng thử lại.'));
      }
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
            <div className="absolute top-0 right-0 opacity-10 -rotate-12 translate-x-4 -translate-y-4">
                <ShieldCheck size={120} className="text-white" />
            </div>
            <img 
              src="https://storage-vnportal.vnpt.vn/gov-hni/6749/soyte.png" 
              alt="Logo Sở Y Tế" 
              className="w-20 h-20 mx-auto mb-4 drop-shadow-md bg-white rounded-full p-2"
            />
            <h1 className="text-xl font-bold text-white uppercase tracking-wider">Hệ thống Xác thực</h1>
            <p className="text-primary-100 text-sm mt-1 font-medium">Cổng thông tin nội bộ Sở Y tế</p>
          </div>

          <form onSubmit={handleLogin} className="p-8 space-y-5">
            {error && (
              <div className="bg-red-50 border-l-4 border-red-500 p-4 flex items-center gap-3 text-red-700 text-sm animate-shake">
                <AlertCircle size={18} />
                <p className="font-medium">{error}</p>
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase mb-2 tracking-widest">Email / Tên đăng nhập</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400 group-focus-within:text-primary-600 transition">
                  <User size={18} />
                </div>
                <input 
                  type="text" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@soyte.gov.vn"
                  className="block w-full pl-10 pr-3 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-100 focus:border-primary-500 transition text-sm font-medium"
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Mật khẩu</label>
                <a href="#" className="text-xs font-bold text-primary-600 hover:text-primary-700">Quên mật khẩu?</a>
              </div>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400 group-focus-within:text-primary-600 transition">
                  <Lock size={18} />
                </div>
                <input 
                  type={showPassword ? "text" : "password"} 
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="block w-full pl-10 pr-12 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-100 focus:border-primary-500 transition text-sm"
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button 
              type="submit"
              disabled={isLoading}
              className={`w-full py-4 px-4 border border-transparent rounded-xl shadow-lg text-sm font-bold text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-all flex items-center justify-center gap-2
                ${isLoading ? 'opacity-70 cursor-not-allowed scale-95' : 'hover:scale-[1.02]'}
              `}
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  ĐANG XÁC THỰC...
                </>
              ) : 'ĐĂNG NHẬP NGAY'}
            </button>
          </form>

          <div className="bg-gray-50 p-6 border-t border-gray-100 text-center">
             <p className="text-xs text-gray-400 font-medium italic">
                Sử dụng hạ tầng Firebase: {auth.app.options.projectId}
             </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
