import React, { useState, useEffect, useMemo } from "react";
import AdminLayout from "../components/AdminLayout";
import { useSchedules } from "../services/useSchedules";
import { WorkSchedule, User } from "../types";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import {
  Search,
  Filter,
  ChevronDown,
  Plus,
  Edit3,
  Trash2,
  CalendarDays,
  Loader2,
  CheckCircle,
  Clock,
  MapPin,
  User as UserIcon,
  Users,
} from "lucide-react";
import ScheduleForm from "../components/ScheduleForm";
import { api } from "../api";
import { Dropdown } from "@/components/prime";

const AdminWorkSchedule: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filterStatus, setFilterStatus] = useState<
    "all" | "pending" | "completed" | "cancelled"
  >("all");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingSchedule, setEditingSchedule] = useState<
    WorkSchedule | undefined
  >(undefined);
  const [users, setUsers] = useState<User[]>([]);

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
    const loadUsers = async () => {
      try {
        const fetchedUsers = await api.getUsers();
        // console.log(fetchedUsers);return

        setUsers(fetchedUsers.data || []);
      } catch (err) {
        console.error("Failed to fetch users:", err);
      }
    };
    loadUsers();
  }, []);

  useEffect(() => {
    fetchSchedules({
      status: filterStatus === "all" ? undefined : filterStatus,
      searchTerm: searchTerm,
    });
  }, [fetchSchedules, filterStatus, searchTerm]);

  const userMap = useMemo(() => {
    return users.reduce(
      (acc, user) => {
        acc[user.id] = user.full_name;
        return acc;
      },
      {} as Record<number, string>,
    );
  }, [users]);

  const handleOpenForm = (schedule?: WorkSchedule) => {
    setEditingSchedule(schedule);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingSchedule(undefined);
  };

  const handleSaveSchedule = async (
    scheduleData: Omit<
      WorkSchedule,
      "id" | "status" | "createdAt" | "updatedAt"
    >,
  ) => {
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
  const statusOptions = [
    { label: "Tất cả trạng thái", value: "all" },
    { label: "Đang chờ", value: "pending" },
    { label: "Hoàn thành", value: "completed" },
    { label: "Hủy bỏ", value: "cancelled" },
  ];

  const stats = useMemo(
    () => ({
      total: schedules?.length || 0,
      pending:
        (schedules.length > 0 &&
          schedules.filter((s) => s.status === "pending").length) ||
        0,
      completed:
        (schedules.length > 0 &&
          schedules.filter((s) => s.status === "completed").length) ||
        0,
    }),
    [schedules],
  );

  return (
    <AdminLayout title="Quản lý Lịch công tác">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-8">
        <StatCard
          icon={CalendarDays}
          title="Tổng số lịch trình"
          value={stats.total}
          color="blue"
        />
        <StatCard
          icon={Clock}
          title="Đang chờ"
          value={stats.pending}
          color="amber"
        />
        <StatCard
          icon={CheckCircle}
          title="Đã hoàn thành"
          value={stats.completed}
          color="green"
        />
        <div className="flex flex-col justify-center">
          <button
            onClick={() => handleOpenForm()}
            className="w-full bg-secondary-600 hover:bg-secondary-700 text-white font-black py-4 rounded-2xl shadow-xl shadow-secondary-100 flex items-center justify-center gap-2 transition-all transform hover:-translate-y-1"
          >
            <Plus size={24} /> Thêm lịch trình
          </button>
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50 flex-wrap gap-4">
          <div className="relative w-full md:w-96">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={18}
            />
            <input
              type="text"
              placeholder="Tìm kiếm theo tiêu đề, địa điểm..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-primary-100 font-medium text-sm"
            />
          </div>
          <Dropdown
            value={filterStatus}
            options={statusOptions}
            onChange={(e) => setFilterStatus(e.value)}
            placeholder="Tất cả trạng thái"
            className="w-full md:w-auto"
            panelClassName="text-sm"
            showClear={false}
          />
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="bg-gray-50 text-left text-[11px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-100">
                <th className="px-6 py-4">Lịch trình</th>
                <th className="px-6 py-4">Thời gian & Địa điểm</th>
                <th className="px-6 py-4">Cán bộ</th> 
                <th className="px-6 py-4 text-center">Mức độ</th>
                <th className="px-6 py-4 text-center">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {loading ? (
                <tr>
                  <td colSpan={6} className="px-6 py-20 text-center">
                    <Loader2
                      size={40}
                      className="animate-spin text-primary-600 mx-auto mb-4"
                    />
                    <p className="text-gray-400 font-bold uppercase text-[10px]">
                      Đang tải dữ liệu lịch trình...
                    </p>
                  </td>
                </tr>
              ) : (
                schedules.length > 0 &&
                schedules.map((schedule) => (
                  <tr
                    key={schedule.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4 max-w-xs">
                      <p className="font-bold text-gray-800 text-sm truncate">
                        {schedule.title}
                      </p>
                      <p className="text-xs text-gray-500 line-clamp-2">
                        {schedule.content}
                      </p>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      <div className="font-medium">
                        {format(
                          new Date(schedule.start_time),
                          "HH:mm, dd/MM/yyyy",
                          { locale: vi },
                        )}{" "}
                        -{" "}
                        {format(
                          new Date(schedule.end_time),
                          "HH:mm, dd/MM/yyyy",
                          { locale: vi },
                        )}
                      </div>
                      <div className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                        <MapPin size={12} /> {schedule.location}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      <div className="flex items-center gap-2">
                        <UserIcon size={14} className="text-gray-400" />
                        {userMap[schedule.presider_id] || "N/A"}
                      </div>
                    </td>
                  
                    <td className="px-6 py-4 text-center">
                      <span
                        className={`py-1 px-3 rounded-full text-xs font-bold ${
                          schedule.priority === "NORMAL"
                            ? "bg-green-200 text-green-700"
                            : schedule.priority === "IMPORTANT"
                              ? "bg-yellow-200 text-yellow-700"
                              : "bg-red-200 text-red-700"
                        }`}
                      >
                        {schedule.priority === "NORMAL"
                          ? "Bình thường"
                          : schedule.priority === "IMPORTANT"
                            ? "Quan trọng"
                            : "Thấp"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          className="p-2 text-primary-600 hover:bg-primary-50 rounded-lg transition shadow-sm bg-white border border-gray-100"
                          onClick={() => handleOpenForm(schedule)}
                        >
                          <Edit3 size={18} />
                        </button>
                        <button
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition shadow-sm bg-white border border-gray-100"
                          onClick={() => handleDeleteSchedule(schedule.id)}
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
          {!loading && schedules.length === 0 && (
            <div className="py-20 text-center">
              <div className="bg-gray-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-300">
                <CalendarDays size={32} />
              </div>
              <p className="text-gray-400 font-bold">
                {searchTerm || filterStatus !== "all"
                  ? "Không tìm thấy lịch trình nào phù hợp."
                  : "Chưa có lịch trình nào được tạo."}
              </p>
            </div>
          )}
        </div>
      </div>

      {isFormOpen && (
        <ScheduleForm
          initialData={editingSchedule}
          onClose={handleCloseForm}
          onSave={handleSaveSchedule}
        />
      )}
    </AdminLayout>
  );
};
interface StatCardProps {
  icon: React.ElementType;
  title: string;
  value: number | string;
  color: "blue" | "green" | "amber";
}

const StatCard: React.FC<StatCardProps> = ({
  icon: Icon,
  title,
  value,
  color,
}) => {
  const colors = {
    blue: "bg-blue-50 text-blue-600",
    green: "bg-green-50 text-green-600",
    amber: "bg-amber-50 text-amber-600",
  };
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4 transition-all transform hover:-translate-y-1">
      <div
        className={`w-12 h-12 ${colors[color]} rounded-xl flex items-center justify-center`}
      >
        <Icon size={24} />
      </div>
      <div>
        <p className="text-gray-400 text-[10px] font-black uppercase">
          {title}
        </p>
        <h3 className="text-2xl font-black text-gray-800">{value}</h3>
      </div>
    </div>
  );
};

export default AdminWorkSchedule;
