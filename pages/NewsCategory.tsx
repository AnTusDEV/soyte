
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { MOCK_NEWS, MAIN_MENU, MOCK_VIDEOS, SERVICE_CATEGORIES } from "../constants";
import { supabase } from "../supabase"; 
import { 
  ChevronRight,
  TrendingUp,
  Clock,
  FileText,
  Play,
  Home as HomeIcon,
  ChevronRightCircle,
  Share2, 
  Zap,
  ListOrdered,
  ArrowRight
} from "lucide-react";

const NewsCategory = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const [dbLatest, setDbLatest] = useState<any[]>([]);
  const [dbSpotlight, setDbSpotlight] = useState<any>(null);
  const [loadingSidebar, setLoadingSidebar] = useState(true);

  // Fetch Sidebar Data from Supabase
  useEffect(() => {
    const fetchSidebarData = async () => {
      try {
        const { data, error } = await supabase
          .from('posts')
          .select('*')
          .eq('status', 'published')
          .order('createdAt', { ascending: false })
          .limit(11);
        
        if (error) throw error;
        if (data && data.length > 0) {
          setDbSpotlight(data[0]);
          setDbLatest(data.slice(1, 11));
        } else {
          // Fallback to MOCK_NEWS if DB is empty
          const fallbackMapped = MOCK_NEWS.map(n => ({
            id: n.id,
            title: n.title,
            summary: n.excerpt,
            imageUrl: n.image,
            category: n.category,
            createdAt: n.date.split('/').reverse().join('-') // Simplified conversion
          }));
          setDbSpotlight(fallbackMapped[0]);
          setDbLatest(fallbackMapped.slice(1, 11));
        }
      } catch (err) {
        console.error("Error fetching sidebar news:", err);
        // Fallback on error too
        const fallbackMapped = MOCK_NEWS.map(n => ({
          id: n.id,
          title: n.title,
          summary: n.excerpt,
          imageUrl: n.image,
          category: n.category,
          createdAt: n.date.split('/').reverse().join('-')
        }));
        setDbSpotlight(fallbackMapped[0]);
        setDbLatest(fallbackMapped.slice(1, 11));
      } finally {
        setLoadingSidebar(false);
      }
    };
    fetchSidebarData();
  }, []);

  // Find category title logic
  const categoryTitle =
    MAIN_MENU.find((m) => m.path.includes(categoryId || ""))?.title ||
    MAIN_MENU.flatMap((m) => m.children).find((c) =>
      c?.path.includes(categoryId || "")
    )?.title ||
    "Tin tức y tế";

  const spotlightItem = MOCK_NEWS[0];
  const hotNewsItems = MOCK_NEWS.slice(1, 5);
  const streamItems = [...MOCK_NEWS, ...MOCK_NEWS].slice(2, 10);
  const mostReadItems = [...MOCK_NEWS].reverse().slice(0, 5);
  const relatedItems = MOCK_NEWS.slice(3, 7); 

  // Standard Layout for other categories
  if (categoryId !== "events") {
    return (
      <div className="bg-white min-h-screen font-sans pb-12">
        <div className="bg-gray-50 border-b border-gray-200">
          <div className="container mx-auto px-4 py-3">
            <div className="flex items-center text-xs text-gray-500 font-medium uppercase">
              <Link to="/" className="hover:text-primary-700 flex items-center gap-1">
                <HomeIcon size={14} /> Trang chủ
              </Link>
              <ChevronRight size={14} className="mx-2" />
              <span className="font-bold text-primary-800">{categoryTitle}</span>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          <h1 className="text-2xl font-bold border-l-4 border-primary-600 pl-4 mb-8 uppercase">
            {categoryTitle}
          </h1>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8 space-y-6">
              {streamItems.map((item, idx) => (
                <div key={idx} className="flex flex-col md:flex-row gap-4 border-b border-gray-100 pb-6 last:border-0 group cursor-pointer">
                  <div className="w-full md:w-64 h-40 flex-shrink-0 overflow-hidden rounded shadow-sm">
                    <img src={item.image} className="w-full h-full object-cover group-hover:scale-105 transition" alt="" />
                  </div>
                  <div className="flex-grow">
                    <h3 className="text-lg font-bold text-gray-800 group-hover:text-primary-600 transition mb-2">
                      <Link to={`/news/detail/${item.id}`}>{item.title}</Link>
                    </h3>
                    <p className="text-sm text-gray-500 line-clamp-3 mb-3">{item.excerpt}</p>
                    <span className="text-xs text-gray-400 font-medium">{item.date}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="lg:col-span-4 space-y-8">
              <div className="bg-primary-50 p-4 rounded-lg border border-primary-100">
                <h3 className="font-bold text-primary-900 mb-4 flex items-center gap-2"><TrendingUp size={18} /> Đọc nhiều nhất</h3>
                <ul className="space-y-3">
                  {mostReadItems.map((m, i) => (
                    <li key={i} className="text-sm text-gray-700 hover:text-primary-700 cursor-pointer border-b border-primary-100 pb-2 last:border-0">
                      {m.title}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Complex 'Events' Layout with full Sidebar
  return (
    <div className="bg-white min-h-screen font-sans text-gray-800 pb-12">
      <div className="bg-gray-50 border-b border-gray-200">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center text-xs text-gray-500 font-medium uppercase tracking-tight">
            <Link to="/" className="hover:text-primary-700 flex items-center gap-1">
              <HomeIcon size={14} /> TRANG CHỦ
            </Link>
            <ChevronRight size={14} className="mx-2 text-gray-400" />
            <span className="text-red-700 font-bold">{categoryTitle}</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-10">
          <div className="lg:col-span-6 group cursor-pointer">
            <div className="overflow-hidden rounded-sm mb-4 relative bg-gray-100 shadow-sm">
              <img src={spotlightItem.image} alt={spotlightItem.title} className="w-full aspect-[16/9] object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute top-4 left-4">
                <span className="bg-red-600 text-white text-[10px] font-black px-2 py-1 uppercase rounded-sm shadow-lg">Tin Nổi Bật</span>
              </div>
            </div>
            <h1 className="text-2xl md:text-3xl font-black text-gray-900 leading-tight hover:text-red-700 mb-3 transition-colors">{spotlightItem.title}</h1>
            <p className="text-gray-600 text-base leading-relaxed mb-4 line-clamp-3">{spotlightItem.excerpt}</p>
            <div className="flex items-center gap-4 text-xs text-gray-400 font-medium">
              <span className="flex items-center gap-1 text-red-600 font-bold"><Clock size={12} /> {spotlightItem.date}</span>
              <span className="flex items-center gap-1 hover:text-blue-600"><Share2 size={12} /> Chia sẻ</span>
            </div>
          </div>

          <div className="lg:col-span-2 flex flex-col divide-y divide-gray-100">
            <div className="bg-gray-900 text-white px-4 py-2 text-xs font-bold uppercase tracking-widest mb-4">Tin Mới Nhận</div>
            {hotNewsItems.map((item, idx) => (
              <Link key={idx} to={`/news/detail/${item.id}`} className="group py-4 flex gap-4 first:pt-0">
                <div className="w-24 h-16 flex-shrink-0 overflow-hidden rounded-sm bg-gray-100">
                  <img src={item.image} alt="" className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" />
                </div>
                <h3 className="text-[14px] font-bold text-gray-800 leading-snug group-hover:text-red-600 transition-colors line-clamp-3">{item.title}</h3>
              </Link>
            ))}
          </div>

          <div className="lg:col-span-4 bg-gray-50 border border-gray-200 rounded-sm overflow-hidden">
            <div
              className="ads-zone-group zonegroup-vertical"
              id="ads-zone-10"
              data-id="10"
              data-type="vertical"
              data-position="ads_sidebar_top"
              data-timeflip="1000"
            >
              <div className="ads-block-item text-center ">
                <a
                  href="https://soyte.hanoi.gov.vn/?gidzl=psEiAISx3ppCVgGj928BCyX-e2mu9Lior7cd93fnNc66Vg1mOI4CDOrohofhA5O_rY7-83RUQvec9Je0FG"
                  target=""
                >
                  <img src="https://storage-vnportal.vnpt.vn/gov-hni/5991/Images/20191226154043_dvc.png" alt="Quảng cáo" />
                </a>
              </div>
            </div>

            <div className="bg-red-700 px-4 py-2.5">
              <h3 className="text-white text-xs font-black uppercase flex items-center gap-2"><TrendingUp size={16} /> Tin đọc nhiều</h3>
            </div>
            <div className="p-4 flex flex-col gap-4">
              {mostReadItems.map((item, idx) => (
                <Link key={idx} to={`/news/detail/${item.id}`} className="group flex gap-3 items-start border-b border-gray-100 last:border-0 pb-3 last:pb-0">
                  <span className={`flex-shrink-0 w-6 h-6 flex items-center justify-center rounded text-[11px] font-black italic ${idx < 3 ? "text-red-600 bg-red-50" : "text-gray-400 bg-white"}`}>{idx + 1}</span>
                  <h4 className="text-[13px] font-bold text-gray-800 group-hover:text-red-600 leading-snug transition-colors">{item.title}</h4>
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-8">
            <div className="mb-8 border-b-2 border-red-700 pb-1 flex justify-between items-end">
              <h2 className="text-xl font-black uppercase text-gray-900 tracking-tighter">{categoryTitle}</h2>
              <div className="flex gap-4 text-xs font-bold text-gray-400 uppercase tracking-widest">
                 <span className="text-red-600 border-b-2 border-red-600 pb-1 cursor-pointer">Mới nhất</span>
                 <span className="hover:text-red-600 cursor-pointer transition">Xem nhiều</span>
              </div>
            </div>
            <div className="space-y-8">
              {streamItems.map((item, idx) => (
                <div key={idx} className="flex flex-col md:flex-row gap-6 pb-8 border-b border-gray-100 last:border-0 group cursor-pointer">
                  <div className="w-full md:w-[280px] aspect-[16/10] flex-shrink-0 overflow-hidden rounded-sm shadow-sm">
                    <img src={item.image} alt="" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  </div>
                  <div className="flex-grow">
                    <h3 className="text-xl font-bold text-gray-900 leading-tight group-hover:text-red-700 transition-colors mb-3">
                      <Link to={`/news/detail/${item.id}`}>{item.title}</Link>
                    </h3>
                    <div className="flex items-center gap-3 text-[11px] text-gray-400 font-bold uppercase mb-3">
                      <span className="text-blue-600">{item.category}</span>
                      <span className="text-gray-200">|</span>
                      <span>{item.date}</span>
                    </div>
                    <p className="text-gray-600 text-sm leading-relaxed line-clamp-2 md:line-clamp-3">{item.excerpt}</p>
                    <Link to={`/news/detail/${item.id}`} className="inline-flex items-center gap-1.5 mt-4 text-[11px] font-black text-primary-600 hover:text-primary-800 uppercase group-hover:translate-x-1 transition-all">
                      Xem chi tiết <ArrowRight size={12}/>
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12 flex justify-center gap-2">
               {[1, 2, 3, 4, 5].map(page => (
                 <button key={page} className={`w-10 h-10 rounded-sm font-black text-sm border transition-all ${page === 1 ? 'bg-red-700 border-red-700 text-white shadow-lg' : 'bg-white border-gray-200 text-gray-500 hover:bg-gray-50'}`}>
                    {page}
                 </button>
               ))}
               <button className="w-10 h-10 rounded-sm font-black text-sm border bg-white border-gray-200 text-gray-500 hover:bg-gray-50">»</button>
            </div>
          </div>

          <div className="lg:col-span-4 space-y-10">
            {/* 1. Văn bản chỉ đạo */}
            <div>
              <div className="border-b-2 border-blue-800 pb-1 mb-4 flex justify-between items-end">
                <h3 className="text-sm font-black text-blue-800 uppercase flex items-center gap-2"><FileText size={18} /> Văn bản chỉ đạo</h3>
                <Link to="/documents" className="text-[10px] font-bold text-blue-600 hover:underline">Tất cả</Link>
              </div>
              <ul className="space-y-4">
                {["Công văn 54/SYT phòng chống rét...", "Quyết định nhân sự BV Xanh Pôn...", "Thông báo tuyển dụng y tế 2026..."].map((txt, i) => (
                  <li key={i} className="flex gap-2 text-[13px] text-gray-600 hover:text-blue-700 cursor-pointer group">
                    <ChevronRightCircle size={14} className="flex-shrink-0 mt-0.5 text-blue-300 group-hover:text-blue-600" />
                    <span className="font-medium line-clamp-2">{txt}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* 2. Media Highlight */}
            <div className="bg-slate-900 rounded-sm overflow-hidden shadow-lg p-4">
              <h3 className="text-white text-xs font-black uppercase mb-4 border-l-4 border-red-600 pl-3">Media Highlight</h3>
              <div className="relative group cursor-pointer overflow-hidden rounded-sm mb-3">
                <img src={MOCK_VIDEOS[0].thumbnail} className="w-full aspect-video object-cover opacity-80 group-hover:scale-105 transition" alt="" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-12 bg-red-600 text-white rounded-full flex items-center justify-center shadow-lg transform group-hover:scale-110 transition">
                    <Play size={24} fill="white" className="ml-1" />
                  </div>
                </div>
              </div>
              <h4 className="text-white text-sm font-bold leading-snug line-clamp-2 hover:text-red-400 transition cursor-pointer">{MOCK_VIDEOS[0].title}</h4>
            </div> 
            {/* 3. TIÊU ĐIỂM (Sidebar) */}
            <div>
              <div className="border-b-2 border-red-600 pb-1 mb-4">
                <h3 className="text-sm font-black text-red-600 uppercase flex items-center gap-2"><Zap size={18} className="fill-current" /> Tiêu điểm y tế</h3>
              </div>
              {loadingSidebar ? (
                <div className="animate-pulse space-y-2">
                  <div className="bg-gray-200 h-32 w-full rounded"></div>
                  <div className="bg-gray-200 h-4 w-3/4 rounded"></div>
                </div>
              ) : dbSpotlight && (
                <Link to={`/news/detail/${dbSpotlight.id}`} className="group block">
                  <div className="relative aspect-video rounded-xl overflow-hidden mb-3 shadow-md">
                    <img src={dbSpotlight.imageUrl} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" alt="" />
                    <span className="absolute top-2 left-2 bg-red-600 text-white text-[9px] font-black px-2 py-0.5 rounded shadow-lg uppercase tracking-tighter">Spotlight</span>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                       <span className="text-white text-[10px] font-bold flex items-center gap-1"><Clock size={12}/> Xem ngay</span>
                    </div>
                  </div>
                  <h4 className="text-[14px] font-black text-gray-900 group-hover:text-red-700 leading-tight mb-2 line-clamp-2 transition-colors">{dbSpotlight.title}</h4>
                  <p className="text-[12px] text-gray-500 line-clamp-2 italic leading-relaxed">{dbSpotlight.summary}</p>
                </Link>
              )}
            </div>

            {/* 4. BÀI VIẾT MỚI NHẤT (Sidebar) */}
            <div>
              <div className="border-b-2 border-slate-800 pb-1 mb-4 flex justify-between items-end">
                <h3 className="text-sm font-black text-slate-800 uppercase flex items-center gap-2"><ListOrdered size={18} /> Tin mới nhất</h3>
              </div>
              <div className="space-y-4">
                {loadingSidebar ? (
                  [...Array(10)].map((_, i) => <div key={i} className="h-4 bg-gray-100 animate-pulse rounded"></div>)
                ) : dbLatest.map((post, idx) => (
                  <Link key={post.id} to={`/news/detail/${post.id}`} className="flex gap-3 group border-b border-gray-50 pb-3 last:border-0 last:pb-0 items-start">
                    <span className={`text-[10px] font-black italic mt-1 w-6 h-6 flex-shrink-0 flex items-center justify-center rounded-sm transition-all ${idx < 3 ? 'bg-red-50 text-red-600 border border-red-100' : 'bg-gray-50 text-gray-400 border border-gray-100'}`}>
                      {idx + 1}
                    </span>
                    <div className="flex-grow">
                      <h4 className="text-[13px] font-bold text-gray-700 group-hover:text-primary-700 leading-snug transition-colors line-clamp-2">
                        {post.title}
                      </h4>
                      <div className="flex items-center gap-3 mt-1.5">
                        <p className="text-[9px] text-gray-400 font-bold uppercase flex items-center gap-1">
                          <Clock size={10} /> {new Date(post.createdAt).toLocaleDateString('vi-VN')}
                        </p>
                        <span className="text-[9px] text-blue-600 font-black uppercase tracking-tighter">
                          {SERVICE_CATEGORIES.find(c => c.id === post.category)?.title || "Y tế"}
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsCategory;
