import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { MOCK_NEWS, MAIN_MENU } from '../constants';
import { Calendar, ChevronRight, Share2, Clock, Eye, TrendingUp, Zap, FileText, ChevronRightCircle } from 'lucide-react';

const NewsCategory = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  
  // Find category title logic
  const categoryTitle = MAIN_MENU.find(m => m.path.includes(categoryId || ''))?.title || 
                        MAIN_MENU.flatMap(m => m.children).find(c => c?.path.includes(categoryId || ''))?.title ||
                        "Tin tức y tế";

  // Data Safety Check
  if (!MOCK_NEWS || MOCK_NEWS.length === 0) {
      return (
          <div className="min-h-screen flex items-center justify-center bg-gray-50">
              <div className="text-center">
                  <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                  <p className="text-gray-500">Đang tải dữ liệu tin tức...</p>
              </div>
          </div>
      );
  }

  // Mock Data Logic
  // Featured (Spotlight) Items: Use first 1 for big spotlight, next 3 for side list
  const spotlightItem = MOCK_NEWS[0];
  const subSpotlightItems = MOCK_NEWS.slice(1, 4);
  
  // Main Stream Items: Use next 5 items
  const mainStreamItems = MOCK_NEWS.slice(4, 9);
  
  // Sidebar "Most Read": Sort by ID descending (simulating latest/popular) and take 5
  const mostReadItems = [...MOCK_NEWS].reverse().slice(0, 5);

  return (
    <div className="bg-white min-h-screen font-sans text-gray-800">
      
      {/* 1. Breadcrumb - Simple & Clean */}
      <div className="bg-gray-100 border-b border-gray-200">
        <div className="container mx-auto px-4 py-2.5">
             <div className="flex items-center text-xs text-gray-600 font-medium">
                <Link to="/" className="hover:text-primary-700 uppercase">Trang chủ</Link>
                <ChevronRight size={12} className="mx-2 text-gray-400" />
                <span className="text-primary-700 font-bold uppercase">{categoryTitle}</span>
            </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        
        {/* 2. FOCUS SECTION (Khu vực Tiêu điểm) 
            Layout: Left (Large Item) - Right (Vertical List of 3 items)
        */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8 border-b border-gray-200 pb-8">
            {/* Left: Main Spotlight */}
            <div className="lg:col-span-8 group cursor-pointer">
                <div className="overflow-hidden rounded-sm mb-3 relative bg-gray-200">
                    <img 
                        src={spotlightItem.image} 
                        alt={spotlightItem.title} 
                        className="w-full aspect-[16/9] object-cover transition-transform duration-700 group-hover:scale-105"
                        loading="eager"
                    />
                </div>
                <h1 className="text-2xl md:text-3xl font-bold text-[#b71c1c] leading-tight hover:text-red-800 mb-3 font-sans">
                    {spotlightItem.title}
                </h1>
                <p className="text-gray-700 text-base leading-relaxed mb-2 text-justify">
                    {spotlightItem.excerpt}
                </p>
                <div className="flex items-center text-xs text-gray-500 space-x-3">
                     <span className="flex items-center text-primary-700 font-bold uppercase">
                        {spotlightItem.category}
                     </span>
                     <span>|</span>
                     <span className="flex items-center">
                        <Calendar size={12} className="mr-1" /> {spotlightItem.date}
                     </span>
                </div>
            </div>

            {/* Right: Sub Focus List */}
            <div className="lg:col-span-4 flex flex-col gap-5 border-l border-gray-100 pl-0 lg:pl-6">
                {subSpotlightItems.map((item, idx) => (
                    <div key={idx} className="flex gap-3 group cursor-pointer">
                        <div className="w-1/3 aspect-[4/3] rounded-sm overflow-hidden flex-shrink-0 bg-gray-200">
                             <img 
                                src={item.image} 
                                alt={item.title} 
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                             />
                        </div>
                        <div className="w-2/3 flex flex-col justify-start">
                            <h3 className="text-sm md:text-[15px] font-bold text-gray-800 leading-snug group-hover:text-primary-700 line-clamp-3">
                                {item.title}
                            </h3>
                            <div className="mt-2 text-[10px] text-gray-400 flex items-center">
                                <Clock size={10} className="mr-1" /> {item.date}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>

        {/* 3. MAIN STREAM & SIDEBAR */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* LEFT: LIST NEWS (Dòng sự kiện) */}
            <div className="lg:col-span-9">
                <div className="mb-4 flex items-center border-l-4 border-primary-600 pl-3">
                    <h2 className="text-lg font-bold uppercase text-gray-800">Tin tức mới cập nhật</h2>
                </div>

                <div className="flex flex-col gap-6">
                    {mainStreamItems.map((item, idx) => (
                        <div key={idx} className="flex flex-col md:flex-row gap-5 pb-6 border-b border-gray-100 last:border-0 group">
                            {/* Image */}
                            <div className="w-full md:w-[260px] aspect-[16/10] flex-shrink-0 overflow-hidden rounded-sm bg-gray-200">
                                 <img 
                                    src={item.image} 
                                    alt={item.title} 
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                 />
                            </div>
                            
                            {/* Content */}
                            <div className="flex-grow">
                                <h3 className="text-lg md:text-xl font-bold text-gray-900 leading-snug group-hover:text-primary-700 mb-2">
                                    <Link to={`/news/detail/${item.id}`}>
                                        {item.title}
                                    </Link>
                                </h3>
                                <div className="flex items-center text-xs text-gray-400 mb-3 space-x-2">
                                    <span className="text-primary-600 font-bold uppercase">{item.category}</span>
                                    <span>•</span>
                                    <span>{item.date}</span>
                                </div>
                                <p className="text-gray-600 text-sm leading-relaxed line-clamp-2 md:line-clamp-3 text-justify">
                                    {item.excerpt}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Pagination */}
                <div className="mt-8 flex justify-center gap-2">
                     <button className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-600 text-sm rounded">Trước</button>
                     <button className="px-3 py-1 bg-primary-700 text-white text-sm font-bold rounded">1</button>
                     <button className="px-3 py-1 bg-white border border-gray-200 hover:bg-gray-50 text-gray-600 text-sm rounded">2</button>
                     <button className="px-3 py-1 bg-white border border-gray-200 hover:bg-gray-50 text-gray-600 text-sm rounded">3</button>
                     <button className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-600 text-sm rounded">Tiếp</button>
                </div>
            </div>

            {/* RIGHT: SIDEBAR */}
            <div className="lg:col-span-3 space-y-8 pl-0 lg:pl-2 border-l border-gray-100">
                
                {/* Widget 1: Most Read */}
                <div>
                     <div className="flex items-center justify-between mb-4 border-b border-gray-200 pb-1">
                        <h3 className="text-base font-bold text-red-700 uppercase flex items-center gap-2">
                            <TrendingUp size={18}/> Tin đọc nhiều
                        </h3>
                     </div>
                     <div className="flex flex-col gap-4">
                        {mostReadItems.map((item, idx) => (
                            <div key={idx} className="group flex gap-3 cursor-pointer">
                                <span className={`flex-shrink-0 w-6 h-6 flex items-center justify-center rounded text-xs font-bold ${idx < 3 ? 'bg-gray-200 text-gray-800' : 'bg-gray-100 text-gray-500'}`}>
                                    {idx + 1}
                                </span>
                                <h4 className="text-sm font-semibold text-gray-800 group-hover:text-primary-700 leading-snug line-clamp-3">
                                    {item.title}
                                </h4>
                            </div>
                        ))}
                     </div>
                </div>

                {/* Widget 2: Document / Notice */}
                <div className="bg-blue-50 p-4 rounded-sm border border-blue-100">
                     <h3 className="text-base font-bold text-blue-800 uppercase mb-3 flex items-center gap-2">
                         <FileText size={18}/> Văn bản chỉ đạo
                     </h3>
                     <ul className="space-y-3">
                        <li className="text-xs text-gray-700 hover:text-blue-600 cursor-pointer border-b border-blue-100 pb-2">
                            Công văn số 123/SYT-NVY về việc tăng cường phòng chống dịch sốt xuất huyết...
                        </li>
                        <li className="text-xs text-gray-700 hover:text-blue-600 cursor-pointer border-b border-blue-100 pb-2">
                            Quyết định phê duyệt kế hoạch chuyển đổi số ngành Y tế Hà Nội năm 2024...
                        </li>
                        <li className="text-xs text-gray-700 hover:text-blue-600 cursor-pointer">
                            Thông báo lịch tiếp công dân của Ban Giám đốc Sở Y tế tháng 05/2024...
                        </li>
                     </ul>
                </div>

                {/* Widget 3: Banners */}
                <div className="space-y-4">
                     <img 
                        src="https://soyte.hanoi.gov.vn/uploads/image/2022/10/24/09304323.png" 
                        alt="Banner CCHC" 
                        className="w-full rounded shadow-sm hover:opacity-90 transition bg-gray-200"
                        onError={(e) => {
                            (e.target as HTMLImageElement).src = 'https://via.placeholder.com/300x100?text=Banner+Quang+Cao';
                        }}
                     />
                     <img 
                        src="https://soyte.hanoi.gov.vn/uploads/image/2022/10/24/09310626.png" 
                        alt="Banner Dich vu cong" 
                        className="w-full rounded shadow-sm hover:opacity-90 transition bg-gray-200"
                        onError={(e) => {
                            (e.target as HTMLImageElement).src = 'https://via.placeholder.com/300x100?text=Banner+Dich+Vu+Cong';
                        }}
                     />
                </div>

            </div>

        </div>
      </div>
    </div>
  );
};

export default NewsCategory;