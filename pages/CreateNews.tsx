
import React, { useState, useEffect } from 'react';
import { 
  FileText, 
  Image as ImageIcon, 
  Tag, 
  Save, 
  Send, 
  Eye, 
  ArrowLeft,
  LayoutGrid,
  Settings,
  Plus,
  ChevronDown,
  Info,
  Clock,
  Globe,
  Lock
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { SERVICE_CATEGORIES } from '../constants';

const CreateNews = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    excerpt: '',
    content: '',
    imageUrl: '',
    tags: '',
    status: 'draft',
    priority: 'normal',
    visibility: 'public'
  });

  useEffect(() => {
    if (localStorage.getItem('isLoggedIn') !== 'true') {
      navigate('/login');
    }
  }, [navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.category) {
        alert('Vui lòng chọn danh mục bài viết');
        return;
    }
    setIsSubmitting(true);
    // Giả lập lưu bài viết
    setTimeout(() => {
      alert('Bài viết đã được gửi duyệt thành công!');
      navigate('/news/events');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-20 font-sans">
      {/* Top Admin Action Bar */}
      <div className="bg-white border-b border-gray-200 sticky top-0 lg:top-[128px] z-50 px-4 py-3 shadow-sm">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-4">
            <Link to="/" className="p-2 hover:bg-gray-100 rounded-full transition text-gray-400 hover:text-primary-600" title="Về trang chủ">
              <ArrowLeft size={20} />
            </Link>
            <div className="h-8 w-[1px] bg-gray-200 hidden md:block"></div>
            <div>
              <h1 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                <FileText size={20} className="text-primary-600" /> Biên soạn Tin tức mới
              </h1>
              <div className="flex items-center gap-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                <span>Soạn thảo</span>
                <span className="text-gray-200">/</span>
                <span className="text-secondary-600">Sẵn sàng xuất bản</span>
              </div>
            </div>
          </div>
          <div className="flex gap-3 w-full md:w-auto">
            <button type="button" className="flex-1 md:flex-none flex items-center justify-center gap-2 px-5 py-2.5 border border-gray-200 rounded-xl text-sm font-bold text-gray-600 hover:bg-gray-50 transition shadow-sm">
              <Save size={16} /> Lưu nháp
            </button>
            <button 
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-2.5 bg-primary-600 text-white rounded-xl text-sm font-bold hover:bg-primary-700 transition shadow-lg shadow-primary-600/20 active:scale-95 disabled:opacity-50"
            >
              {isSubmitting ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <><Send size={16} /> Đăng bài ngay</>
              )}
            </button>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="container mx-auto px-4 mt-8 max-w-6xl animate-in fade-in slide-in-from-top-2 duration-500">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Main Editing Area */}
          <div className="lg:col-span-3 space-y-6">
            {/* Title & Excerpt */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 ring-1 ring-black/[0.02]">
               <div className="mb-8">
                 <label className="block text-xs font-bold text-gray-300 uppercase mb-3 tracking-widest">Tiêu đề bài viết <span className="text-red-500">*</span></label>
                 <input 
                    type="text" 
                    name="title"
                    required
                    placeholder="VD: Sở Y tế Hà Nội khánh thành trung tâm điều hành 115 thông minh..."
                    className="w-full text-2xl md:text-4xl font-black p-0 border-none focus:ring-0 placeholder-gray-200 text-gray-900 leading-tight"
                    value={formData.title}
                    onChange={handleChange}
                 />
                 <div className="h-1 bg-primary-100 w-24 mt-4 rounded-full"></div>
               </div>

               <div>
                 <label className="block text-xs font-bold text-gray-300 uppercase mb-3 tracking-widest">Mô tả ngắn (Sapo)</label>
                 <textarea 
                    name="excerpt"
                    rows={3}
                    placeholder="Mô tả tóm tắt nội dung để hiển thị trên danh sách tin tức (150-200 ký tự)..."
                    className="w-full border-none focus:ring-0 text-gray-600 font-medium italic bg-slate-50 rounded-xl p-5 resize-none leading-relaxed"
                    value={formData.excerpt}
                    onChange={handleChange}
                 />
               </div>
            </div>

            {/* Content Editor Placeholder */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden ring-1 ring-black/[0.02]">
               <div className="bg-slate-50 px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                     <button type="button" className="p-2 hover:bg-white rounded-lg text-gray-600 font-bold transition shadow-sm border border-transparent hover:border-gray-200">B</button>
                     <button type="button" className="p-2 hover:bg-white rounded-lg text-gray-600 italic transition shadow-sm border border-transparent hover:border-gray-200">I</button>
                     <button type="button" className="p-2 hover:bg-white rounded-lg text-gray-600 underline transition shadow-sm border border-transparent hover:border-gray-200">U</button>
                     <div className="w-[1px] h-6 bg-gray-200 mx-2"></div>
                     <button type="button" className="p-2 hover:bg-white rounded-lg text-gray-600 transition shadow-sm border border-transparent hover:border-gray-200 flex items-center gap-2">
                        <ImageIcon size={16} /> <span className="text-xs font-bold">Chèn ảnh</span>
                     </button>
                  </div>
                  <span className="text-[10px] text-gray-400 font-bold uppercase tracking-tighter">Trình soạn thảo văn bản</span>
               </div>
               <textarea 
                  name="content"
                  rows={20}
                  required
                  placeholder="Nhập nội dung bài viết chi tiết tại đây. Bạn có thể chèn bảng, danh sách và liên kết..."
                  className="w-full border-none focus:ring-0 text-gray-800 leading-relaxed p-8 min-h-[600px] text-lg"
                  value={formData.content}
                  onChange={handleChange}
               />
            </div>
          </div>

          {/* Side Settings Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            
            {/* Category Section */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 ring-1 ring-black/[0.02]">
               <div className="flex items-center gap-2 mb-5 text-primary-700">
                 <LayoutGrid size={18} strokeWidth={2.5}/>
                 <h3 className="text-sm font-bold uppercase tracking-wider">Cấu trúc tin</h3>
               </div>
               <div className="space-y-5">
                  <div>
                    <label className="block text-[10px] font-bold text-gray-400 uppercase mb-2 tracking-widest">Danh mục bài viết <span className="text-red-500">*</span></label>
                    <div className="relative">
                        <select 
                          name="category"
                          required
                          className="w-full appearance-none bg-slate-50 border border-gray-100 rounded-xl py-3 px-4 pr-10 text-sm font-bold text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-100 focus:border-primary-500 transition cursor-pointer"
                          value={formData.category}
                          onChange={handleChange}
                        >
                          <option value="">-- Chọn chuyên mục --</option>
                          {SERVICE_CATEGORIES.map(cat => (
                              <option key={cat.id} value={cat.id}>{cat.title}</option>
                          ))}
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-[10px] font-bold text-gray-400 uppercase mb-2 tracking-widest">Thẻ từ khóa (Tags)</label>
                    <div className="relative">
                        <Tag className="absolute left-3 top-3 text-gray-300" size={16} />
                        <input 
                          type="text"
                          name="tags"
                          placeholder="covid, hanoi, vắc xin..."
                          className="w-full bg-slate-50 border border-gray-100 rounded-xl py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary-100 font-medium"
                          value={formData.tags}
                          onChange={handleChange}
                        />
                    </div>
                  </div>
               </div>
            </div>

            {/* Featured Image */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 ring-1 ring-black/[0.02]">
               <div className="flex items-center gap-2 mb-5 text-primary-700">
                 <ImageIcon size={18} strokeWidth={2.5}/>
                 <h3 className="text-sm font-bold uppercase tracking-wider">Ảnh tiêu điểm</h3>
               </div>
               <div 
                 className="group relative border-2 border-dashed border-slate-100 rounded-2xl aspect-video flex flex-col items-center justify-center bg-slate-50 hover:bg-slate-100/50 transition-all cursor-pointer overflow-hidden shadow-inner"
                 onClick={() => {}}
               >
                  {formData.imageUrl ? (
                    <img src={formData.imageUrl} className="w-full h-full object-cover" />
                  ) : (
                    <>
                      <div className="bg-white p-3 rounded-full shadow-md text-gray-300 group-hover:scale-110 group-hover:text-primary-500 transition-all">
                        <Plus size={24} />
                      </div>
                      <p className="mt-3 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Chọn ảnh lên</p>
                    </>
                  )}
               </div>
               <div className="mt-4">
                  <input 
                    type="text" 
                    name="imageUrl"
                    placeholder="Hoặc dán URL ảnh đại diện..."
                    className="w-full text-[10px] bg-slate-50 border border-gray-100 rounded-lg py-2 px-3 focus:outline-none focus:ring-1 focus:ring-primary-500 font-medium"
                    value={formData.imageUrl}
                    onChange={handleChange}
                  />
               </div>
            </div>

            {/* Visibility & Publishing */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 ring-1 ring-black/[0.02]">
               <div className="flex items-center gap-2 mb-5 text-primary-700">
                 <Settings size={18} strokeWidth={2.5}/>
                 <h3 className="text-sm font-bold uppercase tracking-wider">Thiết lập đăng</h3>
               </div>
               <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
                    <span className="text-[11px] font-bold text-gray-500 uppercase tracking-tight">Chế độ</span>
                    <div className="flex items-center gap-1.5 text-xs font-bold text-primary-700">
                        <Globe size={14} /> Công khai
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
                    <span className="text-[11px] font-bold text-gray-500 uppercase tracking-tight">Lịch đăng</span>
                    <div className="flex items-center gap-1.5 text-xs font-bold text-gray-700">
                        <Clock size={14} /> Ngay lập tức
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
                    <span className="text-[11px] font-bold text-gray-500 uppercase tracking-tight">Duyệt bài</span>
                    <div className="flex items-center gap-1.5 text-xs font-bold text-orange-600">
                        <Lock size={14} /> Cần cấp trên duyệt
                    </div>
                  </div>
               </div>
            </div>

            <button type="button" className="w-full flex items-center justify-center gap-2 py-3.5 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-2xl font-black text-xs uppercase tracking-widest transition-all hover:scale-[1.02]">
               <Eye size={18} /> Xem trước bài viết
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateNews;
