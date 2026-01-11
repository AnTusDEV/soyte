import React from 'react';
import { 
  Home, 
  ChevronDown, 
  Search, 
  Share2, 
  Syringe, 
  GitMerge, 
  UserPlus, 
  UserMinus, 
  Users, 
  Baby, 
  Accessibility, 
  User,
  Bell,
  FileText,
  BarChart2,
  Settings,
  Download
} from 'lucide-react';

const HealthRecords = () => {
  return (
    <div className="bg-slate-50 min-h-screen font-sans">
      
      {/* 1. HSSK Sub-Header / Navigation */}
      <div className="bg-white border-b border-gray-200 px-4 py-2 flex flex-col lg:flex-row justify-between items-center shadow-sm">
        <div className="flex items-center gap-3 mb-2 lg:mb-0">
            {/* System Logo Placeholder */}
            <div className="w-10 h-10 bg-blue-800 rounded-full flex items-center justify-center text-white font-bold text-xs shadow-sm">
                HSSK
            </div>
            <div>
                <h1 className="text-lg font-bold text-blue-900 leading-none">HSSK</h1>
                <p className="text-xs text-gray-500 font-medium">Hồ sơ sức khỏe Hà Nội</p>
            </div>
        </div>

        {/* Menu Items */}
        <div className="flex overflow-x-auto no-scrollbar gap-1 text-sm font-medium text-gray-600 w-full lg:w-auto">
            <button className="flex items-center gap-1 hover:text-blue-600 px-3 py-2 whitespace-nowrap">
                Hồ sơ sức khỏe <ChevronDown size={14} />
            </button>
            <button className="flex items-center gap-1 hover:text-blue-600 px-3 py-2 whitespace-nowrap">
                Hồ sơ Chứng từ <ChevronDown size={14} />
            </button>
            <button className="flex items-center gap-1 hover:text-blue-600 px-3 py-2 whitespace-nowrap">
                Dân số <ChevronDown size={14} />
            </button>
            <button className="flex items-center gap-1 hover:text-blue-600 px-3 py-2 whitespace-nowrap">
                Báo cáo <ChevronDown size={14} />
            </button>
            <button className="flex items-center gap-1 hover:text-blue-600 px-3 py-2 whitespace-nowrap">
                Quản trị <ChevronDown size={14} />
            </button>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-4 text-gray-500 text-sm hidden lg:flex">
             <span className="hover:text-blue-600 cursor-pointer flex items-center gap-1">
                Tài liệu và biểu mẫu <ChevronDown size={14}/>
             </span>
             <Bell size={18} className="cursor-pointer hover:text-blue-600"/>
             <div className="border-l pl-4 border-gray-300 flex items-center gap-2">
                 <div className="text-right">
                     <p className="text-xs font-bold text-gray-800">Sở Y Tế</p>
                     <p className="text-[10px]">Administrator</p>
                 </div>
                 <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                    <User size={16} />
                 </div>
             </div>
        </div>
      </div>

      {/* 2. Main Content Area */}
      <div className="p-4 md:p-6 max-w-[1600px] mx-auto">
        
        {/* Breadcrumb & Status */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-4 gap-2">
            <div>
                <div className="flex items-center gap-2 text-sm text-blue-600 font-medium mb-1">
                    <Home size={16} /> <span>Trang chủ</span>
                </div>
                <p className="text-xs text-red-500 font-medium italic">
                    Dữ liệu tổng hợp được thống kê trước 08:58 08/01/2026
                </p>
            </div>
            <div className="w-full md:w-auto">
                 <select className="bg-white border border-gray-300 text-gray-700 text-sm rounded px-3 py-1.5 focus:outline-none focus:border-blue-500 w-full md:w-64">
                    <option>Trang chủ Hồ sơ sức khỏe</option>
                 </select>
            </div>
        </div>

        {/* Filter Bar */}
        <div className="bg-white p-4 rounded-md shadow-sm border border-gray-200 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 items-end">
                {/* City (Fixed) */}
                <div className="lg:col-span-1">
                    <label className="block text-xs font-semibold text-gray-500 mb-1">Tỉnh/Thành phố</label>
                    <div className="bg-gray-100 border border-gray-300 text-gray-700 text-sm rounded px-3 py-2">
                        Thành phố Hà Nội
                    </div>
                </div>

                {/* District */}
                <div className="lg:col-span-1">
                    <label className="block text-xs font-semibold text-gray-500 mb-1">Quận/Huyện</label>
                    <select className="w-full bg-white border border-gray-300 text-gray-700 text-sm rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500">
                        <option>Chọn</option>
                        <option>Quận Hoàn Kiếm</option>
                        <option>Quận Ba Đình</option>
                    </select>
                </div>

                 {/* Ward */}
                 <div className="lg:col-span-1">
                    <label className="block text-xs font-semibold text-gray-500 mb-1">Xã/Phường</label>
                    <select className="w-full bg-white border border-gray-300 text-gray-700 text-sm rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500">
                        <option>Chọn</option>
                    </select>
                </div>

                 {/* Population Type */}
                 <div className="lg:col-span-1">
                    <label className="block text-xs font-semibold text-gray-500 mb-1">Nhân khẩu</label>
                    <select className="w-full bg-white border border-gray-300 text-gray-700 text-sm rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500">
                        <option>Thuộc địa bàn</option>
                        <option>Tạm trú</option>
                    </select>
                </div>

                 {/* Status */}
                 <div className="lg:col-span-1">
                    <label className="block text-xs font-semibold text-gray-500 mb-1">Tình trạng sống/chết</label>
                    <select className="w-full bg-white border border-gray-300 text-gray-700 text-sm rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500">
                        <option>Còn sống</option>
                        <option>Đã chết</option>
                    </select>
                </div>

                 {/* Date & Button */}
                 <div className="lg:col-span-1 flex gap-2">
                    <div className="flex-grow">
                         <label className="block text-xs font-semibold text-red-500 mb-1">Tính đến ngày <span className="text-red-500">*</span></label>
                         <input type="date" className="w-full bg-white border border-gray-300 text-gray-700 text-sm rounded px-2 py-2 focus:outline-none" defaultValue="2026-01-08"/>
                    </div>
                    <button className="bg-[#005a9e] hover:bg-blue-800 text-white rounded px-4 py-2 mt-auto h-[38px] flex items-center justify-center font-medium text-sm transition-colors">
                        <Search size={16} className="mr-1" /> Áp dụng
                    </button>
                </div>
            </div>
        </div>

        {/* SECTION 1: Kết quả hôm nay */}
        <h3 className="text-sm font-bold text-gray-800 mb-3 uppercase">Kết quả hôm nay</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
            
            {/* Card 1: Blue */}
            <div className="bg-[#0078d4] rounded-md p-4 text-white shadow-md relative min-h-[100px] hover:shadow-lg transition-shadow cursor-pointer">
                <h4 className="text-3xl font-bold mb-1">2.006</h4>
                <p className="text-xs font-medium opacity-90">Lượt liên thông <br/> dữ liệu KCB</p>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 p-2 rounded-full">
                    <Share2 size={24} className="text-white" />
                </div>
            </div>

             {/* Card 2: Teal */}
             <div className="bg-[#008075] rounded-md p-4 text-white shadow-md relative min-h-[100px] hover:shadow-lg transition-shadow cursor-pointer">
                <h4 className="text-3xl font-bold mb-1">0</h4>
                <p className="text-xs font-medium opacity-90">Lượt liên thông <br/> dữ liệu tiêm chủng</p>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 p-2 rounded-full">
                    <Syringe size={24} className="text-white" />
                </div>
            </div>

            {/* Card 3: Indigo/Purple - Decrease */}
            <div className="bg-[#4f6bed] rounded-md p-4 text-white shadow-md relative min-h-[100px] hover:shadow-lg transition-shadow cursor-pointer">
                <h4 className="text-xl font-bold mb-1 mt-2">Giảm 37.60%</h4>
                <p className="text-xs font-medium opacity-90">Lượt liên thông <br/> ngày hôm trước</p>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 p-2 rounded-full">
                    <GitMerge size={24} className="text-white" />
                </div>
            </div>

            {/* Card 4: Blue - Increase Pop */}
            <div className="bg-[#0078d4] rounded-md p-4 text-white shadow-md relative min-h-[100px] hover:shadow-lg transition-shadow cursor-pointer">
                <h4 className="text-3xl font-bold mb-1">2.480</h4>
                <p className="text-xs font-medium opacity-90">Nhân khẩu tăng</p>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 p-2 rounded-full">
                    <UserPlus size={24} className="text-white" />
                </div>
            </div>

            {/* Card 5: Purple - Decrease Pop */}
            <div className="bg-[#8e44ad] rounded-md p-4 text-white shadow-md relative min-h-[100px] hover:shadow-lg transition-shadow cursor-pointer">
                <h4 className="text-3xl font-bold mb-1">480</h4>
                <p className="text-xs font-medium opacity-90">Nhân khẩu giảm</p>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 p-2 rounded-full">
                    <UserMinus size={24} className="text-white" />
                </div>
            </div>
        </div>

        {/* SECTION 2: Thống kê nhân khẩu */}
        <h3 className="text-sm font-bold text-gray-800 mb-3 uppercase">Thống kê nhân khẩu</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            
            {/* Main Total Card (Blue) */}
            <div className="bg-[#005a9e] rounded-md p-5 text-white shadow-md flex items-center justify-between col-span-1 lg:col-span-1 min-h-[120px]">
                <div>
                    <h4 className="text-3xl font-bold mb-1">1,449,223</h4>
                    <p className="text-xs font-medium opacity-90">Tổng số <br/> nhân khẩu</p>
                </div>
                <div className="bg-white/20 p-3 rounded-full">
                    <Users size={28} className="text-white" />
                </div>
            </div>

            {/* Detail Card 1: Households */}
            <div className="bg-white rounded-md p-5 shadow-sm border border-gray-100 flex items-center justify-between min-h-[120px]">
                <div>
                    <h4 className="text-2xl font-bold text-gray-800 mb-1">364,602</h4>
                    <p className="text-xs font-bold text-gray-500">Hộ gia đình</p>
                </div>
                <div className="bg-[#0078d4] p-3 rounded-full text-white shadow-sm">
                    <Home size={24} />
                </div>
            </div>

             {/* Detail Card 2: Children */}
             <div className="bg-white rounded-md p-5 shadow-sm border border-gray-100 flex items-center justify-between min-h-[120px]">
                <div>
                    <h4 className="text-2xl font-bold text-gray-800 mb-1">296,803</h4>
                    <p className="text-xs font-bold text-gray-500 mb-1">Trẻ em</p>
                    <p className="text-[10px] text-gray-400 font-medium">Chiếm <span className="font-bold text-gray-600">20.5%</span></p>
                </div>
                <div className="bg-[#008075] p-3 rounded-full text-white shadow-sm">
                    <Baby size={24} />
                </div>
            </div>

             {/* Detail Card 3: Women */}
             <div className="bg-white rounded-md p-5 shadow-sm border border-gray-100 flex items-center justify-between min-h-[120px]">
                <div>
                    <h4 className="text-2xl font-bold text-gray-800 mb-1">446,423</h4>
                    <p className="text-xs font-bold text-gray-500 mb-1">Phụ nữ</p>
                    <p className="text-[10px] text-gray-400 font-medium">Chiếm <span className="font-bold text-gray-600">30.8%</span></p>
                </div>
                <div className="bg-[#0078d4] p-3 rounded-full text-white shadow-sm">
                    <User size={24} />
                </div>
            </div>

             {/* Detail Card 4: Elderly (Overflow to next row on smaller screens or fit in grid) */}
             <div className="bg-white rounded-md p-5 shadow-sm border border-gray-100 flex items-center justify-between min-h-[120px]">
                <div>
                    <h4 className="text-2xl font-bold text-gray-800 mb-1">259,057</h4>
                    <p className="text-xs font-bold text-gray-500 mb-1">Người cao tuổi</p>
                    <p className="text-[10px] text-gray-400 font-medium">Chiếm <span className="font-bold text-gray-600">17.9%</span></p>
                </div>
                <div className="bg-[#005a9e] p-3 rounded-full text-white shadow-sm">
                    <Accessibility size={24} />
                </div>
            </div>

        </div>

        {/* Footer of Dashboard (Visual Separation) */}
        <div className="mt-8 pt-4 border-t border-gray-200">
             <h3 className="text-sm font-bold text-gray-600 mb-4">Tiến độ chuẩn hóa theo hộ gia đình</h3>
             {/* Placeholder for chart/table that would be below */}
             <div className="h-4 bg-gray-100 rounded-full w-full overflow-hidden">
                 <div className="h-full bg-blue-500 w-[65%]"></div>
             </div>
             <div className="flex justify-between text-xs text-gray-500 mt-1">
                 <span>Đã chuẩn hóa: 65%</span>
                 <span>Mục tiêu: 100%</span>
             </div>
        </div>

      </div>
    </div>
  );
};

export default HealthRecords;