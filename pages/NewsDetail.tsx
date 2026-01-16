
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { api } from '../api';
import { 
  Calendar, 
  Printer, 
  ChevronRight, 
  Home, 
  ArrowLeft, 
  Search, 
  Eye, 
  Plus, 
  Minus,
  Facebook
} from 'lucide-react';
import { SERVICE_CATEGORIES, MOCK_NEWS } from '../constants';

const NewsDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [fontSize, setFontSize] = useState(18);

  useEffect(() => {
    const fetchPost = async () => {
      if (!id) return;
      try {
        setLoading(true);
        const response = await api.get(`/posts/${id}`);
        
        // Xử lý dữ liệu từ wrapper { data: { ... } }
        if (response && response.data) {
          const p = response.data;
          setPost({
            ...p,
            imageUrl: p.image_url,
            category: p.category_id,
            createdAt: p.created_at
          });
        } else {
          throw new Error("Post not found");
        }
      } catch (error) {
        console.error("Error fetching post detail:", error);
        const mockPost = MOCK_NEWS.find(n => n.id === parseInt(id));
        if (mockPost) {
          setPost({
            ...mockPost,
            summary: mockPost.excerpt,
            imageUrl: mockPost.image,
            content: mockPost.excerpt + "\n\n" + "Nội dung bài viết demo phục vụ mục tiêu hiển thị. Trong thực tế, dữ liệu này sẽ được lấy từ API http://localhost:7001/.",
            createdAt: mockPost.date.split('/').reverse().join('-')
          });
        }
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
    window.scrollTo(0, 0);
  }, [id]);

  const changeFontSize = (delta: number) => {
    setFontSize(prev => Math.min(Math.max(prev + delta, 14), 24));
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-red-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-400 font-bold text-xs uppercase tracking-widest">Đang tải bài viết...</p>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
        <div className="text-center space-y-4">
          <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center mx-auto text-gray-400">
             <Search size={40} />
          </div>
          <h2 className="text-2xl font-bold text-gray-800">Không tìm thấy bài viết</h2>
          <p className="text-gray-500">Bài viết có thể đã hết hạn hoặc đường dẫn không đúng.</p>
          <Link to="/" className="inline-flex items-center gap-2 bg-red-600 text-white px-6 py-2 rounded-full font-bold hover:bg-red-700 transition">
            <ArrowLeft size={18} /> Quay về trang chủ
          </Link>
        </div>
      </div>
    );
  }

  const category = SERVICE_CATEGORIES.find(c => c.id === post.category);

  return (
    <div className="bg-white min-h-screen font-sans">
      <div className="bg-gray-100 border-b border-gray-200">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
           <div className="flex items-center text-[11px] font-bold text-gray-500 uppercase">
              <Link to="/" className="hover:text-red-600 flex items-center gap-1">
                <Home size={14} /> Trang chủ
              </Link>
              <ChevronRight size={14} className="mx-2 text-gray-300" />
              <Link to={`/news/${post.category || 'events'}`} className="hover:text-red-600">
                {category?.title || 'Tin tức'}
              </Link>
              <ChevronRight size={14} className="mx-2 text-gray-300" />
              <span className="text-red-600 line-clamp-1 max-w-[200px] md:max-w-none">Chi tiết tin</span>
           </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-8">
            <article className="pb-12 border-b border-gray-100">
              <header className="mb-6">
                <div className="flex flex-wrap items-center gap-4 mb-4">
                   <span className="bg-red-700 text-white text-[10px] font-black px-2 py-1 rounded-sm uppercase tracking-tight">
                     {category?.title || 'TIN TỨC'}
                   </span>
                   <div className="flex items-center gap-4 text-[13px] text-gray-400 font-medium italic">
                      <span className="flex items-center gap-1"><Calendar size={14} /> {new Date(post.createdAt).toLocaleDateString('vi-VN')}</span>
                      <span className="flex items-center gap-1"><Eye size={14} /> {post.view_count || 0} lượt xem</span>
                   </div>
                </div>

                <h1 className="text-2xl md:text-3xl lg:text-4xl font-black text-gray-900 leading-tight mb-6">
                  {post.title}
                </h1>

                <div className="flex flex-wrap items-center justify-between gap-4 py-3 border-y border-gray-100 mb-8 bg-gray-50/50 px-4">
                   <div className="flex items-center gap-4">
                      <button onClick={() => window.print()} className="flex items-center gap-1.5 text-xs font-bold text-gray-600 hover:text-red-600 transition">
                        <Printer size={16} /> In trang
                      </button>
                      <button className="flex items-center gap-1.5 text-xs font-bold text-gray-600 hover:text-blue-600 transition">
                        <Facebook size={16} /> Chia sẻ
                      </button>
                   </div>
                   <div className="flex items-center gap-3">
                      <span className="text-[10px] font-bold text-gray-400 uppercase">Cỡ chữ:</span>
                      <button onClick={() => changeFontSize(-2)} className="w-8 h-8 rounded border border-gray-200 bg-white flex items-center justify-center hover:bg-gray-50"><Minus size={14}/></button>
                      <button onClick={() => changeFontSize(2)} className="w-8 h-8 rounded border border-gray-200 bg-white flex items-center justify-center hover:bg-gray-50"><Plus size={14}/></button>
                   </div>
                </div>
              </header>

              {post.summary && (
                <div className="mb-8">
                  <p className="text-xl font-black text-gray-800 leading-relaxed text-justify">
                    {post.summary}
                  </p>
                </div>
              )}

              {post.imageUrl && (
                <figure className="mb-10 text-center">
                  <div className="rounded-sm overflow-hidden shadow-sm mb-3">
                    <img src={post.imageUrl} alt={post.title} className="w-full h-auto" />
                  </div>
                  <figcaption className="text-sm text-gray-500 italic font-medium px-4">
                    Nguồn: Sở Y tế Hà Nội.
                  </figcaption>
                </figure>
              )}

              <div 
                className="prose prose-lg max-w-none text-gray-800 leading-relaxed text-justify space-y-6"
                style={{ fontSize: `${fontSize}px` }}
              >
                {post.content && post.content.split('\n').map((para: string, i: number) => para.trim() && (
                  <p key={i} className="mb-4">{para}</p>
                ))}
              </div>

              <div className="mt-12 text-right">
                <p className="text-lg font-black text-gray-900 uppercase italic">Ban Biên Tập Sở Y tế Hà Nội</p>
              </div>
            </article>
          </div>

          <aside className="lg:col-span-4 space-y-10">
            <div className="bg-red-700 p-1.5 rounded-sm shadow-lg">
               <div className="relative">
                  <input 
                    type="text" 
                    placeholder="Tìm kiếm thông tin..."
                    className="w-full bg-white pl-4 pr-10 py-3 text-sm font-bold border-none focus:ring-0 outline-none"
                  />
                  <button className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-red-600 transition">
                    <Search size={18} />
                  </button>
               </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default NewsDetail;
