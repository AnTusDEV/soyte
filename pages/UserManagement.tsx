import React, { useEffect, useState, useMemo } from 'react';
import { api } from '../api';
import AdminLayout from '../components/AdminLayout';
import { Loader2, Search, Users, UserCheck, Shield, Edit3, Trash2 } from 'lucide-react';

interface User {
    id: string;
    full_name: string;
    email: string;
    role: 'admin' | 'user';
    status: 'active' | 'inactive';
}

const UserManagement: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                setLoading(true);
                const response = await api.get('/users'); 
                setUsers(response.data || response);
                setError(null);
            } catch (err) {
                setError('Failed to fetch users. Please try again later.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    const handleDeactivate = async (userId: string) => {
        if (window.confirm('Are you sure you want to deactivate this user?')) {
            try {
                await api.put(`/auth/users/${userId}`, { status: 'inactive' });
                setUsers(users?.map(u => u.id === userId ? { ...u, status: 'inactive' } : u));
            } catch (err) {
                alert('Failed to deactivate user.');
                console.error(err);
            }
        }
    };
    
    const filteredUsers = useMemo(() =>
        users.filter(user =>
            user.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email.toLowerCase().includes(searchTerm.toLowerCase())
        ), [users, searchTerm]);

    const stats = useMemo(() => ({
        total: users.length,
        active: users.filter(u => u.status === 'active').length,
        admins: users.filter(u => u.role === 'admin').length,
    }), [users]);

    return (
        <AdminLayout title="Quản lý Người dùng">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-8">
                <StatCard icon={Users} title="Tổng số người dùng" value={stats.total} color="blue" />
                <StatCard icon={UserCheck} title="Đang hoạt động" value={stats.active} color="green" />
                <StatCard icon={Shield} title="Quản trị viên" value={stats.admins} color="amber" />
            </div>

            <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
                <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                    <div className="relative w-full md:w-96">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input
                            type="text"
                            placeholder="Tìm kiếm theo tên hoặc email..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-primary-100 font-medium text-sm"
                        />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="bg-gray-50 text-left text-[11px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-100">
                                <th className="px-6 py-4">Tên người dùng</th>
                                <th className="px-6 py-4">Vai trò</th>
                                <th className="px-6 py-4">Trạng thái</th>
                                <th className="px-6 py-4 text-center">Thao tác</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {loading ? (
                                <tr>
                                    <td colSpan={4} className="px-6 py-20 text-center">
                                        <Loader2 size={40} className="animate-spin text-primary-600 mx-auto mb-4" />
                                        <p className="text-gray-400 font-bold uppercase text-[10px]">Đang tải dữ liệu người dùng...</p>
                                    </td>
                                </tr>
                            ) : (
                                filteredUsers.map((user) => (
                                    <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="font-bold text-gray-800 text-sm">{user.full_name}</div>
                                            <div className="text-xs text-gray-500">{user.email}</div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`text-[10px] font-black uppercase px-2 py-1 rounded border ${
                                                user.role === 'admin' ? 'bg-amber-50 text-amber-700 border-amber-100' : 'bg-gray-50 text-gray-600 border-gray-100'
                                            }`}>
                                                {user.role}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-black uppercase ${
                                                user.status === 1 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                                            }`}>
                                                <div className={`w-1.5 h-1.5 rounded-full ${user.status === 1 ? 'bg-green-500' : 'bg-red-500'}`}></div>
                                                {user.status === 1 ? 'Hoạt động' : 'Vô hiệu hóa'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center justify-center gap-2">
                                                <button className="p-2 text-primary-600 hover:bg-primary-50 rounded-lg transition shadow-sm bg-white border border-gray-100">
                                                    <Edit3 size={18} />
                                                </button>
                                                <button
                                                    onClick={() => handleDeactivate(user.id)}
                                                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition shadow-sm bg-white border border-gray-100"
                                                    disabled={user.status === 1}
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
                    {!loading && filteredUsers.length === 0 && (
                        <div className="py-20 text-center">
                            <div className="bg-gray-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-300">
                                <Users size={32} />
                            </div>
                            <p className="text-gray-400 font-bold">
                                {searchTerm ? 'Không tìm thấy người dùng nào phù hợp.' : 'Không có người dùng nào trong hệ thống.'}
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </AdminLayout>
    );
};

interface StatCardProps {
    icon: React.ElementType;
    title: string;
    value: number | string;
    color: 'blue' | 'green' | 'amber';
}

const StatCard: React.FC<StatCardProps> = ({ icon: Icon, title, value, color }) => {
    const colors = {
        blue: 'bg-blue-50 text-blue-600',
        green: 'bg-green-50 text-green-600',
        amber: 'bg-amber-50 text-amber-600',
    };
    return (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
            <div className={`w-12 h-12 ${colors[color]} rounded-xl flex items-center justify-center`}>
                <Icon size={24} />
            </div>
            <div>
                <p className="text-gray-400 text-[10px] font-black uppercase">{title}</p>
                <h3 className="text-2xl font-black text-gray-800">{value}</h3>
            </div>
        </div>
    );
};

export default UserManagement;
