import React, { useState, useEffect } from "react";
import {
  CalendarDays,
  List,
  Plus,
  Search,
  Filter,
  ChevronDown,
  Loader2,
} from "lucide-react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import ScheduleForm from "./../components/ScheduleForm";
import { useSchedules } from "../services/useSchedules"; 
import type { WorkSchedule } from "./../types";

type ViewMode = "calendar" | "list";

const WorkSchedule: React.FC = () => {
  const [viewMode, setViewMode] = useState<ViewMode>("calendar");
  const [selectedDay, setSelectedDay] = useState<Date | undefined>(new Date());
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filterStatus, setFilterStatus] = useState<
    "all" | "pending" | "completed" | "cancelled"
  >("all");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingSchedule, setEditingSchedule] = useState<
    WorkSchedule | undefined
  >(undefined);

  const {
    schedules,
    loading,
    error,
    fetchSchedules,
    createSchedule,
    updateSchedule,
    deleteSchedule,
  } = useSchedules();

  useEffect(() => {
    fetchSchedules({
      status: filterStatus === "all" ? undefined : filterStatus,
      searchTerm: searchTerm,
    });
  }, [fetchSchedules, filterStatus, searchTerm]);

  const handleMonthChange = (month: Date) => {
    setCurrentMonth(month);
  };

  const schedulesForSelectedDay =
    schedules.length > 0 &&
    schedules.filter((schedule) => {
      if (!selectedDay || !schedule.start_time) return false;
      return (
        format(new Date(schedule.start_time), "yyyy-MM-dd") ===
        format(selectedDay, "yyyy-MM-dd")
      );
    });

  const handleOpenForm = (schedule?: WorkSchedule) => {
    setEditingSchedule(schedule);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingSchedule(undefined);
  };

  const handleSaveSchedule = async (scheduleData: WorkSchedule) => {
    try {
      if (editingSchedule?.id) {
        await updateSchedule(editingSchedule.id, scheduleData);
        alert("Cập nhật lịch trình thành công!");
      } else {
        await createSchedule(scheduleData);
        alert("Tạo lịch trình mới thành công!");
      }
      handleCloseForm();
      fetchSchedules({
        status: filterStatus === "all" ? undefined : filterStatus,
        searchTerm: searchTerm,
      });
    } catch (err: any) {
      alert(`Lỗi: ${err.message || "Không thể lưu lịch trình."}`);
    }
  };

  const handleDeleteSchedule = async (id: number) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa lịch trình này?")) {
      try {
        await deleteSchedule(id);
        alert("Xóa lịch trình thành công!");
        fetchSchedules({
          status: filterStatus === "all" ? undefined : filterStatus,
          searchTerm: searchTerm,
        });
      } catch (err: any) {
        alert(`Lỗi: ${err.message || "Không thể xóa lịch trình."}`);
      }
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="animate-spin text-primary-500" size={32} />
        <span className="ml-2 text-gray-600">Đang tải lịch trình...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 p-4">
        <p>Lỗi: Không thể tải lịch trình. Vui lòng thử lại.</p>
        <p>{error.message}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Quản lý Lịch trình Làm việc
      </h1>

      <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
        <div className="flex space-x-2">
          <button
            className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-colors ${
              viewMode === "calendar"
                ? "bg-primary-600 text-white shadow-md"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
            onClick={() => setViewMode("calendar")}
          >
            <CalendarDays size={20} />
            Chế độ Lịch
          </button>
          <button
            className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-colors ${
              viewMode === "list"
                ? "bg-primary-600 text-white shadow-md"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
            onClick={() => setViewMode("list")}
          >
            <List size={20} />
            Chế độ Danh sách
          </button>
        </div>
        <button
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 shadow-md transition-colors"
          onClick={() => handleOpenForm()}
        >
          <Plus size={20} />
          Thêm lịch trình mới
        </button>
      </div>

      {viewMode === "calendar" ? (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <DayPicker
            mode="single"
            selected={selectedDay}
            onSelect={setSelectedDay}
            month={currentMonth}
            onMonthChange={handleMonthChange}
            // showNavigation={true}
            locale={vi}
            className="react-day-picker-custom"
            classNames={{
              caption: "flex justify-center py-2 mb-4 relative items-center",
              caption_label: "text-lg font-bold text-gray-800",
              nav: "flex items-center",
              nav_button:
                "h-8 w-8 bg-transparent hover:bg-gray-100 rounded-full flex items-center justify-center",
              nav_button_previous: "absolute left-0",
              nav_button_next: "absolute right-0",
              table: "w-full border-collapse",
              head_row: "flex font-medium text-gray-600 text-sm",
              head_cell: "flex-1 text-center p-2",
              row: "flex w-full mt-2",
              cell: "flex-1 p-2 text-center text-sm relative focus-within:relative focus-within:z-20",
              day: "h-10 w-10 p-0 font-normal hover:bg-gray-100 rounded-full flex items-center justify-center",
              day_range_end: "day-range-end",
              day_selected:
                "bg-primary-600 text-white hover:bg-primary-700 rounded-full",
              day_today: "font-bold border-2 border-primary-500 rounded-full",
              day_outside: "text-gray-400",
              day_disabled: "text-gray-300",
              day_hidden: "invisible",
              day_range_middle: "rounded-none",
              day_range_start: "rounded-none",
            }}
            // components={{
            //   Caption: ({ displayMonth, goToMonth }) => (
            //     <div className="flex justify-between items-center py-2 px-4">
            //       <button
            //         onClick={() =>
            //           goToMonth(
            //             new Date(
            //               displayMonth.getFullYear(),
            //               displayMonth.getMonth() - 1,
            //             ),
            //           )
            //         }
            //         className="h-8 w-8 bg-transparent hover:bg-gray-100 rounded-full flex items-center justify-center"
            //       >
            //         {"<"}
            //       </button>
            //       <h2 className="text-lg font-bold text-gray-800">
            //         Tháng {format(displayMonth, "MMMM yyyy", { locale: vi })}
            //       </h2>
            //       <button
            //         onClick={() =>
            //           goToMonth(
            //             new Date(
            //               displayMonth.getFullYear(),
            //               displayMonth.getMonth() + 1,
            //             ),
            //           )
            //         }
            //         className="h-8 w-8 bg-transparent hover:bg-gray-100 rounded-full flex items-center justify-center"
            //       >
            //         {">"}
            //       </button>
            //     </div>
            //   ),
            // }}
          />
          {selectedDay && (
            <div className="mt-4">
              <p className="text-center text-gray-600 font-bold mb-2">
                Lịch trình cho ngày {format(selectedDay, "PPP", { locale: vi })}
                :
              </p>
              {(schedulesForSelectedDay?.length || 0) > 0 ? (
                <ul className="space-y-2">
                  {schedulesForSelectedDay.map((schedule) => (
                    <li
                      key={schedule.id}
                      className="bg-blue-50 p-3 rounded-lg border border-blue-100 text-sm"
                    >
                      <p className="font-semibold text-blue-800">
                        {schedule.title}
                      </p>
                      <p className="text-xs text-gray-600">
                        {schedule.start_time} - {schedule.end_time},{" "}
                        {/* {schedule.assignedTo} */}
                      </p>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-center text-gray-500">
                  Không có lịch trình nào cho ngày này.
                </p>
              )}
            </div>
          )}
        </div>
      ) : (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                type="text"
                placeholder="Tìm kiếm theo tiêu đề, người tạo, phòng ban..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-100"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="relative">
              <select
                className="w-full md:w-auto pl-10 pr-4 py-2 border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-primary-100 bg-white"
                value={filterStatus}
                onChange={(e) =>
                  setFilterStatus(
                    e.target.value as
                      | "all"
                      | "pending"
                      | "completed"
                      | "cancelled",
                  )
                }
              >
                <option value="all">Tất cả trạng thái</option>
                <option value="pending">Đang chờ</option>
                <option value="completed">Hoàn thành</option>
                <option value="cancelled">Hủy bỏ</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-gray-400">
                <Filter size={18} />
              </div>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <ChevronDown size={16} />
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead>
                <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
                  <th className="py-3 px-6 text-left">Tiêu đề</th>
                  <th className="py-3 px-6 text-left">Thời gian</th>
                  <th className="py-3 px-6 text-center">Trạng thái</th>
                  <th className="py-3 px-6 text-left">Người tạo</th>
                  <th className="py-3 px-6 text-left">Người được giao</th>
                  <th className="py-3 px-6 text-center">Hành động</th>
                </tr>
              </thead>
              <tbody className="text-gray-600 text-sm font-light">
                {schedules.length > 0 &&
                  schedules.map((schedule) => (
                    <tr
                      key={schedule.id}
                      className="border-b border-gray-200 hover:bg-gray-50"
                    >
                      <td className="py-3 px-6 text-left whitespace-nowrap">
                        <div className="flex items-center">
                          <span className="font-medium">{schedule.title}</span>
                        </div>
                      </td>
                      <td className="py-3 px-6 text-left">
                        {format(
                          new Date(
                            `${schedule.start_time}T${schedule.start_time}`,
                          ),
                          "HH:mm dd/MM/yyyy",
                          { locale: vi },
                        )}{" "}
                        - <br />
                        {format(
                          new Date(`${schedule.end_time}T${schedule.end_time}`),
                          "HH:mm dd/MM/yyyy",
                          { locale: vi },
                        )}
                      </td>
                      <td className="py-3 px-6 text-center">
                        <span
                          className={`py-1 px-3 rounded-full text-xs font-bold ${
                            schedule.status === "completed"
                              ? "bg-green-200 text-green-700"
                              : schedule.status === "pending"
                                ? "bg-yellow-200 text-yellow-700"
                                : "bg-red-200 text-red-700"
                          }`}
                        >
                          {schedule.status === "completed"
                            ? "Hoàn thành"
                            : schedule.status === "pending"
                              ? "Đang chờ"
                              : "Hủy bỏ"}
                        </span>
                      </td>
                      <td className="py-3 px-6 text-left">{"N/A"}</td>
                      <td className="py-3 px-6 text-left">
                        {/* {schedule.assignedTo} */} fix
                      </td>
                      <td className="py-3 px-6 text-center">
                        <div className="flex item-center justify-center">
                          <button
                            className="w-4 mr-2 transform hover:text-primary-500 hover:scale-110"
                            onClick={() => handleOpenForm(schedule)}
                          >
                            👁️
                          </button>
                          <button
                            className="w-4 mr-2 transform hover:text-yellow-500 hover:scale-110"
                            onClick={() => handleOpenForm(schedule)}
                          >
                            ✏️
                          </button>
                          <button
                            className="w-4 transform hover:text-red-500 hover:scale-110"
                            onClick={() => handleDeleteSchedule(schedule.id)}
                          >
                            🗑️
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
            {(schedules?.length || 0) === 0 && (
              <p className="text-center text-gray-500 mt-4">
                Không tìm thấy lịch trình nào.
              </p>
            )}
          </div>
        </div>
      )}

      {isFormOpen && (
        <ScheduleForm
          initialData={editingSchedule}
          onClose={handleCloseForm}
          onSave={handleSaveSchedule}
        />
      )}
    </div>
  );
};

export default WorkSchedule;
