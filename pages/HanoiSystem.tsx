
import React, { useState, useMemo, useEffect } from 'react';
import { 
  Search, 
  MapPin, 
  Phone, 
  Navigation,  
  Activity, 
  Info,
  X,
  HeartPulse,
  Users,
  Building, 
} from 'lucide-react';
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import L from 'leaflet';

// Fix for default Leaflet icon
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

const HANOI_CENTER: [number, number] = [21.0285, 105.8542];
const HANOI_BOUNDS: L.LatLngBoundsExpression = [[20.53, 105.28], [21.39, 106.02]];

// Custom Marker Icon with scaling effect
const createCustomIcon = (type: string, isSelected: boolean = false) => {
  let colorClass = 'bg-gray-500';
  if (type === 'BV') colorClass = 'bg-red-600';
  if (type === 'TT') colorClass = 'bg-blue-600';
  if (type === 'BT') colorClass = 'bg-emerald-600';
  if (type === 'PB') colorClass = 'bg-violet-600';

  const size = isSelected ? 'w-10 h-10' : 'w-7 h-7';
  const ring = isSelected ? 'ring-4 ring-white shadow-[0_0_20px_rgba(0,0,0,0.4)]' : 'border-2 border-white shadow-lg';
  const zIndex = isSelected ? 'z-[1000]' : 'z-10';

  return L.divIcon({
    className: `custom-map-marker ${zIndex}`,
    html: `<div class="${colorClass} ${size} ${ring} rounded-full flex items-center justify-center transition-all duration-300 ease-in-out">
            <div class="w-1.5 h-1.5 bg-white rounded-full ${isSelected ? 'animate-ping' : ''}"></div>
           </div>`,
    iconSize: isSelected ? [40, 40] : [28, 28],
    iconAnchor: isSelected ? [20, 20] : [14, 14],
  });
};

interface Facility {
  id: string;
  name: string;
  type: 'BV' | 'TT' | 'BT' | 'PB'; 
  address: string;
  phone: string;
  coords: [number, number];
  description: string;
  category: string;
}

const ALL_FACILITIES: Facility[] = [
  // 1. CÁC PHÒNG VÀ TƯƠNG ĐƯƠNG THUỘC SỞ (Trụ sở số 4 Sơn Tây)
  ...[
    { name: "Văn phòng Sở", id: "pb-1" },
    { name: "Phòng Tổ chức cán bộ", id: "pb-2" },
    { name: "Phòng Kế hoạch – Tài chính", id: "pb-3" },
    { name: "Phòng Nghiệp vụ Y", id: "pb-4" },
    { name: "Phòng Nghiệp vụ Dược", id: "pb-5" },
    { name: "Phòng Quản lý BHYT và CNTT", id: "pb-6" },
    { name: "Phòng Bảo trợ xã hội", id: "pb-7" },
    { name: "Phòng Kiểm tra lĩnh vực y tế", id: "pb-8" },
    { name: "Chi cục An toàn vệ sinh thực phẩm", id: "cc-1" },
    { name: "Chi cục Dân số, Trẻ em và PC tệ nạn xã hội", id: "cc-2" }
  ].map((item, i) => ({
    id: item.id,
    name: item.name,
    type: 'PB' as const,
    category: i < 8 ? 'Phòng ban thuộc Sở' : 'Chi cục thuộc Sở',
    address: 'Số 04 Sơn Tây, Phường Điện Biên, Quận Ba Đình, Hà Nội',
    phone: '024 3998 5765',
    coords: [21.0312 + (i * 0.00005), 105.8315 + (i * 0.00005)] as [number, number],
    description: 'Cơ quan tham mưu, giúp việc cho Giám đốc Sở trong công tác quản lý nhà nước về y tế trên địa bàn Thủ đô.'
  })),

  // 3a. KHỐI BỆNH VIỆN (42 đơn vị)
  { id: 'bv-1', name: 'Bệnh viện đa khoa Xanh Pôn', type: 'BV', category: 'Bệnh viện Hạng I', address: 'Số 12 Chu Văn An, Quận Ba Đình, Hà Nội', phone: '024 3823 3075', coords: [21.0318, 105.8396], description: 'Bệnh viện đa khoa đầu ngành Ngoại khoa và Nhi khoa của Thủ đô.' },
  { id: 'bv-2', name: 'Bệnh viện Thanh Nhàn', type: 'BV', category: 'Bệnh viện Hạng I', address: 'Số 42 Thanh Nhàn, Quận Hai Bà Trưng, Hà Nội', phone: '024 3971 4363', coords: [21.0028, 105.8569], description: 'Bệnh viện đa khoa hạng I, mũi nhọn về Nội khoa và hồi sức cấp cứu.' },
  { id: 'bv-3', name: 'Bệnh viện đa khoa Đức Giang', type: 'BV', category: 'Bệnh viện Hạng I', address: 'Số 54 Trường Lâm, Quận Long Biên, Hà Nội', phone: '024 3827 1515', coords: [21.0528, 105.8969], description: 'Cơ sở y tế hạng I khu vực phía Đông thành phố.' },
  { id: 'bv-4', name: 'Bệnh viện đa khoa Hà Đông', type: 'BV', category: 'Bệnh viện Hạng I', address: 'Số 02 Bế Văn Đàn, Quận Hà Đông, Hà Nội', phone: '024 3382 4220', coords: [20.9721, 105.7765], description: 'Bệnh viện đa khoa hạng I khu vực phía Tây Nam Thủ đô.' },
  { id: 'bv-5', name: 'Bệnh viện đa khoa Đống Đa', type: 'BV', category: 'Bệnh viện Hạng I', address: 'Số 180 Nguyễn Lương Bằng, Quận Đống Đa, Hà Nội', phone: '024 3851 7140', coords: [21.0125, 105.8285], description: 'Bệnh viện đầu ngành về Truyền nhiễm và các bệnh nhiệt đới.' },
  { id: 'bv-6', name: 'Bệnh viện đa khoa Sơn Tây', type: 'BV', category: 'Bệnh viện Hạng I', address: 'Số 304A Lê Lợi, Thị xã Sơn Tây, Hà Nội', phone: '024 3383 2341', coords: [21.1415, 105.5021], description: 'Bệnh viện đa khoa hạng I phục vụ nhân dân khu vực phía Tây thành phố.' },
  { id: 'bv-7', name: 'Bệnh viện Phụ sản Hà Nội', type: 'BV', category: 'Bệnh viện Chuyên khoa', address: 'Số 929 La Thành, Quận Ba Đình, Hà Nội', phone: '1900 6922', coords: [21.0268, 105.8099], description: 'Bệnh viện chuyên khoa Sản phụ khoa hạng I, đầu ngành sản phụ khoa Thủ đô.' },
  { id: 'bv-8', name: 'Bệnh viện Tim Hà Nội', type: 'BV', category: 'Bệnh viện Chuyên khoa', address: 'Số 92 Trần Hưng Đạo, Quận Hoàn Kiếm, Hà Nội', phone: '024 3942 2430', coords: [21.0245, 105.8432], description: 'Bệnh viện chuyên khoa Tim mạch tuyến cuối của thành phố.' },
  { id: 'bv-9', name: 'Bệnh viện Ung bướu Hà Nội', type: 'BV', category: 'Bệnh viện Chuyên khoa', address: 'Số 42A Thanh Nhàn, Quận Hai Bà Trưng, Hà Nội', phone: '024 3821 7997', coords: [21.0035, 105.8575], description: 'Bệnh viện chuyên khoa Ung thư hạng I.' },
  { id: 'bv-10', name: 'Bệnh viện Thận Hà Nội', type: 'BV', category: 'Bệnh viện Chuyên khoa', address: 'Số 70 Nguyễn Lương Bằng, Quận Đống Đa, Hà Nội', phone: '024 3513 4922', coords: [21.0118, 105.8275], description: 'Bệnh viện chuyên khoa Thận và lọc máu hàng đầu.' },
  { id: 'bv-11', name: 'Bệnh viện Mắt Hà Nội', type: 'BV', category: 'Bệnh viện Chuyên khoa', address: 'Số 37 Hai Bà Trưng, Quận Hoàn Kiếm, Hà Nội', phone: '024 3825 2125', coords: [21.0255, 105.8521], description: 'Chuyên khoa Mắt đầu ngành thành phố.' },
  { id: 'bv-12', name: 'Bệnh viện Da liễu Hà Nội', type: 'BV', category: 'Bệnh viện Chuyên khoa', address: 'Số 79B Nguyễn Khuyến, Quận Đống Đa, Hà Nội', phone: '024 3825 2588', coords: [21.0289, 105.8365], description: 'Điều trị các bệnh lý về da và thẩm mỹ da liễu.' },
  
  // Các BV Huyện (Mô phỏng vị trí theo địa giới hành chính)
  { id: 'bv-h1', name: 'Bệnh viện đa khoa huyện Ba Vì', type: 'BV', category: 'Bệnh viện Huyện', address: 'Thị trấn Tây Đằng, Huyện Ba Vì, Hà Nội', phone: '024 3386 3144', coords: [21.2352, 105.4125], description: 'Phục vụ khám chữa bệnh cho nhân dân huyện Ba Vì.' },
  { id: 'bv-h2', name: 'Bệnh viện đa khoa huyện Phú Xuyên', type: 'BV', category: 'Bệnh viện Huyện', address: 'Thị trấn Phú Xuyên, Huyện Phú Xuyên, Hà Nội', phone: '024 3385 4252', coords: [20.7385, 105.9012], description: 'Cơ sở y tế khu vực cửa ngõ phía Nam Thủ đô.' },
  { id: 'bv-h3', name: 'Bệnh viện đa khoa huyện Sóc Sơn', type: 'BV', category: 'Bệnh viện Huyện', address: 'Thị trấn Sóc Sơn, Huyện Sóc Sơn, Hà Nội', phone: '024 3885 1251', coords: [21.2685, 105.8512], description: 'Bệnh viện đa khoa hạng II khu vực phía Bắc.' },
  { id: 'bv-h4', name: 'Bệnh viện đa khoa huyện Mỹ Đức', type: 'BV', category: 'Bệnh viện Huyện', address: 'Thị trấn Đại Nghĩa, Huyện Mỹ Đức, Hà Nội', phone: '024 3384 7212', coords: [20.7125, 105.7425], description: 'Bệnh viện huyện phục vụ khu vực phía Tây Nam.' },
  
  // 3b. KHỐI TRUNG TÂM CHUYÊN KHOA (5 đơn vị)
  { id: 'tt-1', name: 'Trung tâm Kiểm soát bệnh tật (CDC) Hà Nội', type: 'TT', category: 'Trung tâm chuyên khoa', address: 'Số 70 Nguyễn Chí Thanh, Quận Đống Đa, Hà Nội', phone: '024 3834 3520', coords: [21.0225, 105.8085], description: 'Đơn vị đầu ngành về y tế dự phòng và kiểm soát dịch bệnh.' },
  { id: 'tt-2', name: 'Trung tâm Cấp cứu 115 Hà Nội', type: 'TT', category: 'Trung tâm chuyên khoa', address: 'Số 11 Phan Chu Trinh, Quận Hoàn Kiếm, Hà Nội', phone: '115', coords: [21.0215, 105.8565], description: 'Hệ thống cấp cứu ngoại viện chuyên nghiệp toàn thành phố.' },
  { id: 'tt-3', name: 'Trung tâm Kiểm nghiệm thuốc, mỹ phẩm, thực phẩm', type: 'TT', category: 'Trung tâm chuyên khoa', address: 'Số 07 Đặng Tiến Đông, Quận Đống Đa, Hà Nội', phone: '024 3851 1212', coords: [21.0115, 105.8215], description: 'Kiểm tra, giám sát chất lượng dược phẩm, thực phẩm.' },
  
  // 3c. KHỐI CƠ SỞ TRỢ GIÚP XÃ HỘI (11 đơn vị)
  { id: 'bt-1', name: 'Làng trẻ em SOS Hà Nội', type: 'BT', category: 'Cơ sở bảo trợ', address: 'Số 02 Doãn Kế Thiện, Quận Cầu Giấy, Hà Nội', phone: '024 3764 4022', coords: [21.0385, 105.7812], description: 'Nuôi dưỡng và chăm sóc trẻ em mồ côi, có hoàn cảnh đặc biệt.' },
  { id: 'bt-2', name: 'Làng trẻ em Birla Hà Nội', type: 'BT', category: 'Cơ sở bảo trợ', address: 'Số 04 Doãn Kế Thiện, Quận Cầu Giấy, Hà Nội', phone: '024 3764 4022', coords: [21.0392, 105.7825], description: 'Cơ sở chăm sóc trẻ em mồ côi uy tín của thành phố.' },
  { id: 'bt-3', name: 'Trung tâm Bảo trợ xã hội 3 Hà Nội', type: 'BT', category: 'Cơ sở bảo trợ', address: 'Miêu Nha, Tây Mỗ, Quận Nam Từ Liêm, Hà Nội', phone: '024 3839 0368', coords: [21.0085, 105.7412], description: 'Chăm sóc và nuôi dưỡng người già cô đơn và trẻ em lang thang.' },
];

// Sub-component to handle map resize and fly-to
const MapEventHandler = ({ coords }: { coords: [number, number] | null }) => {
  const map = useMap();
  
  useEffect(() => {
    setTimeout(() => {
      map.invalidateSize();
    }, 250);
  }, [map]);

  useEffect(() => {
    if (coords) map.flyTo(coords, 16, { duration: 1.5 });
  }, [coords, map]);

  return null;
};

const HanoiSystem = () => {
  const [selectedFacility, setSelectedFacility] = useState<Facility | null>(null);
  const [filterType, setFilterType] = useState<'ALL' | 'BV' | 'TT' | 'BT' | 'PB'>('ALL');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredFacilities = useMemo(() => {
    return ALL_FACILITIES.filter(item => {
      const matchType = filterType === 'ALL' || item.type === filterType;
      const matchSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          item.address.toLowerCase().includes(searchTerm.toLowerCase());
      return matchType && matchSearch;
    });
  }, [filterType, searchTerm]);

  const getTypeStyle = (type: string) => {
    switch(type) {
      case 'BV': return { color: 'text-red-600', bg: 'bg-red-50', border: 'border-red-200', label: 'Bệnh viện', icon: <HeartPulse size={14}/> };
      case 'TT': return { color: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-200', label: 'TT Chuyên khoa', icon: <Activity size={14}/> };
      case 'BT': return { color: 'text-emerald-600', bg: 'bg-emerald-50', border: 'border-emerald-200', label: 'Cơ sở Trợ giúp', icon: <Users size={14}/> };
      case 'PB': return { color: 'text-violet-600', bg: 'bg-violet-50', border: 'border-violet-200', label: 'Phòng/Chi cục', icon: <Building size={14}/> };
      default: return { color: 'text-gray-600', bg: 'bg-gray-50', border: 'border-gray-200', label: 'Khác', icon: <Info size={14}/> };
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-64px)] bg-gray-50 overflow-hidden font-sans">
      <div className="bg-white border-b border-gray-200 px-6 py-3 flex justify-between items-center shadow-sm z-20">
        <div className="flex items-center gap-4">
          <div className="bg-primary-700 p-2 rounded-xl text-white shadow-lg">
             <MapPin size={24} />
          </div>
          <div>
            <h1 className="text-xl font-black text-primary-900 uppercase">Mạng lưới Y tế & An sinh Hà Nội</h1>
            <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mt-0.5">Dữ liệu địa điểm chi tiết Sở Y tế Hà Nội (68 cơ sở)</p>
          </div>
        </div>
      </div>

      <div className="flex flex-grow overflow-hidden relative">
        {/* SIDEBAR */}
        <div className="w-full md:w-[420px] bg-white border-r border-gray-200 flex flex-col z-30 absolute md:relative h-full transition-transform">
            <div className="p-4 border-b border-gray-100 bg-gray-50 space-y-3">
                <div className="relative">
                    <Search className="absolute left-3 top-2.5 text-gray-400" size={16}/>
                    <input 
                        type="text" 
                        placeholder="Tìm theo tên hoặc địa chỉ..."
                        className="w-full pl-9 pr-3 py-2.5 bg-white border border-gray-200 rounded-xl shadow-sm focus:ring-2 focus:ring-primary-100 outline-none text-xs font-bold"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="flex gap-1.5 overflow-x-auto no-scrollbar pb-1">
                    {[
                      { id: 'ALL', label: 'Tất cả' },
                      { id: 'PB', label: 'Quản lý' },
                      { id: 'BV', label: 'Bệnh viện' },
                      { id: 'TT', label: 'TT Chuyên khoa' },
                      { id: 'BT', label: 'Trợ giúp' },
                    ].map(btn => (
                      <button 
                        key={btn.id}
                        onClick={() => setFilterType(btn.id as any)} 
                        className={`px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-tighter border transition-all whitespace-nowrap
                        ${filterType === btn.id ? 'bg-primary-900 text-white border-primary-900 shadow-md' : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-100'}`}
                      >
                        {btn.label}
                      </button>
                    ))}
                </div>
            </div>

            <div className="flex-grow overflow-y-auto no-scrollbar bg-white">
                {filteredFacilities.map(fac => {
                  const style = getTypeStyle(fac.type);
                  return (
                    <div 
                        key={fac.id}
                        onClick={() => setSelectedFacility(fac)}
                        className={`p-4 border-b border-gray-50 cursor-pointer hover:bg-primary-50 transition-all flex gap-4 ${selectedFacility?.id === fac.id ? 'bg-primary-50 border-l-4 border-l-primary-600' : 'border-l-4 border-l-transparent'}`}
                    >
                         <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm transition-all duration-300 ${selectedFacility?.id === fac.id ? 'scale-110 shadow-lg' : ''} ${style.bg} ${style.color}`}>
                             {style.icon}
                         </div>
                         <div className="flex-grow min-w-0">
                             <h3 className="text-[13px] font-black text-gray-800 leading-tight mb-1">{fac.name}</h3>
                             <p className="text-[11px] text-gray-400 line-clamp-2 mb-2 italic leading-tight">{fac.address}</p>
                             <div className="flex items-center justify-between">
                                <span className={`inline-block text-[9px] px-2 py-0.5 rounded font-black uppercase tracking-tighter border ${style.color} ${style.border} ${style.bg}`}>
                                    {fac.category}
                                </span>
                             </div>
                         </div>
                    </div>
                  );
                })}
                {filteredFacilities.length === 0 && (
                  <div className="p-10 text-center text-gray-400 italic text-sm">Không tìm thấy kết quả phù hợp</div>
                )}
            </div>
        </div>

        {/* MAP CONTAINER */}
        <div className="flex-grow relative bg-slate-200 overflow-hidden h-full z-10">
            <MapContainer 
              center={HANOI_CENTER} 
              zoom={13} 
              minZoom={10}
              maxZoom={18}
              maxBounds={HANOI_BOUNDS}
              maxBoundsViscosity={1.0}
              style={{ height: '100%', width: '100%' }}
            >
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              
              <MapEventHandler coords={selectedFacility?.coords || null} />

              {filteredFacilities.map(fac => (
                <Marker 
                  key={fac.id} 
                  position={fac.coords}
                  icon={createCustomIcon(fac.type, selectedFacility?.id === fac.id)}
                  eventHandlers={{ click: () => setSelectedFacility(fac) }}
                />
              ))}
            </MapContainer>

            {/* FLOATING DETAIL PANEL */}
            {selectedFacility && (
                <div className="absolute bottom-6 right-6 w-80 md:w-96 bg-white rounded-2xl shadow-2xl overflow-hidden z-[1000] animate-in slide-in-from-bottom-5 border border-gray-100 ring-4 ring-primary-900/10">
                    <div className="bg-primary-900 p-4 text-white">
                        <div className="flex justify-between items-start">
                             <span className="text-[10px] font-black uppercase tracking-widest bg-white/20 px-2 py-1 rounded">
                                {selectedFacility.category}
                             </span>
                             <button onClick={() => setSelectedFacility(null)} className="hover:bg-white/20 rounded-full p-1"><X size={16}/></button>
                        </div>
                        <h2 className="text-lg font-black mt-2 leading-tight uppercase">{selectedFacility.name}</h2>
                    </div>
                    <div className="p-5 space-y-4">
                        <div className="space-y-4 text-[13px] text-gray-700">
                            <div className="flex items-start gap-3">
                                <MapPin size={18} className="text-red-600 shrink-0 mt-0.5" />
                                <div className="space-y-1">
                                   <p className="font-bold leading-tight text-gray-900">{selectedFacility.address}</p>
                                   <p className="text-[11px] text-gray-400 font-mono tracking-tight">Tọa độ: {selectedFacility.coords[0].toFixed(6)}, {selectedFacility.coords[1].toFixed(6)}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <Phone size={18} className="text-primary-600 shrink-0" />
                                <span className="font-black text-primary-900 text-base">{selectedFacility.phone}</span>
                            </div>
                            <div className="bg-gray-50 p-4 rounded-xl text-[12px] italic text-gray-600 leading-relaxed border border-gray-100 shadow-inner">
                                <div className="flex items-center gap-2 mb-2 text-primary-600 not-italic font-bold">
                                   <Info size={14} /> GIỚI THIỆU ĐƠN VỊ
                                </div>
                                {selectedFacility.description}
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <button className="flex items-center justify-center gap-2 bg-primary-700 hover:bg-primary-800 text-white py-3.5 rounded-xl font-bold text-[11px] uppercase transition shadow-lg shadow-primary-200">
                                <Navigation size={16} /> Chỉ đường
                            </button>
                            <a 
                               href={`tel:${selectedFacility.phone}`}
                               className="flex items-center justify-center gap-2 bg-white border-2 border-gray-100 hover:border-primary-600 hover:text-primary-600 text-gray-700 py-3.5 rounded-xl font-bold text-[11px] uppercase transition"
                            >
                                <Phone size={16} /> Gọi điện
                            </a>
                        </div>
                    </div>
                </div>
            )}
            
            {/* LEGEND Overlay */}
            <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-xl z-[1000] border border-white hidden md:block w-52">
                <h4 className="text-[10px] font-black uppercase text-gray-400 mb-3 border-b border-gray-100 pb-2 tracking-widest">Mạng lưới Y tế</h4>
                <div className="space-y-2.5">
                    <div className="flex items-center gap-3 text-[11px] font-bold text-gray-700">
                        <div className="w-3.5 h-3.5 bg-violet-600 rounded-full shadow-sm"></div> Cơ quan quản lý
                    </div>
                    <div className="flex items-center gap-3 text-[11px] font-bold text-gray-700">
                        <div className="w-3.5 h-3.5 bg-red-600 rounded-full shadow-sm"></div> Khối Bệnh viện
                    </div>
                    <div className="flex items-center gap-3 text-[11px] font-bold text-gray-700">
                        <div className="w-3.5 h-3.5 bg-blue-600 rounded-full shadow-sm"></div> TT Chuyên khoa
                    </div>
                    <div className="flex items-center gap-3 text-[11px] font-bold text-gray-700">
                        <div className="w-3.5 h-3.5 bg-emerald-600 rounded-full shadow-sm"></div> Cơ sở An sinh
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default HanoiSystem;
