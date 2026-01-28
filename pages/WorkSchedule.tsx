import React from "react";
import { 
  Clock, 
  MapPin,
  Car,
  Printer,
  ChevronRight,
  Info,
  CalendarDays,
  Home,
  AlertCircle,
} from "lucide-react";
import { Link } from "react-router-dom";

const WorkSchedule = () => {
  const scheduleData = [
    {
      date: "Thứ 2, ngày 12/1/2026",
      isToday: true,
      items: [
        {
          time: "08:00",
          attendee: "GĐ Nguyễn Trọng Diện",
          content:
            "Chủ trì họp Ban Giám đốc rà soát tiến độ thực hiện các chỉ tiêu y tế quý I/2026 và kế hoạch chuyển đổi số y tế Thủ đô.",
          location: "Phòng họp số 1, Sở Y tế",
        },
        {
          time: "08:00",
          attendee: "PGĐ Nguyễn Đình Hưng",
          content:
            "Dự Hội nghị triển khai công tác khám chữa bệnh và đảm bảo thuốc, vật tư y tế phục vụ Tết Nguyên đán.",
          location: "Hội trường Bệnh viện Đa khoa Xanh Pôn",
          vehicle: "Xe 29A-115.01",
        },
        {
          time: "08:30",
          attendee: "PGĐ Vũ Cao Cương",
          content:
            "Dự rà soát, đánh giá thực trạng phát triển đô thị y tế và quy hoạch các cụm y tế chuyên sâu của Thành phố.",
          location: "Phòng họp Sở Xây dựng",
        },
        {
          time: "09:00",
          attendee: "PGĐ Trần Văn Chung",
          content:
            "Dự và chủ trì Hội nghị tham vấn chính sách và xin ý kiến dự thảo Luật An toàn thực phẩm sửa đổi tại khu vực phía Bắc.",
          location: "Phòng họp số 2, Sở Y tế",
        },
        {
          time: "09:30",
          attendee: "PGĐ Đinh Hồng Phong",
          content:
            "Làm việc với các đơn vị về công tác an sinh xã hội và chăm lo sức khỏe cho đối tượng chính sách.",
          location: "Phòng họp số 3, Sở Y tế",
        },
        {
          time: "14:00",
          attendee: "GĐ Nguyễn Trọng Diện",
          content:
            "Làm việc với Đoàn công tác của Bộ Y tế về việc thí điểm Bệnh án điện tử toàn thành phố.",
          location: "Phòng họp số 1, Sở Y tế",
        },
        {
          time: "14:00",
          attendee: "PGĐ Vũ Cao Cương",
          content:
            "Dự Lễ ra mắt Trung tâm thông tin chỉ huy cấp cứu 115 thông minh.",
          location: "Trụ sở 1 Công an tỉnh/Thành phố",
        },
        {
          time: "15:30",
          attendee: "PGĐ Nguyễn Đình Hưng",
          content:
            "Kiểm tra thực địa công tác phòng chống dịch bệnh mùa Đông Xuân tại Sóc Sơn.",
          location: "TTYT Sóc Sơn",
          vehicle: "Xe 29A-115.02",
        },
      ],
    },
    {
      date: "Thứ 3, ngày 13/1/2026",
      items: [
        {
          time: "07:30",
          attendee: "PGĐ Nguyễn Đình Hưng",
          content:
            "Dự họp kết luận của Hội đồng giám định y khoa Thành phố về các trường hợp bệnh lý phức tạp.",
          location: "Trung tâm Giám định y khoa",
          vehicle: "Xe 29A-115.01",
        },
        {
          time: "08:00",
          attendee: "GĐ Nguyễn Trọng Diện",
          content:
            "Dự họp đánh giá kết quả thực hiện các chỉ số Chỉ số PARINDEX, PAPI, PCI, DTI cấp tỉnh năm 2025.",
          location: "Phòng họp UBND Thành phố",
        },
        {
          time: "08:30",
          attendee: "PGĐ Trần Văn Chung",
          content:
            "Dự Hội nghị Ban Chấp hành Hiệp hội tư vấn nâng cao sức khỏe Việt Nam lần thứ 3, nhiệm kỳ 2025-2030.",
          location: "Cục Y tế dự phòng - Bộ Y tế",
          vehicle: "Xe 29A-115.03",
        },
        {
          time: "10:00",
          attendee: "PGĐ Đinh Hồng Phong",
          content:
            "Kiểm tra công tác triển khai thẻ bảo hiểm y tế cho người nghèo và cận nghèo tại các ngoại thành.",
          location: "UBND Ba Vì",
        },
        {
          time: "14:00",
          attendee: "PGĐ Vũ Cao Cương",
          content:
            "Họp trực tuyến với các Quận, về công tác tiêm chủng mở rộng đợt 1 năm 2026.",
          location: "Phòng họp 2, Sở Y tế",
        },
        {
          time: "16:30",
          attendee: "GĐ Nguyễn Trọng Diện",
          content:
            "Dự họp phiên họp của Ban chỉ đạo Thành phố về phát triển khoa học công nghệ và đổi mới sáng tạo (Đề án 06).",
          location: "Trụ sở UBND Thành phố",
        },
      ],
    },
    {
      date: "Thứ 4, ngày 14/1/2026",
      items: [
        {
          time: "08:00",
          attendee: "PGĐ Nguyễn Đình Hưng",
          content:
            "Dự Hội nghị cán bộ, viên chức, người lao động năm 2025 và triển khai nhiệm vụ 2026.",
          location: "Bệnh viện Thanh Nhàn",
          vehicle: "Xe 29A-115.01",
        },
        {
          time: "08:30",
          attendee: "PGĐ Trần Văn Chung",
          content:
            "Dự Hội thảo khoa học chia sẻ kinh nghiệm quốc tế về ghi nhãn dinh dưỡng thực phẩm bảo vệ sức khỏe.",
          location: "Nhà khách Trung ương số 8 Chu Văn An",
          vehicle: "Xe 29A-115.03",
        },
        {
          time: "14:00",
          attendee: "PGĐ Vũ Cao Cương",
          content:
            "Kiểm tra công tác an toàn vệ sinh thực phẩm tại các bếp ăn tập thể trường học khu vực nội thành.",
          location: "Hoàn Kiếm",
          vehicle: "Xe 29A-115.02",
        },
      ],
    },
    {
      date: "Thứ 5, ngày 15/1/2026",
      items: [
        {
          time: "07:30",
          attendee: "GĐ Nguyễn Trọng Diện",
          content:
            "Dự Lễ phát động chiến dịch hiến máu tình nguyện dịp Tết và Lễ hội Xuân hồng Thủ đô 2026.",
          location: "Trường Đại học Y Hà Nội",
          vehicle: "Xe 29A-006.89",
        },
        {
          time: "14:00",
          attendee: "Ban Giám đốc Sở",
          content: "Họp Đảng ủy Sở Y tế mở rộng tháng 01/2026.",
          location: "Phòng họp 1, Sở Y tế",
        },
      ],
    },
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
              <h1 className="text-2xl md:text-3xl font-black text-gray-900 uppercase tracking-tighter">
                Lịch công tác Lãnh đạo Sở
              </h1>
              <p className="text-sm text-gray-500 font-medium">
                Ban Giám đốc Sở Y tế Thành phố Hà Nội
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => window.print()}
              className="bg-white border-2 border-gray-200 hover:border-red-600 text-gray-700 px-6 py-2.5 rounded-xl font-bold flex items-center gap-2 transition-all shadow-sm"
            >
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
            <div
              key={dIdx}
              className={`relative ${
                day.isToday ? "animate-in fade-in slide-in-from-left-4" : ""
              }`}
            >
              {/* Date Header */}
              <div className="flex items-center gap-4 mb-6">
                <div
                  className={`px-6 py-2 rounded-full text-sm font-black uppercase tracking-widest shadow-sm border ${
                    day.isToday
                      ? "bg-red-700 text-white border-red-800"
                      : "bg-white text-gray-800 border-gray-200"
                  }`}
                >
                  {day.isToday && (
                    <span className="mr-2 text-yellow-400">●</span>
                  )}
                  {day.date}
                </div>
                <div className="flex-grow h-px bg-gray-200"></div>
              </div>

              {/* Items Table/Grid */}
              <div
                className={`bg-white rounded-3xl shadow-xl overflow-hidden border ${
                  day.isToday
                    ? "border-red-200 ring-4 ring-red-50"
                    : "border-gray-100"
                }`}
              >
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr
                        className={`text-[11px] font-black uppercase tracking-widest border-b ${
                          day.isToday
                            ? "bg-red-50 text-red-900 border-red-100"
                            : "bg-gray-50 text-gray-400 border-gray-100"
                        }`}
                      >
                        <th className="px-6 py-4 w-32">Thời gian</th>
                        <th className="px-6 py-4 w-[20%]">Người thực hiện</th>
                        <th className="px-6 py-4">Nội dung công việc</th>
                        <th className="px-6 py-4">Địa điểm</th>
                        <th className="px-6 py-4 w-40">Ghi chú / Xe</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {day.items.map((item, iIdx) => (
                        <tr
                          key={iIdx}
                          className="hover:bg-gray-50/80 transition-colors group"
                        >
                          <td className="px-6 py-5">
                            <div className="flex items-center gap-2 font-black text-gray-900">
                              <Clock size={16} className="text-gray-400" />
                              {item.time}
                            </div>
                          </td>
                          <td className="px-6 py-5">
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-gray-800 text-[13px]">
                                {item.attendee}
                              </span>
                            </div>
                          </td>
                          <td className="px-6 py-5">
                            <p className="text-[14px] text-gray-700 leading-relaxed font-medium">
                              {item.content}
                            </p>
                          </td>
                          <td className="px-6 py-5">
                            <div className="flex items-start gap-2 text-[13px] text-gray-500 italic">
                              <MapPin
                                size={14}
                                className="mt-0.5 text-gray-400 flex-shrink-0"
                              />
                              {item.location}
                            </div>
                          </td>
                          <td className="px-6 py-5">
                            {item.vehicle ? (
                              <div className="flex items-center gap-2 bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200">
                                <Car size={14} className="text-slate-500" />
                                <span className="text-[11px] font-black text-slate-700">
                                  {item.vehicle}
                                </span>
                              </div>
                            ) : (
                              <span className="text-[10px] text-gray-300 font-bold italic uppercase tracking-tighter">
                                - Tự túc -
                              </span>
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
                <Info size={24} className="text-secondary-400" /> Lưu ý dành cho
                Cán bộ
              </h3>
              <ul className="text-sm text-primary-100 space-y-2 list-disc list-inside">
                <li>
                  Lịch công tác được cập nhật định kỳ dựa trên phê duyệt của
                  Giám đốc Sở.
                </li>
                <li>
                  Mọi thay đổi đột xuất sẽ được Văn phòng Sở thông báo qua hệ
                  thống quản lý văn bản iOffice.
                </li>
                <li>
                  Cán bộ phụ trách nội dung họp cần chuẩn bị đầy đủ báo cáo
                  trước 24 giờ.
                </li>
                <li>
                  Điều động phương tiện theo đúng kế hoạch đã đăng ký tại Văn
                  phòng.
                </li>
              </ul>
            </div>
            <div className="text-center md:text-right">
              <p className="text-[11px] font-black uppercase tracking-widest text-primary-300 mb-2">
                Người duyệt lịch
              </p>
              <p className="text-lg font-black italic">TS. Nguyễn Trọng Diện</p>
              <div className="mt-4 inline-block px-4 py-2 border border-white/20 rounded-lg text-xs font-bold bg-white/5">
                Hanoi Health Dept Dashboard v1.2
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
