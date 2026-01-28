import React, { useState, useEffect, useRef } from "react";
import {
  X,
  Send,
  Save,
  Image as ImageIcon,
  Link as LinkIcon,
  Upload,
  Clock,
  Loader2,
} from "lucide-react";
import { SERVICE_CATEGORIES_FILTER } from "../constants";
import { api } from "../api";
import { Dropdown } from "@/components/prime";
interface PostFormProps {
  initialData?: any;
  onClose: () => void;
  onSave: () => void;
}
type Status = "draft" | "published";

const statusOptions: { label: string; value: Status }[] = [
  { label: "Bản nháp (Draft)", value: "draft" },
  { label: "Công khai (Published)", value: "published" },
];
const PostForm: React.FC<PostFormProps> = ({
  initialData,
  onClose,
  onSave,
}) => {
  const [formData, setFormData] = useState({
    title: "",
    summary: "",
    content: "",
    category: "",
    status: "draft",
    imageUrl: "",
  });
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [errors, setErrors] = useState<any>({});
  const fileInputRef = useRef<HTMLInputElement>(null);

  const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || "",
        summary: initialData.summary || "",
        content: initialData.content || "",
        category: initialData.category || initialData.category_id || "",
        status: initialData.status || "draft",
        imageUrl: initialData.imageUrl || initialData.image_url || "",
      });
    }
  }, [initialData]);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > MAX_FILE_SIZE) {
      alert("Dung lượng ảnh quá lớn! Vui lòng chọn ảnh dưới 2MB.");
      return;
    }

    setUploading(true);
    setUploadProgress(20);

    try {
      const data = await api.upload(file);
      setUploadProgress(100);
      setFormData((prev) => ({ ...prev, imageUrl: data.url }));
      setUploading(false);
    } catch (err: any) {
      console.error("Upload error:", err);
      alert("Lỗi tải ảnh: " + err.message);
      setUploading(false);
    }
  };

  const validate = () => {
    const newErrors: any = {};
    if (!formData.title.trim()) newErrors.title = "Tiêu đề không được để trống";
    if (!formData.category) newErrors.category = "Vui lòng chọn danh mục";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    if (uploading) return;

    setLoading(true);
    try {
      const postData: any = {
        title: formData.title.trim(),
        summary: formData.summary.trim(),
        content: formData.content.trim(),
        category_id: formData.category, // map to snake_case for API
        status: formData.status,
        image_url: formData.imageUrl, // map to snake_case for API
      };

      if (initialData?.id) {
        await api.put(`/posts/${initialData.id}`, postData);
      } else {
        await api.post("/posts", postData);
      }
      onSave();
    } catch (error: any) {
      console.error("Error saving post:", error);
      alert(`Lỗi lưu bài viết: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const categoryOptions = SERVICE_CATEGORIES_FILTER.map((cat) => ({
    label: cat.title,
    value: cat.id,
  }));

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white w-full max-w-5xl rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 flex flex-col max-h-[95vh]">
        <div className="bg-primary-700 p-4 flex justify-between items-center text-white shrink-0">
          <h3 className="font-bold flex items-center gap-2">
            {initialData ? <Save size={20} /> : <Send size={20} />}
            {initialData ? "CHỈNH SỬA BÀI VIẾT" : "SOẠN THẢO BÀI VIẾT MỚI"}
          </h3>
          <button
            onClick={onClose}
            className="hover:bg-white/20 p-1 rounded-full"
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex flex-col lg:flex-row overflow-hidden flex-grow">
          <form
            onSubmit={handleSubmit}
            id="post-form"
            className="flex-grow p-6 space-y-4 overflow-y-auto no-scrollbar"
          >
            <div className="bg-blue-50 border border-blue-100 p-3 rounded-lg mb-4">
              <p className="text-[11px] text-blue-700 font-bold flex items-center gap-2">
                <Clock size={14} /> LƯU Ý: Bài viết cần tuân thủ quy định về
                phát ngôn và bảo mật thông tin ngành y tế.
              </p>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase mb-1">
                Tiêu đề bài viết <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                placeholder="Nhập tiêu đề bài viết..."
                className={`w-full p-3 bg-gray-50 border ${errors.title ? "border-red-500" : "border-gray-200"} rounded-lg focus:ring-2 focus:ring-primary-100 outline-none font-bold text-gray-800`}
              />
              {errors.title && (
                <p className="text-red-500 text-[10px] mt-1 font-bold">
                  {errors.title}
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">
                  Danh mục <span className="text-red-500">*</span>
                </label>
                <Dropdown
                  value={formData.category}
                  options={categoryOptions}
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.value })
                  }
                  placeholder="-Chọn danh mục-"
                  className={`w-full ${errors.category ? "p-invalid" : ""}`}
                  panelClassName="text-sm"
                  showClear
                />
                {errors.category && (
                  <p className="text-red-500 text-[10px] mt-1 font-bold">
                    {errors.category}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">
                  Trạng thái xuất bản
                </label>
                <Dropdown
                  value={formData.status}
                  options={statusOptions}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      status: e.value as Status,
                    })
                  }
                  className="w-full" 
                  placeholder="Chọn trạng thái"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase mb-1">
                Ảnh đại diện bài viết
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                    <LinkIcon size={16} />
                  </div>
                  <input
                    type="text"
                    value={formData.imageUrl}
                    onChange={(e) =>
                      setFormData({ ...formData, imageUrl: e.target.value })
                    }
                    placeholder="Link ảnh..."
                    className="w-full pl-10 pr-3 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-100 outline-none text-xs"
                  />
                </div>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={uploading}
                    className="flex-1 bg-white border-2 border-primary-600 text-primary-600 px-4 py-3 rounded-lg font-bold text-xs flex items-center justify-center gap-2 hover:bg-primary-50 transition-all disabled:opacity-50"
                  >
                    {uploading ? (
                      <Loader2 size={16} className="animate-spin" />
                    ) : (
                      <Upload size={16} />
                    )}
                    TẢI ẢNH LÊN
                  </button>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileUpload}
                    className="hidden"
                    accept="image/*"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase mb-1">
                Nội dung tóm tắt
              </label>
              <textarea
                rows={2}
                value={formData.summary}
                onChange={(e) =>
                  setFormData({ ...formData, summary: e.target.value })
                }
                placeholder="Nhập tóm tắt ngắn gọn..."
                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg outline-none text-sm leading-relaxed"
              ></textarea>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase mb-1">
                Nội dung chi tiết
              </label>
              <textarea
                rows={10}
                value={formData.content}
                onChange={(e) =>
                  setFormData({ ...formData, content: e.target.value })
                }
                placeholder="Nội dung bài viết đầy đủ..."
                className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl outline-none text-sm font-medium leading-relaxed min-h-[300px]"
              ></textarea>
            </div>
          </form>

          <div className="w-full lg:w-80 bg-gray-50 border-l border-gray-100 p-6 shrink-0 flex flex-col items-center">
            <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-6 w-full text-center">
              Xem trước tin bài
            </h4>

            <div className="w-full bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden group">
              <div className="relative aspect-[16/10] bg-gray-100 overflow-hidden">
                {formData.imageUrl ? (
                  <img
                    src={formData.imageUrl}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center text-gray-300">
                    <ImageIcon size={48} strokeWidth={1} />
                  </div>
                )}
              </div>
              <div className="p-4">
                <h5 className="font-bold text-gray-800 text-sm leading-tight mb-2 line-clamp-2">
                  {formData.title || "Tiêu đề..."}
                </h5>
                <p className="text-[11px] text-gray-500 line-clamp-2">
                  {formData.summary || "Tóm tắt..."}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="p-4 border-t border-gray-100 flex gap-3 bg-gray-50 shrink-0">
          <button
            type="submit"
            form="post-form"
            disabled={loading || uploading}
            className="flex-1 bg-primary-600 hover:bg-primary-700 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-xl shadow-primary-100"
          >
            {loading ? (
              <Loader2 className="animate-spin" size={20} />
            ) : initialData ? (
              <Save size={20} />
            ) : (
              <Send size={20} />
            )}
            {initialData ? "CẬP NHẬT" : "XUẤT BẢN"}
          </button>
          <button
            type="button"
            onClick={onClose}
            className="px-8 bg-white border border-gray-200 hover:bg-gray-100 text-gray-600 font-bold py-4 rounded-xl transition-all"
          >
            QUAY LẠI
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostForm;
