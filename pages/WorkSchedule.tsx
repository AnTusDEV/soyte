import React, { useState, useEffect } from "react";
import {
  Clock,
  MapPin,
  Printer,
  ChevronRight,
  CalendarDays,
  Home,
  AlertCircle,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/prime";
import { WorkSchedule as WorkScheduleType } from "@/types";
import { format, parseISO, isSameDay, isAfter, isToday } from "date-fns";
import { vi } from "date-fns/locale";

interface GroupedSchedule {
  dateKey: string;
  formattedDate: string;
  isToday: boolean;
  items: WorkScheduleType[];
}
const mockScheduleData: WorkScheduleType[] = [
  {
    id: 1,
    title: "Họp Ban Giám đốc rà soát tiến độ",
    content:
      "Chủ trì họp Ban Giám đốc rà soát tiến độ thực hiện các chỉ tiêu y tế quý I/2026 và kế hoạch chuyển đổi số y tế Thủ đô. Cuộc họp tập trung đánh giá kết quả đã đạt được của từng đơn vị, phân tích những khó khăn, vướng mắc trong quá trình triển khai nhiệm vụ. Các thành viên Ban Giám đốc thảo luận về nguyên nhân chủ quan, khách quan ảnh hưởng đến tiến độ thực hiện, đồng thời đề xuất giải pháp điều chỉnh phù hợp. Trên cơ sở đó, lãnh đạo chủ trì kết luận, giao nhiệm vụ cụ thể cho các đơn vị liên quan nhằm đảm bảo hoàn thành đúng tiến độ, nâng cao hiệu quả quản lý và chất lượng chăm sóc sức khỏe nhân dân.",
    start_time: "2026-01-29T08:00:00.000Z",
    end_time: "2026-01-29T09:00:00.000Z",
    location: "Phòng họp số 1, Sở Y tế",
    presider_id: 1,
    coordinating_unit: "Ban Kế hoạch - Tài chính",
    priority: "IMPORTANT",
    attendee_ids: [1, 2, 3],
    status: "pending",
  },
  {
    id: 2,
    title: "Hội nghị triển khai công tác khám chữa bệnh",
    content:
      "Dự Hội nghị triển khai công tác khám chữa bệnh và đảm bảo thuốc, vật tư y tế phục vụ Tết Nguyên đán. Hội nghị tập trung đánh giá tình hình tiếp nhận, điều trị bệnh nhân tại các cơ sở y tế, đặc biệt trong giai đoạn cao điểm dịp lễ Tết. Các đơn vị báo cáo công tác chuẩn bị nhân lực, trang thiết bị, thuốc men và phương án trực cấp cứu. Lãnh đạo ngành y tế chỉ đạo tăng cường kỷ luật, kỷ cương hành chính, nâng cao tinh thần trách nhiệm, đảm bảo công tác khám chữa bệnh diễn ra an toàn, thông suốt, phục vụ tốt nhu cầu chăm sóc sức khỏe của người dân.",
    start_time: "2026-01-29T08:00:00.000Z",
    end_time: "2026-01-29T10:00:00.000Z",
    location: "Hội trường Bệnh viện Đa khoa Xanh Pôn",
    presider_id: 2,
    coordinating_unit: "",
    priority: "NORMAL",
    attendee_ids: [2, 4, 5],
    status: "pending",
  },
  {
    id: 3,
    title: "Làm việc với Đoàn công tác Bộ Y tế",
    content:
      "Làm việc với Đoàn công tác của Bộ Y tế về việc thí điểm Bệnh án điện tử toàn thành phố. Nội dung làm việc tập trung báo cáo tiến độ triển khai tại các cơ sở y tế, đánh giá mức độ đáp ứng về hạ tầng công nghệ thông tin và nhân lực chuyên môn. Hai bên trao đổi về những khó khăn trong quá trình vận hành, vấn đề bảo mật dữ liệu và khả năng liên thông hệ thống. Trên cơ sở đó, thống nhất các giải pháp tháo gỡ, lộ trình triển khai đồng bộ nhằm nâng cao hiệu quả quản lý, phục vụ tốt công tác khám chữa bệnh.",
    start_time: "2026-01-29T14:00:00.000Z",
    end_time: "2026-01-29T16:00:00.000Z",
    location: "Phòng họp số 1, Sở Y tế",
    presider_id: 1,
    coordinating_unit: "Sở Thông tin và Truyền thông",
    priority: "IMPORTANT",
    attendee_ids: [1, 3],
    status: "pending",
  },
  {
    id: 4,
    title: "Dự Lễ ra mắt Trung tâm thông tin cấp cứu 115",
    content:
      "Dự Lễ ra mắt Trung tâm thông tin chỉ huy cấp cứu 115 thông minh. Sự kiện có ý nghĩa quan trọng trong việc hiện đại hóa hệ thống cấp cứu y tế của Thành phố. Trung tâm ứng dụng công nghệ thông tin để nâng cao khả năng tiếp nhận, điều phối và xử lý thông tin cấp cứu. Việc đưa Trung tâm vào hoạt động góp phần rút ngắn thời gian phản ứng, nâng cao hiệu quả phối hợp giữa các lực lượng liên quan, từng bước đáp ứng yêu cầu chăm sóc sức khỏe người dân trong tình hình mới.",
    start_time: "2026-01-29T14:00:00.000Z",
    end_time: "2026-01-29T15:30:00.000Z",
    location: "Trụ sở 1 Công an tỉnh/Thành phố",
    presider_id: 3,
    coordinating_unit: "Công an Thành phố",
    priority: "NORMAL",
    attendee_ids: [3],
    status: "pending",
  },
  {
    id: 5,
    title: "Kiểm tra thực địa công tác phòng chống dịch",
    content:
      "Kiểm tra thực địa công tác phòng chống dịch bệnh mùa Đông Xuân tại Sóc Sơn. Đoàn công tác tiến hành kiểm tra tình hình giám sát dịch tễ, công tác tiêm chủng, chuẩn bị thuốc, hóa chất và vật tư phòng dịch. Qua kiểm tra, đánh giá những kết quả đạt được cũng như tồn tại, hạn chế tại cơ sở. Lãnh đạo yêu cầu địa phương tiếp tục tăng cường công tác tuyên truyền, chủ động các phương án phòng chống dịch, không để xảy ra tình huống bị động, bất ngờ, đảm bảo an toàn sức khỏe cho người dân.",
    start_time: "2026-01-29T15:30:00.000Z",
    end_time: "2026-01-29T17:00:00.000Z",
    location: "TTYT Sóc Sơn",
    presider_id: 2,
    coordinating_unit: "Trung tâm Y tế dự phòng Hà Nội",
    priority: "IMPORTANT",
    attendee_ids: [2, 6],
    status: "pending",
  },
  {
    id: 6,
    title: "Dự họp kết luận của Hội đồng giám định y khoa",
    content:
      "Dự họp kết luận của Hội đồng giám định y khoa Thành phố về các trường hợp bệnh lý phức tạp. Cuộc họp tập trung xem xét hồ sơ, kết quả thăm khám và ý kiến chuyên môn của các thành viên Hội đồng. Trên cơ sở thảo luận, Hội đồng thống nhất kết luận giám định theo đúng quy định hiện hành. Nội dung cuộc họp nhằm đảm bảo tính khách quan, chính xác trong công tác giám định y khoa, bảo vệ quyền lợi chính đáng của người dân.",
    start_time: "2026-01-30T07:30:00.000Z",
    end_time: "2026-01-30T09:00:00.000Z",
    location: "Trung tâm Giám định y khoa",
    presider_id: 2,
    coordinating_unit: "",
    priority: "NORMAL",
    attendee_ids: [2],
    status: "pending",
  },
  {
    id: 7,
    title: "Dự họp đánh giá kết quả chỉ số PARINDEX",
    content:
      "Dự họp đánh giá kết quả thực hiện các chỉ số PARINDEX, PAPI, PCI, DTI cấp tỉnh năm 2025. Cuộc họp tập trung phân tích kết quả đạt được, so sánh với các năm trước và xác định nguyên nhân các chỉ số còn hạn chế. Đại diện các sở, ngành tham gia đóng góp ý kiến, đề xuất giải pháp cải thiện chất lượng cải cách hành chính. Trên cơ sở đó, thống nhất phương hướng, nhiệm vụ trọng tâm trong năm 2026 nhằm nâng cao hiệu quả quản lý nhà nước.",
    start_time: "2026-01-30T08:00:00.000Z",
    end_time: "2026-01-30T10:00:00.000Z",
    location: "Phòng họp UBND Thành phố",
    presider_id: 1,
    coordinating_unit: "Sở Kế hoạch và Đầu tư",
    priority: "IMPORTANT",
    attendee_ids: [1, 7],
    status: "pending",
  },
  {
    id: 8,
    title: "Họp trực tuyến công tác tiêm chủng",
    content:
      "Họp trực tuyến với các Quận, huyện về công tác tiêm chủng mở rộng đợt 1 năm 2026. Cuộc họp nhằm đánh giá tiến độ triển khai tiêm chủng, tỷ lệ bao phủ vắc xin và công tác đảm bảo an toàn tiêm chủng. Các địa phương báo cáo những khó khăn, vướng mắc trong quá trình thực hiện. Lãnh đạo ngành y tế chỉ đạo tăng cường giám sát, tuyên truyền, đảm bảo hoàn thành kế hoạch tiêm chủng theo đúng tiến độ đề ra.",
    start_time: "2026-01-30T14:00:00.000Z",
    end_time: "2026-01-30T15:30:00.000Z",
    location: "Phòng họp 2, Sở Y tế",
    presider_id: 3,
    coordinating_unit: "Trung tâm Kiểm soát bệnh tật",
    priority: "NORMAL",
    attendee_ids: [3, 8],
    status: "pending",
  },
  {
    id: 9,
    title: "Dự Lễ phát động chiến dịch hiến máu",
    content:
      "Dự Lễ phát động chiến dịch hiến máu tình nguyện dịp Tết và Lễ hội Xuân hồng Thủ đô 2026. Chương trình nhằm kêu gọi cán bộ, công chức, viên chức và nhân dân tích cực tham gia hiến máu cứu người. Buổi lễ góp phần nâng cao nhận thức cộng đồng về ý nghĩa nhân văn của hoạt động hiến máu. Đồng thời tăng cường nguồn máu dự trữ, đáp ứng nhu cầu cấp cứu và điều trị tại các cơ sở y tế trên địa bàn.",
    start_time: "2026-01-31T07:30:00.000Z",
    end_time: "2026-01-31T09:00:00.000Z",
    location: "Trường Đại học Y Hà Nội",
    presider_id: 1,
    coordinating_unit: "Hội Chữ thập đỏ",
    priority: "NORMAL",
    attendee_ids: [1, 9],
    status: "pending",
  },
  {
    id: 10,
    title: "Họp Đảng ủy Sở Y tế mở rộng",
    content:
      "Họp Đảng ủy Sở Y tế mở rộng tháng 01/2026. Cuộc họp tập trung đánh giá tình hình thực hiện nhiệm vụ chính trị, công tác xây dựng Đảng và công tác chuyên môn trong thời gian qua. Các đại biểu tham gia thảo luận, đóng góp ý kiến về phương hướng, nhiệm vụ trọng tâm trong thời gian tới. Lãnh đạo Đảng ủy kết luận, chỉ đạo tăng cường kỷ luật, kỷ cương, phát huy vai trò lãnh đạo của tổ chức Đảng trong toàn ngành.",
    start_time: "2026-01-31T14:00:00.000Z",
    end_time: "2026-01-31T16:00:00.000Z",
    location: "Phòng họp 1, Sở Y tế",
    presider_id: 1,
    coordinating_unit: "Văn phòng Đảng ủy",
    priority: "IMPORTANT",
    attendee_ids: [1, 2, 3, 4],
    status: "pending",
  },
  {
    id: 11,
    title: "Dự Hội nghị cán bộ, viên chức",
    content:
      "Dự Hội nghị cán bộ, viên chức, người lao động năm 2025 và triển khai nhiệm vụ năm 2026. Hội nghị nhằm tổng kết kết quả hoạt động trong năm qua, đánh giá những mặt đạt được và tồn tại. Đồng thời thảo luận các giải pháp cải thiện điều kiện làm việc, nâng cao đời sống cán bộ, viên chức. Lãnh đạo đơn vị phát động phong trào thi đua, quyết tâm hoàn thành tốt các nhiệm vụ được giao trong năm mới.",
    start_time: "2026-02-01T08:00:00.000Z",
    end_time: "2026-02-01T10:00:00.000Z",
    location: "Bệnh viện Thanh Nhàn",
    presider_id: 2,
    coordinating_unit: "",
    priority: "NORMAL",
    attendee_ids: [2],
    status: "pending",
  },
  {
    id: 12,
    title: "Kiểm tra công tác an toàn vệ sinh thực phẩm",
    content:
      "Kiểm tra công tác an toàn vệ sinh thực phẩm tại các bếp ăn tập thể trường học khu vực nội thành. Nội dung kiểm tra tập trung vào điều kiện cơ sở vật chất, nguồn gốc nguyên liệu, quy trình chế biến và lưu mẫu thức ăn. Qua kiểm tra, đoàn công tác nhắc nhở các đơn vị thực hiện nghiêm các quy định về an toàn thực phẩm. Đồng thời yêu cầu tăng cường công tác tự kiểm tra, giám sát nhằm phòng ngừa ngộ độc thực phẩm.",
    start_time: "2026-02-01T14:00:00.000Z",
    end_time: "2026-02-01T16:00:00.000Z",
    location: "Hoàn Kiếm",
    presider_id: 3,
    coordinating_unit: "Chi cục An toàn vệ sinh thực phẩm",
    priority: "IMPORTANT",
    attendee_ids: [3],
    status: "pending",
  },
];

const WorkSchedule = () => {
  const [groupedSchedules, setGroupedSchedules] = useState<GroupedSchedule[]>(
    [],
  );
  const [selectedDateKey, setSelectedDateKey] = useState<string | null>(null);

  useEffect(() => {
    if (mockScheduleData.length > 0) {
      const today = new Date();
      const grouped = mockScheduleData.reduce(
        (acc: { [key: string]: GroupedSchedule }, current) => {
          const itemDate = parseISO(current.start_time);
          const dateKey = format(itemDate, "yyyy-MM-dd");
          if (!isToday(itemDate) && isAfter(itemDate, today) === false) {
            return acc;
          }
          const formattedDate = format(itemDate, "EEEE, 'ngày' dd/MM/yyyy", {
            locale: vi,
          });
          const isCurrentDay = isSameDay(itemDate, today);

          if (!acc[dateKey]) {
            acc[dateKey] = {
              dateKey: dateKey,
              formattedDate: formattedDate,
              isToday: isCurrentDay,
              items: [],
            };
          }
          acc[dateKey].items.push(current);
          return acc;
        },
        {},
      );

      // Sort dates
      const sortedGroupedSchedules = Object.values(grouped).sort(
        (a, b) => new Date(a.dateKey).getTime() - new Date(b.dateKey).getTime(),
      );

      setGroupedSchedules(sortedGroupedSchedules);

      // Set initial selected date
      if (sortedGroupedSchedules.length > 0) {
        const todaySchedule = sortedGroupedSchedules.find((day) => day.isToday);
        if (todaySchedule) {
          setSelectedDateKey(todaySchedule.dateKey);
        } else {
          setSelectedDateKey(sortedGroupedSchedules[0].dateKey);
        }
      }
    }
  }, []); // Empty dependency array means this effect runs once on mount

  const selectedDay = groupedSchedules.find(
    (day) => day.dateKey === selectedDateKey,
  );

  // No loading or error states as data is hardcoded

  return (
    <div className="min-h-screen bg-gray-50 font-sans pb-20">
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
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
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
            <Button
              label="In lịch tuần"
              icon={<Printer size={18} />}
              onClick={() => window.print()}
              outlined
              className="!border-gray-200 hover:!border-red-600 !text-gray-700 font-bold gap-2"
            />
            <div className="bg-red-50 border border-red-100 px-4 py-2.5 rounded-xl text-red-700 text-xs font-black flex items-center gap-2">
              <AlertCircle size={16} /> HOTLINE TRỰC BAN: 024.3998.5765
            </div>
          </div>
        </div>

        {/* Main Content Area - Two Columns */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Left Sidebar - Dates */}
          <div className="md:col-span-1 bg-white p-4 rounded-3xl shadow-lg border border-gray-100 sticky top-4">
            <h2 className="text-lg font-bold text-blue-800 mb-4 uppercase">
              Các ngày sắp tới
            </h2>
            <ul className="space-y-3">
              {groupedSchedules.map((day) => (
                <li key={day.dateKey}>
                  <button
                    onClick={() => setSelectedDateKey(day.dateKey)}
                    className={`block w-full text-left px-4 py-2 rounded-lg transition-colors duration-200 
                      ${selectedDateKey === day.dateKey ? "bg-blue-100 text-blue-800 font-bold" : "text-gray-700 hover:bg-gray-100"}
                    `}
                  >
                    <span className="flex items-center">
                      {day.formattedDate}
                      {day.isToday && (
                        <span className="ml-2 text-red-500">•</span>
                      )}
                    </span>
                    <ul className="ml-2 mt-1 space-y-1 text-xs text-gray-600">
                      {day.items.map((item) => (
                        <li
                          key={item.id}
                          className="flex items-center gap-1 truncate"
                        >
                          <Clock size={12} className="text-gray-400" />
                          <span className="font-medium">
                            {format(parseISO(item.start_time), "HH:mm")}
                          </span>
                          <span className="flex-1 truncate">{item.title}</span>
                        </li>
                      ))}
                    </ul>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Content - Schedule Details for selected day */}
          <div className="md:col-span-3">
            {selectedDay ? (
              <div
                className={`relative bg-white rounded-3xl shadow-lg border border-gray-100 p-4 
                  ${selectedDay.isToday ? "ring-2 ring-red-200" : ""}`}
              >
                {/* Date Header */}
                <h3
                  className={`text-xl font-black uppercase mb-3 pb-2 border-b border-gray-100 
                    ${selectedDay.isToday ? "text-red-700" : "text-blue-800"}`}
                >
                  {selectedDay.formattedDate}
                </h3>

                {/* Schedule Items */}
                <div className="divide-y divide-gray-100">
                  {selectedDay.items.map((item) => (
                    <div key={item.id} className="py-2">
                      <div className="flex flex-col md:flex-row md:items-start gap-4">
                        <div className="flex-shrink-0 w-24 md:w-32">
                          <div className="flex items-center gap-2 font-black text-red-700">
                            <Clock size={16} />
                            {format(parseISO(item.start_time), "HH:mm")}
                          </div>
                        </div>
                        <div className="flex-1">
                          <p className="font-bold text-gray-900 text-base mb-1">
                            {item.title}
                          </p>
                          <p className="text-sm text-gray-700 leading-relaxed mb-2">
                            {item.content}
                          </p>
                          <p className="text-sm text-gray-500 italic flex items-center gap-1">
                            <MapPin size={14} className="text-gray-400" />
                            {item.location}
                          </p>
                          <p className="text-sm text-gray-600 font-semibold mt-2">
                            Chủ trì:{" "}
                            <span className="font-bold">
                              {item.presider_id === 1
                                ? "GĐ Nguyễn Trọng Diện"
                                : "PGĐ Vũ Cao Cương"}
                            </span>
                          </p>
                          {item.coordinating_unit && (
                            <p className="text-xs text-gray-500 mt-1">
                              Đơn vị phối hợp: {item.coordinating_unit}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="bg-white p-4 rounded-3xl shadow-lg border border-gray-100 text-center text-gray-500">
                Không có lịch công tác cho ngày được chọn.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkSchedule;
