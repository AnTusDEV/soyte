
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, ArrowLeft, AlertCircle, Loader2, UserPlus, Building2, Mail, User } from 'lucide-react';
import { api } from '../api';

const Register: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    unit: ''
  });
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Mật khẩu xác nhận không khớp.');
      return;
    }

    setIsLoading(true);

    try {
      await api.post('/register', {
        fullName: formData.fullName,
        email: formData.email,
        password: formData.password,
        unit: formData.unit
      });
      navigate('/login');
    } catch (err: any) {
      setError('Đăng ký thất bại: ' + (err.response?.data?.message || err.message || 'Lỗi hệ thống, vui lòng thử lại sau.'));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#e5e7eb] flex items-center justify-center p-4 py-12">
      <div className="max-w-lg w-full animate-in fade-in slide-in-from-bottom-4 duration-500">
        <Link to="/login" className="inline-flex items-center text-sm text-gray-500 hover:text-primary-600 mb-6 transition group">
          <ArrowLeft size={16} className="mr-2 group-hover:-translate-x-1 transition-transform" /> Quay lại đăng nhập
        </Link>
        
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100">
          {/* Header Section */}
          <div className="bg-[#0066a2] p-8 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
            
            <div className="relative z-10">
              <div className="w-20 h-20 mx-auto mb-4 bg-white rounded-full p-0.5 shadow-lg flex items-center justify-center overflow-hidden border-2 border-white">
                <img 
                  src="https://storage-vnportal.vnpt.vn/gov-hni/6749/soyte.png" 
                  alt="Logo" 
                  className="w-full h-full object-contain"
                />
              </div>
              <h1 className="text-xl font-bold text-white uppercase tracking-tight">Đăng Ký Tài Khoản</h1>
              <p className="text-white/80 text-[10px] font-medium uppercase tracking-widest mt-1">Dành cho cán bộ Sở Y Tế Hà Nội</p>
            </div>
          </div>

          <form onSubmit={handleRegister} className="p-8 space-y-5">
            {error && (
              <div className="bg-red-50 border-l-4 border-red-500 p-4 text-red-700 text-sm flex items-start gap-3 animate-in fade-in slide-in-from-top-2">
                <AlertCircle size={18} className="shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="md:col-span-2">
                <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-widest mb-2">Họ và tên cán bộ</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input 
                    type="text" 
                    required 
                    value={formData.fullName}
                    onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                    className="w-full p-4 pl-12 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-primary-100 focus:bg-white transition-all text-sm font-medium" 
                    placeholder="Nguyễn Văn A"
                  />
                </div>
              </div>

              <div className="md:col-span-2">
                <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-widest mb-2">Email công vụ (@soyte.gov.vn)</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input 
                    type="email" 
                    required 
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full p-4 pl-12 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-primary-100 focus:bg-white transition-all text-sm font-medium" 
                    placeholder="canbo@soyte.gov.vn"
                  />
                </div>
              </div>

              <div className="md:col-span-2">
                <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-widest mb-2">Đơn vị công tác</label>
                <div className="relative">
                  <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <select 
                    required 
                    value={formData.unit}
                    onChange={(e) => setFormData({...formData, unit: e.target.value})}
                    className="w-full p-4 pl-12 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-primary-100 focus:bg-white transition-all text-sm font-medium appearance-none"
                  >
                    <option value="">-- Chọn đơn vị --</option>
                    <option value="VP">Văn phòng Sở</option>
                    <option value="NVY">Phòng Nghiệp vụ Y</option>
                    <option value="NVD">Phòng Nghiệp vụ Dược</option>
                    <option value="KHTC">Phòng Kế hoạch - Tài chính</option>
                    <option value="BV">Đơn vị sự nghiệp (Bệnh viện)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-widest mb-2">Mật khẩu</label>
                <div className="relative">
                  <input 
                    type={showPassword ? "text" : "password"} 
                    required 
                    value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                    className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-primary-100 focus:bg-white transition-all text-sm font-medium" 
                    placeholder="••••••••"
                  />
                  <button 
                    type="button" 
                    onClick={() => setShowPassword(!showPassword)} 
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary-600 transition-colors"
                  >
                    {showPassword ? <EyeOff size={18}/> : <Eye size={18}/>}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-widest mb-2">Xác nhận mật khẩu</label>
                <input 
                  type={showPassword ? "text" : "password"} 
                  required 
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                  className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-primary-100 focus:bg-white transition-all text-sm font-medium" 
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div className="pt-4">
              <button 
                type="submit" 
                disabled={isLoading} 
                className="w-full py-4 bg-[#0088cc] text-white font-bold rounded-xl shadow-lg hover:bg-[#0077bb] transition-all flex items-center justify-center gap-2 disabled:opacity-70 active:scale-[0.98]"
              >
                {isLoading ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    <span className="uppercase tracking-widest">Đang xử lý...</span>
                  </>
                ) : (
                  <>
                    <UserPlus size={18} />
                    <span className="uppercase tracking-widest">Gửi yêu cầu đăng ký</span>
                  </>
                )}
              </button>
            </div>
          </form>

          <div className="bg-gray-50/50 p-6 text-center border-t border-gray-100">
             <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest leading-relaxed">
               Lưu ý: Tài khoản đăng ký cần được quản trị viên hệ thống phê duyệt trước khi có thể sử dụng.
             </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
