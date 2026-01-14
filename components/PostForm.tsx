
import React, { useState, useEffect, useRef } from 'react';
import { X, Send, Save, Image as ImageIcon, Link as LinkIcon, Upload, AlertCircle, Loader2, Clock } from 'lucide-react';
import { SERVICE_CATEGORIES } from '../constants';
import { supabase } from '../supabase';

interface PostFormProps {
  initialData?: any;
  onClose: () => void;
  onSave: () => void;
}

const PostForm: React.FC<PostFormProps> = ({ initialData, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    title: '',
    summary: '',
    content: '',
    category: '',
    status: 'draft',
    imageUrl: ''
  });
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [errors, setErrors] = useState<any>({});
  const fileInputRef = useRef<HTMLInputElement>(null);

  const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || '',
        summary: initialData.summary || '',
        content: initialData.content || '',
        category: initialData.category || '',
        status: initialData.status || 'draft',
        imageUrl: initialData.imageUrl || ''
      });
    }
  }, [initialData]);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > MAX_FILE_SIZE) {
      alert("Dung lượng ảnh quá lớn! Vui lòng chọn ảnh dưới 2MB.");
      return;
    }

    setUploading(true);
    setUploadProgress(10);

    try {
      const fileName = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.]/g, '_')}`;
      const filePath = `post-images/${fileName}`;

      const { data, error } = await supabase.storage
        .from('posts')
        .upload(filePath, file, { cacheControl: '3600', upsert: false });

      if (error) throw error;

      setUploadProgress(90);

      const { data: { publicUrl } } = supabase.storage
        .from('posts')
        .getPublicUrl(filePath);

      setFormData(prev => ({ ...prev, imageUrl: publicUrl }));
      setUploadProgress(100);
      setUploading(false);
    } catch (err: any) {
      console.error("Upload error:", err);
      alert("Lỗi tải ảnh: " + err.message);
      setUploading(false);
    }
  };

  const validate = () => {
    const newErrors: any = {};
    if (!formData.title.trim()) newErrors.title = 'Tiêu đề không được để trống';
    if (!formData.category) newErrors.category = 'Vui lòng chọn danh mục';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    if (uploading) return;
    
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      alert("Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.");
      return;
    }

    setLoading(true);
    try {
      const now = new Date();
      const expireDate = new Date();
      expireDate.setMonth(now.getMonth() + 1);

      const postData: any = {
        title: formData.title.trim(),
        summary: formData.summary.trim(),
        content: formData.content.trim(),
        category: formData.category,
        status: formData.status,
        imageUrl: formData.imageUrl,
        authorEmail: session.user.email,
        updatedAt: new Date().toISOString(),
        expireAt: expireDate.toISOString(),
      };

      if (initialData?.id) {
        const { error } = await supabase
          .from('posts')
          .update(postData)
          .eq('id', initialData.id);
        if (error) throw error;
      } else {
        postData.createdAt = new Date().toISOString();
        const { error } = await supabase
          .from('posts')
          .insert([postData]);
        if (error) throw error;
      }
      onSave();
    } catch (error: any) {
      console.error("Error saving post:", error);
      alert(`Lỗi lưu bài viết: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white w-full max-w-5xl rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 flex flex-col max-h-[95vh]">
        <div className="bg-primary-700 p-4 flex justify-between items-center text-white shrink-0">
          <h3 className="font-bold flex items-center gap-2">
            {initialData ? <Save size={20} /> : <Send size={20} />}
            {initialData ? 'CHỈNH SỬA BÀI VIẾT' : 'SOẠN THẢO BÀI VIẾT MỚI'}
          </h3>
          <button onClick={onClose} className="hover:bg-white/20 p-1 rounded-full">
            <X size={20} />
          </button>
        </div>

        <div className="flex flex-col lg:flex-row overflow-hidden flex-grow">
          <form onSubmit={handleSubmit} id="post-form" className="flex-grow p-6 space-y-4 overflow-y-auto no-scrollbar">
            <div className="bg-blue-50 border border-blue-100 p-3 rounded-lg mb-4">
               <p className="text-[11px] text-blue-700 font-bold flex items-center gap-2">
                  <Clock size={14} /> TỰ ĐỘNG XÓA: Bài viết này sẽ tự động gỡ bỏ sau 30 ngày kể từ khi xuất bản để đảm bảo tính cập nhật của hệ thống.
               </p>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Tiêu đề bài viết <span className="text-red-500">*</span></label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Nhập tiêu đề bài viết..."
                className={`w-full p-3 bg-gray-50 border ${errors.title ? 'border-red-500' : 'border-gray-200'} rounded-lg focus:ring-2 focus:ring-primary-100 outline-none font-bold text-gray-800`}
              />
              {errors.title && <p className="text-red-500 text-[10px] mt-1 font-bold">{errors.title}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Danh mục <span className="text-red-500">*</span></label>
                <select 
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className={`w-full p-3 bg-gray-50 border ${errors.category ? 'border-red-500' : 'border-gray-200'} rounded-lg outline-none text-sm font-medium`}
                >
                  <option value="">-- Chọn danh mục --</option>
                  {SERVICE_CATEGORIES.map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.title}</option>
                  ))}
                </select>
                {errors.category && <p className="text-red-500 text-[10px] mt-1 font-bold">{errors.category}</p>}
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Trạng thái xuất bản</label>
                <select 
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value as 'draft' | 'published' })}
                  className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg outline-none text-sm font-medium"
                >
                  <option value="draft">Bản nháp (Draft)</option>
                  <option value="published">Công khai (Published)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Ảnh đại diện bài viết</label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                    <LinkIcon size={16} />
                  </div>
                  <input
                    type="text"
                    value={formData.imageUrl}
                    onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                    placeholder="Link ảnh ngoại mạng..."
                    className="w-full pl-10 pr-3 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-100 outline-none text-xs"
                  />
                </div>
                <div className="flex gap-2">
                   <button 
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={uploading}
                    className="flex-1 bg-white border-2 border-primary-600 text-primary-600 px-4 py-3 rounded-lg font-bold text-xs flex items-center justify-center gap-2 hover:bg-primary-50 transition-all disabled:opacity-50"
                   >
                     {uploading ? <Loader2 size={16} className="animate-spin"/> : <Upload size={16}/>}
                     TẢI ẢNH LÊN
                   </button>
                   <input 
                    type="file" 
                    ref={fileInputRef} 
                    onChange={handleFileUpload} 
                    className="hidden" 
                    accept="image/*"
                   />
                </div>
              </div>
              {uploading && (
                <div className="mt-2 w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">
                  <div 
                    className="bg-primary-600 h-full transition-all duration-300" 
                    style={{ width: `${uploadProgress}%` }}
                  ></div>
                </div>
              )}
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Nội dung tóm tắt</label>
              <textarea
                rows={2}
                value={formData.summary}
                onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
                placeholder="Nhập tóm tắt ngắn gọn..."
                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg outline-none text-sm leading-relaxed"
              ></textarea>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Nội dung chi tiết</label>
              <textarea
                rows={10}
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                placeholder="Nội dung bài viết đầy đủ..."
                className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl outline-none text-sm font-medium leading-relaxed min-h-[300px]"
              ></textarea>
            </div>
          </form>

          <div className="w-full lg:w-80 bg-gray-50 border-l border-gray-100 p-6 shrink-0 flex flex-col items-center">
            <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-6 w-full text-center">Xem trước tin bài</h4>
            
            <div className="w-full bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden group">
              <div className="relative aspect-[16/10] bg-gray-100 overflow-hidden">
                {formData.imageUrl ? (
                  <img 
                    src={formData.imageUrl} 
                    alt="Preview" 
                    className="w-full h-full object-cover transition-transform group-hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center text-gray-300">
                    <ImageIcon size={48} strokeWidth={1} />
                    <span className="text-[10px] font-bold mt-2 uppercase tracking-tighter">Chưa có ảnh đại diện</span>
                  </div>
                )}
                <div className="absolute top-2 left-2">
                   <span className={`text-[9px] px-2 py-0.5 rounded-sm font-black text-white uppercase shadow-lg ${formData.category ? 'bg-primary-600' : 'bg-gray-400'}`}>
                      {formData.category ? SERVICE_CATEGORIES.find(c => c.id === formData.category)?.title : 'Danh mục'}
                   </span>
                </div>
              </div>
              <div className="p-4">
                <h5 className="font-bold text-gray-800 text-sm leading-tight mb-2 line-clamp-2">
                  {formData.title || 'Tiêu đề bài viết...'}
                </h5>
                <p className="text-[11px] text-gray-500 line-clamp-2 mb-3">
                  {formData.summary || 'Nội dung tóm tắt sẽ hiển thị tại đây khi bạn nhập vào form...'}
                </p>
                <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-50">
                   <div className="flex items-center gap-1.5">
                      <div className={`w-2 h-2 rounded-full ${formData.status === 'published' ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                      <span className="text-[9px] font-black text-gray-500 uppercase tracking-widest">
                        {formData.status === 'published' ? 'Công khai' : 'Nháp'}
                      </span>
                   </div>
                   <span className="text-[10px] text-gray-400 font-medium italic">Vừa xong</span>
                </div>
              </div>
            </div>

            <div className="mt-8 p-4 bg-amber-50 rounded-xl border border-amber-100 w-full space-y-2">
                <div className="flex items-center gap-2 text-amber-700">
                   <AlertCircle size={16} />
                   <h6 className="text-[10px] font-black uppercase">Lưu ý hệ thống</h6>
                </div>
                <p className="text-[10px] text-amber-800 leading-relaxed">
                  Giới hạn kích thước ảnh tải lên là <b>2MB</b>. Bài viết sau khi đăng sẽ được duyệt bởi Ban Biên Tập trước khi hiển thị chính thức.
                </p>
            </div>
          </div>
        </div>

        <div className="p-4 border-t border-gray-100 flex gap-3 bg-gray-50 shrink-0">
          <button
            type="submit"
            form="post-form"
            disabled={loading || uploading}
            className="flex-1 bg-primary-600 hover:bg-primary-700 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-xl shadow-primary-100 disabled:opacity-50"
          >
            {loading ? <Loader2 className="animate-spin" size={20}/> : (initialData ? <Save size={20}/> : <Send size={20} />)}
            {initialData ? 'CẬP NHẬT THAY ĐỔI' : 'XUẤT BẢN BÀI VIẾT'}
          </button>
          <button
            type="button"
            onClick={onClose}
            className="px-8 bg-white border border-gray-200 hover:bg-gray-100 text-gray-600 font-bold py-4 rounded-xl transition-all"
          >
            QUAY LẠI
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostForm;
