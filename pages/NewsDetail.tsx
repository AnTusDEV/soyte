
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
  Facebook,
  Newspaper
} from 'lucide-react';
import { SERVICE_CATEGORIES } from '../constants';
import { NewsItem } from '../types';

// Simplified NewsCard for related posts
const RelatedNewsCard = ({ post }: { post: NewsItem }) => (
  <Link to={`/news/detail/${post.id}`} className="flex items-start gap-4 group p-3 -m-3 rounded-lg hover:bg-gray-50 transition-colors">
    <div className="w-24 h-20 rounded-md overflow-hidden flex-shrink-0">
      <img 
        src={post.image || 'https://images.unsplash.com/photo-1583088580009-2d947c3e90a6?q=80&w=400&auto=format&fit=crop'}
        alt={post.title}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
      />
    </div>
    <div className="flex-1">
      <h3 className="text-[13px] font-bold text-gray-800 leading-snug group-hover:text-red-600 transition-colors line-clamp-3">
        {post.title}
      </h3>
      <p className="text-[11px] text-gray-400 mt-1 font-medium italic">
        {new Date(post.date).toLocaleDateString('vi-VN')}
      </p>
    </div>
  </Link>
);

const NewsDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<any>(null);
  const [relatedPosts, setRelatedPosts] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [fontSize, setFontSize] = useState(16);

  useEffect(() => {
    const fetchPost = async () => {
      if (!id) return;
      try {
        setLoading(true);
        setError(null);
        
        // API returns data in a `data` wrapper
        const postData = await api.get(`/posts/${id}`); 
        if (postData) {
          // Map API response to our NewsItem-like state
          const formattedPost = {
            id: postData.id,
            title: postData.title,
            excerpt: postData.summary,
            content: postData.content,
            date: postData.created_at,
            image: postData.image_url,
            category: postData.category_id,
            view_count: postData.view_count
          };
          setPost(formattedPost);

          // Fetch related posts
          if(postData.category_id) {
            const relatedResponse = await api.get(`/posts`, { 
              params: { 
                category_id: postData.category_id,
                limit: 5,
                exclude: postData.id // Exclude current post
              } 
            });
            // API returns items in a `data` wrapper which is an array
            const relatedData = relatedResponse.data.data;
            if (relatedData && Array.isArray(relatedData)) {
               const formattedRelatedPosts = relatedData.map((p: any) => ({
                id: p.id,
                title: p.title,
                excerpt: p.summary,
                date: p.created_at,
                image: p.image_url,
                category: p.category_id,
              }));
              setRelatedPosts(formattedRelatedPosts);
            }
          }
        } else {
          throw new Error("Không tìm thấy bài viết");
        }

      } catch (err) {
        console.error("Error fetching post:", err);
        setError("Không thể tải được bài viết. Vui lòng thử lại sau.");
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
    window.scrollTo(0, 0);
  }, [id]);
  
  const changeFontSize = (delta: number) => {
    setFontSize(prev => Math.max(14, Math.min(22, prev + delta)));
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center bg-white">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-red-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-400 font-bold text-xs uppercase tracking-widest">Đang tải bài viết...</p>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center bg-gray-50 p-4">
        <div className="text-center space-y-4">
          <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center mx-auto text-gray-400">
             <Search size={40} />
          </div>
          <h2 className="text-2xl font-bold text-gray-800">{error ? "Lỗi" : "Không tìm thấy"}</h2>
          <p className="text-gray-500">{error || "Bài viết bạn tìm không tồn tại hoặc đã bị xóa."}</p>
          <Link to="/" className="inline-flex items-center gap-2 bg-red-600 text-white px-6 py-2 rounded-full font-bold hover:bg-red-700 transition-colors">
            <ArrowLeft size={18} /> Quay về trang chủ
          </Link>
        </div>
      </div>
    );
  }
  
  const category = SERVICE_CATEGORIES.find(c => c.id === post.category);

  return (
    <div className="bg-white min-h-screen font-sans">
       <div className="bg-gray-50 border-b border-gray-200">
        <div className="container mx-auto px-4 py-3">
           <div className="flex items-center text-xs font-bold text-gray-500 uppercase tracking-wider">
              <Link to="/" className="hover:text-red-600 flex items-center gap-1.5">
                <Home size={14} /> Trang chủ
              </Link>
              <ChevronRight size={14} className="mx-2 text-gray-400" />
              <Link to={`/news/${category?.path?.split('/').pop() || 'events'}`} className="hover:text-red-600 line-clamp-1">
                {category?.title || 'Tin tức'}
              </Link>
              <ChevronRight size={14} className="mx-2 text-gray-400" />
              <span className="text-red-600 line-clamp-1 max-w-[200px] md:max-w-none">Chi tiết bài viết</span>
           </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Main Content */}
          <div className="lg:col-span-8">
            <article>
              <header className="mb-6">
                 <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mb-4">
                   {category && (
                     <span className="bg-red-700 text-white text-[10px] font-black px-2 py-1 rounded-sm uppercase tracking-tight">
                       {category.title}
                     </span>
                   )}
                   <div className="flex items-center gap-4 text-xs text-gray-500 font-medium italic">
                      <span className="flex items-center gap-1.5"><Calendar size={14} /> {new Date(post.date).toLocaleDateString('vi-VN')}</span>
                      <span className="flex items-center gap-1.5"><Eye size={14} /> {post.view_count || 0} lượt xem</span>
                   </div>
                </div>

                <h1 className="text-2xl md:text-3xl font-black text-gray-900 leading-tight mb-4">
                  {post.title}
                </h1>

                <div className="flex flex-wrap items-center justify-between gap-4 py-3 border-y border-gray-100 my-6">
                   <div className="flex items-center gap-2 sm:gap-4">
                      <button onClick={() => window.print()} className="flex items-center gap-1.5 text-xs font-bold text-gray-600 hover:text-red-600 transition-colors">
                        <Printer size={16} /> In trang
                      </button>
                      <button 
                        onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`, '_blank')}
                        className="flex items-center gap-1.5 text-xs font-bold text-gray-600 hover:text-blue-600 transition-colors"
                      >
                        <Facebook size={16} /> Chia sẻ
                      </button>
                   </div>
                    
                </div>
              </header>

              {post.excerpt && (
                <div className="mb-8 p-4 bg-gray-50 border-l-4 border-red-600 rounded-r-lg">
                  <p className="text-base md:text-lg font-semibold text-gray-700 leading-relaxed italic">
                    {post.excerpt}
                  </p>
                </div>
              )}

              {post.image && (
                <figure className="mb-8 text-center">
                  <div className="rounded-lg overflow-hidden border border-gray-100 shadow-sm">
                    <img src={post.image} alt={post.title} className="w-full h-auto" />
                  </div>
                  {/* <figcaption className="text-xs text-gray-500 italic font-medium px-4 mt-2">
                    Nguồn: Sở Y tế Hà Nội
                  </figcaption> */}
                </figure>
              )}

              <div 
                className="prose prose-lg max-w-none text-gray-800 leading-relaxed text-justify space-y-5"
                style={{ fontSize: `${fontSize}px` }}
                dangerouslySetInnerHTML={{ __html: post.content || '' }}
              />

              <div className="mt-12 pt-6 border-t border-gray-100 text-right">
                <p className="text-base font-bold text-gray-800 uppercase">Ban Biên Tập</p>
                <p className="text-sm font-medium text-gray-600">Sở Y tế Hà Nội</p>
              </div>
            </article>
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-4 space-y-8 lg:sticky top-28 self-start">
             <div className="bg-gray-50/70 p-1.5 rounded-lg border border-gray-100">
               <div className="relative">
                  <input 
                    type="text" 
                    placeholder="Tìm kiếm bài viết..."
                    className="w-full bg-white pl-4 pr-10 py-3 text-sm font-bold border-gray-200 rounded-md focus:ring-2 focus:ring-red-300 focus:border-red-500"
                  />
                  <button className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-red-600 transition-colors">
                    <Search size={18} />
                  </button>
               </div>
            </div>

            {relatedPosts.length > 0 && (
              <div className="space-y-4">
                <div className="flex items-center gap-3 pb-2 border-b-2 border-red-600">
                  <Newspaper size={20} className="text-red-600" />
                  <h3 className="font-black text-lg text-gray-800 uppercase">Tin cùng chuyên mục</h3>
                </div>
                <div className="space-y-2">
                  {relatedPosts.map(p => <RelatedNewsCard key={p.id} post={p} />)}
                </div>
              </div>
            )}
          </aside>
        </div>
      </div>
    </div>
  );
};

export default NewsDetail;
