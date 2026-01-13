
import React, { useState } from 'react';
import { 
  Search, 
  MapPin, 
  Phone, 
  Navigation, 
  Building2, 
  Stethoscope, 
  Activity, 
  Info,
  X 
} from 'lucide-react';
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import L from 'leaflet';

// Fix for default Leaflet icon in React
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

// Hanoi Geofencing & Center
const HANOI_CENTER: [number, number] = [21.0285, 105.8542];
const HANOI_BOUNDS: L.LatLngBoundsExpression = [
  [20.53, 105.28], // Southwest (Phu Xuyen/Ung Hoa area)
  [21.39, 106.02]  // Northeast (Soc Son area)
];

// Custom DivIcons for Map Markers
const createCustomIcon = (type: string) => {
  let colorClass = 'bg-gray-500';
  if (type === 'BV') colorClass = 'bg-red-600';
  if (type === 'TTYT') colorClass = 'bg-blue-600';
  if (type === 'TYT') colorClass = 'bg-green-600';

  return L.divIcon({
    className: 'custom-map-marker',
    html: `<div class="${colorClass} w-6 h-6 rounded-full border-2 border-white shadow-lg flex items-center justify-center transition-transform hover:scale-125">
            <div class="w-1.5 h-1.5 bg-white rounded-full"></div>
           </div>`,
    iconSize: [24, 24],
    iconAnchor: [12, 12],
    popupAnchor: [0, -12]
  });
};

interface Facility {
  id: number;
  name: string;
  type: 'BV' | 'TTYT' | 'TYT';
  address: string;
  phone: string;
  image: string;
  coords: [number, number]; // Lat, Lng
  description: string;
}

const FACILITIES: Facility[] = [
  {
    id: 1,
    name: "Bệnh viện Đa khoa Xanh Pôn",
    type: "BV",
    address: "12 Chu Văn An, Quận Ba Đình, Hà Nội",
    phone: "024 3823 3075",
    image: "https://picsum.photos/400/250?random=1",
    coords: [21.0318, 105.8396],
    description: "Bệnh viện hạng I của Thành phố Hà Nội, chuyên khoa đầu ngành về Ngoại khoa, Nhi khoa, Gây mê hồi sức."
  },
  {
    id: 2,
    name: "Bệnh viện Thanh Nhàn",
    type: "BV",
    address: "42 Thanh Nhàn, Hai Bà Trưng, Hà Nội",
    phone: "024 3971 4363",
    image: "https://picsum.photos/400/250?random=2",
    coords: [21.0028, 105.8569],
    description: "Bệnh viện đa khoa hạng I, mũi nhọn về Nội khoa, Hồi sức cấp cứu và Ung bướu."
  },
  {
    id: 3,
    name: "Trung tâm Y tế Quận Hoàn Kiếm",
    type: "TTYT",
    address: "26 Lương Ngọc Quyến, Hàng Buồm, Hoàn Kiếm",
    phone: "024 3825 2445",
    image: "https://picsum.photos/400/250?random=3",
    coords: [21.0345, 105.8521],
    description: "Đơn vị y tế dự phòng và chăm sóc sức khỏe ban đầu cho người dân quận trung tâm."
  },
  {
    id: 4,
    name: "Bệnh viện Phụ Sản Hà Nội",
    type: "BV",
    address: "929 Đ. La Thành, Ngọc Khánh, Ba Đình",
    phone: "1900 6922",
    image: "https://picsum.photos/400/250?random=4",
    coords: [21.0268, 105.8099],
    description: "Bệnh viện chuyên khoa hạng I của thành phố trong lĩnh vực Sản Phụ Khoa và Kế hoạch hóa gia đình."
  },
  {
    id: 5,
    name: "Trạm Y tế Phường Hàng Bài",
    type: "TYT",
    address: "15 Vọng Đức, Hàng Bài, Hoàn Kiếm",
    phone: "024 3825 4321",
    image: "https://picsum.photos/400/250?random=5",
    coords: [21.0221, 105.8505],
    description: "Trạm y tế cơ sở thực hiện tiêm chủng mở rộng và sơ cấp cứu ban đầu."
  },
  {
    id: 6,
    name: "Bệnh viện Tim Hà Nội",
    type: "BV",
    address: "92 Trần Hưng Đạo, Cửa Nam, Hoàn Kiếm",
    phone: "024 3942 2430",
    image: "https://picsum.photos/400/250?random=6",
    coords: [21.0245, 105.8432],
    description: "Bệnh viện chuyên khoa đầu ngành Tim mạch của Thủ đô Hà Nội."
  },
  {
    id: 7,
    name: "Trung tâm Y tế Quận Đống Đa",
    type: "TTYT",
    address: "107 Tôn Đức Thắng, Hàng Bột, Đống Đa",
    phone: "024 3511 2345",
    image: "https://picsum.photos/400/250?random=7",
    coords: [21.0263, 105.8341],
    description: "Trung tâm y tế thực hiện chức năng y tế dự phòng, dân số và khám chữa bệnh."
  },
  {
    id: 8,
    name: "Trạm Y tế Phường Láng Hạ",
    type: "TYT",
    address: "Ngõ 5 Láng Hạ, Đống Đa, Hà Nội",
    phone: "024 3835 1234",
    image: "https://picsum.photos/400/250?random=8",
    coords: [21.0152, 105.8165],
    description: "Chăm sóc sức khỏe nhân dân trên địa bàn phường Láng Hạ."
  }
];

// Component to fly to location on click
const MapFlyTo = ({ coords }: { coords: [number, number] | null }) => {
  const map = useMap();
  if (coords) {
    map.flyTo(coords, 16, { duration: 1.5 });
  }
  return null;
};

const HanoiSystem = () => {
  const [selectedFacility, setSelectedFacility] = useState<Facility | null>(null);
  const [filterType, setFilterType] = useState<'ALL' | 'BV' | 'TTYT' | 'TYT'>('ALL');
  const [searchTerm, setSearchTerm] = useState('');

  // Filter Logic
  const filteredFacilities = FACILITIES.filter(item => {
    const matchType = filterType === 'ALL' || item.type === filterType;
    const matchSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                        item.address.toLowerCase().includes(searchTerm.toLowerCase());
    return matchType && matchSearch;
  });

  const getTypeColor = (type: string) => {
    switch(type) {
      case 'BV': return 'bg-red-600 text-white border-red-700';
      case 'TTYT': return 'bg-blue-600 text-white border-blue-700';
      case 'TYT': return 'bg-green-600 text-white border-green-700';
      default: return 'bg-gray-500 text-white';
    }
  };

  const getTypeLabel = (type: string) => {
    switch(type) {
      case 'BV': return 'Bệnh viện';
      case 'TTYT': return 'Trung tâm Y tế';
      case 'TYT': return 'Trạm Y tế';
      default: return 'Cơ sở y tế';
    }
  };

  const getTypeIcon = (type: string) => {
    switch(type) {
      case 'BV': return <Building2 size={14} />;
      case 'TTYT': return <Activity size={14} />;
      case 'TYT': return <Stethoscope size={14} />;
      default: return <Info size={14} />;
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-64px)] bg-gray-50 overflow-hidden">
      {/* Page Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-3 flex justify-between items-center shadow-sm z-10">
        <div>
          <h1 className="text-lg md:text-xl font-black text-primary-900 uppercase flex items-center gap-2">
            <div className="bg-red-600 p-1.5 rounded shadow-md text-white">
                <MapPin size={18} />
            </div>
            Bản đồ Y tế Thủ đô Hà Nội
          </h1>
          <p className="text-[10px] md:text-xs text-gray-500 font-medium tracking-tight">Hệ thống tra cứu mạng lưới y tế chính thống khu vực Hà Nội</p>
        </div>
      </div>

      <div className="flex flex-grow overflow-hidden relative">
        
        {/* LEFT SIDEBAR: LIST & SEARCH */}
        <div className="w-full md:w-[320px] bg-white border-r border-gray-200 flex flex-col z-30 shadow-lg md:shadow-none absolute md:relative h-full transition-transform transform md:translate-x-0 -translate-x-full">
            
            {/* Search & Filter */}
            <div className="p-3 border-b border-gray-100 bg-gray-50 space-y-3">
                <div className="relative">
                    <Search className="absolute left-3 top-2.5 text-gray-400" size={16}/>
                    <input 
                        type="text" 
                        placeholder="Tìm bệnh viện..."
                        className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-primary-500 text-xs font-medium transition-all"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="flex gap-1.5 overflow-x-auto no-scrollbar pb-1">
                    <button onClick={() => setFilterType('ALL')} className={`px-2.5 py-1 rounded-md text-[10px] font-bold whitespace-nowrap border transition ${filterType === 'ALL' ? 'bg-primary-900 text-white border-primary-900' : 'bg-white text-gray-600 border-gray-300 hover:bg-gray-100'}`}>
                        Tất cả
                    </button>
                    <button onClick={() => setFilterType('BV')} className={`px-2.5 py-1 rounded-md text-[10px] font-bold whitespace-nowrap border transition ${filterType === 'BV' ? 'bg-red-600 text-white border-red-600' : 'bg-white text-gray-600 border-gray-300 hover:bg-gray-100'}`}>
                        Bệnh viện
                    </button>
                    <button onClick={() => setFilterType('TTYT')} className={`px-2.5 py-1 rounded-md text-[10px] font-bold whitespace-nowrap border transition ${filterType === 'TTYT' ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-600 border-gray-300 hover:bg-gray-100'}`}>
                        TT Y tế
                    </button>
                    <button onClick={() => setFilterType('TYT')} className={`px-2.5 py-1 rounded-md text-[10px] font-bold whitespace-nowrap border transition ${filterType === 'TYT' ? 'bg-green-600 text-white border-green-600' : 'bg-white text-gray-600 border-gray-300 hover:bg-gray-100'}`}>
                        Trạm Y tế
                    </button>
                </div>
                <div className="text-[9px] text-gray-400 font-bold uppercase tracking-widest px-1">
                    Hiển thị <span className="text-primary-700">{filteredFacilities.length}</span> cơ sở
                </div>
            </div>

            {/* List */}
            <div className="flex-grow overflow-y-auto no-scrollbar bg-white">
                {filteredFacilities.length > 0 ? (
                    filteredFacilities.map(fac => (
                        <div 
                            key={fac.id}
                            onClick={() => setSelectedFacility(fac)}
                            className={`p-3 border-b border-gray-50 cursor-pointer hover:bg-blue-50 transition-all flex gap-3 ${selectedFacility?.id === fac.id ? 'bg-blue-50/80 border-l-4 border-l-blue-600' : 'border-l-4 border-l-transparent'}`}
                        >
                             <div className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 shadow-sm transition-transform ${selectedFacility?.id === fac.id ? 'scale-105' : ''} ${getTypeColor(fac.type)}`}>
                                 {getTypeIcon(fac.type)}
                             </div>
                             <div className="flex-grow min-w-0">
                                 <h3 className="text-xs font-bold text-gray-800 leading-tight mb-0.5 truncate">{fac.name}</h3>
                                 <p className="text-[10px] text-gray-500 line-clamp-1 mb-1">{fac.address}</p>
                                 <span className={`inline-block text-[9px] px-1.5 py-0.5 rounded font-black uppercase tracking-tighter border ${fac.type === 'BV' ? 'text-red-600 border-red-200 bg-red-50' : fac.type === 'TTYT' ? 'text-blue-600 border-blue-200 bg-blue-50' : 'text-green-600 border-green-200 bg-green-50'}`}>
                                    {getTypeLabel(fac.type)}
                                 </span>
                             </div>
                        </div>
                    ))
                ) : (
                    <div className="p-10 text-center">
                        <MapPin className="mx-auto text-gray-200 mb-4" size={32} />
                        <p className="text-xs text-gray-400 font-medium">Không tìm thấy cơ sở.</p>
                    </div>
                )}
            </div>
        </div>

        {/* RIGHT AREA: GEOCONFINED MAP */}
        <div className="flex-grow relative bg-slate-200 overflow-hidden h-full z-10">
            <MapContainer 
              center={HANOI_CENTER} 
              zoom={13} 
              minZoom={10}
              maxZoom={18}
              maxBounds={HANOI_BOUNDS}
              maxBoundsViscosity={1.0}
              style={{ height: '100%', width: '100%' }}
              zoomControl={true}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              
              <MapFlyTo coords={selectedFacility?.coords || null} />

              {filteredFacilities.map(fac => (
                <Marker 
                  key={fac.id} 
                  position={fac.coords}
                  icon={createCustomIcon(fac.type)}
                  eventHandlers={{
                    click: () => setSelectedFacility(fac),
                  }}
                />
              ))}
            </MapContainer>

            {/* DETAIL POPUP CARD (SHRUNKEN) */}
            {selectedFacility && (
                <div className="absolute top-3 left-3 md:left-auto md:right-3 w-[85%] md:w-72 bg-white rounded-xl shadow-2xl overflow-hidden z-[1000] animate-in fade-in zoom-in-95 duration-300 border border-gray-100">
                    <div className="relative h-32">
                        <img src={selectedFacility.image} alt={selectedFacility.name} className="w-full h-full object-cover" />
                        <button 
                            onClick={() => setSelectedFacility(null)}
                            className="absolute top-2 right-2 w-7 h-7 bg-white/90 hover:bg-white text-gray-900 rounded-full flex items-center justify-center shadow-md transition"
                        >
                            <X size={14} />
                        </button>
                        <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/80 to-transparent">
                             <span className={`text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-sm text-white shadow-md ${selectedFacility.type === 'BV' ? 'bg-red-600' : selectedFacility.type === 'TTYT' ? 'bg-blue-600' : 'bg-green-600'}`}>
                                {getTypeLabel(selectedFacility.type)}
                             </span>
                        </div>
                    </div>
                    <div className="p-4">
                        <h2 className="text-base font-black text-gray-900 mb-2 leading-tight uppercase tracking-tight">{selectedFacility.name}</h2>
                        
                        <div className="space-y-2 text-[11px] text-gray-600">
                            <div className="flex items-start gap-2">
                                <MapPin size={14} className="text-primary-600 flex-shrink-0 mt-0.5" />
                                <span className="font-medium text-gray-700">{selectedFacility.address}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Phone size={14} className="text-primary-600 flex-shrink-0" />
                                <span className="font-black text-primary-900 text-sm">{selectedFacility.phone}</span>
                            </div>
                            <div className="p-2 bg-slate-50 rounded-md border border-slate-100">
                                <p className="text-[10px] leading-relaxed text-gray-600 italic">
                                    "{selectedFacility.description}"
                                </p>
                            </div>
                        </div>

                        <div className="mt-4 grid grid-cols-2 gap-2">
                            <button className="flex items-center justify-center gap-1 bg-primary-700 hover:bg-primary-800 text-white py-2 rounded-lg font-black text-[10px] uppercase tracking-wider transition">
                                <Navigation size={12} /> Chỉ đường
                            </button>
                            <button className="flex items-center justify-center gap-1 bg-white border-2 border-slate-200 hover:border-primary-600 hover:text-primary-600 text-slate-700 py-2 rounded-lg font-black text-[10px] uppercase tracking-wider transition">
                                <Phone size={12} /> Gọi
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Hanoi Info Label Overlay */}
            <div className="absolute bottom-3 left-3 z-[1000] pointer-events-none">
                <div className="bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full shadow-md border border-white/50 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-pulse"></span>
                    <span className="text-[9px] font-black text-gray-800 uppercase tracking-widest">Khu vực TP. Hà Nội</span>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default HanoiSystem;
