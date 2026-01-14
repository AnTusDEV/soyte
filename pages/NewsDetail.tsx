
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '../supabase';
import { 
  Calendar, 
  User, 
  Share2, 
  Printer, 
  ChevronRight, 
  Home, 
  ArrowLeft, 
  Clock, 
  Search, 
  TrendingUp, 
  Eye, 
  Plus, 
  Minus,
  MessageSquare,
  Facebook,
  Send
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
        // 1. Try fetching from Supabase
        const { data, error } = await supabase
          .from('posts')
          .select('*')
          .eq('id', id)
          .single();
        
        if (data) {
          setPost(data);
        } else {
          // 2. Fallback to MOCK_NEWS if not found or error
          const mockPost = MOCK_NEWS.find(n => n.id === parseInt(id));
          if (mockPost) {
            setPost({
              ...mockPost,
              summary: mockPost.excerpt,
              imageUrl: mockPost.image,
              content: mockPost.excerpt + "\n\n" + "Đây là nội dung chi tiết bài viết demo được mô phỏng theo cấu trúc của Sở Y tế Hà Nội. Nội dung bao gồm các thông tin chính thức, số liệu thống kê và các chỉ đạo từ ban lãnh đạo. \n\nTrong thời gian tới, ngành Y tế Thủ đô sẽ tiếp tục đẩy mạnh ứng dụng CNTT trong quản lý và điều hành, nâng cao chất lượng phục vụ nhân dân. Tất cả các cơ sở y tế từ tuyến thành phố đến cơ sở sẽ được đồng bộ hóa dữ liệu để phục vụ công tác khám chữa bệnh tốt nhất.",
              createdAt: mockPost.date.split('/').reverse().join('-')
            });
          }
        }
      } catch (error) {
        console.error("Error fetching post detail:", error);
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
  const latestNews = MOCK_NEWS.slice(0, 5);

  return (
    <div className="bg-white min-h-screen font-sans">
      {/* Top Banner (Optional for News Pages) */}
      <div className="bg-gray-100 border-b border-gray-200">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
           <div className="flex items-center text-[11px] font-bold text-gray-500 uppercase">
              <Link to="/" className="hover:text-red-600 flex items-center gap-1">
                <Home size={14} /> Trang chủ
              </Link>
              <ChevronRight size={14} className="mx-2 text-gray-300" />
              <Link to={`/news/${post.category}`} className="hover:text-red-600">
                {category?.title || 'Tin tức'}
              </Link>
              <ChevronRight size={14} className="mx-2 text-gray-300" />
              <span className="text-red-600 line-clamp-1 max-w-[200px] md:max-w-none">Chi tiết tin</span>
           </div>
           <div className="hidden md:flex items-center gap-4 text-xs font-bold text-gray-400">
              <span className="flex items-center gap-1"><Clock size={14}/> {new Date().toLocaleDateString('vi-VN')}</span>
           </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* MAIN CONTENT AREA */}
          <div className="lg:col-span-8">
            <article className="pb-12 border-b border-gray-100">
              <header className="mb-6">
                <div className="flex flex-wrap items-center gap-4 mb-4">
                   <span className="bg-red-700 text-white text-[10px] font-black px-2 py-1 rounded-sm uppercase tracking-tight">
                     {category?.title || 'TIN TỨC'}
                   </span>
                   <div className="flex items-center gap-4 text-[13px] text-gray-400 font-medium italic">
                      <span className="flex items-center gap-1"><Calendar size={14} /> {new Date(post.createdAt).toLocaleDateString('vi-VN')}</span>
                      <span className="flex items-center gap-1"><Eye size={14} /> 1.250 lượt xem</span>
                   </div>
                </div>

                <h1 className="text-2xl md:text-3xl lg:text-4xl font-black text-gray-900 leading-tight mb-6">
                  {post.title}
                </h1>

                {/* Article Toolbar */}
                <div className="flex flex-wrap items-center justify-between gap-4 py-3 border-y border-gray-100 mb-8 bg-gray-50/50 px-4">
                   <div className="flex items-center gap-4">
                      <button onClick={() => window.print()} className="flex items-center gap-1.5 text-xs font-bold text-gray-600 hover:text-red-600 transition">
                        <Printer size={16} /> In trang
                      </button>
                      <button className="flex items-center gap-1.5 text-xs font-bold text-gray-600 hover:text-blue-600 transition">
                        <Facebook size={16} /> Chia sẻ
                      </button>
                      <button className="flex items-center gap-1.5 text-xs font-bold text-gray-600 hover:text-blue-400 transition">
                        <Send size={16} /> Gửi mail
                      </button>
                   </div>
                   <div className="flex items-center gap-3">
                      <span className="text-[10px] font-bold text-gray-400 uppercase">Cỡ chữ:</span>
                      <button onClick={() => changeFontSize(-2)} className="w-8 h-8 rounded border border-gray-200 bg-white flex items-center justify-center hover:bg-gray-50"><Minus size={14}/></button>
                      <button onClick={() => changeFontSize(2)} className="w-8 h-8 rounded border border-gray-200 bg-white flex items-center justify-center hover:bg-gray-50"><Plus size={14}/></button>
                   </div>
                </div>
              </header>

              {/* Sapo / Summary */}
              {post.summary && (
                <div className="mb-8">
                  <p className="text-xl font-black text-gray-800 leading-relaxed text-justify">
                    {post.summary}
                  </p>
                </div>
              )}

              {/* Featured Image */}
              {post.imageUrl && (
                <figure className="mb-10 text-center">
                  <div className="rounded-sm overflow-hidden shadow-sm mb-3">
                    <img src={post.imageUrl} alt={post.title} className="w-full h-auto" />
                  </div>
                  <figcaption className="text-sm text-gray-500 italic font-medium px-4">
                    Hình ảnh minh họa cho: {post.title} - Nguồn: Sở Y tế Hà Nội.
                  </figcaption>
                </figure>
              )}

              {/* Content body */}
              <div 
                className="prose prose-lg max-w-none text-gray-800 leading-relaxed text-justify space-y-6"
                style={{ fontSize: `${fontSize}px` }}
              >
                {post.content.split('\n').map((para: string, i: number) => para.trim() && (
                  <p key={i} className="mb-4">{para}</p>
                ))}
              </div>

              <div className="mt-12 text-right">
                <p className="text-lg font-black text-gray-900 uppercase italic">Ban Biên Tập Sở Y tế Hà Nội</p>
                <p className="text-sm text-gray-400 font-bold uppercase tracking-widest">Nguồn: soyte.hanoi.gov.vn</p>
              </div>

              <div className="mt-12 flex flex-wrap gap-2 items-center">
                 <span className="text-xs font-black text-gray-400 uppercase mr-2">Từ khóa:</span>
                 {['#YTeHaNoi', '#SucKhoeThuDo', '#ChuyenDoiSoYTe', '#COVID2026'].map(tag => (
                   <span key={tag} className="bg-gray-100 hover:bg-red-50 hover:text-red-700 text-gray-500 px-3 py-1 rounded-sm text-[11px] font-bold transition cursor-pointer">
                     {tag}
                   </span>
                 ))}
              </div>
            </article>

            {/* RELATED NEWS GRID (Below article) */}
            <section className="mt-12">
               <div className="flex items-center gap-2 mb-8 border-b-2 border-red-700 pb-2">
                  <h3 className="text-xl font-black text-gray-900 uppercase tracking-tighter">Tin cùng chuyên mục</h3>
               </div>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {MOCK_NEWS.slice(4, 8).map(item => (
                    <Link key={item.id} to={`/news/detail/${item.id}`} className="flex gap-4 group">
                       <div className="w-32 h-20 shrink-0 overflow-hidden rounded-sm shadow-sm">
                          <img src={item.image} className="w-full h-full object-cover group-hover:scale-110 transition duration-500" alt="" />
                       </div>
                       <div className="flex flex-col">
                          <h4 className="text-[14px] font-bold text-gray-800 leading-snug group-hover:text-red-700 transition line-clamp-2">{item.title}</h4>
                          <span className="text-[10px] text-gray-400 font-bold mt-2 flex items-center gap-1 uppercase"><Clock size={10}/> {item.date}</span>
                       </div>
                    </Link>
                  ))}
               </div>
            </section>
          </div>

          {/* SIDEBAR AREA */}
          <aside className="lg:col-span-4 space-y-10">
            {/* Search Box */}
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

            {/* Banners */}
            <div className="space-y-4">
                <img src="https://storage-vnportal.vnpt.vn/gov-hni/5991/Images/20191226154043_dvc.png" className="w-full rounded shadow-sm hover:opacity-90 transition cursor-pointer" alt="DVC" />
                <img src="https://media.baoquangninh.vn/upload/image/202511/original/b38ecbf2b29402f0ee5f03bbf4eb102d.gif" className="w-full rounded shadow-sm" alt="Ads" />
            </div>

            {/* Latest News Sidebar */}
            <div>
               <div className="border-b-2 border-red-700 pb-1 mb-6 flex justify-between items-end">
                  <h3 className="text-lg font-black text-gray-900 uppercase tracking-tighter">Tin mới nhất</h3>
                  <Link to="/news/events" className="text-[10px] font-black text-red-600 hover:underline">TẤT CẢ</Link>
               </div>
               <div className="space-y-5">
                  {latestNews.map((item, idx) => (
                    <Link key={item.id} to={`/news/detail/${item.id}`} className="flex gap-3 group items-start border-b border-gray-50 pb-4 last:border-0 last:pb-0">
                       <span className="text-gray-200 font-black italic text-xl leading-none mt-1 group-hover:text-red-100 transition">{idx + 1}</span>
                       <div className="flex-grow">
                          <h4 className="text-[13px] font-bold text-gray-800 leading-snug group-hover:text-red-700 transition line-clamp-3">{item.title}</h4>
                          <span className="text-[10px] text-gray-400 font-bold mt-2 block uppercase tracking-tighter">{item.date}</span>
                       </div>
                    </Link>
                  ))}
               </div>
            </div>

            {/* Social Connect */}
            <div className="bg-primary-900 p-6 rounded-sm text-white relative overflow-hidden">
               <div className="relative z-10">
                  <h4 className="text-lg font-black mb-2 flex items-center gap-2 italic"><MessageSquare size={20} className="text-secondary-400" /> Đường dây nóng</h4>
                  <p className="text-[11px] text-primary-200 uppercase font-bold tracking-widest mb-4">Sở Y tế Hà Nội tiếp nhận ý kiến</p>
                  <div className="text-3xl font-black text-secondary-400 mb-2">0243 998 5765</div>
                  <p className="text-[10px] text-gray-400">Trực 24/24 tất cả các ngày trong tuần</p>
               </div>
               <div className="absolute top-0 right-0 opacity-10 translate-x-1/3 -translate-y-1/3">
                  <Send size={150} />
               </div>
            </div>

            {/* Documents Section */}
            <div>
              <div className="border-b-2 border-blue-800 pb-1 mb-6">
                <h3 className="text-lg font-black text-blue-900 uppercase tracking-tighter">Văn bản - Chỉ đạo</h3>
              </div>
              <ul className="space-y-4">
                {[
                  "Công văn về tăng cường y tế Tết 2026",
                  "Quyết định nhân sự BV Thanh Nhàn",
                  "Thông báo tuyển dụng cán bộ y tế đợt 1",
                  "Kế hoạch tiêm chủng mở rộng năm 2026"
                ].map((txt, i) => (
                  <li key={i} className="flex gap-2 text-[13px] text-gray-600 hover:text-blue-700 cursor-pointer group">
                    <ChevronRight size={14} className="flex-shrink-0 mt-0.5 text-blue-300 group-hover:text-blue-600" />
                    <span className="font-bold line-clamp-2 leading-snug underline-offset-4 group-hover:underline">{txt}</span>
                  </li>
                ))}
              </ul>
            </div>
          </aside>

        </div>
      </div>
    </div>
  );
};

export default NewsDetail;
