
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  FileText, 
  Plus, 
  Edit3, 
  Trash2, 
  Search, 
  Filter, 
  Clock,
  CheckCircle,
  FileEdit,
  Image as ImageIcon,
  Home,
  LogOut,
  Calendar
} from 'lucide-react';
import { db, auth } from '../firebase';
import { collection, getDocs, deleteDoc, doc, query, orderBy } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { signOut } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { SERVICE_CATEGORIES } from '../constants';
import PostForm from '../components/PostForm';

const AdminDashboard = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const q = query(collection(db, 'posts'), orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      const postList = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setPosts(postList);
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleDelete = async (postId: string) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa bài viết này không? Hành động này không thể hoàn tác.")) {
      try {
        await deleteDoc(doc(db, 'posts', postId));
        setPosts(posts.filter(p => p.id !== postId));
      } catch (error) {
        console.error("Error deleting post:", error);
        alert("Lỗi khi xóa bài viết. Kiểm tra quyền của bạn.");
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/login');
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const getCategoryTitle = (catId: string) => {
    return SERVICE_CATEGORIES.find(c => c.id === catId)?.title || catId;
  };

  const filteredPosts = posts.filter(post => 
    post.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-gray-50 min-h-screen font-sans pb-20">
      <div className="bg-white border-b border-gray-200 px-8 py-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 sticky top-0 z-50 shadow-sm">
        <div className="flex items-center gap-4">
          <Link to="/" className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500" title="Về trang chủ">
            <Home size={24} />
          </Link>
          <div>
            <h1 className="text-xl font-black text-gray-900 uppercase flex items-center gap-2">
              <LayoutDashboard className="text-primary-600" size={24} />
              QUẢN TRỊ NỘI DUNG
            </h1>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Sở Y tế Hà Nội</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <button 
            onClick={() => { setEditingPost(null); setIsFormOpen(true); }}
            className="bg-primary-600 hover:bg-primary-700 text-white px-5 py-2.5 rounded-lg font-bold flex items-center gap-2 shadow-md transition-all active:scale-95 text-sm"
          >
            <Plus size={18} /> VIẾT BÀI MỚI
          </button>
          <button 
            onClick={handleLogout}
            className="border border-gray-200 hover:bg-red-50 hover:text-red-600 hover:border-red-100 p-2.5 rounded-lg transition-all text-gray-500"
            title="Đăng xuất"
          >
            <LogOut size={18} />
          </button>
        </div>
      </div>

      <div className="container mx-auto px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
              <FileText size={24} />
            </div>
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Tổng bài viết</p>
              <p className="text-2xl font-black text-gray-900">{posts.length}</p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
            <div className="w-12 h-12 bg-green-50 text-green-600 rounded-xl flex items-center justify-center">
              <CheckCircle size={24} />
            </div>
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Đã đăng</p>
              <p className="text-2xl font-black text-gray-900">{posts.filter(p => p.status === 'published').length}</p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
            <div className="w-12 h-12 bg-yellow-50 text-yellow-600 rounded-xl flex items-center justify-center">
              <FileEdit size={24} />
            </div>
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Bản nháp</p>
              <p className="text-2xl font-black text-gray-900">{posts.filter(p => p.status === 'draft').length}</p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
            <div className="w-12 h-12 bg-primary-50 text-primary-600 rounded-xl flex items-center justify-center">
              <Clock size={24} />
            </div>
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Thời gian</p>
              <p className="text-sm font-bold text-gray-700">Trực tuyến</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 mb-6 flex flex-col md:flex-row gap-4 items-center">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-3 text-gray-400" size={20} />
            <input 
              type="text" 
              placeholder="Tìm kiếm bài viết..."
              className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-100 transition-all font-medium"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="flex items-center gap-2 bg-gray-50 border border-gray-100 px-6 py-3 rounded-xl font-bold text-gray-600 hover:bg-gray-100 transition-all">
            <Filter size={18} /> Bộ lọc
          </button>
        </div>

        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="px-6 py-4 text-xs font-black text-gray-400 uppercase tracking-widest">Nội dung</th>
                  <th className="px-6 py-4 text-xs font-black text-gray-400 uppercase tracking-widest">Danh mục</th>
                  <th className="px-6 py-4 text-xs font-black text-gray-400 uppercase tracking-widest">Trạng thái</th>
                  <th className="px-6 py-4 text-xs font-black text-gray-400 uppercase tracking-widest">Lịch trình</th>
                  <th className="px-6 py-4 text-xs font-black text-gray-400 uppercase tracking-widest text-right">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {loading ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-20 text-center">
                       <div className="flex flex-col items-center gap-4">
                          <div className="w-10 h-10 border-4 border-primary-600 border-t-transparent rounded-full animate-spin"></div>
                          <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">Đang tải dữ liệu...</p>
                       </div>
                    </td>
                  </tr>
                ) : filteredPosts.length > 0 ? (
                  filteredPosts.map((post) => (
                    <tr key={post.id} className="hover:bg-gray-50/50 transition-colors group">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-4">
                          <div className="w-16 h-12 rounded-lg bg-gray-100 overflow-hidden flex-shrink-0 border border-gray-200 shadow-sm">
                            {post.imageUrl ? (
                              <img src={post.imageUrl} className="w-full h-full object-cover" alt="" />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-gray-300">
                                <ImageIcon size={18} />
                              </div>
                            )}
                          </div>
                          <div className="flex flex-col">
                            <span className="font-bold text-gray-800 line-clamp-1 group-hover:text-primary-700 transition-colors">{post.title}</span>
                            <span className="text-[10px] text-gray-400 font-mono mt-1">ID: {post.id}</span>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-xs font-bold text-gray-500 bg-gray-100 px-3 py-1 rounded-full whitespace-nowrap">
                          {getCategoryTitle(post.category)}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        {post.status === 'published' ? (
                          <span className="flex items-center gap-1.5 text-green-600 font-black text-[10px] uppercase tracking-wider bg-green-50 px-3 py-1 rounded-full border border-green-100 whitespace-nowrap">
                            <CheckCircle size={12} /> Đã đăng
                          </span>
                        ) : (
                          <span className="flex items-center gap-1.5 text-gray-500 font-black text-[10px] uppercase tracking-wider bg-gray-100 px-3 py-1 rounded-full border border-gray-200 whitespace-nowrap">
                            <FileEdit size={12} /> Bản nháp
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-col gap-1.5">
                            <div className="flex items-center gap-2 text-[10px] text-gray-500 font-bold">
                               <Clock size={12} className="text-gray-400" />
                               <span>Tạo: {post.createdAt?.toDate ? post.createdAt.toDate().toLocaleDateString('vi-VN') : '---'}</span>
                            </div>
                            {post.expireAt && (
                                <div className="flex items-center gap-2 text-[10px] text-red-600 font-black">
                                   <Calendar size={12} className="text-red-400" />
                                   <span>HẾT HẠN: {post.expireAt?.toDate ? post.expireAt.toDate().toLocaleDateString('vi-VN') : new Date(post.expireAt).toLocaleDateString('vi-VN')}</span>
                                </div>
                            )}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button 
                            onClick={() => { setEditingPost(post); setIsFormOpen(true); }}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            title="Chỉnh sửa"
                          >
                            <Edit3 size={18} />
                          </button>
                          <button 
                            onClick={() => handleDelete(post.id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Xóa"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="px-6 py-20 text-center">
                       <div className="flex flex-col items-center gap-3">
                          <FileText size={48} className="text-gray-100" />
                          <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">Không tìm thấy bài viết nào</p>
                          <button 
                            onClick={() => { setEditingPost(null); setIsFormOpen(true); }}
                            className="text-primary-600 text-sm font-bold hover:underline"
                          >
                            Tạo bài viết đầu tiên ngay
                          </button>
                       </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {isFormOpen && (
        <PostForm 
          initialData={editingPost} 
          onClose={() => setIsFormOpen(false)} 
          onSave={() => { setIsFormOpen(false); fetchPosts(); }} 
        />
      )}
    </div>
  );
};

export default AdminDashboard;
