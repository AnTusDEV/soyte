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
  Users,
  Utensils,
  Syringe,
  CalendarDays,
  Search,
} from "lucide-react";
import { MenuItem, NewsItem } from "./types";

// Define the 12 Service Grid Items
export const SERVICE_CATEGORIES = [
  {
    id: 1,
    title: "Tin tức – Sự kiện y tế",
    path: "/news/events",
    icon: Newspaper,
    containerClass:
      "bg-gradient-to-br from-blue-50 via-blue-100 to-blue-50 border-blue-200 hover:shadow-blue-300",
    iconBoxClass: "bg-blue-600 text-white shadow-blue-400/50",
    titleClass: "text-blue-900",
  },
  {
    id: 2,
    title: "Cảnh báo y tế – Truyền thông nguy cơ",
    path: "/news/alerts",
    icon: AlertTriangle,
    containerClass:
      "bg-gradient-to-br from-orange-50 via-orange-100 to-orange-50 border-orange-200 hover:shadow-orange-300",
    iconBoxClass: "bg-orange-500 text-white shadow-orange-400/50",
    titleClass: "text-orange-900",
  },
  {
    id: 3,
    title: "Chính sách y tế – Bảo hiểm y tế",
    path: "/news/policy",
    icon: FileText,
    containerClass:
      "bg-gradient-to-br from-indigo-50 via-indigo-100 to-indigo-50 border-indigo-200 hover:shadow-indigo-300",
    iconBoxClass: "bg-indigo-600 text-white shadow-indigo-400/50",
    titleClass: "text-indigo-900",
  },
  {
    id: 4,
    title: "Phòng bệnh – Nâng cao sức khỏe",
    path: "/news/prevention",
    icon: ShieldPlus,
    containerClass:
      "bg-gradient-to-br from-emerald-50 via-emerald-100 to-emerald-50 border-emerald-200 hover:shadow-emerald-300",
    iconBoxClass: "bg-emerald-600 text-white shadow-emerald-400/50",
    titleClass: "text-emerald-900",
  },
  {
    id: 5,
    title: "Khám bệnh - chữa bệnh",
    path: "/news/examination",
    icon: Stethoscope,
    containerClass:
      "bg-gradient-to-br from-cyan-50 via-cyan-100 to-cyan-50 border-cyan-200 hover:shadow-cyan-300",
    iconBoxClass: "bg-cyan-600 text-white shadow-cyan-400/50",
    titleClass: "text-cyan-900",
  },
  {
    id: 6,
    title: "Tư vấn sức khỏe",
    path: "/consulting",
    icon: MessageCircleHeart,
    containerClass:
      "bg-gradient-to-br from-pink-50 via-pink-100 to-pink-50 border-pink-200 hover:shadow-pink-300",
    iconBoxClass: "bg-pink-500 text-white shadow-pink-400/50",
    titleClass: "text-pink-900",
  },
  {
    id: 7,
    title: "Hồ sơ sức khỏe toàn dân",
    path: "/health-records",
    icon: FileHeart,
    containerClass:
      "bg-gradient-to-br from-sky-50 via-sky-100 to-sky-50 border-sky-200 hover:shadow-sky-300",
    iconBoxClass: "bg-sky-600 text-white shadow-sky-400/50",
    titleClass: "text-sky-900",
  },
  {
    id: 8,
    title: "Hệ thống y tế Thủ đô",
    path: "/hanoi-system",
    icon: Building2,
    containerClass:
      "bg-gradient-to-br from-slate-50 via-slate-100 to-slate-50 border-slate-200 hover:shadow-slate-300",
    iconBoxClass: "bg-slate-600 text-white shadow-slate-400/50",
    titleClass: "text-slate-900",
  },
  {
    id: 9,
    title: "Trung tâm điều hành cấp cứu thông minh",
    path: "/emergency",
    icon: Ambulance,
    containerClass:
      "bg-gradient-to-br from-red-50 via-red-100 to-red-50 border-red-200 hover:shadow-red-300",
    iconBoxClass: "bg-red-600 text-white shadow-red-400/50",
    titleClass: "text-red-900",
  },
  {
    id: 10,
    title: "Tra cứu dữ liệu",
    path: "/data-lookup",
    icon: Search,
    containerClass:
      "bg-gradient-to-br from-violet-50 via-violet-100 to-violet-50 border-violet-200 hover:shadow-violet-300",
    iconBoxClass: "bg-violet-600 text-white shadow-violet-400/50",
    titleClass: "text-violet-900",
  },
  {
    id: 11,
    title: "Bảo trợ xã hội",
    path: "/news/social",
    icon: HeartHandshake,
    containerClass:
      "bg-gradient-to-br from-teal-50 via-teal-100 to-teal-50 border-teal-200 hover:shadow-teal-300",
    iconBoxClass: "bg-teal-600 text-white shadow-teal-400/50",
    titleClass: "text-teal-900",
  },
  {
    id: 12,
    title: "Gương người tốt – việc tốt ngành Y",
    path: "/news/good-deeds",
    icon: Award,
    containerClass:
      "bg-gradient-to-br from-yellow-50 via-yellow-100 to-yellow-50 border-yellow-200 hover:shadow-yellow-300",
    iconBoxClass: "bg-yellow-500 text-white shadow-yellow-400/50",
    titleClass: "text-yellow-900",
  },
];

export const MAIN_MENU: MenuItem[] = [
  { id: "home", title: "Trang chủ", path: "/", icon: Home },
  {
    id: "news",
    title: "Tin tức",
    path: "/news/events",
    icon: Newspaper,
    children: [
      {
        id: "news-events",
        title: "Tin tức – Sự kiện y tế",
        path: "/news/events",
        icon: Newspaper,
      },
      {
        id: "alerts",
        title: "Cảnh báo y tế - Truyền thông nguy cơ",
        path: "/news/alerts",
        icon: AlertTriangle,
      },
      {
        id: "good-deeds",
        title: "Gương người tốt – việc tốt",
        path: "/news/good-deeds",
        icon: Award,
      },
    ],
  },
  {
    id: "medical-pro",
    title: "Khám chữa bệnh",
    path: "/news/examination",
    icon: Stethoscope,
    children: [
      {
        id: "exam-general",
        title: "Thông tin khám chữa bệnh",
        path: "/news/examination",
        icon: Stethoscope,
      },
      {
        id: "food-safety",
        title: "Tư vấn sức khỏe",
        path: "/consulting",
        icon: Utensils,
      },
      {
        id: "population",
        title: "Hồ sơ sức khỏe toàn dân",
        path: "/health-records",
        icon: Users,
      },
    ],
  },
  { id: "policy", title: "Chính sách - BHYT", path: "/policy", icon: Info },
  {
    id: "system",
    title: "Hệ thống y tế",
    path: "/hanoi-system",
    icon: Building2,
    children: [
      {
        id: "system-network",
        title: "Mạng lưới cơ sở y tế",
        path: "/hanoi-system",
        icon: Building2,
      },
      {
        id: "emergency",
        title: "Trung tâm cấp cứu thông minh",
        path: "/emergency",
        icon: Ambulance,
      },
    ],
  },
  {
    id: "digital",
    title: "Chuyển đổi số",
    path: "/data-lookup",
    icon: Laptop2,
  },
  {
    id: "social-security",
    title: "An sinh xã hội",
    path: "/social-security",
    icon: Info,
  },
  {
    id: "guide",
    title: "Giới thiệu/Liên hệ",
    path: "/schedule",
    icon: HeartHandshake,
    children: [
      {
        id: "work-schedule",
        title: "Lịch công tác",
        path: "/schedule",
        icon: CalendarDays,
      },
      {
        id: "guide-exam",
        title: "Quy trình khám bệnh",
        path: "/guide/exam",
        icon: FileText,
      },
      {
        id: "guide-insurance",
        title: "Bảo hiểm y tế",
        path: "/news/policy",
        icon: ShieldPlus,
      },
      {
        id: "guide-vaccine",
        title: "Lịch tiêm chủng",
        path: "/guide/vaccine",
        icon: Syringe,
      },
    ],
  },
];

export const MOCK_NEWS: NewsItem[] = [
  {
    id: 1,
    title:
      "Người dân cùng chung tay bảo vệ môi trường, nâng cao sức khỏe cộng đồng",
    excerpt:
      "Trong bối cảnh ô nhiễm môi trường, đặc biệt là ô nhiễm không khí, đang trở thành thách thức lớn đối với các đô thị lớn, việc xây dựng và triển khai các chính sách kiểm soát phát thải được xem là yêu cầu cấp thiết nhằm bảo vệ sức khỏe nhân dân, hướng tới xây dựng môi trường xanh - sạch và phát triển bền vững.",
    date: "17/01/2026",
    image:
      "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=600&auto=format&fit=crop",
    category: "prevention",
    isFeatured: true,
  },
  {
    id: 2,
    title: "Không chủ quan với đau thần kinh tọa",
    excerpt:
      "Đau thần kinh tọa là bệnh hay gặp trên lâm sàng, do nhiều nguyên nhân gây nên. Trong đó khoảng 80% các trường hợp đau thần kinh tọa do thoát vị đĩa đệm cột sống thắt lưng.",
    date: "16/01/2026",
    image:
      "https://sqhx-hanoi.mediacdn.vn/zoom/270x170/91579363132710912/2026/1/16/bvtn14126-1768528454303669785729-39-0-1319-2048-crop-1768528545039428563904.jpg",
    category: "examination",
  },
  {
    id: 3,
    title: "Nhổ răng khôn không đau, giải pháp an toàn, hiệu quả",
    excerpt:
      "Răng khôn hay còn gọi là răng số 8, thường mọc trong độ tuổi từ 18 đến 26 tuổi, giai đoạn con người đã hoàn thiện hệ răng vĩnh viễn. Khác với các răng khác, răng khôn hầu như không tham gia chức năng ăn nhai. Do mọc muộn, không còn đủ chỗ trên cung hàm nên răng khôn rất dễ mọc lệch, mọc ngầm hoặc chỉ mọc được một phần, gây ra nhiều phiền toái và biến chứng cho người bệnh.",
    date: "16/01/2026",
    image:
      "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?q=80&w=600&auto=format&fit=crop",
    category: "examination",
  },
  {
    id: 4,
    title: "Thông tin y tế trên báo chí ngày 16-1-2026",
    excerpt:
      "Ngành Y tế Hà Nội công bố danh sách số điện thoại dịch vụ cấp cứu 115 bố trí tại các điểm trong toàn thành phố, nhằm giúp người dân truy cập dễ dàng và gọi ngay đến đơn vị cấp cứu gần nhất khi có tình huống khẩn cấp về y tế.",
    date: "16/01/2026",
    image:
      "https://sqhx-hanoi.mediacdn.vn/zoom/260x194/91579363132710912/2026/1/15/diem-bao-1768455137077492999991-0-0-312-499-crop-1768455140148839888871.jpg",
    category: "news-events",
  },
  {
    id: 5,
    title: "Thông tin y tế trên báo chí ngày 15-1-2026",
    excerpt:
      "Ngày 14/1, tại Trạm Y tế phường Vĩnh Hưng, Hà Nội gần 400 người dân đến từ sớm để chờ được thăm khám sức khỏe. Khác với những buổi khám định kỳ quen thuộc, lần này họ được trực tiếp các giáo sư, bác sĩ của Bệnh viện Đại học Y Hà Nội khám, tư vấn ngay tại trạm y tế phường.",
    date: "15/01/2026",
    image:
      "https://images.unsplash.com/photo-1583088580009-2d947c3e90a6?q=80&w=600&auto=format&fit=crop",
    category: "news-events",
  },
  {
    id: 6,
    title:
      "Bệnh viện Nam Thăng Long chính thức tiếp nhận cơ sở vật chất từ UBND phường Tây Tựu",
    excerpt:
      "Thực hiện Quyết định số 10/QĐ-UBND của UBND Thành phố Hà Nội về việc điều chuyển tài sản công; sáng ngày 15/1, tại số 10 Phúc Lý, phường Tây Tựu (trụ sở quận Bắc Từ Liêm cũ) đã diễn ra lễ bàn giao, điều chuyển nguyên trạng tài sản công từ UBND phường Tây Tựu sang Sở Y tế để giao Bệnh viện Nam Thăng Long quản lý, sử dụng làm cơ sở hoạt động sự nghiệp lĩnh vực y tế.",
    date: "15/01/2026",
    image:
      "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=600&auto=format&fit=crop",
    category: "system",
  },
  {
    id: 7,
    title:
      "Tạo hành trang cho con em của gia đình người hiến tạng nhân đạo bước tiếp hành trình tương lai",
    excerpt:
      "Sáng ngày 15/1, tại Bệnh viện đa khoa Xanh Pôn đã diễn ra lễ trao học bổng nhằm hỗ trợ, giúp đỡ con em của gia đình người hiến tạng nhân đạo có hoàn cảnh khó khăn. Buổi lễ có sự tham dự của PGS.TS Đồng Văn Hệ, Giám đốc Trung tâm Điều phối ghép tạng quốc gia; lãnh đạo phòng Bảo trợ Xã hội (Sở Y tế Hà Nội); đại diện Bệnh viện đa khoa Xanh Pôn và đại diện Quỹ Khởi sự từ tâm (đơn vị tài trợ).",
    date: "15/01/2026",
    image:
      "https://sqhx-hanoi.mediacdn.vn/zoom/270x170/91579363132710912/2026/1/15/img-9971-1768460231557623513361-32-0-1282-2000-crop-17684602372812090848831.jpg",
    category: "good-deeds",
  },
  {
    id: 8,
    title:
      "Hà Nội: Nâng cao chất lượng chăm sóc điều dưỡng, hướng tới sự hài lòng của người bệnh",
    excerpt:
      "Nhằm nâng cao chất lượng và hiệu quả chăm sóc người bệnh tại các cơ sở khám bệnh, chữa bệnh, đáp ứng nhu cầu ngày càng cao của nhân dân Thủ đô, Sở Y tế Hà Nội đã xây dựng và ban hành Kế hoạch công tác điều dưỡng Ngành Y tế Hà Nội năm 2026 với nhiều mục tiêu, nhiệm vụ và giải pháp đồng bộ, thiết thực.",
    date: "14/01/2026",
    image:
      "https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?q=80&w=600&auto=format&fit=crop",
    category: "examination",
  },
  {
    id: 9,
    title: "Tác ruột do dây chằng - biến chứng nguy hiểm sau phẫu thuật",
    excerpt:
      "Các bác sĩ khuyến cáo người dân sau phẫu thuật ổ bụng cần chú ý các dấu hiệu đau bụng, nôn, bí trung đại tiện để kịp thời đến cơ sở y tế thăm khám, tránh các biến chứng nguy hiểm của tắc ruột.",
    date: "13/01/2026",
    image:
      "https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=600&auto=format&fit=crop",
    category: "examination",
  },
];

export const MOCK_VIDEOS = [
  {
    id: "v1",
    title:
      "Bản tin Y tế Hà Nội: Toàn cảnh công tác phòng chống dịch tuần 1 tháng 1/2026",
    duration: "05:30",
    thumbnail: "https://picsum.photos/seed/video1/800/450",
    date: "07/01/2026",
  },
  {
    id: "v2",
    title:
      "Phóng sự: Những chiến sĩ áo trắng thầm lặng đêm Giao thừa Tết Bính Ngọ",
    duration: "08:45",
    thumbnail: "https://picsum.photos/seed/video2/800/450",
    date: "10/01/2026",
  },
  {
    id: "v3",
    title: "Hướng dẫn người dân sử dụng ứng dụng Hồ sơ sức khỏe điện tử",
    duration: "03:15",
    thumbnail: "https://picsum.photos/seed/video3/800/450",
    date: "02/01/2026",
  },
];

export const MOCK_CULTURE = [
  {
    id: "c1",
    title:
      'Sôi nổi hội thi "Nét đẹp Văn hóa công sở ngành Y tế" chào xuân 2026',
    date: "12/01/2026",
    image: "https://picsum.photos/seed/culture1/600/400",
  },
];

export const MOCK_SPORTS = [
  {
    id: "s1",
    title:
      "Giải bóng đá Cup Sức khỏe Thủ đô 2026: Bệnh viện Thanh Nhàn vô địch",
    date: "14/01/2026",
    image: "https://picsum.photos/seed/sport1/600/400",
  },
];

export const MOCK_INTERNATIONAL = [
  {
    id: "i1",
    title:
      "WHO cảnh báo biến chủng cúm mới: Việt Nam chủ động giám sát ngay từ cửa khẩu",
    date: "13/01/2026",
    image: "https://picsum.photos/seed/inter1/600/400",
  },
];
