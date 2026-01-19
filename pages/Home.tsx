import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Activity,
  Phone,
  Play,
  Radio,
  Clock,
  ChevronRight,
  ChevronLeft,
  Zap,
  Loader2,
} from "lucide-react";
import {
  SERVICE_CATEGORIES,
  MOCK_NEWS,
  MOCK_VIDEOS,
  MOCK_CULTURE,
  MOCK_SPORTS,
} from "../constants";
import HospitalSlider from "../components/HospitalSlider";
import { api } from "../api";
const Home = () => {
  const [activeChannel, setActiveChannel] = useState("H1");
  const [currentVideo, setCurrentVideo] = useState(MOCK_VIDEOS[0]);
  const [dbPosts, setDbPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const images = [
    "https://suckhoethudo.vn/assets/anh2-r7WidWql.jpg",
    "https://suckhoethudo.vn/assets/anh1-CFkqSFx4.png",
  ];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const fetchLatestPosts = async () => {
      try {
        const response = await api.get(
          "/posts?status=published&limit=11&order=createdAt.desc"
        );

        // Dữ liệu mới nằm trong response.data
        if (response && response.data && Array.isArray(response.data)) {
          const mappedPosts = response.data.map((p: any) => ({
            id: p.id,
            title: p.title,
            summary: p.summary,
            content: p.content,
            imageUrl: p.image_url, // map snake_case
            category: p.category_id || "news-events",
            createdAt: p.created_at, // map snake_case
            isFeatured: p.is_featured,
          }));
          setDbPosts(mappedPosts);
        } else {
          useFallbacks();
        }
      } catch (err) {
        useFallbacks();
      } finally {
        setLoading(false);
      }
    };

    const useFallbacks = () => {
      setDbPosts(
        MOCK_NEWS.map((n) => ({
          id: n.id,
          title: n.title,
          summary: n.excerpt,
          imageUrl: n.image,
          category: n.category,
          createdAt: new Date().toISOString(),
        }))
      );
    };

    fetchLatestPosts();
  }, []);

  useEffect(() => {
    if (images.length === 0) return;
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);
    return () => clearInterval(interval);
  }, [images.length]);

  const goToPrevious = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const spotlightPost = dbPosts[0];
  const latestTenPosts = dbPosts.slice(1, 11);

  return (
    <div className="min-h-screen bg-gray-50 relative font-sans">
      <div className="fixed bottom-8 right-6 z-50 flex flex-col items-end gap-2 group">
        <div className="bg-white px-4 py-2 rounded-xl shadow-xl border-l-4 border-red-600 mb-2 animate-bounce origin-bottom-right hidden md:block">
          <p className="text-red-700 font-bold text-sm uppercase">
            Trung tâm Cấp cứu 115
          </p>
        </div>
        <Link
          to="/emergency"
          className="relative w-16 h-16 md:w-20 md:h-20 flex items-center justify-center bg-red-600 rounded-full shadow-lg shadow-red-600/40 hover:bg-red-700 hover:scale-110 transition-all duration-300"
        >
          <span className="absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75 animate-ping"></span>
          <div className="relative z-10 flex flex-col items-center justify-center text-white">
            <Phone size={28} className="animate-tada" strokeWidth={2.5} />
            <span className="text-[10px] md:text-xs font-black mt-1">115</span>
          </div>
        </Link>
      </div>

      <section className="relative bg-primary-900 text-white h-[450px] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://picsum.photos/seed/banner/1920/600"
            alt="Medical Banner"
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary-900 via-primary-900/80 to-transparent"></div>
        </div>

        <div className="container mx-auto px-4 z-10 relative grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-6">
            <span className="bg-secondary-600 text-white px-3 py-1 text-xs font-bold uppercase tracking-wider rounded">
              Thông điệp tuần
            </span>
            <h2 className="text-4xl md:text-5xl font-bold leading-tight">
              Chăm sóc sức khỏe toàn dân <br />
              <span className="text-secondary-500">
                Nâng cao chất lượng cuộc sống
              </span>
            </h2>
            <p className="text-gray-300 text-lg max-w-xl">
              Hệ thống y tế thủ đô không ngừng đổi mới, áp dụng công nghệ số vào
              khám chữa bệnh và quản lý hồ sơ sức khỏe.
            </p>
            <div className="flex space-x-4 pt-4">
              <Link
                to="/health-records"
                className="bg-white text-primary-900 px-6 py-3 rounded font-bold hover:bg-gray-100 transition shadow-lg flex items-center"
              >
                Tra cứu Hồ sơ sức khỏe <ArrowRight size={18} className="ml-2" />
              </Link>
            </div>
          </div>
          <div className="hidden lg:col-span-5 lg:block">
            <div className="bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-lg shadow-2xl">
              <h3 className="text-xl font-bold mb-4 flex items-center">
                <Activity className="mr-2 text-secondary-500" /> Số liệu hôm nay
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center border-b border-white/10 pb-2">
                  <span>Lượt khám bệnh</span>
                  <span className="font-bold text-2xl">12,450</span>
                </div>
                <div className="flex justify-between items-center border-b border-white/10 pb-2">
                  <span>Hồ sơ mới lập</span>
                  <span className="font-bold text-2xl text-secondary-400">
                    842
                  </span>
                </div>
                <div className="flex justify-between items-center pb-2 border-b border-white/10">
                  <span>Xe cấp cứu đang chạy</span>
                  <span className="font-bold text-2xl text-orange-400">45</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative w-full h-[200px] overflow-hidden  mt-2  shadow-xl">
        <img
          src={images[currentImageIndex]}
          alt="Slide"
          className="w-full h-full object-cover transition-opacity duration-1000 ease-in-out"
        />
        <div className="absolute inset-0 flex items-center justify-between p-4">
          <button
            onClick={goToPrevious}
            className="bg-black/50 text-white w-10 h-10 rounded-full hover:bg-black/75 transition ml-2 flex items-center justify-center"
          >
            <ChevronLeft />
          </button>
          <button
            onClick={goToNext}
            className="bg-black/50 text-white w-10 h-10 rounded-full hover:bg-black/75 transition mr-2 flex items-center justify-center"
          >
            <ChevronRight />
          </button>
        </div>
      </section>

      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-7">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-10 h-1 bg-red-600 rounded-full"></div>
                <h3 className="text-2xl font-black text-gray-900 uppercase tracking-tighter flex items-center gap-2">
                  <Zap className="text-red-600 fill-current" size={24} /> TIÊU
                  ĐIỂM Y TẾ
                </h3>
              </div>

              {loading ? (
                <div className="animate-pulse space-y-4">
                  <div className="bg-gray-200 aspect-video rounded-2xl w-full"></div>
                  <div className="h-8 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-20 bg-gray-200 rounded w-full"></div>
                </div>
              ) : (
                spotlightPost && (
                  <Link
                    to={`/news/detail/${spotlightPost.id}`}
                    className="group block"
                  >
                    <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl mb-6">
                      <img
                        src={spotlightPost.imageUrl}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        alt={spotlightPost.title}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                      <div className="absolute bottom-6 left-6 right-6">
                        <span className="bg-red-600 text-white text-[10px] font-black px-3 py-1 rounded-sm uppercase tracking-widest mb-3 inline-block">
                          {SERVICE_CATEGORIES.find(
                            (c) => c.id === spotlightPost.category
                          )?.title || "TIN TỨC"}
                        </span>
                        <h2 className="text-2xl md:text-3xl font-black text-white leading-tight line-clamp-2 group-hover:text-red-400 transition-colors">
                          {spotlightPost.title}
                        </h2>
                      </div>
                    </div>
                    <p className="text-gray-600 text-lg leading-relaxed line-clamp-3 italic">
                      {spotlightPost.summary}
                    </p>
                    <div className="flex items-center gap-4 mt-4 text-xs font-bold text-gray-400">
                      <span className="flex items-center gap-1">
                        <Clock size={14} />{" "}
                        {new Date(spotlightPost.createdAt).toLocaleDateString(
                          "vi-VN"
                        )}
                      </span>
                      <span className="text-red-600 hover:underline flex items-center gap-1">
                        Xem chi tiết <ArrowRight size={14} />
                      </span>
                    </div>
                  </Link>
                )
              )}
            </div>

            <div className="lg:col-span-5">
              <div className="flex items-center justify-between mb-6 border-b border-gray-100 pb-2">
                <h3 className="text-lg font-black text-gray-800 uppercase tracking-tighter">
                  MỚI CẬP NHẬT
                </h3>
                <Link
                  to="/news/events"
                  className="text-xs font-bold text-primary-600 hover:underline"
                >
                  Tất cả bài viết
                </Link>
              </div>

              <div className="space-y-4 max-h-[600px] overflow-y-auto no-scrollbar pr-2">
                {loading
                  ? [...Array(5)].map((_, i) => (
                      <div key={i} className="flex gap-4 animate-pulse">
                        <div className="w-24 h-16 bg-gray-200 rounded flex-shrink-0"></div>
                        <div className="flex-grow space-y-2">
                          <div className="h-4 bg-gray-200 rounded w-full"></div>
                          <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                        </div>
                      </div>
                    ))
                  : latestTenPosts.map((post, idx) => (
                      <Link
                        key={post.id}
                        to={`/news/detail/${post.id}`}
                        className="flex gap-4 group border-b border-gray-50 pb-4 last:border-0 last:pb-0 items-start"
                      >
                        <div className="w-24 h-16 rounded overflow-hidden flex-shrink-0 bg-gray-100">
                          <img
                            src={post.imageUrl}
                            className="w-full h-full object-cover transition-transform group-hover:scale-110"
                            alt=""
                          />
                        </div>
                        <div className="flex-grow">
                          <h4 className="text-sm font-bold text-gray-800 group-hover:text-red-600 line-clamp-2 leading-snug">
                            {post.title}
                          </h4>
                          <div className="flex items-center gap-2 mt-2">
                            <span className="text-[10px] font-bold text-gray-400 flex items-center gap-1">
                              <Clock size={12} />{" "}
                              {new Date(post.createdAt).toLocaleDateString(
                                "vi-VN"
                              )}
                            </span>
                          </div>
                        </div>
                      </Link>
                    ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-black text-primary-900 uppercase tracking-tight mb-4">
              Dịch vụ & Tiện ích
            </h3>
            <div className="w-24 h-1.5 bg-secondary-500 mx-auto rounded-full"></div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {SERVICE_CATEGORIES.map((category) => {
              const Icon = category.icon;
              return (
                <Link
                  key={category.id}
                  to={category.path}
                  className={`group p-6 rounded-2xl border flex flex-col items-center text-center transition-all duration-300 transform hover:-translate-y-2 ${category.containerClass}`}
                >
                  <div
                    className={`w-14 h-14 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110 ${category.iconBoxClass}`}
                  >
                    <Icon size={28} />
                  </div>
                  <h4
                    className={`font-bold text-sm uppercase leading-tight ${category.titleClass}`}
                  >
                    {category.title}
                  </h4>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <HospitalSlider />
    </div>
  );
};

export default Home;
