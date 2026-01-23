import React, { useState, useEffect } from "react";
// Standard named imports from react-router-dom
import { useParams, Link } from "react-router-dom";
import {
  MOCK_NEWS,
  MAIN_MENU, 
} from "../constants";
import { api } from "../api";
import {
  ChevronRight,
  TrendingUp,
  Clock, 
  Home as HomeIcon, 
  Zap,
  ListOrdered, 
} from "lucide-react";

const NewsCategory = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const [dbLatest, setDbLatest] = useState<any[]>([]);
  const [dbSpotlight, setDbSpotlight] = useState<any>(null);
  const [loadingSidebar, setLoadingSidebar] = useState(true); 
  const featuredHighlights = MOCK_NEWS.slice(4,7)

  // Fetch Sidebar Data from Local API
  useEffect(() => {
    const fetchSidebarData = async () => {
      try {
        const data = await api.get(
          "/posts?status=published&limit=11&order=createdAt.desc"
        );

        if (data && data.length > 0) {
          setDbSpotlight(data[0]);
          setDbLatest(data.slice(1, 11));
        } else {
          throw new Error("No posts found");
        }
      } catch (err) {
        console.error("Error fetching sidebar news:", err);
        const fallbackMapped = MOCK_NEWS.map((n) => ({
          id: n.id,
          title: n.title,
          summary: n.excerpt,
          imageUrl: n.image,
          category: n.category,
          createdAt: n.date.split("/").reverse().join("-"),
        }));
        setDbSpotlight(fallbackMapped[0]);
        setDbLatest(fallbackMapped.slice(1, 11));
      } finally {
        setLoadingSidebar(false);
      }
    };
    fetchSidebarData();
  }, []);

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

  return (
    <div className="bg-white min-h-screen font-sans text-gray-800 pb-12">
      {/* 1. Breadcrumbs */}
      <div className="bg-gray-50 border-b border-gray-200">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center text-xs text-gray-500 font-medium uppercase tracking-tight">
            <Link
              to="/"
              className="hover:text-primary-700 flex items-center gap-1"
            >
              <HomeIcon size={14} /> TRANG CHỦ
            </Link>
            <ChevronRight size={14} className="mx-2 text-gray-400" />
            <span className="text-red-700 font-bold">{categoryTitle}</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 pt-8">
        {categoryId === "events" && (
          <div className="space-y-10 mb-12">
            {/* Lớp 1: Grid tin chính & sidebar mini */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Tin ảnh lớn bên trái */}
              <div className="lg:col-span-5 group cursor-pointer">
                <div className="overflow-hidden rounded-sm mb-4 relative bg-gray-100 shadow-sm">
                  <img
                    src={spotlightItem.image}
                    alt={spotlightItem.title}
                    className="w-full aspect-[16/9] object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <h2 className="text-xl md:text-2xl font-black text-gray-900 leading-tight hover:text-red-700 mb-3 transition-colors">
                  {spotlightItem.title}
                </h2>
              </div>

              {/* Tin mới nhận ở giữa */}
              <div className="lg:col-span-3 flex flex-col divide-y divide-gray-100">
                <div className="bg-gray-900 text-white px-4 py-2 text-[10px] font-black uppercase tracking-widest mb-4">
                  Tin Mới Nhận
                </div>
                {hotNewsItems.map((item, idx) => (
                  <Link
                    key={idx}
                    to={`/news/detail/${item.id}`}
                    className="group py-4 flex flex-col gap-2 first:pt-0"
                  >
                    {/* <div className="w-full aspect-video flex-shrink-0 overflow-hidden rounded-sm bg-gray-100">
                      <img
                        src={item.image}
                        alt=""
                        className="w-full h-full object-cover transition-transform group-hover:scale-110"
                      />
                    </div> */}
                    <h3 className="text-[13px] font-bold text-gray-800 line-clamp-3 group-hover:text-red-700 transition-colors">
                      • {item.title}
                    </h3>
                  </Link>
                ))}
              </div>

              {/* Tin đọc nhiều bên phải */}
              <div className="lg:col-span-4 bg-gray-50 border border-gray-200 rounded-sm overflow-hidden h-fit">
                <div className="bg-red-700 px-4 py-2.5">
                  <h3 className="text-white text-xs font-black uppercase flex items-center gap-2">
                    <TrendingUp size={16} /> Tin đọc nhiều
                  </h3>
                </div>
                <div className="p-4 flex flex-col gap-4">
                  {mostReadItems.map((item, idx) => (
                    <Link
                      key={idx}
                      to={`/news/detail/${item.id}`}
                      className="group flex gap-3 items-start border-b border-gray-100 last:border-0 pb-3 last:pb-0"
                    >
                      <span
                        className={`flex-shrink-0 w-6 h-6 flex items-center justify-center rounded text-[11px] font-black italic ${idx < 3 ? "text-red-600 bg-red-50" : "text-gray-400 bg-white"}`}
                      >
                        {idx + 1}
                      </span>
                      <h4 className="text-[13px] font-bold text-gray-800 group-hover:text-red-600 leading-snug">
                        {item.title}
                      </h4>
                    </Link>
                  ))}
                </div>
              </div>
              <div className="lg:col-span-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {featuredHighlights.map((item) => (
                    <div key={item.id} className="group cursor-pointer">
                      <div className="aspect-[16/10] overflow-hidden rounded-sm shadow-sm bg-gray-100">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                      </div>
                      <h3 className="text-[15px] font-bold text-gray-900 leading-snug group-hover:text-red-700 transition-colors">
                        {item.title}
                      </h3>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 3. DANH SÁCH TIN TỨC CHÍNH BÊN DƯỚI */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Cột trái: Stream tin chính */}
          <div className="lg:col-span-8">
            <div className="mb-8 border-b-2 border-red-700 pb-1 flex justify-between items-end">
              <h2 className="text-xl font-black uppercase text-gray-900 tracking-tighter">
                {categoryTitle}
              </h2>
            </div>
            <div className="space-y-8">
              {streamItems.map((item, idx) => (
                <div
                  key={idx}
                  className="flex flex-col md:flex-row gap-6 pb-8 border-b border-gray-100 last:border-0 group cursor-pointer"
                >
                  <div className="w-full md:w-[280px] aspect-[16/10] flex-shrink-0 overflow-hidden rounded-sm shadow-sm">
                    <img
                      src={item.image}
                      alt=""
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="flex-grow">
                    <h3 className="text-xl font-bold text-gray-900 leading-tight group-hover:text-red-700 transition-colors mb-3">
                      <Link to={`/news/detail/${item.id}`}>{item.title}</Link>
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed line-clamp-2">
                      {item.excerpt}
                    </p>
                    <div className="flex items-center gap-2 mt-4 text-[11px] font-bold text-gray-400 uppercase">
                      <Clock size={12} /> {spotlightItem.date}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Phân trang (Demo) */}
            <div className="mt-12 flex justify-center gap-2">
              <button className="px-4 py-2 bg-red-700 text-white font-bold rounded-sm text-sm">
                1
              </button>
              <button className="px-4 py-2 bg-gray-100 text-gray-600 font-bold rounded-sm text-sm hover:bg-gray-200">
                2
              </button>
              <button className="px-4 py-2 bg-gray-100 text-gray-600 font-bold rounded-sm text-sm hover:bg-gray-200">
                3
              </button>
              <button className="px-4 py-2 bg-gray-100 text-gray-600 font-bold rounded-sm text-sm hover:bg-gray-200">
                Tiếp
              </button>
            </div>
          </div>

          {/* Cột phải: Sidebar bổ sung */}
          <div className="lg:col-span-4 space-y-10">
            <div>
              <div className="border-b-2 border-red-600 pb-1 mb-4">
                <h3 className="text-sm font-black text-red-600 uppercase flex items-center gap-2">
                  <Zap size={18} className="fill-current" /> Tiêu điểm y tế
                </h3>
              </div>
              {loadingSidebar ? (
                <div className="animate-pulse space-y-2">
                  <div className="bg-gray-200 h-32 w-full rounded"></div>
                  <div className="bg-gray-200 h-4 w-3/4 rounded"></div>
                </div>
              ) : (
                dbSpotlight && (
                  <Link
                    to={`/news/detail/${dbSpotlight.id}`}
                    className="group block"
                  >
                    <div className="relative aspect-video rounded-sm overflow-hidden mb-3 shadow-md">
                      <img
                        src={dbSpotlight.imageUrl}
                        className="w-full h-full object-cover transition-transform group-hover:scale-105"
                        alt=""
                      />
                    </div>
                    <h4 className="text-[14px] font-black text-gray-900 group-hover:text-red-700 leading-tight">
                      {dbSpotlight.title}
                    </h4>
                  </Link>
                )
              )}
            </div>

            <div>
              <div className="border-b-2 border-slate-800 pb-1 mb-4">
                <h3 className="text-sm font-black text-slate-800 uppercase flex items-center gap-2">
                  <ListOrdered size={18} /> Tin mới nhất
                </h3>
              </div>
              <div className="space-y-4">
                {dbLatest.map((post, idx) => (
                  <Link
                    key={post.id}
                    to={`/news/detail/${post.id}`}
                    className="flex gap-3 group border-b border-gray-50 pb-3 last:border-0 last:pb-0 items-start"
                  >
                    <span className="text-[10px] font-black italic mt-1 w-6 h-6 flex-shrink-0 flex items-center justify-center rounded-sm bg-gray-50 text-gray-400">
                      {idx + 1}
                    </span>
                    <h4 className="text-[13px] font-bold text-gray-700 group-hover:text-primary-700 leading-snug">
                      {post.title}
                    </h4>
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
