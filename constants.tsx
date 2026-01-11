import { 
  Newspaper, 
  AlertTriangle, 
  FileText, 
  ShieldPlus, 
  Stethoscope, 
  MessageCircleHeart, 
  FileHeart, 
  Building2, 
  Ambulance, 
  Laptop2, 
  HeartHandshake, 
  Award,
  Home,
  Info,
  Phone
} from 'lucide-react';
import { MenuItem, NewsItem } from './types';

// Define the 12 Service Grid Items with Modern Gradient Styles
export const SERVICE_CATEGORIES = [
  { 
    id: 'news-events', 
    title: 'Tin tức – Sự kiện y tế', 
    path: '/news/events', 
    icon: Newspaper, 
    // Modern gradient background
    containerClass: 'bg-gradient-to-br from-blue-50 via-blue-100 to-blue-50 border-blue-200 hover:shadow-blue-300',
    iconBoxClass: 'bg-blue-600 text-white shadow-blue-400/50',
    titleClass: 'text-blue-900'
  },
  { 
    id: 'alerts', 
    title: 'Cảnh báo y tế – Truyền thông nguy cơ', 
    path: '/news/alerts', 
    icon: AlertTriangle, 
    containerClass: 'bg-gradient-to-br from-orange-50 via-orange-100 to-orange-50 border-orange-200 hover:shadow-orange-300',
    iconBoxClass: 'bg-orange-500 text-white shadow-orange-400/50',
    titleClass: 'text-orange-900'
  },
  { 
    id: 'policy', 
    title: 'Chính sách y tế – Bảo hiểm y tế', 
    path: '/news/policy', 
    icon: FileText, 
    containerClass: 'bg-gradient-to-br from-indigo-50 via-indigo-100 to-indigo-50 border-indigo-200 hover:shadow-indigo-300',
    iconBoxClass: 'bg-indigo-600 text-white shadow-indigo-400/50',
    titleClass: 'text-indigo-900'
  },
  { 
    id: 'prevention', 
    title: 'Phòng bệnh – Nâng cao sức khỏe', 
    path: '/news/prevention', 
    icon: ShieldPlus, 
    containerClass: 'bg-gradient-to-br from-emerald-50 via-emerald-100 to-emerald-50 border-emerald-200 hover:shadow-emerald-300',
    iconBoxClass: 'bg-emerald-600 text-white shadow-emerald-400/50',
    titleClass: 'text-emerald-900'
  },
  { 
    id: 'exam', 
    title: 'Khám bệnh - chữa bệnh', 
    path: '/news/examination', 
    icon: Stethoscope, 
    containerClass: 'bg-gradient-to-br from-cyan-50 via-cyan-100 to-cyan-50 border-cyan-200 hover:shadow-cyan-300',
    iconBoxClass: 'bg-cyan-600 text-white shadow-cyan-400/50',
    titleClass: 'text-cyan-900'
  },
  { 
    id: 'consulting', 
    title: 'Tư vấn sức khỏe', 
    path: '/consulting', 
    icon: MessageCircleHeart, 
    containerClass: 'bg-gradient-to-br from-pink-50 via-pink-100 to-pink-50 border-pink-200 hover:shadow-pink-300',
    iconBoxClass: 'bg-pink-500 text-white shadow-pink-400/50',
    titleClass: 'text-pink-900'
  },
  { 
    id: 'records', 
    title: 'Hồ sơ sức khỏe toàn dân', 
    path: '/health-records', 
    icon: FileHeart, 
    containerClass: 'bg-gradient-to-br from-sky-50 via-sky-100 to-sky-50 border-sky-200 hover:shadow-sky-300',
    iconBoxClass: 'bg-sky-600 text-white shadow-sky-400/50',
    titleClass: 'text-sky-900'
  },
  { 
    id: 'system', 
    title: 'Hệ thống y tế Thủ đô', 
    path: '/hanoi-system', 
    icon: Building2, 
    containerClass: 'bg-gradient-to-br from-slate-50 via-slate-100 to-slate-50 border-slate-200 hover:shadow-slate-300',
    iconBoxClass: 'bg-slate-600 text-white shadow-slate-400/50',
    titleClass: 'text-slate-900'
  },
  { 
    id: 'emergency', 
    title: 'Trung tâm điều hành cấp cứu thông minh', 
    path: '/emergency', 
    icon: Ambulance, 
    containerClass: 'bg-gradient-to-br from-red-50 via-red-100 to-red-50 border-red-200 hover:shadow-red-300',
    iconBoxClass: 'bg-red-600 text-white shadow-red-400/50',
    titleClass: 'text-red-900'
  },
  { 
    id: 'digital', 
    title: 'Chuyển đổi số y tế', 
    path: '/digital', 
    icon: Laptop2, 
    containerClass: 'bg-gradient-to-br from-violet-50 via-violet-100 to-violet-50 border-violet-200 hover:shadow-violet-300',
    iconBoxClass: 'bg-violet-600 text-white shadow-violet-400/50',
    titleClass: 'text-violet-900'
  },
  { 
    id: 'social', 
    title: 'Bảo trợ xã hội', 
    path: '/news/social', 
    icon: HeartHandshake, 
    containerClass: 'bg-gradient-to-br from-teal-50 via-teal-100 to-teal-50 border-teal-200 hover:shadow-teal-300',
    iconBoxClass: 'bg-teal-600 text-white shadow-teal-400/50',
    titleClass: 'text-teal-900'
  },
  { 
    id: 'good-deeds', 
    title: 'Gương người tốt – việc tốt ngành Y', 
    path: '/news/good-deeds', 
    icon: Award, 
    containerClass: 'bg-gradient-to-br from-yellow-50 via-yellow-100 to-yellow-50 border-yellow-200 hover:shadow-yellow-300',
    iconBoxClass: 'bg-yellow-500 text-white shadow-yellow-400/50',
    titleClass: 'text-yellow-900'
  },
];

// Navigation Menu Structure (Kept for Header)
export const MAIN_MENU: MenuItem[] = [
  { 
    id: 'home', 
    title: 'Trang chủ', 
    path: '/', 
    icon: Home 
  },
  { 
    id: 'news', 
    title: 'Tin tức', 
    path: '/news/events', 
    icon: Newspaper,
    children: [
      { id: 'news-events', title: 'Tin tức – Sự kiện y tế', path: '/news/events', icon: Newspaper },
      { id: 'alerts', title: 'Cảnh báo y tế – Truyền thông nguy cơ', path: '/news/alerts', icon: AlertTriangle },
      { id: 'good-deeds', title: 'Gương người tốt – việc tốt', path: '/news/good-deeds', icon: Award },
    ]
  },
  { 
    id: 'prevention', 
    title: 'Phòng bệnh', 
    path: '/news/prevention', 
    icon: ShieldPlus 
  },
  { 
    id: 'exam', 
    title: 'Khám chữa bệnh', 
    path: '/news/examination', 
    icon: Stethoscope,
    children: [
      { id: 'exam-general', title: 'Thông tin Khám chữa bệnh', path: '/news/examination', icon: Stethoscope },
      { id: 'consulting', title: 'Tư vấn sức khỏe', path: '/consulting', icon: MessageCircleHeart },
      { id: 'records', title: 'Hồ sơ sức khỏe toàn dân', path: '/health-records', icon: FileHeart, isDashboard: true },
    ]
  },
  { 
    id: 'policy', 
    title: 'Chính sách – BHYT', 
    path: '/news/policy', 
    icon: FileText 
  },
  { 
    id: 'system', 
    title: 'Hệ thống y tế', 
    path: '/hanoi-system', 
    icon: Building2,
    children: [
      { id: 'system-network', title: 'Mạng lưới cơ sở y tế', path: '/hanoi-system', icon: Building2 },
      { id: 'emergency', title: 'Trung tâm cấp cứu thông minh', path: '/emergency', icon: Ambulance },
    ]
  },
  { 
    id: 'digital', 
    title: 'Chuyển đổi số', 
    path: '/digital', 
    icon: Laptop2 
  },
  { 
    id: 'social', 
    title: 'An sinh xã hội', 
    path: '/news/social', 
    icon: HeartHandshake 
  },
  { 
    id: 'about', 
    title: 'Giới thiệu / Liên hệ', 
    path: '/about', 
    icon: Info,
    children: [
      { id: 'intro', title: 'Giới thiệu chung', path: '/intro', icon: Info },
      { id: 'contact', title: 'Liên hệ công tác', path: '/contact', icon: Phone },
    ]
  },
];

export const MOCK_NEWS: NewsItem[] = [
  {
    id: 1,
    title: "Sở Y tế Hà Nội: Triển khai kế hoạch đảm bảo y tế phục vụ Tết Nguyên đán 2026",
    excerpt: "Giám đốc Sở Y tế yêu cầu các cơ sở khám chữa bệnh trực 24/24, chuẩn bị đầy đủ cơ số thuốc và phương án cấp cứu ngoại viện để phục vụ nhân dân đón Tết Bính Ngọ 2026...",
    date: "10/01/2026",
    image: "https://images.unsplash.com/photo-1584362917165-526a968579e8?q=80&w=1000&auto=format&fit=crop", 
    category: "Chỉ đạo điều hành",
    isFeatured: true
  },
  {
    id: 2,
    title: "Tổng kết công tác Y tế năm 2025: Hà Nội hoàn thành 100% chỉ tiêu chuyển đổi số",
    excerpt: "Tại hội nghị tổng kết năm 2025, ngành Y tế Thủ đô được đánh giá cao nhờ việc đồng bộ hóa dữ liệu sức khỏe toàn dân và triển khai bệnh án điện tử tại tất cả các tuyến...",
    date: "05/01/2026",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=1000&auto=format&fit=crop",
    category: "Tin tức - Sự kiện"
  },
  {
    id: 3,
    title: "Cảnh báo gia tăng các bệnh đường hô hấp trong đợt rét đậm đầu năm 2026",
    excerpt: "CDC Hà Nội ghi nhận số ca mắc cúm A và viêm phổi tăng nhẹ tại các quận huyện ngoại thành do thời tiết chuyển lạnh sâu. Người dân cần chủ động giữ ấm và tiêm phòng...",
    date: "08/01/2026",
    image: "https://images.unsplash.com/photo-1632053003050-2f928a38d601?q=80&w=1000&auto=format&fit=crop",
    category: "Y tế dự phòng"
  },
  {
    id: 4,
    title: "Bệnh viện Xanh Pôn phẫu thuật thành công ca ghép tạng thứ 100 trong năm 2025",
    excerpt: "Đánh dấu cột mốc quan trọng trong phát triển kỹ thuật cao, kíp mổ đã thực hiện thành công ca ghép thận từ người cho sống, bệnh nhân hồi phục tốt sau 1 tuần...",
    date: "28/12/2025",
    image: "https://images.unsplash.com/photo-1551884170-09fb70a3a2ed?q=80&w=1000&auto=format&fit=crop",
    category: "Y tế chuyên sâu"
  },
  {
    id: 5,
    title: "Tăng cường kiểm tra An toàn thực phẩm tại các lễ hội Xuân 2026",
    excerpt: "Thành lập 05 đoàn kiểm tra liên ngành nhằm giám sát chặt chẽ các cơ sở kinh doanh thực phẩm quanh khu vực diễn ra lễ hội, kiên quyết xử lý vi phạm...",
    date: "12/01/2026",
    image: "https://images.unsplash.com/photo-1606787366850-de6330128bfc?q=80&w=1000&auto=format&fit=crop",
    category: "An toàn thực phẩm"
  },
  {
    id: 6,
    title: "Hà Nội khánh thành thêm 03 trạm y tế phường đạt chuẩn Quốc gia giai đoạn mới",
    excerpt: "Các trạm y tế mới tại quận Hoàng Mai và Long Biên được trang bị máy siêu âm, X-quang kỹ thuật số, nâng cao năng lực khám chữa bệnh ban đầu...",
    date: "30/12/2025",
    image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=1000&auto=format&fit=crop",
    category: "Y tế cơ sở"
  },
  {
    id: 7,
    title: "Cảnh báo ngộ độc rượu dịp cuối năm: Người dân cần thận trọng",
    excerpt: "Khoa Chống độc các bệnh viện tiếp nhận nhiều ca ngộ độc Methanol trong tuần qua. Sở Y tế khuyến cáo người dân không sử dụng rượu không rõ nguồn gốc...",
    date: "25/12/2025",
    image: "https://images.unsplash.com/photo-1623674667230-22c608f5d023?q=80&w=1000&auto=format&fit=crop",
    category: "Cảnh báo y tế"
  },
  {
    id: 8,
    title: "Chương trình 'Tết sum vầy - Xuân chia sẻ': Tặng quà bệnh nhân nghèo",
    excerpt: "Công đoàn ngành Y tế Hà Nội tổ chức trao tặng 500 suất quà cho bệnh nhân có hoàn cảnh khó khăn đang điều trị tại các bệnh viện tuyến thành phố...",
    date: "14/01/2026",
    image: "https://images.unsplash.com/photo-1666214280557-f1b5022eb634?q=80&w=1000&auto=format&fit=crop",
    category: "Gương người tốt"
  },
  {
    id: 9,
    title: "Hướng dẫn chăm sóc sức khỏe người cao tuổi trong những ngày Tết",
    excerpt: "Chế độ dinh dưỡng hợp lý, kiểm soát huyết áp và đường huyết là những lưu ý quan trọng để người cao tuổi vui xuân đón Tết an toàn, khỏe mạnh...",
    date: "11/01/2026",
    image: "https://images.unsplash.com/photo-1504386106331-3e4e71712b38?q=80&w=1000&auto=format&fit=crop",
    category: "Truyền thông GDSK"
  },
  {
    id: 10,
    title: "Kết quả chiến dịch tiêm vắc xin sởi - rubella bổ sung đợt cuối năm 2025",
    excerpt: "Hơn 98% trẻ em trong độ tuổi rà soát đã được tiêm chủng đầy đủ, tạo miễn dịch cộng đồng vững chắc trước nguy cơ dịch bệnh mùa Đông Xuân...",
    date: "20/12/2025",
    image: "https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?q=80&w=1000&auto=format&fit=crop",
    category: "Y tế dự phòng"
  },
  {
    id: 11,
    title: "Hệ thống cấp cứu 115 Hà Nội: Nâng cấp tổng đài thông minh, định vị chính xác",
    excerpt: "Từ tháng 1/2026, Trung tâm 115 chính thức vận hành hệ thống điều phối xe cứu thương dựa trên AI, giúp rút ngắn thời gian tiếp cận hiện trường...",
    date: "02/01/2026",
    image: "https://images.unsplash.com/photo-1587351021759-3e566b92f1f3?q=80&w=1000&auto=format&fit=crop",
    category: "Cải cách hành chính"
  },
  {
    id: 12,
    title: "Thông báo tuyển dụng viên chức ngành Y tế Hà Nội đợt 1 năm 2026",
    excerpt: "Sở Y tế Hà Nội thông báo nhu cầu tuyển dụng 350 chỉ tiêu bác sĩ, điều dưỡng cho các bệnh viện mới thành lập và mở rộng quy mô...",
    date: "15/01/2026",
    image: "https://images.unsplash.com/photo-1581056771107-24ca5f033842?q=80&w=1000&auto=format&fit=crop",
    category: "Thông báo"
  }
];