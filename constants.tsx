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
    image: "https://picsum.photos/seed/hanoi1/800/600", 
    category: "Tiêu điểm",
    isFeatured: true
  },
  {
    id: 2,
    title: "Tổng kết công tác Y tế năm 2025: Hà Nội hoàn thành 100% chỉ tiêu chuyển đổi số",
    excerpt: "Tại hội nghị tổng kết năm 2025, ngành Y tế Thủ đô được đánh giá cao nhờ việc đồng bộ hóa dữ liệu sức khỏe toàn dân và triển khai bệnh án điện tử tại tất cả các tuyến...",
    date: "05/01/2026",
    image: "https://picsum.photos/seed/hanoi2/800/600",
    category: "Tiêu điểm"
  },
  {
    id: 3,
    title: "Cảnh báo gia tăng các bệnh đường hô hấp trong đợt rét đậm đầu năm 2026",
    excerpt: "CDC Hà Nội ghi nhận số ca mắc cúm A và viêm phổi tăng nhẹ tại các quận huyện ngoại thành do thời tiết chuyển lạnh sâu. Người dân cần chủ động giữ ấm và tiêm phòng...",
    date: "08/01/2026",
    image: "https://picsum.photos/seed/hanoi3/800/600",
    category: "Tiêu điểm"
  },
  {
    id: 4,
    title: "Bệnh viện Xanh Pôn phẫu thuật thành công ca ghép tạng thứ 100 trong năm 2025",
    excerpt: "Đánh dấu cột mốc quan trọng trong phát triển kỹ thuật cao, kíp mổ đã thực hiện thành công ca ghép thận từ người cho sống, bệnh nhân hồi phục tốt sau 1 tuần...",
    date: "28/12/2025",
    image: "https://picsum.photos/seed/hanoi4/800/600",
    category: "Tiêu điểm"
  },
  {
    id: 5,
    title: "Triển khai tiêm chủng mở rộng vắc xin 5 trong 1 đợt 1 năm 2026",
    excerpt: "Sở Y tế Hà Nội thông báo kế hoạch tiêm chủng mở rộng cho trẻ em dưới 1 tuổi, đảm bảo an toàn và hiệu quả...",
    date: "15/01/2026",
    image: "https://picsum.photos/seed/hanoi5/800/600",
    category: "Tiêu điểm"
  },
];

export const MOCK_VIDEOS = [
  {
    id: 'v1',
    title: 'Bản tin Y tế Hà Nội: Toàn cảnh công tác phòng chống dịch tuần 1 tháng 1/2026',
    duration: '05:30',
    thumbnail: 'https://picsum.photos/seed/video1/800/450',
    date: '07/01/2026'
  },
  {
    id: 'v2',
    title: 'Phóng sự: Những chiến sĩ áo trắng thầm lặng đêm Giao thừa Tết Bính Ngọ',
    duration: '08:45',
    thumbnail: 'https://picsum.photos/seed/video2/800/450',
    date: '10/01/2026'
  },
  {
    id: 'v3',
    title: 'Hướng dẫn người dân sử dụng ứng dụng Hồ sơ sức khỏe điện tử',
    duration: '03:15',
    thumbnail: 'https://picsum.photos/seed/video3/800/450',
    date: '02/01/2026'
  },
  {
    id: 'v4',
    title: 'Tọa đàm: Nâng cao chất lượng khám chữa bệnh tại y tế cơ sở',
    duration: '15:20',
    thumbnail: 'https://picsum.photos/seed/video4/800/450',
    date: '28/12/2025'
  },
  {
    id: 'v5',
    title: 'Chuyên mục Sức khỏe: Phòng chống bệnh tiểu đường',
    duration: '10:00',
    thumbnail: 'https://picsum.photos/seed/video5/800/450',
    date: '25/12/2025'
  }
];

export const MOCK_CULTURE = [
  {
    id: 'c1',
    title: 'Sôi nổi hội thi "Nét đẹp Văn hóa công sở ngành Y tế" chào xuân 2026',
    date: '12/01/2026',
    image: 'https://picsum.photos/seed/culture1/600/400'
  },
  {
    id: 'c2',
    title: 'Triển lãm ảnh "Thầy thuốc Hà Nội làm theo lời Bác" tại Phố đi bộ Hồ Gươm',
    date: '05/01/2026',
    image: 'https://picsum.photos/seed/culture2/600/400'
  },
  {
    id: 'c3',
    title: 'Chương trình nghệ thuật đặc biệt kỷ niệm ngày Thầy thuốc Việt Nam',
    date: '15/01/2026',
    image: 'https://picsum.photos/seed/culture3/600/400'
  }
];

export const MOCK_SPORTS = [
  {
    id: 's1',
    title: 'Giải bóng đá Cup Sức khỏe Thủ đô 2026: Bệnh viện Thanh Nhàn vô địch',
    date: '14/01/2026',
    image: 'https://picsum.photos/seed/sport1/600/400'
  },
  {
    id: 's2',
    title: 'Hội thao ngành Y tế: Hơn 2.000 vận động viên tham gia chạy việt dã',
    date: '08/01/2026',
    image: 'https://picsum.photos/seed/sport2/600/400'
  },
  {
    id: 's3',
    title: 'Phong trào rèn luyện sức khỏe "Mỗi người dân đi bộ 10.000 bước mỗi ngày"',
    date: '01/01/2026',
    image: 'https://picsum.photos/seed/sport3/600/400'
  }
];

export const MOCK_INTERNATIONAL = [
  {
    id: 'i1',
    title: 'WHO cảnh báo biến chủng cúm mới: Việt Nam chủ động giám sát ngay từ cửa khẩu',
    date: '13/01/2026',
    image: 'https://picsum.photos/seed/inter1/600/400'
  },
  {
    id: 'i2',
    title: 'Hợp tác y tế Việt - Nhật: Chuyển giao công nghệ phẫu thuật nội soi bằng Robot',
    date: '09/01/2026',
    image: 'https://picsum.photos/seed/inter2/600/400'
  },
  {
    id: 'i3',
    title: 'Các nước ASEAN thống nhất cơ chế "Hộ chiếu vắc xin" điện tử phiên bản 2.0',
    date: '28/12/2025',
    image: 'https://picsum.photos/seed/inter3/600/400'
  }
];