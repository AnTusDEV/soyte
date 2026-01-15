
import React, { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
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
  Home as HomeIcon,
  ChevronLeft
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
    address: 'Số 04 Sơn Tây,  Điện Biên,  Ba Đình, Hà Nội',
    phone: '024 3998 5765',
    coords: [21.0312 + (i * 0.00005), 105.8315 + (i * 0.00005)] as [number, number],
    description: 'Cơ quan tham mưu, giúp việc cho Giám đốc Sở trong công tác quản lý nhà nước về y tế trên địa bàn Thủ đô.'
  })),
  { id: 'bv-1', name: 'Bệnh viện đa khoa Xanh Pôn', type: 'BV', category: 'Bệnh viện', address: 'Số 12 Chu Văn An,  Ba Đình, Hà Nội', phone: '024 3823 3075', coords: [21.0318, 105.8396], description: 'Bệnh viện đa khoa đầu ngành Ngoại khoa và Nhi khoa của Thủ đô.' },
  { id: 'bv-2', name: 'Bệnh viện Thanh Nhàn', type: 'BV', category: 'Bệnh viện', address: 'Số 42 Thanh Nhàn,  Hai Bà Trưng, Hà Nội', phone: '024 3971 4363', coords: [21.0028, 105.8569], description: 'Bệnh viện đa khoa hạng I, mũi nhọn về Nội khoa và hồi sức cấp cứu.' },
  { id: 'bv-3', name: 'Bệnh viện đa khoa Đức Giang', type: 'BV', category: 'Bệnh viện', address: 'Số 54 Trường Lâm,  Long Biên, Hà Nội', phone: '024 3827 1515', coords: [21.0528, 105.8969], description: 'Cơ sở y tế hạng I khu vực phía Đông thành phố.' },
  { id: 'bv-h1', name: 'Bệnh viện đa khoa huyện Ba Vì', type: 'BV', category: 'Bệnh viện', address: 'Thị trấn Tây Đằng, Huyện Ba Vì, Hà Nội', phone: '024 3386 3144', coords: [21.2352, 105.4125], description: 'Phục vụ khám chữa bệnh cho nhân dân huyện Ba Vì.' },
  { id: 'tt-1', name: 'Trung tâm Kiểm soát bệnh tật (CDC) Hà Nội', type: 'TT', category: 'Trung tâm chuyên khoa', address: 'Số 70 Nguyễn Chí Thanh,  Đống Đa, Hà Nội', phone: '024 3834 3520', coords: [21.0225, 105.8085], description: 'Đơn vị đầu ngành về y tế dự phòng và kiểm soát dịch bệnh.' },
  { id: 'bt-1', name: 'Làng trẻ em SOS Hà Nội', type: 'BT', category: 'Cơ sở bảo trợ', address: 'Số 02 Doãn Kế Thiện,  Cầu Giấy, Hà Nội', phone: '024 3764 4022', coords: [21.0385, 105.7812], description: 'Nuôi dưỡng và chăm sóc trẻ em mồ côi, có hoàn cảnh đặc biệt.' },
];

const MapEventHandler = ({ coords }: { coords: [number, number] | null }) => {
  const map = useMap();
  useEffect(() => {
    const timer = setTimeout(() => {
      map.invalidateSize();
    }, 500);
    return () => clearTimeout(timer);
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
    <div className="flex flex-col h-screen bg-gray-50 overflow-hidden font-sans">
      {/* Header Section with Back Button */}
      <div className="bg-white border-b border-gray-200 px-4 py-3 flex justify-between items-center shadow-sm z-20">
        <div className="flex items-center gap-3">
          <Link 
            to="/" 
            className="flex items-center gap-1 text-primary-700 hover:text-primary-800 font-bold bg-primary-50 px-3 py-1.5 rounded-lg border border-primary-100 transition-all group"
          >
            <ChevronLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
            <HomeIcon size={16} />
            <span className="hidden md:inline">Trang chủ</span>
          </Link>
          <div className="h-8 w-px bg-gray-200 mx-2 hidden md:block"></div>
          <div className="flex items-center gap-3">
            <div className="bg-primary-700 p-1.5 rounded-lg text-white shadow-lg hidden sm:block">
               <MapPin size={20} />
            </div>
            <div>
              <h1 className="text-base md:text-lg font-black text-primary-900 uppercase leading-tight">Mạng lưới Y tế Hà Nội</h1>
              <p className="text-[9px] text-gray-500 font-bold uppercase tracking-widest">Dữ liệu địa điểm 68 cơ sở y tế trực thuộc</p>
            </div>
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
                                <p className="font-bold leading-tight text-gray-900">{selectedFacility.address}</p>
                            </div>
                            <div className="flex items-center gap-3">
                                <Phone size={18} className="text-primary-600 shrink-0" />
                                <span className="font-black text-primary-900 text-base">{selectedFacility.phone}</span>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <button className="flex items-center justify-center gap-2 bg-primary-700 hover:bg-primary-800 text-white py-3.5 rounded-xl font-bold text-[11px] uppercase transition shadow-lg">
                                <Navigation size={16} /> Chỉ đường
                            </button>
                            <a href={`tel:${selectedFacility.phone}`} className="flex items-center justify-center gap-2 bg-white border-2 border-gray-100 hover:border-primary-600 text-gray-700 py-3.5 rounded-xl font-bold text-[11px] uppercase transition">
                                <Phone size={16} /> Gọi điện
                            </a>
                        </div>
                    </div>
                </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default HanoiSystem;
