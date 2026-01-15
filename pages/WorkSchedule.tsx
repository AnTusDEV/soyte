
import React from 'react';
import { 
  Calendar, 
  Clock, 
  User, 
  MapPin, 
  Car, 
  Printer, 
  ChevronRight, 
  Info,
  CalendarDays,
  Home,
  AlertCircle
} from 'lucide-react';
import { Link } from 'react-router-dom';

const WorkSchedule = () => {
  const scheduleData = [
    {
      date: "Thứ 5, ngày 15/1/2026",
      isToday: true,
      items: [
        { time: "08:00", attendee: "PGĐ Lê Minh Sơn", content: "Dự rà soát, đánh giá thực trạng phát triển đô thị để thực hiện phân loại, công nhận đô thị Quảng Ninh đề xuất giải pháp phấn đấu hoàn thành mục tiêu tỉnh Quảng Ninh trở thành thành phố trực thuộc Trung ương trước năm 2030 (cả ngày)", location: "Phòng họp Sở Xây dựng" },
        { time: "08:00", attendee: "PGĐ Lê Minh Sơn", content: "Dự nghe báo cáo rà soát dự án, công trình thuộc lĩnh vực: Văn hóa, thể thao, du lịch, di sản; Y tế; Giáo dục và đào tạo và đào tạo nghề trong Chương trình xúc tiến đầu tư năm 2026 và Kế hoạch thu hút đầu tư nước ngoài (FDI) tỉnh Quảng Ninh năm 2026", location: "Phòng họp UBND tỉnh" },
        { time: "08:00", attendee: "PGĐ Nguyễn Minh Tuấn", content: "Dự và chủ trì Hội nghị tham vấn chính sách và xin ý kiến dự thảo Luật An toàn thực phẩm sửa đổi", location: "Phòng họp số 1, Sở Y tế" },
        { time: "08:00", attendee: "PGĐ Trịnh Văn Mạnh", content: "Dự hội nghị cán bộ viên chức, người lao động 2025", location: "Trung tâm Vận chuyển cấp cứu", vehicle: "Xe 14A-013.73" },
        { time: "08:00", attendee: "PGĐ Trịnh Văn Mạnh", content: "Dự Hội nghị cán bộ, viên chức, lao động năm 2025", location: "Hội trường tầng 4 - Trung tâm Kiểm nghiệm", vehicle: "Xe 14A-013.73" },
        { time: "08:00", attendee: "PGĐ Nguyễn Minh Tuấn", content: "Dự Hội nghị Ban Chấp hành Hiệp hội tư vấn nâng cao sức khỏe Việt Nam lần thứ 3, nhiệm kỳ 2025-2030", location: "Hội trường Tầng 15, Cục phòng bệnh Bộ Y tế", vehicle: "Xe 14A-015.45" },
        { time: "08:30", attendee: "PGĐ Trịnh Văn Mạnh", content: "Dự và chủ trì Hội nghị trực tuyến phổ biến các chính sách pháp luật bảo hiểm y tế năm 2026", location: "Phòng họp 2, Sở Y tế" },
        { time: "14:00", attendee: "Lãnh đạo Sở", content: "Dự Lễ ra mắt Trung tâm thông tin chỉ huy", location: "Phòng họp tầng 4, Trụ sở 1 Công an tỉnh Quảng Ninh" },
        { time: "14:00", attendee: "Ban Giám đốc & CBCCVC", content: "Dự Hội nghị lấy ý kiến cử tri nơi công tác", location: "Hội trường số 1 - Sở Y tế" },
      ]
    },
    {
      date: "Thứ 6, ngày 16/1/2026",
      items: [
        { time: "07:30", attendee: "PGĐ Trịnh Văn Mạnh", content: "Dự họp kết luận của Hội đồng giám định y khoa", location: "Trung tâm Giám định y khoa", vehicle: "Xe 14A-013.73" },
        { time: "08:00", attendee: "PGĐ Lê Minh Sơn", content: "Dự rà soát, đánh giá thực trạng phát triển đô thị để thực hiện phân loại, công nhận đô thị Quảng Ninh đề xuất giải pháp phấn đấu hoàn thành mục tiêu tỉnh Quảng Ninh trở thành thành phố trực thuộc Trung ương trước năm 2030 (cả ngày)", location: "Phòng họp Sở Xây dựng" },
        { time: "08:00", attendee: "Q. GĐ Bùi Mạnh Hùng", content: "Dự họp đánh giá kết quả thực hiện các chỉ số Chỉ số PARINDEX, PAPI, PCI, DTI cấp tỉnh năm 2025", location: "Phòng họp UBND tỉnh", vehicle: "Xe 14A-006.89" },
        { time: "08:00", attendee: "Q.GĐ Bùi Mạnh Hùng", content: "Dự đón tiếp và làm việc với Đoàn công tác số 2 của Tiểu ban đảm bảo an ninh, trật tự và an toàn xã hội, Hội đồng bầu cử quốc gia", location: "Phòng họp số 1, UBND tỉnh", vehicle: "Xe 14A-006.89" },
        { time: "13:30", attendee: "PGĐ Trịnh Văn Mạnh", content: "Dự Hội nghị cán bộ viên chức và người lao động", location: "Bệnh viện Phổi", vehicle: "Xe 14A-013.73" },
        { time: "14:00", attendee: "PGĐ Trịnh Văn Mạnh", content: "Dự họp kết luận của Hội đồng giám định y khoa", location: "Trung tâm Giám định y khoa", vehicle: "Xe 14A-013.73" },
        { time: "16:30", attendee: "Q.GĐ Bùi Mạnh Hùng", content: "Dự họp phiên họp lần thứ nhất năm 2026 của Ban chỉ đạo của Chính phủ về phát triển khoa học, công nghệ, đổi mới sáng tạo, chuyển đổi số và Đề án 06", location: "UBND tỉnh" },
      ]
    },
    {
      date: "Thứ 7, ngày 17/1/2026",
      items: [
        { time: "08:00", attendee: "PGĐ Lê Minh Sơn", content: "Dự rà soát, đánh giá thực trạng phát triển đô thị để thực hiện phân loại, công nhận đô thị Quảng Ninh đề xuất giải pháp phấn đấu hoàn thành mục tiêu tỉnh Quảng Ninh trở thành thành phố trực thuộc Trung ương trước năm 2030 (cả ngày)", location: "Phòng họp Sở Xây dựng" },
      ]
    },
    {
      date: "Chủ nhật, ngày 18/1/2026",
      items: [
        { time: "07:30", attendee: "Q. GĐ Bùi Mạnh Hùng", content: "Dự Lễ phát động chiến dịch vận động hiến máu tình nguyện dịp Tết nguyên đán và Lễ hội Xuân hồng cấp", location: "Trường Cao đẳng Y tế Quảng Ninh", vehicle: "Xe 14A-006.89" },
      ]
    },
    {
      date: "Thứ 4, ngày 21/1/2026",
      items: [
        { time: "08:30", attendee: "Lãnh đạo Sở", content: "Dự Hội thảo khoa học chia sẻ kinh nghiệm quốc tế, cung cấp thông tin, bằng chứng liên quan đến ghi nhãn dinh dưỡng thực phẩm", location: "Nhà khách Trung ương số 8 Chu Văn An, Ba Đình, TP. Hà Nội" },
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-sans pb-20">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-3 flex items-center text-xs font-bold text-gray-500 uppercase">
          <Link to="/" className="hover:text-red-600 flex items-center gap-1">
            <Home size={14} /> TRANG CHỦ
          </Link>
          <ChevronRight size={14} className="mx-2 text-gray-300" />
          <span className="text-red-600">Lịch công tác lãnh đạo</span>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-red-700 rounded-2xl flex items-center justify-center text-white shadow-xl">
               <CalendarDays size={32} />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-black text-gray-900 uppercase tracking-tighter">Lịch công tác Lãnh đạo Sở</h1>
              <p className="text-sm text-gray-500 font-medium">Hệ thống cập nhật lịch làm việc định kỳ hàng tuần</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
             <button onClick={() => window.print()} className="bg-white border-2 border-gray-200 hover:border-red-600 text-gray-700 px-6 py-2.5 rounded-xl font-bold flex items-center gap-2 transition-all shadow-sm">
                <Printer size={18} /> In lịch tuần
             </button>
             <div className="bg-red-50 border border-red-100 px-4 py-2.5 rounded-xl text-red-700 text-xs font-black flex items-center gap-2">
                <AlertCircle size={16} /> HOTLINE TRỰC BAN: 024.3998.5765
             </div>
          </div>
        </div>

        {/* Schedule List */}
        <div className="space-y-12">
          {scheduleData.map((day, dIdx) => (
            <div key={dIdx} className={`relative ${day.isToday ? 'animate-in fade-in slide-in-from-left-4' : ''}`}>
              {/* Date Header */}
              <div className="flex items-center gap-4 mb-6">
                <div className={`px-6 py-2 rounded-full text-sm font-black uppercase tracking-widest shadow-sm border ${day.isToday ? 'bg-red-700 text-white border-red-800' : 'bg-white text-gray-800 border-gray-200'}`}>
                  {day.isToday && <span className="mr-2 text-yellow-400">●</span>}
                  {day.date}
                </div>
                <div className="flex-grow h-px bg-gray-200"></div>
              </div>

              {/* Items Table/Grid */}
              <div className={`bg-white rounded-3xl shadow-xl overflow-hidden border ${day.isToday ? 'border-red-200 ring-4 ring-red-50' : 'border-gray-100'}`}>
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className={`text-[11px] font-black uppercase tracking-widest border-b ${day.isToday ? 'bg-red-50 text-red-900 border-red-100' : 'bg-gray-50 text-gray-400 border-gray-100'}`}>
                        <th className="px-6 py-4 w-32">Thời gian</th>
                        <th className="px-6 py-4 w-56">Người thực hiện</th>
                        <th className="px-6 py-4">Nội dung công việc</th>
                        <th className="px-6 py-4">Địa điểm</th>
                        <th className="px-6 py-4 w-40">Ghi chú / Xe</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {day.items.map((item, iIdx) => (
                        <tr key={iIdx} className="hover:bg-gray-50/80 transition-colors group">
                          <td className="px-6 py-5">
                            <div className="flex items-center gap-2 font-black text-gray-900">
                               <Clock size={16} className="text-gray-400" />
                               {item.time}
                            </div>
                          </td>
                          <td className="px-6 py-5">
                            <div className="flex items-center gap-2">
                               <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-black ${day.isToday ? 'bg-red-100 text-red-700' : 'bg-primary-50 text-primary-700'}`}>
                                  {item.attendee.split(' ').pop()?.charAt(0)}
                               </div>
                               <span className="font-bold text-gray-800 text-[13px]">{item.attendee}</span>
                            </div>
                          </td>
                          <td className="px-6 py-5">
                            <p className="text-[14px] text-gray-700 leading-relaxed font-medium">
                              {item.content}
                            </p>
                          </td>
                          <td className="px-6 py-5">
                            <div className="flex items-start gap-2 text-[13px] text-gray-500 italic">
                               <MapPin size={14} className="mt-0.5 text-gray-400 flex-shrink-0" />
                               {item.location}
                            </div>
                          </td>
                          <td className="px-6 py-5">
                             {item.vehicle ? (
                               <div className="flex items-center gap-2 bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200">
                                  <Car size={14} className="text-slate-500" />
                                  <span className="text-[11px] font-black text-slate-700">{item.vehicle}</span>
                               </div>
                             ) : (
                               <span className="text-[10px] text-gray-300 font-bold italic uppercase tracking-tighter">- Tự túc -</span>
                             )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer Info */}
        <div className="mt-16 bg-primary-900 rounded-3xl p-8 text-white relative overflow-hidden shadow-2xl">
           <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="space-y-4 max-w-2xl">
                 <h3 className="text-xl font-bold flex items-center gap-2 italic">
                    <Info size={24} className="text-secondary-400" /> Lưu ý dành cho Cán bộ
                 </h3>
                 <ul className="text-sm text-primary-100 space-y-2 list-disc list-inside">
                    <li>Lịch công tác được cập nhật định kỳ vào sáng Thứ Hai hàng tuần.</li>
                    <li>Mọi thay đổi đột xuất sẽ được thông báo qua hệ thống tin nhắn SMS nội bộ.</li>
                    <li>Cán bộ có tên trong danh sách chủ trì cần chuẩn bị tài liệu trước ít nhất 01 buổi.</li>
                    <li>Đề nghị bộ phận Hành chính chuẩn bị xe đúng thời gian quy định cho các chuyến công tác ngoại viện.</li>
                 </ul>
              </div>
              <div className="text-center md:text-right">
                 <p className="text-[11px] font-black uppercase tracking-widest text-primary-300 mb-2">Người duyệt lịch</p>
                 <p className="text-lg font-black italic">Giám đốc Sở Y tế</p>
                 <div className="mt-4 inline-block px-4 py-2 border border-white/20 rounded-lg text-xs font-bold bg-white/5">
                    Phiên bản: 1.2.0 (HNI-SCHED)
                 </div>
              </div>
           </div>
           <div className="absolute top-0 right-0 opacity-5 -translate-y-1/2 translate-x-1/2">
              <CalendarDays size={400} />
           </div>
        </div>
      </div>
    </div>
  );
};

export default WorkSchedule;
