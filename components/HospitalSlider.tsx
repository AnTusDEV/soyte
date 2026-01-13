
import React, { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const HOSPITALS = [
  { id: 1, name: "BV Đa khoa Xanh Pôn", logo: "https://bvxanhpon.vn/storage/userfiles/images/logoxp.png" },
  { id: 2, name: "BV Thanh Nhàn", logo: "https://bizweb.dktcdn.net/100/496/664/themes/929372/assets/logo.png?1762397676564" },
  { id: 3, name: "BV Phụ sản Hà Nội", logo: "https://static.benhvienphusanhanoi.vn/images/common/logo.png" },
  { id: 4, name: "BV Tim Hà Nội", logo: "http://benhvientimhanoi.vn/assets/img/bvtim_logo.png" },
  { id: 5, name: "BV Ung bướu Hà Nội", logo: "https://cdn.benhvienungbuouhanoi.vn/media/logo/logo-bvub-photoroom.webp" },
  { id: 6, name: "BV Đa khoa Đức Giang", logo: "https://benhvienducgiang.com/Images/companies/benhvienducgiang/banner/logo.jfif" },
  { id: 7, name: "BV Đa khoa Hà Đông", logo: "	https://benhvienhadong.vn/public/images/uploads/logo/logo" },
  { id: 8, name: "BV Đa khoa Đống Đa", logo: "https://benhviendongda.vn/wp-content/uploads/2017/07/Logo-BVDKDD-01.png" },
  { id: 9, name: "BV Da liễu Hà Nội", logo: "https://dalieuhanoi.com/wp-content/uploads/2025/03/logo-3.jpg" },
  { id: 10, name: "BV Mắt Hà Nội", logo: "https://benhvienmathanoi.gov.vn/wp-content/uploads/2021/03/logo-bệnh-viên-.png" },
  { id: 11, name: "BV Thận Hà Nội", logo: "https://bvthanhanoi.vn/wp-content/themes/hifi/images/logo.png" },
  { id: 12, name: "BV Tâm thần Hà Nội", logo: "https://benhvientamthanhanoi.com/wp-content/uploads/2021/11/25352161_1624254280971852_7764895047107135525_o.jpg" },
];

const HospitalSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const itemsToShow = { desktop: 4, tablet: 3, mobile: 2 };

  const getVisibleItems = () => {
    if (typeof window === 'undefined') return itemsToShow.desktop;
    if (window.innerWidth < 640) return itemsToShow.mobile;
    if (window.innerWidth < 1024) return itemsToShow.tablet;
    return itemsToShow.desktop;
  };

  const [visibleCount, setVisibleCount] = useState(4);

  useEffect(() => {
    const handleResize = () => setVisibleCount(getVisibleItems());
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % HOSPITALS.length);
  }, []);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + HOSPITALS.length) % HOSPITALS.length);
  };

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(nextSlide, 3000);
    return () => clearInterval(interval);
  }, [isPaused, nextSlide]);

  return (
    <section className="py-12 bg-gray-50 border-t border-gray-100">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h3 className="text-xl md:text-2xl font-black text-primary-900 uppercase tracking-tight">Hệ thống cơ sở Y tế trực thuộc</h3>
            <div className="w-16 h-1 bg-secondary-500 mt-2 rounded-full"></div>
          </div>
          <div className="flex gap-2">
            <button 
              onClick={prevSlide} 
              className="p-2 rounded-full border border-gray-200 bg-white hover:bg-primary-50 text-gray-400 hover:text-primary-600 transition-all shadow-sm active:scale-90"
              aria-label="Previous slide"
            >
              <ChevronLeft size={20} />
            </button>
            <button 
              onClick={nextSlide} 
              className="p-2 rounded-full border border-gray-200 bg-white hover:bg-primary-50 text-gray-400 hover:text-primary-600 transition-all shadow-sm active:scale-90"
              aria-label="Next slide"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        <div 
          className="relative overflow-hidden"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div 
            className="flex transition-transform duration-700 ease-in-out"
            style={{ 
              transform: `translateX(-${currentIndex * (100 / visibleCount)}%)`,
            }}
          >
            {HOSPITALS.map((hospital) => (
              <div 
                key={hospital.id} 
                className="flex-shrink-0 px-2"
                style={{ width: `${100 / visibleCount}%` }}
              >
                <div className="bg-white border border-gray-100 rounded-2xl p-6 h-56 flex flex-col items-center justify-center text-center group hover:shadow-2xl hover:border-primary-200 transition-all duration-500 cursor-pointer">
                  <div className="w-28 h-28 mb-4 flex items-center justify-center transition-all duration-700 transform group-hover:scale-110">
                    <img 
                      src={hospital.logo} 
                      alt={hospital.name} 
                      className="max-w-full max-h-full object-contain"
                      loading="lazy"
                      onError={(e) => {
                        // Ảnh dự phòng nếu link chính bị lỗi
                        e.currentTarget.src = "https://storage-vnportal.vnpt.vn/gov-hni/6749/soyte.png";
                      }}
                    />
                  </div>
                  <h4 className="text-[13px] font-black text-gray-700 group-hover:text-primary-800 transition-colors uppercase tracking-tight leading-tight px-2">
                    {hospital.name}
                  </h4>
                  <div className="mt-3 w-8 h-1 bg-gray-100 group-hover:bg-primary-500 transition-all duration-500 rounded-full"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HospitalSlider;
