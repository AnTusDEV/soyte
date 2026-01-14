
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '../supabase';
import { Calendar, User, Share2, Printer, ChevronRight, Home, ArrowLeft, Clock } from 'lucide-react';
import { SERVICE_CATEGORIES } from '../constants';

const NewsDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      if (!id) return;
      try {
        const { data, error } = await supabase
          .from('posts')
          .select('*')
          .eq('id', id)
          .single();
        
        if (error) throw error;
        setPost(data);
      } catch (error) {
        console.error("Error fetching post detail:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
    window.scrollTo(0, 0);
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-4 border-primary-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-400 font-bold text-xs uppercase tracking-widest">Đang tải nội dung...</p>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-bold text-gray-800">Không tìm thấy bài viết</h2>
          <p className="text-gray-500">Bài viết có thể đã hết hạn hoặc đã bị gỡ bỏ.</p>
          <Link to="/" className="inline-flex items-center gap-2 text-primary-600 font-bold hover:underline">
            <ArrowLeft size={18} /> Quay về trang chủ
          </Link>
        </div>
      </div>
    );
  }

  const category = SERVICE_CATEGORIES.find(c => c.id === post.category);

  return (
    <div className="bg-white min-h-screen font-sans pb-20">
      {/* Breadcrumb */}
      <div className="bg-gray-50 border-b border-gray-100">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center text-[10px] md:text-xs text-gray-500 font-bold uppercase tracking-tight">
            <Link to="/" className="hover:text-primary-700 flex items-center gap-1">
              <Home size={14} /> TRANG CHỦ
            </Link>
            <ChevronRight size={14} className="mx-2 text-gray-300" />
            <Link to={`/news/${post.category}`} className="hover:text-primary-700 text-red-600">
              {category?.title || 'TIN TỨC'}
            </Link>
            <ChevronRight size={14} className="mx-2 text-gray-300 hidden md:block" />
            <span className="text-gray-400 hidden md:block truncate max-w-[300px]">{post.title}</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <article>
          {/* Header */}
          <header className="mb-8 border-b border-gray-100 pb-6">
            <div className="flex items-center gap-3 mb-4">
               <span className="bg-red-600 text-white text-[10px] font-black px-2 py-0.5 rounded-sm uppercase">
                 {category?.title || 'Tin tức'}
               </span>
               <div className="flex items-center gap-1.5 text-xs text-gray-400 font-medium">
                  <Calendar size={14} />
                  <span>{new Date(post.createdAt).toLocaleDateString('vi-VN')}</span>
               </div>
               <div className="flex items-center gap-1.5 text-xs text-gray-400 font-medium">
                  <Clock size={14} />
                  <span>{new Date(post.createdAt).toLocaleTimeString('vi-VN', {hour: '2-digit', minute:'2-digit'})}</span>
               </div>
            </div>

            <h1 className="text-2xl md:text-4xl font-black text-gray-900 leading-tight mb-6">
              {post.title}
            </h1>

            <div className="flex justify-between items-center">
               <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center">
                    <User size={16} />
                  </div>
                  <span className="text-xs font-bold text-gray-600">Ban Biên Tập Sở Y Tế</span>
               </div>
               <div className="flex gap-3">
                  <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors" title="Chia sẻ">
                    <Share2 size={18} />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-gray-900 transition-colors" title="In trang">
                    <Printer size={18} />
                  </button>
               </div>
            </div>
          </header>

          {/* Featured Image */}
          {post.imageUrl && (
            <div className="mb-10 rounded-2xl overflow-hidden shadow-lg border border-gray-100">
              <img src={post.imageUrl} alt={post.title} className="w-full h-auto object-cover max-h-[500px]" />
            </div>
          )}

          {/* Sapo / Summary */}
          {post.summary && (
            <div className="mb-8 p-6 bg-gray-50 border-l-4 border-primary-600 rounded-r-xl">
              <p className="text-lg font-bold text-gray-700 italic leading-relaxed">
                {post.summary}
              </p>
            </div>
          )}

          {/* Content */}
          <div className="prose prose-lg max-w-none text-gray-800 leading-8 text-justify space-y-6">
            {post.content.split('\n').map((para: string, i: number) => para.trim() && (
              <p key={i} className="mb-4">{para}</p>
            ))}
          </div>

          {/* Footer of article */}
          <footer className="mt-12 pt-8 border-t border-gray-100">
             <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <p className="text-sm font-bold text-gray-500 italic">Theo Cổng thông tin điện tử Sở Y tế Hà Nội</p>
                <div className="flex gap-2">
                   <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Từ khóa:</span>
                   <span className="text-xs font-bold text-primary-600 bg-primary-50 px-2 py-0.5 rounded hover:bg-primary-100 cursor-pointer">#YTeThuDo</span>
                   <span className="text-xs font-bold text-primary-600 bg-primary-50 px-2 py-0.5 rounded hover:bg-primary-100 cursor-pointer">#SucKhoe</span>
                </div>
             </div>

             <div className="mt-10 bg-blue-50 p-4 rounded-xl border border-blue-100 flex items-center gap-4">
                <div className="bg-white p-2 rounded-full shadow-sm text-blue-600">
                  <Clock size={20} />
                </div>
                <p className="text-xs text-blue-800 font-medium">
                  Lưu ý: Bài viết này được cài đặt tự động lưu trữ vào ngày <b>{new Date(post.expireAt).toLocaleDateString('vi-VN')}</b>.
                </p>
             </div>
          </footer>
        </article>
      </div>
    </div>
  );
};

export default NewsDetail;
